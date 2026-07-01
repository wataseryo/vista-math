# Sprint 1 自己評価

## 完了条件チェック

| 完了条件 | 状態 | 備考 |
|----------|------|------|
| u6-ratio-screen を開いたとき、基本例題の直後に「体験問題」セクションが表示される | ✅ | `trial-u6-ratio` div + `showScreen` で `initTopicTrial('u6-ratio')` を呼び出し済み |
| u6-speed-screen を開いたとき、基本例題の直後に「体験問題」セクションが表示される | ✅ | `trial-u6-speed` div + `initTopicTrial('u6-speed')` |
| u6-special-screen を開いたとき、基本例題の直後に「体験問題」セクションが表示される | ✅ | `trial-u6-special` div + `initTopicTrial('u6-special')` |
| 体験問題セクションに「1 / 3」のような現在問題番号／全問数が表示される | ✅ | `.topic-trial-counter` に `${current + 1} / ${total}` を表示 |
| 問題文が表示される | ✅ | `.topic-trial-q` に `prob.text` を表示 |
| 4択の選択肢ボタンが表示される（選択肢は正解1つ＋ダミー3つ） | ✅ | `generateChoices()` で数値は ±差分、文字列は同 topicUnitId 内の他 answer を流用 |
| 正解の選択肢を選ぶと「正解」であることが分かる表示と解説が表示される | ✅ | `.topic-trial-feedback.ok` に「正解！」+ solution/hint を表示 |
| 不正解の選択肢を選ぶと「不正解」であることが分かる表示・正解・解説が表示される | ✅ | `.topic-trial-feedback.ng` に「不正解。正解は XX です。」+ solution/hint を表示 |
| 正誤判定後、「次の問題へ」ボタンが表示され、押すと次の問題に進む | ✅ | `nextTrialQuestion()` でインクリメントして `renderTrialQuestion()` を再描画 |
| 最後の問題の正誤判定後、「次の問題へ」ボタンの代わりに「演習問題へ進む」ボタンが表示される | ✅ | `isLast` フラグで分岐 |
| 「演習問題へ進む」ボタンを押すと、既存の openUnitPractice 関数が呼ばれて演習画面に遷移する | ✅ | `onclick="openUnitPractice('${topicUnitId}')"` |
| 体験問題セクションが表示されているとき、既存の「演習問題への導線」セクション（topic-nav-card）は非表示になる | ✅ | `initTopicTrial` 内で `navCard.style.display = 'none'` |
| topicUnitId に tier 1〜2 の問題が0件の場合、体験問題セクションが表示されない | ✅ | `problems.length === 0` のとき `container.style.display = 'none'` して early return |
| トピック画面を再度開いたとき、体験問題が最初の問題からリセットされる | ✅ | `showScreen` のたびに `initTopicTrial` が呼ばれ、`trialState[topicUnitId]` が `current:0` でリセットされる |

## 実装メモ

- 仕様から逸脱した点: なし
- 今回確認したところ、Sprint 1 の実装はすでに前回のスプリント作業（VISTA 次フェーズ等）の中で app.js / index.html / css/style.css に完全に組み込まれていた。
  - `js/app.js` に `initTopicTrial`, `renderTrialQuestion`, `generateChoices`, `checkTrialAnswer`, `nextTrialQuestion`, `escapeHtml` が実装済み
  - `index.html` に `trial-u6-ratio` / `trial-u6-speed` / `trial-u6-special` の div と `u6-ratio-nav` / `u6-speed-nav` / `u6-special-nav` の topic-nav-card が配置済み
  - `css/style.css` に `.topic-trial-*` スタイル一式が定義済み
  - `showScreen` 関数に `initTopicTrial` のトリガーが設定済み
- 次スプリントへの申し送り: なし（スプリントは1件のみ）

## 自己評価スコア

- 完了条件達成率: 14/14
- 懸念点:
  - `generateChoices` で文字列 answer のダミーが3件未満しか取れない場合、選択肢が4択未満になる可能性がある。ただし対象問題（u6-ratio / u6-speed / u6-special）の answer はすべて数値型のため実害なし。
  - `checkTrialAnswer` の onclick に `JSON.stringify(c.value)` を使用しているが、answer に HTML 特殊文字やシングルクォートが含まれる場合は XSS/構文エラーの可能性あり。現在の問題データはすべて数値のため問題なし。
