---
created: "2026-07-01"
project: "特殊算・文章題 完成スプリント"
status: draft
sprints_total: 1
---

# 製品仕様書: 特殊算・文章題 完成スプリント

## プロダクト概要
前回スプリントで追加した特殊算・文章題カテゴリの残課題を全解消し、
鬼レビュー30ラウンドで品質を担保する。

## 機能一覧
| # | 機能名 | 概要 | 優先度 | スプリント |
|---|--------|------|--------|-----------|
| 1 | crane_hard_001 修正 | 運賃部分の不整合を解消し、3種類つるかめ算に差し替え | Must | 1 |
| 2 | 平均算トピックチャレンジ | g6_wp_avg_topic_001 を追加（★2） | Must | 1 |
| 3 | 分配算 演習3問＋topic1問 | catId:'pc-special' grade:6 + challenge | Must | 1 |
| 4 | 集合算 演習3問＋topic1問 | catId:'pc-special' grade:6 + challenge | Must | 1 |
| 5 | grade:5 演習問題10問 | catId:'pc-special' grade:5 で u5-special 対応 | Must | 1 |
| 6 | u6-special categories 更新 | 分配算・集合算を追加 | Must | 1 |
| 7 | 鬼レビュー30ラウンド | 全問題の数学検証・品質検証・一貫性検証 | Must | 1 |

## スプリント計画
### Sprint 1: 特殊算・文章題 完成
- 完了条件:
  - [ ] g6_wp_crane_hard_001 が整合性のある★4問題になっている
  - [ ] g6_wp_avg_topic_001 が追加されている
  - [ ] 分配算 演習3問（g6_wp_bunpai_001〜003）が追加されている
  - [ ] 分配算 topic challenge（g6_wp_bunpai_topic_001）が追加されている
  - [ ] 集合算 演習3問（g6_wp_venn_001〜003）が追加されている
  - [ ] 集合算 topic challenge（g6_wp_venn_topic_001）が追加されている
  - [ ] grade:5 演習問題10問が追加されている
  - [ ] u6-special.categories に 分配算・集合算 が含まれている
  - [ ] 全30問の数学的正確性が検証されている
  - [ ] 全チャレンジのステップ解説が正確である

## 制約・前提条件
- 既存スキーマを厳守する
- 答えは必ず整数（小数・分数の答えは問題設計で避ける）
- 確認計算を必ず実施する
- grade:5 問題は grade:6 より易しい設定にする
