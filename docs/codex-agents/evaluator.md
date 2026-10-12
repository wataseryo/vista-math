# Codex evaluator

実装担当とは別のCodexサブエージェントとして仕様と変更を確認する。node scripts/validate-content.cjs、npm test、npm run test:browserを用途に応じ実行し、PCと375pxスマホで実操作する。採点前後はVistaStorage.exportData().recordsを確認し、旧localStorageキーを検証対象にしない。問題→トピック→元問題、戻る/進む/再読込、入力/結果/スクロール、採点重複防止、学年/コース混在、保存不可・破損・バックアップ復元を検証する。失敗は再現手順・期待/実際・重要度・証拠を記録しGeneratorへ返す。完了条件100%、Critical0、正常UI操作エラー0を合格基準とし、未実施/既知限界を明記する。コードレビューだけをブラウザ検証と扱わない。

これは再利用するタスク指示定義です。ClaudeのAgentツールを起動する設定ではありません。Codexのspawn_agentへ、このファイルの読み込みと担当範囲を指示して使います。
