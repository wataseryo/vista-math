---
created: "2026-10-15"
project: "number-unit-foundation"
status: draft
sprints_total: 1
---

# 製品仕様書: 数の性質・規則性 基礎タイプ(Sprint 3)

元データ: `docs/curriculum-implementation-plan.md` セクション3.2、推奨スプリント順の第3段階。対象コード: `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`。

## プロダクト概要

小6受験コースの「数の性質・規則性」(u6-number)は現在演習問題が0件。coverage-final.mdで「基」(基礎)tierと判定された3タイプ(N-02, N-04, N-05)に、最低1問ずつの演習問題を追加し、「無」から「有」にする。平面図形(u6-plane)は対象外、変更しない。

## 機能一覧

| # | 機能名 | 概要 | 優先度 | スプリント |
|---|---|---|---|---|
| 1 | N-02 偶数奇数・倍数判定の演習問題 | 和と積の偶奇を利用した判断問題 | Must | 1 |
| 2 | N-04 公約数・最大公約数の演習問題 | 等分・敷詰めの文章題で最大公約数を使う | Must | 1 |
| 3 | N-05 公倍数・最小公倍数の演習問題 | 周期が一致する場面で最小公倍数を使う | Must | 1 |

## スプリント計画

### Sprint 1: 数の性質・規則性 基礎3タイプ
- 完了条件:
  - [ ] `data/problems/practice-g6-number.js`が新規作成され、`PRACTICE_G6_NUMBER`にN-02/N-04/N-05に対応する3問が定義されている
  - [ ] `data/problems.js`の`PRACTICE_PROBLEMS`に登録され、`index.html`で集約ファイルより前に読み込まれている
  - [ ] 各問題が`docs/content-authoring.md`の書式(【】2つ以上・丸数字手順・【確認】・「答え：」)に従っている
  - [ ] `node scripts/validate-content.cjs`が0エラーで通過する
  - [ ] `npm test`が全件passする(カタログの問題総数アサーションを更新済み)
  - [ ] 実ブラウザで演習→数の性質・規則性カテゴリが開け、3問すべてを個別に正答・採点できる
  - [ ] 平面図形(u6-plane)・他の未実装カテゴリに意図しない変更がない
  - [ ] coverage-final.md・plan・coverage-final.jsonのN-02/N-04/N-05行と集計が実装内容と同期している

## 制約・前提条件

- 平面図形は対象外(追加・変更どちらも行わない)
- 1タイプ1問の追加とし、数値・条件を変えた2問目(完了基準の条件2)は本スプリントの対象外
- mainCategory: `number_properties`、catId: `pc-number`、ID接頭辞: `g6_number_basic_`

## 未解決の仮定

- N-02の問題は「和と積の偶奇」という性質を使った判断問題として設計する(coverage-final.mdの残る条件「和と積の偶奇も」に対応)。具体的な出題形式はPlannerが仮定し、Generatorが実装する。
