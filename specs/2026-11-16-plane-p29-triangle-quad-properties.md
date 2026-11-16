---
created: "2026-11-16"
project: "平面図形 P-29(三角形・四角形の性質と対角線) 部→有化 — 性質単体問題3問追加(新規ビジュアル機構は追加しない)"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-29(三角形・四角形の性質と対角線) の「部」→「有」化

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節、Plannerエージェントが2026-11-16に作成した「平面図形 残り22タイプの着手順序ロードマップ」)の「次の6スプリント」のうち、2番目のP-29(三角形・四角形の性質と対角線)を実装するスプリントである。1番目のP-05(正方形・長方形・ひし形の面積)は`specs/2026-11-16-plane-p05-area-formula.md`として完了済み(`js/app.js`の`PLANE_EXPAND_VISUALS`に`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`追加、`g6_plane_021〜023`追加、総問題数233・平面図形33問、`coverage-final.md`のP-05行は既に「有」に更新済みであることを確認した)。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`(および`coverage-final.json`)における現状:

```
P-29|三角形・四角形の性質と対角線|基|部|g6_plane_009|形の識別や性質そのものを問う課題なし
```

既存の`g6_plane_009`(`data/problems/practice-g6-plane.js`609行目付近)は、「平行四辺形を対角線BDで2つの三角形に分けると面積が等しい」ことを問う問題であり、主題は「対角線で分割した図形の面積の等しさ」である。これに対し「対角線自体の性質(垂直に交わるか・互いの中点で交わるか)」や「三角形・四角形そのものの性質(二等辺三角形の底角が等しい、等)」を単体で問う問題が存在しないことが「部」評価の理由である。

VISTAの演習は全問`answerType: 'number'`(数値入力式のみ、選択式・○×形式は存在しない)。したがって本スプリントでも、性質そのものを選ばせる形ではなく、**その性質を使って数値(角度・長さ・面積)を求めさせる問題**として設計する。

本スプリントは、代表的な性質3パターン(①二等辺三角形の底角が等しい、②平行四辺形の対角線は互いの中点で交わる、③正方形の対角線は互いの中点で垂直に交わる)について、性質の理解を単体で問う新規問題を1問ずつ(計3問)追加し、P-29を「有」に昇格させる。

技術的な結論(3章で詳細に根拠を示す): **本スプリントは`js/app.js`・`css/style.css`に一切変更を加えない。** 新規3問のうち1問(③正方形の対角線)は既存の`diagonal-quarter`ビジュアル(P-13の`g6_plane_015`が使用中のもの)を無改修でそのまま流用できる(数学的に整合することを確認済み)。残り2問(①二等辺三角形、②平行四辺形の対角線の長さ)は、既存のどのビジュアルも数学的に正しく流用できないため、`expandVisual`フィールド自体を省略し、「広げてみよう」欄を解説文(`solution`の【広げてみよう】見出し)のみで完結させる。これは`js/app.js`の`wirePlaneExpandVisual`が`expandVisual`未指定時に安全に何もしない(`if (!factory) return;`)ことをコードで確認済みの、既存機構の範囲内の挙動である。

## 対象外(今回のスコープに含めないもの)

- 「次の6スプリント」のP-29以外の5件(P-05は完了済み。P-11残り, P-09, P-31+P-10の2問目, P-16)。これらは別途specを起こす。
- `data/practice-variant-groups.js`(「類題(反復練習)」の対応表)。本スプリントはこの仕組みと無関係であり、新規3問をこの対応表に加える作業は行わない。
- 既存`g6_plane_009`(対角線で分割した三角形の面積の等しさ)の本文・正答・ID・`diagram`・`expandVisual`の変更。本スプリントは新規問題の追加のみで、この問題は無変更のまま残す。
- `g6_plane_015`(P-13、`diagonal-quarter`を使用中)の本文・正答・ID・`diagram`の変更。本スプリントは同じ`diagonal-quarter`キーを**無改修で**別の新規問題から追加参照するだけであり、`g6_plane_015`自体やその呼び出しコードには一切触れない。
- 線対称・点対称そのものを単体で問う問題(P-04の範囲として別途整理済み)。
- 台形を対角線で分割した場合の相似+等積変形の複合(P-13の「残る条件」に記載がある発展パターン)。
- `js/navigation.js`の変更(本スプリントは一切触れない)。
- 既存233問の内容変更。

---

## 1. 完了条件リスト

Evaluatorの合格基準(完了条件達成率100%・クリティカルバグ0件・`node scripts/validate-content.cjs` 0エラー・`npm test`全件pass・既存回帰Playwrightスイート全件pass)に対応する、検証可能な条件。

### データ

1. `data/problems/practice-g6-plane.js`の既存233問(全エントリ)は本文・正答・ID・`diagram`・`expandVisual`を含め一切変更されていない。特に`g6_plane_009`・`g6_plane_015`は無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_024`(二等辺三角形の底角)・`g6_plane_025`(平行四辺形の対角線の中点性質)・`g6_plane_026`(正方形の対角線の垂直・中点性質)の3オブジェクトが、この順で追加されている。3IDとも追加前のファイルに存在しないことを`grep -c "id: 'g6_plane_02[456]'" data/problems/practice-g6-plane.js`で追加前に0件だったことを確認した記録が残っている(Claude確認済み: 実装前0件)。
3. 新規3問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number'`であり、`lessonUnit`・`pattern`・`answerUnit`は本仕様4章の指定どおり(①`lessonUnit:'二等辺三角形の性質', pattern:'底角が等しい', answerUnit:'度'`、②`lessonUnit:'対角線の性質', pattern:'互いの中点で交わる', answerUnit:'cm'`、③`lessonUnit:'対角線の性質', pattern:'垂直に中点で交わる', answerUnit:'cm²'`)。
4. 新規3問の`solution`が、`docs/content-authoring.md`の構成基準(【ポイント】【解説】【広げてみよう】【確認】の4見出し、丸数字手順、「いつもの説明」口調、《 》式ブロック、末尾「答え：」)に従う。
5. 新規3問の`diagram`(SVG)が、各問題の数値・図形要素(①等しい辺のチックマーク、②平行四辺形の対角線交点O、③正方形の対角線交点Oと直角マーク)と整合する座標・ラベルで実装されている。本仕様4章末の座標方針に従い、既存SVGのコピー&数値書き換えではなく、問題ごとに座標・`viewBox`を再計算すること。
6. `js/app.js`・`css/style.css`は変更不要(本スプリントは新規ビジュアル機構を一切追加せず、既存`diagonal-quarter`キーを無改修でそのまま流用するか、`expandVisual`自体を省略するため)。実装後、`git diff js/app.js css/style.css`が空であることを確認する。
7. `g6_plane_026`(③正方形の対角線)のみ`expandVisual: 'diagonal-quarter'`・`expandVisualData: { pairPercent: 50 }`を指定する。`g6_plane_024`(①二等辺三角形)・`g6_plane_025`(②平行四辺形の対角線長さ)は`expandVisual`・`expandVisualData`フィールド自体を持たない。
8. `scripts/validate-content.cjs`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`は変更不要。実装後に`git diff scripts/validate-content.cjs index.html data/categories.js data/practice-variant-groups.js`がいずれも空であることを確認する。

### 件数アサーション・既存回帰

9. `tests/catalog.test.cjs`の問題数アサーションが233→236に更新されている(`assert.equal(r.count,236)`)。
10. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック2箇所(`toHaveCount(33)`)が`toHaveCount(36)`に更新され、該当テストが引き続きpassする。
11. `tests/plane-p05-formula-area.spec.cjs`内の件数チェック(`toHaveCount(33)`→`toHaveCount(36)`)、及び`validate-content.cjs`の出力を検証する箇所(`233 problems; 0 errors`→`236 problems; 0 errors`)が更新され、該当テストが引き続きpassする。
12. 新規3問は`PRACTICE_G6_PLANE`配列の末尾に追加するため、既存問題(`g6_plane_021〜023`、問31〜33)の「問N」通し番号表示は変化しない。新規3問は「問34」(①二等辺三角形)・「問35」(②平行四辺形の対角線)・「問36」(③正方形の対角線)として演習一覧・問題詳細タイトルに表示される。
13. `tests/practice-repetition.spec.cjs`の既存シナリオが本スプリントの変更後も無改修で全件passする。
14. `tests/plane-p05-formula-area.spec.cjs`の既存シナリオが本スプリントの変更後も無改修で全件passする。

### ビジュアル・UIの動作確認

15. `g6_plane_024`(①二等辺三角形)・`g6_plane_025`(②平行四辺形の対角線)を開いたとき、「広げてみよう」欄には`solution`の【広げてみよう】見出しの解説文のみが表示され、ボタン・タップ可能なチップなどのインタラクティブ要素は一切表示されない(ブラウザコンソールにエラーが出ないこと)。
16. `g6_plane_026`(③正方形の対角線)を開いたとき、「広げてみよう」欄に解説文に続けて`diagonal-quarter`ビジュアル(「回転してみる」ボタン)が表示され、タップすると△OAB相当の図形が180°回転して△OCD相当の図形に重なるアニメーションが再生され、結果欄に`OAB＝OCD、2つで全体の50%`という趣旨の文言が表示される。
17. `g6_plane_015`(P-13、`diagonal-quarter`の既存利用者)を開いたときのインタラクションが退行していない(結果欄の`pairPercent`が引き続き50%で表示される)。
18. 新規3問以外の全既存問題(`g6_plane_009`の`diagonal-rotate`、`g6_plane_021〜023`の`*-formula-slot`等)を開いたときの「広げてみよう」インタラクションが退行していない。

### 採点・検証コマンド

19. `node scripts/validate-content.cjs`が0エラーで終了する(236 problems; 0 errors)。
20. `node --test tests/catalog.test.cjs`・`npm test`が全件passする。
21. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
22. 本仕様5章の新規Playwrightシナリオが追加され、全件passする。
23. 新規3問の答え(54°, 15cm, 32cm²)がClaudeによる別解検算(4章参照)で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、完了条件に含める)

24. `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`のP-29行が「部」→「有」に更新され、`evidence_ids`に`g6_plane_024, g6_plane_025, g6_plane_026`が追加され(`g6_plane_009`は「対角線で分割した面積の等しさ」の根拠として残置)、「残る条件・確認事項」欄が本スプリントの成果を反映した内容に書き換えられている(7章参照)。平面図形の集計行(`|平面図形|33|12|3|18|`)が`|平面図形|33|13|2|18|`に更新されている。
25. 同ファイルの`coverage-final.json`も、`rows`配列中のP-29レコード(`status`, `evidence_ids`, `remaining`)と`stats.plane`(`有`:12→13, `部`:3→2)が同期して更新されている。
26. 上記24・25はVISTAリポジトリ外のファイルであり、VISTAの`npm test`・`validate-content.cjs`の対象ではない。Claudeが直接編集し、VISTA側のPlaywright/単体テストの完了条件には含めない。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_024`(二等辺三角形)・`g6_plane_025`(平行四辺形の対角線)・`g6_plane_026`(正方形の対角線)の3オブジェクトを追記。既存部分は無変更 | 追記 |
| `tests/catalog.test.cjs` | 問題数アサーションを233→236に更新 | 追記(1行変更) |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェック`toHaveCount(33)`を`toHaveCount(36)`に更新(2箇所)。本仕様5章の新規シナリオを追加 | 追記 |
| `tests/plane-p05-formula-area.spec.cjs` | 件数チェック`toHaveCount(33)`→`toHaveCount(36)`、`233 problems`→`236 problems`の期待値を更新 | 追記(数値変更) |
| `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md` / `coverage-final.json` | P-29行を部→有に更新、集計行を更新(1章24・25、7章参照) | 追記(VISTAリポジトリ外、Claude直接編集) |

`js/app.js`・`css/style.css`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`scripts/validate-content.cjs`・`js/navigation.js`は**いずれも変更不要**(3章参照)。これはP-05スプリントと最も異なる点であり、本スプリントの実装範囲を大きく縮小している。

---

## 3. 新規ビジュアルエントリの要否とその設計

### 結論: 新規ビジュアル機構は追加しない

ロードマップ(`docs/curriculum-implementation-plan.md` 0.4節)は区分A(「ほぼそのまま流用」)にP-29を分類し、「新しいアニメーション機構は不要」と評価した。実際に3問の内容を具体的に設計した上で、この評価は**妥当であることを確認した**。根拠は以下の2点。

#### (a) コード上の裏付け: `expandVisual`省略時の安全性

`js/app.js`の該当箇所(`wirePlaneExpandVisual`)を確認した。`const factory = PLANE_EXPAND_VISUALS[p.expandVisual]; if (!factory) return;`という構造になっており、`expandVisual`未指定/未知キーなら即return、エラーなしで終了する。「広げてみよう」というステップ自体は、`parseSolutionToSteps`/`renderSolutionSteps`が`solution`文字列中の`【広げてみよう】`見出しをパースして独立のステップとして描画する処理であり、`expandVisual`の有無とは完全に独立している。つまり`expandVisual`を省略しても、「広げてみよう」欄は**解説文だけで正常に表示され、JSエラーは一切発生しない**。

#### (b) 既存ビジュアルの流用可否を1問ずつ数学的に検証した結果

| 問題 | 性質 | 候補ビジュアル | 流用可否の判断 |
|---|---|---|---|
| ①二等辺三角形の底角(`g6_plane_024`) | 線対称(頂角の二等分線が軸) | `congruence-match`(180°点回転で合同を示す) | **不可**。`congruence-match`は「点Oを軸に180°回転させると重なる」という**点対称**の仕組みであり、二等辺三角形の底角が等しい理由は「頂角からの垂線を軸にした**線対称**」である。異なる幾何原理を誤って視覚化することになるため採用しない。 |
| ②平行四辺形の対角線の中点性質・長さ(`g6_plane_025`) | 対角線ACの長さが18cm、BDの長さが12cmのみ既知(2本の対角線のなす角は不明) | `diagonal-quarter`(結果文言が面積比) | **不可**。②の問題は対角線の長さしか与えておらず、2本の対角線のなす角が不明なため平行四辺形の面積(ひいては`pairPercent`)を数学的に確定できない。架空の数値を当てはめることになり不正確なので採用しない。 |
| ③正方形の対角線の垂直・中点性質(`g6_plane_026`) | 対角線16cmが点Oで垂直・中点に交わる→△OABの面積32cm² | `diagonal-quarter` | **可**。正方形は対角線の長さ・なす角(90°)・交点が中点であることが全て確定しているため、全体面積128cm²(4×32)に対する△OAB＋△OCDの割合は正確に50%と計算できる(`pairPercent: 50`)。かつ`diagonal-quarter`が元々示す「2本の対角線で分けた向かい合う三角形は合同」という事実は、正方形では実際に4つの三角形全てが合同になるため、より強い意味で成立しており数学的に矛盾しない。したがって**無改修でそのまま流用可能**と判断した。 |

③の`expandVisualData`は`{ pairPercent: 50 }`のみでよい。

以上から、**本スプリントは`js/app.js`・`css/style.css`に一切手を加えない**。これは区分Aの中でもさらに保守的な「流用すらせず、既存機構の『使わない』という選択肢を使う」という結論であり、ロードマップの想定より実装コストが小さい。

---

## 4. 新規問題3問の具体的な問題文・数値案

いずれも`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number'`。`docs/content-authoring.md`の4見出し構成・「いつもの説明」口調・《 》式ブロックに従う。`topicUnitId`は付与しない(P-05の`g6_plane_021〜023`と同じ慣例)。

### `g6_plane_024`(二等辺三角形の底角)

```js
{
  id: 'g6_plane_024',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '二等辺三角形の性質', pattern: '底角が等しい',
  difficulty: 1, answerType: 'number', answerUnit: '度',
  title: '二等辺三角形の角の性質',
  text: '二等辺三角形ABCがあります。AB＝ACで、角Bの大きさは63°です。\n角Aの大きさを求めなさい。',
  answer: 54,
  hint: 'AB＝ACの二等辺三角形では、底角(角Bと角C)の大きさが等しい。三角形の内角の和は180°。',
  solution: `【ポイント】
AB＝ACの二等辺三角形では、底辺BCに対する2つの角(角Bと角C)の大きさが等しい。

【解説】
① AB＝ACなので、角Bと角Cは底角であり、大きさが等しい。
② 角Bは63°なので、角Cも63°になる。
③ 三角形の内角の和は180°なので、角Aは、
《角A＝180－63－63＝54°》

【広げてみよう】
二等辺三角形を、頂角Aから底辺BCへ垂直に引いた線で折ると、角Bと角Cがぴったり重なる。これは三角形ABCが、その折り目の線を軸とした線対称の図形になっているから。正三角形も、3つの角がすべて等しい二等辺三角形の特別な場合と考えられる。

【確認】
《54＋63＋63＝180°》
三角形の内角の和と一致する。

答え：54°`,
  tags: ['平面図形', '三角形', '二等辺三角形', '角度'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 180－63－63＝54。別解: 二等辺三角形は線対称なので、折り目の軸で角Bと角Cが重なる→角B＝角Cは自明。角A＝180－(63×2)＝54で一致。

### `g6_plane_025`(平行四辺形の対角線は互いの中点で交わる)

```js
{
  id: 'g6_plane_025',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '対角線の性質', pattern: '互いの中点で交わる',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の対角線の交点',
  text: '平行四辺形ABCDの対角線ACとBDは、点Oで交わります。平行四辺形の対角線は、それぞれの中点で交わる性質があります。\n対角線ACの長さが18cm、対角線BDの長さが12cmのとき、OAの長さとODの長さの和を求めなさい。',
  answer: 15,
  hint: '対角線はそれぞれの中点で交わるので、OAは対角線ACの半分、ODは対角線BDの半分になる。',
  solution: `【ポイント】
平行四辺形の対角線は、それぞれの中点で交わる。

【解説】
① 点OはACの中点なので、OAはACの半分の長さになる。
《② OA＝18÷2＝9cm》
③ 点OはBDの中点でもあるので、ODはBDの半分の長さになる。
《④ OD＝12÷2＝6cm》
⑤ OAとODの長さの和は、
《⑥ 9＋6＝15cm》

【広げてみよう】
対角線が互いの中点で交わるという性質は、平行四辺形だけでなく、長方形・ひし形・正方形でも成り立つ(これらはすべて平行四辺形の仲間だから)。ただし、対角線の長さそのものが等しくなる(OA＝OB＝OC＝OD)のは、長方形・正方形のように対角線の長さが等しい図形に限られる。

【確認】
《OA＋OC＝9＋9＝18cm》
対角線ACの長さと一致する。
《OB＋OD＝6＋6＝12cm》
対角線BDの長さとも一致する。

答え：15cm`,
  tags: ['平面図形', '四角形', '対角線', '平行四辺形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: OA＝18÷2＝9、OD＝12÷2＝6、9＋6＝15。別解(全周検算): OC＝9(OAと等しい)、OB＝6(ODと等しい)なので、OA＋OB＋OC＋OD＝9＋6＋9＋6＝30＝(18＋12)で一致。

### `g6_plane_026`(正方形の対角線は互いの中点で垂直に交わる)

```js
{
  id: 'g6_plane_026',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '対角線の性質', pattern: '垂直に中点で交わる',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '正方形の対角線と三角形の面積',
  text: '正方形ABCDがあります。2本の対角線AC、BDは、点Oで垂直に交わり、それぞれの中点で交わります。対角線の長さは16cmです。\n三角形OABの面積を求めなさい。',
  answer: 32,
  hint: '対角線はそれぞれの中点で交わるので、OA、OBはどちらも対角線の半分の長さになる。角AOBは直角。',
  solution: `【ポイント】
正方形の対角線は、それぞれの中点で垂直に交わる。この2つの性質を使うと、対角線で区切られた三角形の面積を求められる。

【解説】
① 対角線の長さは16cmで、点Oはその中点なので、
《OA＝OB＝16÷2＝8cm》
② 2本の対角線は垂直に交わるので、角AOBは直角になる。
③ 三角形OABは、OAとOBを直角をはさむ2辺とする直角三角形とみなせるので、面積は、
《8×8÷2＝32cm²》

【広げてみよう】
同じように考えると、三角形OBC、OCD、ODAもすべてOA＝OB＝OC＝OD＝8cmの直角二等辺三角形になり、4つとも合同で面積が等しい。正方形全体の面積は32×4＝128cm²で、ひし形の面積公式(対角線×対角線÷2)を正方形(対角線が等しいひし形の仲間)に当てはめた16×16÷2＝128cm²とも一致する。

【確認】
《32×4＝128cm²》
正方形全体の面積と一致する。

答え：32cm²`,
  expandVisual: 'diagonal-quarter',
  expandVisualData: { pairPercent: 50 },
  expandAdvice: '対角線の交点を見つけたら、「中点で交わるか」「垂直に交わるか」の2つの性質を両方使えないか考えられるようにしよう！',
  tags: ['平面図形', '四角形', '対角線', '正方形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: OA＝OB＝16÷2＝8、8×8÷2＝32。別解(公式検算): 対角線×対角線÷2＝16×16÷2＝128(正方形全体)、128÷4＝32(△OABの面積)で一致。`expandVisualData.pairPercent`の検算: △OAB＋△OCD＝32＋32＝64、64÷128×100＝50%で`diagonal-quarter`の固定文言と整合する。

難易度は、①を★1(内角の和180°の単純な代入)、②③を★2(対角線の半分を求めた上でもう一段階の計算が必要)とした。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_023`が最後の要素)に、上記3オブジェクトをこの順で追記する。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-29 三角形・四角形の性質と対角線 ── */`)。この配置により、既存問題の通し番号は一切変化せず、新規3問は「問34」(①)・「問35」(②)・「問36」(③)として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールドのSVG自体はCodexが実装する。以下の点を厳守すること。

**共通の座標方針**: ①(二等辺三角形)は角度のみを問う問題であり、既存の角度問題(`g6_plane_016`のような折れ線の図)と同様、辺の長さを厳密な縮尺で描く必要はない(模式図でよい)。②③は長さ・面積を問うため、対角線の長さの比率(②: 18cmと12cmの比3:2、③: 対角線16cm)がある程度図から読み取れるようにする。

**配色**:
- ①(二等辺三角形、`g6_plane_024`): 既存の「三角形の面積」系問題と同じ色(塗り`#90CAF9` / 枠線`#1565C0`)。
- ②(平行四辺形、`g6_plane_025`): 既存の「平行四辺形の面積」系問題と同じ色(塗り`#A5D6A7` / 枠線`#2E7D32`)。
- ③(正方形、`g6_plane_026`): P-05で導入した正方形の配色(塗り`#CE93D8` / 枠線`#6A1B9A`、`g6_plane_021`と同じ)。
- 寸法線・ラベルの色は既存の慣例(横方向の長さ＝青`#1565C0`、縦方向の長さ＝赤`#E53935`)を踏襲する。不明な角・求める値には`#E53935`で「？」を表示する。

**①二等辺三角形(`g6_plane_024`)の座標方針**:
- 頂角Aを上、底角B・Cを下に配置する模式図(例: A(120,40)、B(40,170)、C(200,170))。
- 辺AB・ACそれぞれの中央に、同じ長さであることを示す短いチックマーク(等辺記号)を入れる。
- 角Bの位置に「63°」、角Aの位置に赤字で「？」を表示する。
- 目安`viewBox="0 0 240 200"`。

**②平行四辺形の対角線(`g6_plane_025`)の座標方針**:
- 平行四辺形ABCDを斜めの平行四辺形として描く(例: A(70,40)、B(30,170)、C(250,170)、D(190,40))。
- 対角線AC、BDを破線で描き、交点に点Oを打ち、ラベル「O」を添える。
- 対角線ACに沿って「対角線AC 18cm」(青)、対角線BDに沿って「対角線BD 12cm」(赤)のラベルを配置する。
- 既知の情報のみを表示し、OA・OD自体は「？」にしない(個別ラベルは置かない)。
- 目安`viewBox="0 0 320 210"`。

**③正方形の対角線(`g6_plane_026`)の座標方針**:
- 正方形ABCDをひし形向き(頂点が上下左右)で描く(例: A(160,40)、B(280,160)、C(160,280)、D(40,160))。
- 対角線AC、BDを破線で描き、交点Oに小さな直角マーク(直交記号)を入れる(`g6_plane_023`の直角マークの描き方を踏襲)。
- 対角線に沿って「対角線 16cm」のラベルを1か所(正方形なので2本の対角線は同じ長さ、重複ラベル不要)。
- 三角形OAB(A・O・Bで囲まれる領域)を薄い色で塗って強調する。
- 目安`viewBox="0 0 320 320"`。

**共通の仕上げ**:
- いずれも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する。
- 実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存`tests/plane-p05-formula-area.spec.cjs`または`tests/practice-repetition.spec.cjs`のヘルパー(`open`, `grade`, `records`, `withinViewport`)のパターンに倣い、新規ファイル`tests/plane-p29-triangle-quad-properties.spec.cjs`に以下を追加する。既存の回帰シナリオは、件数アサーションの33→36更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 演習問題→平面図形カテゴリを開き、一覧件数が36問(旧33問から+3)であることを確認する。
2. **二等辺三角形問題(`g6_plane_024`)**: 「問34 二等辺三角形の角の性質」を開き、問題文・SVGが角B＝63°に対応していることを確認。「54」を入力して正解表示を確認。「広げてみよう」欄に解説文のみが表示され、ボタンやタップ可能なチップが存在しないことをDOMで確認する(`.plane-anim-btn`・`.plane-expand-chip`要素が0件)。ブラウザコンソールにエラーが出ないことも確認する(favicon.ico由来の404は除外してよい)。
3. **平行四辺形の対角線問題(`g6_plane_025`)**: 「問35 平行四辺形の対角線の交点」を開き、問題文・SVGがAC＝18cm・BD＝12cmに対応していることを確認。「15」を入力して正解表示を確認。問題2と同様、インタラクティブ要素が存在しないことを確認する。
4. **正方形の対角線問題(`g6_plane_026`)**: 「問36 正方形の対角線と三角形の面積」を開き、問題文・SVGが対角線16cmに対応していることを確認。「32」を入力して正解表示を確認。「広げてみよう」欄で「回転してみる」ボタンをタップし、結果欄に「50」という数値(パーセント)を含む文言が表示されることを確認する。
5. **`diagonal-quarter`共有ロジックの回帰**: `g6_plane_015`(P-13、既存の`diagonal-quarter`利用者)を開き、「回転してみる」ボタンをタップして、結果欄に引き続き「50」という数値が表示されることを確認する。
6. **既存問題・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリ(例: 割合・比)の演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて、`g6_plane_009`(`diagonal-rotate`)・`g6_plane_021〜023`(`*-formula-slot`)を開き、「広げてみよう」のインタラクションが退行していないことを確認する。
7. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、「同じ考え方でもう1問」の案内が引き続き`g6_plane_002_v01`を指すことを確認する。
8. **モバイルビューポート**: 上記2〜4のシナリオを`mobile`プロジェクト(375×812)でも実行し、SVGと(③のみ)「広げてみよう」のボタンUIがビューポート内に収まることを確認する。
9. **構造検証**: `node scripts/validate-content.cjs`の出力が`236 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

VISTAの担当分担ルール(`.company/engineering/CLAUDE.md`「VISTAの担当分担」2026-10-12決定)に従う。本スプリントはP-05と異なり`js/app.js`・`css/style.css`の変更が存在しないため、Codexの作業範囲はSVG実装とテスト・検証に限定される。

### Codexが実装する範囲

- `g6_plane_024`・`g6_plane_025`・`g6_plane_026`の`diagram`(SVG)の新規実装(4章末の座標方針・配色指示に従う)。
- `tests/catalog.test.cjs`の件数アサーション更新(233→236)、`tests/practice-repetition.spec.cjs`・`tests/plane-p05-formula-area.spec.cjs`の`toHaveCount`・`233 problems`表記の更新。
- 本仕様5章のPlaywrightシナリオ(`tests/plane-p29-triangle-quad-properties.spec.cjs`)の実装、実ブラウザ(desktop/mobile)での動作確認。
- 自己評価(`sprints/plane-p29-triangle-quad-properties/sprint-1-self-eval.md`)の作成。
- `js/app.js`・`css/style.css`に変更が不要であることの最終確認(`git diff js/app.js css/style.css`が空であることのエビデンス記録)。

### Claudeが直接担当する範囲

- 新規問題3問の**数学的内容**(4章に確定済みの内容として提示)。
- 上記の正答性の別解検算(4章に記載済み)。
- `diagonal-quarter`を③に流用してよいか・①②に既存ビジュアルを流用すべきでない理由の数学的判断の確定(3章)。
- `coverage-final.md`・`coverage-final.json`のP-29行・集計の更新(1章24・25、7章参照)。
- Codex実装完了後の**独立レビュー**。
- Evaluatorとしての最終再確認。

---

## 7. `coverage-final.md`/`coverage-final.json`の更新内容

実ファイルパス: `/Users/wataseryo/ryo claude code/.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`・`coverage-final.json`(VISTAリポジトリ外)。

### `coverage-final.md`

P-29行:
```
|P-29|三角形・四角形の性質と対角線|基|有|g6_plane_024, g6_plane_025, g6_plane_026, g6_plane_009|二等辺三角形の底角、平行四辺形の対角線の中点性質(長さ)、正方形の対角線の垂直・中点性質(面積)の3問を追加(2026-11-16)。線対称・点対称そのものを単体で問う問題はP-04側で扱う。台形を対角線で分割した場合の相似+等積変形の複合はP-13の残存条件として別管理。数値・条件を変えた2問目は未追加|
```

集計行: `|平面図形|33|12|3|18|` → `|平面図形|33|13|2|18|`

### `coverage-final.json`

`rows`中の`P-29`レコードの`status`を`"部"`→`"有"`、`evidence_ids`を`["g6_plane_024", "g6_plane_025", "g6_plane_026", "g6_plane_009"]`、`remaining`を上記md行と同じ文言に更新。`stats.plane`を`{"有": 13, "部": 2}`に更新(`total`33は不変)。

Claudeが直接編集する(VISTA本体の`npm test`・`validate-content.cjs`の対象外)。

---

## 制約・前提条件

- `index.html`1ファイル構成+分割JS/データの既存構成を維持する。
- 答えは整数。新規3問の答え(54, 15, 32)はいずれも整数。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。
- `js/app.js`・`css/style.css`は本スプリントでは一切変更しない(3章の判断根拠を参照)。
- 正方形(③)の対角線16cmという数値は、平方根を一切必要としない。

## 未解決の仮定

- 新規3問の数値・難易度判断はPlannerの裁量であり、最終的な採否はユーザー確認が望ましい。
- ①②に`expandVisual`を一切付けない設計は3章の数学的理由に基づく。将来、軸対称専用の駆動ロジックが別タイプのために新規実装された場合、その資産を①に再利用する余地はあるが、これは別スプリントの判断とする。
- `g6_plane_009`を本スプリント後もP-29の`evidence_ids`に残すかの最終確認はユーザーに委ねる。
- ③で`diagonal-quarter`を`g6_plane_015`と共有することについて、将来どちらか一方の問題の数値・前提を変更する際は、もう一方の`pairPercent`の整合性が崩れないかを個別に確認する必要がある。
