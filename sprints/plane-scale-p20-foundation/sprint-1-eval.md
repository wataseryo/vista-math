# Sprint 1: P-20 縮図・拡大図・縮尺(基本形) Evaluator評価

評価者: Claude(独立、Codexの自己申告を鵜呑みにせず実地再検証)

## 判定: ✅ 合格

## 実施した独立検証

1. **構造検証**: `node scripts/validate-content.cjs`(224問/0エラー)、`node --test tests/catalog.test.cjs`(10/10)、`npm test`(39/39)を手元で再実行。
2. **新規問題の個別ブラウザ検証**: 一時スペック(`tests/_tmp-g6-plane-020-check.spec.cjs`、検証後削除)で以下を確認(desktop/mobile、4ケース全pass)。
   - 問題タイトル・静的diagram表示
   - 誤答(2)→`wrong`、正答(1)→`correct`+「正解」
   - 「広げてみよう」`scale-drawing-reveal`: 「たしかめてみる」で①②③の手順が1つずつ積み上がり(前の行を消さない)、最終行に「100000」「1km」を含む結果が表示される
   - リセットでステップ・結果が消える
   - キーボード(Enter)での起動
   - `prefers-reduced-motion`時の即時表示(3ステップ同時出現)
3. **既存回帰スイート全件**: 静的サーバーを再起動して`npx playwright test`を実行、52件中51件pass、1件(`learning-extras.spec.cjs`「problem scroll and layout remain usable after detour」、水量問題のスクロール関連、平面図形・今回の変更と無関係)が30秒タイムアウトで失敗。該当テストのみ単体で再実行したところ3.5秒で正常pass。前回(P-15)と同様のシステム負荷による一時的なタイムアウトと判断し、コード起因の回帰ではないと結論。
4. **視覚的確認**: スクリーンショットで、①②③の手順が積み上がって表示され、最終結果ボックスに「4cm×25000＝100000cm＝1km」と正しく表示されていることを確認。静止画のまま(アニメーションで図形を動かさない)設計も意図通り。
5. **コード差分確認**: `git diff`で変更が`data/problems/practice-g6-plane.js`(Claude作成分)・`js/app.js`(Codex実装分、新規キー+新規関数`wireScaleSlotVisual`のみ追加)・`tests/catalog.test.cjs`(件数更新のみ)に限定されていることを確認。既存の`'triangle-base-scale'`・`wireScaleVisual`関数・CSSへの変更は皆無。
6. **数学的検算**: 4×25000＝100000cm＝1000m＝1km。確認: 1km＝100000cm、100000÷25000＝4cm、問題文の4cmと一致。

## 見つかった問題

なし。Planner差し戻しは不要。

## 所感

- 3スプリント連続で、環境制約(Codex側のブラウザ起動不可)とEvaluator側での実ブラウザ検証という役割分担が安定して機能している。回帰スイートの一時的なタイムアウトも、単体再実行で切り分ける運用が定着した。
