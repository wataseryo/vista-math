# P-05 Sprint 1 Planner 引継ぎ

- 日付: 2026-11-16
- 確定仕様: `specs/2026-11-16-plane-p05-area-formula.md`。既存仕様を採用し、数学的内容・難易度・対象範囲を変更しない。
- 参照済み: `AGENTS.md`、`docs/codex-agents/planner.md`、`docs/development-workflow.md`、`docs/content-authoring.md`。

## ユーザーができること

1. 平面図形一覧の問31〜33から正方形・長方形・ひし形の面積問題を開き、81・66・70cm²で正解できる。
2. 各問題の既知の長さに比例したSVGを確認できる。
3. 正方形は面積のみ、長方形はたて・よこ・面積、ひし形は対角線1・対角線2・面積の式変形を確認できる。
4. 正方形の非タップ「1辺」をクリックしても表示変化やエラーが起きない。
5. PC・375pxスマホでSVGとチップを画面内に表示でき、従来の問題・採点・類題導線を引き続き使える。

## Generatorへの引継ぎ

- 仕様4章の新規3問を末尾へ順に追加する。diagram以外の全フィールドをそのまま転記する。既存問題は変更しない。
- `js/app.js`は`PLANE_EXPAND_VISUALS`への指定3エントリ追加のみ。既存関数・エントリは変更しない。
- CSSは`.plane-expand-chip-static`を追加する。正方形の1辺は既存クリック対象クラスを付けず、ひし形は`diag1`/`diag2`を使用する。
- SVGは1cm=14pxから再計算し、指定配色・寸法線・等辺記号/直角記号・アクセシブルな説明を備える。
- `tests/catalog.test.cjs`の230→233、`tests/practice-repetition.spec.cjs`の件数チェック30→33を更新する。同ファイル183行付近の`toContainText('30問')`も33問へ更新しなければ実際の表示と不一致になるため、件数チェック更新の一部として変更する。
- `js/navigation.js`、`scripts/validate-content.cjs`、`index.html`、`data/practice-variant-groups.js`は変更しない。
- 既存230問とは全教材合計を指す。平面図形ファイルは30問であり、追加後は全教材233問・平面図形33問となる。
- 実装前ID確認: `grep -c "id: 'g6_plane_02[123]'" data/problems/practice-g6-plane.js`の実出力は`0`（一致なしのため終了コード1）。既存末尾は`g6_plane_005_v02`。
- 予測カード・スライダー・操作可能面積図は新規トピック追加時の検討事項。本件は確定済み演習と公式チップ拡張で、新規トピック/スライダー実装を追加しない。段階的な式変形は既存共通駆動を使用する。

## Evaluatorへの引継ぎ

- 仕様1章1〜22・25を個別に評価し、自己評価に実出力と未実施項目を記録する。23・24の網羅表更新はClaudeの別作業。
- `node scripts/validate-content.cjs`（233 problems、0 errors）、`node --test tests/catalog.test.cjs`、`npm test`、新規シナリオと既存Playwright全件を検証する。
- Chromeのdesktop/mobileで採点、全チップ方向、静的ラベルクリック時の無変化・エラーなし、SVG/チップの画面内表示、既存三角形・割合/比・類題導線を実操作する。実ブラウザ確認を実施できなければ正直に記録する。
- protected 4ファイルのgit diffが空、既存問題値の一致、app.jsの既存コードが無変更であることを確認する。
- ユーザー指示に従いコミット・pushしない。PMファイルはリポジトリ外で今回対象外かつ書込範囲外。TODOは該当項目がある場合に更新する。
