# Sprint 1 自己評価

## 完了条件チェック
| 完了条件 | 状態 | 備考 |
|----------|------|------|
| ホーム画面のコースカード下部に「おすすめ復習」ボタンが表示される | ✅ | `.home-links > .home-link-btn` を追加 |
| 受験コース画面（exam-mode-screen）に「おすすめ復習」ボタンが表示される | ✅ | `.exam-mode-links` に `.exam-mode-link-btn` を追加 |
| 両ボタンを押すと `recommended-review-screen` に遷移する | ✅ | `openRecommendedReview()` で遷移元を記録してから `showScreen('recommended-review')` を呼ぶ |
| 画面上部に「全体正答率: N%（N/N問）」形式で全体正答率が表示される | ✅ | `g{grade}_exam_*` キーを集計して `rr-overall` カードで表示。0件時は `---` |
| 苦手unit（2問以上試行 AND 正答率70%未満）が存在するとき、TOP3が正答率昇順で表示される | ✅ | `weakUnits` 配列を `pct` 昇順でソートして `slice(0, 3)` |
| 同率の場合、解答数が多い方が上位に表示される | ✅ | `sort((a, b) => a.pct !== b.pct ? a.pct - b.pct : b.total - a.total)` |
| 各苦手unit に正答率バー、解答数（N/N問正解）が表示される | ✅ | 既存の `.wr-acc-bar-*` クラスを流用 |
| 各苦手unit に「演習問題へ」ボタンが表示され、押すと該当カテゴリの演習問題画面に遷移する | ✅ | `wrGoToCat(catId)` を呼ぶ `rr-prac-btn` |
| 各苦手unit が `topicScreen` フィールドを持つとき「トピック学習へ」ボタンが表示される | ✅ | `resolveTopicScreen(catId)` で PRACTICE_CATS → EXAM_UNITS_G{grade} → topicScreen を解決 |
| 各苦手unit が `topicScreen` を持たないとき「トピック学習へ」ボタンは表示されない | ✅ | `resolveTopicScreen` が null を返す場合はボタン HTML を生成しない |
| 最近間違えた問題（vista_history の最後が false）が最大5件表示される | ✅ | `recentWrong.slice(0, 5)` で制限 |
| 各間違い問題にタイトルとカテゴリ名が表示される | ✅ | `prob.title` と `cat.title / prob.catId` を表示 |
| 苦手unitが0件のとき「もう少し問題を解くとおすすめ復習が表示されます」系のガイダンスが表示される | ✅ | `weakUnits.length === 0` 時に `wr-no-data` ブロックを表示 |
| 解答履歴が0件でもクラッシュせず、ガイダンスメッセージが表示される | ✅ | `history = {}` の場合は `unitAccMap` が空になり `weakUnits = []` となるため安全 |
| スマホ縦持ち（375px幅）で各要素が正常に表示される | ✅ | `rr-action-btns` を `flex-direction: column` に設定。`max-width: 540px` で中央揃え |
| 「← もどる」ボタンで前の画面（ホーム or 受験コース）に戻れる | ✅ | `appState.recommendedReviewFrom` に遷移元を記録し `goBackFromRecommendedReview()` で戻る |

## 実装メモ

- 仕様から逸脱した点:
  - なし。全完了条件を仕様通りに実装した。
  - 全体正答率は `g{grade}_exam_*` のみを集計（仕様の「未解決の仮定」で Generator に委ねられていた点を採用）。

- 設計判断:
  - `topicScreen` 解決ロジックは PRACTICE_CATS の `unitId5` / `unitId6` を使って EXAM_UNITS_G{grade} を引き、そこから `topicScreen` フィールドを取得する方式を採用。これにより catId と EXAM_UNITS の間の橋渡しをシンプルに実現した。
  - 苦手unit の正答率バーは既存の `.wr-acc-bar-*` クラスをそのまま再利用し、CSS 追加を最小化した。
  - `rr-action-btns` を縦並び（`flex-direction: column`）にすることで 375px 幅でもボタンが収まるようにした。
  - `showScreen('recommended-review')` が呼ばれると `appState.previousScreen` が上書きされるため、遷移前に `appState.recommendedReviewFrom` へ別途記録する方式で正しく「もどる」先を管理した。

- 次スプリントへの申し送り:
  - 本機能はスプリント1件で全完了条件を満たすため、次スプリントはなし。

## 自己評価スコア
- 完了条件達成率: 16/16
- 懸念点: なし
