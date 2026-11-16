# Sprint 1 自己評価

対象: 類題(反復練習) Sprint 2。基準コミット `71fa473`。2026-11-16。

## 完了条件チェック

✅は実施済みの確認、⏳はブラウザ実行結果待ち。テストを書いたことと、実ブラウザで合格したことを区別する。

| # | 完了条件 | 状態 | 証拠・備考 |
|---|---|---|---|
| 1 | 既存26問を一切変更しない | ✅ | HEADと現状の配列先頭26件をVMで読み込み、全フィールドdeepEqual。既存部分に本文変更なし。 |
| 2 | 新規4IDを末尾追加、追加前0件を記録する | ✅ | Planner引き渡しにrg出力なし・exit 1（0件）記録。26→30件。 |
| 3 | 分類・数学的内容・solutionが仕様どおり | ✅ | specのコードブロックから機械抽出。VMでdiagram以外の全フィールド完全一致を確認。 |
| 4 | SVGの数値・座標・未知高さ・向きを合わせる | ✅ | 14px/cmで再計算。下記座標表参照。高さラベルは全問「高さ ？」、aria-labelも数値解答なし。目視は未実施。 |
| 5 | 既存グループを維持して新規2グループ追加 | ✅ | 全3グループをspecコードブロックとdeepEqual。 |
| 6 | グループ横断で問題ID重複なし | ✅ | validator 0 errors。 |
| 7 | app/CSS/validator/indexを無変更にする | ✅ | 指定git diffは空、exit 0。 |
| 8 | 三角形基本問題の正誤両方で次問案内 | ⏳ | 新規巡回・誤答シナリオ実装済み、実ブラウザ判定待ち。 |
| 9 | 三角形類題1→2と末尾案内 | ⏳ | 新規巡回シナリオ実装済み、実ブラウザ判定待ち。 |
| 10 | 平行四辺形セットの遷移・末尾案内 | ⏳ | 新規巡回シナリオ実装済み、実ブラウザ判定待ち。 |
| 11 | 一覧末尾・詳細・案内の問27〜30が一致 | ⏳ | 一覧/巡回シナリオで検証、実ブラウザ判定待ち。 |
| 12 | 対応表外の問題で案内非表示 | ⏳ | 既存001に加え新規006の検証を実装、実ブラウザ判定待ち。 |
| 13 | Sprint1セット遷移・終了・番号が不変 | ⏳ | 既存5テストを件数26→30以外無変更で維持。3セット混在も追加。実ブラウザ判定待ち。 |
| 14 | 新規両セットの案内が他セットを含まない | ⏳ | 次問onclickの完全一致、他セット題名の不在を検証。実ブラウザ判定待ち。 |
| 15 | 3セット操作時のanswered・履歴・記録が独立 | ⏳ | 一覧経由の連続操作、answered初期化、履歴の前後移動、VistaStorage.exportData().recordsの問題別配列確認を実装。実ブラウザ判定待ち。 |
| 16 | 3グループ全体の重複が検出されない | ✅ | validator合格、全3組み合わせの重複を拒否する異常系テストもpass。 |
| 17 | 新規2セットの戻る/進む/再読込復元 | ⏳ | 両セットに基本→類題1→類題2の履歴シナリオ実装、実ブラウザ判定待ち。navigation.js無変更。 |
| 18 | 類題遷移でhistoryが1件増える | ⏳ | 4問すべてhistory.length +1のアサーション、実ブラウザ判定待ち。 |
| 19 | 新規4問の採点重複防止・戻る後記録不増 | ⏳ | 4問で再採点呼出し、両セット履歴復元後のrecords完全一致を検証。実ブラウザ判定待ち。 |
| 20 | 新規習得判定・保存キーなし | ✅ | 実装変更は問題/対応表/テストのみ。保存・採点ロジック無変更。 |
| 21 | 構造チェック0エラー | ✅ | 230 problems; 0 errors; 71 legacy-format warnings。 |
| 22 | catalog・npm test全件pass | ✅ | catalog 35/35、npm test 68/68、失敗0。 |
| 23 | 既存Playwright desktop/mobile回帰全件pass | ⏳ | --listで全74件読込成功。通常実行はEvaluator待ち。 |
| 24 | 仕様6章の新規Playwright全件pass | ⏳ | 8シナリオ×2プロジェクトを追加し全12検証項目を網羅。通常実行はEvaluator待ち。 |
| 25 | Claudeによる答えの逆検算済み記載を確認 | ✅ | spec5章の7×12÷2=42、16×9÷2=72、15×6=90、8×12=96を確認。数学的内容は変更なし。 |

## 変更したファイル

- `data/problems/practice-g6-plane.js`: 確定済み問題4件を末尾へ追記し、4つのSVGを設計。
- `data/practice-variant-groups.js`: P-07の2グループを追記。
- `tests/catalog.test.cjs`: 226→230件、新規両グループの未知ID/内部重複、3グループ全組合せの横断重複の異常系7件。
- `tests/practice-repetition.spec.cjs`: 一覧26→30件。両セットの巡回/誤答/履歴、3セット混在、一覧番号と非所属問題の計8シナリオを追加。
- `sprints/practice-repetition-sprint2/planner-handoff.md`: Planner引き渡し記録。
- `sprints/practice-repetition-sprint2/sprint-1-self-eval.md`: 本書。

既存untrackedのspecは入力資料であり、変更していない。TODO/外部PM更新は今回のCodex実装範囲外・Claude独立レビュー待ちのため行っていない。

## SVG座標の算定

全図14px/cm。三角形は底辺×高さが98×168、224×126px。平行四辺形は210×84、112×168px（横ずれ28px）。高さの数値はSVGラベル・aria-labelの双方から伏せた。

| ID末尾 | viewBox | polygon |
|---|---|---|
| 004_v01 | 0 0 228 258 | 40,208 138,208 89,40 |
| 004_v02 | 0 0 354 208 | 40,56 264,56 152,182 |
| 005_v01 | 0 0 368 174 | 68,40 278,40 250,124 40,124 |
| 005_v02 | 0 0 270 258 | 40,40 152,40 180,208 68,208 |

底辺寸法線・高さ寸法線・文字・viewBoxを全て再計算。三角形v02は上に底辺寸法線、平行四辺形v02は下辺を右へずらした左肩上がりにして底辺寸法線も移動。

## 禁止ファイル差分

実行:
```sh
git diff --exit-code -- js/app.js css/style.css scripts/validate-content.cjs index.html js/navigation.js data/problems.js data/categories.js
```
出力なし・終了コード0。指定の `git diff js/app.js css/style.css scripts/validate-content.cjs index.html` も空。変更不要という前提が崩れる理由は見つかっていない。

## 実行したテストと実出力

```text
node scripts/validate-content.cjs
230 problems; 0 errors; 71 legacy-format warnings

node --test tests/catalog.test.cjs
ℹ tests 35
ℹ suites 0
ℹ pass 35
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0

npm test
ℹ tests 68
ℹ suites 0
ℹ pass 68
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0

npx playwright test --list
Total: 74 tests in 6 files

git diff --check
（出力なし、exit 0）
```

VMによる追加確認実出力:
```text
Existing 26 problems unchanged; 4 new problems match spec in every non-diagram field; 3 groups match spec.
```
比較スクリプトの初回はexecFileSyncのencodingオプション形式誤りで起動失敗したが、オプションを修正して再実行し成功した。アプリコードへの影響はない。

## 実ブラウザ確認

Generator段階では未実施。親エージェントの事前試行では、`python3 -m http.server 8765 --bind 127.0.0.1` が `PermissionError: [Errno 1] Operation not permitted`。CUA Chromeのfile URLもBrowser URL policyで拒否。Evaluatorが通常のPlaywright実行を別途試み、結果を追記予定。--listの成功をブラウザ動作合格とは扱わない。

## 実装メモ・懸念点

- 仕様からの逸脱なし。コミット・pushはしていない。
- 数学フィールドの完全一致と既存26問の保護は確認済み。
- ブラウザのUI・履歴・モバイル表示の完了条件は、実行結果が得られるまで未検証。
- 71件のlegacy-format warningは既存教材由来で、本スプリントでは修正対象外。
- 次工程は独立Evaluatorの検証とClaudeの独立レビュー。

## 自己評価スコア

完了条件達成確認済み: 12/25。残り13項目は実ブラウザ検証待ち（条件4の目視を含め、ブラウザ成功を主張しない）。

## 独立Evaluatorによる追記（2026-11-16）

- validatorは230問・0 errors・71 warnings、catalogは35/35、npm testは68/68を独立再実行して成功。
- HEADの既存26問全フィールド、新規4問のdiagram以外の全フィールド、既存グループ、9ユニークグループメンバーを別のVM比較で確認した。
- `npx playwright test --max-failures=1`を実行。`Running 74 tests using 1 worker`の後、最初のChrome起動が`SIGABRT`で終了。実出力は`1 failed` / `73 did not run`。ページ表示前の起動失敗であり、アプリUIテストの成功は確認できていない。
- 全74件は`--list`で引き続き認識される。desktop/mobileの実操作、目視、ブラウザ回帰全件成功は未確認のままとする。
- 独立評価レポート: `sprints/practice-repetition-sprint2/sprint-1-eval.md`。判定はブラウザ検証未完了による不合格、コード修正要求は現時点でなし。
