---
created: "2026-11-16"
project: "類題(反復練習) Sprint 1 — 対応表・結果画面誘導+最初の1セット"
status: draft
sprints_total: 1
---

# 製品仕様書: 類題(反復練習) Sprint 1

## プロダクト概要

VISTAの受験演習(演習問題)に、「同じ考え方の問題をもう1問解く」反復練習の仕組みを導入する。対象ユーザーは個人開発者(渡瀬さん)の子ども(受験算数の学習者)。目的は、1問を解いて終わりにせず、同じ解法パターンを複数の数値で練習することで定着を図ること。ただし強制はせず、「標準的に案内するが強制はしない」という方針(2026-11-16ユーザー最終決定)に従う。

本スプリントは `.company/engineering/sprints/vista/2026-11-16-practice-repetition-structure-discussion/discussion.md` のClaude-Codex合意に基づく、最初の実装スプリントである。合意の骨子:

- 類題は固定IDを持つ通常の演習問題として追加し、演習一覧(フラット)はそのまま変更しない。
- 基本問題と類題の対応関係は新規の対応表ファイルで管理する。
- 誘導は「結果画面(解答後)でのその場の案内」のみとし、一覧のセットカード化・専用タブ化は行わない。
- `navigation.js`(共有履歴エンジン)は一切変更しない。新しい遷移は既存の`window.pracOpenProb(id)`を呼ぶだけで実現する。
- 既存の「問N」通し番号表示は維持し、「練習1・2・3」のような新ラベル体系は導入しない。
- 「3問正解=習得済み」のような判定・セット専用の保存形式は作らない。学習履歴は既存の問題ID単位の記録をそのまま使う。
- **類題は全タイプに追加する方針**(ユーザー最終確認2026-11-16: 「簡単だから飛ばす」は学習者が類題を解く際に強制されないという意味であり、開発側がタイプごとに作成を省略する話ではない)。

Sprint 1の対象セットは1つだけ:基本問題`g6_plane_002`(三角形の面積・底辺×高さ÷2)と、新規の類題2問(`g6_plane_002_v01`, `g6_plane_002_v02`)。残り2セット(`g6_plane_004`, `g6_plane_005`を基本問題とするセット)はSprint 2で扱う(本specの対象外)。

## 対象外(今回のスコープに含めないもの)

- 演習一覧のセットカード表示・問題選択UI(2026-11-16合意により不採用)。
- 既存の3つのexpandVisualファクトリ(`parallelogram-cut`等)の一般化(今回は`triangle-rotate`をそのまま再利用するため不要)。
- 類題用の独立タブ・トップレベル画面(2026-11-16ユーザー最終決定により不採用)。
- `g6_plane_004`・`g6_plane_005`を基本問題とする残り2セット(Sprint 2)。
- `coverage-final.md`/`coverage-final.json`の更新(P-06は既に「有」のため必須ではない。詳細は「未解決の仮定」参照)。
- 平面図形の問19〜21の追加レビュー(ユーザー指示により後日に延期済み、本スプリントとは無関係)。

---

## 1. 完了条件リスト

Evaluatorの合格基準(完了条件達成率100%・クリティカルバグ0件・`node scripts/validate-content.cjs` 0エラー・`npm test`全件pass・既存回帰Playwrightスイート全件pass)に対応する、検証可能な条件。

### データ

1. `data/problems/practice-g6-plane.js`の既存24問(`u6_plane_trial_001`〜`004`, `g6_plane_001`〜`020`)は本文・正答・ID・`diagram`・`expandVisualData`を含め一切変更されていない(`git diff`で既存エントリに差分がないことを確認)。特に`g6_plane_002`は無変更。
2. 同ファイルの末尾に、新規問題`g6_plane_002_v01`・`g6_plane_002_v02`が追加されている。両IDとも追加前のファイルに存在しないことを`grep -c "id: 'g6_plane_002_v0" data/problems/practice-g6-plane.js`で追加前に0件だったことを確認した記録が残っている。
3. 新規2問は`catId:'pc-plane', grade:6, course:'exam', mainCategory:'plane_geometry', answerType:'number', answerUnit:'cm²'`で、`solution`が本仕様5章の内容(4見出し構成・「いつもの説明」口調・《 》式ブロック)に従う。
4. 新規2問の`diagram`(SVG)が、各問題の数値(底辺・高さ)と整合する座標・ラベルで実装されている(既存問題のSVGを流用し数値ラベルだけ書き換えた結果、図形の見た目と数値が食い違っている状態になっていないこと)。
5. 新規ファイル`data/practice-variant-groups.js`が追加され、本仕様3章のスキーマに従うグループが1件定義されている(`problemIds: ['g6_plane_002', 'g6_plane_002_v01', 'g6_plane_002_v02']`、この順序)。
6. `index.html`に`data/practice-variant-groups.js`のscriptタグが、他の`data/problems/*.js`群より後・`data/problems.js`より前(もしくは`data/problems.js`より後でも可。ただし`js/app.js`より必ず前)に1行追加されている。他のscriptタグの並びは変更されていない。

### 結果画面UI・遷移

7. `js/app.js`に新規関数(`pracFindVariantGroupIndex`, `pracProblemNumberInCat`, `pracOpenNextVariant`、および案内欄のHTML生成ロジック)が追加されている。
8. `pracOpenProb()`が生成する`body.innerHTML`内、`<div id="prac-result-box">`の直後に、新規の独立したDOM領域(`id="prac-variant-nav"`)が生成される。問題を開いた時点(未解答時)では`display:none`。
9. 対応表に属さない問題(今回で言えば`g6_plane_002`系3問以外の全問題)を開いた場合、`prac-variant-nav`は常に非表示のまま("次の類題へ"案内は一切出ない)。
10. `g6_plane_002`を開いて正解した場合・不正解だった場合のどちらでも、`pracCheckAnswer()`実行後に`prac-variant-nav`が表示され、「同じ考え方でもう1問 / 問{N} {次の問題のタイトル}〈数値を変えた問題〉 / この問題へ→」の案内とボタンが表示される。Nは演習一覧・問題詳細タイトルと同じ配列(`PRACTICE_PROBLEMS`を`catId・grade・course`で絞った配列)から算出した実際の通し番号であり、既存の「問N」表示と矛盾しない。
11. `g6_plane_002_v01`を開いて解答した場合も同様に、次の類題(`g6_plane_002_v02`)への案内が表示される。
12. `g6_plane_002_v02`(セット内最後の問題)を開いて解答した場合は、「このセットの最後の問題です。『← 問題一覧』から他の問題も解いてみよう。」という趣旨の案内が表示され、ボタンは表示されない。自動遷移はしない。
13. 案内欄の「この問題へ→」ボタンを押すと`pracOpenNextVariant(nextId)`が呼ばれ、内部で`window.pracOpenProb(nextId)`(既存の履歴ラッパー済み関数)のみを呼ぶ形で次の問題へ遷移する。`js/navigation.js`は一切変更しない(`git diff js/navigation.js`が空であることを確認)。
14. `pracRetry()`(もう一度解くボタン)実行時、`prac-result-box`と同様に`prac-variant-nav`も非表示に戻る。
15. 既存の一覧順「次の問題」ボタン(`pracNextProblem`, `prac-next-prob-btn`)の挙動・表示条件は変更されていない。「次の類題へ」とは完全に独立した導線として共存する。

### 永続化・履歴の整合性(navigation.js非変更の検証)

16. ブラウザの再読込・「戻る」/「進む」を行っても、`prac-variant-nav`の表示状態(表示/非表示)と内容が正しく復元される。これは`js/navigation.js`の既存の汎用UI復元機構(`captureUI`/`restoreUI`、id付き要素の`display`を汎用的に保存・復元する既存ロジック)をそのまま利用し、`navigation.js`に新規コードを追加せずに実現されている。
17. 類題への遷移(「この問題へ→」クリック)のたびにブラウザ履歴が1件増える(「戻る」は直前に開いていた問題へ戻る)。これは2026-11-16合意で仕様として受け入れ済みの挙動であり、バグではない。

### 採点・学習記録

18. 同一問題に対して`pracCheckAnswer()`が記録(`recordProblemAttempt`・`recordAnswer`)を複数回発生させないこと(既存の`pracState.answered`ガードが本スプリントの変更後も変わらず機能する)。類題へ遷移後に「戻る」で元の問題に戻り、解答済みの結果が復元されても、再度記録が増えないこと。
19. 「3問正解で習得済み」等の新しい判定・セット専用の保存キーは一切追加されていない。学習記録は既存の問題ID単位の記録(`vista_stats`, `vista_history`等)のみを使う。

### 検証コマンド

20. `node scripts/validate-content.cjs`が0エラーで終了する(本仕様3章の対応表検証ロジックを含む)。
21. `node --test tests/catalog.test.cjs`・`npm test`が全件passする(問題数アサーションの224→226への更新を含む)。
22. 既存のPlaywright回帰スイート全件(desktop+mobile、`npm run test:e2e`相当)が引き続きpassする。
23. 本仕様6章の新規Playwrightシナリオが追加され、全件passする。
24. 新規2問の答え(63cm², 44cm²)がClaudeによる別解検算(平行四辺形変換による検算)で確認済みであること。

---

## 2. 変更対象ファイルと変更内容の概要

| ファイル | 変更内容 | 種別 |
|---|---|---|
| `data/problems/practice-g6-plane.js` | 末尾に`g6_plane_002_v01`, `g6_plane_002_v02`の2オブジェクトを追記。既存部分は無変更 | 追記 |
| `data/practice-variant-groups.js` | 新規作成。`PRACTICE_VARIANT_GROUPS`配列を1件定義(3章参照) | 新規 |
| `index.html` | `<script src="data/practice-variant-groups.js"></script>`を1行追加 | 追記 |
| `js/app.js` | ①`pracOpenProb()`の`body.innerHTML`テンプレートに`prac-variant-nav`のdiv追加、②`pracCheckAnswer()`の正解・不正解両分岐末尾に表示切替処理を追加、③`pracRetry()`に非表示処理を1行追加、④新規関数`pracFindVariantGroupIndex`・`pracProblemNumberInCat`・`pracOpenNextVariant`・案内HTML生成関数を追加 | 追記(既存関数の構造は変更しない) |
| `css/style.css` | (任意)`prac-variant-nav`用の新規クラス。既存の`.prac-topic-link`系のトーン(カード型、`var(--exam-primary)`系の配色)を踏襲しつつ、`prac-result-box`の緑/赤と混同しない配色にする | 追記 |
| `scripts/validate-content.cjs` | `PRACTICE_VARIANT_GROUPS`を`vm.runInContext`の取得対象に追加し、対応表の検証ブロックを新規追加(3章参照) | 追記 |
| `tests/catalog.test.cjs` | ①問題数アサーションを224→226に更新、②対応表の異常系フィクスチャテストを既存パターン(`for(const [name,from,to,reason] of [...])`)に倣って追加(例:未知のproblemId、catId不一致、グループ間でのID重複) | 追記 |
| `tests/*.spec.cjs`(新規 or `navigation.spec.cjs`へ追記) | 6章のPlaywrightシナリオを追加。既存`navigation.spec.cjs`のヘルパー(`openPractice`, `records`)パターンに倣う | 新規/追記 |

`data/problems.js`・`data/categories.js`は変更不要(対応表は独立ファイルであり、`PRACTICE_PROBLEMS`への集約も不要なため)。

---

## 3. 対応表(`data/practice-variant-groups.js`)の正式なデータ構造定義

### ファイル形式

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
];
```

(他の分割データファイルと同様、`index.html`で`js/app.js`より前にscriptタグを追加するだけで、集約ファイル`data/problems.js`への追記は不要。このファイルは`PRACTICE_PROBLEMS`に合流させず、独立したグローバル配列として参照する。)

### フィールド定義

| フィールド | 型 | 必須/任意 | 説明 |
|---|---|---|---|
| `id` | string | 必須 | グループの一意ID。kebab-case推奨(例: `g6-plane-triangle-area-basic`)。問題IDの命名規則とは別の名前空間。 |
| `grade` | number(5\|6) | 必須 | 対象学年。 |
| `course` | string(`'exam'`\|`'std'`) | 必須 | 対象コース。Sprint1では`'exam'`のみ使用。 |
| `catId` | string | `course==='exam'`のとき必須 | `PRACTICE_CATS`に実在するID。 |
| `chapterId` | string | `course==='std'`のとき必須(Sprint1では未使用。将来の標準演習への拡張用に予約) | `STANDARD_CHAPTERS_G5/G6`に実在するID。 |
| `curriculumTypeIds` | string[] | 任意(空配列可) | `.company/research/topics/vista-grade6-curriculum-2026-10-14/coverage-final.md`のタイプID(例:`P-06`)。VISTAリポジトリ外のファイルなので実在チェックはせず、`/^[A-Z]-\d{2}$/`形式のみ検証する。**注意**: 当初の議論メモの例(`['P-04']`)は誤り。`g6_plane_002`(三角形の面積・公式適用)に対応するのは`P-06`「三角形・平行四辺形・台形の面積」であり、`P-04`は「合同・線対称・点対称」で無関係。本スプリントでは`P-06`を使う。 |
| `title` | string | 必須 | 人間向けのセット名(UIには表示しない。保守用のラベル)。 |
| `problemIds` | string[] | 必須、2件以上 | セットを構成する問題IDの配列。**配列の順序が遷移順**。慣習として先頭(index 0)を基本問題、以降を類題とする。 |

### `scripts/validate-content.cjs`での検証項目

既存の`vm.runInContext('({PRACTICE_PROBLEMS,CHALLENGES,CATEGORIES,PRACTICE_CATS,EXAM_UNITS_G5,EXAM_UNITS_G6,STANDARD_CHAPTERS_G5,STANDARD_CHAPTERS_G6})', context)`の取得対象に`PRACTICE_VARIANT_GROUPS`を追加する。これにより、既存の汎用ループ(`for (const [name, list] of Object.entries(data).filter(...))`)が自動的に「グループIDの一意性・重複なし」チェックを行う(他の`CATEGORIES`等と同じ扱いになるため、追加コード不要)。

これに加えて、新規の検証ブロックを追加する(疑似コード、Codexの実装詳細は自由):

```js
const pcats = new Set(data.PRACTICE_CATS.map(x => x.id)); // 既存変数を再利用
const variantOwner = new Map(); // problemId -> groupId（1問題=最大1グループの検証用）
for (const g of data.PRACTICE_VARIANT_GROUPS || []) {
  const file = 'data/practice-variant-groups.js';
  const check = (ok, reason) => { if (!ok) fail(file, g.id, reason); };
  check(typeof g.title === 'string' && g.title.trim().length > 0, 'missing title');
  check([5, 6].includes(g.grade), 'invalid grade');
  check(['std', 'exam'].includes(g.course), 'invalid course');
  if (g.course === 'exam') check(pcats.has(g.catId), 'unknown catId');
  if (g.course === 'std') check((g.grade === 5 ? data.STANDARD_CHAPTERS_G5 : data.STANDARD_CHAPTERS_G6).some(c => c.id === g.chapterId), 'unknown chapterId');
  check(Array.isArray(g.curriculumTypeIds) && g.curriculumTypeIds.every(t => /^[A-Z]-\d{2}$/.test(t)), 'invalid curriculumTypeIds format');
  check(Array.isArray(g.problemIds) && g.problemIds.length >= 2, 'problemIds must contain at least 2 entries');
  const seenInGroup = new Set();
  for (const pid of g.problemIds || []) {
    check(!seenInGroup.has(pid), `duplicate problemId in group: ${pid}`); seenInGroup.add(pid);
    const p = data.PRACTICE_PROBLEMS.find(x => x.id === pid);
    check(!!p, `unknown problemId: ${pid}`);
    if (p) {
      check(p.grade === g.grade, `problemId ${pid} grade mismatch with group`);
      check(p.course === g.course, `problemId ${pid} course mismatch with group`);
      if (g.course === 'exam') check(p.catId === g.catId, `problemId ${pid} catId mismatch with group`);
      if (variantOwner.has(pid)) fail(file, g.id, `problemId ${pid} already belongs to group ${variantOwner.get(pid)}`);
      else variantOwner.set(pid, g.id);
    }
  }
}
```

検証項目まとめ(ユーザー指定分への対応):
- グループID一意性 → 既存の汎用ループで自動チェック。
- メンバーID実在確認 → `data.PRACTICE_PROBLEMS.find(...)`で確認、未知IDは`fail`。
- 同学年/コース/カテゴリ検証 → `p.grade === g.grade`等で確認。
- 未知ID拒否 → 上記と同じ。
- (追加)1問題=最大1グループという設計上の不変条件 → `variantOwner`マップで重複所属を検出。
- (追加)`curriculumTypeIds`の形式検証(実在確認は対象外、VISTAリポジトリ外のファイルのため)。

`tests/catalog.test.cjs`には、既存の異常系フィクスチャパターンに倣い、少なくとも以下を追加する: 未知のproblemId、catId不一致、グループ間でのID重複(同じproblemIdを2つ目のグループに入れる)の3パターン。

---

## 4. 結果画面UI・遷移ロジックの詳細仕様

### 設計上のポイント(なぜこの形にするか)

`js/navigation.js`の`captureUI`/`restoreUI`は、**id属性を持つ要素なら内容に関わらず`display`等のインラインスタイルを汎用的に保存・復元する**。一方で、要素の**innerHTML(文字列の中身)**を復元するのは、正誤結果ボックス用に正規表現でハードコードされた`id`(`prac-result-box`等)に限られる(`prac-variant-nav`はこのリストに入れない=`navigation.js`を変更しない)。

したがって、案内欄の**文面・ボタンは「問題を開いた瞬間」(`pracOpenProb()`実行時)に確定して埋め込み、解答後は`display`の切り替えだけを行う**設計にする。これにより:
- `pracCheckAnswer()`は内容を組み立て直す必要がなく、`display`を`block`にするだけでよい。
- ブラウザの戻る/進む/再読込時、`navigation.js`はいつも通り`pracOpenProb(prob.id)`を呼んでから`pracState.answered`を復元する。`pracOpenProb()`が呼ばれた時点で案内欄の中身は必ず正しく再構築され、その後の汎用`restoreUI()`が`display`だけを正しい状態(表示/非表示)に戻す。`navigation.js`に一切手を入れずに正しく動作する。

### `pracOpenProb(probId)`への変更

1. 関数冒頭付近(`currentIdx`計算の近く)で、新規の純粋関数を呼ぶ:
   ```js
   const variantInfo = pracVariantNavInfo(probId); // 後述
   ```
2. `body.innerHTML`のテンプレート文字列内、既存の
   ```html
   <div id="prac-result-box" style="display:none;...">...</div>
   ```
   の直後に、新しいdivを追加する:
   ```html
   <div id="prac-variant-nav" class="prac-variant-nav" style="display:none">${renderVariantNavHtml(variantInfo)}</div>
   ```
   - `variantInfo`が`null`(対応表に属さない問題)の場合、`renderVariantNavHtml`は空文字列`''`を返す。この場合、後述の`pracCheckAnswer()`は`display`を`block`にしない(中身が空のまま表示状態にしない)。

### 新規の純粋関数(DOM非依存、テストしやすい形にする)

```js
// probId が属する対応表グループと、その中での位置を返す。属さなければ null。
function pracFindVariantGroupIndex(probId) {
    for (const g of PRACTICE_VARIANT_GROUPS) {
        const idx = g.problemIds.indexOf(probId);
        if (idx !== -1) return { group: g, idx };
    }
    return null;
}

// 演習一覧・問題詳細タイトルと同じ基準(catId・grade・course で絞った配列の位置)で「問N」の N を算出する。
// 既存の pracOpenProb 内のインライン計算と同じロジック（既存コードはそのまま、ここでは新規ヘルパーとして切り出す）。
function pracProblemNumberInCat(probId) {
    const p = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p) return null;
    const probs = PRACTICE_PROBLEMS.filter(q => q.catId === p.catId && q.grade === p.grade && q.course === p.course);
    const idx = probs.findIndex(q => q.id === probId);
    return idx >= 0 ? idx + 1 : null;
}

// variantInfo を案内欄のHTMLに変換する。
function pracVariantNavInfo(probId) {
    return pracFindVariantGroupIndex(probId);
}
function renderVariantNavHtml(info) {
    if (!info) return '';
    const { group, idx } = info;
    const nextId = group.problemIds[idx + 1];
    if (nextId) {
        const nextP = PRACTICE_PROBLEMS.find(x => x.id === nextId);
        const num = pracProblemNumberInCat(nextId);
        const isBase = nextId === group.problemIds[0];
        const suffix = isBase ? '' : '〈数値を変えた問題〉';
        return `
            <div class="prac-variant-nav-label">同じ考え方でもう1問</div>
            <div class="prac-variant-nav-title">問${num} ${escapeHtml(nextP.title)}${suffix}</div>
            <button class="prac-variant-nav-btn" onclick="pracOpenNextVariant('${nextId}')">この問題へ →</button>`;
    }
    return `<div class="prac-variant-nav-label">このセットの最後の問題です。</div>
            <div class="prac-variant-nav-sub">「← 問題一覧」から他の問題も解いてみよう。</div>`;
}

// クリックハンドラ。既存の履歴ラッパー済み window.pracOpenProb を呼ぶだけ。navigation.js には触れない。
function pracOpenNextVariant(nextId) {
    window.pracOpenProb(nextId);
}
```

(上記はCodexが実装する際の設計意図を明確にするための参考実装であり、変数名・実装の細部はCodexの裁量とする。ただし「`pracOpenNextVariant`は`window.pracOpenProb`を呼ぶだけ」という制約と、「案内欄の中身は問題を開いた時点で確定する」という設計方針は厳守する。)

### `pracCheckAnswer()`への変更

正解分岐・不正解分岐それぞれの末尾(`recordProblemAttempt`等の記録処理の後)に、共通処理として以下を追加する:

```js
const nav = document.getElementById('prac-variant-nav');
if (nav && nav.innerHTML.trim()) nav.style.display = 'block';
```

正解・不正解どちらの分岐にも同じ1行を入れる(discussion合意の「正解・不正解どちらでも表示する」を満たす)。

### `pracRetry()`への変更

```js
function pracRetry() {
    pracState.answered = false;
    const inp = document.getElementById('prac-ans-input');
    if (inp) { inp.value = ''; inp.className = 'prac-ans-input'; inp.focus(); }
    const rb = document.getElementById('prac-result-box');
    if (rb) rb.style.display = 'none';
    const nav = document.getElementById('prac-variant-nav'); // 追加
    if (nav) nav.style.display = 'none';                     // 追加
}
```

### 表示内容まとめ

| 状況 | 表示 |
|---|---|
| 対応表に属さない問題を解答 | `prac-variant-nav`は常に非表示 |
| 対応表に属し、次の問題がある(正解) | 「同じ考え方でもう1問 / 問{N} {タイトル}〈数値を変えた問題〉 / この問題へ→」 |
| 同上(不正解・解答表示後) | 同上(正誤で文面は変えない) |
| セット末尾の問題を解答 | 「このセットの最後の問題です。『← 問題一覧』から他の問題も解いてみよう。」(ボタンなし) |
| 「もう一度解く」クリック後 | 再び非表示に戻る(次に解答するまで出ない) |

### 既存「一覧順・次の問題」ボタンとの関係

`prac-next-prob-btn`(`pracNextProblem()`)は画面上部のヘッダー領域にある静的ボタンで、今回のdiv(`prac-detail-body`内、結果ボックス直後)とは画面上の位置もロジックも完全に独立している。両者は改修せず共存させる。

---

## 5. 新規問題2問の具体案

いずれも`g6_plane_002`(底辺10cm・高さ8cm・面積40cm²)の類題。数値を変え、2問目はさらに図の向きも変える。

### `g6_plane_002_v01`(類題1: 数値を変えた問題)

```js
{
  id: 'g6_plane_002_v01',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '三角形の面積（類題1）',
  text: '底辺14cm、高さ9cmの三角形の面積を求めなさい。',
  answer: 63,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【ポイント】
三角形の面積は、底辺×高さ÷2で求められる。

【解説】
① 底辺は14cm、高さは9cm。
② 三角形の面積は、底辺×高さ÷2なので、14×9÷2を計算する。
《③ 14×9÷2＝63cm²》

【広げてみよう】
同じ三角形をもう1つ180°回転させて組み合わせると、底辺・高さが同じ平行四辺形になる。三角形の面積が÷2になるのは、平行四辺形をちょうど半分に分けた形だから。

【確認】
《14×9＝126(組み合わせた平行四辺形の面積)、126÷2＝63》
もとの三角形の面積と一致する。

答え：63cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 14, height: 9, area: 63 },
  expandAdvice: '次は三角形を見たときに、「2つ合わせたら平行四辺形になるな」とイメージできるようにしよう！',
  tags: ['平面図形', '三角形'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 14×9＝126, 126÷2＝63。別解(平行四辺形化): 底辺14cm×高さ9cm＝126cm²(組み合わせた平行四辺形)÷2＝63cm²で一致。

### `g6_plane_002_v02`(類題2: 数値と図の向きを変えた問題)

図の向き(底辺が上・頂点が下)を変えることで、「三角形の面積の公式は向きが変わっても同じ」という理解を補強する。

```js
{
  id: 'g6_plane_002_v02',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '三角形の面積（類題2・向きを変えた問題）',
  text: '下の図のように、頂点が下を向いている、底辺11cm、高さ8cmの三角形の面積を求めなさい。',
  answer: 44,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2(向きが変わっても公式は同じ)',
  solution: `【ポイント】
三角形の面積は、向きがどうであっても底辺×高さ÷2で求められる。

【解説】
① 底辺は11cm、高さは8cm。図の向きが変わっていても、底辺と、それに垂直な高さの組を見つければよい。
② 三角形の面積は、底辺×高さ÷2なので、11×8÷2を計算する。
《③ 11×8÷2＝44cm²》

【広げてみよう】
三角形をどの向きに置いても、面積の公式(底辺×高さ÷2)は変わらない。向きに惑わされず、底辺とそれに垂直な高さの組を見つけることが大切。

【確認】
《11×8＝88(組み合わせた平行四辺形の面積)、88÷2＝44》
もとの三角形の面積と一致する。

答え：44cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 11, height: 8, area: 44 },
  expandAdvice: '次は三角形を見たときに、「2つ合わせたら平行四辺形になるな」とイメージできるようにしよう！',
  tags: ['平面図形', '三角形', '向き'],
  diagram: { /* Codexが実装。本章末の指示を参照 */ },
}
```

検算: 11×8＝88, 88÷2＝44。別解: 平行四辺形化で88cm²÷2＝44cm²で一致。

いずれも`tags`・`hint`・`expandAdvice`は既存の三角形面積問題(`g6_plane_002`等)と表現を揃え、「いつもの説明」口調(語りかけなし、プレーンな言い切り)・《 》式ブロック(`docs/content-authoring.md`準拠)に従っている。`expandVisual:'triangle-rotate'`は既存の`PLANE_EXPAND_VISUALS['triangle-rotate']`ファクトリ(`js/app.js`)をそのまま再利用でき、`expandVisualData`の数値を変えるだけで「広げてみよう」の回転アニメーションが正しく機能する(ファクトリはテンプレート内で`d.base`/`d.height`/`d.area`を参照するのみで、問題固有のコード追加は不要)。

### `diagram`(SVG)実装についての指示(Codex向け)

`diagram`フィールドのSVG自体はCodexが実装する。以下の点を厳守すること。

- 配色・記法は既存の`g6_plane_001`〜`003`のSVGと揃える: 三角形の塗り`#90CAF9`/枠線`#1565C0`、底辺ラベルの引き出し線・文字色`#1565C0`、高さラベルの引き出し線・文字色`#E53935`、フォントサイズ12px前後、`text-anchor="middle"`、高さラベルは`transform="rotate(-90 ...)"`で縦書き。
- **既存SVGをコピーして数値ラベルの文字列だけ書き換えるのは禁止**。底辺・高さの数値が変わると、三角形の辺の長さの見た目の比率、目盛り線(引き出し線)の位置、`viewBox`のサイズが連動して変わるべきであり、座標を再計算せずにラベルの文字だけ変えると「図は旧数値のまま、ラベルだけ新数値」という不整合が起きる。新しい`base`/`height`の値に応じて`polygon`の頂点座標・引き出し線の座標・`viewBox`を必ず再計算すること。
- `g6_plane_002_v01`(底辺14cm・高さ9cm)は、既存問題と同じ向き(頂点が上、底辺が下)でよい。縮尺は正確な比例でなくてよいが、見た目が極端に潰れたり引き伸ばされたりしないよう、底辺:高さ ≒ 14:9 の比率感を保つ。
- `g6_plane_002_v02`(底辺11cm・高さ8cm)は、**底辺を上、頂点を下**にした向きで描く。単に`g6_plane_002`のSVGを上下反転させるのではなく、底辺ラベルの引き出し線を上側に、高さの引き出し線・目盛りを図形の形に合わせて再配置すること(「向きを変える」ことが問題文の意図であるため、図が実際に向きを変えて見える必要がある)。
- どちらも`role="img"`と`aria-label`(または`title`/`desc`)で図の内容を簡潔に説明する(既存問題の慣例に合わせる)。
- 実装後、Claudeが数値と図の整合性を独立レビューする(7章参照)。

---

## 6. 検証項目(Evaluator向けPlaywrightシナリオ)

既存`tests/navigation.spec.cjs`のヘルパー(`start`, `openPractice`, `records`)のパターンに倣い、以下を新規シナリオとして追加する。既存の回帰シナリオ(`navigation.spec.cjs`, `storage-ui.spec.cjs`, `learning-extras.spec.cjs`, `plane-angle-interaction.spec.cjs`等)は無改修で全件passすること。

1. **基本→類題1→類題2の遷移**: 演習問題→平面図形カテゴリ→`g6_plane_002`を開き正解。「同じ考え方でもう1問」案内が表示され、タイトルに次の問題番号と「〈数値を変えた問題〉」が含まれることを確認。「この問題へ→」をクリックし、`g6_plane_002_v01`の問題文(底辺14cm、高さ9cm)が開くことを確認。同様に正解して次へ進み、`g6_plane_002_v02`(底辺11cm、高さ8cm、向きを変えた問題文)が開くことを確認。
2. **セット末尾の案内**: `g6_plane_002_v02`を解答すると、「このセットの最後の問題です」の趣旨の文言が表示され、「この問題へ→」ボタンが存在しないことを確認。
3. **正解・不正解どちらでも表示**: `g6_plane_002`に誤答した場合でも(「解答を確認する」操作後も)、案内欄が表示されることを確認。誤答・正答のどちらでも文言が同じであることを確認。
4. **対応表に属さない問題では出ない**: `g6_plane_002`以外の平面図形問題(例: `g6_plane_001`)を解答しても、`prac-variant-nav`が非表示のままであることを確認。
5. **ブラウザ「戻る」での復元**: `g6_plane_002`を正解→案内欄クリックで`g6_plane_002_v01`へ遷移→ブラウザの「戻る」操作で`g6_plane_002`に戻り、結果ボックス(正解表示)と案内欄(「同じ考え方でもう1問」)の両方が復元されることを確認。
6. **再読込での復元**: 上記と同じ状態で`page.reload()`し、結果ボックス・案内欄ともに復元されることを確認(既存`navigation.spec.cjs`の「graded result survives... refresh」テストと同じパターン)。
7. **「進む」での復元**: 「戻る」の後に「進む」(`page.goForward()`)を行い、`g6_plane_002_v01`の画面・結果・案内欄が正しく復元されることを確認。
8. **採点の二重記録防止**: `g6_plane_002`を正解→`records(page)`で記録を取得→案内欄経由で`g6_plane_002_v01`へ遷移→「戻る」で`g6_plane_002`に戻る→再度`records(page)`を取得し、`g6_plane_002`分の記録件数が増えていないことを確認(既存`navigation.spec.cjs`の「without duplicate grading」テストと同じ比較パターンをこのシナリオ用に拡張)。
9. **もう一度解くボタン**: 解答後に案内欄が表示された状態で「もう一度解く」をクリックし、案内欄が非表示に戻ることを確認。
10. **既存問題・他カテゴリへの影響なし**: 平面図形以外のカテゴリ(例: 割合・比)の演習問題を1問開いて解答し、従来通りの挙動(結果ボックスのみ表示、`prac-variant-nav`要素が存在しても常に非表示)であることを確認。あわせて`node scripts/validate-content.cjs`実行結果の問題数が26問増(全体)であることと、平面図形カテゴリの一覧件数表示が24問→26問に増えている(意図した挙動であり不具合ではない)ことを確認する。
11. **モバイルビューポート**: 上記1・2のシナリオを`mobile`プロジェクト(375×812)でも実行し、案内欄がビューポート内に収まる(`boundingBox`がはみ出さない)ことを確認。

---

## 7. 実装主体の割り振り

VISTAの担当分担ルール(`.company/engineering/CLAUDE.md`「VISTAの担当分担」2026-10-12決定: Codex=ビジュアルの設計・実装・ブラウザでの動作確認、Claude=算数の説明・問題と正解の整合性・変更コードの独立レビュー)および、今回ユーザーから明示された「diagramのSVGは実装時にCodexが作る」という指示に従い、以下のように分担する。

### Codexが実装する範囲

- `js/app.js`: `prac-variant-nav`のDOM生成、`pracOpenProb()`/`pracCheckAnswer()`/`pracRetry()`への変更、新規関数(`pracFindVariantGroupIndex`, `pracProblemNumberInCat`, `pracOpenNextVariant`, 案内HTML生成)の実装。
- `data/practice-variant-groups.js`: 3章のスキーマに従ったファイルの新規作成(中身のグループ定義は Claude が確定した内容をそのまま反映)。
- `index.html`: scriptタグの追加。
- `css/style.css`: 案内欄の見た目(任意、既存トーンに準拠)。
- `scripts/validate-content.cjs`: 対応表の検証ロジック追加。
- `tests/catalog.test.cjs`: 件数アサーション更新、異常系フィクスチャテストの追加。
- `g6_plane_002_v01`・`g6_plane_002_v02`の`diagram`(SVG)の実装(5章末の指示に従う)。
- 本仕様6章のPlaywrightシナリオの実装、実ブラウザ(desktop/mobile)での動作確認。
- 自己評価(`sprints/practice-repetition-sprint1/sprint-1-self-eval.md`)の作成。

### Claudeが直接担当する範囲

- 新規問題2問(`g6_plane_002_v01`, `g6_plane_002_v02`)の**数学的内容**: 問題文、数値、答え、ヒント、4見出し構成の解説文、タグ、`expandVisualData`の値(5章に確定済みの内容として提示)。
- 上記の正答性の別解検算(5章に記載済み: 平行四辺形変換による検算)。
- `data/practice-variant-groups.js`のグループ定義内容の確定(どの3問をどの順で並べるか、`curriculumTypeIds`の妥当性 — 本spec作成時点で議論メモの`P-04`が誤りであることを指摘し`P-06`に訂正済み)。
- Codex実装完了後の**独立レビュー**: ①コードレビュー(`js/navigation.js`に差分がないことの確認、`pracState.answered`ガードが壊れていないことの確認、対応表検証ロジックの網羅性確認)、②算数内容レビュー(新規2問の図とラベルの数値整合性、解説の正しさ)、③必要な修正のCodexへの再依頼。
- Evaluatorとしての最終再確認(Playwright結果の独立検証を含む、`.company/engineering/CLAUDE.md`の「EvaluatorはGeneratorの自己評価を鵜呑みにせず独立に再検証する」方針に従う)。

---

## 制約・前提条件

- `index.html`1ファイル構成(HTML/CSS本体)+分割JS/データの既存構成を維持する。
- 答えは整数(小数・分数を避ける)。新規2問の答え(63, 44)はいずれも整数。
- `js/navigation.js`は一切変更しない。
- 既存の「問N」通し番号表示ロジックは変更しない(新規ヘルパー関数は既存のインライン計算と同じ基準で再実装するのみ)。
- 演習一覧(カテゴリ別件数・問題一覧)はフラットなまま変更しない。新規2問は通常の演習問題として一覧の末尾に現れる(カテゴリの問題数表示が24→26に増えるのは意図した挙動)。

## 未解決の仮定

- `curriculumTypeIds: ['P-06']`は、本spec作成時にCoverage-final.mdを確認して妥当と判断したものだが、最終的な採否はユーザー確認が望ましい(当初の議論メモ案`P-04`からの訂正である旨、ユーザーへの報告時に明示する)。
- `coverage-final.md`/`coverage-final.json`のP-06行(現在「有」、備考に「数値・条件を変えた2問目は未追加」などの記載があるかはP-02等の他行の書き方を踏襲する前提)を、本スプリントの成果(数値を変えた2問目の追加)を理由に更新するかどうかは、完了条件に含めずユーザー判断に委ねる。
- Sprint 2(`g6_plane_004`・`g6_plane_005`を基本問題とする残り2セット)の対応表エントリ・新規問題は本specの対象外とし、別途specを起こす。
- 案内欄のCSSデザイン(配色・余白等)の細部はCodexの裁量とし、既存の`prac-result-box`(緑/赤)・`prac-topic-link`(カード型)と視覚的に混同しないことのみを制約とする。
