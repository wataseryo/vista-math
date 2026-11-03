# 平面図形 P-02(多角形の内角外角・正多角形) 基礎1タイプ 新規追加

日付: 2026-10-23。発注元: `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`、`docs/curriculum-implementation-plan.md` 0.3節(2026-10-23確定、基礎tierから着手)。

## 背景

coverage-final.mdの平面図形のうち、P-02「多角形の内角外角・正多角形」は現状「無」(未収録)。P-01(Sprint 1)に続き、基礎tierの2タイプ目として着手する。

## 対象範囲(今回のスコープ)

- P-02「多角形の内角外角・正多角形」に演習問題1問を追加する(完了基準の条件1「有」化のみ。角数から内角を逆算する向きの2問目、外角のみを問う問題などは次スプリント以降)。
- 既存19問・`g6_plane_016`は一切変更しない。
- トピック画面へのインタラクティブ実装は対象外(必要になった場合は別スプリントでCodexに依頼)。

## 完了条件

1. `data/problems/practice-g6-plane.js`に`id: 'g6_plane_017'`を新規追加。catId:'pc-plane', mainCategory:'plane_geometry', grade:6, course:'exam', answerType:'number'。
2. 問題: 正八角形の1つの内角の大きさを求める(内角の和の公式(辺の数－2)×180°を使う基本形)。
3. 解説は`docs/content-authoring.md`の2026-10-23改訂基準(「いつもの説明」口調、2つ以上の【】見出し、丸数字の手順、【広げてみよう】、【確認】、「答え：」)に従う。外角の和(常に360°)を使った検算で【確認】を構成し、内角・外角の両方に触れる。
4. 図は`diagram:{kind:'svg', markup:...}`で正八角形の図(既存の平面図形問題と同じ座標系・配色規約)。
5. 答え(135°)は手計算で検算済みであること((8-2)×180÷8=135、別解: 外角360÷8=45、180-45=135で一致)。
6. `data/problems.js`・`index.html`・`data/categories.js`は変更不要。
7. `node scripts/validate-content.cjs`でエラー0件。
8. `npm test`が全件通過すること(問題数アサーションの更新を含む)。
9. 実ブラウザ(Playwright)で演習→平面図形カテゴリから新問題を開き、誤答・正答それぞれの判定、解説表示を確認する。既存回帰スイート全件(desktop+mobile)に影響がないこと。
10. 完了後、`coverage-final.md`・`coverage-final.json`・`curriculum-implementation-plan.md`のP-02該当行を無→有に更新し、集計を同期する。

## 担当

Claude(問題内容の作成・正答性、ファイル編集、検証)。新規ビジュアルを伴わないデータ追加(既存のSVG diagram機構の再利用のみ)のため、P-01(Sprint 1)と同様にClaudeが直接実装し自身で検証する。
