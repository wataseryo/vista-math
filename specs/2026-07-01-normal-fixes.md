---
created: "2026-07-01"
project: "Normal優先度バグ修正 3件"
status: draft
sprints_total: 1
---

# 製品仕様書: Normal優先度バグ修正 3件

## プロダクト概要

`js/app.js` に存在する Normal 優先度のバグ 3件を修正する。
対象はチャレンジ一覧のプレビュー表示、`showScreen()` のエラー耐性、
および watertank の初期化タイミングの3点。

## 機能一覧

| # | 機能名 | 概要 | 優先度 | スプリント |
|---|--------|------|--------|-----------|
| 1 | preview 末尾「…」条件修正 | 48字以下でも「…」が付く問題を解消 | Must | 1 |
| 2 | showScreen null チェック追加 | 不明な screen id でクラッシュしないようにする | Must | 1 |
| 3 | watertank 初期化タイミング修正 | DOMContentLoaded 時に不要な updateLearn / generateProblem を呼ばない | Must | 1 |

## スプリント計画

### Sprint 1: Normal優先度バグ修正

- 機能: 上記 3件を一括修正

- 完了条件:
  - [ ] `renderChallengeList()` 内の preview 生成行が、文字数が 48 字以下のとき「…」を付けず、49 字以上のときのみ「…」を付ける
  - [ ] `showScreen()` 内で `document.getElementById(id + '-screen')` が null を返した場合、`console.warn` を出力して処理を中断し、その後の行（`classList.add` など）でクラッシュしない
  - [ ] `DOMContentLoaded` ハンドラ内の `updateLearn()` と `generateProblem()` の呼び出しが削除されており、これらの関数は `showScreen('watertank')` 経由でのみ実行される

## 修正箇所（参照用）

### 修正 1: `renderChallengeList()` — preview 生成（828行付近）

現状:
```js
const preview=c.question.replace(/\n/g,' ').slice(0,48)+'…';
```

修正後:
```js
const raw = c.question.replace(/\n/g,' ');
const preview = raw.length > 48 ? raw.slice(0,48)+'…' : raw;
```

### 修正 2: `showScreen()` — null チェック（411〜412行付近）

現状:
```js
const next = document.getElementById(id + '-screen');
next.classList.add('active');
```

修正後:
```js
const next = document.getElementById(id + '-screen');
if (!next) { console.warn('showScreen: unknown screen id:', id); return; }
next.classList.add('active');
```

### 修正 3: `DOMContentLoaded` ハンドラ（1108〜1114行付近）

現状:
```js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ans-input').addEventListener('keydown', e => { if(e.key==='Enter') checkAnswer(); });
    document.getElementById('ch-ans-input').addEventListener('keydown', e => { if(e.key==='Enter') chSubmitAnswer(); });
    updateStarBadge();
    updateLearn();
    generateProblem();
});
```

修正後（`updateLearn()` と `generateProblem()` の2行を削除）:
```js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ans-input').addEventListener('keydown', e => { if(e.key==='Enter') checkAnswer(); });
    document.getElementById('ch-ans-input').addEventListener('keydown', e => { if(e.key==='Enter') chSubmitAnswer(); });
    updateStarBadge();
});
```

## 制約・前提条件

- `js/app.js` のみを編集する（index.html・data/ ファイルは変更不要）
- 既存の `showScreen('watertank')` 内の `updateLearn(); generateProblem();`（422行）はそのまま残す
- 修正はコードの最小変更にとどめる

## 未解決の仮定

- `showScreen()` の null チェックは `return` で早期終了する（後続の if 分岐もすべてスキップされる）。これは意図どおりと仮定する
- DOMContentLoaded での `updateLearn()` / `generateProblem()` 削除によりアプリ起動直後の watertank 画面に何らかの副作用が生じないか確認が必要だが、`showScreen('watertank')` 経由で必ず呼ばれるため問題ないと仮定する
