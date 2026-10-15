const PRACTICE_G6_SOLID = [
/* ════════════════════════════════════════
   立体図形・水量 演習問題 （grade:6, catId:'pc-solid'）
════════════════════════════════════════ */

/* ── 体積・表面積の基本 ★1〜2 ── */
{
  id: 'g6_solid_basic_001',
  catId: 'pc-solid', grade: 6, course: 'exam',
  mainCategory: 'solid_geometry', lessonUnit: '体積・表面積の基本', pattern: '直方体の体積から辺の長さを逆算',
  title: '直方体の体積から高さを求める',
  difficulty: 1,
  text: 'たて8cm、よこ5cmの直方体の形をした容器があります。\n容積が240cm³のとき、高さは何cmですか。',
  answer: 6, answerType: 'number', answerUnit: 'cm',
  hint: '体積 ＝ たて × よこ × 高さ',
  solution: `【直方体の体積】
体積 ＝ たて × よこ × 高さ

① たて × よこ ＝ 8 × 5 ＝ 40cm²（底面積）

② 高さ ＝ 体積 ÷ 底面積 ＝ 240 ÷ 40 ＝ 6cm

【確認】
  8 × 5 × 6 ＝ 240cm³ ✓

答え：6cm`,
  tags: ['立体図形', '体積'],
},

{
  id: 'g6_solid_basic_002',
  catId: 'pc-solid', grade: 6, course: 'exam',
  mainCategory: 'solid_geometry', lessonUnit: '体積・表面積の基本', pattern: '円柱の体積(底面積×高さ)',
  title: '円柱の体積を求める',
  difficulty: 2,
  text: '底面の半径が5cm、高さが10cmの円柱があります。\n円周率を3.14として、体積は何cm³ですか。',
  answer: 785, answerType: 'number', answerUnit: 'cm³',
  hint: '円柱の体積 ＝ 底面積（円の面積）× 高さ',
  solution: `【円柱の体積】
円柱の体積 ＝ 底面積 × 高さ。底面は円なので、円の面積 ＝ 半径 × 半径 × 円周率

① 底面積：5 × 5 × 3.14 ＝ 78.5cm²

② 体積：78.5 × 10 ＝ 785cm³

【確認】
  785 ÷ 10 ＝ 78.5cm²（底面積と一致）✓

答え：785cm³`,
  tags: ['立体図形', '体積', '円柱'],
},

/* ── 容器と水深（水量） ★2〜3 ── */
{
  id: 'g6_solid_basic_003',
  catId: 'pc-solid', grade: 6, course: 'exam',
  mainCategory: 'solid_geometry', lessonUnit: '容器と水深（水量）', pattern: '給水と排水を同時に行う満水時間',
  title: '給水しながら排水するときの満水時間',
  difficulty: 2,
  text: '容量180Lの水そうに、毎分20Lの給水管で水を入れながら、\n同時に毎分5Lの排水管で水を抜きます。\n空の状態から満水になるまで何分かかりますか。',
  answer: 12, answerType: 'number', answerUnit: '分',
  hint: '実際に増える量 ＝ 入れる量 － 抜く量（1分あたり）',
  solution: `【給水と排水の同時進行】
同時に入れて抜くときは、1分あたり実際に増える量（入れる量－抜く量）を考える。

① 1分あたり実際に増える量：20 － 5 ＝ 15L

② 満水までの時間：180 ÷ 15 ＝ 12分

【確認】
  15L × 12分 ＝ 180L ✓

答え：12分`,
  tags: ['立体図形・水量', '水そう', '排水'],
},

{
  id: 'g6_solid_std_001',
  catId: 'pc-solid', grade: 6, course: 'exam',
  mainCategory: 'solid_geometry', lessonUnit: '容器と水深（水量）', pattern: '体積から水の深さを求める',
  title: '水の体積から深さを求める',
  difficulty: 2,
  text: '底面が、たて40cm・よこ25cmの直方体の容器に、15Lの水を入れました。\n水の深さは何cmですか。\n（1L＝1000cm³とします）',
  answer: 15, answerType: 'number', answerUnit: 'cm',
  hint: '水の深さ ＝ 水の体積 ÷ 底面積。まず15Lをcm³になおします。',
  solution: `【水量と深さの関係】
水の深さ ＝ 水の体積 ÷ 底面積。単位をそろえてから計算する。

① 底面積：40 × 25 ＝ 1000cm²

② 水の体積：15L ＝ 15 × 1000 ＝ 15000cm³

③ 水の深さ：15000 ÷ 1000 ＝ 15cm

【確認】
  1000cm² × 15cm ＝ 15000cm³ ＝ 15L ✓

答え：15cm`,
  tags: ['立体図形・水量', '水そう', '水深'],
},

{
  id: 'g6_solid_std_002',
  catId: 'pc-solid', grade: 6, course: 'exam',
  mainCategory: 'solid_geometry', lessonUnit: '容器と水深（水量）', pattern: '途中で管を閉じる満水問題',
  title: '途中で給水管を閉じる問題',
  difficulty: 3,
  text: '水そうに10Lの水が入っています。2本の給水管を使うと毎分16L、\n1本では毎分8L水が入ります。\n最初の5分間は2本使い、その後1本を閉じて1本だけで給水を続けたところ、\n水そうの水は122Lになりました。\n給水を始めてから何分かかりましたか。',
  answer: 9, answerType: 'number', answerUnit: '分',
  hint: 'まず最初の5分間で増えた量を計算し、残りを1本の給水管の速さで割ります。',
  solution: `【途中で管を閉じる問題】
区間ごとに分けて、それぞれの時間で増える量を計算する。

① 最初の5分間（2本使用、毎分16L）で増えた量：16 × 5 ＝ 80L
  5分後の水の量：10 ＋ 80 ＝ 90L

② 残りに必要な量：122 － 90 ＝ 32L

③ 1本（毎分8L）で32L入れるのにかかる時間：32 ÷ 8 ＝ 4分

④ 合計時間：5 ＋ 4 ＝ 9分

【確認】
  10 ＋ 16×5 ＋ 8×4 ＝ 10＋80＋32 ＝ 122L ✓

答え：9分`,
  tags: ['立体図形・水量', '水そう', '給水'],
},

];
