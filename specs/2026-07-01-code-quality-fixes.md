---
created: "2026-07-01"
project: "コード品質修正（null クラッシュ・重複リスナー）"
status: draft
sprints_total: 1
---

# 製品仕様書: コード品質修正（null クラッシュ・重複リスナー）

## プロダクト概要

`js/app.js` に存在する 3 件のバグを修正する。
対象はすべてランタイムクラッシュまたは誤動作につながる問題であり、
ユーザーが問題を解く途中でアプリが壊れるリスクを除去することが目的。

## 機能一覧

| # | バグ名 | 概要 | 優先度 | スプリント |
|---|--------|------|--------|-----------|
| 1 | DOMContentLoaded null チェック | `ans-input` / `ch-ans-input` の `addEventListener` 呼び出しを null チェックで保護 | Critical | 1 |
| 2 | `pracOpenProb` 内の cat null 参照 | `PRACTICE_CATS.find()` の結果を null チェックしてから `cat.unitId5` / `cat.unitId6` にアクセスする | Critical | 1 |
| 3 | イベントリスナー付与方式の明示化 | `pracOpenProb` / `stdPracOpenProb` 内のリスナー付与を、`innerHTML` 生成後に要素を取得してから行う現行方式の安全性を保ちつつ、重複が起きないことをコード上で明確にする | High | 1 |

## スプリント計画

### Sprint 1: null 安全化・リスナー安全化

- 機能: 上記バグ 1・2・3 の修正
- 完了条件:
  - [ ] ページ読み込み時（DOMContentLoaded）に `ans-input` または `ch-ans-input` が null でもエラーが発生しない
  - [ ] `pracOpenProb` を呼び出した際に、対象 catId に一致する PRACTICE_CATS エントリが存在しない場合でも TypeError が発生せずに関数が終了する
  - [ ] 受験演習の問題を 3 問連続で切り替えても、Enter キーによる `pracCheckAnswer` が 1 回だけ呼ばれる（多重呼び出しが発生しない）
  - [ ] 同様に標準コース演習で問題を 3 問連続で切り替えても、Enter キーによる `stdPracCheckAnswer` が 1 回だけ呼ばれる

## 修正箇所の詳細

### バグ 1: DOMContentLoaded の null チェック

- **ファイル**: `js/app.js`
- **該当行**: 1111〜1112 行目
- **現状**:
  ```js
  document.getElementById('ans-input').addEventListener('keydown', ...);
  document.getElementById('ch-ans-input').addEventListener('keydown', ...);
  ```
- **修正方針**: `getElementById` の戻り値を変数に受け、null でない場合のみ `addEventListener` を呼ぶ

### バグ 2: `pracOpenProb` の cat null 参照

- **ファイル**: `js/app.js`
- **該当行**: 300〜301 行目
- **現状**:
  ```js
  const cat = PRACTICE_CATS.find(c => c.id === p.catId);
  const unitId = appState.grade === 5 ? cat.unitId5 : cat.unitId6;  // cat が null の場合クラッシュ
  ```
- **修正方針**: `cat` が null の場合は `unitId` を `undefined` または `null` とし、処理を継続する（`unit` の三項演算子ガードは既存のものを維持）

### バグ 3: リスナー重複登録の防止

- **ファイル**: `js/app.js`
- **該当行**: 343 行目（`pracOpenProb`）、170 行目（`stdPracOpenProb`）
- **背景**: `body.innerHTML = ...` で毎回 DOM を再生成するため、`getElementById` で取得した要素は呼び出しごとに別オブジェクトであり、現状でも重複は発生していない。ただし `stdPracOpenProb` の 170 行目では `document.getElementById('std-prac-ans-input').addEventListener(...)` を `innerHTML` 書き換え後に呼んでおり、構造は同一。
- **修正方針**: 両関数ともに `innerHTML` 書き換え直後に取得した要素参照を使い、リスナーを一度だけ付与する。`removeEventListener` は不要（毎回新規要素のため）だが、コードの意図を明確にするため `innerHTML` 設定後に即 `getElementById` → `addEventListener` の順序を維持し、二重呼び出しが起きない構造を確認・保証する。

## 制約・前提条件

- `js/app.js` を直接編集する（index.html は変更しない）
- 既存の動作（正解・不正解判定・次の問題遷移）を一切変えない
- 答えは必ず整数（小数・分数の答えは問題設計で避ける）という制約はデータ側の話であり本修正には影響しない

## 未解決の仮定

- `ans-input` および `ch-ans-input` は HTML に静的に存在するため、現時点では DOMContentLoaded 時に null になることはないと推定される。ただし将来的な HTML 変更に備えて null チェックを追加する。
- `pracOpenProb` の `cat` が null になる実経路（catId が problems.js と categories.js で不一致になった場合など）は通常の操作では発生しにくいが、データ不整合時に備えて防御コードを追加する。
- バグ 3 は現状で実害はないが、将来的に `innerHTML` 外で要素を再利用する実装に変わった場合の安全網として修正する。
