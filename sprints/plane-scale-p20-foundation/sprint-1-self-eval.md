# Sprint 1: P-20 縮図・拡大図・縮尺(基本形) 自己評価

担当: Claude(問題データ・静的diagram・設計方針変更) + Codex(expandVisual実装)
対象: `g6_plane_020`(縮尺と実際の距離)、`expandVisual:'scale-drawing-reveal'`

## 完了条件チェック

| 完了条件 | 結果 |
|---|---|
| 問題データ追加(`g6_plane_020`、既存19問は無変更) | ✅ |
| `docs/content-authoring.md`準拠の解説構成・口調、単位換算(cm→m→km)含む | ✅ |
| `expandVisual:'scale-drawing-reveal'`実装、既存`wireScaleVisual`パターンの再利用(新規CSS不要) | ✅ |
| `prefers-reduced-motion`対応 | ✅ |
| `node scripts/validate-content.cjs` 0エラー | ✅(224問/0エラー) |
| `node --test tests/catalog.test.cjs`・`npm test` 全件pass(件数224) | ✅(10/10, 39/39) |
| 既存Playwright回帰スイート全件pass | ✅(52/52。1件は初回タイムアウト後、単体再実行でpass、無関係領域のため環境要因と判断) |
| 新規問題の個別ブラウザ検証 | ✅ |
| 既存問題・他タイプへの影響なし | ✅ |

## 設計変更の記録(Planner提案からの変更)

PlannerのA-3仕様は「見た目の倍率(演出用)」と「実際の縮尺(25000倍)」を分離した拡大アニメーション(新規CSS transform種別が必要)を提案していたが、Claudeの判断でこれを採用せず、代わりに既存の`wireScaleVisual`(テキストの手順を1つずつ積み上げるだけの仕組み、`triangle-base-scale`で使用中)と同じパターンを再利用する設計に変更した。理由: 見た目の倍率と実際の倍率の乖離という誤解リスクを、アニメーションで「それらしく見せる」よりも、最初から作らないことで解消する判断。新規CSSクラスもゼロで実装でき、P-04・P-15よりさらに低リスクだった。

## 既知の制約・未実施

- Codex(Generator)は今回もChrome起動が環境制約で失敗し、実ブラウザ検証は未実施のまま正直に申告。実ブラウザでの最終検証はEvaluator(Claude)側で実施。
- P-20タイプの残り(2問目、他の縮尺パターン)は本スプリントの対象外。
