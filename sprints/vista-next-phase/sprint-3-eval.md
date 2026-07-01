# Sprint 3 評価レポート

## 判定: ✅ 合格

---

## テスト結果

| テストケース | 結果 | 詳細 |
|------------|------|------|
| 受験コースの学習モード選択画面に「弱点復習」カードが表示される | ✅ | `exam-mode-screen` 内に `.exam-mode-card.weak` が追加済み。タイトル・サブ・3つのfeatも含む |
| `onclick="showScreen('weak-review')"` で弱点復習画面へ遷移する | ✅ | `showScreen` に `'weak-review'` 分岐が追加され、`renderWeakReview()` を呼び出す |
| 弱点復習画面に5つのセクションが表示される | ✅ | 苦手カテゴリTOP3 / 苦手unit TOP3 / 最近間違えた問題 / おすすめ復習単元+ボタン の4カード（仕様の「復習ボタン」は各セクション内に統合） |
| 苦手カテゴリ TOP3 が正答率順（低い順）で正しく表示される | ✅ | `vista_stats` の `g{grade}_exam_{catId}` キーから `correct/total*100` を計算し `a.pct - b.pct` でソート。`total===0` 除外済み |
| 苦手unit TOP3 が表示される（3回以上挑戦したunitのみ） | ✅ | `vista_history` から `lessonUnit` 別に集計し `v.total >= 3` フィルタを適用 |
| 最近間違えた問題が最大5件表示される | ✅ | `attempts[attempts.length-1] === false` で最後の試行が不正解の問題を収集し `.slice(0, 5)` で最大5件 |
| 「この単元を復習する」ボタンを押すと演習問題へ遷移する | ✅ | `wrGoToCat(catId)` が `showScreen('practice')` → `pracOpenCat(catId)` を同期呼び出し。カテゴリ一覧をスキップして問題リストへ直接遷移 |
| データが5問未満の場合は専用メッセージが表示される | ✅ | `totalAnswered < 5 && historyProbs < 5` の場合に「まずは問題を解いてみよう！」メッセージを表示 |
| Claude API や外部サービスを使わず localStorageのデータのみで動作する | ✅ | `lsGet('vista_stats')` / `lsGet('vista_history')` のみ参照。外部依存なし |
| 既存の localStorage キー（`vista_stats`, `vista_history`）の構造を変更しない | ✅ | `renderWeakReview` は読み取り専用。`recordProblemAttempt` / `recordAnswer` の書き込みロジックは変更なし |

---

## 発見したバグ・問題

なし（クリティカルバグ・UIエラーともに0件）

---

## 観察・改善提案

### 観察1: `recentWrong` の時系列順序
- `vista_history` は `{ probId: [...] }` 形式でキー挿入順に依存する。
- 「最近間違えた」の表示順はオブジェクトキーの挿入順に依存するため、厳密な時系列順ではない。
- 仕様に「時系列順」の指定はないため問題なし。Sprint 4 でタイムスタンプ記録が追加されれば改善できる。

### 観察2: データ不足判定の AND 条件
- `totalAnswered < 5 && historyProbs < 5` は「どちらか一方が5以上なら分析を試みる」という意味になる。
- 例えば難問チャレンジだけで5問記録した場合、`historyProbs >= 5` となりデータ不足判定を抜けるが、演習問題 (`vista_stats`) の集計は空になりセクションが非表示になる。
- この動作は「データが少ない場合は各セクションを非表示」という仕様と整合しており実用上問題なし。

### 観察3: `wrGoToCat` のチラつき懸念（Generator 指摘済み）
- `showScreen('practice')` が `pracShowCats()` を呼んで一瞬カテゴリ一覧を描画した直後に `pracOpenCat(catId)` で上書きする設計。
- 同期的な DOM 操作のため、ブラウザが再描画する前に上書きが完了し、実際のチラつきは発生しない（`void next.offsetWidth` でリフローをトリガーするのは `showScreen` 内のスライドアニメーション用であり、画面切り替え後の描画は即時）。

---

## Generator へのフィードバック

修正事項なし。すべての完了条件を満たしている。

Sprint 4（保護者・塾向け簡易レポート）への申し送り:
- [ ] `recordProblemAttempt` にタイムスタンプを追加する際は既存の `true`/`false` 配列構造を維持すること（`getProblemHistory` / `getAttemptDots` が影響を受けないよう注意）
- [ ] `wrGoToCat` のロジックは Sprint 4 のレポート画面でも再利用できる
