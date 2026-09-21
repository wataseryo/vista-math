const PRACTICE_G6_SPEED = [
/* ════════════════════════════════════════
   速さ 演習問題 （grade:6, catId:'pc-speed'）
════════════════════════════════════════ */

/* ── 速さの基本 ★1〜★3 ── */
{
  id: 'g6_speed_basic_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さの基本', pattern: '速さ＝距離÷時間',
  title: '速さを求める（基本）',
  difficulty: 1,
  text: '120kmの道のりを3時間で走りました。\n時速は何kmですか？',
  answer: 40, answerType: 'number', answerUnit: 'km/時',
  hint: '速さ ＝ 距離 ÷ 時間\n120 ÷ 3 ＝ ？',
  solution: `【速さの公式】
  速さ ＝ 距離 ÷ 時間

① 距離：120km
② 時間：3時間

③ 式を立てる
  120 ÷ 3 ＝ 40 km/時

【確認】
  40 km/時 × 3時間 ＝ 120km ✓

答え：40 km/時`,
  tags: ['速さ', '速さの基本'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_basic_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さの基本', pattern: '時間＝距離÷速さ',
  title: '時間を求める（基本）',
  difficulty: 1,
  text: '時速60kmで180km進むと何時間かかりますか？',
  answer: 3, answerType: 'number', answerUnit: '時間',
  hint: '時間 ＝ 距離 ÷ 速さ\n180 ÷ 60 ＝ ？',
  solution: `【時間の公式】
  時間 ＝ 距離 ÷ 速さ

① 距離：180km
② 速さ：時速60km

③ 式を立てる
  180 ÷ 60 ＝ 3 時間

【確認】
  60 km/時 × 3時間 ＝ 180km ✓

答え：3時間`,
  tags: ['速さ', '速さの基本'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_basic_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さの基本', pattern: '距離＝速さ×時間',
  title: '距離を求める（分速→m）',
  difficulty: 2,
  text: '分速80mで歩くとき、15分で何m進みますか？',
  answer: 1200, answerType: 'number', answerUnit: 'm',
  hint: '距離 ＝ 速さ × 時間\n80 × 15 ＝ ？',
  solution: `【距離の公式】
  距離 ＝ 速さ × 時間

① 速さ：分速80m（1分に80m進む）
② 時間：15分

③ 式を立てる
  80 × 15 ＝ 1200 m

答え：1200m`,
  tags: ['速さ', '速さの基本'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_basic_004',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さの基本', pattern: '時速→分速への単位変換',
  title: '速さの単位変換（時速→分速）',
  difficulty: 2,
  text: '時速90kmを分速に直すと、分速何mですか？',
  answer: 1500, answerType: 'number', answerUnit: 'm/分',
  hint: '時速90km ＝ 1時間（60分）に90000m進む\n90000 ÷ 60 ＝ ？',
  solution: `【単位変換の手順】
時速 → 分速 に直すには ÷ 60、
km → m に直すには × 1000

① km → m：90 × 1000 ＝ 90000 m/時

② 時 → 分：90000 ÷ 60 ＝ 1500 m/分

【別の考え方】
時速90km ÷ 60 ＝ 分速1.5km ＝ 分速1500m

答え：分速1500m`,
  tags: ['速さ', '速さの基本', '単位変換'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_basic_005',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さの基本', pattern: '往復の平均の速さ',
  title: '往復の平均の速さ',
  difficulty: 3,
  text: 'ある道のりを行きは時速40km、帰りは時速60kmで往復しました。\n往復の平均の速さは時速何kmですか？',
  answer: 48, answerType: 'number', answerUnit: 'km/時',
  hint: '(40＋60)÷2＝50 とするのは間違い！\n具体的な距離（例：120km）で合計時間を出してから\n総距離 ÷ 総時間 で計算しよう。',
  solution: `【往復の平均の速さ】
  平均の速さ ＝ 総距離 ÷ 総時間

① 片道の距離を 120km と仮定する（40と60の最小公倍数）

② 行きの時間：120 ÷ 40 ＝ 3時間

③ 帰りの時間：120 ÷ 60 ＝ 2時間

④ 総距離 ＝ 120 × 2 ＝ 240km
   総時間 ＝ 3 ＋ 2 ＝ 5時間

⑤ 平均の速さ：240 ÷ 5 ＝ 48 km/時

【注意】(40＋60)÷2＝50 は間違い！
同じ時間ではなく同じ距離を速さが違う場合は
この式は使えません。

答え：48 km/時`,
  tags: ['速さ', '速さの基本', '平均の速さ'],
  topicUnitId: 'u6-speed',
},

/* ── 旅人算 ★2〜★4 ── */
{
  id: 'g6_speed_travel_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '向かい合って出発（出会い算）',
  title: '出会い算（基本）',
  difficulty: 2,
  text: 'AさんとBさんは3500m離れた地点から向かい合って同時に出発しました。\nAさんは分速60m、Bさんは分速80mです。\n\n2人が出会うのは何分後ですか？',
  answer: 25, answerType: 'number', answerUnit: '分',
  hint: '2人が出会うまでに合わせて3500m進む\n1分で2人合わせて 60＋80＝140m 近づく\n3500 ÷ 140 ＝ ？',
  solution: `【出会い算の考え方】
向かい合って近づく → 1分あたり「2人の速さの合計」だけ縮まる

① 1分で縮まる距離：60 ＋ 80 ＝ 140 m/分

② 出会うまでの時間：3500 ÷ 140 ＝ 25 分

【確認】
  Aさん：60 × 25 ＝ 1500m
  Bさん：80 × 25 ＝ 2000m
  合計：1500 ＋ 2000 ＝ 3500m ✓

答え：25分`,
  tags: ['速さ', '旅人算', '出会い算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_travel_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '同方向に出発（追いつき算）',
  title: '追いつき算（基本）',
  difficulty: 2,
  text: 'AさんはBさんより15分早く同じ地点を出発しました。\nAさんの速さは分速40m、Bさんの速さは分速60mです。\n\nBさんがAさんに追いつくのはBさんが出発してから何分後ですか？',
  answer: 30, answerType: 'number', answerUnit: '分',
  hint: 'Bさんが出発したとき、Aさんはすでに 40×15＝600m 先にいる。\n差を縮める速さは 60−40＝20m/分\n600 ÷ 20 ＝ ？',
  solution: `【追いつき算の考え方】
Bさんが出発したとき Aさんはすでに先行している。
その差を「速さの差」で縮めていく。

① Bさんが出発したときの先行距離
  40 m/分 × 15 分 ＝ 600m

② 1分で縮まる差：60 − 40 ＝ 20 m/分

③ 追いつく時間：600 ÷ 20 ＝ 30 分

【確認】
  Bさん：60 × 30 ＝ 1800m
  Aさん：600 ＋ 40 × 30 ＝ 1800m ✓

答え：30分`,
  tags: ['速さ', '旅人算', '追いつき算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_travel_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '出発時間がずれた出会い算',
  title: '出発時間差のある出会い算',
  difficulty: 3,
  text: 'A地点とB地点は2250m離れています。\nAさんは分速60mでA地点を出発してから5分後に、\nBさんは分速90mでB地点を出発しました。\n\nBさんが出発してから何分後に2人は出会いますか？',
  answer: 13, answerType: 'number', answerUnit: '分',
  hint: 'Bさんが出発したとき、Aさんはすでに 60×5＝300m 進んでいる。\n残りの距離 ＝ 2250−300 ＝ 1950m\n1950 ÷ (60＋90) ＝ ？',
  solution: `【手順】
① Bさんが出発した時点でのAさんの位置
  60 × 5 ＝ 300m（A地点から）

② Bさんが出発した時点での2人の間の距離
  2250 − 300 ＝ 1950m

③ 2人が近づく速さ：60 ＋ 90 ＝ 150 m/分

④ 出会うまでの時間（Bの出発から）
  1950 ÷ 150 ＝ 13 分

【確認】
  Aさん（Bが出発してから）：300 ＋ 60×13 ＝ 1080m
  Bさん：90 × 13 ＝ 1170m
  合計：1080 ＋ 1170 ＝ 2250m ✓

答え：13分`,
  tags: ['速さ', '旅人算', '出会い算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_travel_004',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '先発者に追いつく（時間差）',
  title: '追いつき算（時間差あり）',
  difficulty: 3,
  text: 'AさんはBさんより20分早く同じ地点を出発しました。\nAさんの速さは分速50m、Bさんの速さは分速75mです。\n\nBさんがAさんに追いつくのはBさんが出発してから何分後ですか？',
  answer: 40, answerType: 'number', answerUnit: '分',
  hint: 'Bが出発したとき Aは 50×20＝1000m 先にいる。\n縮まる速さは 75−50＝25 m/分\n1000 ÷ 25 ＝ ？',
  solution: `【手順】
① Bさんが出発したときのAさんの先行距離
  50 × 20 ＝ 1000m

② 1分で縮まる差：75 − 50 ＝ 25 m/分

③ 追いつく時間：1000 ÷ 25 ＝ 40 分

【確認】
  Bさん：75 × 40 ＝ 3000m
  Aさん：1000 ＋ 50 × 40 ＝ 3000m ✓

答え：40分`,
  tags: ['速さ', '旅人算', '追いつき算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_travel_005',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '折り返しで2回目に出会う',
  title: '往復して2回目に出会う',
  difficulty: 3,
  text: 'AさんとBさんが3000m離れた2地点から向かい合って同時に出発し、\n端に着くたびに折り返します。\nAさんは分速60m、Bさんは分速40mです。\n\n出発してから2回目に出会うのは何分後ですか？',
  answer: 90, answerType: 'number', answerUnit: '分',
  hint: '2人合わせて何m進んだとき2回目に出会う？\nn回目の出会いは合わせて (2n−1)×3000m 進んだとき。\n2回目：3×3000÷(60＋40)＝？',
  solution: `【往復出会いの公式】
両端で折り返す2人が n 回目に出会うとき、
合わせて (2n-1) × AB だけ進む。

① 2人の速さの合計：60 ＋ 40 ＝ 100 m/分

② 2回目の出会い（n=2）のとき合わせて進む距離
  (2×2 − 1) × 3000 ＝ 3 × 3000 ＝ 9000m

③ かかる時間：9000 ÷ 100 ＝ 90 分

【参考】
  1回目：3000÷100 ＝ 30分
  2回目：9000÷100 ＝ 90分（←これ）
  3回目：15000÷100 ＝ 150分

答え：90分`,
  tags: ['速さ', '旅人算', '折り返し', '出会い算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_travel_006',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '旅人算', pattern: '折り返し後に追いつく',
  title: '折り返した兄が弟に追いつく',
  difficulty: 4,
  text: 'A地点とB地点は1800m離れています。\n兄は分速90mでAからBへ向かい、B地点でUターンして引き返します。\n弟は分速60mで兄と同時にAからBへ向かいます。\n\n兄が弟に追いつくのは出発から何分後ですか？',
  answer: 24, answerType: 'number', answerUnit: '分',
  hint: 'まず兄がBに着くまでの時間を求めよう。\n兄が折り返した後、2人は向かい合って近づく。\n（兄はA方向、弟はB方向に進んでいる）',
  solution: `【手順】
① 兄がBに到着する時間
  1800 ÷ 90 ＝ 20分

② 兄がBに到着したとき弟の位置
  60 × 20 ＝ 1200m（A地点から）

③ 折り返した兄と弟の間の距離
  1800 − 1200 ＝ 600m

④ 兄はA方向（90m/分）、弟はB方向（60m/分）
  → 2人は近づき合う（向かい合いと同じ）

⑤ 近づく速さ：90 ＋ 60 ＝ 150 m/分

⑥ 出会う時間（20分後から）
  600 ÷ 150 ＝ 4 分

⑦ 出発からの合計時間：20 ＋ 4 ＝ 24 分

【確認】
  兄：1800 − 90×4 ＝ 1800 − 360 ＝ 1440m
  弟：60 × 24 ＝ 1440m ✓

答え：24分`,
  tags: ['速さ', '旅人算', '折り返し', '追いつき算'],
  topicUnitId: 'u6-speed',
},

/* ── 通過算 ★2〜★4 ── */
{
  id: 'g6_speed_pass_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '通過算', pattern: '電車が電柱を通過する時間',
  title: '電車が電柱を通過する時間',
  difficulty: 2,
  text: '長さ120mの電車が分速900mで走っています。\n\n電柱を通過するのに何秒かかりますか？',
  answer: 8, answerType: 'number', answerUnit: '秒',
  hint: '電柱（点）を通過するには電車の長さ分だけ進めばよい。\n分速900m＝秒速何m？\n120 ÷ 秒速 ＝ ？秒',
  solution: `【通過算の基本】
電柱（点）を通過するとき → 電車の長さ 分だけ進む

① 分速900mを秒速に変換
  900 ÷ 60 ＝ 15 m/秒

② 通過時間
  120 ÷ 15 ＝ 8 秒

答え：8秒`,
  tags: ['速さ', '通過算'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_pass_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '通過算', pattern: '電車がトンネルを通過する時間',
  title: '電車がトンネルを通過する時間',
  difficulty: 2,
  text: '長さ100mの電車が秒速25mでトンネル（長さ400m）を通過します。\n\n完全に通過するのに何秒かかりますか？',
  answer: 20, answerType: 'number', answerUnit: '秒',
  hint: 'トンネルを通過する距離 ＝ トンネルの長さ ＋ 電車の長さ\n(400 ＋ 100) ÷ 25 ＝ ？',
  solution: `【通過算：トンネル】
電車がトンネルを完全に通過する距離
＝ トンネルの長さ ＋ 電車の長さ

① 通過する距離：400 ＋ 100 ＝ 500m

② 通過時間：500 ÷ 25 ＝ 20 秒

【なぜ足すのか】
電車の先頭がトンネルに入り始めてから
電車の最後尾がトンネルを出るまでの距離だから。

答え：20秒`,
  tags: ['速さ', '通過算', 'トンネル'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_pass_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '通過算', pattern: '2本の電車がすれ違う',
  title: '2本の電車がすれ違う時間',
  difficulty: 3,
  text: '長さ150mの急行列車（秒速30m）と\n長さ100mの各駅停車（秒速20m）が\n向かい合って走っています。\n\nすれ違い始めてから完全に離れるまで何秒かかりますか？',
  answer: 5, answerType: 'number', answerUnit: '秒',
  hint: 'すれ違いにかかる距離 ＝ 2本の電車の長さの合計\n速さは2本の速さの合計（向かい合っているから）',
  solution: `【2本の電車がすれ違う】
すれ違い距離 ＝ 2本の電車の長さの合計
すれ違い速さ ＝ 2本の速さの合計（向かい合い）

① すれ違いに必要な距離：150 ＋ 100 ＝ 250m

② すれ違い速さ：30 ＋ 20 ＝ 50 m/秒

③ すれ違い時間：250 ÷ 50 ＝ 5 秒

答え：5秒`,
  tags: ['速さ', '通過算', 'すれ違い'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_pass_004',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '通過算', pattern: '2本の電車が追い越す',
  title: '2本の電車が追い越す時間',
  difficulty: 3,
  text: '速さ秒速28mの電車（長さ240m）が、\n同じ方向に速さ秒速16mで走っている電車（長さ180m）を追い越します。\n\n追い越しに何秒かかりますか？',
  answer: 35, answerType: 'number', answerUnit: '秒',
  hint: '追い越し距離 ＝ 2本の電車の長さの合計\n速さは2本の速さの差（同じ方向）',
  solution: `【2本の電車が追い越す】
追い越し距離 ＝ 2本の電車の長さの合計
追い越し速さ ＝ 速さの差（同方向）

① 追い越しに必要な距離：240 ＋ 180 ＝ 420m

② 追い越し速さ（速さの差）：28 − 16 ＝ 12 m/秒

③ 追い越し時間：420 ÷ 12 ＝ 35 秒

答え：35秒`,
  tags: ['速さ', '通過算', '追い越し'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_pass_005',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '通過算', pattern: '電柱と橋から電車の長さを求める',
  title: '電柱と橋の通過から電車の長さを求める',
  difficulty: 4,
  text: 'ある電車が電柱のそばを通過するのに8秒かかりました。\nまた400mの橋を渡るのに28秒かかりました。\n\nこの電車の長さは何mですか？',
  answer: 160, answerType: 'number', answerUnit: 'm',
  hint: '電車の長さを L m、速さを V m/秒 とすると\n電柱：L ÷ V ＝ 8 … ①\n橋：(L＋400) ÷ V ＝ 28 … ②\n①より V ＝ L÷8。これを②に代入しよう。',
  solution: `【電柱通過・橋通過の2式から逆算する】
電車の長さを L m、速さを V m/秒 とする。

電柱通過：L ÷ V ＝ 8  … ①
橋通過　：(L ＋ 400) ÷ V ＝ 28 … ②

①より：V ＝ L ÷ 8

②に代入：(L ＋ 400) ÷ (L ÷ 8) ＝ 28
8(L ＋ 400) ÷ L ＝ 28
8L ＋ 3200 ＝ 28L
3200 ＝ 20L
L ＝ 160m

【確認】
V ＝ 160 ÷ 8 ＝ 20 m/秒
橋：(160 ＋ 400) ÷ 20 ＝ 560 ÷ 20 ＝ 28秒 ✓

答え：160m`,
  tags: ['速さ', '通過算', '逆算'],
  topicUnitId: 'u6-speed',
},

/* ── 流水算 ★2〜★4 ── */
{
  id: 'g6_speed_river_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '流水算', pattern: '下りの速さを求める',
  title: '下りの速さを求める（基本）',
  difficulty: 2,
  text: '船の静水時の速さは時速8km、川の流速は時速2kmです。\n\n川を下るときの速さは時速何kmですか？',
  answer: 10, answerType: 'number', answerUnit: 'km/時',
  hint: '下り速さ ＝ 静水時の速さ ＋ 流速\n8 ＋ 2 ＝ ？',
  solution: `【流水算の公式】
  下り速さ ＝ 静水時の速さ ＋ 流速
  上り速さ ＝ 静水時の速さ − 流速

① 下り速さ：8 ＋ 2 ＝ 10 km/時

【なぜ？】
川が船を押してくれるので、静水時より流速分だけ速くなる。

答え：10 km/時`,
  tags: ['速さ', '流水算', '下り'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_river_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '流水算', pattern: '上りの速さを求める',
  title: '上りの速さを求める（基本）',
  difficulty: 2,
  text: '船の静水時の速さは時速12km、川の流速は時速3kmです。\n\n川を上るときの速さは時速何kmですか？',
  answer: 9, answerType: 'number', answerUnit: 'km/時',
  hint: '上り速さ ＝ 静水時の速さ − 流速\n12 − 3 ＝ ？',
  solution: `【流水算】
  上り速さ ＝ 静水時の速さ − 流速

① 上り速さ：12 − 3 ＝ 9 km/時

【なぜ？】
上りは川の流れに逆らうため、静水時より流速分だけ遅くなる。

答え：9 km/時`,
  tags: ['速さ', '流水算', '上り'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_river_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '流水算', pattern: '上り・下りから静水時の速さを求める',
  title: '静水時の速さを求める',
  difficulty: 3,
  text: 'ある船が川を上るときの速さは時速8km、\n下るときの速さは時速14kmです。\n\n船の静水時の速さは時速何kmですか？',
  answer: 11, answerType: 'number', answerUnit: 'km/時',
  hint: '静水時の速さ ＝ (上り速さ ＋ 下り速さ) ÷ 2\n(8 ＋ 14) ÷ 2 ＝ ？',
  solution: `【逆算の公式】
  下り ＝ 静水 ＋ 流速
  上り ＝ 静水 − 流速

2つ足すと：下り ＋ 上り ＝ 2 × 静水

  静水時の速さ ＝ (下り ＋ 上り) ÷ 2

① 静水時の速さ：(14 ＋ 8) ÷ 2 ＝ 22 ÷ 2 ＝ 11 km/時

② おまけ（流速も求めると）
  流速 ＝ (下り − 上り) ÷ 2 ＝ (14 − 8) ÷ 2 ＝ 3 km/時

答え：11 km/時`,
  tags: ['速さ', '流水算', '静水時の速さ'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_river_004',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '流水算', pattern: '距離と時間から流速を求める',
  title: '流速を求める',
  difficulty: 3,
  text: 'ある船が下りで60km進むのに3時間、\n同じ川を上りで60km進むのに5時間かかりました。\n\n川の流速は時速何kmですか？',
  answer: 4, answerType: 'number', answerUnit: 'km/時',
  hint: 'まず上り速さと下り速さを求めよう。\n流速 ＝ (下り速さ − 上り速さ) ÷ 2',
  solution: `【手順】
① 下り速さ：60 ÷ 3 ＝ 20 km/時

② 上り速さ：60 ÷ 5 ＝ 12 km/時

③ 流速 ＝ (下り − 上り) ÷ 2
  ＝ (20 − 12) ÷ 2 ＝ 8 ÷ 2 ＝ 4 km/時

【確認】
  静水時の速さ：(20 ＋ 12) ÷ 2 ＝ 16 km/時
  下り：16 ＋ 4 ＝ 20 km/時 ✓
  上り：16 − 4 ＝ 12 km/時 ✓

答え：4 km/時`,
  tags: ['速さ', '流水算', '流速'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_river_005',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '流水算', pattern: '往復時間から静水速さを求める',
  title: '往復時間から速さを求める',
  difficulty: 4,
  text: 'ある船が川の上流から下流まで60km下るのに5時間、\n同じ60kmを上るのに10時間かかりました。\n\n船の静水時の速さは時速何kmですか？',
  answer: 9, answerType: 'number', answerUnit: 'km/時',
  hint: 'まず下り速さ・上り速さを求めよう。\n下り：60÷5, 上り：60÷10\n静水時 ＝ (下り＋上り) ÷ 2',
  solution: `【手順】
① 下り速さ：60 ÷ 5 ＝ 12 km/時

② 上り速さ：60 ÷ 10 ＝ 6 km/時

③ 静水時の速さ：(12 ＋ 6) ÷ 2 ＝ 9 km/時

④ 流速：(12 − 6) ÷ 2 ＝ 3 km/時

【確認】
  下り：9 ＋ 3 ＝ 12 km/時 → 60÷12＝5時間 ✓
  上り：9 − 3 ＝ 6 km/時 → 60÷6＝10時間 ✓

答え：9 km/時`,
  tags: ['速さ', '流水算', '静水時の速さ', '往復'],
  topicUnitId: 'u6-speed',
},

/* ── 時計算 ★2〜★3 ── */
{
  id: 'g6_speed_clock_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '時計算', pattern: '長針と短針がなす角度（整数時刻）',
  title: '1時ちょうどの長針と短針の角度',
  difficulty: 2,
  text: '1時ちょうどのとき、長針と短針がなす小さいほうの角度は何度ですか？',
  answer: 30, answerType: 'number', answerUnit: '度',
  hint: '短針は1時間で360÷12＝30度動く。\n1時ちょうどなら、短針は30度の位置（12時から）。\n長針は0度の位置（12時を指す）。\n差は？',
  solution: `【時計の角度の基本】
  短針：1時間で 360 ÷ 12 ＝ 30度 動く
  長針：1分で 360 ÷ 60 ＝ 6度 動く

1時ちょうど：
  短針：30 × 1 ＝ 30度（12の位置から）
  長針：0度（12を指している）

差：30 − 0 ＝ 30度

答え：30度`,
  tags: ['速さ', '時計算', '角度'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_clock_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '時計算', pattern: '長針と短針がなす角度（分あり）',
  title: '3時20分のときの長針と短針の角度',
  difficulty: 2,
  text: '3時20分のとき、長針と短針がなす小さいほうの角度は何度ですか？',
  answer: 20, answerType: 'number', answerUnit: '度',
  hint: '短針は1分で 0.5度 動く。\n3時の短針の位置：30×3＝90度\nさらに20分で：0.5×20＝10度\n長針の位置：6×20＝120度',
  solution: `【3時20分の角度】
短針の位置：
  3時間分：30 × 3 ＝ 90度
  20分分：0.5 × 20 ＝ 10度
  合計：90 ＋ 10 ＝ 100度

長針の位置：
  6 × 20 ＝ 120度

2針の差：|120 − 100| ＝ 20度

20度 < 180度 なので、小さいほうの角度は 20度

答え：20度`,
  tags: ['速さ', '時計算', '角度'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_clock_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '時計算', pattern: '長針と短針がなす角度（計算）',
  title: '8時30分のときの角度',
  difficulty: 3,
  text: '8時30分のとき、長針と短針がなす小さいほうの角度は何度ですか？',
  answer: 75, answerType: 'number', answerUnit: '度',
  hint: '短針：8時間で30×8＝240度、さらに30分で0.5×30＝15度\n合計：255度\n長針：6×30＝180度\n差は？',
  solution: `【8時30分の角度】
短針の位置：
  8時間分：30 × 8 ＝ 240度
  30分分：0.5 × 30 ＝ 15度
  合計：240 ＋ 15 ＝ 255度

長針の位置：
  6 × 30 ＝ 180度

2針の差：|255 − 180| ＝ 75度

75度 < 180度 なので、小さいほうの角度は 75度

答え：75度`,
  tags: ['速さ', '時計算', '角度'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_clock_004',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '時計算', pattern: '長針が短針を追い越す回数',
  title: '12時間で長針が短針を追い越す回数',
  difficulty: 3,
  text: '午前0時から正午（12時間）の間に、\n長針が短針をちょうど追い越す（重なる）回数は何回ですか？',
  answer: 11, answerType: 'number', answerUnit: '回',
  hint: '長針は1時間で360度、短針は30度動く。\n長針は短針より1時間で 360−30＝330度 速い。\n1周（360度）追い越すたびに1回重なる。\n12時間で長針が短針より多く回る角度は？',
  solution: `【考え方】
長針と短針の速さの差：360 − 30 ＝ 330 度/時間

長針が短針を1周追い越す（360度分差が開く）ごとに「重なる」。

12時間で長針が短針より多く進む角度：
  330 × 12 ＝ 3960度

重なる回数：
  3960 ÷ 360 ＝ 11 回

【別の考え方】
0時・1時・2時・…・10時の直後に1回ずつ重なる＝11回。
（「12時」は出発点に戻るので0時に相当し、12時間で数えると0時と12時の重なりはどちらか一方だけ）

答え：11回`,
  tags: ['速さ', '時計算', '重なり'],
  topicUnitId: 'u6-speed',
},

/* ── ダイヤグラム ★2〜★4 ── */
{
  id: 'g6_speed_diagram_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: 'ダイヤグラム', pattern: '出発時間が異なる2人の出会い',
  title: '出発時間がずれた出会い時刻',
  difficulty: 2,
  text: 'A地点から太郎さんが8:00に分速60mで出発しました。\nB地点（A地点から2400m先）から次郎さんが8:10に分速90mでA地点に向かって出発しました。\n\n2人が出会うのは8時何分ですか？',
  answer: 22, answerType: 'number', answerUnit: '分',
  hint: '8:10の時点で太郎さんはどこにいる？\n8:10以降、2人は向かい合って進む。\n残り距離 ÷ (60＋90) ＝ 出会うまでの分数',
  solution: `【ダイヤグラム問題の手順】
① 8:10の時点で太郎さんの位置
  60 × 10 ＝ 600m（A地点から）

② 8:10の時点で2人の間の距離
  2400 − 600 ＝ 1800m

③ 2人が近づく速さ：60 ＋ 90 ＝ 150 m/分

④ 8:10から出会うまでの時間
  1800 ÷ 150 ＝ 12 分

⑤ 出会う時刻：8:10 ＋ 12分 ＝ 8:22

答え：8時22分（22分）`,
  tags: ['速さ', 'ダイヤグラム', '出会い'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_diagram_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: 'ダイヤグラム', pattern: '途中で引き返す',
  title: '途中で引き返したときの到着時間',
  difficulty: 3,
  text: '太郎さんが分速60mで家から出発しました。\n15分後に忘れ物に気づき、同じ速さで引き返しました。\n\n太郎さんが家に戻るのは出発から何分後ですか？',
  answer: 30, answerType: 'number', answerUnit: '分',
  hint: '15分で進んだ距離を求め、同じ距離を同じ速さで戻る。\n往復なので合計時間は？',
  solution: `【手順】
① 15分で進んだ距離：60 × 15 ＝ 900m

② 引き返す時間：900 ÷ 60 ＝ 15分

③ 出発から家に戻るまでの合計時間
  15 ＋ 15 ＝ 30 分

【ダイヤグラムで考えると】
0分：家を出発
15分：忘れ物に気づく（900m地点）
30分：家に戻る

答え：30分`,
  tags: ['速さ', 'ダイヤグラム', '折り返し'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_diagram_003',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: 'ダイヤグラム', pattern: '2人が折り返して2回目の出会い',
  title: '2人が往復して2回目に出会う時刻',
  difficulty: 4,
  text: 'A地点とB地点は4200m離れています。\n太郎さんは分速80mでAからBへ、次郎さんは分速60mでBからAへ同時に出発し、\n端に着いたらすぐ折り返します。\n\n出発してから2回目に出会うのは何分後ですか？',
  answer: 90, answerType: 'number', answerUnit: '分',
  hint: 'n回目の出会いは、合わせて (2n−1)×4200m 進んだとき。\n2回目：3×4200÷(80＋60)＝？',
  solution: `【往復の出会い公式】
2人が端で折り返す場合、n回目の出会いは
合わせて (2n-1) × AB 進んだとき。

① 2人の速さの合計：80 ＋ 60 ＝ 140 m/分

② 2回目の出会い（n=2）のとき合わせて進む距離
  (2×2 − 1) × 4200 ＝ 3 × 4200 ＝ 12600m

③ かかる時間：12600 ÷ 140 ＝ 90 分

【確認（90分後の位置）】
  太郎：80×90＝7200m 進んだ
    → A→B(4200m)→引き返し3000m ＝ A地点から1200m
  次郎：60×90＝5400m 進んだ（Bから出発）
    → B→A(4200m)→引き返し1200m ＝ A地点から1200m

両者とも A地点から1200m の地点で出会う ✓

答え：90分`,
  tags: ['速さ', 'ダイヤグラム', '折り返し', '出会い'],
  topicUnitId: 'u6-speed',
},

/* ── 速さと比 ★3〜★4 ── */
{
  id: 'g6_speed_ratio_001',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さと比', pattern: '速さの比から距離の比',
  title: '速さの比と距離の関係',
  difficulty: 3,
  text: 'AさんとBさんが同じ地点から同じ方向へ同時に出発しました。\nAさんの速さはBさんの速さの4分の3です。\nBさんが目的地に着いたとき、AさんはBさんより2kmうしろにいました。\n\n目的地までの道のりは何kmですか？',
  answer: 8, answerType: 'number', answerUnit: 'km',
  hint: 'A:Bの速さの比 ＝ 3:4\n同じ時間に進む距離の比も 3:4\nBが4進むとき Aは3しか進めない。\n差の「1」が 2km にあたる。',
  solution: `【速さと距離の比】
同じ時間に進む距離の比 ＝ 速さの比

A:B の速さの比 ＝ 3:4
同じ時間で進む距離の比も ＝ 3:4

Bが4進むとき Aは3 → 差は1
この1が 2km にあたる。

1つ分 ＝ 2km
目的地まで ＝ 4 × 2 ＝ 8km

【確認】
  Bが8km進む時間で Aは 8 × 3/4 ＝ 6km
  差：8 − 6 ＝ 2km ✓

答え：8km`,
  tags: ['速さ', '速さと比', '距離の比'],
  topicUnitId: 'u6-speed',
},

{
  id: 'g6_speed_ratio_002',
  catId: 'pc-speed', grade: 6, course: 'exam',
  mainCategory: 'speed', lessonUnit: '速さと比', pattern: '2つの交通手段で時間差から距離',
  title: '速さの差から距離を求める',
  difficulty: 4,
  text: '兄は自転車（時速18km）で、弟は徒歩（時速4km）で同じ道を通ります。\n兄は弟より35分早く目的地に着きました。\n\n目的地までの道のりは何kmですか？',
  answer: 3, answerType: 'number', answerUnit: 'km',
  hint: '道のりを□kmとおく。\n兄の時間：□÷18（時間）\n弟の時間：□÷4（時間）\n差が35分（＝35/60時間）\n□÷4 − □÷18 ＝ 35/60',
  solution: `【方程式で解く】
道のりを □ km とおく。

弟の時間：□ ÷ 4 時間
兄の時間：□ ÷ 18 時間
時間差：35分 ＝ 35/60 ＝ 7/12 時間

□/4 − □/18 ＝ 7/12

通分（最小公倍数36）：
  9□/36 − 2□/36 ＝ 7/12
  7□/36 ＝ 7/12
  □ ＝ 7/12 × 36/7 ＝ 36/12 ＝ 3 km

【確認】
  弟：3 ÷ 4 ＝ 0.75時間 ＝ 45分
  兄：3 ÷ 18 ＝ 1/6時間 ＝ 10分
  差：45 − 10 ＝ 35分 ✓

答え：3km`,
  tags: ['速さ', '速さと比', '時間差'],
  topicUnitId: 'u6-speed',
},
];
