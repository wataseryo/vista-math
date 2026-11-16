# Sprint 1 自己評価

日付: 2026-11-16 / Generator (Codex)
対象仕様: `specs/2026-11-16-practice-repetition-sprint1.md`

## 完了条件チェック（仕様1章24項目）

| # | 完了条件 | 状態 | 根拠・備考 |
|---|---|---|---|
| 1 | 既存24問を無変更 | ✅ | HEADの元ファイルから末尾 ]; を除いた全ソースが現在ファイルの接頭辞とバイト一致。integrity-check.txt参照。 |
| 2 | 新規ID2問を末尾に追加 | ✅ | Planner実測: 追加前grep出力0（終了1）。追加後各1件。 |
| 3 | 分類・解説を仕様どおり転記 | ✅ | Nodeテストで仕様5章のオブジェクトとdiagram以外すべてdeepEqual。 |
| 4 | SVGの座標と寸法が整合 | ✅ | 14px/cmで再計算。v01幅196/高さ126、viewBox326×216。v02幅154/高さ112、viewBox284×194、底辺上・頂点下。色・寸法線・縦ラベル・aria-labelを実装。実画面の目視は未実施。 |
| 5 | 対応表1件・指定順序 | ✅ | 仕様3章からそのまま転記。P-06を使用。 |
| 6 | script追加と既存順序維持 | ✅ | 集約ファイル直前に1行追加。 |
| 7 | 新規関数・HTML生成 | ✅ | 純粋ヘルパー、問番号、HTML、window.pracOpenProbだけを呼ぶハンドラを追加。Nodeで確認。 |
| 8 | 結果直後に非表示DOM生成 | ✅ | pracOpenProb時に文面を確定。DOM模擬で順序・非表示を確認。 |
| 9 | 非所属は常に非表示 | ✅ | 空HTMLを採点後も表示しない。Node検証。 |
| 10 | 基本問題は正誤とも次問案内 | ✅ | 正誤同文面・問25・タイトル・ボタンをNode検証。 |
| 11 | 類題1から類題2へ案内 | ✅ | 対応順と問26を生成。ブラウザシナリオも追加。 |
| 12 | 末尾は終了案内のみ | ✅ | Nodeで文言・ボタンなしを検証。自動遷移なし。 |
| 13 | window経由遷移・navigation無変更 | ✅ | ハンドラ差替えで呼出先検証。git diff js/navigation.jsは空。 |
| 14 | 再挑戦で非表示 | ✅ | Nodeで結果・案内を非表示に戻すことを確認。 |
| 15 | 既存一覧順ボタン維持 | ✅ | pracNextProblem/nextボタン生成は差分なし。回帰シナリオ追加。 |
| 16 | 戻る/進む/再読込で復元 | ⚠️ 未検証 | 仕様の事前HTML確定＋id付きdisplay復元設計を維持。Playwrightシナリオ実装済みだがChrome起動拒否で実操作未実施。 |
| 17 | 類題遷移ごとに履歴1件増加 | ⚠️ 未検証 | 既存ラッパー経由を維持。history.lengthと戻るのシナリオ追加済み、実ブラウザ未実施。 |
| 18 | 二重採点防止・復元時に記録増加なし | ⚠️ 一部確認 | 既存answeredガード無変更。Nodeで連続採点は1記録を確認。履歴復元時の記録不変は実ブラウザ未確認。 |
| 19 | 保存形式と判定を維持 | ✅ | 新規保存キー・習得判定なし。storage/navigation無変更。 |
| 20 | 構造検証0エラー | ✅ | 226 problems; 0 errors; 71 legacy-format warnings。 |
| 21 | catalog/npm test全pass | ✅ | catalog28/28、npm test61/61。224→226更新。 |
| 22 | 既存Playwright全pass | ❌ 環境制約 | 既存48件＋新規10件の計58件を実行したがすべてChrome起動段階で失敗。アプリの合否は未判定。 |
| 23 | 新規Playwright全pass | ❌ 環境制約 | 5ケース×desktop/mobile=10件を追加・実行。すべてChrome起動段階で失敗。 |
| 24 | Claude別解検算済み | ✅ | 仕様5章に記載された検算63/44を根拠にする。今回の実装後Claude独立レビューは今後。 |

## 変更したファイル

- `data/problems/practice-g6-plane.js`: 確定済み2問を追記。SVGのみ新規設計、旧24問は無変更。
- `data/practice-variant-groups.js`: 指定1セットの対応表。
- `index.html`: 対応表scriptを1行追加。
- `js/app.js`: 事前HTML生成・採点後表示・再挑戦時非表示・類題遷移ヘルパー。採点後の表示処理は両分岐の後の共通処理に置き、正誤とも記録後に1回実行。
- `css/style.css`: 紫系の任意案内カードとフォーカス表示。
- `scripts/validate-content.cjs`: グループ/メンバー重複、参照、学年・コース・カテゴリ/章、タイトル、タイプID、配列形状の検証。
- `tests/catalog.test.cjs`: 226件アサーション、18件の対応表テスト（異常系・任意フィールド・不正配列）。
- `tests/practice-repetition.test.cjs`: 4件のNode検証。仕様値完全一致、DOM模擬での表示切替・採点ガード。
- `tests/practice-repetition.spec.cjs`: 5ケース×2ビューポート。仕様6章11シナリオを統合して網羅。
- `TODO.md`: 実装済み・Claudeレビュー/ブラウザ再検証待ちを記録。
- `sprints/practice-repetition-sprint1/`: Planner引継ぎ、元ファイルSHA256、整合性検証、自己評価とテスト証拠。

既存の `docs/curriculum-implementation-plan.md` の差分と提供仕様の未追跡状態は開始時から存在するユーザー作業であり、編集していない。

## 実行コマンドと実出力

```text
node scripts/validate-content.cjs
226 problems; 0 errors; 71 legacy-format warnings

node --test tests/catalog.test.cjs
ℹ tests 28
ℹ pass 28
ℹ fail 0

npm test
ℹ tests 61
ℹ pass 61
ℹ fail 0

npx playwright test tests/practice-repetition.spec.cjs
Running 10 tests using 1 worker
10 failed（全件Chrome起動時、テスト本体開始前）

npx playwright test
Running 58 tests using 1 worker
58 failed（全件Chrome起動時、テスト本体開始前）

npx playwright test --list
Total: 58 tests in 6 files

git diff --check
出力なし（終了コード0）
```

71件は既存解説書式の警告。今回の2問は警告なし。構造検証は数学的正答性を証明しない。既存24問の保持は `integrity-check.txt`、変更前SHA256は `baseline-hashes.json`、テストの実出力要約は `test-output.txt` に保存した。`git status --short`で変更一覧を確認済み。コミット・pushは実施していない。

## 実ブラウザ確認の状況

実ブラウザでの動作確認を試みたが、実施できなかった。

1. `python3 -m http.server 8765 --bind 127.0.0.1` は `PermissionError: [Errno 1] Operation not permitted` でlisten拒否。
2. Playwrightのdesktop/mobileとも `browserType.launch: Target page, context or browser has been closed`。Chromeは起動直後SIGABRT、後処理ログに `Error: kill EPERM`。10件および全58件はテスト本体実行前の失敗で、アプリの動作不良と断定できない。
3. 親エージェントがCUAブラウザによる `file:///Users/wataseryo/VISTA/index.html` 表示も試みたが、URL security policyで拒否された。代替経路による回避はしていない。

代替はNode `vm`と最小DOMスタブによる4テスト。HTML文字列を取得して案内領域を模擬要素へ設定し、採点・再挑戦・正誤履歴・関数呼出しを検証した。実レイアウト、ブラウザhistory/再読込復元、375pxでの目視の代替にはならない。実ブラウザの成功を主張しない。

## 既知の課題・未解決点

- 完了条件16・17・18の履歴部分、22・23は、HTTP listen/Chromeを許可する環境で再検証が必要。したがって本スプリントの最終合格は保留（完全確認19/24、一部/未確認3、環境制約でpass未達2）。
- Claudeによる実装後の数学・SVG・コード独立レビュー待ち。
- 仕様6章の「26問増(全体)」は文面の不整合として、明示指示の全体224→226、平面図形24→26を採用。仕様は変更していない。
- `curriculumTypeIds` はフィールド定義に従い任意、指定時は形式検証。今回はP-06（初期議論のP-04は使用しない）。
- 外部PMファイル `/Users/wataseryo/ryo claude code/.company/pm/projects/教育アプリ.md` は存在せず、書込許可範囲外のため未更新。TODOに状態と次Sprintを記録。
- 次Sprintは `g6_plane_004`・`g6_plane_005` の類題セット（今回対象外）。
