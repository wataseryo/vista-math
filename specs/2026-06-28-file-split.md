---
created: "2026-06-28"
project: "ファイル分割・8分野スキーマ整理"
status: in_progress
sprints_total: 2
---

# 製品仕様書: ファイル分割 & 8分野スキーマ整理

## 背景・方針決定

- 受験コースを中学受験特化に寄せる
- 9分野 → **8分野**（データ・グラフは横断タグに降格）
- 問題に `tags` を持たせ「面積図使用」「グラフ読取」などで横断検索できる設計にする
- 問題スキーマを標準化して Claude Code による問題量産を可能にする

## 8分野定義

| # | 英語キー | 日本語 | 優先度 |
|---|---------|--------|--------|
| 1 | calc | 計算・数の処理 | C |
| 2 | number | 数の性質・規則性 | B |
| 3 | ratio | 割合・比 | A |
| 4 | speed | 速さ | A |
| 5 | special | 特殊算・文章題 | A |
| 6 | plane | 平面図形 | A |
| 7 | solid | 立体図形・水量 | A |
| 8 | logic | 場合の数・論理 | B |

優先度A（まず作る）: ratio, speed, special, plane, solid
優先度B（次に作る）: number, logic
優先度C（最後）: calc

## 横断タグ一覧（内部管理用）

線分図 / 面積図 / てんびん図 / 表 / グラフ / 樹形図 / ベン図 / ダイヤグラム
/ 比 / 単位換算 / 場合分け / ランダム生成可 / ビジュアル解説向き

## 新問題スキーマ

```js
{
  id: "g6_speed_001",        // grade_category_連番
  grade: 6,                   // 5 or 6
  course: "exam",             // "exam" | "std"
  mainCategory: "speed",      // 8分野の英語キー
  categoryLabel: "速さ",      // 表示用日本語
  subUnit: "旅人算",          // 小分類
  pattern: "出会い算",        // 典型パターン名
  difficulty: 3,              // 1〜5
  type: "challenge",          // "challenge" | "practice"
  title: "出会い算 基本",
  text: "...",
  answer: 20,
  answerUnit: "分",           // ← 旧 unit を改名
  hint: "...",
  steps: [...],               // challenge のみ
  tags: ["速さ", "旅人算", "線分図", "出会い"],
  // 表示スタイル（既存互換）
  catColor: "#2E7D32",
  catBg: "#E8F5E9",
  borderColor: "#43A047"
}
```

## Sprint 1: ファイル分割 + 8分野データ更新

**完了後の構成**
```
教育アプリ/
├── index.html        ← HTML構造のみ
├── css/
│   └── style.css     ← 全CSS
├── data/
│   ├── categories.js ← 8分野カテゴリ定義
│   └── problems.js   ← CHALLENGES / PRACTICE_PROBLEMS（新スキーマ）
└── js/
    └── app.js        ← 全JSロジック
```

**完了条件**
- [ ] 4ファイルに正しく分離されている
- [ ] EXAM_UNITS_G5/G6 が8分野（データ・グラフ削除）になっている
- [ ] PRACTICE_CATS が8分野になっている
- [ ] CHALLENGES の全28問に tags と answerUnit が追加されている
- [ ] ch.unit → ch.answerUnit の参照が app.js で更新されている
- [ ] GitHub Pages で正常に動作する（動作変化なし）

## Sprint 2: コンテンツロードマップ + 問題量産

- 5年・6年 × 8分野の単元ツリーをドキュメント化
- 優先度A分野に問題を追加（目標: 各分野10〜20問）
