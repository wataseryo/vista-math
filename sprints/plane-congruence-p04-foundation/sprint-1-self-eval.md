# Sprint 1: P-04 合同・線対称・点対称(基本形) 自己評価

担当: Claude(問題データ・静的diagram作成) + Codex(expandVisual実装)
対象: `g6_plane_018`(合同な三角形の対応する角)、`expandVisual:'congruence-match'`

## 完了条件チェック

| 完了条件 | 結果 |
|---|---|
| 問題データ追加(`g6_plane_018`、既存19問+g6_plane_016/017は無変更) | ✅ |
| `docs/content-authoring.md`準拠の解説構成・口調 | ✅(【ポイント】【解説】【広げてみよう】【確認】、《 》式ブロック、「いつもの説明」口調) |
| `expandVisual:'congruence-match'`実装、既存`.plane-expand-dup`/`.rotated`機構の再利用(新規CSS不要) | ✅ |
| `prefers-reduced-motion`対応 | ✅ |
| `node scripts/validate-content.cjs` 0エラー | ✅(222問/0エラー) |
| `node --test tests/catalog.test.cjs` 全件pass(件数222に更新) | ✅(10/10) |
| `npm test` 全件pass | ✅(39/39) |
| 既存Playwright回帰スイート全件pass | ✅(48/48、desktop+mobile) |
| 新規問題の個別ブラウザ検証(採点・ビジュアル再生/リセット・キーボード・reduced-motion) | ✅(独立検証スクリプトで確認、下記Evaluator参照) |
| 既存問題・他タイプへの影響なし(`git diff`範囲確認) | ✅(`data/problems/practice-g6-plane.js`末尾追記、`js/app.js`新規キー+新規関数追加のみ、`tests/catalog.test.cjs`件数更新のみ) |

## 実装の要点

- 三角形ABC(points: 81,52 / 40,140 / 160,140)を点(180,130)中心に180°回転すると三角形DEF(points: 279,208 / 320,120 / 200,120)に一致する(3頂点の中点がいずれも(180,130)で一致することを検算済み)。既存の`triangle-rotate`/`diagonal-rotate`と全く同じ回転機構(`wireRotateVisual`相当)で実現でき、新規CSSクラス・新規transform種別は不要だった。
- 問題は「△ABC≡△DEFの対応順(A↔D,B↔E,C↔F)を図の見た目の位置ではなく記号の順番で読む」ことを問う設計。角E=65°は角Bとの一致を確認する検算用の冗長情報として機能する。

## 既知の制約・未実施

- Codex(Generator)は実行環境の制約でHTTPサーバー・Chrome起動ができず、実ブラウザ検証は未実施のまま申告(正直に「DOM模擬検証を実ブラウザ合格とは扱っていない」と明記)。実ブラウザでの最終検証はEvaluator(Claude)側で実施(`sprint-1-eval.md`参照)。
- P-04タイプの残り(線対称・点対称そのものを問う問題、2問目)は本スプリントの対象外。`coverage-final.md`に明記済み。
