# Sprint 1: P-15 円周・円の面積(基本形) 自己評価

担当: Claude(問題データ・静的diagram作成) + Codex(expandVisual実装)
対象: `g6_plane_019`(円周の長さから半径を求める)、`expandVisual:'circle-radius-reveal'`

## 完了条件チェック

| 完了条件 | 結果 |
|---|---|
| 問題データ追加(`g6_plane_019`、既存18問は無変更) | ✅ |
| `docs/content-authoring.md`準拠の解説構成・口調 | ✅ |
| `expandVisual:'circle-radius-reveal'`実装、既存`wireSequentialReveal`の再利用(新規JS関数・新規CSS不要) | ✅ |
| `prefers-reduced-motion`対応 | ✅(`wireSequentialReveal`既存対応をそのまま利用) |
| `node scripts/validate-content.cjs` 0エラー | ✅(223問/0エラー) |
| `node --test tests/catalog.test.cjs`・`npm test` 全件pass(件数223に更新) | ✅(10/10, 39/39) |
| 既存Playwright回帰スイート全件pass | ✅(52/52、desktop+mobile。新規4件含む) |
| 新規問題の個別ブラウザ検証 | ✅(下記Evaluator参照) |
| 既存問題・他タイプへの影響なし | ✅(`js/app.js`は新規キー追加のみ、既存`'exterior-angle-circle'`・`wireSequentialReveal`は無変更) |

## 実装の要点

- 半径の長さを円周に沿って並べると、6個(57.3°ずつ)と端数1個(16.2°、約0.28個分)でちょうど一周する(2π≈6.28)ことを可視化。端数セルは紫色で視覚的に区別し、「7個均等」という誤解を避けた。
- 既存の`exterior-angle-circle`(正多角形の外角を8等分して1周を示す)と全く同じ`wireSequentialReveal`機構を再利用。新しいJS関数・CSSクラスの追加はゼロ。Plannerの想定通り、P-04より低リスクな実装だった。

## 既知の制約・未実施

- Codex(Generator)は今回もHTTPサーバー・Chrome起動が環境制約で拒否され、実ブラウザ検証は未実施のまま正直に申告。実ブラウザでの最終検証はEvaluator(Claude)側で実施(`sprint-1-eval.md`参照)。
- P-15タイプの残り(円の面積の順方向・逆算、2問目)は本スプリントの対象外。
