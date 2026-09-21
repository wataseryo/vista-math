const PRACTICE_G6_RATIO = [
/* ════════════════════════════════════════
   割合・比 演習問題 （grade:6, catId:'pc-ratio'）
════════════════════════════════════════ */

/* ── 割合の基本 ★1 ── */
{
  id: 'g6_ratio_basic_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '割合の基本', pattern: '割合を求める',
  title: '割合を求める（基本）',
  difficulty: 1,
  text: 'クラス60人のうち、24人が眼鏡をかけています。\n眼鏡をかけている人は、クラス全体の何%ですか？',
  answer: 40, answerType: 'number', unit: '%',
  hint: '割合 ＝ 比べる量 ÷ もとにする量\n「比べる量」は眼鏡をかけている人数、\n「もとにする量」はクラス全体の人数です。',
  solution: `【割合の公式】
  割合(%) ＝ 比べる量 ÷ もとにする量 × 100

① 比べる量（眼鏡をかけている人）：24人
② もとにする量（クラス全体）：60人

③ 式を立てる
  24 ÷ 60 ＝ 0.4

④ %に直す
  0.4 × 100 ＝ 40%

【確認】
  60人 × 40% ＝ 60 × 0.4 ＝ 24人 ✓

答え：40%`,
  tags: ['割合の基本', '割合'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 割合の基本 ★2 ── */
{
  id: 'g6_ratio_basic_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '割合の基本', pattern: 'もとの量を求める',
  title: 'もとの量を求める',
  difficulty: 2,
  text: 'あるクラスの女子の人数はクラス全体の40%で、女子は20人です。\nクラス全体の人数は何人ですか？',
  answer: 50, answerType: 'number', unit: '人',
  hint: 'もとにする量 ＝ 比べる量 ÷ 割合\n40%を小数に直してから割り算します。',
  solution: `【もとの量を求める公式】
  もとにする量 ＝ 比べる量 ÷ 割合

① 比べる量（女子の人数）：20人
② 割合（女子の割合）：40% ＝ 0.4

③ 式を立てる
  20 ÷ 0.4 ＝ 50人

【確認】
  50人 × 0.4 ＝ 20人（女子の人数） ✓

答え：50人`,
  tags: ['割合の基本', 'もとの量'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 割合の基本 ★3 ── */
{
  id: 'g6_ratio_basic_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '割合の基本', pattern: '2段階の割合変化',
  title: '2段階の割合変化',
  difficulty: 3,
  text: 'ある商品の値段を最初に20%上げてから、その後10%下げました。\nもとの値段に対して、最終的な値段は何%になりますか？',
  answer: 108, answerType: 'number', unit: '%',
  hint: '最初の値段を100%として計算します。\n「20%上げる」→ × 1.2\n「10%下げる」→ × 0.9\n2つをかけ算します。',
  solution: `【ポイント】
  もとの値段を 100% として計算する

① 20%上げる ＝ もとの 1.2倍
  100% × 1.2 ＝ 120%

② そこから10%下げる ＝ 120% の 0.9倍
  120% × 0.9 ＝ 108%

【注意】
  20%上げてから10%引くと、20%−10%＝10%増ではありません。
  「10%引き」は上がった後の金額に対してかかるためです。

答え：108%`,
  tags: ['割合の基本', '割合変化', '2段階'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 比の基本 ★1 ── */
{
  id: 'g6_ratio_ratio_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '比の基本', pattern: '比から片方の量を求める',
  title: '比から量を求める',
  difficulty: 1,
  text: '赤いリボンと青いリボンの長さの比は 3:2 です。\n赤いリボンが 60cm のとき、青いリボンは何cm ですか？',
  answer: 40, answerType: 'number', unit: 'cm',
  hint: '比の「1の値」を求めましょう。\n赤が3にあたるとき、60cm ÷ 3 で 1 の値が出ます。',
  solution: `【比から量を求める方法】

① 比の「1の値」を求める
  赤：青 ＝ 3：2 → 赤が 3 にあたる
  60cm ÷ 3 ＝ 20cm（1にあたる量）

② 青の長さを求める
  20cm × 2 ＝ 40cm

【確認】
  赤：青 ＝ 60：40 ＝ 3：2 ✓

答え：40cm`,
  tags: ['比の基本', '比'], visualTypes: ['ratioBar'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 比の基本 ★2 ── */
{
  id: 'g6_ratio_ratio_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '比の基本', pattern: '比で分ける（配分）',
  title: '比で分ける',
  difficulty: 2,
  text: '3000円を兄と弟で 5:3 に分けます。\n兄の取り分は何円ですか？',
  answer: 1875, answerType: 'number', unit: '円',
  hint: '全体の比の合計（5＋3）を求めてから、\n1 にあたる量を計算しましょう。',
  solution: `【配分の方法】

① 全体の比の合計
  5 ＋ 3 ＝ 8

② 1 にあたる量
  3000 ÷ 8 ＝ 375円

③ 兄の取り分
  375 × 5 ＝ 1875円

【確認】
  弟の取り分：375 × 3 ＝ 1125円
  合計：1875 ＋ 1125 ＝ 3000円 ✓

答え：1875円`,
  tags: ['比の基本', '比', '配分'], visualTypes: ['ratioBar'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 比の基本 ★3 ── */
{
  id: 'g6_ratio_ratio_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '比の基本', pattern: '連比から量を求める',
  title: '連比の問題',
  difficulty: 3,
  text: 'A と B の比は 3:4、B と C の比は 2:3 です。\nA＋B＋C の合計が 130 のとき、A はいくつですか？',
  answer: 30, answerType: 'number', unit: '',
  hint: 'B を共通の数にそろえて A:B:C を1つの比にまとめます。\nB は「4と2の最小公倍数」にそろえましょう。',
  solution: `【連比のそろえ方】

① A:B ＝ 3:4、B:C ＝ 2:3
  B を共通にする → 最小公倍数は 8

② A:B ＝ 3:4 ＝ 6:8
  B:C ＝ 2:3 ＝ 8:12

③ A:B:C ＝ 6:8:12 ＝ 3:4:6

④ 合計の比 ＝ 3＋4＋6 ＝ 13
  A＋B＋C ＝ 130 → 1にあたる量：130 ÷ 13 ＝ 10

⑤ A ＝ 10 × 3 ＝ 30

答え：30`,
  tags: ['比の基本', '比', '連比'], visualTypes: ['ratioBar'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 売買損益 ★1 ── */
{
  id: 'g6_ratio_profit_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '売買損益', pattern: '定価を求める',
  title: '定価を求める',
  difficulty: 1,
  text: '原価 800円の商品に、原価の 25% の利益を上乗せして定価をつけました。\n定価は何円ですか？',
  answer: 1000, answerType: 'number', unit: '円',
  hint: '定価 ＝ 原価 × (1 ＋ 利益率)\n25%の利益 → 原価の 1.25倍',
  solution: `【定価の公式】
  定価 ＝ 原価 × (1 ＋ 利益の割合)

① 利益の割合：25% ＝ 0.25
② 定価 ＝ 原価 × 1.25
  800 × 1.25 ＝ 1000円

【確認】
  利益：1000 − 800 ＝ 200円
  200 ÷ 800 × 100 ＝ 25% ✓

答え：1000円`,
  tags: ['売買損益', '定価'], visualTypes: ['priceFlow'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 売買損益 ★2 ── */
{
  id: 'g6_ratio_profit_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '売買損益', pattern: '割引後の売値を求める',
  title: '割引後の売値',
  difficulty: 2,
  text: '定価 1200円の商品を 15% 引きで売りました。\n売値は何円ですか？',
  answer: 1020, answerType: 'number', unit: '円',
  hint: '15%引き ＝ 定価の (100−15)% ＝ 85% で売る\n1200 × 0.85 ＝ ?',
  solution: `【割引の計算】
  売値 ＝ 定価 × (1 − 値引きの割合)

① 15%引き → 定価の 85%（＝ 1 − 0.15）で売る

② 売値 ＝ 1200 × 0.85 ＝ 1020円

【確認】
  値引き額：1200 × 0.15 ＝ 180円
  1200 − 180 ＝ 1020円 ✓

答え：1020円`,
  tags: ['売買損益', '割引'], visualTypes: ['priceFlow'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 売買損益 ★2 ── */
{
  id: 'g6_ratio_profit_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '売買損益', pattern: '2段階後の利益を求める',
  title: '2段階売買の利益',
  difficulty: 2,
  text: '原価 500円の商品に 40% の利益を上乗せして定価をつけ、\nその定価の 10% 引きで売りました。\n利益は何円ですか？',
  answer: 130, answerType: 'number', unit: '円',
  hint: '①定価を求める  ②売値を求める  ③利益 ＝ 売値 − 原価',
  solution: `【2段階の計算】

① 定価を求める
  500 × 1.4 ＝ 700円

② 売値を求める（定価の10%引き）
  700 × 0.9 ＝ 630円

③ 利益を求める
  630 − 500 ＝ 130円

答え：130円`,
  tags: ['売買損益', '2段階', '利益'], visualTypes: ['priceFlow'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 売買損益 ★3 ── */
{
  id: 'g6_ratio_profit_extra_004',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '売買損益', pattern: '原価を逆算する',
  title: '原価を求める',
  difficulty: 3,
  text: 'ある商品に定価をつけ、定価の 20% 引きで売ったところ、\n原価より 150円 多く売れました。\n定価は原価の 1.5倍 です。\n原価はいくらですか？',
  answer: 750, answerType: 'number', unit: '円',
  hint: '原価を□円として式を立てます。\n定価 ＝ □ × 1.5\n売値 ＝ 定価 × 0.8\n売値 ＝ 原価 ＋ 150',
  solution: `【原価を□として式を立てる】

原価 ＝ □円 とする

① 定価 ＝ □ × 1.5

② 売値 ＝ 定価 × 0.8 ＝ □ × 1.5 × 0.8 ＝ □ × 1.2

③ 利益の条件：売値 ＝ 原価 ＋ 150
  □ × 1.2 ＝ □ ＋ 150
  □ × 0.2 ＝ 150
  □ ＝ 150 ÷ 0.2 ＝ 750円

【確認】
  定価：750 × 1.5 ＝ 1125円
  売値：1125 × 0.8 ＝ 900円
  利益：900 − 750 ＝ 150円 ✓

答え：750円`,
  tags: ['売買損益', '原価', '逆算'], visualTypes: ['priceFlow', 'barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 食塩水 ★2 ── */
{
  id: 'g6_ratio_salt_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '食塩水', pattern: '塩の量を求める',
  title: '食塩水に含まれる塩の量',
  difficulty: 2,
  text: '15%の食塩水 300g に含まれる塩の量は何gですか？',
  answer: 45, answerType: 'number', unit: 'g',
  hint: '塩の量 ＝ 食塩水の量 × 濃度（%を小数に直す）\n15% → 0.15',
  solution: `【公式】
  塩の量 ＝ 食塩水の量 × 濃度

① 濃度：15% ＝ 0.15
② 塩の量 ＝ 300 × 0.15 ＝ 45g

【確認】
  45 ÷ 300 × 100 ＝ 15% ✓

答え：45g`,
  tags: ['食塩水', '割合'], visualTypes: ['beaker'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 食塩水 ★2 ── */
{
  id: 'g6_ratio_salt_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '食塩水', pattern: '2種類を混ぜる（濃度を求める）',
  title: '食塩水を混ぜる（濃度）',
  difficulty: 2,
  text: '8%の食塩水 150g と 2%の食塩水 350g を混ぜました。\n混ぜた後の濃度は何%ですか？',
  answer: 3.8, answerType: 'number', unit: '%',
  hint: '①それぞれの塩の量を求める\n②塩の合計 ÷ 食塩水の合計 × 100',
  solution: `【手順】

① それぞれの塩の量を求める
  8%食塩水150g → 150 × 0.08 ＝ 12g
  2%食塩水350g → 350 × 0.02 ＝ 7g

② 合計する
  塩：12 ＋ 7 ＝ 19g
  食塩水：150 ＋ 350 ＝ 500g

③ 濃度を求める
  19 ÷ 500 × 100 ＝ 3.8%

答え：3.8%`,
  tags: ['食塩水', '混合'], visualTypes: ['beaker', 'balance'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 食塩水 ★3 ── */
{
  id: 'g6_ratio_salt_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '食塩水', pattern: '水を加えて薄める',
  title: '水を加えて薄める',
  difficulty: 3,
  text: '20%の食塩水 100g に水を加えて、5%の食塩水を作ります。\n水を何g加えればよいですか？',
  answer: 300, answerType: 'number', unit: 'g',
  hint: '塩の量は変わりません。\n「塩の量 ÷ 全体 ＝ 5%」として全体を求め、\nそこから水の量を出します。',
  solution: `【ポイント：水を加えても塩の量は変わらない】

① もとの塩の量を求める
  100 × 0.20 ＝ 20g

② 5%にするときの全体の量を求める
  塩の量 ÷ 全体 ＝ 濃度
  20 ÷ 全体 ＝ 0.05
  全体 ＝ 20 ÷ 0.05 ＝ 400g

③ 加える水の量を求める
  400 − 100 ＝ 300g

【確認】
  20 ÷ 400 × 100 ＝ 5% ✓

答え：300g`,
  tags: ['食塩水', '希釈'], visualTypes: ['beaker'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 食塩水 ★3 ── */
{
  id: 'g6_ratio_salt_extra_004',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '食塩水', pattern: '2種類を混ぜて目標量を作る',
  title: '2種類を混ぜて目標量を作る',
  difficulty: 3,
  text: '12%の食塩水と 4%の食塩水を混ぜて、\n8%の食塩水を 500g 作りたいです。\n12%の食塩水は何g必要ですか？',
  answer: 250, answerType: 'number', unit: 'g',
  hint: '12%の食塩水を□g とおいて式を立てます。\n塩の量が等しいという条件を使います。',
  solution: `【式を立てる】

12%食塩水を □g とすると
4%食塩水は (500 − □)g

① 塩の量の合計 ＝ 混ぜた後の塩の量
  □ × 0.12 ＋ (500 − □) × 0.04 ＝ 500 × 0.08

② 式を解く
  0.12□ ＋ 20 − 0.04□ ＝ 40
  0.08□ ＝ 20
  □ ＝ 250g

【確認】
  塩：250 × 0.12 ＋ 250 × 0.04 ＝ 30 ＋ 10 ＝ 40g
  濃度：40 ÷ 500 × 100 ＝ 8% ✓

答え：250g`,
  tags: ['食塩水', '混合', '目標量'], visualTypes: ['beaker', 'balance'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 相当算・倍数算 ★2 ── */
{
  id: 'g6_ratio_equivalent_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '相当算・倍数算', pattern: '全体の量を求める（相当算）',
  title: '相当算の基本',
  difficulty: 2,
  text: 'ある数の 30% は 60 です。\nある数はいくつですか？',
  answer: 200, answerType: 'number', unit: '',
  hint: 'もとにする量 ＝ 比べる量 ÷ 割合\n30% を小数に直して計算します。',
  solution: `【相当算の公式】
  もとの量 ＝ 部分の量 ÷ 割合

① 30% ＝ 0.30
② もとの量 ＝ 60 ÷ 0.30 ＝ 200

【確認】
  200 × 0.30 ＝ 60 ✓

答え：200`,
  tags: ['相当算', '倍数算', '割合'], visualTypes: ['lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 相当算・倍数算 ★3 ── */
{
  id: 'g6_ratio_equivalent_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '相当算・倍数算', pattern: '比の差からもとの量を求める',
  title: '比の差から求める',
  difficulty: 3,
  text: '姉と妹のお金の比は 5:3 です。\n姉は妹より 600円 多く持っています。\n姉のお金はいくらですか？',
  answer: 1500, answerType: 'number', unit: '円',
  hint: '比の差（5−3＝2）が 600円 にあたります。\n比の「1」にあたる金額を求めてから姉の金額を出します。',
  solution: `【比の差を使う方法】

① 比の差を求める
  5 − 3 ＝ 2 → この「2」が 600円 にあたる

② 比の「1」にあたる金額
  600 ÷ 2 ＝ 300円

③ 姉のお金
  300 × 5 ＝ 1500円

【確認】
  妹のお金：300 × 3 ＝ 900円
  差：1500 − 900 ＝ 600円 ✓

答え：1500円`,
  tags: ['相当算', '比', '倍数算'], visualTypes: ['lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 相当算・倍数算 ★4 ── */
{
  id: 'g6_ratio_equivalent_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '相当算・倍数算', pattern: '年齢算（将来の比）',
  title: '年齢算',
  difficulty: 4,
  text: '現在、父の年齢は子の年齢の 4倍 です。\n12年後には父の年齢が子の年齢の 2倍 になります。\n現在の子の年齢は何歳ですか？',
  answer: 6, answerType: 'number', unit: '歳',
  hint: '現在の子の年齢を□歳とおきます。\n父は□×4歳。12年後の関係式を作ります。',
  solution: `【方程式を立てる】

子の現在の年齢 ＝ □歳 とする

① 現在：父 ＝ □×4（歳）

② 12年後：父 ＝ □×4＋12、子 ＝ □＋12
  12年後に父は子の2倍 → □×4＋12 ＝ 2×(□＋12)

③ 式を解く
  4□ ＋ 12 ＝ 2□ ＋ 24
  2□ ＝ 12
  □ ＝ 6

【確認】
  現在：父 24歳、子 6歳（4倍）✓
  12年後：父 36歳、子 18歳（2倍）✓

答え：6歳`,
  tags: ['年齢算', '倍数算', '相当算'], visualTypes: ['lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 仕事算 ★3 ── */
{
  id: 'g6_ratio_work_extra_001',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '仕事算・ニュートン算', pattern: '仕事算（2人で協力）',
  title: '仕事算の基本',
  difficulty: 3,
  text: 'ある仕事を A 一人でやると 10日、\nB 一人でやると 15日かかります。\nA と B の 2人で一緒にやると何日で終わりますか？',
  answer: 6, answerType: 'number', unit: '日',
  hint: '全体の仕事量を「1」として、\n1日にできる量（仕事の速さ）を分数で表します。',
  solution: `【仕事算の考え方】
  全体の仕事量を「1」とする

① 1日の仕事量
  A：1日で 1/10 の仕事
  B：1日で 1/15 の仕事

② 2人合わせた1日の仕事量
  1/10 ＋ 1/15 ＝ 3/30 ＋ 2/30 ＝ 5/30 ＝ 1/6

③ 全体 ÷ 速さ ＝ 日数
  1 ÷ 1/6 ＝ 6日

答え：6日`,
  tags: ['仕事算', '割合'], visualTypes: ['workBar', 'lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── 仕事算 ★4 ── */
{
  id: 'g6_ratio_work_extra_002',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '仕事算・ニュートン算', pattern: '3人の仕事算（逆算）',
  title: '3人の仕事算',
  difficulty: 4,
  text: 'ある仕事を A・B・C の 3人でやると 6日かかります。\nA と B の 2人でやると 10日、\nB と C の 2人でやると 12日 かかります。\nA 一人でやると何日かかりますか？',
  answer: 12, answerType: 'number', unit: '日',
  hint: '全体を1として1日の仕事量を求めます。\nA＋B＋C、A＋B、B＋C がわかれば C と A を求められます。',
  solution: `【手順】
  全体の仕事量を「1」とする

① 1日の仕事量
  A＋B＋C：1/6
  A＋B：1/10
  B＋C：1/12

② C の1日量 ＝ (A＋B＋C) − (A＋B)
  1/6 − 1/10 ＝ 5/30 − 3/30 ＝ 2/30 ＝ 1/15

③ A の1日量 ＝ (A＋B＋C) − (B＋C)
  1/6 − 1/12 ＝ 2/12 − 1/12 ＝ 1/12

④ A 一人の日数
  1 ÷ 1/12 ＝ 12日

答え：12日`,
  tags: ['仕事算', '割合', '逆算'], visualTypes: ['workBar', 'lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},

/* ── ニュートン算 ★4 ── */
{
  id: 'g6_ratio_work_extra_003',
  catId: 'pc-ratio', grade: 6, course: 'exam',
  mainCategory: 'ratio', lessonUnit: '仕事算・ニュートン算', pattern: 'ニュートン算（牧草）',
  title: 'ニュートン算',
  difficulty: 4,
  text: '牧場に牧草があり、毎日一定量の草が生えています。\n48頭の牛が食べると 8日 で食べ尽くし、\n36頭の牛が食べると 12日 で食べ尽くします。\n24頭の牛が食べると、何日で食べ尽くしますか？',
  answer: 24, answerType: 'number', unit: '日',
  hint: '牛1頭が1日に食べる草の量を「1」として、\n最初の草量と毎日生える量を求めます。\n2つの条件から連立方程式を作ります。',
  solution: `【ニュートン算の立て方】
  牛1頭が1日食べる量 ＝ 1 とする

① 条件を式にする
  最初の草量を S、毎日生える量を r とする

  48頭・8日：S ＋ 8r ＝ 48×8 ＝ 384
  36頭・12日：S ＋ 12r ＝ 36×12 ＝ 432

② 2式の差から r を求める
  4r ＝ 432 − 384 ＝ 48
  r ＝ 12（毎日12の草が生える）

③ S を求める
  S ＝ 384 − 8×12 ＝ 384 − 96 ＝ 288

④ 24頭のとき（t日とする）
  S ＋ tr ＝ 24t
  288 ＋ 12t ＝ 24t
  288 ＝ 12t
  t ＝ 24日

答え：24日`,
  tags: ['ニュートン算', '仕事算', '割合'], visualTypes: ['workBar', 'lineDiagram'], isRandomGenerated: false,
  topicUnitId: 'u6-ratio',
},
];
