---
created: "2026-07-01"
project: "鬼レビュー修正 Sprint 1"
status: draft
sprints_total: 1
---

# 製品仕様書: 鬼レビュー発見バグ修正

## プロダクト概要
2026-07-01 の鬼レビューで発見されたバグを修正する。

## Sprint 1 完了条件
- [ ] g6_ratio_work_003 の問題文が「400人の行列」になっている
- [ ] index.html の `<body>` タグが1つのみ
- [ ] watertank 戻るボタンが `goBackFromWatertank()` を呼び出す
- [ ] categories.js の count が実測値と一致 (u6-ratio:20, u6-salt:8, u6-special:36, u6-speed:30)
- [ ] localStorage 操作が lsGet/lsSet ラッパー経由になっている
- [ ] gameState.stars に NaN ガードが入っている

## 制約
- index.html 1ファイル構成を維持（js/app.js は存在しない）
