---
created: "2026-11-17"
project: "平面図形 P-16(おうぎ形の弧・面積・中心角) 無→有化 — 新規ビジュアル1件(sector-fraction-reveal/wireSectorFractionVisual、既存simplifyRatioを再利用)、新規問題2問(g6_plane_033: 弧の長さ, g6_plane_034: 面積)"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-16(おうぎ形の弧・面積・中心角) の「無」→「有」化

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節)の「次の6スプリント」の最後、P-16(おうぎ形の弧・面積・中心角)を実装するスプリントである。これにより0.4節で計画された6スプリント(P-05→P-29→P-11→P-09→P-31+P-10の2問目→P-16)がすべて完了する。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`における現状:

```
P-16|おうぎ形の弧・面積・中心角|標|無|—|周長と弧長を区別|
```

### 技術検証: ロードマップの「ほぼそのまま流用」評価は成立しない

ロードマップ(0.4節)の分類は「A. ほぼそのまま流用」、評価文は「`circle-radius-reveal`系のウェッジ描画+`wireSequentialReveal`を転用し、弧長と面積を別カウントで見せる」。実際にコードを読んで検証した結果、**この評価は成立しない**(P-09・P-31と同じパターン)。

- `js/app.js`の`circle-radius-reveal`エントリ(約1820行目)は、円を7分割した固定ウェッジを`wireSequentialReveal(prefix, total, doneStatus)`で1個ずつ順番に表示し、「半径の長さが円周に約6.28個分並ぶ」ことだけを見せる仕組みである。中心角・弧長・面積比率という扇形固有の概念は一切扱っていない。
- `wireSequentialReveal`は「N個のセルを順番に表示してカウンタを進める」という汎用機構であり、「中心角が360°の何分のいくつか」という分数の導出や、その分数を円周・面積に掛け合わせる計算ステップを表現できない。**そのまま流用は不可**。
- 結論: 新規ビジュアル機構が必要。ただし、P-31で新設した`simplifyRatio(a, b)`(2数の比を約分する汎用ヘルパー)は、「中心角とその補角」ではなく「中心角と360」という2数の比の約分にそのまま再利用できる。これにより実装コストは抑えられる。

### 既存問題の確認

`data/problems/practice-g6-plane.js`に扇形・おうぎ形・中心角を扱う問題は0件。円関連の既存問題は`g6_plane_019`(円周の長さから半径を逆算、`lessonUnit:'円の性質'`)の1件のみで、そのsolution内の【広げてみよう】に「おうぎ形の弧の長さや、円の面積の逆算でも同じように『公式を逆から使う』考え方が使える」という伏線がある。本スプリントはこの伏線を回収する。

### スコープ判断: 2問構成で「有」化する

`coverage-final.md`のP-16のremaining列は「周長と弧長を区別」であり、タイプ名は「おうぎ形の弧・面積・中心角」と3つの概念を含む。本スプリントでは、以下の2問を新規追加し、2つの核となる計算(弧の長さ・面積)の両方を「中心角が360°の何分のいくつかを掛け合わせる」という共通ロジックで収録する。中心角自体は両問題で「与えられた既知の値」として使われ、別途「弧長・面積から中心角を逆算する」問題は本スプリントのスコープに含めない(将来の2問目追加スプリントの候補として記録する)。

- `g6_plane_033`(弧の長さ、`lessonUnit:'円の性質', pattern:'おうぎ形の弧の長さ(中心角から)'`): 「周長(円周)と弧の長さを混同しない」というremaining列の指摘に直接対応する解説を含む。
- `g6_plane_034`(面積、`lessonUnit:'円の性質', pattern:'おうぎ形の面積(中心角から)'`)

### 対象外の明確化: P-15(円周・円の面積)との区別

`coverage-final.md`のP-15行(`有、g6_plane_019`)のremaining列には「円の面積(順方向・逆算とも)…未追加」とある。本スプリントの`g6_plane_034`は**おうぎ形の面積**(目的の量)を求める問題であり、solution内の①で円全体の面積を計算する中間ステップを含むが、これは「円の面積を単体で問う問題」ではない。したがって本スプリントはP-15のremaining列を解消しない。P-15行は無変更とする。

## 対象外(今回のスコープに含めないもの)

- P-15(円周・円の面積)の「円の面積(順方向・逆算)」の新規問題追加。
- 「弧の長さ・面積から中心角を逆算する」問題の追加。
- `circle-radius-reveal`エントリ・`wireSequentialReveal`関数本体の変更。
- 既存240+2=242問(`g6_plane_031`・`g6_plane_032`含む)の本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`の変更。
- `js/navigation.js`・`data/practice-variant-groups.js`の変更。

---

## 1. 完了条件リスト

### データ

1. `data/problems/practice-g6-plane.js`の既存242問は本文・正答・ID・`diagram`・`expandVisual`・`expandVisualData`を含め一切変更されていない。
2. 同ファイルの末尾に、新規問題`g6_plane_033`(弧の長さ)・`g6_plane_034`(面積)の2オブジェクトが、この順で追加されている。2IDとも追加前のファイルに存在しないこと(0件)を確認済み。
3. 新規2問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', lessonUnit:'円の性質', answerType:'number'`であり、`pattern`は本仕様4章の指定どおり。
4. 新規2問の`solution`が`docs/content-authoring.md`の構成基準(【ポイント】【解説】【広げてみよう】【確認】答え:の5段構成、「いつもの説明」口調)に従う。
5. `g6_plane_033`のsolutionの【広げてみよう】または【確認】に、「円周(周長)」と「弧の長さ」を混同しないことを明示的に説明する記述が含まれる(coverage-final.mdのremaining列「周長と弧長を区別」に対応)。
6. 新規2問の`diagram`(SVG)が、各問題の数値・図形要素(半径・中心角・求める量)と整合する座標・ラベルで実装されている。

### `js/app.js`の変更

7. `PLANE_EXPAND_VISUALS`オブジェクト内、`circle-radius-reveal`エントリの直後・`exterior-angle-circle`エントリの直前に、新規エントリ`sector-fraction-reveal`が本仕様3章のコードのとおり追加されている。
8. `js/app.js`に、`wireSequentialReveal`関数の直後・`wireAngleRevealVisual`関数の直前に、専用駆動関数`wireSectorFractionVisual(prefix, d)`が本仕様3章のコードのとおり追加されている。
9. 新規コードは既存の`simplifyRatio(a, b)`ヘルパー(P-31で追加済み)を`simplifyRatio(d.centerAngle, 360)`として呼び出し、新規ヘルパーは追加しない。
10. `circle-radius-reveal`エントリ・`wireSequentialReveal`関数・`exterior-angle-circle`エントリ・`wireAngleRevealVisual`関数の本体は一切変更されていない。
11. `same-height-ratio`・`wireHeightRatioVisual`・`base-height-ratio-product`・`wireBaseHeightRatioVisual`(いずれもP-31で追加・修正済み)は一切変更されていない。
12. `css/style.css`は変更不要(新規ビジュアルは`hidden`属性のトグルと`textContent`の書き換えのみで構成され、既存の`svg [hidden] { display:none; }`ルールのみで表示制御が完結するため)。
13. `g6_plane_033`の`expandVisualData`は`{ radius: 9, centerAngle: 120, wholeLabel: '円周', wholeValue: 56.52, targetLabel: '弧の長さ', targetValue: 18.84, unit: 'cm' }`であり、ステップ文言・`formula-reveal`表示はこの値から動的に生成される。
14. `g6_plane_034`の`expandVisualData`は`{ radius: 10, centerAngle: 90, wholeLabel: '面積', wholeValue: 314, targetLabel: 'おうぎ形の面積', targetValue: 78.5, unit: 'cm²' }`であり、同様に動的生成される。

### 件数アサーション・既存回帰

15. `tests/catalog.test.cjs`の問題数アサーションが242→244に更新されている。
16. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック2箇所(`toHaveCount(42)`)が`toHaveCount(44)`に更新され、該当テストが引き続きpassする。
17. `tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`・`tests/plane-p09-equal-area-transformation.spec.cjs`・`tests/plane-p31-base-height-ratio.spec.cjs`それぞれの件数チェック(42→44)・`validate-content.cjs`出力検証(`242 problems; 0 errors`→`244 problems; 0 errors`)が更新され、既存シナリオが引き続きpassする。
18. 新規2問は配列末尾に追加するため、既存問題の「問N」通し番号表示は変化しない。新規2問は「問43」・「問44」として表示される。
19. 既存ファイルのシナリオが、件数アサーション・件数表記の更新を除き無改修で全件passする。

### ビジュアル・UIの動作確認

20. `g6_plane_033`を開くと、「広げてみよう」欄に半径9cm・中心角120°のおうぎ形の図(中心付近に「？」)、「弧の長さを求める」ボタンが表示される。ボタンをタップすると、①中心角120°は360°の1/3というラベル、②円全体の円周は56.52cmというラベル、③「弧の長さ＝56.52×1/3＝18.84cm」という計算式、④「？」が「18.84cm」に変わり結果欄が表示される、という4ステップが順番に進行する。「もう一度」ボタンで初期状態に戻る。
21. `g6_plane_034`を開くと、「おうぎ形の面積を求める」ボタンをタップした際に、同じ4ステップ構造で、中心角90°は360°の1/4、円全体の面積314cm²、面積＝314×1/4＝78.5cm²、という正しい値で表示される。
22. 新規2問の「広げてみよう」欄をタップした際、ブラウザコンソールにエラーが出ない(favicon.ico由来の404は除外)。
23. `prefers-reduced-motion: reduce`を有効にした状態で`g6_plane_033`または`g6_plane_034`を開き、ボタンをタップした際、アニメーションの途中状態が視覚的に残らず即座に最終状態になることを確認する。
24. 新規2問以外の全既存問題(242問)を開いたときの「広げてみよう」インタラクションが退行していない。特に`circle-radius-reveal`(`g6_plane_019`)の「並べてみる」ボタンの動作が従来通りであることを確認する。

### 採点・検証コマンド

25. `node scripts/validate-content.cjs`が0エラーで終了する(244 problems; 0 errors)。
26. `node --test tests/*.test.cjs`・`npm test`が全件passする。
27. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
28. 本仕様5章の新規Playwrightシナリオ(`tests/plane-p16-sector.spec.cjs`)が追加され、全件passする。
29. 新規2問の答え(18.84cm, 78.5cm²)がClaudeによる別解検算で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、完了条件に含める)

30. `coverage-final.md`のP-16行が「無」→「有」に更新され、`evidence_ids`に`g6_plane_033, g6_plane_034`が追加され、「残る条件・確認事項」欄が更新されている。
31. 平面図形の集計行(`|平面図形|33|15|1|17|`)が`|平面図形|33|16|1|16|`に更新されている。
32. `coverage-final.json`も、P-16レコード(`status`, `evidence_ids`, `remaining`)・`stats.plane`(`有`:15→16, `無`:17→16)が同期して更新されている。
33. P-15行は無変更(「円の面積(順方向・逆算とも)」はP-16のスコープ外であり、引き続き未収録のまま)。
34. 上記30〜33はVISTAリポジトリ外のファイルであり、Claudeが直接編集し、VISTA側のテストの完了条件には含めない。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_033`・`g6_plane_034`の2オブジェクトを追記 | 追記 |
| `js/app.js` | 新規エントリ`sector-fraction-reveal`・新規駆動関数`wireSectorFractionVisual`を追記(既存`simplifyRatio`を再利用、新規ヘルパーなし) | 追記のみ |
| `tests/catalog.test.cjs` | 問題数アサーションを242→244に更新 | 追記 |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェックを42→44に更新(2箇所) | 追記 |
| `tests/plane-p05-formula-area.spec.cjs` / `tests/plane-p29-triangle-quad-properties.spec.cjs` / `tests/plane-p11-similarity-discovery.spec.cjs` / `tests/plane-p09-equal-area-transformation.spec.cjs` / `tests/plane-p31-base-height-ratio.spec.cjs` | 件数チェック・`validate-content.cjs`出力検証を更新 | 追記 |
| `tests/plane-p16-sector.spec.cjs`(新規) | 本仕様5章の新規Playwrightシナリオ | 新規作成 |
| `coverage-final.md` / `coverage-final.json` | P-16行を無→有に更新、集計行を更新 | 追記(VISTAリポジトリ外、Claude直接編集) |

`css/style.css`・`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`scripts/validate-content.cjs`・`js/navigation.js`は**いずれも変更不要**。

---

## 3. 新規ビジュアルエントリの設計

### 結論: 新規エントリ1件(`sector-fraction-reveal`)+専用駆動関数1件(`wireSectorFractionVisual`)を追加する。新規ヘルパーは不要(`simplifyRatio`を再利用)。CSSの変更は不要。

### (a) 新規エントリ`sector-fraction-reveal`

`PLANE_EXPAND_VISUALS`オブジェクト内、`circle-radius-reveal`のエントリの直後、`exterior-angle-circle`のエントリの直前に追加する。

```js
    'sector-fraction-reveal': d => {
        const [ratioA, ratioB] = simplifyRatio(d.centerAngle, 360);
        const rad = d.centerAngle * Math.PI / 180;
        const endX = (100 + 70 * Math.sin(rad)).toFixed(1);
        const endY = (100 - 70 * Math.cos(rad)).toFixed(1);
        const largeArc = d.centerAngle > 180 ? 1 : 0;
        const midRad = (d.centerAngle / 2) * Math.PI / 180;
        const labelX = (100 + 42 * Math.sin(midRad)).toFixed(1);
        const labelY = (100 - 42 * Math.cos(midRad)).toFixed(1);
        return {
            html: `<div class="plane-expand-stage">
                <svg viewBox="0 0 200 220" style="width:100%;max-width:240px;display:block" role="img" aria-labelledby="pe-sf-title pe-sf-desc">
                    <title id="pe-sf-title">中心角${d.centerAngle}°のおうぎ形を示す図</title>
                    <desc id="pe-sf-desc">半径${d.radius}cm・中心角${d.centerAngle}°のおうぎ形。中心角が360°の何分のいくつかを求めてから、円全体の${d.wholeLabel}にその割合をかけて${d.targetLabel}を求める。</desc>
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#ccc" stroke-dasharray="3 4"/>
                    <path d="M100,100 L100,30 A70,70 0 ${largeArc} 1 ${endX},${endY} Z" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                    <text x="${labelX}" y="${labelY}" font-size="12" fill="#F57F17" text-anchor="middle" font-weight="bold">${d.centerAngle}°</text>
                    <text id="pe-sf-target" x="100" y="104" font-size="13" fill="#1a1a2e" text-anchor="middle" font-weight="bold">？</text>
                    <text id="pe-sf-fraction-label" hidden x="100" y="18" font-size="12" fill="#7c3aed" text-anchor="middle" font-weight="bold">360°の${ratioA}/${ratioB}</text>
                    <text id="pe-sf-whole-label" hidden x="100" y="202" font-size="12" fill="#1565C0" text-anchor="middle">円全体の${d.wholeLabel}＝${d.wholeValue}${d.unit}</text>
                </svg>
                <div class="plane-expand-actions">
                    <button type="button" class="plane-anim-btn play" id="pe-sf-play">${d.targetLabel}を求める</button>
                    <button type="button" class="plane-anim-btn reset" id="pe-sf-reset">もう一度</button>
                </div>
                <div class="plane-expand-status" id="pe-sf-status" role="status" aria-live="polite">中心角${d.centerAngle}°のおうぎ形。${d.targetLabel}はどうやって求めるだろう?</div>
                <div class="plane-expand-steps" id="pe-sf-steps"></div>
                <div class="formula-reveal" id="pe-sf-result">中心角${d.centerAngle}°／360°＝${ratioA}/${ratioB}\n${d.wholeLabel}${d.wholeValue}${d.unit}×${ratioA}/${ratioB}＝${d.targetLabel}${d.targetValue}${d.unit}</div>
            </div>`,
            wire: () => wireSectorFractionVisual('pe-sf', d),
        };
    },
```

### (b) 新規駆動関数`wireSectorFractionVisual`

`wireSequentialReveal`関数の直後、`wireAngleRevealVisual`関数の直前に追加する。

```js
function wireSectorFractionVisual(prefix, d) {
    const [ratioA, ratioB] = simplifyRatio(d.centerAngle, 360);
    const seqSf = createTopicSequence();
    const fractionLabel = document.getElementById(prefix + '-fraction-label');
    const wholeLabel = document.getElementById(prefix + '-whole-label');
    const targetText = document.getElementById(prefix + '-target');
    const initialTargetText = targetText.textContent;
    const status = document.getElementById(prefix + '-status');
    const stepsEl = document.getElementById(prefix + '-steps');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqSf.cancel();
        fractionLabel.toggleAttribute('hidden', true);
        wholeLabel.toggleAttribute('hidden', true);
        targetText.textContent = initialTargetText;
        result.classList.remove('visible');
        status.textContent = initialStatus;
        clearExpandSteps(stepsEl);
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const showFraction = () => { fractionLabel.toggleAttribute('hidden', false); appendExpandStep(stepsEl, `① 中心角${d.centerAngle}°は、360°の${ratioA}/${ratioB}。`); };
        const showWhole = () => { wholeLabel.toggleAttribute('hidden', false); appendExpandStep(stepsEl, `② 円全体の${d.wholeLabel}は${d.wholeValue}${d.unit}。`); };
        const compute = () => { appendExpandStep(stepsEl, `③ ${d.targetLabel}＝円全体の${d.wholeLabel}×${ratioA}/${ratioB}。\n${d.wholeValue}×${ratioA}/${ratioB}＝${d.targetValue}${d.unit}。`); };
        const done = () => {
            targetText.textContent = `${d.targetValue}${d.unit}`;
            result.classList.add('visible');
            appendExpandStep(stepsEl, `④ 中心角の割合をかけるだけで、${d.targetLabel}が求まった。`);
        };
        if (topicReducedMotion()) { showFraction(); showWhole(); compute(); done(); return; }
        showFraction();
        seqSf.after(800, showWhole);
        seqSf.after(1600, compute);
        seqSf.after(2500, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
```

### (c) CSSの変更が不要である根拠

`wireSectorFractionVisual`は、ラベルの表示切替に`hidden`属性のトグルのみを使っており(`wireBaseHeightRatioVisual`と同じ設計)、専用のCSSトランジションクラスを持たない。既存の`svg [hidden] { display:none; }`ルールがそのまま機能する。

### (d) 数値検算(Claude確認済み)

- `g6_plane_033`: `simplifyRatio(120, 360)` → gcd(120,360)=120 → `[1, 3]`。円周＝9×2×3.14＝56.52cm。弧の長さ＝56.52×1/3＝18.84cm。
- `g6_plane_034`: `simplifyRatio(90, 360)` → gcd(90,360)=90 → `[1, 4]`。面積＝10×10×3.14＝314cm²。おうぎ形の面積＝314×1/4＝78.5cm²。

---

## 4. 新規問題2問の具体的な問題文・数値案

### `g6_plane_033`(弧の長さ、中心角から)

```js
{
  id: 'g6_plane_033',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '円の性質', pattern: 'おうぎ形の弧の長さ(中心角から)',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '中心角からおうぎ形の弧の長さを求める',
  text: '半径9cm、中心角120°のおうぎ形があります。\nこのおうぎ形の弧の長さは何cmですか。円周率は3.14とします。',
  answer: 18.84,
  hint: '中心角が360°の何分のいくつかを求めてから、円周(半径×2×3.14)にその割合をかける。円周全体と弧の長さを混同しないように注意する。',
  solution: `【ポイント】
おうぎ形の弧の長さは、円周の一部。中心角が360°の何分のいくつかを求め、円周にその割合をかけて求める。

【解説】
① 中心角は120°なので、360°の何分のいくつかを求めると、
《120÷360＝1/3》
② この円全体の円周は、
《半径9cm×2×3.14＝56.52cm》
③ 弧の長さは、円周の1/3なので、
《56.52×1/3＝18.84cm》

【広げてみよう】
「円周」はこの円1周ぶんの長さ(56.52cm)で、「弧の長さ」はその一部(おうぎ形の曲線部分、18.84cm)。この2つを混同しないように、常に「円周の何分のいくつか」を意識する。中心角が360°(＝1)なら弧の長さは円周そのものになり、中心角が180°(半分)なら弧の長さも円周の半分になる。

【確認】
弧の長さ18.84cmを円全体の円周56.52cmと比べると、
《18.84÷56.52＝1/3》
中心角120°/360°＝1/3と一致する。

答え：18.84cm`,
  expandVisual: 'sector-fraction-reveal',
  expandVisualData: { radius: 9, centerAngle: 120, wholeLabel: '円周', wholeValue: 56.52, targetLabel: '弧の長さ', targetValue: 18.84, unit: 'cm' },
  expandAdvice: '円周全体と弧の長さを混同しないように、まず中心角が360°の何分のいくつかを求めるくせをつけよう！',
  tags: ['平面図形', '円', 'おうぎ形', '弧の長さ'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 120÷360＝1/3。半径9cm→円周9×2×3.14＝56.52cm。弧の長さ56.52×1/3＝18.84cm。別解(上記【確認】): 18.84÷56.52＝1/3で中心角比率と一致。

### `g6_plane_034`(面積、中心角から)

```js
{
  id: 'g6_plane_034',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '円の性質', pattern: 'おうぎ形の面積(中心角から)',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '中心角からおうぎ形の面積を求める',
  text: '半径10cm、中心角90°のおうぎ形があります。\nこのおうぎ形の面積は何cm²ですか。円周率は3.14とします。',
  answer: 78.5,
  hint: '中心角が360°の何分のいくつかを求めてから、円の面積(半径×半径×3.14)にその割合をかける。',
  solution: `【ポイント】
おうぎ形の面積は、円の面積の一部。中心角が360°の何分のいくつかを求め、円の面積にその割合をかけて求める。

【解説】
① 中心角は90°なので、360°の何分のいくつかを求めると、
《90÷360＝1/4》
② この円全体の面積は、
《半径10cm×10cm×3.14＝314cm²》
③ おうぎ形の面積は、円の面積の1/4なので、
《314×1/4＝78.5cm²》

【広げてみよう】
弧の長さを求めるときと同じように、中心角の割合(360°の何分のいくつか)を先に求めてから、円全体の量(面積や円周)にかけ合わせるという考え方は共通している。中心角が90°(1/4)・180°(1/2)・120°(1/3)のように、きれいな分数になる角度は特によく出題されるので覚えておくとよい。

【確認】
おうぎ形の面積78.5cm²を円全体の面積314cm²と比べると、
《78.5÷314＝1/4》
中心角90°/360°＝1/4と一致する。

答え：78.5cm²`,
  expandVisual: 'sector-fraction-reveal',
  expandVisualData: { radius: 10, centerAngle: 90, wholeLabel: '面積', wholeValue: 314, targetLabel: 'おうぎ形の面積', targetValue: 78.5, unit: 'cm²' },
  expandAdvice: '中心角が90°・180°・120°など、きれいな分数になる角度の感覚をつかんでおこう！',
  tags: ['平面図形', '円', 'おうぎ形', '面積'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 90÷360＝1/4。半径10cm→面積10×10×3.14＝314cm²。おうぎ形の面積314×1/4＝78.5cm²。別解(上記【確認】): 78.5÷314＝1/4で中心角比率と一致。

難易度は、①(弧の長さ)・②(面積)とも★2とした(基本形で、`g6_plane_019`と同難易度)。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_032`が最後の要素)に、上記2オブジェクトをこの順で追記する。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-16 おうぎ形の弧の長さ・面積 ── */`)。新規2問は「問43」・「問44」として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

**共通方針**: `g6_plane_019`の`diagram`(1つの円を描き、中心から円周への線分と「？」を表示する構図、`viewBox="0 0 200 200"`)を参考にする。

**①`g6_plane_033`の座標方針**:
- 円(中心(100,100)・半径70)を描き、上部(12時の位置、(100,30))から時計回りに120°の扇形領域(パス`M100,100 L100,30 A70,70 0 0 1 X,Y Z`、X,Yは中心角120°・半径70の円周上の点)を色`#FFE082`/枠線`#F57F17`で塗る。計算式: `X = 100 + 70*sin(120°) ≒ 160.6`, `Y = 100 - 70*cos(120°) ≒ 135.0`。
- 扇形の中心角ラベル「120°」を扇形内の適当な位置(例: 二等分線上、中心から半径42程度の位置)に配置。
- 半径の直線(中心から(100,30)へ)に沿って「9cm」のラベルを添える。
- 弧(曲線部分)の近くに「？」を配置し、弧の長さが未知であることを示す。
- `role="img"`と`aria-label`で「半径9cm、中心角120°のおうぎ形。弧の長さは？」のように説明する。
- 目安`viewBox="0 0 200 200"`。

**②`g6_plane_034`の座標方針**:
- 同様に、中心角90°の扇形領域(パス`M100,100 L100,30 A70,70 0 0 1 170,100 Z`、90°は`X=100+70*sin(90°)=170, Y=100-70*cos(90°)=100`)を色`#FFE082`/枠線`#F57F17`で塗る。
- 中心角ラベル「90°」を扇形内に配置。
- 半径のラベル「10cm」を添える。
- 扇形の内側(面積を求める領域)に「？」を配置。
- `role="img"`と`aria-label`で「半径10cm、中心角90°のおうぎ形。面積は？」のように説明する。
- 目安`viewBox="0 0 200 200"`。

**共通の仕上げ**: いずれも円周部分は既存`g6_plane_019`のスタイル(`stroke="#1a1a2e" stroke-width="2"`または扇形を目立たせるため薄いグレーの破線円)を踏襲してよい。実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存のヘルパー(`open`, `grade`, `records`, `withinViewport`, `monitor`)のパターンに倣い、新規ファイル`tests/plane-p16-sector.spec.cjs`に以下を追加する。既存の回帰シナリオは、件数アサーションの42→44更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 平面図形カテゴリを開き、一覧件数が44問であることを確認する。
2. **弧の長さ(`g6_plane_033`)**: 「問43 中心角からおうぎ形の弧の長さを求める」を開き、問題文に半径9cm・中心角120°が記載されていることを確認。「18.84」を入力して正解表示を確認。
3. **弧の長さのインタラクション**: 「弧の長さを求める」ボタンをタップし、①`#pe-sf-fraction-label`が`hidden`を失う、②`#pe-sf-whole-label`が`hidden`を失う、③`.plane-expand-step`が4件表示される、④`#pe-sf-target`のテキストが「？」から「18.84cm」を含むテキストに変わる、ことを確認する。4ステップの文言に「1/3」が含まれることを確認する。「もう一度」ボタンで`#pe-sf-target`が「？」に戻ることを確認する。ブラウザコンソールにエラーが出ないことも確認する(favicon.ico由来の404は除外)。
4. **面積(`g6_plane_034`)**: 「問44 中心角からおうぎ形の面積を求める」を開き、問題文に半径10cm・中心角90°が記載されていることを確認。「78.5」を入力して正解表示を確認。
5. **面積のインタラクション**: 「おうぎ形の面積を求める」ボタンをタップし、4ステップの文言に「1/4」が含まれ、`#pe-sf-target`が「78.5cm²」を含むテキストに変わることを確認する。「もう一度」ボタンで初期状態に戻ることを確認する。
6. **既存`g6_plane_019`の回帰確認**: `g6_plane_019`を開き、「並べてみる」ボタンをタップして、`#pe-cr-count`が最終的に「7 / 7」になり、結果欄が表示されることを確認する(`circle-radius-reveal`/`wireSequentialReveal`が退行していないこと)。
7. **既存問題・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリの演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて`base-height-ratio-product`・`same-height-ratio`を使う既存問題(`g6_plane_031`・`g6_plane_010`)を開き、インタラクションが退行していないことを確認する。
8. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、案内が引き続き`g6_plane_002_v01`を指すことを確認する。
9. **`prefers-reduced-motion`対応**: `prefers-reduced-motion: reduce`をエミュレートした状態で`g6_plane_033`を開き、「弧の長さを求める」をタップした直後に`#pe-sf-target`が即座に「18.84cm」を含む表示になることを確認する。
10. **モバイルビューポート**: 上記2〜7のシナリオを`mobile`プロジェクト(375×812)でも実行する。
11. **構造検証**: `node scripts/validate-content.cjs`の出力が`244 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

### Codexが実装する範囲

- `js/app.js`: 新規エントリ`sector-fraction-reveal`・新規駆動関数`wireSectorFractionVisual`の実装(本仕様3章のコードのとおり)。
- `g6_plane_033`・`g6_plane_034`の`diagram`(SVG)の新規実装。
- `tests/catalog.test.cjs`・`tests/practice-repetition.spec.cjs`・`tests/plane-p05-formula-area.spec.cjs`・`tests/plane-p29-triangle-quad-properties.spec.cjs`・`tests/plane-p11-similarity-discovery.spec.cjs`・`tests/plane-p09-equal-area-transformation.spec.cjs`・`tests/plane-p31-base-height-ratio.spec.cjs`の件数アサーション・件数表記の更新。
- 本仕様5章のPlaywrightシナリオの実装、実ブラウザでの動作確認(可能な範囲で)。
- 自己評価(`sprints/plane-p16-sector/sprint-1-self-eval.md`)の作成。
- `circle-radius-reveal`・`wireSequentialReveal`・`same-height-ratio`系エントリに意図しない差分がないことの最終確認。

### Claudeが直接担当する範囲

- 新規問題2問の数学的内容の確定。
- 正答性の別解検算。
- `coverage-final.md`・`coverage-final.json`のP-16行の更新。
- Codex実装完了後の独立レビュー、Evaluatorとしての最終再確認(実ブラウザでの目視確認を含む)。

---

## 7. `coverage-final.md`/`coverage-final.json`の更新内容

### `coverage-final.md`

P-16行:
```
|P-16|おうぎ形の弧・面積・中心角|標|有|g6_plane_033, g6_plane_034|弧の長さ(g6_plane_033)と面積(g6_plane_034)を中心角から求める基本形を収録(2026-11-17)。円周(周長)と弧の長さを混同しない解説をg6_plane_033に含め、remaining列の指摘に対応。弧長・面積から中心角を逆算する問題、数値・条件を変えた2問目は未追加|
```

集計行: `|平面図形|33|15|1|17|` → `|平面図形|33|16|1|16|`

### `coverage-final.json`

`rows`中のP-16レコードの`status`を`"無"`→`"有"`、`evidence_ids`を`["g6_plane_033", "g6_plane_034"]`、`remaining`を上記md行と同じ文言に更新。`stats.plane`を`{"有": 16, "部": 1, "無": 16}`に更新(`total`33は不変)。P-15レコードは無変更。

---

## 制約・前提条件

- 答えは小数(18.84cm, 78.5cm²)。VISTAの他カテゴリ(計算・割合)に小数の`answer`の先例があることを確認済み(`practice-g6-calc.js`の4.7等)。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- `circle-radius-reveal`・`wireSequentialReveal`・`exterior-angle-circle`・`wireAngleRevealVisual`本体・`same-height-ratio`系・`css/style.css`は一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。

## 未解決の仮定

- `g6_plane_033`・`g6_plane_034`の数値(半径9cm/10cm、中心角120°/90°)の選定はPlannerの裁量であり、最終的な採否はユーザー確認が望ましい。
- 「弧長・面積から中心角を逆算する」問題、および数値・条件を変えた2問目(完了基準の条件2)は本スプリントのスコープ外とし、将来の追加スプリント候補として記録する。
