---
created: "2026-11-16"
project: "類題(反復練習) Sprint 2 — 残り2セット（g6_plane_004・g6_plane_005）の追加"
status: draft
sprints_total: 1
---

# 製品仕様書: 類題(反復練習) Sprint 2

## プロダクト概要

Sprint 1（`specs/2026-11-16-practice-repetition-sprint1.md`）で、類題(反復練習)の対応表ファイル・結果画面誘導UI・最初の1セット（基本問題`g6_plane_002`＋類題2問）を実装・検証・コミット・push済み（コミット`71fa473`）。本スプリントは`.company/engineering/sprints/vista/2026-11-16-practice-repetition-structure-discussion/discussion.md`のClaude-Codex合意で予定されていた「残り2セット」を実装する。

対象の基本問題は以下の2問（いずれも実装済み・無変更）:
- `g6_plane_004`（三角形・面積から高さを逆算、`coverage-final.md`タイプ**P-07**の根拠問題の1つ）
- `g6_plane_005`（平行四辺形・面積から高さを逆算、同じく**P-07**の根拠問題の1つ）

Sprint 1で確立した設計をそのまま踏襲する。新しい設計判断・スキーマ変更は本スプリントには含まれない。

## Sprint 1からの前提（本スプリントで変更しないもの）

- 類題は固定IDを持つ通常問題として`data/problems/practice-g6-plane.js`末尾に追加する。既存の26問（オリジナル24問＋Sprint1の`g6_plane_002_v01`/`v02`）は無変更。
- 対応表`data/practice-variant-groups.js`のスキーマ・`scripts/validate-content.cjs`の検証ロジックは**Sprint1で実装済みのものをそのまま使う**。本スプリントはこのファイルに新規グループ2件を追記するだけで、スキーマ・validatorコードの変更は不要（詳細は後述の検証結果を参照）。
- 一覧UI・`navigation.js`は変更しない。
- 既存の「問N」通し番号表示を維持する。
- 結果画面の「同じ考え方でもう1問」誘導は、正解・不正解どちらでも表示し、自動遷移・強制はしない。

## 事前検証：`js/app.js`は本当に変更不要か

ユーザー指示により、「`js/app.js`のロジックは複数グループが存在する前提で書かれているため変更不要」という仮定を実装前に検証した。`js/app.js`の該当コードを確認した結果:

```js
// js/app.js (現行実装、Sprint1で追加済み)
function pracFindVariantGroupIndex(probId) {
    for (const g of PRACTICE_VARIANT_GROUPS) {   // ← 配列件数に依存しない汎用ループ
        const idx = g.problemIds.indexOf(probId);
        if (idx !== -1) return { group: g, idx };
    }
    return null;
}
function pracProblemNumberInCat(probId) {
    const p = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p) return null;
    const probs = PRACTICE_PROBLEMS.filter(q => q.catId === p.catId && q.grade === p.grade && q.course === p.course);
    const idx = probs.findIndex(q => q.id === probId);
    return idx >= 0 ? idx + 1 : null;
}
```

- `pracFindVariantGroupIndex`は`PRACTICE_VARIANT_GROUPS`配列を先頭から走査し、最初に`problemIds`に`probId`を含むグループを返す。グループが1件でも3件でも同じコードで動作し、特定のグループIDをハードコードしている箇所はない。
- `pracOpenProb()`内の呼び出し（`const variantInfo = pracVariantNavInfo(probId);`）も同様に汎用。
- `scripts/validate-content.cjs`の対応表検証ブロックも`for (const g of data.PRACTICE_VARIANT_GROUPS || [])`という汎用ループで、`variantOwner`マップによるグループ横断の重複チェックも件数非依存。
- 実際に`node scripts/validate-content.cjs`を実行し、現行の1グループ構成で`226 problems; 0 errors`であることを確認済み。

**結論: `js/app.js`・`scripts/validate-content.cjs`はコード変更不要。** 本スプリントはデータ（`data/problems/practice-g6-plane.js`への4問追記、`data/practice-variant-groups.js`への2グループ追記）とテストのみの変更で完結する。ただし、Generator/Evaluatorは「変更不要」という結論を鵜呑みにせず、実装後に`node scripts/validate-content.cjs`と`git diff js/app.js`（差分なしを期待）で必ず再確認すること。

## 対象外（今回のスコープに含めないもの）

- 一覧UIのセットカード表示・問題選択UI（Sprint1と同じく不採用のまま）。
- 類題用の独立タブ・トップレベル画面（不採用のまま）。
- `curriculumTypeIds`のP-07以外の値（`coverage-final.md`のP-07行は本スプリントの対象2問を含めすでに根拠問題を持つ「有」であり、更新は必須ではない。詳細は「未解決の仮定」参照）。
- `g6_plane_008`（P-07のもう1つの根拠問題）を基本問題とする追加セット。本スプリントの対象は`g6_plane_004`・`g6_plane_005`の2セットのみ。
- 平面図形の問19〜21の追加レビュー（引き続き後日延期）。

---

## 1. 完了条件リスト

### データ

1. `data/problems/practice-g6-plane.js`の既存26問（オリジナル24問＋Sprint1の`g6_plane_002_v01`/`v02`）は本文・正答・ID・`diagram`・`expandVisualData`を含め一切変更されていない（`git diff`で既存エントリに差分がないことを確認）。特に`g6_plane_004`・`g6_plane_005`（本スプリントの基本問題）は無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_004_v01`・`g6_plane_004_v02`・`g6_plane_005_v01`・`g6_plane_005_v02`の4オブジェクトが追加されている。4IDとも追加前のファイルに存在しないことを`grep -c "id: 'g6_plane_004_v0\|id: 'g6_plane_005_v0" data/problems/practice-g6-plane.js`で追加前に0件だったことを確認した記録が残っている。
3. 新規4問は、三角形2問（`g6_plane_004_v01/v02`）が`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', lessonUnit:'三角形の面積', pattern:'辺の逆算', answerType:'number', answerUnit:'cm'`、平行四辺形2問（`g6_plane_005_v01/v02`）が同様に`lessonUnit:'平行四辺形の面積'`で、`solution`が本仕様5章の内容（4見出し構成・「いつもの説明」口調・《 》式ブロック）に従う。
4. 新規4問の`diagram`（SVG）が、各問題の数値（底辺・面積、高さは「？」で未知表示）と整合する座標・ラベルで実装されている（既存問題のSVGをコピーして数値ラベルだけ書き換えた結果、図形の見た目と数値が食い違っている状態になっていないこと）。
5. `data/practice-variant-groups.js`に新規グループが2件追加される（本仕様3章参照）。Sprint1で定義済みの既存グループ`g6-plane-triangle-area-basic`は内容・順序とも無変更。
6. 3グループ（Sprint1の1件＋本スプリントの2件）の間で`problemIds`が重複していない（同じ問題IDが2つのグループに属さない）ことを`node scripts/validate-content.cjs`で確認する。
7. `index.html`・`js/app.js`・`scripts/validate-content.cjs`・`css/style.css`は変更不要であることを確認する（前掲「事前検証」の結論どおり、実装後に`git diff`で各ファイルの差分が空であることを確認）。万一この前提が崩れる具体的な理由が実装中に見つかった場合は、変更前にClaudeへ報告し本specの前提を見直す。

### 結果画面UI・遷移

8. `g6_plane_004`を開いて解答（正解・不正解いずれも）すると、「同じ考え方でもう1問 / 問{N} {g6_plane_004_v01のタイトル}〈数値を変えた問題〉 / この問題へ→」の案内が表示される。
9. `g6_plane_004_v01`を解答すると、次は`g6_plane_004_v02`への案内が表示される。`g6_plane_004_v02`（このセットの最後）を解答すると、「このセットの最後の問題です。『← 問題一覧』から他の問題も解いてみよう。」の案内が表示され、ボタンはない。
10. `g6_plane_005`→`g6_plane_005_v01`→`g6_plane_005_v02`についても同様の遷移・終了案内が確認できる。
11. 新規4問が一覧末尾に追加されるため、「問N」の番号は現行の26問の続き（27・28・29・30）として表示される。番号は演習一覧・問題詳細タイトルと同じ配列（`PRACTICE_PROBLEMS`を`catId・grade・course`で絞った配列）から算出した実際の通し番号であり、一覧の表示と矛盾しない。
12. 対応表に属さない問題（例: `g6_plane_001`, `g6_plane_003`, `g6_plane_006`等）を開いた場合、`prac-variant-nav`は従来どおり常に非表示のまま。

### 複数グループの非干渉（Sprint1セットとの共存検証）

13. Sprint1のセット（`g6_plane_002`→`v01`→`v02`）の遷移・終了案内・問題番号表示が、本スプリントのデータ追加後も**一切変化していない**（回帰確認。`g6_plane_002`を開いたときの次問案内が引き続き`g6_plane_002_v01`を指し、`g6_plane_004`や`g6_plane_005`の情報を誤って含まない）。
14. `g6_plane_004`を開いたときの案内が`g6_plane_004_v01`のみを指し、他グループ（`g6_plane_002`系・`g6_plane_005`系）の問題IDやタイトルを一切含まない。`g6_plane_005`についても同様。
15. 3グループを連続して操作する統合シナリオ（Sprint1セット→本スプリントの2セットの順に一通り開いて解答）でも、`pracState.answered`・ブラウザ履歴・採点記録が混線しない（あるセットの操作が別セットの状態に影響しない）。
16. `node scripts/validate-content.cjs`実行時、3グループ合計で`problemIds`の重複（同一問題IDが2グループに属する）が検出されない。

### 永続化・履歴の整合性

17. 新規2セットについても、ブラウザの再読込・「戻る」/「進む」を行った際に`prac-variant-nav`の表示状態と内容が正しく復元される（`js/navigation.js`の既存の汎用UI復元機構をそのまま利用し、`navigation.js`に変更を加えない）。
18. 類題への遷移のたびにブラウザ履歴が1件増える（Sprint1と同じ既定の挙動）。

### 採点・学習記録

19. 新規4問いずれについても、同一問題に対して`pracCheckAnswer()`が記録を複数回発生させない（`pracState.answered`ガードが機能する）。類題へ遷移後に「戻る」で元の問題に戻り、解答済みの結果が復元されても、再度記録が増えない。
20. 「3問正解で習得済み」等の新しい判定・セット専用の保存キーは一切追加されていない。

### 検証コマンド

21. `node scripts/validate-content.cjs`が0エラーで終了する。
22. `node --test tests/catalog.test.cjs`・`npm test`が全件passする（問題数アサーションの226→230への更新、対応表の異常系フィクスチャの新規グループ分の追加を含む）。
23. 既存のPlaywright回帰スイート全件（desktop+mobile）が引き続きpassする。Sprint1で追加した`tests/practice-repetition.spec.cjs`の既存3シナリオも全件pass（カテゴリ件数`toHaveCount(26)`→`toHaveCount(30)`への更新を含む）。
24. 本仕様6章の新規Playwrightシナリオが追加され、全件passする。
25. 新規4問の答え（12cm, 9cm, 6cm, 12cm）がClaudeによる別解検算（面積公式への直接代入による逆検算）で確認済みであること。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_004_v01`, `g6_plane_004_v02`, `g6_plane_005_v01`, `g6_plane_005_v02`の4オブジェクトを追記。既存部分は無変更 | 追記 |
| `data/practice-variant-groups.js` | `PRACTICE_VARIANT_GROUPS`配列に新規グループ2件を追記（3章参照）。既存の`g6-plane-triangle-area-basic`は無変更 | 追記 |
| `index.html` | **変更不要**（Sprint1で追加済みのscriptタグがそのまま有効なため） | 変更なし |
| `js/app.js` | **変更不要**（前掲「事前検証」の結論どおり、複数グループ対応の汎用ロジックがSprint1実装時点で既に完成しているため）。実装後に`git diff js/app.js`が空であることを確認する | 変更なし |
| `css/style.css` | **変更不要**（`.prac-variant-nav`系クラスはグループ数に依存しない汎用CSSのため） | 変更なし |
| `scripts/validate-content.cjs` | **変更不要**（対応表検証ブロックは件数非依存の汎用ループのため） | 変更なし |
| `tests/catalog.test.cjs` | ①問題数アサーションを226→230に更新、②新規2グループに対応する異常系フィクスチャテストの追加（例: `g6_plane_004`グループの未知ID・`g6_plane_005`グループとのID重複等）、③3グループ間の重複テストの拡張 | 追記 |
| `tests/practice-repetition.spec.cjs` | ①既存ヘルパー`open()`内の`toHaveCount(26)`を`toHaveCount(30)`に更新、②6章のPlaywrightシナリオ（2セット分＋非干渉シナリオ）を追加 | 追記 |

`data/problems.js`・`data/categories.js`・`js/navigation.js`は変更不要（Sprint1と同じ理由）。

---

## 3. 対応表(`data/practice-variant-groups.js`)への追記内容

スキーマ・validatorロジックはSprint1で確定済みのものをそのまま使う（`specs/2026-11-16-practice-repetition-sprint1.md`3章を参照）。本スプリントは以下の2グループを配列末尾に追記するのみ。

```js
const PRACTICE_VARIANT_GROUPS = [
  {
    id: 'g6-plane-triangle-area-basic',
    grade: 6,
    course: 'exam',
    catId: 'pc-plane',
    curriculumTypeIds: ['P-06'],
    title: '底辺と高さから三角形の面積を求める',
    problemIds: ['g6_plane_002', 'g6_plane_002_v01', 'g6_plane_002_v02'],
  },
  // ↓ 本スプリントで追記する2件
  {
    id: 'g6-plane-triangle-height-inverse',
    grade: 6,
    course: 'exam',
    catId: 'pc-plane',
    curriculumTypeIds: ['P-07'],
    title: '面積と底辺から三角形の高さを求める',
    problemIds: ['g6_plane_004', 'g6_plane_004_v01', 'g6_plane_004_v02'],
  },
  {
    id: 'g6-plane-parallelogram-height-inverse',
    grade: 6,
    course: 'exam',
    catId: 'pc-plane',
    curriculumTypeIds: ['P-07'],
    title: '面積と底辺から平行四辺形の高さを求める',
    problemIds: ['g6_plane_005', 'g6_plane_005_v01', 'g6_plane_005_v02'],
  },
];
```

- `problemIds`の順序は「基本問題→類題1→類題2」の遷移順（先頭=基本問題）。Sprint1と同じ慣習。
- `curriculumTypeIds: ['P-07']`は、`.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`のP-07行（「面積から高さ・底辺などを逆算」、現行ステータス「有」、根拠問題`g6_plane_004, g6_plane_005, g6_plane_008`）に対応する。`g6_plane_004`・`g6_plane_005`自体が既にP-07の根拠問題であるため、本スプリントの2セットがどちらもP-07に属することに矛盾はない。`g6_plane_008`（同じくP-07の根拠問題）は本スプリントの対象外であり、別セットを作るかどうかは別途判断する。
- グループIDはkebab-case、Sprint1の命名規則（`g6-plane-{図形}-{パターン}-{区分}`）を踏襲。

---

## 4. 結果画面UI・遷移ロジック

**コード変更なし。** Sprint1で実装済みの仕組み（`pracFindVariantGroupIndex`・`pracProblemNumberInCat`・`pracOpenNextVariant`・`renderVariantNavHtml`、および`pracOpenProb()`/`pracCheckAnswer()`/`pracRetry()`への既存のフック）が、新しいグループ2件に対してもそのまま正しく機能する設計であることは本spec冒頭の「事前検証」で確認済み。

Generator（Codex）が実装時に行うべき確認:
1. データ追記後、ブラウザで`g6_plane_004`・`g6_plane_005`それぞれを開いて解答し、案内欄の文言・次の問題ID・タイトル・番号が正しいことを目視確認する。
2. Sprint1のセット（`g6_plane_002`系）が退行していないことを確認する。
3. `git diff js/app.js css/style.css scripts/validate-content.cjs index.html`がいずれも空であることを確認し、報告に明記する（空でなかった場合は理由をClaudeに報告し、本specの前提見直しを依頼する）。

---

## 5. 新規問題4問の具体案

### `g6_plane_004`グループ（三角形・面積と底辺から高さを逆算）

基本問題: `g6_plane_004`（面積36cm²・底辺9cm・高さ8cm、実装済み・無変更）。

#### `g6_plane_004_v01`(類題1: 数値を変えた問題、向きは基本問題と同じ)

```js
{
  id: 'g6_plane_004_v01',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '三角形の高さを求める（類題1）',
  text: '面積が42cm²の三角形があります。底辺が7cmのとき、高さは何cmですか？',
  answer: 12,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 三角形の面積は、底辺×高さ÷2。
② 面積42cm²、底辺7cmなので、
《高さ×7÷2＝42》
という式になる。
《③ 高さ＝42×2÷7＝12cm》

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、どの文字について求めたいかを変えても使える。面積と底辺が分かれば高さを、面積と高さが分かれば底辺を、同じしくみで逆算できる。

【確認】
《7×12÷2＝42cm²》
もとの面積と一致する。

答え：12cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 7, height: 12, area: 42 },
  expandAdvice: '次に何かの値を求める問題で詰まったら、まず公式を書き出して「どこが？なのか」を整理してみよう！',
  tags: ['平面図形', '三角形', '逆算'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 7×12＝84、84÷2＝42（面積と一致）。

#### `g6_plane_004_v02`(類題2: 数値と図の向きを変えた問題)

基本問題・類題1は「頂点が上・底辺が下」の向き。類題2は向きを変え（頂点が下・底辺が上）、「向きが変わっても公式の逆算は同じ」という理解を補強する（Sprint1の`g6_plane_002_v02`と同じ狙い）。

```js
{
  id: 'g6_plane_004_v02',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '三角形の高さを求める（類題2・向きを変えた問題）',
  text: '下の図のように、頂点が下を向いている三角形があります。面積が72cm²、底辺が16cmのとき、高さは何cmですか？',
  answer: 9,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く(向きが変わっても公式は同じ)\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【ポイント】
三角形の向きが変わっても、面積の公式(底辺×高さ÷2)を逆向きに使う考え方は同じ。

【解説】
① 図の向きが変わっていても、底辺とそれに垂直な高さの組を見つければよい。底辺は16cm。
② 面積72cm²、底辺16cmなので、
《高さ×16÷2＝72》
という式になる。
《③ 高さ＝72×2÷16＝9cm》

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、三角形をどの向きに置いても変わらない。向きに惑わされず、底辺とそれに垂直な高さの組を見つけることが大切。

【確認】
《16×9÷2＝72cm²》
もとの面積と一致する。

答え：9cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 16, height: 9, area: 72 },
  expandAdvice: '次に何かの値を求める問題で詰まったら、まず公式を書き出して「どこが？なのか」を整理してみよう！',
  tags: ['平面図形', '三角形', '逆算', '向き'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 16×9＝144、144÷2＝72（面積と一致）。

### `g6_plane_005`グループ（平行四辺形・面積と底辺から高さを逆算）

基本問題: `g6_plane_005`（面積60cm²・底辺12cm・高さ5cm、実装済み・無変更）。

#### `g6_plane_005_v01`(類題1: 数値を変えた問題、傾きの向きは基本問題と同じ)

```js
{
  id: 'g6_plane_005_v01',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の高さを求める（類題1）',
  text: '面積が90cm²の平行四辺形があります。底辺が15cmのとき、高さは何cmですか？',
  answer: 6,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く\n高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 平行四辺形の面積は、底辺×高さ。
② 面積90cm²、底辺15cmなので、
《高さ×15＝90》
という式になる。
《③ 高さ＝90÷15＝6cm》

【広げてみよう】
「底辺×高さ＝面積」の公式は、底辺・高さ・面積のうち2つが分かれば残り1つを求められる。三角形の公式(÷2が付く)も同じ考え方で逆算できる。

【確認】
《15×6＝90cm²》
もとの面積と一致する。

答え：6cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 15, height: 6, area: 90 },
  expandAdvice: '底辺や高さを求める問題が出たら、公式のどの文字を求めればいいか、自分で整理するくせをつけよう！',
  tags: ['平面図形', '平行四辺形', '逆算'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 15×6＝90（面積と一致）。

#### `g6_plane_005_v02`(類題2: 数値と傾きの向きを変えた問題)

基本問題・類題1は右肩上がりに傾く形。類題2は傾きの向きを左右反転させ（左肩上がり）、「傾きの向きが変わっても公式の逆算は同じ」という理解を補強する。

```js
{
  id: 'g6_plane_005_v02',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の高さを求める（類題2・向きを変えた問題）',
  text: '下の図のように、傾きの向きが逆になっている平行四辺形があります。面積が96cm²、底辺が8cmのとき、高さは何cmですか？',
  answer: 12,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く(傾きの向きが変わっても公式は同じ)\n高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
平行四辺形の傾きの向きが変わっても、面積の公式(底辺×高さ)を逆向きに使う考え方は同じ。

【解説】
① 図の傾きの向きが変わっていても、底辺とそれに垂直な高さの組を見つければよい。底辺は8cm。
② 面積96cm²、底辺8cmなので、
《高さ×8＝96》
という式になる。
《③ 高さ＝96÷8＝12cm》

【広げてみよう】
「底辺×高さ＝面積」の公式は、平行四辺形がどちら向きに傾いていても変わらない。傾きに惑わされず、底辺とそれに垂直な高さの組を見つけることが大切。

【確認】
《8×12＝96cm²》
もとの面積と一致する。

答え：12cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 8, height: 12, area: 96 },
  expandAdvice: '底辺や高さを求める問題が出たら、公式のどの文字を求めればいいか、自分で整理するくせをつけよう！',
  tags: ['平面図形', '平行四辺形', '逆算', '向き'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 8×12＝96（面積と一致）。

### `expandVisual`ファクトリの使用に関する確認（問題なしの検証結果）

4問はいずれも既存の`js/app.js`内`PLANE_EXPAND_VISUALS`ファクトリ（`triangle-formula-slot`・`parallelogram-formula-slot`、既に`g6_plane_004`・`g6_plane_005`で使用中）をそのまま再利用する。両ファクトリの実装を確認した結果、以下の点で**固定値が残っている問題は見つからなかった**:

- `triangle-formula-slot`・`parallelogram-formula-slot`はいずれも引数`d`（＝`expandVisualData`）の`d.area`・`d.base`・`d.height`のみを使って、高さ/底辺/面積いずれを求める場合の式変形テキストも含めて完全に動的に生成している（`derivations.height`/`derivations.base`/`derivations.area`の各配列のテキストはすべてテンプレートリテラルで`d`の値を埋め込んでおり、ハードコードされた数値は存在しない）。
- したがって、`expandVisualData`に新しい`base`/`height`/`area`の値を設定するだけで、「広げてみよう」のインタラクティブな公式ツールは新しい数値で正しく機能する。コード変更は不要。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールドのSVG自体はCodexが実装する。以下の点を厳守すること。

- **配色・記法**: 三角形2問は既存`g6_plane_004`と同じ配色（塗り`#90CAF9`/枠線`#1565C0`、底辺ラベルの引き出し線・文字色`#1565C0`、高さラベルの引き出し線・文字色`#E53935`）。平行四辺形2問は既存`g6_plane_005`と同じ配色（塗り`#A5D6A7`/枠線`#2E7D32`、底辺ラベル`#1565C0`、高さラベル`#E53935`）。フォントサイズ12px前後、`text-anchor="middle"`、高さラベルは`transform="rotate(-90 ...)"`で縦書き。
- **「逆算」タイプ特有の注意**: 既存`g6_plane_004`/`g6_plane_005`の図は、面積ラベル（例:「面積36cm²」）を図形内に表示し、底辺の数値は実寸表示するが、高さは**「高さ ？」として数値を伏せる**（解答を図から読み取れないようにするため）。新規4問も同様に、底辺の数値は表示し、高さは必ず「？」のままにすること（答えを図に書いてしまう誤りを避ける）。
- **座標の再計算を必須とする**: 既存SVGをコピーして数値ラベルの文字列だけ書き換えるのは禁止。底辺の長さが変わると、三角形・平行四辺形の辺の長さの見た目の比率、目盛り線（引き出し線）の位置、`viewBox`のサイズが連動して変わるべきである。確認したところ、既存の`g6_plane_002`系・`g6_plane_004`・`g6_plane_005`のSVGはいずれも概ね「1cm＝14px」のスケールで座標を算定している（例: `g6_plane_004`の底辺9cm→126px＝9×14、`g6_plane_002_v02`のコメントにも「縮尺14px/cm」の明記あり）。新規4問もこのスケール感を踏襲し、`base`/`height`の値に応じて`polygon`の頂点座標・引き出し線の座標・`viewBox`を必ず再計算すること。
- **向きの指定**:
  - `g6_plane_004_v01`（底辺7cm）は、既存`g6_plane_004`と同じ向き（頂点が上、底辺が下）でよい。
  - `g6_plane_004_v02`（底辺16cm）は、**底辺を上、頂点を下**にした向きで描く。単なる上下反転ではなく、底辺ラベルの引き出し線を上側に、高さの引き出し線・目盛りを図形の形に合わせて再配置すること（Sprint1の`g6_plane_002_v02`と同じ考え方）。
  - `g6_plane_005_v01`（底辺15cm）は、既存`g6_plane_005`と同じ傾きの向き（右肩上がり）でよい。
  - `g6_plane_005_v02`（底辺8cm）は、**傾きの向きを左右反転**（左肩上がり）させて描く。底辺ラベル・高さラベルの引き出し線の位置も、反転した形状に合わせて再配置すること。
- いずれも`role="img"`と`aria-label`（または`title`/`desc`）で図の内容を簡潔に説明する（既存問題の慣例に合わせる）。
- 実装後、Claudeが数値と図の整合性を独立レビューする（7章参照）。

---

## 6. 検証項目(Evaluator向けPlaywrightシナリオ)

既存`tests/practice-repetition.spec.cjs`のヘルパー（`open`, `grade`, `records`, `withinViewport`）パターンに倣い、以下を新規シナリオとして追加する。既存の回帰シナリオ（Sprint1分含む）は無改修で全件passすること（ただし`open()`ヘルパー内の`toHaveCount(26)`は`toHaveCount(30)`に更新が必要）。

1. **`g6_plane_004`グループの遷移**: `g6_plane_004`を開き解答（正解）。「同じ考え方でもう1問 / 問{N} 三角形の高さを求める（類題1）〈数値を変えた問題〉」が表示されることを確認。「この問題へ→」をクリックし、`g6_plane_004_v01`の問題文（面積42cm²、底辺7cm）が開くことを確認。SVGの`viewBox`・`polygon`座標が`g6_plane_004`のものと異なる（再計算されている）ことを確認。同様に解答して`g6_plane_004_v02`へ進み、問題文（頂点が下、面積72cm²、底辺16cm）とSVGが新しい数値・向きに対応していることを確認。
2. **`g6_plane_004`セット末尾の案内**: `g6_plane_004_v02`を解答すると、「このセットの最後の問題です」の趣旨の文言が表示され、「この問題へ→」ボタンが存在しないことを確認。
3. **`g6_plane_005`グループの遷移**: `g6_plane_005`→`g6_plane_005_v01`→`g6_plane_005_v02`について、シナリオ1と同様のパターンで確認（面積90cm²/底辺15cm、面積96cm²/底辺8cm、傾きの向きが反転していること）。
4. **`g6_plane_005`セット末尾の案内**: シナリオ2と同様に`g6_plane_005_v02`で終了案内を確認。
5. **正解・不正解どちらでも表示**: `g6_plane_004`と`g6_plane_005`それぞれに誤答した場合でも、解答確認後に案内欄が表示され、文言が正解時と同一であることを確認。
6. **Sprint1セットとの非干渉（回帰）**: `g6_plane_002`を開いて正解し、案内欄の次問題タイトルが引き続き`g6_plane_002_v01`であり、`g6_plane_004`や`g6_plane_005`関連の文字列を一切含まないことを確認する。
7. **3セット混在時の非干渉**: `g6_plane_002`→（類題経由せず「← 問題一覧」で）`g6_plane_004`→`g6_plane_005`の順に開いて、それぞれ正解した際の案内欄の内容がそれぞれ自分のセットの次問題のみを指すことを確認する（他セットの情報が混入しないこと）。
8. **対応表に属さない問題では出ない**: `g6_plane_004`・`g6_plane_005`以外の平面図形問題（例: `g6_plane_006`）を解答しても、`prac-variant-nav`が非表示のままであることを確認。
9. **ブラウザ「戻る」・「進む」・再読込での復元**: `g6_plane_004`→`g6_plane_004_v01`の遷移後に「戻る」「進む」「再読込」を行い、結果ボックス・案内欄の両方が正しく復元されることを確認（`g6_plane_005`グループについても同様の1シナリオ）。
10. **採点の二重記録防止**: `g6_plane_004`を正解→`records(page)`で記録を取得→案内欄経由で`g6_plane_004_v01`へ遷移→「戻る」で`g6_plane_004`に戻る→再度`records(page)`を取得し、記録件数が増えていないことを確認（`g6_plane_005`グループについても同様の1シナリオ）。
11. **一覧件数・番号の更新確認**: 平面図形カテゴリの一覧件数表示が26問→30問に増えていること、新規4問が「問27」〜「問30」として表示されることを確認する。
12. **モバイルビューポート**: 上記シナリオ1・3を`mobile`プロジェクト（375×812）でも実行し、案内欄とSVGがビューポート内に収まる（`boundingBox`がはみ出さない）ことを確認。

---

## 7. 実装主体の割り振り

VISTAの担当分担ルール（`.company/engineering/CLAUDE.md`「VISTAの担当分担」2026-10-12決定）に従い、Sprint1と同じ分担とする。

### Codexが実装する範囲

- `data/problems/practice-g6-plane.js`: 新規4問（数学的内容はClaudeが確定済みのものをそのまま反映）の追加、特に`diagram`（SVG）の新規設計・実装（5章末の指示に従う）。
- `data/practice-variant-groups.js`: 新規2グループの追記（内容はClaudeが確定済み）。
- `tests/catalog.test.cjs`: 件数アサーション更新、新規2グループに対応する異常系フィクスチャテストの追加。
- `tests/practice-repetition.spec.cjs`: 既存ヘルパーの件数更新、本仕様6章のPlaywrightシナリオの実装。
- 実装後の確認: `index.html`・`js/app.js`・`css/style.css`・`scripts/validate-content.cjs`に意図しない差分が発生していないことの確認（`git diff`）。
- 実ブラウザ（desktop/mobile）での動作確認。
- 自己評価（`sprints/practice-repetition-sprint2/sprint-1-self-eval.md`）の作成。

### Claudeが直接担当する範囲

- 新規問題4問（`g6_plane_004_v01/v02`, `g6_plane_005_v01/v02`）の**数学的内容**: 問題文、数値、答え、ヒント、4見出し構成の解説文、タグ、`expandVisualData`の値（本specに確定済みの内容として提示済み）。
- 上記の正答性の検算（本spec5章に記載済み: 面積公式への直接代入による逆検算）。
- `data/practice-variant-groups.js`の新規2グループ定義内容の確定（`problemIds`の順序、`curriculumTypeIds: ['P-07']`の妥当性 — `coverage-final.md`のP-07行の既存根拠問題と整合することを確認済み）。
- `js/app.js`・`scripts/validate-content.cjs`が複数グループに対して変更不要で正しく動作するという前提の事前検証（本spec冒頭に記載済み）。
- Codex実装完了後の**独立レビュー**: ①コードレビュー（`js/navigation.js`・`js/app.js`・`scripts/validate-content.cjs`に意図しない差分がないことの確認、Sprint1セットが退行していないことの確認）、②算数内容レビュー（新規4問の図とラベルの数値整合性、解説の正しさ、向き反転が正しく表現されているか）、③必要な修正のCodexへの再依頼。
- Evaluatorとしての最終再確認（Playwright結果の独立検証を含む）。

---

## 制約・前提条件

- `index.html`1ファイル構成（HTML/CSS本体）＋分割JS/データの既存構成を維持する。
- 答えは整数（小数・分数を避ける）。新規4問の答え（12, 9, 6, 12）はいずれも整数。
- `js/navigation.js`は一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない。
- 演習一覧（カテゴリ別件数・問題一覧）はフラットなまま変更しない。新規4問は通常の演習問題として一覧の末尾に現れる（カテゴリの問題数表示が26→30に増えるのは意図した挙動）。
- `js/app.js`・`scripts/validate-content.cjs`・`css/style.css`・`index.html`はいずれも変更不要という前提で進めるが、実装中にこの前提が崩れる具体的な理由が見つかった場合は、無断で変更せずClaudeに報告し本specの前提を見直す。

## 未解決の仮定

- `curriculumTypeIds: ['P-07']`は、本spec作成時に`coverage-final.md`を確認して妥当と判断したもの（P-07の根拠問題に`g6_plane_004`・`g6_plane_005`が既に含まれている）。最終的な採否はユーザー確認が望ましい。
- `coverage-final.md`/`coverage-final.json`のP-07行（現在「有」、備考「底辺高さの取り違えを確認」）を本スプリントの成果を理由に更新するかどうかは、完了条件に含めずユーザー判断に委ねる（Sprint1のP-06と同じ扱い）。
- `g6_plane_008`（P-07のもう1つの根拠問題）を基本問題とする追加セットを作るかどうかは本spec・本スプリントの対象外とし、必要であれば別途specを起こす。
- 新規4問の`diagram`のSVGデザイン（座標・向き反転の具体的な見た目）の細部はCodexの裁量とし、本spec5章末の制約（配色・スケール・向き反転の要件・高さを「？」で伏せる）のみを遵守すればよい。
