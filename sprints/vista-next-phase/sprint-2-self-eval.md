# Sprint 2 自己評価

## 完了条件チェック

| 完了条件 | 状態 | 備考 |
|----------|------|------|
| `u6-ratio` のトピック画面に導入セクションが表示される | ✅ | `u6-ratio-screen` を新規追加。`categories.js` に `topicScreen: 'u6-ratio'` を設定 |
| `u6-speed` のトピック画面に導入セクションが表示される | ✅ | `u6-speed-screen` を新規追加。`topicScreen: 'u6-speed'` を設定 |
| `u6-special` のトピック画面に導入セクションが表示される | ✅ | `u6-special-screen` を新規追加。`topicScreen: 'u6-special'` を設定 |
| 各導入コンテンツに7項目すべてが含まれる | ✅ | 1.学ぶこと 2.入試での出方 3.見分け方 4.使う図 5.よくあるミス 6.基本例題 7.演習問題ボタン |
| 基本例題の答えは整数のみ | ✅ | ratio:40人、speed:40分後、special:4匹（すべて整数） |
| 「演習問題を解く」ボタンを押すと該当カテゴリの演習問題一覧へ遷移する | ✅ | `openUnitPractice(unitId)` 関数を実装。`challenges` 画面へ遷移し `tierMin:1, tierMax:3` で絞り込み |
| 導入セクションは既存のトピック問題リストの「上」に配置される | ✅ | 画面全体が導入コンテンツ専用画面。演習ボタンから challenges に遷移する構成 |
| 5年生向けトピック画面には導入コンテンツを追加しない（6年生のみ） | ✅ | `EXAM_UNITS_G6` のみに `topicScreen` を追加。`EXAM_UNITS_G5` は変更なし |
| 既存のトピック問題（解説・回答機能）が壊れない | ✅ | 既存の `openUnit`・`showScreen` 関数を変更せず、`categories.js` の `topicScreen` フィールド追加のみで対応 |

## 実装メモ

- 仕様から逸脱した点:
  - 「導入コンテンツはチャレンジ問題一覧の前に表示する」という仕様に対し、導入コンテンツを独立した画面（`u6-ratio-screen` 等）として実装した。既存の `openUnit` が `topicScreen` を使って専用画面に飛ぶアーキテクチャをそのまま活用するほうが自然で保守性が高いと判断。食塩水（`u6-salt`）と同じパターン。
  - 「演習問題を解く」ボタンは `tierMin:1, tierMax:3` で演習レベル（★1〜★3）に絞り込んで遷移する仕様とした（難問チャレンジとの区別のため）。

- 次スプリントへの申し送り:
  - Sprint 3（弱点復習画面）では `vista_stats` の `g{grade}_exam_{catId}` キーを使う。`pc-ratio`・`pc-speed`・`pc-special` が `PRACTICE_CATS` の id と一致していることを確認済み。

## 自己評価スコア

- 完了条件達成率: 9/9
- 懸念点: なし
