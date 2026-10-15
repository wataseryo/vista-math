const PRACTICE_G6_CALC = [
/* ════════════════════════════════════════
   計算・数の処理 演習問題 （grade:6, catId:'pc-calc'）
════════════════════════════════════════ */

/* ── 整数・小数・分数の四則混合 ★1 ── */
{
  id: 'g6_calc_basic_001',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '整数・小数・分数の四則混合', pattern: 'かけ算を含む四則混合の順序',
  title: '小数・分数・整数の混ざった計算',
  difficulty: 1,
  text: '次の計算をしましょう。\n1.2 ＋ 3/4 × 8 － 2.5',
  answer: 4.7, answerType: 'number', answerUnit: '',
  hint: 'かけ算を先に計算してから、左から順にたし算・ひき算をします。',
  solution: `【計算の順序】
かけ算・わり算を先に計算し、そのあとでたし算・ひき算を左から行う。

① 3/4 × 8 ＝ 6

② 1.2 ＋ 6 ＝ 7.2

③ 7.2 － 2.5 ＝ 4.7

【確認】
  3/4 ＝ 0.75 として計算しても 1.2 ＋ 0.75×8 － 2.5 ＝ 1.2＋6－2.5 ＝ 4.7 ✓

答え：4.7`,
  tags: ['計算', '四則混合'],
},

/* ── 約分・通分・帯分数と小数分数の変換 ★1 ── */
{
  id: 'g6_calc_basic_002',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '約分・通分・帯分数と小数分数の変換', pattern: '通分して共通の分母を求める',
  title: '通分の基本',
  difficulty: 1,
  text: '3/4 と 5/6 を通分すると、分母はいくつになりますか。\n（できるだけ小さい数で答えましょう）',
  answer: 12, answerType: 'number', answerUnit: '',
  hint: '4と6の最小公倍数が、通分したときの分母になります。',
  solution: `【通分のしかた】
通分とは分母をそろえて分数を比べやすくすること。分母は2つの数の最小公倍数にする。

① 4の倍数：4, 8, 12, 16…
  6の倍数：6, 12, 18…
  → 最小公倍数は12

② 3/4 ＝ 9/12、5/6 ＝ 10/12
  どちらも分母を12にそろえられる

【確認】
  9/12 を約分すると 9÷3/12÷3 ＝ 3/4 ✓
  10/12 を約分すると 10÷2/12÷2 ＝ 5/6 ✓

答え：12`,
  tags: ['計算', '通分'],
},

/* ── 括弧・計算順序・逆数を使う計算 ★2 ── */
{
  id: 'g6_calc_basic_003',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '括弧・計算順序・逆数を使う計算', pattern: 'かっこと逆数を含む四則混合',
  title: 'かっこと逆数を使う計算',
  difficulty: 2,
  text: '次の計算をしましょう。\n(7－3) × 2 ＋ 4 ÷ 1/2',
  answer: 16, answerType: 'number', answerUnit: '',
  hint: 'かっこの中を先に計算します。÷1/2 は、逆数の2をかけることと同じです。',
  solution: `【計算の順序】
かっこの中 → かけ算・わり算 → たし算・ひき算の順で計算する。わる数が分数のときは逆数をかける。

① かっこの中：7－3＝4

② 4 × 2 ＝ 8

③ 4 ÷ 1/2 ＝ 4 × 2 ＝ 8（1/2の逆数は2）

④ 8 ＋ 8 ＝ 16

【確認】
  ÷1/2 は「2倍すること」と同じなので、4÷1/2＝8 は正しい ✓

答え：16`,
  tags: ['計算', '逆数', 'かっこ'],
},

/* ── 交換・結合・分配を用いる工夫 ★1 ── */
{
  id: 'g6_calc_basic_004',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '交換・結合・分配を用いる工夫', pattern: '計算の順序を工夫して簡単にする',
  title: 'くふうして計算する',
  difficulty: 1,
  text: 'くふうして計算しましょう。\n25 × 13 × 4',
  answer: 1300, answerType: 'number', answerUnit: '',
  hint: '25×4＝100になることを先に使うと、計算が簡単になります。',
  solution: `【くふうのポイント】
かけ算は順番を入れかえても答えは同じ（交換法則・結合法則）。計算しやすい組み合わせを先に計算する。

① 25 × 4 ＝ 100（先に計算すると簡単）

② 100 × 13 ＝ 1300

【確認】
  ふつうの順番で計算しても 25×13＝325、325×4＝1300 ✓ 同じ答えになる

答え：1300`,
  tags: ['計算', 'くふう算'],
},

/* ── □が一つの逆算 ★2 ── */
{
  id: 'g6_calc_basic_005',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '□が一つの逆算', pattern: 'たし引きを含む逆算',
  title: '□を求める逆算',
  difficulty: 2,
  text: '□ × 6 － 9 ＝ 39 のとき、□に当てはまる数を求めましょう。',
  answer: 8, answerType: 'number', answerUnit: '',
  hint: '逆算は式を後ろから戻します。まず＋9をもどし、次に÷6をします。',
  solution: `【逆算のしかた】
式を後ろ側から、ぎゃくの計算で戻していく。－9の逆は＋9、×6の逆は÷6。

① □×6－9＝39
  まず－9を戻す：39＋9＝48
  → □×6＝48

② ×6を戻す：48÷6＝8
  → □＝8

【確認】
  8×6－9＝48－9＝39 ✓

答え：8`,
  tags: ['計算', '逆算'],
},

/* ── 概数・四捨五入・切捨てと元の数の範囲 ★2 ── */
{
  id: 'g6_calc_basic_006',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '概数・四捨五入・切捨てと元の数の範囲', pattern: '四捨五入前の整数の範囲を求める',
  title: '四捨五入する前の数の範囲',
  difficulty: 2,
  text: 'ある整数を四捨五入して十の位までの概数にすると、380になりました。\nこの整数として考えられる中で、いちばん大きい数はいくつですか。',
  answer: 384, answerType: 'number', answerUnit: '',
  hint: '四捨五入して380になる数は、375以上385未満です。',
  solution: `【概数と範囲】
四捨五入して十の位までの概数にしたとき380になる数は、375以上385未満の整数。

① 四捨五入の決まり：一の位が0〜4なら切り捨て、5〜9なら切り上げ

② 380になる範囲：375 ≦ 元の数 ＜ 385

③ この範囲でいちばん大きい整数は384（385は四捨五入すると390になり条件に合わない）

【確認】
  384を四捨五入→一の位4は切り捨て→380 ✓
  385を四捨五入→一の位5は切り上げ→390（条件に合わない）

答え：384`,
  tags: ['計算', '概数', '四捨五入'],
},

/* ── 長さ・重さ・面積・体積・時間の単位換算 ★2 ── */
{
  id: 'g6_calc_basic_007',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '長さ・重さ・面積・体積・時間の単位換算', pattern: '面積の単位換算(m²→cm²)',
  title: '面積の単位換算',
  difficulty: 2,
  text: '2.5m²は何cm²ですか。',
  answer: 25000, answerType: 'number', answerUnit: 'cm²',
  hint: '1m²＝10000cm²（100cm×100cm）です。',
  solution: `【面積の単位換算】
1m＝100cmなので、1m²＝100cm×100cm＝10000cm²

① 2.5m² ＝ 2.5 × 10000cm²

② 2.5 × 10000 ＝ 25000cm²

【確認】
  25000cm² ÷ 10000 ＝ 2.5m² ✓

答え：25000cm²`,
  tags: ['計算', '単位換算', '面積'],
},

/* ── 数の大小・不等号・計算結果の見積り ★1 ── */
{
  id: 'g6_calc_basic_008',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '数の大小・不等号・計算結果の見積り', pattern: '積の見積もり(概数にしてから計算)',
  title: '計算結果の見積もり',
  difficulty: 1,
  text: '198 × 51 を、198はおよそ200に、51はおよそ50に見積もって、答えのおよその大きさを求めましょう。',
  answer: 10000, answerType: 'number', answerUnit: '',
  hint: '198は200に、51は50に近い数になおしてから掛け算をします。',
  solution: `【見積もりのしかた】
正確な計算をする前に、数を概数になおしておよその答えを予想する。

① 198 → およそ200
② 51 → およそ50

③ 200 × 50 ＝ 10000

【確認】
  実際に198×51を計算すると10098になり、見積もりの10000に近い数になる ✓

答え：10000`,
  tags: ['計算', '見積もり', '概数'],
},

/* ── 単位量あたり・単価・密度の基礎 ★1 ── */
{
  id: 'g6_calc_basic_009',
  catId: 'pc-calc', grade: 6, course: 'exam',
  mainCategory: 'calculation', lessonUnit: '単位量あたり・単価・密度の基礎', pattern: '単位面積あたりの量を求める',
  title: '単位量あたりの大きさ',
  difficulty: 1,
  text: '60m²の畑に300kgの肥料をまきます。1m²あたり何kgの肥料をまくことになりますか。',
  answer: 5, answerType: 'number', answerUnit: 'kg',
  hint: '1m²あたりの量 ＝ 全体の量 ÷ 全体の面積',
  solution: `【単位量あたりの考え方】
「1m²あたり」のように、基準となる量1つ分にそろえて比べる。

① 全体の肥料の量：300kg
② 全体の面積：60m²

③ 1m²あたりの量：300 ÷ 60 ＝ 5kg

【確認】
  5kg × 60m² ＝ 300kg ✓

答え：5kg`,
  tags: ['計算', '単位量あたり'],
},

];
