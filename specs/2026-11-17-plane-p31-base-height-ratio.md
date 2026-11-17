---
created: "2026-11-17"
project: "平面図形 P-31(底辺比×高さ比の一般形) 無→有化+P-10(同じ高さの底辺比と面積比) 条件2充足 — 新規ビジュアル1件(base-height-ratio-product/wireBaseHeightRatioVisual)、既存same-height-ratio/wireHeightRatioVisualのハードコード修正(g6_plane_010の表示は不変)、新規問題2問(g6_plane_031, g6_plane_032)"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-31(同じ底辺の高さ比と面積比・一般形) の「無」→「有」化 + P-10(同じ高さの底辺比と面積比) の完了基準条件2充足

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節)の「次の6スプリント」のうち、5番目のP-31(同じ底辺の高さ比と面積比)+P-10の2問目を実装するスプリントである。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`における現状:

```
P-10|同じ高さの底辺比と面積比|標|有|g6_plane_010, g6_plane_013|高さが共通であることを見抜く。底辺・高さが両方とも異なる一般形(面積比＝底辺比×高さ比)はP-31側の確認事項として扱う|
P-31|同じ底辺の高さ比と面積比|標|無|—|底辺比との使分け。底辺・高さが両方とも異なる一般形(面積比＝底辺比×高さ比の積)の確認はここで扱う|
```

### P-10側の現状確認: `g6_plane_010`・`g6_plane_013`は「2問目」の要件を満たしていない

`data/problems/practice-g6-plane.js`658行目付近の`g6_plane_010`(「底辺12cm・高さ8cmの三角形を3:1に分ける」、`lessonUnit:'補助線'`、`expandVisual:'same-height-ratio'`)と、831行目付近の`g6_plane_013`(「底辺が2倍・高さが同じ2つの三角形」、`lessonUnit:'面積比'`、`expandVisual:'triangle-base-scale'`)の両方を確認した。両者は異なる`lessonUnit`(`補助線` vs `面積比`)を持つため、公式には「同一タイプの2問目(類題)」としては扱われていない。本スプリントでは、`g6_plane_010`と**同じ`lessonUnit:'補助線'`・同じ`pattern:'底辺の比と面積比'`**で、数値・分割比を変えた新規問題を1問追加する(4章の`g6_plane_032`)。

### P-31側の現状確認とユーザー決定: タイプ名と`remaining`列のズレ

`coverage-final.md`のP-31行は、タイプ名が「同じ底辺の高さ比と面積比」(底辺が同じで高さが違うケース＝P-10の鏡像)である一方、`remaining`列の実際の記述は「底辺・高さが両方とも異なる一般形(面積比＝底辺比×高さ比の積)の確認はここで扱う」であり、両者は完全には一致しない。

**ユーザー決定(2026-11-17)**: `remaining`列(一般形)のみに対応する。鏡像ケース(底辺が同じ・高さが違う)は独立問題化せず、`g6_plane_031`の【広げてみよう】内で一般形の特殊形(底辺比1:1)として言及するにとどめる。

### 技術検証: ロードマップの「合体するだけ」評価は成立しない

ロードマップの評価(「`same-height-ratio`と`triangle-base-scale`を合体させるだけで一般形が作れる、新規コードはほぼ不要」)を実際にコードを読んで検証した結果、**成立しない**。

#### (a) `triangle-base-scale`/`wireScaleVisual`は引数`d`を一切受け取らない完全固定テキストで、一般形に転用できない

ステップ文言が`'① 三角形Bの面積＝a×h÷2'`のように完全にハードコードされており、「底辺が2倍、高さが同じ」という`g6_plane_013`専用の1シナリオにのみ対応する。**流用不可**。

#### (b) `same-height-ratio`/`wireHeightRatioVisual`には「3:1」というハードコードされた比が複数箇所にあり、そのまま別の比の問題に流用すると誤表示になる

`same-height-ratio`エントリと`wireHeightRatioVisual`を精査した結果、`d`(`baseBig`/`baseSmall`)の値に関係なく文字列「3:1」が決め打ちされている箇所が4つある(SVGの`<desc>`、初期ステータス文言、`formula-reveal`の結果文言、`wireHeightRatioVisual`内のステップ文言2箇所)。`g6_plane_010`は実際の比(9:3＝3:1)がたまたま3:1なので矛盾が出ていなかったが、分割比が3:1以外(例えば3:2)の`g6_plane_032`を同じキーで作ると、計算結果は正しい数値を表示しながら末尾に誤った「＝3:1」が付加される。**`same-height-ratio`/`wireHeightRatioVisual`への軽微な修正が必須**。

修正方針: `baseBig`と`baseSmall`から比を動的に約分して求める純粋関数`simplifyRatio(a, b)`を新設し、4箇所の決め打ち文字列を`simplifyRatio`の結果に置き換える。`simplifyRatio(9, 3)`は`[3, 1]`を返すため、**`g6_plane_010`の表示文言は1文字も変わらない**(5章の検証項目で厳密に確認する)。

#### 結論

一般形(底辺比×高さ比)を表現するには**新規ビジュアル機構が必要**。あわせて、P-10の2問目を正しく実装するために`same-height-ratio`/`wireHeightRatioVisual`への**既存問題の挙動を変えない軽微な修正**が必要。

## 対象外(今回のスコープに含めないもの)

- 「次の6スプリント」のP-31+P-10の2問目以外の1件(P-16)。
- `data/practice-variant-groups.js`。
- 既存240問の本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`の変更。特に`g6_plane_010`・`g6_plane_013`は無変更(データ自体は一切触らない。表示ロジック側のみ修正する)。
- `js/app.js`の`wireScaleVisual`・`triangle-base-scale`エントリ本体、`wireScaleSlotVisual`、`css/style.css`の変更。
- `js/navigation.js`の変更。
- 「底辺が同じ・高さが違う」ケースを独立の問題として追加すること(ユーザー決定により、`g6_plane_031`の解説内での言及にとどめる)。

---

## 1. 完了条件リスト

### データ

1. `data/problems/practice-g6-plane.js`の既存240問は本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`を含め一切変更されていない。特に`g6_plane_010`・`g6_plane_013`のデータオブジェクトは無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_031`(P-31一般形)・`g6_plane_032`(P-10の2問目)の2オブジェクトが、この順で追加されている。2IDとも追加前のファイルに存在しないこと(0件)を確認済み。
3. 新規2問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm²'`であり、`lessonUnit`・`pattern`は本仕様4章の指定どおり(`g6_plane_031`: `lessonUnit:'面積比', pattern:'底辺比×高さ比の一般形'`、`g6_plane_032`: `lessonUnit:'補助線', pattern:'底辺の比と面積比'`、後者は`g6_plane_010`と同一)。
4. 新規2問の`solution`が`docs/content-authoring.md`の構成基準に従う。
5. 新規2問の`diagram`(SVG)が、各問題の数値・図形要素と整合する座標・ラベルで実装されている。

### `js/app.js`の変更

6. `js/app.js`に新規ヘルパー関数`simplifyRatio(a, b)`(2数の比をユークリッドの互除法で最大公約数まで約分して`[a/g, b/g]`を返す純粋関数)が追加されている。既存コードに同名関数は存在しないことを確認済み。
7. `PLANE_EXPAND_VISUALS`オブジェクト内の`same-height-ratio`エントリが、本仕様3章のコードのとおりに修正されている。修正箇所は「`3:1`という決め打ち文字列4箇所を`simplifyRatio(d.baseBig, d.baseSmall)`の計算結果に置き換える」ことのみであり、SVGのレイアウト・座標・`wire`の呼び出し方は変更されていない。
8. `wireHeightRatioVisual`関数が、本仕様3章のコードのとおりに修正されている。修正箇所は「`baseRatio`・`areaRatio`の2つのステップ文言内の決め打ち`3:1`を、同関数内で新たに計算した`simplifyRatio(d.baseBig, d.baseSmall)`の結果に置き換える」ことのみであり、タイマー構成・`reset`/`playFn`の制御フローは変更されていない。
9. `g6_plane_010`の`expandVisualData`(`{ baseBig: 9, baseSmall: 3, height: 8, bigArea: 36, smallArea: 12 }`)に対して`simplifyRatio(9, 3)`を実行すると`[3, 1]`を返し、修正後の`same-height-ratio`/`wireHeightRatioVisual`が生成するHTML文字列・ステップ文言が、修正前(決め打ち`3:1`)と1文字も違わないことを確認済み(5章の回帰シナリオで検証)。
10. `PLANE_EXPAND_VISUALS`に、`triangle-base-scale`エントリの直後・`scale-drawing-reveal`エントリの直前に、新規エントリ`base-height-ratio-product`が本仕様3章のコードのとおり追加されている。
11. `js/app.js`に、`wireScaleVisual`関数の直後・`wireScaleSlotVisual`関数の直前に、専用駆動関数`wireBaseHeightRatioVisual(prefix, d)`が追加されている。`wireScaleVisual`・`wireScaleSlotVisual`関数本体は一切変更されていない。
12. `css/style.css`は変更不要(新規ビジュアルは`hidden`属性のトグルと`textContent`の書き換えのみで構成され、既存の`svg [hidden] { display:none; }`ルールのみで表示制御が完結するため)。
13. `g6_plane_031`の`expandVisualData`は`{ baseRatioA: 3, baseRatioB: 2, heightRatioA: 4, heightRatioB: 3, areaRatioA: 2, areaRatioB: 1, knownArea: 18, targetArea: 36 }`であり、ステップ文言・`formula-reveal`表示はこの値から動的に生成される。
14. `g6_plane_032`の`expandVisualData`は`{ baseBig: 15, baseSmall: 10, height: 6, bigArea: 45, smallArea: 30 }`であり、`expandVisual: 'same-height-ratio'`を指定する(`g6_plane_010`と同じキー)。

### 件数アサーション・既存回帰

15. `tests/catalog.test.cjs`の問題数アサーションが240→242に更新されている。
16. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック2箇所(`toHaveCount(40)`)が`toHaveCount(42)`に更新され、該当テストが引き続きpassする。
17. `tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`・`tests/plane-p09-equal-area-transformation.spec.cjs`それぞれの件数チェック(40→42)・`validate-content.cjs`出力検証(`240 problems; 0 errors`→`242 problems; 0 errors`)が更新され、既存シナリオが引き続きpassする。
18. 新規2問は配列末尾に追加するため、既存問題の「問N」通し番号表示は変化しない。新規2問は「問41」・「問42」として表示される。
19. 既存ファイルのシナリオが、件数アサーション・件数表記の更新を除き無改修で全件passする。

### ビジュアル・UIの動作確認

20. `g6_plane_031`を開くと、「広げてみよう」欄に三角形A・Bの図(Bの面積18cm²、Aは「？」)、「面積の比を求める」ボタンが表示される。ボタンをタップすると、①底辺の比(3:2)のラベルが表示される、②高さの比(4:3)のラベル・寸法線が表示される、③面積の比(底辺比×高さ比＝2:1)を示す文言が表示される、④三角形Aの面積表示が「？」から「36cm²」に変わり結果欄が表示される、という4ステップが順番に進行する。「もう一度」ボタンで初期状態に戻る。
21. `g6_plane_032`を開くと、「確かめてみる」ボタンをタップした際に、`same-height-ratio`の4ステップが`g6_plane_010`と同じ構造で、かつ正しい比(3:1ではなく3:2)で表示される。
22. `g6_plane_010`(既存)を開いたときの「広げてみよう」欄の全表示文言(初期ステータス・4ステップ・結果欄・SVGの`<desc>`)が、本スプリント実装前後で1文字も変わらない。
23. `g6_plane_013`(既存、`triangle-base-scale`)を開いたときのインタラクションが退行していない。
24. 新規2問・`g6_plane_010`・`g6_plane_013`以外の全既存問題を開いたときの「広げてみよう」インタラクションが退行していない。
25. `g6_plane_031`・`g6_plane_032`の「広げてみよう」欄をタップした際、ブラウザコンソールにエラーが出ない(favicon.ico由来の404は除外)。
26. `prefers-reduced-motion: reduce`を有効にした状態で`g6_plane_031`を開き、「面積の比を求める」をタップした際、アニメーションの途中状態が視覚的に残らず即座に最終状態(「36cm²」表示)になることを確認する。

### 採点・検証コマンド

27. `node scripts/validate-content.cjs`が0エラーで終了する(242 problems; 0 errors)。
28. `node --test tests/catalog.test.cjs`・`npm test`が全件passする。
29. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
30. 本仕様5章の新規Playwrightシナリオ(`tests/plane-p31-base-height-ratio.spec.cjs`)が追加され、全件passする。
31. 新規2問の答え(36cm², 30cm²)がClaudeによる別解検算で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、完了条件に含める)

32. `coverage-final.md`のP-31行が「無」→「有」に更新され、`evidence_ids`に`g6_plane_031`が追加され、「残る条件・確認事項」欄が更新されている。
33. `coverage-final.md`のP-10行の`evidence_ids`に`g6_plane_032`が追加され、「残る条件・確認事項」欄が更新されている(ステータスは既に「有」のため変更なし)。
34. 平面図形の集計行(`|平面図形|33|14|1|18|`)が`|平面図形|33|15|1|17|`に更新されている。
35. `coverage-final.json`も、P-31レコード(`status`, `evidence_ids`, `remaining`)・P-10レコード(`evidence_ids`, `remaining`)・`stats.plane`(`有`:14→15, `無`:18→17)が同期して更新されている。
36. 上記32〜35はVISTAリポジトリ外のファイルであり、Claudeが直接編集し、VISTA側のテストの完了条件には含めない。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_031`・`g6_plane_032`の2オブジェクトを追記 | 追記 |
| `js/app.js` | 新規ヘルパー`simplifyRatio`追加。`same-height-ratio`エントリ・`wireHeightRatioVisual`関数のハードコード修正(非破壊)。新規エントリ`base-height-ratio-product`・新規駆動関数`wireBaseHeightRatioVisual`を追記 | 追記+軽微な修正 |
| `tests/catalog.test.cjs` | 問題数アサーションを240→242に更新 | 追記 |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェックを40→42に更新(2箇所) | 追記 |
| `tests/plane-p05-formula-area.spec.cjs` / `tests/plane-p29-triangle-quad-properties.spec.cjs` / `tests/plane-p11-similarity-discovery.spec.cjs` / `tests/plane-p09-equal-area-transformation.spec.cjs` | 件数チェック・`validate-content.cjs`出力検証を更新 | 追記 |
| `tests/plane-p31-base-height-ratio.spec.cjs`(新規) | 本仕様5章の新規Playwrightシナリオ | 新規作成 |
| `coverage-final.md` / `coverage-final.json` | P-31行を無→有に更新、P-10行の`evidence_ids`/`remaining`を更新、集計行を更新 | 追記(VISTAリポジトリ外、Claude直接編集) |

`css/style.css`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`scripts/validate-content.cjs`・`js/navigation.js`は**いずれも変更不要**。

---

## 3. 新規ビジュアルエントリの要否とその設計

### 結論: 新規エントリ1件(`base-height-ratio-product`)+専用駆動関数1件(`wireBaseHeightRatioVisual`)+新規ヘルパー1件(`simplifyRatio`)を追加する。CSSの変更は不要。既存`same-height-ratio`/`wireHeightRatioVisual`は非破壊の軽微な修正を行う。`triangle-base-scale`/`wireScaleVisual`は無改修。

### (a) 新規ヘルパー関数`simplifyRatio`

`wireHeightRatioVisual`関数の直前に追加する。

```js
// 2数の比を最大公約数で約分する。例: simplifyRatio(9,3) => [3,1]
function simplifyRatio(a, b) {
    function gcdPair(x, y) {
        x = Math.abs(x); y = Math.abs(y);
        while (y) { [x, y] = [y, x % y]; }
        return x || 1;
    }
    const g = gcdPair(a, b);
    return [a / g, b / g];
}
```

### (b) `same-height-ratio`エントリの修正(非破壊)

修正後(アロー関数を式本体からブロック本体に変え、`ratioBig`/`ratioSmall`を一度だけ計算して4箇所の決め打ち`3:1`に差し込む。それ以外の座標・文言・`wire`の呼び出し方は一切変更しない):

```js
    'same-height-ratio': d => {
        const [ratioBig, ratioSmall] = simplifyRatio(d.baseBig, d.baseSmall);
        return {
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 290 225" style="width:100%;max-width:280px;display:block" role="img" aria-labelledby="pe-hr-title pe-hr-desc">
                <title id="pe-hr-title">補助線で分けた2つの三角形が高さを共有する図</title>
                <desc id="pe-hr-desc">底辺を${ratioBig}:${ratioSmall}に分けた2つの三角形は、同じ高さを共有している。</desc>
                <polygon points="40,168 184,168 184,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <polygon points="184,168 232,168 184,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <line id="pe-hr-guide" hidden x1="184" y1="40" x2="184" y2="168" stroke="#7c3aed" stroke-width="3"/>
                <text id="pe-hr-guide-label" hidden x="196" y="104" font-size="13" fill="#7c3aed" font-weight="bold">高さ${d.height}cm(共通)</text>
                <text x="112" y="186" font-size="13" fill="#F57F17" text-anchor="middle" font-weight="bold">底辺${d.baseBig}cm(比${ratioBig})</text>
                <text x="208" y="186" font-size="13" fill="#1565C0" text-anchor="middle" font-weight="bold">底辺${d.baseSmall}cm(比${ratioSmall})</text>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-hr-play">確かめてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-hr-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-hr-status" role="status" aria-live="polite">底辺の比は${ratioBig}:${ratioSmall}。でも面積の比が同じかどうかは、見ただけでは分かりにくい。</div>
            <div class="plane-expand-steps" id="pe-hr-steps"></div>
            <div class="formula-reveal" id="pe-hr-result">高さ${d.height}cmが同じ\n底辺の比${d.baseBig}:${d.baseSmall}＝${ratioBig}:${ratioSmall}\n面積の比${d.bigArea}:${d.smallArea}＝${ratioBig}:${ratioSmall}</div>
        </div>`,
        wire: () => wireHeightRatioVisual('pe-hr', d),
        };
    },
```

**非破壊の根拠**: `g6_plane_010`の`expandVisualData`は`{ baseBig: 9, baseSmall: 3, ... }`。`simplifyRatio(9, 3)`は`[3, 1]`を返すため、修正前後でHTML文字列は1文字も変わらない。

### (c) `wireHeightRatioVisual`関数の修正(非破壊)

関数冒頭に`const [ratioBig, ratioSmall] = simplifyRatio(d.baseBig, d.baseSmall);`を1行追加し、`baseRatio`・`areaRatio`ステップ内の末尾の決め打ち`＝3:1。`をそれぞれ`＝${ratioBig}:${ratioSmall}。`に置換する。それ以外(`guide`/`guideLabel`/`status`/`stepsEl`/`result`/`play`/`resetBtn`/`initialStatus`の取得、`reset()`関数本体、`seqHr.after`のタイミング、`play`/`resetBtn`のイベント登録、`return reset;`)は現状の実装を一切変更しない。

### (d) 新規エントリ`base-height-ratio-product`

`PLANE_EXPAND_VISUALS`オブジェクト内、`triangle-base-scale`のエントリの直後、`scale-drawing-reveal`のエントリの直前に追加する。

```js
    'base-height-ratio-product': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 320 190" style="width:100%;max-width:320px;display:block" role="img" aria-labelledby="pe-br-title pe-br-desc">
                <title id="pe-br-title">底辺も高さもちがう三角形Aと三角形Bの面積比を求める図</title>
                <desc id="pe-br-desc">三角形Aと三角形Bは底辺の比が${d.baseRatioA}:${d.baseRatioB}、高さの比が${d.heightRatioA}:${d.heightRatioB}。面積の比は底辺の比×高さの比で求める。</desc>
                <text x="70" y="20" font-size="12" fill="#555" text-anchor="middle">三角形B</text>
                <polygon points="30,150 130,150 70,50" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <text id="pe-br-b-area" x="70" y="115" font-size="13" fill="#1a1a2e" text-anchor="middle" font-weight="bold">${d.knownArea}cm²</text>
                <text x="70" y="168" font-size="12" fill="#1565C0" text-anchor="middle">底辺</text>
                <text x="230" y="20" font-size="12" fill="#555" text-anchor="middle">三角形A</text>
                <polygon points="170,150 290,150 230,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <text id="pe-br-a-area" x="230" y="112" font-size="14" fill="#1a1a2e" text-anchor="middle" font-weight="bold">？</text>
                <text id="pe-br-base-label" hidden x="150" y="180" font-size="12" fill="#F57F17" text-anchor="middle" font-weight="bold">底辺の比 ${d.baseRatioA}:${d.baseRatioB}</text>
                <line id="pe-br-height-line" hidden x1="70" y1="50" x2="230" y2="40" stroke="#E53935" stroke-width="1.5" stroke-dasharray="3"/>
                <text id="pe-br-height-label" hidden x="150" y="34" font-size="11" fill="#E53935" text-anchor="middle">高さの比 ${d.heightRatioA}:${d.heightRatioB}</text>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-br-play">面積の比を求める</button>
                <button type="button" class="plane-anim-btn reset" id="pe-br-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-br-status" role="status" aria-live="polite">底辺も高さもちがう2つの三角形。面積の比はどうなるだろう?</div>
            <div class="plane-expand-steps" id="pe-br-steps"></div>
            <div class="formula-reveal" id="pe-br-result">底辺の比${d.baseRatioA}:${d.baseRatioB}×高さの比${d.heightRatioA}:${d.heightRatioB}＝面積の比${d.areaRatioA}:${d.areaRatioB}\n${d.knownArea}×${d.areaRatioA}÷${d.areaRatioB}＝${d.targetArea}cm²</div>
        </div>`,
        wire: () => wireBaseHeightRatioVisual('pe-br', d),
    }),
```

### (e) 新規駆動関数`wireBaseHeightRatioVisual`

`wireScaleVisual`関数の直後、`wireScaleSlotVisual`関数の直前に追加する。

```js
function wireBaseHeightRatioVisual(prefix, d) {
    const seqBr = createTopicSequence();
    const baseLabel = document.getElementById(prefix + '-base-label');
    const heightLine = document.getElementById(prefix + '-height-line');
    const heightLabel = document.getElementById(prefix + '-height-label');
    const aArea = document.getElementById(prefix + '-a-area');
    const initialAreaText = aArea.textContent;
    const status = document.getElementById(prefix + '-status');
    const stepsEl = document.getElementById(prefix + '-steps');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqBr.cancel();
        baseLabel.toggleAttribute('hidden', true);
        heightLine.toggleAttribute('hidden', true);
        heightLabel.toggleAttribute('hidden', true);
        aArea.textContent = initialAreaText;
        result.classList.remove('visible');
        status.textContent = initialStatus;
        clearExpandSteps(stepsEl);
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const showBase = () => { baseLabel.toggleAttribute('hidden', false); appendExpandStep(stepsEl, `① 三角形Aと三角形Bの底辺の比は${d.baseRatioA}:${d.baseRatioB}。`); };
        const showHeight = () => { heightLine.toggleAttribute('hidden', false); heightLabel.toggleAttribute('hidden', false); appendExpandStep(stepsEl, `② 三角形Aと三角形Bの高さの比は${d.heightRatioA}:${d.heightRatioB}。`); };
        const multiply = () => { appendExpandStep(stepsEl, `③ 面積の比は、底辺の比×高さの比で求める。\n(${d.baseRatioA}×${d.heightRatioA}):(${d.baseRatioB}×${d.heightRatioB})＝${d.baseRatioA * d.heightRatioA}:${d.baseRatioB * d.heightRatioB}＝${d.areaRatioA}:${d.areaRatioB}。`); };
        const done = () => {
            aArea.textContent = `${d.targetArea}cm²`;
            result.classList.add('visible');
            appendExpandStep(stepsEl, `④ 三角形Bの面積${d.knownArea}cm²を${d.areaRatioA}:${d.areaRatioB}の比にあてはめると、三角形Aの面積は${d.targetArea}cm²。`);
        };
        if (topicReducedMotion()) { showBase(); showHeight(); multiply(); done(); return; }
        showBase();
        seqBr.after(800, showHeight);
        seqBr.after(1600, multiply);
        seqBr.after(2500, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
```

(`d.baseRatioA * d.heightRatioA`等は`g6_plane_031`のデータでは`3×4＝12`・`2×3＝6`と表示され、その直後に約分済みの`areaRatioA:2, areaRatioB:1`が続けて表示される。約分計算自体は本スプリントでは動的に行わず、Plannerが手計算した値を`expandVisualData`に埋め込む。)

### (f) CSSの変更が不要である根拠

`wireHeightRatioVisual`自身も、ガイド線・ガイドラベルの表示切替に`hidden`属性のトグルのみを使っており、専用のCSSトランジションクラスを持たない。`wireBaseHeightRatioVisual`も同じ設計(`hidden`属性のトグル＋`textContent`の書き換えのみ)を踏襲するため、新規CSSクラスは不要であり、既存の`svg [hidden] { display:none; }`ルールがそのまま機能する。

---

## 4. 新規問題2問の具体的な問題文・数値案

### `g6_plane_031`(P-31一般形: 底辺比×高さ比の積)

```js
{
  id: 'g6_plane_031',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '面積比', pattern: '底辺比×高さ比の一般形',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '底辺も高さもちがう三角形の面積比',
  text: '三角形Aと三角形Bがあります。三角形Aの底辺と三角形Bの底辺の比は3:2、三角形Aの高さと三角形Bの高さの比は4:3です。\n三角形Bの面積が18cm²のとき、三角形Aの面積を求めなさい。',
  answer: 36,
  hint: '面積の比＝底辺の比×高さの比。3:2と4:3を、それぞれの項どうしで掛け合わせてから簡単にしよう。',
  solution: `【ポイント】
三角形の面積の比は、「底辺の比×高さの比」で求められる。底辺も高さも両方ちがう三角形どうしでも、このかけ算のルールはいつも成り立つ。

【解説】
① 三角形Aと三角形Bの底辺の比は3:2。
② 三角形Aと三角形Bの高さの比は4:3。
③ 面積の比は、底辺の比と高さの比を、それぞれの項どうしでかけ合わせて求める。
《(3×4):(2×3)＝12:6》
12:6を簡単にすると、
《12:6＝2:1》
④ 三角形Bの面積は18cm²なので、三角形Aの面積は、この比にあてはめて
《18×2＝36cm²》

【広げてみよう】
三角形Bの底辺をb、高さをhとすると、三角形Bの面積は「b×h÷2」。三角形Aの底辺は(3/2)×b、高さは(4/3)×hなので、三角形Aの面積は
《(3/2×b)×(4/3×h)÷2＝(3/2×4/3)×(b×h÷2)＝2×(b×h÷2)》
底辺の比と高さの比をかけ合わせた数が、そのまま面積の比になることが分かる。
もし底辺の比が1:1(底辺が同じ)なら、面積の比は高さの比そのままになる。これは「高さが同じなら面積の比は底辺の比」というルールのちょうど逆の形にあたる。

【確認】
三角形Bの底辺を6cm・高さを6cmだと仮定すると、面積は
《6×6÷2＝18cm²》
問題文の面積18cm²と一致する。このとき三角形Aの底辺は6×3/2＝9cm、高さは6×4/3＝8cmなので、三角形Aの面積は
《9×8÷2＝36cm²》
比を使った答え36cm²と一致する。

答え：36cm²`,
  expandVisual: 'base-height-ratio-product',
  expandVisualData: { baseRatioA: 3, baseRatioB: 2, heightRatioA: 4, heightRatioB: 3, areaRatioA: 2, areaRatioB: 1, knownArea: 18, targetArea: 36 },
  expandAdvice: '底辺比と高さ比の両方が出てきたら、あわてずにそれぞれの比をかけ合わせて面積比を作ろう！',
  tags: ['平面図形', '面積比', '三角形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 底辺比3:2、高さ比4:3 → 面積比(3×4):(2×3)＝12:6＝2:1 → 18×2＝36。別解(上記【確認】): 具体的な数値(B:底辺6cm・高さ6cm→面積18cm²、A:底辺9cm・高さ8cm→面積36cm²)で直接検算し一致。

### `g6_plane_032`(P-10の2問目: 高さが同じ、分割比を変えた類題)

```js
{
  id: 'g6_plane_032',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '補助線', pattern: '底辺の比と面積比',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '補助線で分けた三角形の面積(その2)',
  text: '底辺25cm・高さ6cmの三角形の中に、頂点から底辺に補助線を引いて2つに分けました。\n補助線が底辺を3:2に分けるとき、小さい三角形の面積を求めなさい。',
  answer: 30,
  hint: '底辺の比 ＝ 3:2 → 面積の比も 3:2\n全体の面積 ＝ 25 × 6 ÷ 2 ＝ 75cm²\n小さい方 ＝ 75 × 2/5',
  solution: `【ポイント】
高さが同じ三角形どうしは、面積の比が底辺の比と同じになる。

【解説】
《① 全体の三角形の面積は25×6÷2＝75cm²》
② 補助線が底辺を3:2に分けるので、2つの三角形の面積の比も3:2(どちらも頂点から底辺までの高さが同じだから)。
③ 全体を3＋2＝5等分した2つ分なので、
《小さい三角形の面積＝75×2/5＝30cm²》

【広げてみよう】
これは、さっき見た「補助線で分けた三角形の面積」(分割比3:1の問題)と同じ考え方だが、分割比を3:2に変えても結果は同じルールで求められる。分割比がどんな整数の比になっても、高さが共通である限り、底辺の比がそのまま面積の比になる。

【確認】
《大きい三角形は75×3/5＝45cm²》
《30＋45＝75cm²》
全体と一致する。

答え：30cm²`,
  expandVisual: 'same-height-ratio',
  expandVisualData: { baseBig: 15, baseSmall: 10, height: 6, bigArea: 45, smallArea: 30 },
  expandAdvice: '分割比がどんな数字でも、高さが共通なら底辺の比がそのまま面積の比になることを確認しよう！',
  tags: ['平面図形', '補助線', '面積比'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 25×6÷2＝75。75×2/5＝30(小さい方)、75×3/5＝45(大きい方)、30＋45＝75で一致。`baseBig:baseSmall`＝15:10＝3:2、`bigArea:smallArea`＝45:30＝3:2で整合。

難易度は、①(一般形)を★3、②(P-10の2問目)を★3とした。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_030`が最後の要素)に、上記2オブジェクトをこの順で追記する。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-31 底辺比×高さ比の一般形 + P-10の2問目 ── */`)。新規2問は「問41」・「問42」として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

**①`g6_plane_031`の座標方針**:
- `g6_plane_013`の`diagram`(2つの三角形を左右に並べる構図)を参考にしつつ、**具体的な長さの値は一切書かない**(底辺・高さとも実際のcm数は問題文で与えられていないため)。
- 左に三角形B(色`#90CAF9`/枠線`#1565C0`)、右に三角形A(色`#FFE082`/枠線`#F57F17`)を配置。Aの方がやや大きく描いてよいが、厳密な比率での描画は不要(抽象図のため)。
- 三角形Bの中に「18cm²」、三角形Aの中に「？」を表示。
- 2つの三角形の間、または上部に「底辺の比 3:2」「高さの比 4:3」のラベル(中立色、例えば`#555`)を添える。
- 目安`viewBox="0 0 300 180"`。

**②`g6_plane_032`の座標方針**:
- `g6_plane_010`の`diagram`(1つの三角形を補助線で2分割する構図、底辺25cm→350px換算、高さ6cm→84px換算)を参考に、分割比3:2に対応する位置に補助線を配置する(底辺の3/5の位置、大きい方の区間が210px、小さい方が140px程度)。
- 大きい方の三角形を色`#FFE082`/枠線`#F57F17`、小さい方を色`#90CAF9`/枠線`#1565C0`とし、`g6_plane_010`の配色方針を踏襲する。
- 底辺の分割比ラベル(「3」「2」)、底辺全体の寸法線(「底辺 25cm」)、高さの寸法線(「高さ 6cm」)を`g6_plane_010`と同じ構図で配置する。
- 目安`viewBox="0 0 290 225"`(`g6_plane_010`と同じ)。

**共通の仕上げ**: いずれも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する。実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存のヘルパー(`open`, `grade`, `records`, `withinViewport`, `monitor`)のパターンに倣い、新規ファイル`tests/plane-p31-base-height-ratio.spec.cjs`に以下を追加する。既存の回帰シナリオは、件数アサーションの40→42更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 平面図形カテゴリを開き、一覧件数が42問であることを確認する。
2. **P-31一般形(`g6_plane_031`)**: 「問41 底辺も高さもちがう三角形の面積比」を開き、問題文に底辺の比3:2・高さの比4:3・三角形Bの面積18cm²が記載されていることを確認。「36」を入力して正解表示を確認。
3. **P-31一般形のインタラクション**: 「面積の比を求める」ボタンをタップし、①底辺比ラベル(`#pe-br-base-label`)が`hidden`を失う、②高さ比ラベル・寸法線が`hidden`を失う、③`.plane-expand-step`が4件表示される、④三角形Aの面積表示(`#pe-br-a-area`)が「？」から「36cm²」を含むテキストに変わる、ことを確認する。「もう一度」ボタンで`#pe-br-a-area`が「？」に戻ることを確認する。ブラウザコンソールにエラーが出ないことも確認する(favicon.ico由来の404は除外)。
4. **P-10の2問目(`g6_plane_032`)**: 「問42 補助線で分けた三角形の面積(その2)」を開き、問題文に底辺25cm・高さ6cm・分割比3:2が記載されていることを確認。「30」を入力して正解表示を確認。
5. **P-10の2問目のインタラクション・比の正しさ**: 「確かめてみる」ボタンをタップし、`.plane-expand-step`の2番目・3番目のテキスト内容に「3:2」という文字列が含まれ、「3:1」という文字列が含まれないことを確認する(ハードコード修正の直接検証)。「もう一度」ボタンで初期状態に戻ることを確認する。
6. **既存`g6_plane_010`の回帰確認(最重要)**: `g6_plane_010`を開き、「確かめてみる」ボタンをタップして、`.plane-expand-step`の4件のテキスト内容が、本スプリント実装前の文言(「比は9:3＝3:1。」「比は36:12＝3:1。」を含む)と完全に一致することを確認する。あわせてSVGの`<desc id="pe-hr-desc">`の内容が「底辺を3:1に分けた2つの三角形は、同じ高さを共有している。」のままであることを確認する。「もう一度」ボタンで初期状態に戻ることも確認する。「36」を入力して正解表示を確認する(回答ロジックが変わっていないこと)。
7. **既存`g6_plane_013`の回帰確認**: `g6_plane_013`を開き、「式で確かめる」ボタンをタップして、ステップ文言・結果欄の表示が退行していないことを確認する。
8. **既存問題・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリの演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて`inverse-proportion`・`equal-height-slide`・`merge-triangles`を使う既存問題を開き、インタラクションが退行していないことを確認する。
9. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、案内が引き続き`g6_plane_002_v01`を指すことを確認する。
10. **`prefers-reduced-motion`対応**: `prefers-reduced-motion: reduce`をエミュレートした状態で`g6_plane_031`を開き、「面積の比を求める」をタップした直後に`#pe-br-a-area`が即座に「36cm²」を含む表示になることを確認する。
11. **モバイルビューポート**: 上記2〜7のシナリオを`mobile`プロジェクト(375×812)でも実行する。
12. **構造検証**: `node scripts/validate-content.cjs`の出力が`242 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

### Codexが実装する範囲

- `js/app.js`: 新規ヘルパー`simplifyRatio`の実装、`same-height-ratio`エントリ・`wireHeightRatioVisual`関数への3章指定の軽微な修正、新規エントリ`base-height-ratio-product`・新規駆動関数`wireBaseHeightRatioVisual`の実装。
- `g6_plane_031`・`g6_plane_032`の`diagram`(SVG)の新規実装。
- `tests/catalog.test.cjs`・`tests/practice-repetition.spec.cjs`・`tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`・`tests/plane-p09-equal-area-transformation.spec.cjs`の件数アサーション・件数表記の更新。
- 本仕様5章のPlaywrightシナリオの実装、実ブラウザでの動作確認。特に検証項目6(`g6_plane_010`の文言が1文字も変わっていないことの確認)は最優先で実施する。
- 自己評価(`sprints/plane-p31-base-height-ratio/sprint-1-self-eval.md`)の作成。
- `js/app.js`の`wireScaleVisual`・`triangle-base-scale`エントリに意図しない差分がないことの最終確認。

### Claudeが直接担当する範囲

- 新規問題2問の数学的内容の確定。
- 正答性の別解検算。
- `same-height-ratio`/`wireHeightRatioVisual`の修正が`g6_plane_010`に対して非破壊であることの数式的な確認。
- `coverage-final.md`・`coverage-final.json`のP-31行・P-10行の更新。
- Codex実装完了後の独立レビュー、Evaluatorとしての最終再確認。

---

## 7. `coverage-final.md`/`coverage-final.json`の更新内容

### `coverage-final.md`

P-10行:
```
|P-10|同じ高さの底辺比と面積比|標|有|g6_plane_010, g6_plane_013, g6_plane_032|高さが共通であることを見抜く基本形(g6_plane_010)に加え、分割比を3:2に変えた2問目(g6_plane_032)を追加し完了基準の条件2を充足(2026-11-17)。底辺・高さが両方とも異なる一般形(面積比＝底辺比×高さ比)はP-31側(g6_plane_031)で収録済み|
```

P-31行:
```
|P-31|同じ底辺の高さ比と面積比|標|有|g6_plane_031|底辺比も高さ比も異なる2つの三角形の面積比＝底辺比×高さ比(連比の掛け算)を新規収録(2026-11-17)。底辺が同じ・高さが同じそれぞれの単純ケースはP-10・g6_plane_013側で収録済みのため、本タイプでは一般形(両方異なる場合)に特化。タイプ名が示す「底辺が同じ・高さが違う」鏡像ケースは独立問題化せず、g6_plane_031の解説内で一般形の特殊形(底辺比1:1)として言及するにとどめた(ユーザー決定2026-11-17、数値・条件を変えた2問目は未追加)|
```

集計行: `|平面図形|33|14|1|18|` → `|平面図形|33|15|1|17|`

### `coverage-final.json`

`rows`中のP-10レコードの`evidence_ids`を`["g6_plane_010", "g6_plane_013", "g6_plane_032"]`、`remaining`を上記md行と同じ文言に更新(`status`は`"有"`のまま変更なし)。P-31レコードの`status`を`"無"`→`"有"`、`evidence_ids`を`["g6_plane_031"]`、`remaining`を上記md行と同じ文言に更新。`stats.plane`を`{"有": 15, "部": 1, "無": 17}`に更新(`total`33は不変)。

---

## 制約・前提条件

- 答えは整数(36, 30)。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- 既存の`wireScaleVisual`・`triangle-base-scale`エントリ本体・`css/style.css`は一切変更しない。
- `same-height-ratio`/`wireHeightRatioVisual`への変更は、3章で明示した「決め打ち`3:1`の動的化」のみに限定し、それ以外のロジック・レイアウトは変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。

## 未解決の仮定

- `g6_plane_032`の数値・難易度判断、`g6_plane_031`の比の数値(3:2と4:3)の選定はPlannerの裁量であり、最終的な採否はユーザー確認が望ましい。
- `simplifyRatio`は今後、他の「比」を扱うビジュアルでも再利用できる汎用ヘルパーとして設計したが、現時点では`same-height-ratio`のみが使用する想定である。
- `base-height-ratio-product`の`areaRatioA`/`areaRatioB`は本スプリントでは人力で約分済みの値を`expandVisualData`に埋め込む設計とした。
