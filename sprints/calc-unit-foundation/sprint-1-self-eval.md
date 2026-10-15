# Sprint 1 自己評価: 計算・数の処理 基礎9タイプ

仕様: `specs/2026-10-15-calc-unit-foundation.md`

## 完了条件チェック

| 完了条件 | 状態 | 備考 |
|---|---|---|
| `practice-g6-calc.js`新規作成・`PRACTICE_G6_CALC`宣言、ID重複なし | ✅ | `g6_calc_basic_001〜009`、既存182問と重複なしを事前grepで確認 |
| `data/problems.js`のPRACTICE_PROBLEMSに登録 | ✅ | |
| `index.html`で集約ファイルより前に読み込み | ✅ | `data/categories.js`直後 |
| `data/categories.js`は変更しない | ✅ | 演習カテゴリは`PRACTICE_PROBLEMS`からの動的カウントのため不要(`docs/content-authoring.md`) |
| 書式準拠(【】2つ以上・丸数字・【確認】・「答え：」) | ✅ | 9問とも準拠、legacy-format警告は0件増加(75件のまま) |
| `validate-content.cjs`エラー0 | ✅ | 211問・0エラー |
| `npm test`37件pass | ✅ | `tests/catalog.test.cjs`の件数アサーションを202→211に更新した上でpass |
| 実ブラウザで計算カテゴリが開けて採点できる | ✅ | Playwrightで演習→計算・数の処理(9問表示)→1問目解答(4.7)→正解判定を確認 |
| coverage-final.md/plan/jsonの同期 | ✅ | 217/44/31/142→217/52/30/135 |

## 実装メモ
- 仕様からの逸脱: なし。
- 次スプリントへの申し送り: 各タイプ1問のみで「有」化。完了基準の条件2(数値・条件を変えた2問目)は未対応。C-06〜08(標)・C-11,13(発)は本スプリント対象外、設計書のSprint 9以降で対応予定。

## 自己評価スコア
- 完了条件達成率: 9/9
- 懸念点: 条件2(variant問題)が全タイプ未対応である点は、今後のEvaluatorで「不合格」とすべきか「別途管理」とすべきか要判断(本レポートでは後者として扱った)。
