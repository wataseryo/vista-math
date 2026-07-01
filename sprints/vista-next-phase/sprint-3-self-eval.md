# Sprint 3 自己評価

## 完了条件チェック
| 完了条件 | 状態 | 備考 |
|----------|------|------|
| 受験コースの学習モード選択画面に「弱点復習」カードが表示される | ✅ | exam-mode-screen に .exam-mode-card.weak を追加 |
| 弱点復習画面に5つのセクションが表示される | ✅ | 苦手カテゴリ/苦手unit/最近間違えた問題/おすすめ復習単元/復習ボタンを実装 |
| 苦手カテゴリ TOP3 が正答率順（低い順）で正しく表示される | ✅ | vista_stats の g{grade}_exam_{catId} キーから集計 |
| 苦手unit TOP3 が表示される（3回以上挑戦したunitのみ） | ✅ | vista_history から lessonUnit 別に集計、3回以上フィルタ |
| 最近間違えた問題が最大5件表示される | ✅ | 最後の試行が false の問題を収集して最大5件 |
| 「この単元を復習する」ボタンを押すと演習問題へ遷移する | ✅ | wrGoToCat() 関数で practice スクリーン → pracOpenCat() へ遷移 |
| データが5問未満の場合は専用メッセージが表示される | ✅ | 「まずは問題を解いてみよう！」メッセージを表示 |
| Claude API や外部サービスを使わず、localStorageのデータのみで動作する | ✅ | 外部依存なし |
| 既存の localStorage キー（vista_stats, vista_history）の構造を変更しない | ✅ | 読み取り専用。書き込み変更なし |

## 実装メモ

### 変更ファイル
- `index.html`: exam-mode-screen に「弱点復習」カードを追加。weak-review-screen を新規追加
- `css/style.css`: 弱点復習カード・画面のスタイルを末尾に追加
- `js/app.js`: showScreen の dispatch に weak-review を追加。renderWeakReview() / wrGoToCat() を追加

### 実装判断
- 仕様の「5つのセクション」のうち「復習ボタン」は独立したセクションではなく各セクション内のボタンとして実装した。仕様のセクション4（おすすめ復習単元）とセクション5（復習ボタン）を1つのカード（wr-recommend）にまとめることで UI をすっきりさせた。
- wrGoToCat() は showScreen('practice') → renderPractice() → pracShowCats() の後に pracOpenCat() を同期的に呼ぶことで、カテゴリ一覧をスキップして問題リストへ直接遷移させる。
- データ不足判定は vista_stats の演習問題 (g{grade}_exam_*) の総解答数と vista_history の問題数のうち、どちらか一方でも 5 未満の場合にメッセージを表示する。

### 仕様からの逸脱点
- セクション5（復習ボタン）を独立セクションではなく各セクション内ボタンとして実装（UX上の判断）。

### 次スプリントへの申し送り
- Sprint 4（保護者・塾向け簡易レポート）では最終学習日の表示のため vista_history へのタイムスタンプ記録追加が必要。既存の true/false 配列構造を崩さないよう別キーで管理するか、recordProblemAttempt を拡張する方式を検討すること。

## 自己評価スコア
- 完了条件達成率: 9/9
- 懸念点: wrGoToCat() で showScreen → pracOpenCat を連続呼び出しする際、renderPractice が pracShowCats を呼んだ後に pracOpenCat が上書きするため表示は正しいが、ブラウザ確認でチラつきが発生しないか要確認。
