# 引き継ぎログ: 鬼レビュー Normal 項目

作成日: 2026-07-01

## 状況
鬼レビューの Critical/High 項目はすべて修正・push 済み。
以下の Normal 項目が未対応。次のセッションで対応する。

## 未対応タスク（Normal 優先度）

### 1. チャレンジ一覧プレビューの「…」が無条件で付く
- **ファイル**: `/Users/wataseryo/教育アプリ/js/app.js`
- **対象行**: `renderChallengeList()` 内、`const preview = c.question...` の行
- **現状コード**:
  ```js
  const preview = c.question.replace(/\n/g,' ').slice(0,48)+'…';
  ```
- **修正内容**:
  ```js
  const raw = c.question.replace(/\n/g,' ');
  const preview = raw.length > 48 ? raw.slice(0,48)+'…' : raw;
  ```

### 2. `showScreen()` の null チェック欠如
- **ファイル**: `/Users/wataseryo/教育アプリ/js/app.js`
- **対象行**: `showScreen()` 関数内
- **現状コード**:
  ```js
  const next = document.getElementById(id + '-screen');
  next.classList.add('active');  // next が null だとクラッシュ
  ```
- **修正内容**: null チェックを追加する
  ```js
  const next = document.getElementById(id + '-screen');
  if (!next) { console.warn('showScreen: unknown screen id:', id); return; }
  next.classList.add('active');
  ```

### 3. watertank 初期化タイミング
- **ファイル**: `/Users/wataseryo/教育アプリ/js/app.js`
- **対象行**: DOMContentLoaded ハンドラ内の `updateLearn()` と `generateProblem()` 呼び出し
- **現状**: 初期化時に watertank が非表示でも DOM 操作が走る
- **修正方針**: `showScreen('watertank')` のタイミングでのみ呼ぶよう移動（すでに `showScreen` 内で `if (id === 'watertank') { updateLearn(); generateProblem(); }` があるため、DOMContentLoaded での呼び出しを削除するだけ）
- **注意**: 削除前に DOMContentLoaded 内の該当行を確認してから実施

## 修正済み済みの内容（参考）
- `g6_ratio_work_003` 問題文「100人」→「400人」
- `<body>` タグ重複削除
- watertank 戻るボタン → `goBackFromWatertank()` で遷移元に戻る
- categories.js の count: u6-ratio:20, u6-salt:8, u6-special:36, u6-speed:30
- localStorage → `lsGet`/`lsSet` ラッパーに置き換え済み
- `gameState.stars` の NaN ガード追加済み

## 作業手順（次のセッション）
1. このファイルを読む
2. CLAUDE.md のルール通り Planner エージェントを起動して仕様書を作成
3. Generator で実装 → Evaluator で確認
4. git commit & push
