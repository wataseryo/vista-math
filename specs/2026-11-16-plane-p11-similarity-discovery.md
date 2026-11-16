---
created: "2026-11-16"
project: "平面図形 P-11(相似の発見と長さの比) 残り部分の実装 — 直角着目型(イカ相似・ミミ相似)の新規収録2問+新規ビジュアル2件(平行線型は引き続き「部」管理のまま持ち越し)"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-11(相似の発見と長さの比) 残り部分の実装

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節、Plannerエージェントが2026-11-16に作成した「平面図形 残り22タイプの着手順序ロードマップ」)の「次の6スプリント」のうち、3番目のP-11(相似の発見と長さの比)残り部分を実装するスプリントである。1番目のP-05(正方形・長方形・ひし形の面積)・2番目のP-29(三角形・四角形の性質と対角線)はそれぞれ`specs/2026-11-16-plane-p05-area-formula.md`・`specs/2026-11-16-plane-p29-triangle-quad-properties.md`として完了済み(いずれも「部」→「有」化)。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`における現状:

```
P-11|相似の発見と長さの比|標|部|g6_plane_014|相似だと与えられず発見する型。平行線型(いわゆるピラミッド型・クロス型)だけでなく、直角・共通角・余角に着目して対応する三角形を見つける型(いわゆるイカ相似・ミミ相似を含む)も別途収録する。平行線型・直角着目型の収録状況をそれぞれ確認し、一方のみの収録や当該行の「有」判定をもって、両系統の確認完了とはしない|
```

この文言は2026-11-15のClaude-Codexレビュー(`.company/engineering/sprints/vista/2026-11-15-plane-coverage-check/discussion.md`)の最終合意に基づく。

### 既存`g6_plane_014`の内容確認

`data/problems/practice-g6-plane.js`888行目付近の`g6_plane_014`を確認した。「相似比が1:3の2つの正方形があり、小さい方の面積4cm²から大きい方の面積を求める」問題で、**相似比(1:3)が問題文で最初から与えられており、どの三角形(図形)同士が相似かを自分で見つけ出す要素が一切ない**。これは面積比(相似比の2乗)の計算練習としては妥当だが、P-11が求める「相似の発見」の根拠にはならない。`grep -n "相似" data/problems/*.js`で確認した結果、発見型の相似問題はVISTA全体で0件であることを確認した。

### 前提の訂正: `g6_plane_016`はP-11とは無関係

`g6_plane_016`(`data/problems/practice-g6-plane.js`990行目付近)は**P-01(平行線・対頂角・三角形の角)の角度問題**(2本の平行線にはさまれた折れ角を補助線の錯角で求める問題、`expandVisual: 'angle-reveal'`)であり、相似を扱う問題ではない。したがって「`g6_plane_016`で平行線型相似に対応済み」という前提は誤りであり、**平行線型(ピラミッド型・クロス型)の発見型問題は、本スプリント実装後もVISTAに1問も存在しない状態が続く**。

### 技術的な結論

ロードマップの評価「直角三角形が共通角・余角を挟んで重なる形に新規作図する必要があるが、状態遷移(play/reset、ステップ表示)は既存の`wire*Visual`パターンをそのまま使える」は、実際に設計した結果**妥当であることを確認した**。`js/app.js`の`similarity-tiles`・`triangle-base-scale`は、どちらも「既に与えられた相似比・倍率を式で確かめる」専用の表示ロジックであり、新しい三角形の重なり方・角度の対応を示す描画は一切含まれていないため、そのまま数値だけ差し替えて流用することはできない。一方、`angle-reveal`(`g6_plane_016`用)が採用している「静的な図形+`hidden`属性で隠した補助要素を`play`ボタンで段階的に公開し、`appendExpandStep`でステップ文を1行ずつ追加し、`createTopicSequence().after()`でタイミング制御する」という**状態遷移の型そのもの**は、三角形の重なり・角度の対応の提示にそのまま転用できる。したがって本スプリントは、`PLANE_EXPAND_VISUALS`への新規エントリ2件と、専用駆動関数(`wire*Visual`)2件を追加する(3章)。CSS面では、既存の汎用クラス`.plane-expand-part`(fill/stroke/opacity transition)・`[hidden]`トグルがそのまま流用可能であり、**新規CSSクラスの追加は不要**と判断した。

### 本スプリントの適用範囲

2026-11-15レビューの要求を踏まえ、本スプリントは**直角着目型(イカ相似・ミミ相似)の2問のみ**を新規追加する。

- ①ミミ相似(直角三角形の高さが作る3相似、`g6_plane_027`)
- ②イカ相似(直角の頂点を共有しない2つの直角三角形が余角を挟んで重なる、`g6_plane_028`)

**平行線型(ピラミッド型・クロス型)の発見型問題は本スプリントのスコープに含めない。** これを受けて、coverage-final.mdのP-11行は本スプリント完了後も**「部」のまま維持し、「有」に更新しない**(ユーザー確認済み、7章参照)。平行線型の発見型問題の新規追加は、別スプリントとして今後計画する。

## 対象外(今回のスコープに含めないもの)

- 平行線型(ピラミッド型・クロス型)の発見型相似問題の新規追加。本スプリントのスコープ外であり、P-11は「部」のまま残る。
- 「次の6スプリント」のP-11以外の3件(P-05・P-29は完了済み。P-09, P-31+P-10の2問目, P-16)。これらは別途specを起こす。
- 次スプリントとして予定されているP-14(補助線で相似を作る・複数相似)自体の実装。本スプリントは3章でP-14との資産再利用の見通しを示すのみ。
- `data/practice-variant-groups.js`。本スプリントはこの仕組みと無関係。
- 既存`g6_plane_014`の本文・正答・ID・`diagram`・`expandVisual`の変更。
- `js/navigation.js`の変更。
- 既存236問の内容変更。
- 三平方の定理(中学範囲)を用いた説明。本スプリントの2問はいずれも、比例式の性質(外項の積＝内項の積)の範囲で解けるよう数値を設計している。

---

## 1. 完了条件リスト

### データ

1. `data/problems/practice-g6-plane.js`の既存236問は本文・正答・ID・`diagram`・`expandVisual`を含め一切変更されていない。特に`g6_plane_014`は無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_027`(ミミ相似)・`g6_plane_028`(イカ相似)の2オブジェクトが、この順で追加されている。2IDとも追加前のファイルに存在しないことを確認済み(0件)。
3. 新規2問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm'`であり、`lessonUnit`・`pattern`は本仕様4章の指定どおり。
4. 新規2問の`solution`が`docs/content-authoring.md`の構成基準に従う。
5. 新規2問の`diagram`(SVG)が、各問題の数値・図形要素と整合する座標・ラベルで実装されている。
6. `js/app.js`の`PLANE_EXPAND_VISUALS`オブジェクトに、`triangle-altitude-similarity`・`square-perpendicular-similarity`の2エントリが本仕様3章のコードのとおり追加されている。既存エントリは一切変更されていない。
7. `js/app.js`に、専用駆動関数`wireTriangleAltitudeSimilarityVisual(prefix, d)`・`wireSquarePerpendicularSimilarityVisual(prefix, d)`の2関数が追加されている。
8. `css/style.css`は変更不要(既存の汎用クラスをそのまま流用するため)。実装後、`git diff css/style.css`が空であることを確認する。
9. `scripts/validate-content.cjs`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`は変更不要。
10. 新規2問の`expandVisualData`は、①`{ ah: 9, bh: 16, ch: 12 }`、②`{ ap: 6, bp: 3, ad: 9, bq: 2 }`であり、2つの`wire*Visual`関数のステップ文言・`formula-reveal`表示はこれらの値から動的に生成される(数値をHTML文字列に直書きしない)。

### 件数アサーション・既存回帰

11. `tests/catalog.test.cjs`の問題数アサーションが236→238に更新されている。
12. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック(`'36問'`・`toHaveCount(36)`)が`'38問'`・`toHaveCount(38)`に更新され、該当テストが引き続きpassする。
13. `tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`それぞれの件数チェックが更新され、既存シナリオが引き続きpassする。
14. 新規2問は配列末尾に追加するため、既存問題(問34〜36)の「問N」通し番号表示は変化しない。新規2問は「問37」(①)・「問38」(②)として表示される。
15. 既存ファイルのシナリオが、件数アサーションの更新を除き無改修で全件passする。

### ビジュアル・UIの動作確認

16. `g6_plane_027`(①ミミ相似)を開くと、「広げてみよう」欄に直角三角形ABCの図と「相似を見つけてみる」ボタンが表示される。ボタンをタップすると、三角形ACH・三角形CBHが異なる色でハイライトされ、角の対応を示す弧が段階的に表示され、最終的に結果欄に「CH＝12」という趣旨の文言が表示される。「もう一度」ボタンで初期状態に戻る。
17. `g6_plane_028`(②イカ相似)を開くと、「広げてみよう」欄に正方形ABCDの図と「相似を見つけてみる」ボタンが表示される。ボタンをタップすると、三角形APD・三角形BQPが異なる色でハイライトされ、角の対応を示す弧が段階的に表示され、最終的に結果欄に「BQ＝2cm」という趣旨の文言が表示される。「もう一度」ボタンで初期状態に戻る。
18. 新規2問以外の全既存問題(`angle-reveal`・`similarity-tiles`・`triangle-base-scale`等)を開いたときの「広げてみよう」インタラクションが退行していない。
19. 新規2問の「広げてみよう」欄をタップした際、ブラウザコンソールにエラーが出ない(favicon.ico由来の404は除外してよい)。

### 採点・検証コマンド

20. `node scripts/validate-content.cjs`が0エラーで終了する(238 problems; 0 errors)。
21. `node --test tests/catalog.test.cjs`・`npm test`が全件passする。
22. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
23. 本仕様5章の新規Playwrightシナリオ(`tests/plane-p11-similarity-discovery.spec.cjs`)が追加され、全件passする。
24. 新規2問の答え(12cm, 2cm)がClaudeによる別解検算で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、完了条件に含める)

25. `coverage-final.md`のP-11行が更新される。ただし**ステータスは「部」のまま維持し「有」には更新しない**(ユーザー確認済み)。`evidence_ids`に`g6_plane_027, g6_plane_028`が追加され、「残る条件・確認事項」欄が、直角着目型は収録済み・平行線型は依然未収録であることを正直に反映した文言に書き換えられている。平面図形の集計行は変化しない。
26. `coverage-final.json`も、P-11レコードの`evidence_ids`・`remaining`が同期して更新される。`status`は`"部"`のまま、`stats.plane`も変更しない。
27. 上記25・26はVISTAリポジトリ外のファイルであり、Claudeが直接編集し、VISTA側のテストの完了条件には含めない。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_027`・`g6_plane_028`の2オブジェクトを追記 | 追記 |
| `js/app.js` | `PLANE_EXPAND_VISUALS`に2エントリ、専用駆動関数2つを追記 | 追記 |
| `tests/catalog.test.cjs` | 問題数アサーションを236→238に更新 | 追記 |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェックを更新 | 追記 |
| `tests/plane-p05-formula-area.spec.cjs` / `tests/plane-p29-triangle-quad-properties.spec.cjs` | 件数チェックを更新 | 追記 |
| `tests/plane-p11-similarity-discovery.spec.cjs`(新規) | 本仕様5章の新規Playwrightシナリオ | 新規作成 |
| `coverage-final.md` / `coverage-final.json` | P-11行の`evidence_ids`・`remaining`を更新(ステータスは「部」のまま維持) | 追記(VISTAリポジトリ外、Claude直接編集) |

`css/style.css`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`js/navigation.js`は**いずれも変更不要**。

---

## 3. 新規ビジュアルエントリの要否とその設計

### 結論: `PLANE_EXPAND_VISUALS`への新規エントリ2件+専用駆動関数2件を追加する(CSSの新規追加は不要)

#### (a) 既存`similarity-tiles`/`triangle-base-scale`の流用可否

- `similarity-tiles`: 小さい正方形を9個並べて大きい正方形を作る「タイル敷き詰めカウントアップ」。駆動関数は汎用の`wireSequentialReveal(prefix, total, doneStatus)`で、三角形の重なり方・対応する角の提示という概念自体が存在しない。流用不可。
- `triangle-base-scale`: 底辺が2倍・高さが同じ2つの三角形を並べて見せ、式変形を固定テキストで段階表示するだけ(駆動関数`wireScaleVisual`は`d`を一切使わない)。2つの三角形は常に別々に(重ならずに)並べて描かれるため、「直角三角形が重なり合う配置」を表現できない。流用不可。

#### (b) 流用できる既存機構(状態遷移パターン)

`angle-reveal`とその駆動関数`wireAngleRevealVisual`の「静的なSVG+`hidden`属性で隠した補助要素を`play`ボタンのクリックで段階的に公開し、`appendExpandStep`でステップ文を1行ずつ追加し、`createTopicSequence().after(delay, fn)`でタイミング制御し、`reset`で`hidden`属性を戻してステップをクリアする」という**状態遷移の型**は、三角形の重なり・角の対応の提示にそのまま転用できる。

三角形のハイライト表示には既存の汎用CSSクラス`.plane-expand-part`(`fill`/`stroke`/`opacity`の`transition`が定義済み)がそのまま使える。弧(角の対応マーク)の表示・非表示は、既存の`[hidden]`トグルをそのまま使う。

以上より、**本スプリントは`css/style.css`に一切変更を加えない**。

#### (c) 新規エントリ・新規関数の設計方針

本スプリントの2関数は将来のP-14での再利用を見据え、`d`を受け取り、ステップ文言・`formula-reveal`の数値をすべて`d`から動的に生成する設計にする。数値をJS内に直書きしないことで、将来異なる数値のP-14問題に同じ関数を再利用する際、関数本体の変更が不要になる。

### `js/app.js`への追記コード

`PLANE_EXPAND_VISUALS`オブジェクト内、`exterior-angle-circle`のエントリの直後、オブジェクトの閉じ括弧`};`の直前に、以下の2エントリを追加する。

```js
    'triangle-altitude-similarity': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 280 170" style="width:100%;max-width:280px;display:block" role="img" aria-labelledby="pe-as-title pe-as-desc">
                <title id="pe-as-title">直角三角形ABCの頂点Cから斜辺ABに垂線CHを引いた図</title>
                <desc id="pe-as-desc">AH${d.ah}cm、BH${d.bh}cmのとき、CHの長さを相似から求める。</desc>
                <polygon points="40,140 240,140 110,30" fill="#ECEFF1" stroke="#999" stroke-width="2"/>
                <polygon id="pe-as-tri-ach" class="plane-expand-part" style="opacity:0" points="40,140 110,140 110,30" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <polygon id="pe-as-tri-cbh" class="plane-expand-part" style="opacity:0" points="110,140 240,140 110,30" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
                <path d="M103,140 L103,133 L110,133" fill="none" stroke="#555" stroke-width="1.3"/>
                <text x="75" y="156" font-size="12" fill="#1565C0" text-anchor="middle" font-weight="bold">AH ${d.ah}cm</text>
                <text x="175" y="156" font-size="12" fill="#E65100" text-anchor="middle" font-weight="bold">BH ${d.bh}cm</text>
                <text x="26" y="150" font-size="12" fill="#1a1a2e">A</text>
                <text x="246" y="150" font-size="12" fill="#1a1a2e">B</text>
                <text x="110" y="156" font-size="12" fill="#1a1a2e" text-anchor="middle">H</text>
                <text x="108" y="22" font-size="12" fill="#1a1a2e">C</text>
                <text x="118" y="95" font-size="13" fill="#E53935" font-weight="bold">？</text>
                <g id="pe-as-arc-a" hidden><path d="M62,140 A22,22 0 0 1 56,120" fill="none" stroke="#F57F17" stroke-width="2.5"/></g>
                <g id="pe-as-arc-bch" hidden><path d="M110,118 A20,18 0 0 1 127,131" fill="none" stroke="#F57F17" stroke-width="2.5"/></g>
                <g id="pe-as-arc-b" hidden><path d="M218,140 A22,22 0 0 0 222,120" fill="none" stroke="#7c3aed" stroke-width="2.5"/></g>
                <g id="pe-as-arc-ach" hidden><path d="M110,118 A20,18 0 0 0 93,131" fill="none" stroke="#7c3aed" stroke-width="2.5"/></g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-as-play">相似を見つけてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-as-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-as-status" role="status" aria-live="polite">直角三角形が2つ重なって見えるが、どの角が同じかは見ただけでは分かりにくい。</div>
            <div class="plane-expand-steps" id="pe-as-steps"></div>
            <div class="formula-reveal" id="pe-as-result">AH：CH＝CH：BH → ${d.ah}：CH＝CH：${d.bh} → CH×CH＝${d.ah}×${d.bh}＝${d.ah * d.bh} → CH＝${d.ch}cm(${d.ch}×${d.ch}＝${d.ah * d.bh}だから)</div>
        </div>`,
        wire: () => wireTriangleAltitudeSimilarityVisual('pe-as', d),
    }),
    'square-perpendicular-similarity': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 260 220" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-ps-title pe-ps-desc">
                <title id="pe-ps-title">正方形ABCDの辺AB上の点P、辺BC上の点Qを、PD・PQが垂直に交わるように結んだ図</title>
                <desc id="pe-ps-desc">AP${d.ap}cm、BP${d.bp}cmのとき、BQの長さを相似から求める。</desc>
                <polygon points="40,40 200,40 200,200 40,200" fill="none" stroke="#1a1a2e" stroke-width="2"/>
                <polygon id="pe-ps-tri-apd" class="plane-expand-part" style="opacity:0" points="40,40 147,40 40,200" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <polygon id="pe-ps-tri-bqp" class="plane-expand-part" style="opacity:0" points="200,40 200,76 147,40" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
                <line x1="147" y1="40" x2="40" y2="200" stroke="#555" stroke-width="2"/>
                <line x1="147" y1="40" x2="200" y2="76" stroke="#555" stroke-width="2"/>
                <text x="26" y="34" font-size="12" fill="#1a1a2e">A</text>
                <text x="206" y="34" font-size="12" fill="#1a1a2e">B</text>
                <text x="206" y="212" font-size="12" fill="#1a1a2e">C</text>
                <text x="26" y="212" font-size="12" fill="#1a1a2e">D</text>
                <text x="147" y="30" font-size="12" fill="#1a1a2e" text-anchor="middle">P</text>
                <text x="210" y="80" font-size="12" fill="#1a1a2e">Q</text>
                <text x="90" y="30" font-size="11" fill="#1565C0" text-anchor="middle" font-weight="bold">AP ${d.ap}cm</text>
                <text x="173" y="30" font-size="11" fill="#E65100" text-anchor="middle" font-weight="bold">BP ${d.bp}cm</text>
                <text x="212" y="62" font-size="13" fill="#E53935" font-weight="bold">？</text>
                <g id="pe-ps-arc-adp" hidden><path d="M40,180 A20,20 0 0 0 58,168" fill="none" stroke="#F57F17" stroke-width="2.5"/></g>
                <g id="pe-ps-arc-bpq" hidden><path d="M170,40 A20,18 0 0 1 180,56" fill="none" stroke="#F57F17" stroke-width="2.5"/></g>
                <g id="pe-ps-arc-apd" hidden><path d="M120,40 A20,18 0 0 1 128,56" fill="none" stroke="#7c3aed" stroke-width="2.5"/></g>
                <g id="pe-ps-arc-bqp" hidden><path d="M200,58 A20,20 0 0 1 184,50" fill="none" stroke="#7c3aed" stroke-width="2.5"/></g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-ps-play">相似を見つけてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-ps-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-ps-status" role="status" aria-live="polite">2つの直角三角形は離れているように見えて、同じ角がどこかは見えにくい。</div>
            <div class="plane-expand-steps" id="pe-ps-steps"></div>
            <div class="formula-reveal" id="pe-ps-result">AP：BQ＝AD：BP → ${d.ap}：BQ＝${d.ad}：${d.bp} → BQ＝${d.ap}×${d.bp}÷${d.ad}＝${d.bq}cm</div>
        </div>`,
        wire: () => wireSquarePerpendicularSimilarityVisual('pe-ps', d),
    }),
```

`wireAngleRevealVisual`関数の直後に、以下の2関数を追加する。

```js
function wireTriangleAltitudeSimilarityVisual(prefix, d) {
    const seqAs = createTopicSequence();
    const triAch = document.getElementById(prefix + '-tri-ach');
    const triCbh = document.getElementById(prefix + '-tri-cbh');
    const arcA = document.getElementById(prefix + '-arc-a');
    const arcBch = document.getElementById(prefix + '-arc-bch');
    const arcB = document.getElementById(prefix + '-arc-b');
    const arcAch = document.getElementById(prefix + '-arc-ach');
    const status = document.getElementById(prefix + '-status');
    const stepsEl = document.getElementById(prefix + '-steps');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqAs.cancel();
        [triAch, triCbh].forEach(el => { el.style.opacity = 0; });
        [arcA, arcBch, arcB, arcAch].forEach(el => el.toggleAttribute('hidden', true));
        result.classList.remove('visible');
        status.textContent = initialStatus;
        clearExpandSteps(stepsEl);
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const step1 = () => {
            triAch.style.opacity = 1; triCbh.style.opacity = 1;
            appendExpandStep(stepsEl, '① 垂線CHによって、三角形ABCは三角形ACHと三角形CBHの2つの直角三角形に分かれる。');
        };
        const step2 = () => {
            arcA.toggleAttribute('hidden', false); arcBch.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, '② 角Cが90°なので角A＋角B＝90°。CHが角Cを分けているので角ACH＋角BCH＝90°。角Aと角BCHは、どちらも角ACHの余角(たして90°になる角)なので同じ大きさ。');
        };
        const step3 = () => {
            arcB.toggleAttribute('hidden', false); arcAch.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, '③ 同じように、角Bと角ACHも同じ大きさ。だから三角形ACHと三角形CBHは相似(どちらも三角形ABCとも相似)。');
        };
        const done = () => {
            result.classList.add('visible');
            appendExpandStep(stepsEl, `④ 対応する辺の比から、AH：CH＝CH：BH。${d.ah}：CH＝CH：${d.bh}なので、CH×CH＝${d.ah}×${d.bh}＝${d.ah * d.bh}、CH＝${d.ch}cm。`);
        };
        if (topicReducedMotion()) { step1(); step2(); step3(); done(); return; }
        step1();
        seqAs.after(700, step2);
        seqAs.after(1500, step3);
        seqAs.after(2300, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireSquarePerpendicularSimilarityVisual(prefix, d) {
    const seqPs = createTopicSequence();
    const triApd = document.getElementById(prefix + '-tri-apd');
    const triBqp = document.getElementById(prefix + '-tri-bqp');
    const arcAdp = document.getElementById(prefix + '-arc-adp');
    const arcBpq = document.getElementById(prefix + '-arc-bpq');
    const arcApd = document.getElementById(prefix + '-arc-apd');
    const arcBqp = document.getElementById(prefix + '-arc-bqp');
    const status = document.getElementById(prefix + '-status');
    const stepsEl = document.getElementById(prefix + '-steps');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqPs.cancel();
        [triApd, triBqp].forEach(el => { el.style.opacity = 0; });
        [arcAdp, arcBpq, arcApd, arcBqp].forEach(el => el.toggleAttribute('hidden', true));
        result.classList.remove('visible');
        status.textContent = initialStatus;
        clearExpandSteps(stepsEl);
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const step1 = () => {
            triApd.style.opacity = 1; triBqp.style.opacity = 1;
            appendExpandStep(stepsEl, '① 直角三角形APDと直角三角形BQPに注目する。角Aと角Bはどちらも正方形の角なので90°。');
        };
        const step2 = () => {
            arcAdp.toggleAttribute('hidden', false); arcBpq.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, '② 点Pでは一直線上に角APD＋90°(角DPQ)＋角QPBが並ぶので、角APD＋角QPBも90°。三角形APDでも角APD＋角ADPが90°。だから角QPBと角ADPは同じ大きさ。');
        };
        const step3 = () => {
            arcApd.toggleAttribute('hidden', false); arcBqp.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, '③ 同じように、角APDと角BQPも同じ大きさ。だから三角形APDと三角形BQPは相似。');
        };
        const done = () => {
            result.classList.add('visible');
            appendExpandStep(stepsEl, `④ 対応する辺の比から、AP：BQ＝AD：BP。${d.ap}：BQ＝${d.ad}：${d.bp}なので、BQ＝${d.ap}×${d.bp}÷${d.ad}＝${d.bq}cm。`);
        };
        if (topicReducedMotion()) { step1(); step2(); step3(); done(); return; }
        step1();
        seqPs.after(700, step2);
        seqPs.after(1500, step3);
        seqPs.after(2300, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
```

(弧の正確な座標・角度・点Pの直角マークの向きはイラスト目的の概算であり、実際の頂点位置に対して弧が視覚的に正しい角を指すよう、Codexが`<polygon>`の座標から再計算してよい。ただし「①②③④の4ステップ構成」「弧の色分け(橙＝1組目の対応角、紫＝2組目の対応角)」「`d`から動的に数値を生成する」という3点は厳守する。)

### P-14との連携見通し(実装は対象外)

- `square-perpendicular-similarity`(イカ相似)は、構造上すでに「補助線(線分PQ)を1本引くことで隠れた相似が生まれる」という配置になっている。P-14で拡張する際は本関数の構造をそのまま踏襲できる見込みが高い。
- `triangle-altitude-similarity`(ミミ相似)で確立した「1つの大きな三角形の中に、色分けした小さい三角形を`opacity`トグルで重ねて見せ、対応する角を弧の色で結びつける」という表現技法は、P-14のピラミッド型・クロス型にもそのまま使える見込みが高い。
- いずれも「見込み」であり、P-14着手時のPlanner specで改めて検証すること。

---

## 4. 新規問題2問の具体的な問題文・数値案

### `g6_plane_027`(ミミ相似: 直角三角形の高さが作る3つの相似)

```js
{
  id: 'g6_plane_027',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '相似の発見', pattern: '直角三角形の高さ(ミミ相似)',
  difficulty: 3, answerType: 'number', answerUnit: 'cm',
  title: '直角三角形の高さと相似',
  text: '直角三角形ABC(角C＝90°)があります。頂点Cから辺AB(斜辺)に垂線を引き、ABとの交点をHとします。AH＝9cm、BH＝16cmのとき、CHの長さを求めなさい。',
  answer: 12,
  hint: '垂線CHによって三角形ABCは三角形ACHと三角形CBHに分かれる。この2つは相似になる(角Aと角BCHが等しい)。AH：CH＝CH：BHの比例式が作れる。',
  solution: `【ポイント】
ある角とたして90°になる角を、その角の余角という。同じ角の余角どうしは、いつも同じ大きさになる。

【解説】
① 垂線CHによって、三角形ABCは三角形ACHと三角形CBHの2つの直角三角形に分かれる。角AHC、角CHBはどちらも90°。
② 三角形ABCは角Cが90°なので、角A＋角B＝90°。また、CHは角Cを角ACHと角BCHに分けているので、角ACH＋角BCH＝90°。
③ 角Aと角BCHは、どちらも角ACHの余角なので、同じ大きさ。同じように、角Bと角ACHも角BCHの余角どうしなので、同じ大きさ。
④ 角A＝角BCHで、どちらの三角形も直角をもつので、三角形ACHと三角形CBHは相似である(2つとも三角形ABCとも相似)。対応する辺の比から、
《AH：CH＝CH：BH》
⑤ 9：CH＝CH：16にあてはめる。比例式では、外側どうしの積と内側どうしの積が等しくなるので、
《CH×CH＝9×16＝144》
⑥ 2回かけて144になる数を探すと、12×12＝144なので、
《CH＝12cm》

【広げてみよう】
この「直角三角形の高さが作る3つの相似」はとてもよく出てくる形で、CHだけでなく、辺AC・BCを求める問題にも同じしくみが使える。AH：AC＝AC：ABの比例式からAC×AC＝9×25＝225、AC＝15cm。BH：BC＝BC：ABの比例式からBC×BC＝16×25＝400、BC＝20cmになる。直角三角形の中に垂線が引かれているのを見たら、まず「3つの相似な直角三角形」を探す習慣をつけるとよい。

【確認】
《AC＝15cm、BC＝20cmとすると、AC×BC÷2＝15×20÷2＝150cm²》
《AB×CH÷2＝(9＋16)×12÷2＝25×12÷2＝150cm²》
三角形ABCの面積を、直角をはさむ2辺(AC・BC)から求めても、底辺ABと高さCHから求めても、どちらも150cm²で一致する。

答え：12cm`,
  expandVisual: 'triangle-altitude-similarity',
  expandVisualData: { ah: 9, bh: 16, ch: 12 },
  expandAdvice: '直角三角形の中に垂線が見えたら、「3つの相似な直角三角形」が隠れていないか、まず角の対応を探せるようにしよう！',
  tags: ['平面図形', '相似', '直角三角形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: AH×BH＝9×16＝144、12×12＝144なのでCH＝12で整合。別解: AC＝15cm(9×25＝225＝15×15)、BC＝20cm(16×25＝400＝20×20)として、面積を2通りの方法で求めると、どちらも150cm²になり一致する。

### `g6_plane_028`(イカ相似: 直角の頂点を共有しない2つの直角三角形の重なり)

```js
{
  id: 'g6_plane_028',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '相似の発見', pattern: '直角三角形の重なり(イカ相似)',
  difficulty: 4, answerType: 'number', answerUnit: 'cm',
  title: '正方形の中にできる直角三角形の相似',
  text: '1辺9cmの正方形ABCDがあります。辺AB上に点P、辺BC上に点Qをとり、PDとPQが垂直に交わるようにします。AP＝6cmのとき、BQの長さを求めなさい。',
  answer: 2,
  hint: '三角形APDと三角形BQPは、どちらも直角三角形で、角ADPと角BPQが等しくなる(余角の関係)。AP：BQ＝AD：BPの比例式が作れる。',
  solution: `【ポイント】
点Pを通る一直線上に3つの角が並んでいるとき、その3つの角の和は180°になる。この性質と「同じ角の余角は等しい」を組み合わせると、離れて見える2つの直角三角形の間にも、同じ角を見つけられる。

【解説】
① 直角三角形APDと直角三角形BQPに注目する。角Aと角Bは、どちらも正方形の角なので90°。
② 点Pでは、点A・P・Bが一直線上にあるので、角APD＋角DPQ＋角QPBを足すと180°になる。角DPQは90°(PDとPQが垂直)なので、
《角APD＋角QPB＝180－90＝90°》
③ 一方、三角形APDは角Aが90°の直角三角形なので、
《角APD＋角ADP＝90°》
②と③はどちらも「角APDに何かを足すと90°になる」という形なので、
《角QPB＝角ADP》
④ 同じように考えると、角APDと角BQPも同じ大きさになる。だから三角形APDと三角形BQPは相似である。対応する辺の比から、
《AP：BQ＝AD：BP》
⑤ AP＝6cm、AD(正方形の1辺)＝9cm、BP＝9－6＝3cmなので、
《6：BQ＝9：3》
⑥ 比例式の性質(外側どうしの積＝内側どうしの積)より、6×3＝9×BQなので、
《BQ＝6×3÷9＝2cm》

【広げてみよう】
この問題のように、2つの直角三角形が直角の頂点を共有せず、離れた場所にあるように見えても、「一直線上の角の和は180°」「同じ角の余角は等しい」を手がかりにすると、隠れた相似を見つけられることがある。平行線がなくても相似が作れる点が、ピラミッド型・クロス型(平行線を使う相似)との大きな違いである。

【確認】
《AP÷BQ＝6÷2＝3》
《AD÷BP＝9÷3＝3》
相似な三角形の対応する辺の比は、どちらを計算しても同じ値(3)になるはずなので、この一致によりBQ＝2cmが正しいことが確認できる。

答え：2cm`,
  expandVisual: 'square-perpendicular-similarity',
  expandVisualData: { ap: 6, bp: 3, ad: 9, bq: 2 },
  expandAdvice: '直角三角形どうしが離れて見えても、一直線上の角の和(180°)や余角の関係を使えば、隠れた相似を見つけられることを意識しよう！',
  tags: ['平面図形', '相似', '直角三角形', '正方形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 比例式6：BQ＝9：3より6×3＝9×BQ、BQ＝18÷9＝2で整合。別解: AP÷BQ＝6÷2＝3、AD÷BP＝9÷3＝3。対応する辺の比がどちらも3で一致する(座標ベクトルの内積による直角検証: A(0,0)・B(9,0)・C(9,-9)・D(0,-9)・P(6,0)・Q(9,-2)とすると、PD＝(-6,-9)、PQ＝(3,-2)の内積は-18+18＝0で、PD⊥PQが数値的にも成立する)。

難易度は、①(ミミ相似)を★3、②(イカ相似)を★4とした。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_026`が最後の要素)に、上記2オブジェクトをこの順で追記する。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-11 相似の発見と長さの比(直角着目型: イカ相似・ミミ相似) ── */`)。新規2問は「問37」(①)・「問38」(②)として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールド(問題文と一緒に表示される静的な図。「広げてみよう」欄の3章のインタラクティブSVGとは別物で、ハイライト・弧は表示しない)はCodexが実装する。以下の点を厳守すること。

**共通の配色**:
- ①(ミミ相似): 三角形全体は既存の「三角形の面積」系問題と同じ塗り`#90CAF9` / 枠線`#1565C0`。
- ②(イカ相似): 正方形全体は塗りなし/枠線`#1a1a2e`。
- 寸法線・ラベルの色は既存の慣例(横方向＝青`#1565C0`、縦方向＝赤系`#E53935`)を踏襲する。不明な長さ(①のCH、②のBQ)は`#E53935`で「？」を表示する。
- 直角マークは既存の慣例(L字の小さな折れ線)を踏襲する。

**①ミミ相似(`g6_plane_027`)の座標方針**:
- 底辺AB(斜辺)を下に水平に置き、頂点Cを上に配置する模式図(例: A(40,140)、B(240,140)、C(110,30)、H(110,140))。
- Hの位置に小さな直角マークを入れる。AH部分に「AH 9cm」(青)、BH部分に「BH 16cm」(赤系)のラベルを配置する。CHの線上(またはCの近く)に赤字で「？」を表示する。
- 目安`viewBox="0 0 280 170"`。

**②イカ相似(`g6_plane_028`)の座標方針**:
- 正方形ABCDを、A(左上)・B(右上)・C(右下)・D(左下)の向きで描く(例: A(40,40)、B(200,40)、C(200,200)、D(40,200)、1辺160px)。
- 辺AB上に点P(AP＝6cmの位置)、辺BC上に点Q(目安としてBから全体の1/4程度の位置、BQの値そのものを数値で示唆する位置にしないこと)を配置する。
- 線分PD、PQを実線で描き、点Pでの直角マーク(PD⊥PQ)を、PD・PQそれぞれの方向ベクトルに沿って一定距離だけ進んだ2点から小さな正方形を作図して入れる(軸に平行でないため、Codexが実際の座標から計算すること)。
- 「AP 6cm」(青)を辺AP上、「BP 3cm」(赤系)を辺BP上に配置する。BQの位置には赤字で「？」を表示する。
- 目安`viewBox="0 0 260 220"`。

**共通の仕上げ**:
- いずれも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する。
- 本スプリントの2問はいずれも「比例式を立てて答えを求める」順方向の問題であり、与えられた数値(AH・BH、AP・BP)はそのまま図に表示してよい。
- 実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存`tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`のヘルパー(`open`, `grade`, `records`, `withinViewport`, `monitor`)のパターンに倣い、新規ファイル`tests/plane-p11-similarity-discovery.spec.cjs`に以下を追加する。既存の回帰シナリオは、件数アサーションの36→38更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 演習問題→平面図形カテゴリを開き、一覧件数が38問(旧36問から+2)であることを確認する。
2. **ミミ相似問題(`g6_plane_027`)**: 「問37 直角三角形の高さと相似」を開き、問題文・SVGがAH＝9cm・BH＝16cmに対応していることを確認。「12」を入力して正解表示を確認。
3. **ミミ相似のインタラクション**: 「相似を見つけてみる」ボタンをタップし、①三角形ACH・三角形CBHが異なる色で表示される、②弧が段階的に表示される、③結果欄に「12」という数値を含む文言が表示されることを確認する。「もう一度」ボタンで初期状態に戻ることを確認する。ブラウザコンソールにエラーが出ないことも確認する(favicon.ico由来の404は除外)。
4. **イカ相似問題(`g6_plane_028`)**: 「問38 正方形の中にできる直角三角形の相似」を開き、問題文・SVGが正方形1辺9cm・AP＝6cmに対応していることを確認。「2」を入力して正解表示を確認。
5. **イカ相似のインタラクション**: 「相似を見つけてみる」ボタンをタップし、①三角形APD・三角形BQPが異なる色で表示される、②弧が段階的に表示される、③結果欄に「2」という数値を含む文言が表示されることを確認する。「もう一度」ボタンで初期状態に戻ることを確認する。
6. **既存問題・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリの演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて`g6_plane_014`・`g6_plane_016`・`g6_plane_026`を開き、「広げてみよう」のインタラクションが退行していないことを確認する。
7. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、案内が引き続き`g6_plane_002_v01`を指すことを確認する。
8. **モバイルビューポート**: 上記2〜5のシナリオを`mobile`プロジェクト(375×812)でも実行する。
9. **構造検証**: `node scripts/validate-content.cjs`の出力が`238 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

### Codexが実装する範囲

- `js/app.js`: `PLANE_EXPAND_VISUALS`への2エントリ、`wireTriangleAltitudeSimilarityVisual`・`wireSquarePerpendicularSimilarityVisual`2関数の実装。
- `g6_plane_027`・`g6_plane_028`の`diagram`(SVG)の新規実装。
- `tests/catalog.test.cjs`・`tests/practice-repetition.spec.cjs`・`tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`の件数アサーション更新。
- 本仕様5章のPlaywrightシナリオ(`tests/plane-p11-similarity-discovery.spec.cjs`)の実装、実ブラウザでの動作確認。
- 自己評価(`sprints/plane-p11-similarity-discovery/sprint-1-self-eval.md`)の作成。
- `css/style.css`に変更が不要であることの最終確認。

### Claudeが直接担当する範囲

- 新規問題2問の数学的内容の確定。
- 正答性の別解検算。
- `coverage-final.md`・`coverage-final.json`のP-11行の更新(ステータスは「部」のまま維持)。
- Codex実装完了後の独立レビュー、Evaluatorとしての最終再確認。

---

## 7. `coverage-final.md`/`coverage-final.json`の更新内容

### 本スプリントの判断: ステータスは「部」のまま維持する(ユーザー確認済み)

### `coverage-final.md`

P-11行:
```
|P-11|相似の発見と長さの比|標|部|g6_plane_027, g6_plane_028, g6_plane_014|直角着目型(イカ相似・ミミ相似)の発見型問題を新規収録完了(2026-11-16、g6_plane_027「直角三角形の高さ(ミミ相似)」・g6_plane_028「直角三角形の重なり(イカ相似)」)。いずれも平行線を使わず、余角の関係のみで相似を発見させる構成。平行線型(ピラミッド型・クロス型)の発見型問題は依然未収録(g6_plane_016はP-01の角度問題であり相似の発見問題ではないことを確認した)。平行線型の新規追加をもって初めて両系統の確認完了とし、「有」に更新する|
```

集計行: 変更なし。

### `coverage-final.json`

`rows`中の`P-11`レコードの`evidence_ids`を`["g6_plane_027", "g6_plane_028", "g6_plane_014"]`、`remaining`を上記md行と同じ文言に更新。`status`は`"部"`のまま変更しない。`stats.plane`も変更しない。

---

## 制約・前提条件

- `index.html`1ファイル構成+分割JS/データの既存構成を維持する。
- 答えは整数(12, 2)。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- `css/style.css`は本スプリントでは一切変更しない。
- 中学範囲の三平方の定理を使わない。
- coverage-final.mdのP-11行のステータスは「部」のまま維持する。

## 未解決の仮定

- 平行線型(ピラミッド型・クロス型)の発見型問題の新規追加は、別スプリントとして今後計画する。
- `g6_plane_014`を本スプリント後もP-11の`evidence_ids`に残すかは既存の記法慣例に倣い「残す」とした。
- 2つの新規駆動関数をP-14で実際に再利用できるかは、P-14の具体的な数値・図形が確定した時点で改めて検証が必要。
