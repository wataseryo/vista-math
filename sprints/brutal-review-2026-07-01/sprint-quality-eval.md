# Sprint quality 評価レポート

## 判定: PASS

## テスト結果

| テストケース | 結果 | 詳細 |
|------------|------|------|
| DOMContentLoaded で `ans-input` が null でもエラーが発生しない | PASS | 1114行目で変数に受け、1115行目で `if (ansInput)` ガード後に addEventListener |
| DOMContentLoaded で `ch-ans-input` が null でもエラーが発生しない | PASS | 1116行目で変数に受け、1117行目で `if (chAnsInput)` ガード後に addEventListener |
| `pracOpenProb` で catId 不一致時に TypeError が発生せずに終了する | PASS | 302行目で `if (!cat) { console.warn(...); return; }` による早期リターンを確認 |
| `prac-ans-input` リスナーが null チェック付きで登録される | PASS | 345行目で変数に受け、346行目で `if (pracAnsInput)` ガード後に addEventListener |
| `std-prac-ans-input` リスナーが null チェック付きで登録される | PASS | 170行目で変数に受け、171行目で `if (stdAnsInput)` ガード後に addEventListener |
| リスナーが `innerHTML` 書き換え後の新規要素に対して一度だけ付与される | PASS | 両関数ともに body.innerHTML 設定後に getElementById → addEventListener の順序を維持 |

## 発見したバグ・問題

なし。

## コード確認詳細

### バグ 1: DOMContentLoaded null チェック（1114〜1117行目）

```js
const ansInput = document.getElementById('ans-input');
if (ansInput) ansInput.addEventListener('keydown', e => { if(e.key==='Enter') checkAnswer(); });
const chAnsInput = document.getElementById('ch-ans-input');
if (chAnsInput) chAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') chSubmitAnswer(); });
```

仕様書の修正方針「getElementById の戻り値を変数に受け、null でない場合のみ addEventListener を呼ぶ」に完全に準拠している。

### バグ 2: pracOpenProb の cat null 参照（301〜303行目）

```js
const cat = PRACTICE_CATS.find(c => c.id === p.catId);
if (!cat) { console.warn('pracOpenProb: cat not found for', p.catId); return; }
const unitId = appState.grade === 5 ? cat.unitId5 : cat.unitId6;
```

`cat` が falsy な場合は console.warn を出力して即 return するガードが追加されており、TypeError が発生しない構造になっている。

### バグ 3: prac-ans-input / std-prac-ans-input null チェック（346行目・171行目）

```js
// pracOpenProb（346行目）
const pracAnsInput = document.getElementById('prac-ans-input');
if (pracAnsInput) pracAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') pracCheckAnswer(); });

// stdPracOpenProb（170〜171行目）
const stdAnsInput = document.getElementById('std-prac-ans-input');
if (stdAnsInput) stdAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') stdPracCheckAnswer(); });
```

両関数ともに innerHTML 書き換え後に新規要素を取得してリスナーを付与する構造が明確になっており、重複登録のリスクがない。

## Generator へのフィードバック

修正3件すべてが仕様書の要件を満たしている。追加対応は不要。
