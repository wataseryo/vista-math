---
created: "2026-09-21"
project: "structure-cleanup"
sprint: 3
author: "Claude"
status: "done"
---

# Sprint 3 自己評価: フィールド名統一（最もリスクの高いステップ）

Codex構造整理計画のP1ステップ6・7を実施。データ改名とapp.js側の参照更新を同時に行う必要があり、これまでのステップより影響範囲が広い。

## 実施内容

### 1. `PRACTICE_PROBLEMS`: `unit` → `answerUnit`（115問）

対象: practice-g6-ratio/speed/special, practice-g5-special, practice-g6-plane（5ファイル）。
`lessonUnit`フィールドと衝突しないよう、負の後読み正規表現(`(?<![A-Za-z])unit:`)で厳密に区別。

**app.js側の変更**（PRACTICE_PROBLEMS由来の`.unit`参照6箇所）:
- `stdPracOpenProb`（144行目）、`stdPracCheckAnswer`（201行目）
- `pracOpenProb`（320行目）、`pracCheckAnswer`（380行目）
- `generateChoices`（1909行目）、`revealTrialAnswer`（2043行目）

**意図的に変更していない箇所**（別スキーマのため）:
- `generateProblem`/`checkAnswer`（804, 838行目）— 水槽ランダム生成クイズ(`quiz.problem`)独自の`.unit`。PRACTICE_PROBLEMSと無関係
- `revealAnswer(btn)`（1109行目）— `btn.dataset.unit`というDOM属性を読むだけの汎用関数。書き込み側（呼び出し元）でフィールド名を吸収済みのため変更不要

事前にこの区別をコードを実際に読んで確認済み（`stdPracOpenProb`もPRACTICE_PROBLEMSから`course:'std'`でフィルタしている、真に別スキーマなのは水槽クイズのみ、という事実を確認してから着手）。

### 2. `CHALLENGES`: `question` → `text`（87問全件）

app.js側2箇所（`renderChallengeList`のプレビュー生成、`openChallenge`の問題文表示）を更新。

### 3. `CHALLENGES`: `category` → `categoryLabel`（87問全件）

app.js側10箇所（フィルタ処理・カードバッジ表示・保存キー生成×3）を更新。

### 4. `CHALLENGES`拡張形式のみ: `unit` → `lessonUnit`（59問）

legacy形式(28問)には元々`unit`フィールドが存在しない（`answerUnit`のみ）ため対象外。
app.js側でこのフィールドを参照している箇所はゼロだったため、データ改名のみ（コード変更なし）。

## 検証内容(実施済み)

1. 全10分割ファイル + app.js で `node --check` 構文エラーなし
2. **残存確認**: `.unit`/`.question`/`.category`の残存箇所をapp.js全体でgrepし、意図的に残した3箇所（水槽クイズ2箇所+汎用revealAnswer1箇所）以外がゼロであることを確認
3. **深い内容比較**: Sprint 2コミット時点（HEAD）と現在を、フィールド名マッピング（unit→answerUnit等）を適用した上で order-independent な deep-equal で比較 → 202問全件で差異ゼロ
   - 初回の比較スクリプトでは全件「不一致」と出たが、原因はJSON.stringifyのキー順序依存というスクリプト側のバグと判明（値は完全一致、キー挿入順だけが異なっていた）。order-independentな比較に修正して再検証し、真に差異ゼロであることを確認
4. **ブラウザ実機確認**（Playwright）:
   - `g6_plane_015`の演習画面で単位表示（`%`）が`answerUnit`経由で正しく表示され、採点も正常動作
   - 不正解時の「解答を確認する」ボタンの`data-unit`属性が`answerUnit`経由で正しい値（`cm²`）を持つことを確認
   - 難問チャレンジをUIクリックで辿り、「割合・比」単元のカード一覧で`categoryLabel`ベースのバッジ（割合・ニュートン算・売買損益）と`text`ベースのプレビュー文が正しく表示されることをスクリーンショットで確認
   - 個別問題を開き、問題文表示・解答（正誤とも）・**localStorage保存キー生成**を確認:
     - `chSubmitAnswer()`実行後、`vista_stats`内に`g6_ch_水槽`・`g6_ch_割合`という**旧仕様と全く同じ形式**のキーが生成されることを確認（`categoryLabel`の値は`category`時代と同じ日本語文字列のため、保存キーの後方互換性が保たれている）

## 未実施・既知の制約

- `catId`/`mainCategory`の統合は行っていない（Codex調査で「別物であり統合しない」と結論済み、計画通り）
- 保護者レポート・弱点復習・おすすめ復習画面など、他の問題データ横断参照画面の個別クリック確認はしていない（該当画面は`lessonUnit`/`catId`を参照しており今回の改名対象と重複しないため、影響なしと判断したが実地未確認）
- 実際のユーザーのlocalStorageデータを使った回帰テストは未実施（新規ブラウザプロファイルでのテストのみ）

## Codexレビュー結果(2026-09-21)

読み取り専用の独立レビューを実施。**4項目全て指摘ゼロ。**

- データ改名の正確性: HEAD比較で115+87問全件、承認された改名以外の差異なし。拡張チャレンジの既存`answerUnit`フィールドは無傷、二重置換（`lessonAnswerUnit`等）も皆無
- app.js側の改修範囲: 全2196行をHEADと比較し、意図した置換以外の差分がないことを確認。水槽クイズ関連（764-845行目）と`revealAnswer()`（1108-1111行目）はバイト単位でHEADと同一（意図通り無変更）
- localStorage互換性: 保存キー生成部分（964-971行目）はバイト単位で無変更。87チャレンジ×学年5/6の組み合わせ計174パターンで、キー文字列がリネーム前後で完全一致することを独立検証
- 巻き添え変更: `.unit`/`.question`/`.category`の残存が意図した3箇所のみであること、`unitId5/unitId6`・`lessonUnit`利用箇所など無関係な識別子が無傷であることを確認

## 変更ファイル

- `data/problems/*.js`（9ファイル。practice系5 + challenge系4。challenge-legacyは`unit`フィールドが元々ないため対象外だが`question`/`category`改名は適用）
- `js/app.js`（18箇所の参照更新）

未コミット。
