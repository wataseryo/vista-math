---
created: "2026-11-16"
project: "平面図形 P-05(正方形・長方形・ひし形の面積) 部→有化 — 公式単体問題3問+formula-slotビジュアル拡張"
status: draft
sprints_total: 1
---

# 製品仕様書: 平面図形 P-05(正方形・長方形・ひし形の面積) の「部」→「有」化

## プロダクト概要

VISTAの小6受験算数カリキュラム網羅性向上プロジェクト(`docs/curriculum-implementation-plan.md` 0.4節、Plannerエージェントが2026-11-16に作成した「平面図形 残り22タイプの着手順序ロードマップ」)の「次の6スプリント」のうち、1番目のP-05(正方形・長方形・ひし形の面積)を実装するスプリントである。

`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`(および`coverage-final.json`)における現状:

```
P-05|正方形・長方形・ひし形の面積|基|部|g6_plane_006, g6_plane_007|複合図形の前提としてのみ登場
```

既存の`g6_plane_006`(長方形から三角形を切り取る複合図形、長方形10×8＝80cm²を前提として使用)・`g6_plane_007`(L字型複合図形、長方形8×10＝80cm²を前提として使用)はどちらも「複合図形の引き算」が主題であり、正方形・長方形・ひし形そのものの面積公式の成立を単体で問う問題が存在しない。これが「部」評価の理由である。

本スプリントは、正方形・長方形・ひし形それぞれについて、公式成立の理解を単体で問う新規問題を1問ずつ(計3問)追加し、P-05を「有」に昇格させる。ユーザー方針(「基本的には全部作ってほしい、問題は追加してほしい」)に従い、1タイプ=最低1問で足りるところを3図形×1問=3問とする。

技術的には、`js/app.js`の`PLANE_EXPAND_VISUALS`オブジェクトに既存の`triangle-formula-slot`・`parallelogram-formula-slot`・`trapezoid-formula-slot`と同じ並びで、`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`の3エントリを追加する。駆動ロジック(`wireFormulaSlotVisual`関数)は図形非依存の汎用コードであり、変更不要。

## 対象外(今回のスコープに含めないもの)

- 「次の6スプリント」のP-05以外の5件(P-29, P-11残り, P-09, P-31+P-10の2問目, P-16)。これらは別途specを起こす。
- `data/practice-variant-groups.js`(2026-11-16の別トラック「類題(反復練習)」の対応表)。本スプリントはこの仕組みと無関係であり、新規3問をこの対応表に加える作業は行わない(将来必要になれば別specで検討)。
- 既存`g6_plane_006`・`g6_plane_007`(複合図形)の本文・正答・ID・`diagram`の変更。本スプリントは新規問題の追加のみで、これら2問は無変更のまま残す(複合図形の前提として今後も有効)。
- 正方形の「面積から1辺を逆算」(平方根が必要)。小6の学習範囲外のため、正方形は「1辺から面積を求める」順方向のみを扱う(論点3の判断、後述)。
- `js/navigation.js`の変更(本スプリントは一切触れない)。
- 既存19問(`u6_plane_trial_001〜004`, `g6_plane_001〜020`)および、2026-11-16の類題スプリントで追加済みの6問(`g6_plane_002_v01/v02`, `g6_plane_004_v01/v02`, `g6_plane_005_v01/v02`)の内容変更。

---

## 1. 完了条件リスト

Evaluatorの合格基準(完了条件達成率100%・クリティカルバグ0件・`node scripts/validate-content.cjs` 0エラー・`npm test`全件pass・既存回帰Playwrightスイート全件pass)に対応する、検証可能な条件。

### データ

1. `data/problems/practice-g6-plane.js`の既存230問(全エントリ)は本文・正答・ID・`diagram`・`expandVisualData`を含め一切変更されていない(`git diff`で既存エントリに差分がないことを確認)。特に`g6_plane_006`・`g6_plane_007`は無変更。
2. 同ファイルの末尾(`g6_plane_005_v02`の直後、配列の最後)に、新規問題`g6_plane_021`(正方形)・`g6_plane_022`(長方形)・`g6_plane_023`(ひし形)の3オブジェクトが、この順で追加されている。3IDとも追加前のファイルに存在しないことを`grep -c "id: 'g6_plane_02[123]'" data/problems/practice-g6-plane.js`で追加前に0件だったことを確認した記録が残っている(Claude確認済み: 実装前0件)。
3. 新規3問は共通して`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm²'`であり、`lessonUnit`・`pattern`は本仕様4章の指定どおり(正方形:`lessonUnit:'正方形の面積', pattern:'公式適用'`、長方形:`lessonUnit:'長方形の面積', pattern:'公式適用'`、ひし形:`lessonUnit:'ひし形の面積', pattern:'公式適用'`)。
4. 新規3問の`solution`が、`docs/content-authoring.md`の構成基準(【ポイント】【解説】【広げてみよう】【確認】の4見出し、丸数字手順、「いつもの説明」口調、《 》式ブロック、末尾「答え：」)に従う。
5. 新規3問の`diagram`(SVG)が、各問題の数値(1辺/たて・よこ/対角線1・対角線2)と整合する座標・ラベルで実装されている。既存問題のSVGをコピーして数値だけ書き換えた結果、図形の見た目の比率と数値が食い違っている状態になっていないこと(本仕様4章末の座標方針に従い、座標・引き出し線・`viewBox`を再計算すること)。
6. `js/app.js`の`PLANE_EXPAND_VISUALS`オブジェクトに、既存の`triangle-formula-slot`・`parallelogram-formula-slot`・`trapezoid-formula-slot`と同じ並び(`trapezoid-formula-slot`の直後、`subtract-triangle`の直前)に、`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`の3エントリが本仕様3章のコードのとおり追加されている。既存エントリ(`triangle-formula-slot`等を含む全既存キー)は一切変更されていない(`git diff js/app.js`で該当3エントリの追加以外に差分がないことを確認)。
7. `css/style.css`に、新規クラス`.plane-expand-chip-static`(本仕様3章参照、`square-formula-slot`の非タップ要素用)が追加されている。既存の`.plane-expand-chip`系ルールは無変更。
8. `scripts/validate-content.cjs`・`index.html`・`data/practice-variant-groups.js`は変更不要(本スプリントは`PLANE_EXPAND_VISUALS`へのJSオブジェクト追加とデータ追加のみで完結するため)。実装後に`git diff scripts/validate-content.cjs index.html data/practice-variant-groups.js`がいずれも空であることを確認する。

### 件数アサーション・既存回帰

9. `tests/catalog.test.cjs`の問題数アサーションが230→233に更新されている(`assert.equal(r.count,233)`)。
10. `tests/practice-repetition.spec.cjs`内、平面図形カテゴリの問題一覧件数チェック2箇所(`toHaveCount(30)`、`open()`ヘルパー内と末尾の統合シナリオ内)が`toHaveCount(33)`に更新され、該当テストが引き続きpassする。
11. 新規3問は`PRACTICE_G6_PLANE`配列の末尾に追加するため、既存問題(`g6_plane_002_v01`等、問25〜30)の「問N」通し番号表示は変化しない。新規3問は「問31」(正方形)・「問32」(長方形)・「問33」(ひし形)として演習一覧・問題詳細タイトルに表示される。
12. `tests/practice-repetition.spec.cjs`の既存シナリオ(「問25」「問26」等のハードコードされた番号・SVG`viewBox`/`polygon`座標の期待値を含む)が本スプリントの変更後も無改修で全件passする(新規3問は末尾追加のため、既存番号・座標に影響しない)。

### ビジュアル・UIの動作確認

13. 新規3問それぞれを開くと、「広げてみよう」欄に対応する`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`のインタラクティブUIが表示される。
14. `square-formula-slot`は「面積」チップのみタップ可能で、タップすると「1辺×1辺＝面積」の式変形が展開される。「1辺」のラベル(2箇所)は非タップ要素(`.plane-expand-chip-static`)としてスタイリングされ、タップしても何も起きない(クリックしてもJSエラーが発生しないこと、ブラウザコンソールにエラーが出ないこと)。
15. `rectangle-formula-slot`は「面積」「たて」「よこ」の3チップいずれもタップでき、タップした文字に応じた式変形(たて逆算/よこ逆算/面積の順算)が展開される。
16. `rhombus-formula-slot`は「面積」「対角線1」「対角線2」の3チップいずれもタップでき、三角形と同じ÷2構造の式変形が、変数名「対角線1」「対角線2」で展開される。
17. 新規3問以外の全既存問題(特に`triangle-formula-slot`等を使う`g6_plane_002`等)を開いたときの「広げてみよう」インタラクションが退行していない。

### 採点・検証コマンド

18. `node scripts/validate-content.cjs`が0エラーで終了する(233 problems; 0 errors)。
19. `node --test tests/catalog.test.cjs`・`npm test`が全件passする。
20. 既存のPlaywright回帰スイート全件(desktop+mobile)が引き続きpassする。
21. 本仕様5章の新規Playwrightシナリオが追加され、全件passする。
22. 新規3問の答え(81cm², 66cm², 70cm²)がClaudeによる別解検算(後述)で確認済みであること。

### カリキュラム網羅表の更新(本スプリント固有、他スプリント1/2と異なり完了条件に含める)

23. `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`のP-05行が「部」→「有」に更新され、`evidence_ids`に`g6_plane_021, g6_plane_022, g6_plane_023`が追加され(`g6_plane_006, g6_plane_007`は複合図形の根拠として残置可)、`remaining`欄が本スプリントの成果を反映した内容に書き換えられている。平面図形の集計行(`|平面図形|33|11|4|18|`)が`|平面図形|33|12|3|18|`に更新されている。
24. 同ファイルの`coverage-final.json`も、`rows`配列中のP-05レコード(`status`, `evidence_ids`, `remaining`)と`stats.plane`(`有`:11→12, `部`:4→3)が同期して更新されている。
25. 上記23・24はVISTAリポジトリ外のファイル(`.company/research/...`配下)であり、VISTAの`npm test`・`validate-content.cjs`の対象ではない。Claudeが直接編集し、VISTA側のPlaywright/単体テストの完了条件には含めない(独立した完了条件として扱う)。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_021`(正方形)・`g6_plane_022`(長方形)・`g6_plane_023`(ひし形)の3オブジェクトを追記。既存部分は無変更 | 追記 |
| `js/app.js` | `PLANE_EXPAND_VISUALS`オブジェクトに、`trapezoid-formula-slot`の直後・`subtract-triangle`の直前の位置へ`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`の3エントリを追記(3章参照)。既存エントリ・`wireFormulaSlotVisual`関数本体は無変更 | 追記 |
| `css/style.css` | `.plane-expand-chip`ルール群の直後に`.plane-expand-chip-static`を新規追加(3章参照) | 追記 |
| `tests/catalog.test.cjs` | 問題数アサーションを230→233に更新 | 追記(1行変更) |
| `tests/practice-repetition.spec.cjs` | 平面図形カテゴリの件数チェック`toHaveCount(30)`を`toHaveCount(33)`に更新(2箇所: `open()`ヘルパー内、末尾の統合シナリオ内)。本仕様5章の新規シナリオを追加 | 追記 |
| `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md` / `coverage-final.json` | P-05行を部→有に更新、集計行を更新(1章23・24参照) | 追記(VISTAリポジトリ外、Claude直接編集) |

`index.html`・`data/categories.js`・`data/practice-variant-groups.js`・`scripts/validate-content.cjs`・`js/navigation.js`は変更不要。

---

## 3. 新規ビジュアルエントリ3件の具体的なコード設計

### 設計方針(論点2・3への回答)

- **ひし形(論点2)**: 公式は底辺×高さ÷2の三角形と同じ「÷2」構造であり、`triangle-formula-slot`の`height`/`base`/`area`の3方向パターンをそのまま踏襲する。ただし変数名は「底辺・高さ」ではなく「対角線1・対角線2」にする。データキーも`base`/`height`ではなく`diag1`/`diag2`にして、表示テキストと実装上のキー名を一致させ、他の図形の`base`/`height`と混同しないようにする。CSS上の色クラス(`.base`/`.height`)はそのまま使い回してよい(色は変数の役割を示す汎用クラスであり、`data-key`の文字列とは独立)。既存の`trapezoid-formula-slot`が`class="base" data-key="sum"`のように色クラスと`data-key`を一致させていない前例があり、この設計は既存コードと整合する。
- **正方形(論点3)**: 正方形は変数が「1辺」1種類しかなく、逆算(面積から1辺、平方根)は小6の範囲外のため今回は対象外とする。したがって`derivations`は`area`方向(1辺から面積を求める)のみを実装する。UI上は「面積 ＝ 1辺 × 1辺」の式を表示するが、タップ可能なのは「面積」チップのみとし、2箇所の「1辺」は新規CSSクラス`.plane-expand-chip-static`(非タップのラベル、既存`.plane-expand-chip`とは別クラスなので`wireFormulaSlotVisual`の`querySelectorAll('.plane-expand-chip')`には拾われず、クリックしてもエラーにならない)で表示する。これにより「1辺から面積を求める」の理解に焦点を絞り、平方根という範囲外の概念に踏み込まずに済む。
- **長方形**: `parallelogram-formula-slot`(底辺×高さ、÷2なし)と完全に同型。変数名を「底辺・高さ」ではなく「たて・よこ」にするだけ。データキーは`vertical`(たて)/`horizontal`(よこ)/`area`。

### `js/app.js`への追記コード

`PLANE_EXPAND_VISUALS`オブジェクト内、`trapezoid-formula-slot`のエントリ(現状`js/app.js`1156〜1195行目付近)の直後、`subtract-triangle`のエントリの直前に、以下の3エントリを追加する。

```js
    'square-formula-slot': d => {
        const derivations = {
            area: [
                { text: '面積 ＝ 1辺 × 1辺', type: 'formula' },
                { text: `面積 ＝ ${d.side} × ${d.side}` },
                { text: `面積 ＝ ${d.side * d.side}`, type: 'final' },
            ],
        };
        return {
            html: `<div class="plane-expand-stage">
                <div class="plane-expand-eq" id="pe-fs-square-eq">
                    <span class="plane-expand-chip area" data-key="area">面積</span>
                    <span class="plane-expand-eq-op">＝</span>
                    <span class="plane-expand-chip-static">1辺</span>
                    <span class="plane-expand-eq-op">×</span>
                    <span class="plane-expand-chip-static">1辺</span>
                </div>
                <div class="plane-expand-status" id="pe-fs-square-status" role="status" aria-live="polite">知りたい文字をタップしてみよう。</div>
                <div class="plane-expand-steps" id="pe-fs-square-steps"></div>
            </div>`,
            wire: () => wireFormulaSlotVisual('pe-fs-square', derivations),
        };
    },
    'rectangle-formula-slot': d => {
        const derivations = {
            vertical: [
                { text: 'たて × よこ ＝ 面積' },
                { text: 'たて ＝ 面積 ÷ よこ', type: 'formula' },
                { text: `たて ＝ ${d.area} ÷ ${d.horizontal}` },
                { text: `たて ＝ ${d.area} ÷ ${d.horizontal} ＝ ${d.vertical}`, type: 'final' },
            ],
            horizontal: [
                { text: 'たて × よこ ＝ 面積' },
                { text: 'よこ ＝ 面積 ÷ たて', type: 'formula' },
                { text: `よこ ＝ ${d.area} ÷ ${d.vertical}` },
                { text: `よこ ＝ ${d.area} ÷ ${d.vertical} ＝ ${d.horizontal}`, type: 'final' },
            ],
            area: [
                { text: '面積 ＝ たて × よこ', type: 'formula' },
                { text: `面積 ＝ ${d.vertical} × ${d.horizontal}` },
                { text: `面積 ＝ ${d.vertical} × ${d.horizontal} ＝ ${d.area}`, type: 'final' },
            ],
        };
        return {
            html: `<div class="plane-expand-stage">
                <div class="plane-expand-eq" id="pe-fs-rect-eq">
                    <span class="plane-expand-chip area" data-key="area">面積</span>
                    <span class="plane-expand-eq-op">＝</span>
                    <span class="plane-expand-chip base" data-key="vertical">たて</span>
                    <span class="plane-expand-eq-op">×</span>
                    <span class="plane-expand-chip height" data-key="horizontal">よこ</span>
                </div>
                <div class="plane-expand-status" id="pe-fs-rect-status" role="status" aria-live="polite">知りたい文字をタップしてみよう。</div>
                <div class="plane-expand-steps" id="pe-fs-rect-steps"></div>
            </div>`,
            wire: () => wireFormulaSlotVisual('pe-fs-rect', derivations),
        };
    },
    'rhombus-formula-slot': d => {
        const derivations = {
            diag1: [
                { text: '対角線1 × 対角線2 ÷ 2 ＝ 面積' },
                { text: '対角線1 × 対角線2 ＝ 面積 × 2' },
                { text: '対角線1 ＝ 面積 × 2 ÷ 対角線2', type: 'formula' },
                { text: `対角線1 ＝ ${d.area} × 2 ÷ ${d.diag2}` },
                { text: `対角線1 ＝ ${d.area * 2} ÷ ${d.diag2} ＝ ${d.diag1}`, type: 'final' },
            ],
            diag2: [
                { text: '対角線1 × 対角線2 ÷ 2 ＝ 面積' },
                { text: '対角線1 × 対角線2 ＝ 面積 × 2' },
                { text: '対角線2 ＝ 面積 × 2 ÷ 対角線1', type: 'formula' },
                { text: `対角線2 ＝ ${d.area} × 2 ÷ ${d.diag1}` },
                { text: `対角線2 ＝ ${d.area * 2} ÷ ${d.diag1} ＝ ${d.diag2}`, type: 'final' },
            ],
            area: [
                { text: '面積 ＝ 対角線1 × 対角線2 ÷ 2', type: 'formula' },
                { text: `面積 ＝ ${d.diag1} × ${d.diag2} ÷ 2` },
                { text: `面積 ＝ ${d.diag1 * d.diag2} ÷ 2 ＝ ${d.area}`, type: 'final' },
            ],
        };
        return {
            html: `<div class="plane-expand-stage">
                <div class="plane-expand-eq" id="pe-fs-rhombus-eq">
                    <span class="plane-expand-chip area" data-key="area">面積</span>
                    <span class="plane-expand-eq-op">＝</span>
                    <span class="plane-expand-chip base" data-key="diag1">対角線1</span>
                    <span class="plane-expand-eq-op">×</span>
                    <span class="plane-expand-chip height" data-key="diag2">対角線2</span>
                    <span class="plane-expand-eq-op">÷2</span>
                </div>
                <div class="plane-expand-status" id="pe-fs-rhombus-status" role="status" aria-live="polite">知りたい文字をタップしてみよう。</div>
                <div class="plane-expand-steps" id="pe-fs-rhombus-steps"></div>
            </div>`,
            wire: () => wireFormulaSlotVisual('pe-fs-rhombus', derivations),
        };
    },
```

(変数名・実装の細部の微調整はCodexの裁量とするが、「正方形は`area`方向のみ・1辺は非タップ」「ひし形は変数名を対角線1/対角線2にする」という2点は厳守する。)

### `css/style.css`への追記

既存の`.plane-expand-chip`系ルール(現状1055〜1061行目付近)の直後に、以下を追加する。

```css
.plane-expand-chip-static { display:inline-flex; align-items:center; padding:6px 12px; border-radius:8px; font-weight:bold; border:2px solid transparent; background:#ECEFF1; color:#455A64; cursor:default; }
```

(タップ可能な`.plane-expand-chip`と視覚的に区別できる配色であればよく、具体的な色調整はCodexの裁量とする。ただし`cursor:default`で「タップできない」ことが分かるようにする点は必須。)

---

## 4. 新規問題3問の具体的な問題文・数値案

いずれも`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm²'`。`docs/content-authoring.md`の4見出し構成・「いつもの説明」口調・《 》式ブロックに従う。

### `g6_plane_021`(正方形の面積)

```js
{
  id: 'g6_plane_021',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '正方形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '正方形の面積（基本）',
  text: '1辺が9cmの正方形があります。面積を求めなさい。',
  answer: 81,
  hint: '正方形の面積 ＝ 1辺 × 1辺',
  solution: `【ポイント】
正方形の面積は、1辺×1辺で求められる。

【解説】
① 正方形は4つの辺の長さがすべて等しい四角形で、1辺の長さは9cm。
② 正方形の面積は、1辺×1辺なので、9×9を計算する。
《③ 9×9＝81cm²》

【広げてみよう】
正方形は、たてとよこの長さが等しい長方形と見ることもできる。長方形の面積の公式「たて×よこ」に、たてとよこの両方に9cmを当てはめても、9×9＝81cm²になり、同じ答えになる。

【確認】
《81÷9＝9》
もとの1辺の長さと一致する。

答え：81cm²`,
  expandVisual: 'square-formula-slot',
  expandVisualData: { side: 9, area: 81 },
  expandAdvice: '正方形を見たら「たて・よこが同じ長さの長方形」と考えて、長方形の公式とのつながりを意識できるようにしよう！',
  tags: ['平面図形', '正方形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 9×9＝81。別解(長方形化): たて9cm×よこ9cm＝81cm²で一致。

### `g6_plane_022`(長方形の面積)

```js
{
  id: 'g6_plane_022',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '長方形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '長方形の面積（基本）',
  text: 'たて6cm、よこ11cmの長方形があります。面積を求めなさい。',
  answer: 66,
  hint: '長方形の面積 ＝ たて × よこ',
  solution: `【ポイント】
長方形の面積は、たて×よこで求められる。

【解説】
① たては6cm、よこは11cm。
② 長方形の面積は、たて×よこなので、6×11を計算する。
《③ 6×11＝66cm²》

【広げてみよう】
長方形は、1辺1cmの正方形(面積1cm²)を、たてに6個・よこに11個すき間なく並べた形と考えられる。たて×よこの計算は、この1cm²の正方形が全部でいくつ並ぶかを求めていることと同じ。

【確認】
《66÷6＝11》
もとのよこの長さと一致する。

答え：66cm²`,
  expandVisual: 'rectangle-formula-slot',
  expandVisualData: { vertical: 6, horizontal: 11, area: 66 },
  expandAdvice: '面積の公式はいつも「2つの長さの積」であることを意識して、たてとよこを求める逆算にも挑戦できるようにしよう！',
  tags: ['平面図形', '長方形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 6×11＝66。別解: 66÷11＝6(たての長さと一致)。

### `g6_plane_023`(ひし形の面積)

```js
{
  id: 'g6_plane_023',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: 'ひし形の面積', pattern: '公式適用',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: 'ひし形の面積（基本）',
  text: '対角線の長さが14cmと10cmのひし形があります。面積を求めなさい。',
  answer: 70,
  hint: 'ひし形の面積 ＝ 対角線1 × 対角線2 ÷ 2',
  solution: `【ポイント】
ひし形の面積は、対角線×対角線÷2で求められる。

【解説】
① ひし形の2本の対角線は、それぞれ14cmと10cm。
② ひし形の面積は、対角線×対角線÷2なので、14×10÷2を計算する。
《③ 14×10÷2＝140÷2＝70cm²》

【広げてみよう】
ひし形の2本の対角線は、たがいに直角に交わり、それぞれを2等分する。この2本の対角線を使って、ひし形をちょうど囲む「たて10cm×よこ14cmの長方形」を考えると、ひし形の面積はその長方形のちょうど半分になっている。だから、対角線×対角線÷2という÷2の付いた公式になる。

【確認】
《14×10＝140(ひし形を囲む長方形の面積)、140÷2＝70》
もとのひし形の面積と一致する。

答え：70cm²`,
  expandVisual: 'rhombus-formula-slot',
  expandVisualData: { diag1: 14, diag2: 10, area: 70 },
  expandAdvice: 'ひし形を見たら、2本の対角線が直角に交わって作る長方形の半分として面積をとらえられるようにしよう！',
  tags: ['平面図形', 'ひし形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 14×10＝140、140÷2＝70。別解(長方形化): 対角線を囲む長方形10cm×14cm＝140cm²÷2＝70cm²で一致。

難易度は、正方形・長方形を★1(`g6_plane_001`〜`003`と同格の最も基本的な公式適用)、ひし形を★2(対角線という小6で比較的新しい概念を扱うため、台形と同格)とした。この難易度判断はPlannerの裁量であり、最終確認はユーザーに委ねる(「未解決の仮定」参照)。

### ファイル内の配置

`data/problems/practice-g6-plane.js`の配列末尾(現状`g6_plane_005_v02`が最後の要素)に、上記3オブジェクトをこの順で追記する。既存の末尾要素の閉じ括弧の直後にカンマを追加してから新規3要素を追加すること(配列全体の末尾要素にトレーリングカンマがあってもJS構文上問題ない)。新規追加の直前に区切りコメントを1行追加してよい(例: `/* ── P-05 正方形・長方形・ひし形の面積（公式単体） ── */`)。この配置により、既存問題(`u6_plane_trial_001`〜`g6_plane_005_v02`、演習一覧「問1」〜「問30」)の通し番号は一切変化せず、新規3問は「問31」(正方形)・「問32」(長方形)・「問33」(ひし形)として追加される。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールドのSVG自体はCodexが実装する。以下の点を厳守すること。

**共通の座標方針**: 平面図形の既存SVGは概ね「1cm＝14px」のスケールで座標を算定している(2026-11-16類題スプリントの検証でも確認済み)。新規3問もこのスケール感を踏襲し、問題ごとの数値(1辺/たて・よこ/対角線1・対角線2)から`polygon`の頂点座標・引き出し線の座標・`viewBox`を必ず再計算すること。既存SVGをコピーして数値ラベルの文字列だけ書き換えるのは禁止。

**配色**(いずれも平面図形で未使用の新配色。正方形・長方形・ひし形という「新しい図形カテゴリ」であることを視覚的に示す):
- 正方形(`g6_plane_021`): 塗り`#CE93D8` / 枠線`#6A1B9A`。
- 長方形(`g6_plane_022`): 塗り`#FFF59D` / 枠線`#F9A825`。
- ひし形(`g6_plane_023`): 塗り`#80CBC4` / 枠線`#00695C`。
- 寸法線・ラベルの色は既存の慣例(横方向の長さ＝青`#1565C0`、縦方向の長さ＝赤`#E53935`)を踏襲する。フォントサイズ12px前後、`text-anchor="middle"`、縦方向のラベルは`transform="rotate(-90 ...)"`。

**正方形(`g6_plane_021`、1辺9cm→126px)の座標方針**:
- 正方形の4頂点(例: 左上(47,40)・右上(173,40)・右下(173,166)・左下(47,166)、1辺126px)。
- 4辺それぞれの中点に短いチックマーク(等しい辺であることを示す記号、例: 各辺の中点を通る8px程度の短い線)を入れ、「4辺すべてが同じ長さ」であることを視覚的に示す。
- 寸法線・ラベルは下辺の1か所のみ(「1辺 9cm」、青)でよい(4辺とも同じ長さなので、重複してラベルを付ける必要はない)。
- 目安`viewBox="0 0 220 210"`。

**長方形(`g6_plane_022`、たて6cm→84px・よこ11cm→154px)の座標方針**:
- 長方形の4頂点(例: 左上(50,40)・右上(204,40)・右下(204,124)・左下(50,124)、たて84px×よこ154px)。
- 下辺に「よこ 11cm」ラベル(青)、右辺に「たて 6cm」ラベル(赤、縦書き)。
- 目安`viewBox="0 0 280 170"`。

**ひし形(`g6_plane_023`、対角線14cm→196px・対角線10cm→140px)の座標方針**:
- ひし形はトランプの◆のような向き(上下左右に頂点)で描く。中心を(160,110)とし、上頂点(160,40)・右頂点(258,110)・下頂点(160,180)・左頂点(62,110)(`polygon points="160,40 258,110 160,180 62,110"`)。
- 2本の対角線を点線(破線)で描画し、交点に小さな直角マーク(直交していることを示す記号)を入れる。
- 横の対角線(14cm)のラベルは下側に(「対角線 14cm」、青)、縦の対角線(10cm)のラベルは右側に(「対角線 10cm」、赤、縦書き)配置する。
- 目安`viewBox="0 0 320 220"`。

**共通の仕上げ**:
- いずれも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する(既存問題の慣例に合わせる)。
- 本スプリントは全問「順方向」(与えられた長さから面積を求める)のため、既存の「辺の逆算」問題(`g6_plane_004`等)のような「高さ ？」のような伏せ字表示は不要。すべての既知の数値をそのまま図に表示してよい。
- 実装後、Claudeが数値と図の整合性を独立レビューする(6章参照)。

---

## 5. 検証項目(Evaluator向けPlaywrightシナリオ)

既存`tests/practice-repetition.spec.cjs`のヘルパー(`open`, `grade`, `records`, `withinViewport`)のパターンに倣い、新規ファイル`tests/plane-p05-formula-area.spec.cjs`(または既存の平面図形関連spec)に以下を追加する。既存の回帰シナリオ(`navigation.spec.cjs`, `storage-ui.spec.cjs`, `learning-extras.spec.cjs`, `plane-angle-interaction.spec.cjs`, `practice-repetition.spec.cjs`等)は、件数アサーションの30→33更新を除き無改修で全件passすること。

1. **一覧件数の更新確認**: 演習問題→平面図形カテゴリを開き、一覧件数が33問(旧30問から+3)であることを確認する。
2. **正方形問題(`g6_plane_021`)**: 一覧末尾から「問31 正方形の面積（基本）」を開き、問題文・SVGが1辺9cmに対応していることを確認。「81」を入力して正解表示を確認。「広げてみよう」欄で「面積」チップをタップし、式変形(「面積＝1辺×1辺」→「面積＝9×9」→「面積＝81」)が表示されることを確認。「1辺」の非タップ要素をクリックしても式変形欄に変化がなく、コンソールエラーが出ないことを確認。
3. **長方形問題(`g6_plane_022`)**: 「問32 長方形の面積（基本）」を開き、問題文・SVGがたて6cm・よこ11cmに対応していることを確認。「66」を入力して正解表示を確認。「広げてみよう」欄で「たて」「よこ」「面積」の3チップそれぞれをタップし、対応する式変形が表示されることを確認。
4. **ひし形問題(`g6_plane_023`)**: 「問33 ひし形の面積（基本）」を開き、問題文・SVGが対角線14cm・10cmに対応していることを確認。「70」を入力して正解表示を確認。「広げてみよう」欄で「対角線1」「対角線2」「面積」の3チップそれぞれをタップし、変数名が「対角線1」「対角線2」で表示される式変形が確認できることを確認。
5. **既存21問・他カテゴリへの影響がないこと**: 平面図形以外のカテゴリ(例: 割合・比)の演習問題を1問開いて解答し、従来通りの挙動であることを確認する。あわせて、平面図形カテゴリの既存問題のうち`triangle-formula-slot`を使う問題(例: `g6_plane_004`)を開き、「広げてみよう」のインタラクションが退行していないことを確認する。
6. **`g6_plane_002`系の類題導線の非干渉(回帰)**: `g6_plane_002`を開いて正解し、「同じ考え方でもう1問」の案内が引き続き`g6_plane_002_v01`を指すことを確認する(新規3問は`PRACTICE_VARIANT_GROUPS`に属さないため、`prac-variant-nav`が一切表示されないことも確認する)。
7. **モバイルビューポート**: 上記2〜4のシナリオを`mobile`プロジェクト(375×812)でも実行し、SVGと「広げてみよう」のチップUIがビューポート内に収まる(`boundingBox`がはみ出さない)ことを確認する。
8. **構造検証**: `node scripts/validate-content.cjs`の出力が`233 problems; 0 errors`であることを確認する。

---

## 6. 実装主体の割り振り

VISTAの担当分担ルール(`.company/engineering/CLAUDE.md`「VISTAの担当分担」2026-10-12決定: Codex=ビジュアルの設計・実装・ブラウザでの動作確認、Claude=算数の説明・問題と正解の整合性・変更コードの独立レビュー)に従う。

### Codexが実装する範囲

- `js/app.js`: `PLANE_EXPAND_VISUALS`への`square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`3エントリの実装(3章のコードをベースに、変数名・実装細部の微調整は裁量)。
- `css/style.css`: `.plane-expand-chip-static`の追加(3章参照、配色の細部は裁量)。
- `g6_plane_021`・`g6_plane_022`・`g6_plane_023`の`diagram`(SVG)の新規実装(4章末の座標方針・配色指示に従う)。
- `tests/catalog.test.cjs`の件数アサーション更新、`tests/practice-repetition.spec.cjs`の`toHaveCount`更新。
- 本仕様5章のPlaywrightシナリオの実装、実ブラウザ(desktop/mobile)での動作確認。
- 自己評価(`sprints/plane-p05-area-formula/sprint-1-self-eval.md`)の作成。

### Claudeが直接担当する範囲

- 新規問題3問(`g6_plane_021`, `g6_plane_022`, `g6_plane_023`)の**数学的内容**: 問題文、数値、答え、ヒント、4見出し構成の解説文、タグ、`expandVisualData`の値(4章に確定済みの内容として提示)。
- 上記の正答性の別解検算(4章に記載済み: 正方形は長方形化、長方形は逆算、ひし形は長方形で囲む方法)。
- `square-formula-slot`・`rectangle-formula-slot`・`rhombus-formula-slot`の`derivations`設計の確定(論点2・3への回答、3章の設計方針)。
- `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`・`coverage-final.json`のP-05行・集計の更新(1章23・24参照)。VISTAリポジトリ外のファイルであり、Codexのスコープ外。
- Codex実装完了後の**独立レビュー**: ①コードレビュー(`js/app.js`の既存エントリに意図しない差分がないことの確認、`square-formula-slot`の非タップ要素がエラーを起こさないことの確認)、②算数内容レビュー(新規3問の図とラベルの数値整合性、解説の正しさ、ひし形の「対角線が直角に交わり互いを2等分する」という前提の説明が小6の既習事項と整合しているかの確認)、③必要な修正のCodexへの再依頼。
- Evaluatorとしての最終再確認(Playwright結果の独立検証を含む)。

---

## 制約・前提条件

- `index.html`1ファイル構成(HTML/CSS本体)+分割JS/データの既存構成を維持する。
- 答えは整数(小数・分数を避ける)。新規3問の答え(81, 66, 70)はいずれも整数。
- `js/navigation.js`・`data/practice-variant-groups.js`は一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。新規3問は配列末尾に追記するため、既存問題の番号には影響しない。
- 演習一覧(カテゴリ別件数・問題一覧)はフラットなまま変更しない。新規3問は通常の演習問題として一覧の末尾に現れる(カテゴリの問題数表示が30→33に増えるのは意図した挙動)。
- 正方形の「面積から1辺を逆算」(平方根)は小6の学習範囲外として、本スプリントでは実装しない。

## 未解決の仮定

- 新規3問の数値(正方形1辺9cm、長方形たて6cm・よこ11cm、ひし形対角線14cm・10cm)は、答えが整数になり、かつ図形として自然な比率になるようPlannerが選定したものであり、最終的な採否はユーザー確認が望ましい。
- 難易度(正方形・長方形を★1、ひし形を★2)の判断はPlannerの裁量であり、ユーザーが異なる判断(例:3問とも★1、または、ひし形を★3扱いにする等)を希望する場合は実装前に調整する。
- `g6_plane_006`・`g6_plane_007`(複合図形)を、本スプリント後もP-05の`evidence_ids`に残すか(複合図形の前提として引き続き有効)、新規3問のみに絞るかは、coverage-final.mdの既存の記法慣例(他タイプの行が複数の根拠問題を並べている例が多い)に倣い「残す」とした。この判断の最終確認はユーザーに委ねる。
- `square-formula-slot`の「1辺」を`.plane-expand-chip-static`という非タップ要素にする設計は、将来的に正方形の逆算(平方根)を小6範囲外として扱うという前提に基づく。将来この方針が変わった場合(例:中学受験の一部で近似値を使った逆算を扱う等)は、別途ビジュアルの拡張を検討する。
