---
created: "2026-06-29"
project: "速さセクション"
status: draft
sprints_total: 1
---

# 製品仕様書: 速さセクション

## プロダクト概要
受験コース6年生向けに「速さ」分野を全構築する。割合・比と同じ構成（challenges screen ベース）。

## 機能一覧
| # | 機能名 | 概要 | 優先度 | スプリント |
|---|--------|------|--------|-----------|
| 1 | 演習問題30問 | PRACTICE_PROBLEMS に pc-speed を追加 | Must | 1 |
| 2 | チャレンジ問題10問 | CHALLENGES に speed を追加（★1〜★5） | Must | 1 |
| 3 | categories.js 更新 | u6-speed の count・categories を最新化 | Must | 1 |

## スプリント計画
### Sprint 1: 速さセクション全実装
- 完了条件:
  - [ ] PRACTICE_PROBLEMS に 30問（catId:'pc-speed'）が追加されている
  - [ ] CHALLENGES に 10問（mainCategory:'speed'）が追加されている
  - [ ] u6-speed の categories が時計算・ダイヤグラム・速さと比を含む
  - [ ] 演習問題画面で「速さ」が選択可能で問題が表示される
  - [ ] 難問チャレンジ単元別で「速さ」が表示され★4以上の問題が出る

## 制約・前提条件
- 割合・比と同じ構成（topicScreen なし、challenges screen 直接）
- 標準コースの speed-g6 は今回 available: false のまま（別途）
