# 計算・数の処理 基礎9タイプ 新規追加

日付: 2026-10-15。発注元: `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`(小6受験算数カリキュラム網羅性レポート、Claude-Codex 4ラウンドレビューで合意済み)。

## 背景

coverage-final.mdの計算・数の処理(C-01〜C-15、mainCategory: 'calculation'、catId: 'pc-calc')は、レビュー時点で有0・部3(C-10,C-14,C-15)・無12。VISTAに独立した計算・数の処理の演習問題が1問も存在しない状態だった。

計画書(vista-grade6-curriculum-plan-2026-10-15.md)の整備順序で最優先とされる「基」(基礎)47項目のうち、計算・数の処理の基礎タイプを埋める。

## 対象範囲(今回のスコープ)

coverage-final.mdの「基」タイプのうち、以下9タイプに1問ずつ追加する。

- C-01 整数・小数・分数の四則混合
- C-02 約分・通分・帯分数と小数分数の変換
- C-03 括弧・計算順序・逆数を使う計算
- C-04 交換・結合・分配を用いる工夫
- C-05 □が一つの逆算
- C-09 概数・四捨五入・切捨てと元の数の範囲
- C-10 長さ・重さ・面積・体積・時間の単位換算(既存は速さ関連のみ。面積換算を追加)
- C-12 数の大小・不等号・計算結果の見積り
- C-14 単位量あたり・単価・密度の基礎(既存は速さ関連のみ。非速さの単位量あたりを追加)

C-06・C-07・C-08(標)、C-11・C-13(発)、C-15(標、既に部)は対象外(次スプリント以降)。

**平面図形(u6-plane)は対象外。既存の平面図形問題は一切変更しない。**

## 完了条件

1. `data/problems/practice-g6-calc.js` を新規作成し、`PRACTICE_G6_CALC` を宣言。catId:'pc-calc', mainCategory:'calculation', grade:6, course:'exam', answerType:'number'。IDは`g6_calc_basic_NNN`形式で既存と重複しない。
2. `data/problems.js`のPRACTICE_PROBLEMS配列に`...PRACTICE_G6_CALC`を追加。
3. `index.html`で新ファイルを`data/problems.js`より前・他のpractice-*.jsと同じ並びで読み込む。
4. `data/categories.js`は変更しない(演習カテゴリの表示は`PRACTICE_PROBLEMS`からの動的カウントのため、`available`フラグ変更は不要。`docs/content-authoring.md`参照)。
5. 各問題は`docs/content-authoring.md`の書式(2つ以上の【】見出し、丸数字の手順、【確認】、「答え：」)に従う。数値・答えは手計算で検算済みであること。
6. `node scripts/validate-content.cjs`でエラー0件。
7. `npm test`(37件)が通過すること。
8. 実ブラウザ(Playwright)で演習→計算・数の処理カテゴリが開けて、少なくとも1問を実際に解答・採点できること。
9. 完了後、coverage-final.md・plan・coverage-final.jsonの該当行(C-01,02,03,04,05,09,10,12,14)の判定・根拠IDを更新し、集計を同期する。

## 担当

Claude(問題内容の作成・正答性、ファイル編集、検証)。VISTAの役割分担上は通常Codexが実装を担うが、本件は新規ビジュアルを伴わない純粋なデータ追加(既存UIの再利用のみ)のため、Claudeが直接実装し、自身で検証する。大きな実装判断(新単元のビジュアル化等)が必要になった場合はCodexに引き継ぐ。
