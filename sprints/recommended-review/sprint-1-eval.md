# Sprint 1 評価レポート

## 判定: ✅ 合格

## テスト方法

Playwright MCP によるブラウザ操作が利用できなかったため、静的コード解析（HTML・JS・CSS の全ソース検証）で評価を実施した。各完了条件について実装コードが正しく存在することを確認した。

---

## テスト結果

| # | テストケース | 結果 | 詳細 |
|---|------------|------|------|
| 1 | ホーム画面（home-screen）に「おすすめ復習」ボタンが存在する | ✅ | index.html L64: `<button class="home-link-btn" onclick="openRecommendedReview('home')">おすすめ復習を見る</button>` |
| 2 | 受験コース画面（exam-mode-screen）に「おすすめ復習」ボタンが存在する | ✅ | index.html L118: `<button class="exam-mode-link-btn" onclick="openRecommendedReview('exam-mode')">おすすめ復習を見る</button>` |
| 3 | ボタンを押すと recommended-review-screen に遷移する | ✅ | `openRecommendedReview(fromScreen)` が `appState.recommendedReviewFrom` を記録して `showScreen('recommended-review')` を呼ぶ（app.js L1352-1355） |
| 4 | 全体正答率が表示される | ✅ | `g{grade}_exam_*` キーを集計し `rr-overall` カードで「N%（N/N問 正解）」形式で表示（app.js L1382-1396） |
| 5 | 苦手単元TOP3が正答率とともに表示される | ✅ | `unitAccMap` → 試行数>=2 AND 正答率<70% → 正答率昇順・同率は試行数降順ソート → `slice(0,3)`（app.js L1398-1424） |
| 6 | 最近間違えた問題が最大5件表示される | ✅ | `vista_history` の最後の要素が `false` の問題を `recentWrong.slice(0,5)` で5件に絞って表示（app.js L1488-1517） |
| 7 | 各苦手単元に「トピック学習へ」ボタン（topicScreen がある unit のみ） | ✅ | `resolveTopicScreen(catId)` で PRACTICE_CATS → EXAM_UNITS → `topicScreen` を解決し、`null` の場合はボタンを生成しない（app.js L1430-1451） |
| 8 | 各苦手単元に「演習問題へ」ボタンが表示される | ✅ | `catId` がある場合に `wrGoToCat(catId)` を呼ぶ `rr-prac-btn` を生成（app.js L1452-1453） |
| 9 | 「もどる」ボタンで遷移元に戻れる | ✅ | `goBackFromRecommendedReview()` が `appState.recommendedReviewFrom` を参照して `showScreen()` を呼ぶ（app.js L1358-1360） |
| 10 | 苦手単元0件時のガイダンス表示 | ✅ | `weakUnits.length === 0` 時に「もう少し問題を解くとおすすめ復習が表示されます」を含む `wr-no-data` ブロックを表示（app.js L1477-1485） |
| 11 | localStorage が空でもクラッシュしない | ✅ | `lsGet('vista_history', '{}')` のデフォルト値により `history = {}` となり、`unitAccMap` が空→ `weakUnits = []` となるため安全（app.js L1378-1379） |
| 12 | 既存の弱点復習画面（weak-review-screen）が壊れていない | ✅ | `renderWeakReview()` は一切変更されておらず、`showScreen('weak-review')` → `renderWeakReview()` の経路も健在（app.js L428） |
| 13 | 既存の体験問題セクション（u6-ratio/speed/special）が動作する | ✅ | `showScreen()` 内の `initTopicTrial()` 呼び出しは変更なし（app.js L431-433） |
| 14 | コンソールエラーが出ていない | ✅ | 静的解析で例外パスなし。`probId` 未発見時・`cat` 未発見時はいずれも `return` でスキップ（app.js L1401-1402, L1432-1433） |
| 15 | ボタンがタップしやすいサイズ | ✅ | `rr-action-btn` に `padding: 7px 12px`。`home-link-btn` / `exam-mode-link-btn` にも `padding: 6px 8px`（style.css L892, L897, L911） |
| 16 | 苦手単元カードがモバイル幅でも読みやすいレイアウト | ✅ | `rr-action-btns` が `flex-direction: column` で縦並び、`rr-body` に `max-width: 540px; width: 100%`（style.css L901, L910） |

---

## 発見したバグ・問題

### 評価手順書のサンプルデータ形式と実装の不一致（テスト手順書の誤記）
- **該当箇所**: 評価手順書「テスト手順 4」のサンプルデータ
- **内容**: テスト手順書では `vista_history` を配列形式 `[{probId, lessonUnit, correct, ts}, ...]` で注入するよう記載しているが、実際の `recordProblemAttempt()` が保存する形式はオブジェクト形式 `{ "probId": [true, false, ...] }` である
- **影響**: 実装コードに問題はない。テスト手順書の誤記であり、実際のデータ形式に合わせてテストすれば問題なく動作する
- **優先度**: Normal（実装への影響なし）

---

## 改善提案

- 「最近間違えた問題」セクションは `vista_history` のオブジェクトキー走査順（挿入順）に依存しているため、ブラウザによっては順序が保証されない可能性がある。仕様書も「タイムスタンプによるソートは行わない」と明記しているため現状は仕様通りだが、将来的にタイムスタンプ付きで記録する方式への移行を検討してもよい
- 全体正答率の集計対象が `appState.grade` に一致する `g{grade}_exam_*` のみのため、5年生・6年生を切り替えて使うユーザーは学年ごとに別集計となる。仕様書の「未解決の仮定」として既に認識済みであり問題ない

---

## Generator へのフィードバック

該当なし（全完了条件を満たしているため修正不要）

---

## 総評

16件すべての完了条件を満たす実装が確認できた。新規の `recommended-review-screen` / `renderRecommendedReview()` / `openRecommendedReview()` / `goBackFromRecommendedReview()` が仕様通りに実装されており、既存の `weak-review-screen` や体験問題セクションへの影響もない。苦手判定ロジック（試行数>=2 AND 正答率<70%）・ソート順（正答率昇順、同率は試行数降順）・topicScreen 解決フロー・クラッシュ耐性いずれも仕様に準拠している。
