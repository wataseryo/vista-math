const PRACTICE_G6_SPECIAL = [
/* ────────────────────────────────────────
   特殊算・文章題 演習問題（grade:6）
   catId:'pc-special'  mainCategory:'word_problems'
──────────────────────────────────────── */

/* ── 和差算 5問 ── */
{
  id: 'g6_wp_sumdiff_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '2つの数の和と差から求める',
  title: '2つの数を求める（和差算 基本）',
  difficulty: 1,
  text: '2つの整数の和は54、差は16です。\n\n大きい方の数を求めなさい。',
  answer: 35, answerType: 'number', answerUnit: '',
  hint: '和と差が出てきたら和差算！\n（和＋差）÷2 ＝ 大きい方の数',
  solution: `【和差算の公式】
大きい方 ＝ （和 ＋ 差） ÷ 2
         ＝ （54 ＋ 16） ÷ 2
         ＝ 70 ÷ 2
         ＝ 35

小さい方 ＝ （54 − 16） ÷ 2 ＝ 19
確認：35 ＋ 19 ＝ 54 ✓、35 − 19 ＝ 16 ✓

答え：35`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_sumdiff_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '2つの量の和と差から大きい方を求める',
  title: '本の冊数（和差算）',
  difficulty: 1,
  text: 'A棚とB棚に本が合わせて72冊あります。\nA棚はB棚より18冊多い。\n\nA棚の本は何冊ですか？',
  answer: 45, answerType: 'number', answerUnit: '冊',
  hint: '大きい方（A棚）＝（和＋差）÷2',
  solution: `【和差算】
A棚 ＝ （72 ＋ 18） ÷ 2
    ＝ 90 ÷ 2
    ＝ 45冊

B棚 ＝ （72 − 18） ÷ 2 ＝ 27冊
確認：45 ＋ 27 ＝ 72 ✓、45 − 27 ＝ 18 ✓

答え：45冊`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_sumdiff_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '3つの数の和と差から最小を求める',
  title: '3つの数の和差算',
  difficulty: 2,
  text: '3つの整数の和は90です。\n最大は最小より18大きく、中間は最小より6大きい。\n\n最小の数を求めなさい。',
  answer: 22, answerType: 'number', answerUnit: '',
  hint: '最小の数を□とすると\n中間 ＝ □＋6、最大 ＝ □＋18\n3つの和 ＝ □＋（□＋6）＋（□＋18）＝ 90',
  solution: `【最小を□とおく】
□ ＋ (□＋6) ＋ (□＋18) ＝ 90
3□ ＋ 24 ＝ 90
3□ ＝ 66
□ ＝ 22

確認：22 ＋ 28 ＋ 40 ＝ 90 ✓

答え：22`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_sumdiff_004',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '所持金の和差算',
  title: '姉と妹の所持金',
  difficulty: 3,
  text: '姉と妹の所持金の合計は3600円です。\n姉は妹より600円多く持っています。\n\n姉の所持金は何円ですか？',
  answer: 2100, answerType: 'number', answerUnit: '円',
  hint: '姉 ＝ （合計 ＋ 差） ÷ 2',
  solution: `【和差算】
姉 ＝ （3600 ＋ 600） ÷ 2
   ＝ 4200 ÷ 2
   ＝ 2100円

妹 ＝ 3600 − 2100 ＝ 1500円
確認：2100 − 1500 ＝ 600 ✓

答え：2100円`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_sumdiff_005',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '和差算', pattern: '3人の所持金の和差算',
  title: '3人の所持金（和差算）',
  difficulty: 3,
  text: 'A、B、Cの3人の所持金の合計は2100円です。\nAはBより240円多く、BはCより180円多い。\n\nCの所持金は何円ですか？',
  answer: 500, answerType: 'number', answerUnit: '円',
  hint: 'Cを□とすると B＝□＋180、A＝□＋180＋240＝□＋420\n3人の合計 ＝ □＋(□＋180)＋(□＋420)＝2100',
  solution: `【Cを□とおく】
AはBより240円多い → A ＝ B＋240
BはCより180円多い → B ＝ C＋180
よって        A ＝ C＋180＋240 ＝ C＋420

C ＋ (C＋180) ＋ (C＋420) ＝ 2100
3C ＋ 600 ＝ 2100
3C ＝ 1500
C ＝ 500円

確認：B＝680円、A＝920円
500＋680＋920 ＝ 2100 ✓

答え：500円`,
  tags: ['特殊算・文章題', '和差算'],
  topicUnitId: 'u6-special',
},

/* ── つるかめ算 6問 ── */
{
  id: 'g6_wp_crane_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '2種類の数量から片方を求める',
  title: '鶴と亀の足の数（基本）',
  difficulty: 1,
  text: '鶴と亀が合わせて10匹います。\n足の合計は28本です。\n\n鶴は何匹いますか？',
  answer: 6, answerType: 'number', answerUnit: '匹',
  hint: '全部が亀（4本足）なら 4×10＝40本。\n実際との差 40−28＝12本。\n亀1匹を鶴1匹に変えると足が 4−2＝2本減る。\n12÷2＝6匹が鶴。',
  solution: `【仮定法（つるかめ算）】
全部が亀なら：4 × 10 ＝ 40本
実際は 28本 → 差：40 − 28 ＝ 12本

亀を鶴に変えると 1匹につき足が 2本減る
鶴の数：12 ÷ 2 ＝ 6匹

確認：鶴6＋亀4、足：6×2＋4×4 ＝ 12＋16 ＝ 28本 ✓

答え：6匹`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_crane_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '硬貨の枚数と金額',
  title: '100円玉と50円玉',
  difficulty: 2,
  text: '100円硬貨と50円硬貨が合わせて20枚あります。\n合計金額は1450円です。\n\n100円硬貨は何枚ですか？',
  answer: 9, answerType: 'number', answerUnit: '枚',
  hint: '全部50円なら 50×20＝1000円。\n実際との差：1450−1000＝450円。\n50円を100円に変えると1枚につき50円増える。\n450÷50＝9枚',
  solution: `【仮定法】
全部 50円なら：50 × 20 ＝ 1000円
実際は 1450円 → 差：1450 − 1000 ＝ 450円

50円を100円に変えると 1枚につき50円増える
100円硬貨の枚数：450 ÷ 50 ＝ 9枚

確認：100円×9＋50円×11 ＝ 900＋550 ＝ 1450円 ✓

答え：9枚`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_crane_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '正解・不正解の点数計算',
  title: 'テストの正解数（つるかめ算）',
  difficulty: 2,
  text: '20問のテストで、正解すると4点、不正解だと1点引かれます。\n合計が65点でした。\n\n正解した問題数は何問ですか？',
  answer: 17, answerType: 'number', answerUnit: '問',
  hint: '全問正解なら 4×20＝80点。\n実際との差：80−65＝15点。\n正解を不正解に変えると 1問につき 4＋1＝5点減る。\n15÷5＝3問が不正解。',
  solution: `【仮定法】
全問正解なら：4 × 20 ＝ 80点
実際は 65点 → 差：80 − 65 ＝ 15点

正解を不正解に変えると 1問につき 4＋1＝5点 減る
不正解の数：15 ÷ 5 ＝ 3問
正解の数：20 − 3 ＝ 17問

確認：4×17 − 1×3 ＝ 68 − 3 ＝ 65点 ✓

答え：17問`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_crane_004',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '単価の異なる商品の個数',
  title: 'りんごとみかんの個数',
  difficulty: 3,
  text: 'りんご1個80円、みかん1個50円です。\n合わせて18個買ったら合計金額は1110円でした。\n\nりんごは何個ですか？',
  answer: 7, answerType: 'number', answerUnit: '個',
  hint: '全部みかんなら 50×18＝900円。\n実際との差：1110−900＝210円。\nみかんをりんごに変えると 1個につき 80−50＝30円増える。\n210÷30＝7個',
  solution: `【仮定法】
全部みかんなら：50 × 18 ＝ 900円
実際は 1110円 → 差：1110 − 900 ＝ 210円

みかんをりんごに変えると 1個につき 30円増える
りんごの個数：210 ÷ 30 ＝ 7個

確認：80×7＋50×11 ＝ 560＋550 ＝ 1110円 ✓

答え：7個`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_crane_005',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '脚の本数から椅子の数を求める',
  title: '椅子と机の脚の数',
  difficulty: 3,
  text: '椅子（4本脚）と机（3本脚）が合わせて15脚あります。\n脚の合計は54本です。\n\n椅子は何脚ありますか？',
  answer: 9, answerType: 'number', answerUnit: '脚',
  hint: '全部机（3本脚）なら 3×15＝45本。\n実際との差：54−45＝9本。\n机を椅子に変えると 1脚につき 4−3＝1本増える。\n9÷1＝9脚が椅子。',
  solution: `【仮定法】
全部机なら：3 × 15 ＝ 45本
実際は 54本 → 差：54 − 45 ＝ 9本

机を椅子に変えると 1脚につき 1本増える
椅子の数：9 ÷ 1 ＝ 9脚（机：6脚）

確認：4×9＋3×6 ＝ 36＋18 ＝ 54本 ✓

答え：9脚`,
  tags: ['特殊算・文章題', 'つるかめ算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_crane_006',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: 'つるかめ算', pattern: '乗り物と速さの組み合わせ',
  title: '電車とバスで旅行（つるかめ算）',
  difficulty: 4,
  text: 'バス（時速30km）と電車（時速80km）を乗り継いで旅行した。\n合計3時間で190km移動した。\n\n電車に乗っていた時間は何時間ですか？',
  answer: 2, answerType: 'number', answerUnit: '時間',
  hint: '全部バスなら 30×3＝90km。\n実際との差：190−90＝100km。\nバスを電車に変えると 1時間につき 80−30＝50km増える。\n100÷50＝2時間が電車。',
  solution: `【仮定法】
全部バスなら：30 × 3 ＝ 90km
実際は 190km → 差：190 − 90 ＝ 100km

バスを電車に変えると 1時間につき 50km増える
電車の時間：100 ÷ 50 ＝ 2時間
バスの時間：3 − 2 ＝ 1時間

確認：30×1＋80×2 ＝ 30＋160 ＝ 190km ✓

答え：2時間`,
  tags: ['特殊算・文章題', 'つるかめ算', '速さとの融合'],
  topicUnitId: 'u6-special',
},

/* ── 過不足算・差集め算 5問 ── */
{
  id: 'g6_wp_surplus_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '余りと不足から人数を求める',
  title: '鉛筆を配る（過不足算 基本）',
  difficulty: 2,
  text: '生徒に鉛筆を配ります。\n1人4本ずつ配ると6本余り、\n1人5本ずつ配ると4本足りません。\n\n生徒は何人いますか？',
  answer: 10, answerType: 'number', answerUnit: '人',
  hint: '配る余り・不足が出てきたら過不足算！\n人数 ＝ （余り ＋ 不足） ÷ （多い方 − 少ない方）',
  solution: `【過不足算の公式】
人数 ＝ （余り ＋ 不足） ÷ （1人分の差）
     ＝ （6 ＋ 4） ÷ （5 − 4）
     ＝ 10 ÷ 1
     ＝ 10人

確認：4×10＋6 ＝ 46本、5×10−4 ＝ 46本 ✓（鉛筆は46本）

答え：10人`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_surplus_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '配ると余りと不足から人数を求める',
  title: 'おかしを配る（過不足算）',
  difficulty: 2,
  text: 'おかしを何人かに配ります。\n1人3個ずつ配ると5個余り、\n1人4個ずつ配ると3個足りません。\n\n子どもは何人いますか？',
  answer: 8, answerType: 'number', answerUnit: '人',
  hint: '人数 ＝ （余り ＋ 不足） ÷ （1人分の差）\n      ＝ （5 ＋ 3） ÷ （4 − 3）',
  solution: `【過不足算】
人数 ＝ （5 ＋ 3） ÷ （4 − 3）
     ＝ 8 ÷ 1
     ＝ 8人

おかしの数：3×8＋5 ＝ 29個
確認：4×8 ＝ 32 > 29、差 ＝ 3個 ✓

答え：8人`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_surplus_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '人数とカード総枚数を両方求める',
  title: 'カードを配る（人数と枚数）',
  difficulty: 3,
  text: 'カードを何人かに配ります。\n1人6枚ずつ配ると4枚余り、\n1人7枚ずつ配ると2枚足りません。\n\nカードは全部で何枚ありますか？',
  answer: 40, answerType: 'number', answerUnit: '枚',
  hint: 'まず人数を求めよう。\n人数 ＝ （4 ＋ 2） ÷ （7 − 6） ＝ 6人\nカードの枚数 ＝ 6×6＋4 ＝ ?',
  solution: `【人数を求める】
人数 ＝ （4 ＋ 2） ÷ （7 − 6）
     ＝ 6 ÷ 1 ＝ 6人

【カードの枚数を求める】
カード ＝ 6×6＋4 ＝ 36＋4 ＝ 40枚

確認：7×6 ＝ 42 > 40、差 ＝ 2枚 ✓

答え：40枚`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_surplus_004',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '長椅子の数を求める（両不足）',
  title: '長椅子の数（過不足算）',
  difficulty: 3,
  text: '長椅子に生徒が座ります。\n1脚に4人ずつ座ると8人が座れません。\n1脚に5人ずつ座ると、最後の1脚だけ3人で残り2席が空きます。\n\n長椅子は何脚ありますか？',
  answer: 10, answerType: 'number', answerUnit: '脚',
  hint: '椅子の数を n 脚とする。\n4人ずつ：全員 ＝ 4n＋8\n5人ずつで最後の椅子が3人（2席空き）：全員 ＝ 5(n−1)＋3 ＝ 5n−2\n4n＋8 ＝ 5n−2 を解く',
  solution: `【方程式で解く】
椅子の数を n 脚とする。

①4人ずつ座ると 8人座れない：
  全員 ＝ 4n ＋ 8

②5人ずつで最後の1脚が3人（2席空き）：
  全員 ＝ 5（n−1）＋3 ＝ 5n−2
  （全脚が5人でないのでn−1脚が満席）

①＝②：4n＋8 ＝ 5n−2
       n ＝ 10脚

確認：全員 ＝ 4×10＋8 ＝ 48人
5×9＋3 ＝ 45＋3 ＝ 48人 ✓

答え：10脚`,
  tags: ['特殊算・文章題', '過不足算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_surplus_005',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '過不足算', pattern: '1人分の量が多い差集め算',
  title: '折り紙を配る（差集め算）',
  difficulty: 4,
  text: '何人かの子どもに折り紙を配ります。\n1人に12枚ずつ配ると20枚余り、\n1人に15枚ずつ配ると16枚足りません。\n\n折り紙は全部で何枚ですか？',
  answer: 164, answerType: 'number', answerUnit: '枚',
  hint: '1人分の差が 15−12＝3枚。\n人数 ＝ （余り ＋ 不足） ÷ 差 ＝ （20＋16）÷3 ＝ 12人\n折り紙 ＝ 12×12＋20',
  solution: `【差集め算】
人数 ＝ （20 ＋ 16） ÷ （15 − 12）
     ＝ 36 ÷ 3
     ＝ 12人

折り紙の枚数：12 × 12 ＋ 20 ＝ 164枚

確認：15 × 12 ＝ 180 > 164、差 ＝ 16枚 ✓

答え：164枚`,
  tags: ['特殊算・文章題', '過不足算', '差集め算'],
  topicUnitId: 'u6-special',
},

/* ── 植木算 5問 ── */
{
  id: 'g6_wp_tree_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '両端あり・間隔から本数を求める',
  title: '道路に木を植える（基本）',
  difficulty: 1,
  text: '道の片側に、端から端まで5mおきに木を植えます。\n道の長さは50mです。\n\n木は何本必要ですか？',
  answer: 11, answerType: 'number', answerUnit: '本',
  hint: '木・電柱・間隔が出てきたら植木算！\n両端に植えるとき：本数 ＝ 道の長さ ÷ 間隔 ＋ 1',
  solution: `【両端あり植木算】
本数 ＝ 50 ÷ 5 ＋ 1
     ＝ 10 ＋ 1
     ＝ 11本

答え：11本`,
  tags: ['特殊算・文章題', '植木算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_tree_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '間隔から本数を求める（道路両側）',
  title: '道路の両側に木を植える',
  difficulty: 2,
  text: '40mの道路の両側に、端から端まで4mおきに木を植えます。\n\n木は合計何本必要ですか？',
  answer: 22, answerType: 'number', answerUnit: '本',
  hint: '片側の本数 ＝ 40÷4＋1 ＝ 11本\n両側なので 11×2 ＝ 22本',
  solution: `【片側の本数を求め、2倍する】
片側の本数 ＝ 40 ÷ 4 ＋ 1 ＝ 11本
両側の合計 ＝ 11 × 2 ＝ 22本

答え：22本`,
  tags: ['特殊算・文章題', '植木算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_tree_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '本数から間隔を逆算する',
  title: '電柱の間隔を求める',
  difficulty: 2,
  text: '100mの道の片側に端から端まで等間隔に電柱を立てます。\n電柱は全部で21本です。\n\n電柱の間隔は何mですか？',
  answer: 5, answerType: 'number', answerUnit: 'm',
  hint: '電柱21本なら間隔は 21−1＝20か所。\n間隔 ＝ 道の長さ ÷ 間隔の数',
  solution: `【逆算】
間隔の数 ＝ 21 − 1 ＝ 20か所
間隔 ＝ 100 ÷ 20 ＝ 5m

答え：5m`,
  tags: ['特殊算・文章題', '植木算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_tree_004',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '池の周り（円形）の植木算',
  title: '池の周りに木を植える（円形）',
  difficulty: 3,
  text: '池の周りに等間隔で木を植えます。\n池の周りの長さは72mで、間隔は3mです。\n\n木は何本必要ですか？',
  answer: 24, answerType: 'number', answerUnit: '本',
  hint: '円形（池・広場の周り）のとき：本数 ＝ 周の長さ ÷ 間隔\n（始点と終点が重なるので ＋1 は不要）',
  solution: `【円形植木算】
本数 ＝ 72 ÷ 3 ＝ 24本

円形では始点と終点が一致するため
「間隔の数 ＝ 木の数」

答え：24本`,
  tags: ['特殊算・文章題', '植木算', '円形'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_tree_005',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '植木算', pattern: '正方形の4辺に木を植える（角を共有）',
  title: '正方形の周りに木を植える',
  difficulty: 3,
  text: '1辺10mの正方形の土地の4辺に、2mおきに木を植えます。\n角には必ず木を植え、4辺の角の木は共有されます。\n\n木は合計何本必要ですか？',
  answer: 20, answerType: 'number', answerUnit: '本',
  hint: '1辺の本数 ＝ 10÷2＋1＝6本\n4辺分の合計 ＝ 6×4＝24本\nただし角の4本は2辺で共有されているので引く。',
  solution: `【正方形の周りの植木算】
1辺の本数 ＝ 10 ÷ 2 ＋ 1 ＝ 6本
4辺の単純合計 ＝ 6 × 4 ＝ 24本
角の木は2辺に重複してカウントされている
重複分 ＝ 4か所（4隅）を引く
合計 ＝ 24 − 4 ＝ 20本

【別解：「周回型」として解く】
正方形も池の周りも「端のない環状の道」。
スタート地点に戻ってくる形なので
「間隔の数 ＝ 木の本数」が成り立つ。
周の長さ ＝ 10 × 4 ＝ 40m
本数 ＝ 40 ÷ 2 ＝ 20本 ✓

答え：20本`,
  tags: ['特殊算・文章題', '植木算', '正方形'],
  topicUnitId: 'u6-special',
},

/* ── 年齢算 4問 ── */
{
  id: 'g6_wp_age_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '何年後に何倍になるか',
  title: '何年後に3倍になるか（年齢算）',
  difficulty: 2,
  text: '現在、父は36歳、子は6歳です。\n\n何年後に父の年齢が子の年齢の3倍になりますか？',
  answer: 9, answerType: 'number', answerUnit: '年後',
  hint: '年齢差は変わらない！\nx年後：父(36+x)＝3×子(6+x)\n36+x ＝ 18+3x → 18 ＝ 2x',
  solution: `【年齢差は変わらない】
x 年後とする。
父：36＋x 歳、子：6＋x 歳

36＋x ＝ 3（6＋x）
36＋x ＝ 18＋3x
18 ＝ 2x
x ＝ 9年後

確認：父45歳、子15歳 → 45 ＝ 3×15 ✓

答え：9年後`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_age_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '何年後に何倍になるか（2倍）',
  title: '母と娘の年齢算',
  difficulty: 2,
  text: '現在、母は32歳、娘は8歳です。\n\n何年後に母の年齢が娘の年齢のちょうど2倍になりますか？',
  answer: 16, answerType: 'number', answerUnit: '年後',
  hint: 'x年後：母(32+x)＝2×娘(8+x)\n32+x ＝ 16+2x → 16 ＝ x',
  solution: `x 年後とする。
32＋x ＝ 2（8＋x）
32＋x ＝ 16＋2x
16 ＝ x

確認：母48歳、娘24歳 → 48 ＝ 2×24 ✓

答え：16年後`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_age_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '3人の年齢の和から何年後かを求める',
  title: '3人の年齢の和が2倍になるのは何年後？',
  difficulty: 3,
  text: '現在、祖父は60歳、父は35歳、息子は10歳です。\n3人の年齢の合計が現在の2倍になるのは何年後ですか？',
  answer: 35, answerType: 'number', answerUnit: '年後',
  hint: '現在の合計：60＋35＋10＝105歳\nx年後の合計：105＋3x ＝ 105×2 ＝ 210',
  solution: `現在の合計：60＋35＋10 ＝ 105歳
2倍 ＝ 210歳

x年後の合計：105＋3x ＝ 210
（3人とも毎年1歳ずつ増えるので＋3x）
3x ＝ 105
x ＝ 35年後

確認：95＋70＋45 ＝ 210 ＝ 105×2 ✓

答え：35年後`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_age_004',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '年齢算', pattern: '過去の倍数関係から現在の年齢を求める',
  title: '過去の倍数から現在の年齢を求める',
  difficulty: 4,
  text: '現在、兄と弟の年齢の和は26歳です。\n7年前は兄の年齢が弟の年齢のちょうど2倍でした。\n\n現在の兄の年齢は何歳ですか？',
  answer: 15, answerType: 'number', answerUnit: '歳',
  hint: '兄をA、弟をBとすると：A＋B＝26\n7年前：(A−7)＝2(B−7)',
  solution: `兄 ＝ A、弟 ＝ B とする。

① A＋B ＝ 26
② A−7 ＝ 2（B−7）
  A−7 ＝ 2B−14
  A ＝ 2B−7

①に代入：(2B−7)＋B ＝ 26
3B ＝ 33
B ＝ 11歳（弟）
A ＝ 26−11 ＝ 15歳（兄）

確認：7年前 兄8歳、弟4歳 → 8＝2×4 ✓

答え：15歳`,
  tags: ['特殊算・文章題', '年齢算'],
  topicUnitId: 'u6-special',
},

/* ── 平均算 3問 ── */
{
  id: 'g6_wp_avg_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '平均算', pattern: '平均を上げるために必要な点数を求める',
  title: '次のテストで平均を上げる',
  difficulty: 2,
  text: '5回のテストの平均点が74点でした。\n次の1回を受けて6回の平均を76点にしたい。\n\n次のテストは何点必要ですか？',
  answer: 86, answerType: 'number', answerUnit: '点',
  hint: '6回の平均を76点にするには、6回の合計は何点になる？\n5回の合計は？　差が次のテストの点数！',
  solution: `【合計から逆算する】
6回の合計 ＝ 76 × 6 ＝ 456点
5回の合計 ＝ 74 × 5 ＝ 370点
次の点数 ＝ 456 − 370 ＝ 86点

答え：86点`,
  tags: ['特殊算・文章題', '平均算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_avg_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '平均算', pattern: '転入生の値を求める',
  title: '転入生の身長',
  difficulty: 2,
  text: '6人の身長の平均が142cmです。\n1人が転入して7人の平均が143cmになりました。\n\n転入生の身長は何cmですか？',
  answer: 149, answerType: 'number', answerUnit: 'cm',
  hint: '7人の合計 ＝ 143×7\n6人の合計 ＝ 142×6\n転入生 ＝ 差',
  solution: `7人の合計 ＝ 143 × 7 ＝ 1001cm
6人の合計 ＝ 142 × 6 ＝  852cm
転入生    ＝ 1001 − 852 ＝ 149cm

答え：149cm`,
  tags: ['特殊算・文章題', '平均算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_avg_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '平均算', pattern: '5回目の点数を求める',
  title: '5回目のテストで平均を上げるには',
  difficulty: 3,
  text: '4回の算数テストの平均が82点でした。\n5回目を受けて5回の平均を85点にしたい。\n\n5回目は何点取ればよいですか？',
  answer: 97, answerType: 'number', answerUnit: '点',
  hint: '5回の合計 ＝ 85×5 ＝ 425点\n4回の合計 ＝ 82×4 ＝ 328点\n5回目 ＝ 425−328',
  solution: `5回の合計 ＝ 85 × 5 ＝ 425点
4回の合計 ＝ 82 × 4 ＝ 328点
5回目 ＝ 425 − 328 ＝ 97点

答え：97点`,
  tags: ['特殊算・文章題', '平均算'],
  topicUnitId: 'u6-special',
},

/* ── 消去算 2問 ── */
{
  id: 'g6_wp_elim_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '消去算', pattern: '2式から1種類の値段を消去して求める',
  title: 'ノートの値段（消去算）',
  difficulty: 3,
  text: 'えんぴつ2本とノート3冊で470円、\nえんぴつ4本とノート5冊で860円でした。\n\nノート1冊の値段は何円ですか？',
  answer: 80, answerType: 'number', answerUnit: '円',
  hint: 'えんぴつを消去するために①×2を作り、②と引き算しよう。\n①×2：えんぴつ4本＋ノート6冊＝940円\n②  ：えんぴつ4本＋ノート5冊＝860円\n差：ノート1冊＝80円',
  solution: `① 2e＋3n ＝ 470
② 4e＋5n ＝ 860

①×2：4e＋6n ＝ 940
②　：4e＋5n ＝ 860
───────────
差：   n ＝ 80円

確認：e ＝ (470−3×80)÷2 ＝ (470−240)÷2 ＝ 115円
4×115＋5×80 ＝ 460＋400 ＝ 860円 ✓

答え：80円`,
  tags: ['特殊算・文章題', '消去算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_elim_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '消去算', pattern: '係数をそろえて消去する',
  title: 'りんごの値段（消去算）',
  difficulty: 4,
  text: 'みかん3個とりんご2個で540円、\nみかん5個とりんご4個で940円でした。\n\nりんご1個の値段は何円ですか？',
  answer: 60, answerType: 'number', answerUnit: '円',
  hint: 'りんごを消去するために①×2を作り、②から引こう。\n①×2：みかん6個＋りんご4個＝1080円\n②  ：みかん5個＋りんご4個＝ 940円\n差：みかん1個＝140円',
  solution: `① 3m＋2a ＝ 540
② 5m＋4a ＝ 940

①×2：6m＋4a ＝ 1080
②　：5m＋4a ＝  940
───────────
差：   m ＝ 140円（みかん1個）

りんご：(540−3×140)÷2 ＝ (540−420)÷2 ＝ 60円

確認：5×140＋4×60 ＝ 700＋240 ＝ 940円 ✓

答え：60円`,
  tags: ['特殊算・文章題', '消去算'],
  topicUnitId: 'u6-special',
},

/* ── 分配算 演習 3問（grade:6） ── */
{
  id: 'g6_wp_bunpai_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '分配算', pattern: '2人に差を付けて分ける',
  title: 'キャンディを2人で分ける（分配算）',
  difficulty: 2,
  text: '300個のキャンディをAとBで分けます。\nAはBより60個多くなるように分けると、\n\nAは何個になりますか？',
  answer: 180, answerType: 'number', answerUnit: '個',
  hint: '「AはBより□多い」→ 和差算と同じ考え方！\nA ＝ （合計 ＋ 差） ÷ 2\n  ＝ （300 ＋ 60） ÷ 2',
  solution: `【分配算 → 和差算で解く】
A ＝ （300 ＋ 60） ÷ 2
  ＝ 360 ÷ 2
  ＝ 180個

B ＝ 300 − 180 ＝ 120個
確認：180 − 120 ＝ 60個 ✓

答え：180個`,
  tags: ['特殊算・文章題', '分配算', '和差算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_bunpai_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '分配算', pattern: '3人に差を付けて分ける',
  title: '3人でお金を分ける（分配算）',
  difficulty: 3,
  text: '510円をA、B、Cの3人で分けます。\nAはBより60円多く、BはCより30円多い。\n\nCは何円もらいますか？',
  answer: 130, answerType: 'number', answerUnit: '円',
  hint: 'Cを□とすると B＝□＋30、A＝□＋90\nC＋B＋A ＝ □＋（□＋30）＋（□＋90）＝ 510',
  solution: `【Cを□とおく】
C ＝ □、B ＝ □＋30、A ＝ □＋90
（AはBより60円多いのでA＝C＋30＋60＝C＋90）

□ ＋ (□＋30) ＋ (□＋90) ＝ 510
3□ ＋ 120 ＝ 510
3□ ＝ 390
□ ＝ 130円

確認：C＝130、B＝160、A＝220
130＋160＋220 ＝ 510 ✓

答え：130円`,
  tags: ['特殊算・文章題', '分配算'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_bunpai_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '分配算', pattern: '比で分ける',
  title: 'カードを2倍の比で分ける（分配算）',
  difficulty: 3,
  text: '120枚のカードをAとBで分けます。\nAがBの2倍になるように分けると、\n\nAは何枚になりますか？',
  answer: 80, answerType: 'number', answerUnit: '枚',
  hint: 'A：B ＝ 2：1 なので\nA ＝ 120 × 2/(2+1) ＝ 120 × 2/3',
  solution: `【比で分ける】
A：B ＝ 2：1
合計の比 ＝ 2＋1 ＝ 3

A ＝ 120 × 2/3 ＝ 80枚
B ＝ 120 × 1/3 ＝ 40枚

確認：80＋40 ＝ 120 ✓、80 ＝ 40×2 ✓

答え：80枚`,
  tags: ['特殊算・文章題', '分配算', '比'],
  topicUnitId: 'u6-special',
},

/* ── 集合算 演習 3問（grade:6） ── */
{
  id: 'g6_wp_venn_001',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '集合算', pattern: 'ベン図で「どちらも好きでない」人数を求める',
  title: '算数と理科が好きな人（集合算 基本）',
  difficulty: 2,
  text: '30人のクラスで、算数が好きな人は18人、\n理科が好きな人は15人、両方好きな人は8人です。\n\nどちらも好きでない人は何人ですか？',
  answer: 5, answerType: 'number', answerUnit: '人',
  hint: 'ベン図で考える！\n少なくとも一方が好き ＝ 算数 ＋ 理科 − 両方\n                 ＝ 18 ＋ 15 − 8 ＝ 25人\nどちらも好きでない ＝ 全体 − 25',
  solution: `【ベン図で考える】
少なくとも一方が好きな人：
18 ＋ 15 − 8 ＝ 25人

どちらも好きでない人：
30 − 25 ＝ 5人

答え：5人`,
  tags: ['特殊算・文章題', '集合算', 'ベン図'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_venn_002',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '集合算', pattern: 'ベン図で「両方」を求める',
  title: '犬と猫を飼っている人（集合算）',
  difficulty: 3,
  text: '40人のクラスで、犬を飼っている人は20人、\n猫を飼っている人は15人、\nどちらも飼っていない人は8人です。\n\n犬と猫の両方を飼っている人は何人ですか？',
  answer: 3, answerType: 'number', answerUnit: '人',
  hint: '少なくとも一方を飼っている ＝ 40 − 8 ＝ 32人\n両方 ＝ 犬 ＋ 猫 − 少なくとも一方\n     ＝ 20 ＋ 15 − 32',
  solution: `【ベン図で考える】
少なくとも一方を飼っている人：
40 − 8 ＝ 32人

両方飼っている人：
（犬）＋（猫）−（少なくとも一方）
＝ 20 ＋ 15 − 32
＝ 3人

確認：犬のみ17人＋猫のみ12人＋両方3人＋飼わない8人
＝ 17＋12＋3＋8 ＝ 40人 ✓

答え：3人`,
  tags: ['特殊算・文章題', '集合算', 'ベン図'],
  topicUnitId: 'u6-special',
},

{
  id: 'g6_wp_venn_003',
  catId: 'pc-special', grade: 6, course: 'exam',
  mainCategory: 'word_problems', lessonUnit: '集合算', pattern: 'ベン図で「両方の最少」を求める',
  title: '運動と音楽が好きな人（集合算 応用）',
  difficulty: 3,
  text: '50人のクラスで、運動が好きな人は32人、\n音楽が好きな人は28人います。\n\n両方好きな人は最少で何人ですか？',
  answer: 10, answerType: 'number', answerUnit: '人',
  hint: '全員（50人）が少なくとも一方が好きと仮定すると\n両方 ＝ 32 ＋ 28 − 50 ＝ 10人\nこれが最少（重複が最小のケース）',
  solution: `【「両方の最少」を求める】
全員が少なくとも一方を好きと仮定すると
（重複最小 ＝ どちらも好きでない人 ＝ 0）

両方好き（最少）＝ 32 ＋ 28 − 50 ＝ 10人

確認：
運動のみ：32−10 ＝ 22人
音楽のみ：28−10 ＝ 18人
両方：10人
合計：22＋18＋10 ＝ 50人 ✓

答え：10人`,
  tags: ['特殊算・文章題', '集合算', 'ベン図', '最小'],
  topicUnitId: 'u6-special',
},
];
