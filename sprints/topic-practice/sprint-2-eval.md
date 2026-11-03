# Sprint 2 評価レポート: 体験問題 UX 改善

## 判定: 合格

## テスト結果

| # | テストケース | 結果 | 詳細 |
|---|------------|------|------|
| 1 | 不正解選択直後は「惜しい！もう一度考えてみよう」のみ表示 | 合格 | app.js 1920行: `feedbackEl.innerHTML = '<b>惜しい！もう一度考えてみよう</b>'` — 正解値・解説なし |
| 2 | 不正解後に「答えを確認する」ボタンが表示される | 合格 | app.js 1934行: `class="topic-trial-reveal-btn"` ボタンを `nextEl` に追加 |
| 3 | 「答えを確認する」押下で正解値・解説が表示される | 合格 | app.js 1969行: `feedbackEl.innerHTML` に「正解は〇〇です。」＋解説HTML を設定 |
| 4 | 「答えを確認する」押下で正解ボタンが `.correct` でハイライト | 合格 | app.js 1957–1961行: `data-is-correct="true"` のボタンに `.correct` を追加 |
| 5 | 押下前は正解ボタンがハイライトされず、押し間違えボタンのみ赤 | 合格 | app.js 1898–1904行: `isCorrect` が false の場合、選択ボタンに `.wrong` のみ付与。正解ボタンへの `.correct` 付与はスキップ |
| 6 | 正解選択時は即解説表示（変更なし） | 合格 | app.js 1913–1916行: `isCorrect` true のとき即 `feedbackEl.style.display = 'block'` |
| 7 | 「次の問題へ」は「答えを確認する」前でも押せる | 合格 | app.js 1934行: `reveal-btn` と `nextBtnHtml` を同一 innerHTML に並べて両方表示 |
| 8 | 数値ダミーの差分が正解値の 10〜30% 程度 | 合格 | app.js 1845行: `pct = 0.1 + Math.random() * 0.2` (10〜30%) × `Math.abs(base)` |
| 9 | 負値は除外される | 合格 | app.js 1852行: `.filter(v => v !== base && v > 0)` |
| 10 | 文字列 answer は従来通り（同 topicUnitId 内の他 answer を流用） | 合格 | app.js 1858–1867行: `PRACTICE_PROBLEMS` から同 `topicUnitId` のほかの answer を収集 |
| 11 | スマホのタップ領域が維持されている | 合格 | style.css 583行: `.topic-trial-reveal-btn { padding:13px; }` — `topic-trial-next-btn` と同じ padding |

## 発見したバグ・問題

なし。

## 補足観察（バグではない）

- `revealTrialAnswer` は `state.revealedAnswer` フラグで二重実行を防止しており、堅牢な実装。
- `generateChoices` でダミーが 3 件未満になるケース（base が 1〜3 の極小値）は、`Math.max(1, ...)` により最低差分 1 を保証しているが、候補の重複排除後に 3 件確保できない場合がある（例: base=2 のとき +1/-1 の 2 件のみ）。その場合、4択より選択肢数が少なくなる。仕様上の明示的な要件ではないため Critical には分類しない。
- 「答えを確認する」ボタンは `revealTrialAnswer` 実行後に `nextEl.innerHTML` で上書きされるため、二度押し防止は `state.revealedAnswer` フラグで担保されている。問題なし。

## Generator へのフィードバック

全11条件を満たしており修正不要。
