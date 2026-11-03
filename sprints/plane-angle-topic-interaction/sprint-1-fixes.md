# Sprint 1 修正記録

## 修正1: SVG補助線・分割角が表示されない
- 指摘: Evaluatorの実ブラウザ検証。SVG `g`に`hidden`属性が残り、発見後も補助線と分割角が非表示。
- 原因: SVG要素にHTML要素と同じ`.hidden`プロパティ操作を適用した。
- 修正: 新規例題の非表示操作を`toggleAttribute('hidden', true/false)`に統一。
- テスト改善: reduced-motionの同期判定を`hasAttribute`で確認し、SVG補助線と分割角を`toBeVisible()`で確認。
- 静的確認: `node --check js/app.js`と新規テストの構文チェック成功。
- 再検証: 親担当・Evaluatorが実行。

## 修正2: 既存問題数の固定アサーション
- 指摘: 2回目の全suiteは46 pass / 2 fail。既存`g6_plane_017`を含む21問に対して20問固定を要求したテストがdesktop/mobileで失敗。
- 確認: 親担当が問題データの着手時hashとの一致を確認。017は今回追加した問題ではない。
- 修正: 要求対象の`g6_plane_001〜016`と`u6_plane_trial_001〜004`の20 IDが存在することを厳密に確認。重複IDがないことも検査し、取得した既存21問全件の表示・採点を実施する。
- UI実装・問題データの変更なし。
- 再検証: 親担当・Evaluatorが実行。
