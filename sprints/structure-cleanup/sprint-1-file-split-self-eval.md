---
created: "2026-09-21"
project: "structure-cleanup"
sprint: 1
author: "Claude"
status: "done"
---

# Sprint 1 自己評価: data/problems.js の物理分割

Codexの構造整理調査（読み取り専用計画）に基づき実施。計画通り「diagram追加(plane-geometry sprint 4-5)完了後に物理分割」の順序を踏襲。

## 実施内容

### 1. `data/problems.js`(5144行)を10ファイルに分割

`data/problems/` ディレクトリを新設し、Codexの計画に沿って配列単位で機械的に抽出:

| 出力ファイル | 定数名 | 件数 |
|---|---|---:|
| practice-g6-ratio.js | PRACTICE_G6_RATIO | 20 |
| practice-g6-speed.js | PRACTICE_G6_SPEED | 30 |
| practice-g6-special.js | PRACTICE_G6_SPECIAL | 36 |
| practice-g5-special.js | PRACTICE_G5_SPECIAL | 10 |
| practice-g6-plane.js | PRACTICE_G6_PLANE | 19 |
| challenge-legacy.js | CHALLENGE_LEGACY | 28 |
| challenge-g6-ratio.js | CHALLENGE_G6_RATIO | 34 |
| challenge-g6-speed.js | CHALLENGE_G6_SPEED | 10 |
| challenge-g6-salt-extra.js | CHALLENGE_G6_SALT_EXTRA | 1 |
| challenge-g6-special.js | CHALLENGE_G6_SPECIAL | 14 |

抽出方法: `sed -n '<start>,<end>p'` による行範囲の機械的コピー(手打ち・Writeでの再構成は一切行っていない。トランスクリプションエラーのリスクを排除するため)。

### 2. `data/problems.js` を集約専用ファイルに変更

元の5144行から、以下の18行に置き換え:

```js
const PRACTICE_PROBLEMS = [
  ...PRACTICE_G6_RATIO, ...PRACTICE_G6_SPEED, ...PRACTICE_G6_SPECIAL,
  ...PRACTICE_G5_SPECIAL, ...PRACTICE_G6_PLANE,
];
const CHALLENGES = [
  ...CHALLENGE_LEGACY, ...CHALLENGE_G6_RATIO, ...CHALLENGE_G6_SPEED,
  ...CHALLENGE_G6_SALT_EXTRA, ...CHALLENGE_G6_SPECIAL,
];
```

公開名(`PRACTICE_PROBLEMS`, `CHALLENGES`)は維持。app.js側の変更は不要（Codexの事前調査で確認済みの通り）。

### 3. `index.html` のscript読み込み順を更新

`categories.js` → 10分割ファイル → `problems.js`(集約) → `app.js` の順に変更。`landing.html`は元々これらのファイルを読み込んでいないため対象外。

## 検証内容(実施済み)

1. **全ファイル個別に `node --check`** で構文エラーなしを確認
2. **分割前後のベースライン比較**（Node vmで実データをロードして比較）:
   - PRACTICE_PROBLEMS/CHALLENGESの件数（115/87）が一致
   - 全202件のID・並び順が完全一致
   - difficulty別・catId別・category別の集計が完全一致
   - diagram付き7問のIDが完全一致
3. **深い内容比較**: 分割前後の全問題オブジェクトを `JSON.stringify` して文字列比較 → **完全一致**（202,153文字、1文字の差異もなし）
4. **ブラウザ実機確認**（Playwright、キャッシュ無効化して再読み込み）:
   - 全11ファイル（categories.js + 10分割ファイル + 集約problems.js）が正しく読み込まれることをNetwork経由で確認
   - `g6_plane_015`（diagram付き）の演習画面を開き、図表示・採点（50→正解）が正常動作
   - 分割1本目（`g6_ratio_basic_extra_001`）・4本目（`g5_wp_age_002`）の問題が正常に開けることを確認
   - 難問チャレンジ: legacy形式（c1）・拡張形式の外れ値（`g6_ratio_salt_008`、salt-extra単体ファイル）が両方 `CHALLENGES` 配列から発見できることを確認
   - UIを実際にクリックで辿り、受験コース→難問チャレンジ→総合チャレンジ（34問、複数分野混在）→個別問題（食塩水の混合、legacy形式）の表示まで一通り確認。問題文・選択肢・ヒントボタンとも正常

## 未実施・既知の制約

- 死んだフィールド（`visualTypes`, `isRandomGenerated`）の削除は未実施（次スプリント）
- フィールド名統一（`unit→answerUnit`, `question→text`, `category→categoryLabel`）は未実施（次スプリント、localStorage保存キーへの影響があるため慎重に進める）
- `categories.js` の未参照`figures`定義の削除は未実施
- 保護者レポート・弱点復習・おすすめ復習など、問題データを横断参照する画面群は個別クリックでの確認をしていない（データ自体が完全一致のため理論上影響なしと判断したが、実地確認はしていない）

## Codexレビュー結果(2026-09-21)

読み取り専用の独立レビューを実施。**データ分割・app.js互換性に問題なし。1件Normalの指摘（ドキュメント更新漏れ）あり、対応済み。**

- 元ファイル(バックアップ)と分割後を実際に読み込んで比較: 202件全問題の内容が1文字単位で完全一致、境界を跨いだ分割なし、重複・欠落なしを確認
- index.htmlのscript読み込み順序（classic scriptでのconst共有スコープ）に問題なし
- app.js側の変更不要という判断は正しい（`git diff HEAD -- js/app.js`が空であることも確認済み）
- **指摘（Normal）**: `CLAUDE.md`と`.claude/agents/planner.md`/`generator.md`が「新しい問題は`data/problems.js`に追加する」という古い記述のままだった。集約専用ファイルになったことを反映していないと、今後の開発（Planner/Generatorサイクル）が分割構造を無視してしまうリスクがある → **3ファイルとも修正済み**（`data/problems/*.js`に追加する旨を明記）

## 変更ファイル

- `data/problems.js`（5144行 → 18行の集約ファイルに変更）
- `data/problems/*.js`（新規10ファイル）
- `index.html`（script読み込み順の変更）
- `CLAUDE.md`, `.claude/agents/planner.md`, `.claude/agents/generator.md`（問題追加先の記述をCodex指摘に基づき更新）

未コミット。
