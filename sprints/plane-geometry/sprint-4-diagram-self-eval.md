---
created: "2026-09-21"
project: "plane-geometry"
sprint: 4
author: "Claude"
status: "done"
---

# Sprint 4 自己評価: 図(diagram)追加基盤 + 優先2問

## 背景

ユーザーが平面図形の問題を見て「図がないと分かりにくい」と指摘。別スレッドでCodexに
(1) 図追加の設計、(2) 難易度の受験コース適合性、を調査依頼し、計画を受領。
続けてCodexに構造整理(スキーマ・ファイル分割)の調査も依頼し、
「diagram追加を先に完成させてから物理分割・改名を行う」という順序を提案され、ユーザー承認済み。

本スプリントはその第一段階（P0: diagram契約の導入 + 優先2問への適用）。

## 実施内容

### 1. データスキーマに `diagram` フィールドを追加

対象: `data/problems.js` の `g6_plane_007`, `g6_plane_015`

```js
diagram: {
  kind: 'svg',
  markup: `<svg ...>...</svg>`,
}
```

- `diagram` が無い問題は従来通り何も表示されない（後方互換）
- markupは手書きSVG。既存の index.html 内SVG(pg-svg等)の配色・線幅規約(fill緑系/青系、stroke幅2、寸法線は色分け)に合わせた

### 2. 共通描画関数を追加

`js/app.js` に `renderProblemDiagram(problem)` を新規追加(escapeHtml関数の直前)。
`problem.diagram.markup` があれば `<div class="problem-diagram">` でラップして返し、無ければ空文字。

### 3. 2箇所の表示経路に接続

- `pracOpenProb()`: 問題文(`prac-detail-q`)と回答欄(`prac-ans-row`)の間に挿入
- `renderTrialQuestion()`: 問題文(`topic-trial-q`)と選択肢(`topic-trial-choices`)の間に挿入

対象2問はどちらも `topicUnitId` を持たない(体験問題対象外)ため、実際に描画されるのは演習画面のみ。
体験画面側の接続は今後トライアル問題に diagram を追加する際にそのまま使えるよう先行して用意した。

### 4. CSS追加

`css/style.css` に `.problem-diagram` / `.problem-diagram svg` を追加(`.prac-detail-q` の直後)。
カード型の白背景・角丸・影で既存の `.prac-detail-q` 等と統一。`max-width:320px` でレスポンシブ対応。

### 5. `g6_plane_007` の内容

問題文「下の図形（L字型）の面積を求めなさい」が指す図が従来存在しなかった既存バグを解消。
外側8cm×10cm、切り取り3cm×4cmを正確な縮尺(16px/cm)で描画。寸法線を色分け(青=よこ、赤=たて、橙=切り取り部分)。

### 6. `g6_plane_015` の内容修正

Codexの指摘(「向かい合う和が等しい」の証明が不十分、A〜Dを三角形名と頂点名で二重利用）を受けて:

- `text`: 「2本の対角線ACとBD」「三角形OABと三角形OCD」と図の頂点名(A,B,C,D,O)に合わせて明記
- `solution`: 対角線が交点Oで互いを二等分する性質から**4つの三角形すべてが等積**であることを示す正しい証明に書き換え(旧解説は「対角線が交点で分ける比から証明できる」で止まっていた)
- `hint`: 同様に更新
- `difficulty`: **5 → 3**に修正。Codexの内容評価(「★3程度。最上位問題としては易しい」)を反映。図と正しい証明が揃った状態での再評価
- `diagram`: 平行四辺形ABCD + 対角線AC・BD + 交点O + 底辺/高さの寸法線。**結論(50%やどの三角形が等しいか)は図に一切表示していない**(出題図と解説図の区別というCodexの指摘を遵守)

## 検証内容(実施済み)

ローカルで `python3 -m http.server` を起動し、Playwrightで実ブラウザ確認:

1. UIをクリックで辿り g6_plane_007 の演習画面を開き、L字型の図が正しい縮尺・配置で表示されることをスクリーンショットで確認
2. `appState.grade=6` を設定し `pracOpenProb('g6_plane_015')` を直接呼び出し、平行四辺形+対角線+頂点ラベル+寸法線が正しく表示されることを確認(375px幅でも確認、見切れなし)
3. 拡大表示で「高さ8cm」の回転テキストが正しくレンダリングされていることを確認(小さいスクリーンショットでは潰れて見えたが実際は正常)
4. `diagram` を持たない問題(`g6_plane_001`)に切り替えても図が残らず、正常に何も表示されないことを確認(後方互換の検証)
5. `initTopicTrial('u6-plane')` を呼び直しエラーが出ないこと、体験画面が従来通り描画されることを確認
6. `g6_plane_015` の答え合わせ(50入力→正解判定)が従来通り動作することを確認
7. `node --check` で `data/problems.js` / `js/app.js` の構文エラーがないことを確認

## 未実施・既知の制約

- ブラウザ手動での目視確認はPlaywright経由のみ。実機(スマホ実device)での確認は未実施
- 残り17問への diagram 追加は未着手(P1、次スプリント予定)
- 難易度再評価は `g6_plane_015` のみ実施。`g6_plane_012`〜`014`(Codexが同様に過大評価と指摘)は未着手
- 構造整理(ファイル分割・フィールド改名・categories.js整理)は本スプリントでは着手していない(計画通り、diagram完了後に着手予定)

## Codexレビュー結果(2026-09-21)

読み取り専用の独立レビューを実施。**ブロッキングな指摘なし。**

- SVGの座標を実際に計算検証: g6_plane_007(縮尺16px/cm、面積68cm²と整合)、g6_plane_015(頂点座標・対角線交点O・高さ線すべて数値的に整合)を確認
- 証明の妥当性を検証: 「AOとOCは同じ直線AC上にあり長さが等しい」ことが根拠として必要との指摘を受け、solution内の説明を修正済み(「頂点Bを共有」だけでなく「同じ直線AC上」を明記)
- 出題図に結論(50%等)が含まれていないことを確認
- renderProblemDiagram()の関数フック位置・スコープ・エスケープ方針に問題なし(SVGは信頼済みデータなので非エスケープが妥当と判定)
- 副作用なし: diagramを持たない113問は従来通り空文字が返り、CSSも衝突なし
- **検証の限界(指摘事項)**: g6_plane_007・015はどちらも`topicUnitId`を持たず、体験問題の難易度条件(★2以下)も満たさないため、`renderTrialQuestion()`側のdiagram描画は実際の体験フローでは一度も実行されていない(静的には正しいが未実測)。体験問題側の実地検証は、体験問題(u6_plane_trial_004等)にdiagramを追加するP1フェーズで行う

## 変更ファイル

- `data/problems.js`(g6_plane_007, g6_plane_015 に diagram 追加、015 の text/hint/solution/difficulty 修正)
- `js/app.js`(renderProblemDiagram 新規関数、pracOpenProb/renderTrialQuestion に接続)
- `css/style.css`(.problem-diagram 追加)

未コミット。`TODO.md` の差分は本スプリントと無関係(別途進行中のロードマップ改定)。
