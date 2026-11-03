---
created: "2026-07-02"
project: "おすすめ復習"
status: draft
sprints_total: 1
---

# 製品仕様書: おすすめ復習

## プロダクト概要

localStorageに蓄積された解答履歴（vista_stats / vista_history）を分析し、苦手単元とおすすめ次アクションを提示する「おすすめ復習」画面を追加する。

現状のアプリは「問題を解いて解説を見る」だけで終わる。学習者は「次に何をすべきか」が分からず、学習が散漫になりやすい。本機能により「苦手を自動検出して次の一手を提示するアプリ」へ進化させる。

対象: 小学5・6年生（主に受験コース利用者）。保護者・塾講師の使用も想定。

## 既存実装との差分（重要）

「弱点復習」（`weak-review-screen`）が既に実装されている。現状の弱点復習と本機能の違いは以下のとおり:

| 項目 | 既存の弱点復習 | 本機能（おすすめ復習） |
|------|--------------|----------------------|
| アクセス経路 | 受験コース画面のみ | ホーム画面（コース選択画面）にもボタンを追加 |
| unit別苦手判定の閾値 | 3回以上試行 | 2問以上試行 AND 正答率70%未満 |
| unit別ソート順 | 正答率低い順のみ | 正答率低い順、同率は解答数多い方優先 |
| 全体正答率 | 非表示 | 画面上部に表示 |
| トピック学習への導線 | なし | 苦手unit TOP3 に「トピック学習へ」ボタンを追加 |
| 演習問題への導線 | 苦手カテゴリからジャンプのみ | 苦手unit からも「この単元の演習問題へ」ボタン |

**実装方針**: 既存の `weak-review-screen` / `renderWeakReview()` は一切変更しない。新規に `recommended-review-screen` と `renderRecommendedReview()` を追加する。

## データ構造（確認済み）

### vista_stats
```
{
  "g{grade}_exam_{catId}": { correct: N, total: N },
  ...
}
```
- `catId` は PRACTICE_CATS の `id`（例: `pc-ratio`, `pc-speed`, `pc-special` など）
- 演習問題を1問解くたびに `recordAnswer(key, correct)` が呼ばれて更新される

### vista_history
```
{
  "{probId}": [true, false, true, ...],
  ...
}
```
- `probId` は PRACTICE_PROBLEMS の `id`
- 1試行ごとに正誤（true/false）を配列に追記する
- `recordProblemAttempt(probId, correct)` で記録される

### 問題データ（PRACTICE_PROBLEMS）の関連フィールド
- `id`: 問題ID
- `catId`: PRACTICE_CATS の id（演習カテゴリ）
- `lessonUnit`: 単元名（日本語文字列、例: `'割合の基本'`, `'旅人算'`）
- `mainCategory`: 大分類（例: `'ratio'`, `'speed'`, `'word_problems'`）
- `title`: 問題タイトル
- `grade`: 学年（5 or 6）

### EXAM_UNITS_G5 / EXAM_UNITS_G6 の関連フィールド
- `id`: ユニットID（例: `'u6-ratio'`, `'u6-speed'`）
- `topicScreen`: トピック学習画面のscreen名（例: `'u6-ratio'`, `'u6-special'`）。存在しないunitはトピック学習ボタンを非表示にする
- `categories`: このunitに対応するカテゴリ名の配列

## 機能一覧

| # | 機能名 | 概要 | 優先度 | スプリント |
|---|--------|------|--------|-----------|
| 1 | おすすめ復習ボタン（ホーム画面） | ホーム画面のコースカード下部に「おすすめ復習」ボタンを追加 | Must | 1 |
| 2 | おすすめ復習ボタン（受験コース画面） | 受験コース画面の学習モードカード群の下に「おすすめ復習」ボタンを追加 | Must | 1 |
| 3 | おすすめ復習画面の表示 | 新規画面 `recommended-review-screen` を追加 | Must | 1 |
| 4 | 全体正答率の表示 | 演習問題（vista_stats）の全体正答率を画面上部に表示 | Must | 1 |
| 5 | 苦手unit TOP3 の表示 | 2問以上試行・正答率70%未満の単元を正答率昇順（同率は解答数降順）で最大3件表示 | Must | 1 |
| 6 | おすすめ復習アクション | 苦手unit TOP3 の各エントリに「トピック学習へ」「演習問題へ」ボタンを表示 | Must | 1 |
| 7 | 最近間違えた問題（最大5件） | 直近の試行が不正解（vista_history の最後の要素が false）の問題を最大5件表示 | Must | 1 |
| 8 | データ不足時の表示 | 苦手unit が判定できない場合（該当単元ゼロ件）はガイダンスメッセージを表示 | Must | 1 |
| 9 | 0件・クラッシュしない | 解答履歴が0件でもエラーにならず、ガイダンスメッセージのみ表示する | Must | 1 |

## スプリント計画

### Sprint 1: おすすめ復習画面の実装

- 機能: 上記1〜9のすべて
- 完了条件:
  - [ ] ホーム画面のコースカード下部に「おすすめ復習」ボタンが表示される
  - [ ] 受験コース画面（exam-mode-screen）に「おすすめ復習」ボタンが表示される
  - [ ] 両ボタンを押すと `recommended-review-screen` に遷移する
  - [ ] 画面上部に「全体正答率: N%（N/N問）」形式で全体正答率が表示される（vista_stats の全エントリが集計対象）
  - [ ] 苦手unit（2問以上試行 AND 正答率70%未満）が存在するとき、TOP3が正答率昇順で表示される
  - [ ] 同率の場合、解答数が多い方が上位に表示される
  - [ ] 各苦手unit に正答率バー、解答数（N/N問正解）が表示される
  - [ ] 各苦手unit に「演習問題へ」ボタンが表示され、押すと該当カテゴリの演習問題画面に遷移する
  - [ ] 各苦手unit が `topicScreen` フィールドを持つとき「トピック学習へ」ボタンが表示され、押すと該当トピック画面に遷移する
  - [ ] 各苦手unit が `topicScreen` を持たないとき「トピック学習へ」ボタンは表示されない
  - [ ] 最近間違えた問題（vista_history の最後が false）が最大5件表示される
  - [ ] 各間違い問題にタイトルとカテゴリ名が表示される
  - [ ] 苦手unitが0件のとき「もう少し問題を解くとおすすめ復習が表示されます」系のガイダンスが表示される
  - [ ] 解答履歴が0件でもクラッシュせず、ガイダンスメッセージが表示される
  - [ ] スマホ縦持ち（375px幅）で各要素が正常に表示される
  - [ ] 「← もどる」ボタンで前の画面（ホーム or 受験コース）に戻れる

## 苦手判定ロジック（詳細）

苦手unit の判定は `vista_history` の `lessonUnit` 別集計で行う。

1. `vista_history` を全エントリ走査し、`probId` から対応する問題（PRACTICE_PROBLEMS）を取得
2. 問題の `lessonUnit` をキーに、試行数合計・正解数合計を集計する
3. 集計結果から「試行数 >= 2 AND 正答率 < 70%」の単元を苦手単元とする
4. 正答率 = Math.round(correct / total * 100)
5. 苦手単元を正答率昇順でソート。同率の場合は試行数降順（多い方が上位）
6. 上位3件をTOP3として表示する

なお演習問題への導線は、問題の `catId` から PRACTICE_CATS のエントリを特定して既存の `wrGoToCat(catId)` を呼び出す。トピック学習への導線は、`lessonUnit` 名 → `catId` → PRACTICE_CATS → EXAM_UNITS_G{grade} → `topicScreen` の順で解決する（実装詳細は Generator に委ねる）。

## 画面遷移設計

```
ホーム画面（home-screen）
  └── [おすすめ復習ボタン] → recommended-review-screen
      ← [もどる] → home-screen

受験コース画面（exam-mode-screen）
  └── [おすすめ復習ボタン] → recommended-review-screen
      ← [もどる] → exam-mode-screen
```

どの画面から遷移したかを記憶し、「もどる」ボタンで正しい遷移元に戻れるようにする（既存の `showScreen()` でスタック管理が行われているか、appState に遷移元を記録するかは Generator の判断に委ねる）。

## 制約・前提条件

- index.html 1ファイル構成（HTML/CSS/JS すべて含む）を維持する
- `js/app.js` と `css/style.css` は index.html とは別ファイルだが、一体で管理している。これらも編集対象に含む
- 既存の `weak-review-screen` / `renderWeakReview()` は変更しない
- 既存の `wrGoToCat(catId)` 関数を演習問題導線として流用する
- `showScreen()` の既存の画面遷移インターフェースを壊さない
- 答えは整数（問題データの制約）
- スマホ表示（375px〜）でも崩れない CSS を書く

## 未解決の仮定

- 「全体正答率」は `vista_stats` の全キー（grade横断）を集計する。学年別に絞るべきか迷ったが、現状の `appState.grade` に合わせて `g{grade}_*` のみを対象とすると仮定する（Generator が適切に判断してよい）
- 「もどる」ボタンの遷移先（home vs exam-mode）は、`recommended-review-screen` 遷移前の画面を `appState` に記録する方式を想定するが、実装詳細は Generator に委ねる
- `lessonUnit` が存在しない問題（演習問題など古いデータ）は苦手判定の集計から除外する
- 最近間違えた問題の並び順は、`vista_history` のオブジェクトキー走査順（挿入順）と仮定する。タイムスタンプによるソートは行わない（既存の弱点復習と同じ方針）
- トピック学習への導線は `topicScreen` フィールドがある unit のみ有効。`catId` → unit の紐付けは EXAM_UNITS_G{grade} の `categories` 配列と PRACTICE_CATS の対応から解決する
