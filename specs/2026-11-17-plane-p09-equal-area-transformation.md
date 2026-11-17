---
created: "2026-11-17"
project: "平面図形 P-09(等積変形と等しい高さ) 部→有化 — 頂点スライド型の新規問題+新規ビジュアル(equal-height-slide/wireEqualHeightSlideVisual)1件、形の違う三角形の等積比較の新規問題1件(既存inverse-proportion/wireSqueezeVisualは無改修)"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-09(等積変形と等しい高さ) の「部」→「有」化

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節)の「次の6スプリント」のうち、4番目のP-09(等積変形と等しい高さ)を実装するスプリントである。1番目のP-05・2番目のP-29・3番目のP-11は完了済み。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`における現状:

```
P-09|等積変形と等しい高さ|標|部|g6_plane_012|等しい高さを使う等積変形は未収録。現行証拠(g6_plane_012)は高さの逆算のみ|
```

### 既存`g6_plane_012`の内容確認

`data/problems/practice-g6-plane.js`772行目付近の`g6_plane_012`は「底辺8cm・高さ6cmの三角形と面積が等しい平行四辺形を作る、底辺8cmのとき高さは何cmか」という問題で、`expandVisual: 'inverse-proportion'`を使用。これは「面積が等しい2つの図形の高さを逆算で求める」計算問題であり、**「等積変形」そのもの(底辺に平行な直線上で頂点を動かしても三角形の面積が変わらないという図形的性質の発見・適用)を問うものではない**。これが「部」評価の理由。

### `inverse-proportion`/`wireSqueezeVisual`の技術的確認

`js/app.js`1532〜1551行目の`inverse-proportion`エントリと、777〜814行目の`wireSqueezeVisual(prefix, d)`関数を確認した。HTML構造は、SVG内の静的な三角形`<polygon>`(常時表示)と、`id="pe-ip-para"`の平行四辺形`<polygon class="plane-expand-squeeze" style="transform-origin:280px 160px">`を持つ。駆動ロジックは、`play`ボタンで`shape.classList.add('squeezed')`を実行し、CSS`.plane-expand-squeeze.squeezed { transform:scaleY(.5); }`により、平行四辺形全体がY方向へ50%スケール変形する。

ロードマップの評価(「`squeeze`のクラストグルをスライド用トランスフォームに置き換えるだけ」)を実際に検証した結果、**単純な置き換えでは済まない**。理由は「`scaleY`は図形全体を均一に縮小するため、底辺の2頂点を固定したまま頂点1点だけを平行な直線上でスライドさせる、という等積変形本来の動き(底辺の2点は不動、頂点だけ動く)を表現できない」ため。本スプリントでは**`skewX`(剪断変形)を`transform-origin`の基準線と合わせて使う**設計を採用した(3章)。剪断変形は面積を保存する変形として数学的にも厳密に正しい。

**重要**: 本スプリントは既存の`inverse-proportion`キー・`wireSqueezeVisual`関数本体・`.plane-expand-squeeze`/`.squeezed`CSSルールに一切変更を加えない。新しいビジュアルは新しいキー`equal-height-slide`・新しい専用関数`wireEqualHeightSlideVisual`・新しいCSSクラス`.plane-expand-slide`として追加する。

### 論点への回答

1. **問題数**: ユーザー方針(「基本的には全部作ってほしい」)に従い、**2問**を新規追加する。
2. **新規ビジュアルの要否**: 既存の`wireSqueezeVisual`(scaleY)・`wireRotateVisual`(180°回転で合成)・`wireScaleVisual`(固定テキストのみ)のいずれも、「底辺の2点を固定したまま頂点だけが底辺に平行な直線上を動く」という動きを表現できない。したがって**新規ビジュアルが必要**。
3. **「等積変形と等しい高さ」の2つの側面**: (a)「頂点が底辺に平行な直線上のどこにあっても面積が変わらない」という不変性の発見、(b)「形がちがう2つの三角形でも、底辺と高さがどちらも等しければ面積は等しい」という複数図形の比較、は数学的に異なる視点であり、**2問に分ける**(g6_plane_029で(a)、g6_plane_030で(b))。

## 対象外(今回のスコープに含めないもの)

- 「次の6スプリント」のP-09以外の2件(P-31+P-10の2問目、P-16)。
- `data/practice-variant-groups.js`。
- 既存`g6_plane_012`の本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`の変更。
- `js/app.js`の`inverse-proportion`エントリ本体、`wireSqueezeVisual`関数本体、`css/style.css`の`.plane-expand-squeeze`/`.squeezed`ルールの変更。
- `js/navigation.js`の変更。
- 既存238問の内容変更。
- 等積変形の発展パターン(台形⇄三角形の変形等)。既存の`merge-triangles`・`trapezoid-rotate`等で部分的にカバー済み。

---

## 1. 完了条件リスト

### データ

1. `data/problems/practice-g6-plane.js`の既存238問は本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`を含め一切変更されていない。特に`g6_plane_012`は無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_029`(頂点スライド型)・`g6_plane_030`(形がちがう三角形の等積比較)の2オブジェクトが、この順で追加されている。2IDとも追加前のファイルに存在しないことを確認済み(0件)。
3. 新規2問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm²'`であり、`lessonUnit`・`pattern`は本仕様4章の指定どおり。
4. 新規2問の`solution`が`docs/content-authoring.md`の構成基準に従う。
5. 新規2問の`diagram`(SVG)が、各問題の数値・図形要素と整合する座標・ラベルで実装されている。
6. `js/app.js`の`PLANE_EXPAND_VISUALS`に、`inverse-proportion`エントリの直後・`triangle-base-scale`の直前に、新規エントリ`equal-height-slide`が本仕様3章のコードのとおり追加されている。既存の`inverse-proportion`を含む全既存エントリは一切変更されていない。
7. `js/app.js`に、`wireSqueezeVisual`関数の直後・`wireScaleVisual`関数の直前に、専用駆動関数`wireEqualHeightSlideVisual(prefix, d)`が追加されている。`wireSqueezeVisual`関数本体は一切変更されていない。
8. `css/style.css`に新規クラス`.plane-expand-slide`が追加されている。既存の`.plane-expand-squeeze`/`.squeezed`ルールは無変更。
9. `css/style.css`の`@media (prefers-reduced-motion: reduce)`ブロック内のセレクタ一覧に`.plane-expand-slide`が1つ追加されている(追記のみ)。
10. `scripts/validate-content.cjs`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`は変更不要。
11. `g6_plane_029`の`expandVisualData`は`{ base: 10, height: 6, area: 30 }`であり、ステップ文言・`formula-reveal`表示はこの値から動的に生成される。
12. `g6_plane_030`は`expandVisual`・`expandVisualData`フィールド自体を持たない。

### 件数アサーション・既存回帰

13. `tests/catalog.test.cjs`の問題数アサーションが238→240に更新されている。
14. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック2箇所(`toHaveCount(38)`)が`toHaveCount(40)`に更新され、該当テストが引き続きpassする。
15. `tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`それぞれの件数チェック・`validate-content.cjs`出力検証が更新され、既存シナリオが引き続きpassする。
16. 新規2問は配列末尾に追加するため、既存問題の「問N」通し番号表示は変化しない。新規2問は「問39」・「問40」として表示される。
17. 既存ファイルのシナリオが、件数アサーション・件数表記の更新を除き無改修で全件passする。

### ビジュアル・UIの動作確認

18. `g6_plane_029`を開くと、「広げてみよう」欄に2本の平行線ℓ・mと三角形ABPの図、「点Pを動かしてみる」ボタンが表示される。ボタンをタップすると、①三角形(頂点P)がskewX変形で水平方向に移動し点Pのラベルが新しい位置に移る、②破線の目標図形が段階的に表示される、③最終的に結果欄に「30」という数値を含む文言が表示される、という3ステップが順番に進行する。「もう一度」ボタンで初期状態に戻る。
19. `g6_plane_030`を開くと、「広げてみよう」欄に解説文のみが表示され、ボタン・タップ可能なチップなどのインタラクティブ要素は一切表示されない。
20. `g6_plane_012`(既存、`inverse-proportion`)を開いたときのインタラクションが退行していない。
21. 新規2問以外の全既存問題を開いたときの「広げてみよう」インタラクションが退行していない。
22. `g6_plane_029`の「広げてみよう」欄をタップした際、ブラウザコンソールにエラーが出ない(favicon.ico由来の404は除外)。
23. `prefers-reduced-motion: reduce`を有効にした状態で`g6_plane_029`を開き、「点Pを動かしてみる」をタップした際、アニメーションの途中状態が視覚的に残らず即座に最終状態になることを確認する。

### 採点・検証コマンド

24. `node scripts/validate-content.cjs`が0エラーで終了する(240 problems; 0 errors)。
25. `node --test tests/catalog.test.cjs`・`npm test`が全件passする。
26. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
27. 本仕様5章の新規Playwrightシナリオ(`tests/plane-p09-equal-area-transformation.spec.cjs`)が追加され、全件passする。
28. 新規2問の答え(30cm², 36cm²)がClaudeによる別解検算で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、完了条件に含める)

29. `coverage-final.md`のP-09行が「部」→「有」に更新され、`evidence_ids`に`g6_plane_029, g6_plane_030`が追加され(`g6_plane_012`は「高さの逆算」の根拠として残置)、「残る条件・確認事項」欄が更新されている。平面図形の集計行(`|平面図形|33|13|2|18|`)が`|平面図形|33|14|1|18|`に更新されている。
30. `coverage-final.json`も、P-09レコード(`status`, `evidence_ids`, `remaining`)と`stats.plane`(`有`:13→14, `部`:2→1)が同期して更新されている。
31. 上記29・30はVISTAリポジトリ外のファイルであり、Claudeが直接編集し、VISTA側のテストの完了条件には含めない。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_029`・`g6_plane_030`の2オブジェクトを追記 | 追記 |
| `js/app.js` | `PLANE_EXPAND_VISUALS`に`equal-height-slide`エントリ1件、専用駆動関数`wireEqualHeightSlideVisual`1件を追記 | 追記 |
| `css/style.css` | `.plane-expand-slide`ルールを新規追加。`prefers-reduced-motion`ブロックのセレクタ一覧に追加 | 追記 |
| `tests/catalog.test.cjs` | 問題数アサーションを238→240に更新 | 追記 |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェックを38→40に更新(2箇所) | 追記 |
| `tests/plane-p05-formula-area.spec.cjs` / `tests/plane-p29-triangle-quad-properties.spec.cjs` / `tests/plane-p11-similarity-discovery.spec.cjs` | 件数チェック・`validate-content.cjs`出力検証を更新 | 追記 |
| `tests/plane-p09-equal-area-transformation.spec.cjs`(新規) | 本仕様5章の新規Playwrightシナリオ | 新規作成 |
| `coverage-final.md` / `coverage-final.json` | P-09行を部→有に更新、集計行を更新 | 追記(VISTAリポジトリ外、Claude直接編集) |

`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`scripts/validate-content.cjs`・`js/navigation.js`は**いずれも変更不要**。

---

## 3. 新規ビジュアルエントリの要否とその設計

### 結論: 新規エントリ1件(`equal-height-slide`)+専用駆動関数1件(`wireEqualHeightSlideVisual`)+新規CSSクラス1件(`.plane-expand-slide`)を追加する

#### (a) 既存の`wireSqueezeVisual`・`wireRotateVisual`・`wireScaleVisual`の流用可否

- **`wireSqueezeVisual`(`inverse-proportion`が使用)**: `scaleY`は図形全体を均一に縮小するため、「底辺の2頂点A・Bは完全に固定したまま、頂点Pだけが底辺に平行な直線上を動く」という動きを作れない。**流用不可**。
- **`wireRotateVisual`**: 「2つの合同な図形を組み合わせる」動きであり、別の数学的事実を示すもの。**流用不可**。
- **`wireScaleVisual`**: 図形自体は一切アニメーションしない固定テキスト比較のみ。**流用不可**。

#### (b) 新しい変形手段: `skewX`(剪断変形)による「頂点だけが動く」表現

CSSの`transform:skewX(角度)`は、`transform-origin`を基準に、原点からのY方向のオフセットに比例してX座標だけをずらす変形である。`transform-origin`のY座標を底辺のY座標と一致させると、底辺上の全ての点(Yオフセット＝0)はX方向に全く動かず、底辺から離れた頂点Pだけが水平方向に移動する。これは「剪断変形は面積を保存する」という数学的事実と一致する。

具体的な数値検証(SVG座標、`transform-origin:130px 150px`、底辺A(130,150)・B(230,150)、初期頂点P(150,50)):
- 点A・Bの変形前後の位置は常に不変(Y方向のオフセットが0のため)。
- 頂点Pを(230,50)(目標P₂)に移すために必要な角度は`atan(-0.8) ≈ -38.66°`。頂点Pを(310,50)(目標P₃)に移すために必要な角度は`atan(-1.6) ≈ -57.99°`。
- いずれの変形でも、頂点PのY座標は50のまま変化しない(skewXはX座標のみを変化させるため)ので、2直線ℓ・mの間の距離(高さ)は厳密に保存される。

#### (c) 新規エントリ・新規関数の設計方針

SVGの座標・skewXの角度は、この1問の固定レイアウトに紐づく純粋なレイアウト定数であり、`d`とは独立に固定値でハードコードする。ステップ文言・`formula-reveal`に表示する数値は`d`から動的に生成する。

### `js/app.js`への追記コード

`PLANE_EXPAND_VISUALS`オブジェクト内、`inverse-proportion`のエントリの直後、`triangle-base-scale`のエントリの直前に、以下のエントリを追加する。

```js
    'equal-height-slide': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 380 190" style="width:100%;max-width:360px;display:block" role="img" aria-labelledby="pe-sl-title pe-sl-desc">
                <title id="pe-sl-title">2本の平行な直線の間で点Pが動いても、三角形ABPの面積が変わらないことを示す図</title>
                <desc id="pe-sl-desc">直線ℓ上のA・Bは固定されたまま、直線m上の点Pを動かしても、底辺ABと高さ${d.height}cmは変わらないため、面積はいつも${d.area}cm²になる。</desc>
                <line x1="40" y1="50" x2="340" y2="50" stroke="#bbb" stroke-width="1.5" stroke-dasharray="4 4"/>
                <line x1="40" y1="150" x2="340" y2="150" stroke="#bbb" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="348" y="54" font-size="12" fill="#888">直線m</text>
                <text x="348" y="154" font-size="12" fill="#888">直線ℓ</text>
                <line x1="60" y1="50" x2="60" y2="150" stroke="#E53935" stroke-width="1.5"/>
                <line x1="54" y1="50" x2="66" y2="50" stroke="#E53935" stroke-width="1.5"/>
                <line x1="54" y1="150" x2="66" y2="150" stroke="#E53935" stroke-width="1.5"/>
                <text x="40" y="100" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 40 100)">高さ${d.height}cm</text>
                <line x1="130" y1="150" x2="230" y2="150" stroke="#1565C0" stroke-width="3"/>
                <text x="180" y="168" font-size="12" fill="#1565C0" text-anchor="middle">AB ${d.base}cm</text>
                <text x="118" y="164" font-size="12" fill="#1a1a2e">A</text>
                <text x="234" y="164" font-size="12" fill="#1a1a2e">B</text>
                <polygon id="pe-sl-tri" class="plane-expand-slide" style="transform-origin:130px 150px" points="130,150 230,150 150,50" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <text id="pe-sl-p-label" x="150" y="40" font-size="13" fill="#1a1a2e" text-anchor="middle" font-weight="bold">P</text>
                <polygon id="pe-sl-target-p2" hidden points="130,150 230,150 230,50" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"/>
                <polygon id="pe-sl-target-p3" hidden points="130,150 230,150 310,50" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-sl-play">点Pを動かしてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-sl-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-sl-status" role="status" aria-live="polite">点Pの位置を変えると、三角形ABPの面積も変わりそうに見える。</div>
            <div class="plane-expand-steps" id="pe-sl-steps"></div>
            <div class="formula-reveal" id="pe-sl-result">どこにPがあっても、底辺${d.base}cm×高さ${d.height}cm÷2＝${d.area}cm²で変わらない</div>
        </div>`,
        wire: () => wireEqualHeightSlideVisual('pe-sl', d),
    }),
```

`wireSqueezeVisual`関数の直後、`wireScaleVisual`関数の直前に、以下の関数を追加する。

```js
function wireEqualHeightSlideVisual(prefix, d) {
    const seqSl = createTopicSequence();
    const tri = document.getElementById(prefix + '-tri');
    const pLabel = document.getElementById(prefix + '-p-label');
    const target2 = document.getElementById(prefix + '-target-p2');
    const target3 = document.getElementById(prefix + '-target-p3');
    const status = document.getElementById(prefix + '-status');
    const stepsEl = document.getElementById(prefix + '-steps');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqSl.cancel();
        tri.style.transform = '';
        pLabel.setAttribute('x', 150);
        target2.toggleAttribute('hidden', true);
        target3.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        clearExpandSteps(stepsEl);
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const step1 = () => {
            tri.style.transform = 'skewX(-38.66deg)';
            pLabel.setAttribute('x', 230);
            target2.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, `① 点PをP₂の位置に動かしても、底辺AB(${d.base}cm)と高さ(${d.height}cm)は変わらない。`);
        };
        const step2 = () => {
            tri.style.transform = 'skewX(-57.99deg)';
            pLabel.setAttribute('x', 310);
            target3.toggleAttribute('hidden', false);
            appendExpandStep(stepsEl, `② さらにP₃まで動かしても、やっぱりABと高さは変わらない。`);
        };
        const done = () => {
            result.classList.add('visible');
            appendExpandStep(stepsEl, `③ 底辺と高さがどちらも変わらないので、三角形ABPの面積はPの位置に関係なくいつも${d.area}cm²になる。`);
        };
        if (topicReducedMotion()) { step1(); step2(); done(); return; }
        step1();
        seqSl.after(900, step2);
        seqSl.after(1800, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
```

(skewXの角度`-38.66deg`・`-57.99deg`は、本スプリントのSVG座標から幾何計算した値であり、3章(b)の検算のとおり正しい。Codexがこれらの座標・角度を変更する場合は、A・Bの座標が`transform-origin`と同じY座標である限り底辺は常に不動であることを踏まえ、整合性を再計算すること。)

### `css/style.css`への追記

既存の`.plane-expand-divider.fade-out { opacity:0; }`ルールの直後、`.plane-expand-eq`ルールの直前に、以下を追加する。

```css
.plane-expand-slide { transform-box:view-box; transition:transform .8s cubic-bezier(.4,0,.2,1); }
```

既存の`@media (prefers-reduced-motion: reduce)`ブロック内、セレクタ一覧に`.plane-expand-slide`を追加する(既存セレクタの削除・変更は行わない追記のみ)。

```css
@media (prefers-reduced-motion: reduce) {
    .plane-expand-piece, .plane-expand-dup, .plane-expand-part,
    .plane-expand-squeeze, .plane-expand-tile, .plane-expand-slide,
    .plane-expand-merge, .plane-expand-divider,
    .plane-expand-step { transition:none !important; }
    .plane-expand-step.formula.shown { animation:none !important; }
}
```

(`.plane-expand-slide`を挿入した行以外は既存コードと完全に同一であることを確認すること。)

---

## 4. 新規問題2問の具体的な問題文・数値案

### `g6_plane_029`(頂点スライド型: 等しい高さを使う等積変形)

```js
{
  id: 'g6_plane_029',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形', pattern: '等しい高さ(頂点のスライド)',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '頂点を動かしても変わらない面積',
  text: '下の図のように、平行な2本の直線ℓ、mがあります。直線ℓ上にA、Bの2点があり、AB＝10cmです。直線m上に点Pをとり、三角形ABPを作ります。直線ℓとmの間の長さは6cmです。\n点Pを直線m上のどこに動かしても、三角形ABPの面積は変わりません。三角形ABPの面積を求めなさい。',
  answer: 30,
  hint: '三角形の面積＝底辺×高さ÷2。点Pがどこにあっても、底辺ABの長さと、直線ℓとmの間のきょり(高さ)は変わらない。',
  solution: `【ポイント】
底辺が同じで高さも同じなら、頂点の位置がどこに動いても三角形の面積は変わらない。

【解説】
① 三角形ABPの底辺はAB。点Pをどこに動かしても、底辺の長さはAB＝10cmのまま変わらない。
② 三角形ABPの高さは、頂点Pから底辺AB(直線ℓ)までの垂直な距離にあたる。点Pは直線m上にあり、直線ℓとmの間のきょりはどこでも6cmなので、高さも6cmのまま変わらない。
《③ 面積＝10×6÷2＝30cm²》

【広げてみよう】
このように、底辺を固定したまま、頂点を底辺に平行な直線上でどこに動かしても面積が変わらない変形を「等積変形」という。見た目の三角形の形(とがり方)は大きく変わっても、底辺と高さが変わらなければ面積はいつも同じになる。

【確認】
《点Pを直線mの別の場所に動かしても、底辺AB＝10cm・高さ6cmは変わらないので、面積は常に10×6÷2＝30cm²になる》
どの位置のPで計算しても、同じ答えになることが確認できる。

答え：30cm²`,
  expandVisual: 'equal-height-slide',
  expandVisualData: { base: 10, height: 6, area: 30 },
  expandAdvice: '頂点が動いても、底辺と高さが変わらなければ面積も変わらないことを、形が変わっても恐れずに使えるようにしよう！',
  tags: ['平面図形', '三角形', '等積変形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 10×6÷2＝30。別解: 点Pを極端な位置に取っても、底辺AB(10cm)と高さ(6cm)はどちらも変わらないため、どの位置でも10×6÷2＝30cm²で一致する。

### `g6_plane_030`(形がちがう三角形の等積比較: 等しい底辺・高さ)

```js
{
  id: 'g6_plane_030',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形', pattern: '形がちがっても等しい面積',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '形がちがっても面積が同じ三角形',
  text: '三角形ABCは、底辺BC＝9cm、高さ8cmの直角三角形です。\n三角形DEFは、三角形ABCと底辺の長さ・高さがどちらも同じです(底辺EF＝9cm、高さ8cm)。ただし、三角形DEFは二等辺三角形で、三角形ABCとは形がちがいます。\n三角形DEFの面積を求めなさい。',
  answer: 36,
  hint: '三角形の面積は底辺×高さ÷2で決まる。形(とがり方)がちがっても、底辺と高さがどちらも同じなら面積も同じになる。',
  solution: `【ポイント】
三角形の面積は底辺×高さ÷2で決まる。直角三角形か二等辺三角形かといった形のちがいは、面積の値そのものには関係しない。

【解説】
① 三角形ABCは、底辺BC＝9cm、高さ8cmの直角三角形。
《② 三角形ABCの面積＝9×8÷2＝36cm²》
③ 三角形DEFは、底辺EF＝9cm、高さ8cmで、三角形ABCと底辺・高さがどちらも同じ。
④ 面積の公式(底辺×高さ÷2)に当てはめる数(9と8)が三角形ABCと全く同じなので、形がちがっていても、
《⑤ 三角形DEFの面積＝9×8÷2＝36cm²》

【広げてみよう】
この問題のように、見た目の形(直角三角形か二等辺三角形か)がどんなにちがっても、「底辺の長さ」と「高さ」の2つの数値だけで面積が決まる。逆に言うと、面積の公式に出てくる数値以外(角の大きさなど)は、面積そのものには関係しない。

【確認】
《36÷9＝4(高さの半分)、4×2＝8》
三角形DEFの高さがもとの8cmと一致することから、面積36cm²が正しいと確認できる。

答え：36cm²`,
  tags: ['平面図形', '三角形', '等積変形', '面積'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 9×8÷2＝36。別解: 36÷9×2＝8(高さの逆算)で元の高さ8cmと一致。

難易度は、①(頂点スライド型)を★2、②(形がちがう三角形の比較)を★3とした。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_028`が最後の要素)に、上記2オブジェクトをこの順で追記する。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-09 等積変形と等しい高さ ── */`)。新規2問は「問39」・「問40」として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールド(問題文と一緒に表示される静的な図。3章のインタラクティブSVGとは別物で、アニメーションしない)はCodexが実装する。以下の点を厳守すること。

**共通の座標方針**: 平面図形の既存SVGは概ね「1cm＝14px」のスケールで座標を算定している。新規2問もこのスケール感を踏襲すること。

**①頂点スライド型(`g6_plane_029`、AB10cm→140px・高さ6cm→84px)の座標方針**:
- 2本の平行な破線(直線ℓ・m)を水平に描き、間隔を84px程度にする。
- 直線ℓ上にA・Bを140px間隔で配置し、実線で結んで「AB 10cm」ラベル(青)を添える。
- 直線m上に、頂点Pの候補を3か所(P₁・P₂・P₃)破線の小さな三角形輪郭で薄く示し、そのうち1つを実際に塗りつぶした三角形(色`#90CAF9`/枠線`#1565C0`)として強調する。これにより「Pがどこにあっても面積は同じ」という問題文の趣旨を静的な図だけでも示す。
- 高さを示す寸法線(両矢印)を左側に配置し、「高さ6cm」ラベル(赤、縦書き)を添える。
- 目安`viewBox="0 0 380 180"`。
- 「※ 図のPの位置は一例です」のような注記テキストを小さく添えてよい(既存`g6_plane_012`の注記の慣例に倣う)。

**②形がちがう三角形の等積比較(`g6_plane_030`、底辺9cm→126px・高さ8cm→112px)の座標方針**:
- 共通の水平な破線(高さの基準線、底辺の基準線)を2本描き、その間に三角形ABC(直角三角形、色`#90CAF9`/枠線`#1565C0`)と三角形DEF(二等辺三角形、色`#FFE082`/枠線`#F57F17`)を左右に並べて配置する。
- 両方の三角形の底辺が同じ破線上にあり、頂点が同じ高さの破線上にあることが視覚的にわかるようにする。
- 底辺BC・EFそれぞれに「9cm」ラベル(青)、高さにそれぞれ「8cm」ラベル(赤、縦書き、または両三角形で共有する1本の寸法線)を配置する。
- 目安`viewBox="0 0 320 190"`。

**共通の仕上げ**:
- いずれも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する。
- 実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存のヘルパー(`open`, `grade`, `records`, `withinViewport`, `monitor`)のパターンに倣い、新規ファイル`tests/plane-p09-equal-area-transformation.spec.cjs`に以下を追加する。既存の回帰シナリオは、件数アサーションの38→40更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 平面図形カテゴリを開き、一覧件数が40問であることを確認する。
2. **頂点スライド型(`g6_plane_029`)**: 「問39 頂点を動かしても変わらない面積」を開き、問題文・SVGがAB＝10cm・高さ6cmに対応していることを確認。「30」を入力して正解表示を確認。
3. **頂点スライド型のインタラクション**: 「点Pを動かしてみる」ボタンをタップし、①三角形(`#pe-sl-tri`)に`transform`スタイル(skewX)が設定される、②破線の目標図形(`#pe-sl-target-p2`・`#pe-sl-target-p3`)が順番に`hidden`属性を失う、③結果欄に「30」という数値を含む文言が表示されることを確認する。「もう一度」ボタンで`#pe-sl-tri`の`transform`スタイルが空文字列に戻り、`#pe-sl-target-p2`・`#pe-sl-target-p3`が再び`hidden`になることを確認する。ブラウザコンソールにエラーが出ないことも確認する(favicon.ico由来の404は除外)。
4. **形がちがう三角形の等積比較(`g6_plane_030`)**: 「問40 形がちがっても面積が同じ三角形」を開き、問題文・SVGが底辺9cm・高さ8cmに対応していることを確認。「36」を入力して正解表示を確認。「広げてみよう」欄に解説文のみが表示され、ボタンやタップ可能なチップが存在しないことをDOMで確認する(`.plane-anim-btn`・`.plane-expand-chip`要素が0件)。
5. **既存`g6_plane_012`(`inverse-proportion`)の回帰確認**: `g6_plane_012`を開き、「高さを縮めてみる」ボタンをタップして、squeeze変形と結果欄の「3cm」「24cm²」を含む文言が引き続き表示されることを確認する。「もう一度」ボタンで初期状態に戻ることも確認する。
6. **既存問題・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリの演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて`triangle-rotate`・`triangle-base-scale`・`merge-triangles`を使う既存問題を開き、インタラクションが退行していないことを確認する。
7. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、案内が引き続き`g6_plane_002_v01`を指すことを確認する。
8. **`prefers-reduced-motion`対応**: `prefers-reduced-motion: reduce`をエミュレートした状態で`g6_plane_029`を開き、「点Pを動かしてみる」をタップした直後に結果欄が即座に表示されることを確認する。
9. **モバイルビューポート**: 上記2〜4のシナリオを`mobile`プロジェクト(375×812)でも実行する。
10. **構造検証**: `node scripts/validate-content.cjs`の出力が`240 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

### Codexが実装する範囲

- `js/app.js`: `PLANE_EXPAND_VISUALS`への`equal-height-slide`エントリ、`wireEqualHeightSlideVisual`関数の実装(3章のコードをベースに、座標・skewX角度の微調整はCodexの裁量。ただし底辺A・Bが完全に不動であること、CSS側で`transform-origin`のY座標が底辺のY座標と一致していることは厳守)。
- `css/style.css`: `.plane-expand-slide`ルールの追加、`prefers-reduced-motion`ブロックへの追記。
- `g6_plane_029`・`g6_plane_030`の`diagram`(SVG)の新規実装。
- `tests/catalog.test.cjs`・`tests/practice-repetition.spec.cjs`・`tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`の件数アサーション・件数表記の更新。
- 本仕様5章のPlaywrightシナリオの実装、実ブラウザでの動作確認(`prefers-reduced-motion`のエミュレーション含む)。
- 自己評価(`sprints/plane-p09-equal-area-transformation/sprint-1-self-eval.md`)の作成。
- `js/app.js`の`inverse-proportion`・`wireSqueezeVisual`に意図しない差分がないことの最終確認。

### Claudeが直接担当する範囲

- 新規問題2問の数学的内容の確定。
- 正答性の別解検算。
- `equal-height-slide`のskewX角度の幾何計算の確定、`g6_plane_030`に新規ビジュアルを付けない判断の根拠確定。
- `coverage-final.md`・`coverage-final.json`のP-09行の更新。
- Codex実装完了後の独立レビュー、Evaluatorとしての最終再確認。

---

## 7. `coverage-final.md`/`coverage-final.json`の更新内容

### 本スプリントの判断: ステータスを「部」→「有」に更新する(ユーザー確認済み)

P-11スプリント(直角着目型のみ収録、平行線型は未収録のため「部」を維持)とは異なり、本スプリントはcoverage-final.mdのP-09行が指摘する不足点そのものを、タイプ名が示す2つの側面の両方について新規問題で埋めた。したがって**「有」に更新する**。

### `coverage-final.md`

P-09行:
```
|P-09|等積変形と等しい高さ|標|有|g6_plane_029, g6_plane_030, g6_plane_012|頂点を底辺に平行な直線上でスライドさせても面積が変わらないこと(g6_plane_029)、形がちがう三角形でも底辺と高さが同じなら面積が等しいこと(g6_plane_030)の2問を新規収録(2026-11-17)。既存g6_plane_012(高さの逆算)は底辺が同じ三角形↔平行四辺形の面積一致の根拠として残置。台形⇄三角形の変形等、等積変形の発展パターンはmerge-triangles/trapezoid-rotate等で部分的にカバー済みのため別管理|
```

集計行: `|平面図形|33|13|2|18|` → `|平面図形|33|14|1|18|`

### `coverage-final.json`

`rows`中のP-09レコードの`status`を`"部"`→`"有"`、`evidence_ids`を`["g6_plane_029", "g6_plane_030", "g6_plane_012"]`、`remaining`を上記md行と同じ文言に更新。`stats.plane`を`{"有": 14, "部": 1}`に更新(`total`33は不変)。

---

## 制約・前提条件

- 答えは整数(30, 36)。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- 既存の`inverse-proportion`キー・`wireSqueezeVisual`関数・`.plane-expand-squeeze`/`.squeezed`CSSルールは一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。
- 問題文・解説文に「剪断変形」等の専門用語を出さない(`skewX`はあくまで実装上のCSS変形手段)。

## 未解決の仮定

- 新規2問の数値・難易度判断はPlannerの裁量であり、最終的な採否はユーザー確認が望ましい。
- `g6_plane_012`を本スプリント後もP-09の`evidence_ids`に残すかは既存の記法慣例に倣い「残す」とした。
- `equal-height-slide`キーのskewX角度は本スプリントの1問のみで使用する想定であり、将来別の問題がこのキーを異なる座標レイアウトで再利用する場合、幾何計算をその都度やり直す必要がある。
