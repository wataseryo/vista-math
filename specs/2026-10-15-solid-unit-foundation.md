# 立体図形・水量 基礎タイプ 新規追加(Sprint 2)

日付: 2026-10-15。発注元: `docs/curriculum-implementation-plan.md` セクション3.4、推奨スプリント順の第2段階。

## 対象範囲

- V-01 立方体直方体の体積・容積(基) — 新規
- V-02 角柱円柱の体積(基) — 新規
- V-17 一定流量の注排水と満水時間(基、部) — 残る条件「排水/同時注排水」を補完
- V-18 管の開閉・流量が途中で変わる(標、部) — 残る条件「閉管・減流・排水開始」を補完
- V-19 水量と水深・底面積の関係(標) — 新規

平面図形は対象外(今回も変更なし)。

## 完了条件

Sprint1(計算・数の処理)と同じ基準。`data/problems/practice-g6-solid.js`を新規作成し、`PRACTICE_G6_SOLID`を宣言。catId:'pc-solid', mainCategory:'solid_geometry', grade:6, course:'exam'。`data/problems.js`・`index.html`へ登録。`validate-content.cjs`・`npm test`・Playwright実ブラウザ確認。完了後coverage-final.md/plan/jsonを同期。

## 担当

Claudeが直接実装(新規ビジュアル不要な演習データ追加のため)。
