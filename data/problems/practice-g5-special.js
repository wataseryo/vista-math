const PRACTICE_G5_SPECIAL = [
/* ────────────────────────────────────────
   特殊算・文章題 演習問題（grade:5）
   catId:'pc-special'  mainCategory:'word_problems'
──────────────────────────────────────── */
{
  id: 'g5_wp_sumdiff_001',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '2つの数の和と差から大きい方を求める',
  title: '2つの数を求める（和差算 入門）',
  difficulty: 1,
  text: '2つの整数の和は30、差は6です。\n\n大きい方の数を求めなさい。',
  answer: 18, answerType: 'number', unit: '',
  hint: '大きい方 ＝ （和 ＋ 差） ÷ 2 ＝ （30 ＋ 6） ÷ 2',
  solution: `大きい方 ＝ （30 ＋ 6） ÷ 2 ＝ 36 ÷ 2 ＝ 18
小さい方 ＝ 30 − 18 ＝ 12
確認：18＋12＝30 ✓、18−12＝6 ✓

答え：18`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_sumdiff_002',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '枚数の和と差から多い方を求める',
  title: 'シールの枚数（和差算）',
  difficulty: 2,
  text: 'AとBのシールの枚数の合計は50枚です。\nAはBより10枚多い。\n\nAのシールは何枚ですか？',
  answer: 30, answerType: 'number', unit: '枚',
  hint: 'A ＝ （50 ＋ 10） ÷ 2',
  solution: `A ＝ （50 ＋ 10） ÷ 2 ＝ 30枚
B ＝ 50 − 30 ＝ 20枚
確認：30＋20＝50 ✓、30−20＝10 ✓

答え：30枚`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_crane_001',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '2種類の個数から片方を求める（入門）',
  title: '鶴と亀の足（つるかめ算 入門）',
  difficulty: 1,
  text: '鶴と亀が合わせて6匹います。\n足の合計は18本です。\n\n鶴は何匹いますか？',
  answer: 3, answerType: 'number', unit: '匹',
  hint: '全部亀（4本脚）なら 4×6＝24本。\n実際との差：24−18＝6本。\n亀を鶴に変えると1匹2本減る → 6÷2＝3匹',
  solution: `全部亀なら：4 × 6 ＝ 24本
差：24 − 18 ＝ 6本
鶴の数：6 ÷ 2 ＝ 3匹

確認：3×2＋3×4 ＝ 6＋12 ＝ 18本 ✓

答え：3匹`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_crane_002',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '硬貨の枚数と金額（入門）',
  title: '50円玉と10円玉（つるかめ算）',
  difficulty: 2,
  text: '50円硬貨と10円硬貨が合わせて12枚あります。\n合計金額は400円です。\n\n50円硬貨は何枚ですか？',
  answer: 7, answerType: 'number', unit: '枚',
  hint: '全部10円なら 10×12＝120円。\n差：400−120＝280円。\n10円を50円に変えると1枚40円増える。\n280÷40＝7枚',
  solution: `全部10円なら：10 × 12 ＝ 120円
差：400 − 120 ＝ 280円
50円硬貨：280 ÷ 40 ＝ 7枚

確認：50×7＋10×5 ＝ 350＋50 ＝ 400円 ✓

答え：7枚`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_surplus_001',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '余りと不足から人数を求める（入門）',
  title: '消しゴムを配る（過不足算 入門）',
  difficulty: 2,
  text: '生徒に消しゴムを配ります。\n1人2個ずつ配ると4個余り、\n1人3個ずつ配ると2個足りません。\n\n生徒は何人いますか？',
  answer: 6, answerType: 'number', unit: '人',
  hint: '人数 ＝ （余り ＋ 不足） ÷ （1人分の差）\n     ＝ （4 ＋ 2） ÷ （3 − 2）',
  solution: `人数 ＝ （4 ＋ 2） ÷ （3 − 2）
     ＝ 6 ÷ 1 ＝ 6人

消しゴム：2×6＋4 ＝ 16個
確認：3×6 ＝ 18 > 16、差 ＝ 2個 ✓

答え：6人`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_surplus_002',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '余りと不足から「全体の個数」を求める',
  title: 'りんごの総数を求める（過不足算）',
  difficulty: 3,
  text: 'りんごを何人かに配ります。\n1人6個ずつ配ると4個余り、\n1人7個ずつ配ると1個足りません。\n\nりんごは全部で何個ですか？',
  answer: 34, answerType: 'number', unit: '個',
  hint: 'まず人数を求めよう。\n人数 ＝ （4 ＋ 1） ÷ （7 − 6） ＝ 5人\nりんごの数 ＝ 6 × 5 ＋ 4',
  solution: `【人数を求める】
人数 ＝ （4 ＋ 1） ÷ （7 − 6）
     ＝ 5 ÷ 1 ＝ 5人

【りんごの総数を求める】
りんご ＝ 6 × 5 ＋ 4 ＝ 34個

確認：7 × 5 ＝ 35 > 34、差 ＝ 1個 ✓

答え：34個`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_tree_001',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '両端あり・間隔から本数（入門）',
  title: '道に木を植える（植木算 入門）',
  difficulty: 1,
  text: '20mの道の片側に、端から端まで4mおきに木を植えます。\n\n木は何本必要ですか？',
  answer: 6, answerType: 'number', unit: '本',
  hint: '両端に植えるとき：本数 ＝ 道の長さ ÷ 間隔 ＋ 1',
  solution: `本数 ＝ 20 ÷ 4 ＋ 1 ＝ 5 ＋ 1 ＝ 6本

答え：6本`,
  tags: ['特殊算・文章題', '植木算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_tree_002',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '円形・本数から周の長さを逆算する',
  title: '池の周りの長さを求める（植木算）',
  difficulty: 2,
  text: '池の周りに3mおきに木を15本植えました。\n\n池の周りの長さは何mですか？',
  answer: 45, answerType: 'number', unit: 'm',
  hint: '池のまわり（輪の形）では\n最後の木と最初の木の間も1つの「間隔」になる！\n間隔の数 ＝ 木の本数 ＝ 15か所\n周の長さ ＝ 3 × 15',
  solution: `【円形植木算のポイント】
池や広場のまわりは「輪の形」。
最後の木と最初の木の間にも間隔がある。

→ 間隔の数 ＝ 木の本数 ＝ 15か所

道の場合（両端あり）：間隔の数 ＝ 木の本数 − 1
円形の場合：        間隔の数 ＝ 木の本数（同じ！）

周の長さ ＝ 間隔 × 間隔の数
         ＝ 3 × 15
         ＝ 45m

答え：45m`,
  tags: ['特殊算・文章題', '植木算', '円形'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_age_001',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '何年後に何倍になるか（入門）',
  title: '何年後に3倍になるか（年齢算 入門）',
  difficulty: 2,
  text: '現在、父は33歳、子は3歳です。\n\n何年後に父の年齢が子の年齢の3倍になりますか？',
  answer: 12, answerType: 'number', unit: '年後',
  hint: 'x年後：33+x ＝ 3×（3+x）\n33+x ＝ 9+3x → 24 ＝ 2x',
  solution: `x年後とする。
33＋x ＝ 3（3＋x）
33＋x ＝ 9＋3x
24 ＝ 2x
x ＝ 12年後

確認：父45歳、子15歳 → 45 ＝ 3×15 ✓

答え：12年後`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u5-special',
},

{
  id: 'g5_wp_age_002',
  catId: 'pc-special', grade: 5, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '何年前に何倍だったか',
  title: '何年前に2倍だったか（年齢算）',
  difficulty: 3,
  text: '現在、兄は16歳、弟は10歳です。\n\n何年前に兄の年齢が弟の年齢のちょうど2倍でしたか？',
  answer: 4, answerType: 'number', unit: '年前',
  hint: 'x年前：（16−x）＝ 2×（10−x）\n16−x ＝ 20−2x → x ＝ 4',
  solution: `x年前とする。
16−x ＝ 2（10−x）
16−x ＝ 20−2x
x ＝ 4年前

確認：兄12歳、弟6歳 → 12 ＝ 2×6 ✓

答え：4年前`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u5-special',
},
];
