const PRACTICE_G6_PLANE = [
/* ════════════════════════════════════════
   平面図形 体験問題（topicUnitId: 'u6-plane'）
   initTopicTrial('u6-plane') で最大3問表示
════════════════════════════════════════ */

{
  id: 'u6_plane_trial_001',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '底辺×高さ',
  difficulty: 1, answerType: 'number', unit: 'cm²',
  title: '平行四辺形の面積（基本）',
  text: '底辺8cm、高さ5cmの平行四辺形の面積を求めなさい。',
  answer: 40,
  hint: '平行四辺形の面積 ＝ 底辺 × 高さ',
  solution: `【平行四辺形の面積】
底辺 × 高さ ＝ 8 × 5 ＝ 40cm²

答え：40cm²`,
  tags: ['平面図形', '平行四辺形', '面積'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-plane',
},

{
  id: 'u6_plane_trial_002',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '底辺×高さ÷2',
  difficulty: 1, answerType: 'number', unit: 'cm²',
  title: '三角形の面積（基本）',
  text: '底辺6cm、高さ4cmの三角形の面積を求めなさい。',
  answer: 12,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【三角形の面積】
底辺 × 高さ ÷ 2 ＝ 6 × 4 ÷ 2 ＝ 12cm²

答え：12cm²`,
  tags: ['平面図形', '三角形', '面積'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-plane',
},

{
  id: 'u6_plane_trial_003',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '台形の面積', pattern: '(上底+下底)×高さ÷2',
  difficulty: 2, answerType: 'number', unit: 'cm²',
  title: '台形の面積（基本）',
  text: '上底3cm、下底7cm、高さ4cmの台形の面積を求めなさい。',
  answer: 20,
  hint: '台形の面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2',
  solution: `【台形の面積】
(上底 ＋ 下底) × 高さ ÷ 2
＝ (3 ＋ 7) × 4 ÷ 2
＝ 10 × 4 ÷ 2
＝ 20cm²

答え：20cm²`,
  tags: ['平面図形', '台形', '面積'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-plane',
},

{
  id: 'u6_plane_trial_004',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: '分割して合計',
  difficulty: 2, answerType: 'number', unit: 'cm²',
  title: '複合図形の面積（三角形2つ）',
  text: '下の図のように、底辺10cm・高さ6cmの三角形と、底辺4cm・高さ6cmの三角形を合わせた図形の面積を求めなさい。',
  answer: 42,
  hint: '2つの三角形に分けて、それぞれの面積を求めて足す。\n三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【複合図形 ＝ 分割して合計】
①三角形1の面積：10 × 6 ÷ 2 ＝ 30cm²
②三角形2の面積：4 × 6 ÷ 2 ＝ 12cm²

③合計：30 ＋ 12 ＝ 42cm²

答え：42cm²`,
  tags: ['平面図形', '複合図形', '分割'], visualTypes: ['barModel'], isRandomGenerated: false,
  topicUnitId: 'u6-plane',
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 280 200" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="底辺10cmの三角形と底辺4cmの三角形が、頂点を共有し重ならずに並んでいる図">
      <polygon points="40,150 160,150 160,78" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="160,150 208,150 160,78" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="160" y1="78" x2="160" y2="150" stroke="#666" stroke-width="1.5" stroke-dasharray="4"/>
      <line x1="40" y1="164" x2="160" y2="164" stroke="#2E7D32" stroke-width="1.5"/>
      <line x1="40" y1="158" x2="40" y2="170" stroke="#2E7D32" stroke-width="1.5"/>
      <line x1="160" y1="158" x2="160" y2="170" stroke="#2E7D32" stroke-width="1.5"/>
      <text x="100" y="184" font-size="12" fill="#2E7D32" text-anchor="middle">10cm</text>
      <line x1="160" y1="164" x2="208" y2="164" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="208" y1="158" x2="208" y2="170" stroke="#1565C0" stroke-width="1.5"/>
      <text x="184" y="184" font-size="12" fill="#1565C0" text-anchor="middle">4cm</text>
      <text x="220" y="118" font-size="12" fill="#555" text-anchor="start">高さ 6cm</text>
    </svg>`,
  },
},

/* ════════════════════════════════════════
   平面図形 演習問題 Sprint 3 （grade:6, catId:'pc-plane'）
════════════════════════════════════════ */

/* ── 基礎公式 ★1〜2 ── */
{
  id: 'g6_plane_001',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', unit: 'cm²',
  title: '平行四辺形の面積（基本）',
  text: '底辺12cm、高さ7cmの平行四辺形の面積を求めなさい。',
  answer: 84,
  hint: '平行四辺形の面積 ＝ 底辺 × 高さ',
  solution: `【公式・考え方】
  平行四辺形の面積 ＝ 底辺 × 高さ

① 底辺：12cm
② 高さ：7cm

③ 面積を求める
  12 × 7 ＝ 84cm²

【確認】
  底辺12cm × 高さ7cm ＝ 84cm² ✓

答え：84cm²`,
  tags: ['平面図形', '平行四辺形'], visualTypes: ['barModel'], isRandomGenerated: false,
},

{
  id: 'g6_plane_002',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', unit: 'cm²',
  title: '三角形の面積（基本）',
  text: '底辺10cm、高さ8cmの三角形の面積を求めなさい。',
  answer: 40,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【公式・考え方】
  三角形の面積 ＝ 底辺 × 高さ ÷ 2

① 底辺：10cm
② 高さ：8cm

③ 面積を求める
  10 × 8 ÷ 2 ＝ 40cm²

【確認】
  底辺10cm × 高さ8cm ÷ 2 ＝ 40cm² ✓

答え：40cm²`,
  tags: ['平面図形', '三角形'], visualTypes: ['barModel'], isRandomGenerated: false,
},

{
  id: 'g6_plane_003',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '台形の面積', pattern: '公式適用',
  difficulty: 2, answerType: 'number', unit: 'cm²',
  title: '台形の面積（基本）',
  text: '上底5cm、下底9cm、高さ6cmの台形の面積を求めなさい。',
  answer: 42,
  hint: '台形の面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2',
  solution: `【公式・考え方】
  台形の面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2

① 上底：5cm、下底：9cm
② 高さ：6cm

③ 面積を求める
  (5 ＋ 9) × 6 ÷ 2
  ＝ 14 × 6 ÷ 2
  ＝ 84 ÷ 2
  ＝ 42cm²

【確認】
  (5＋9)×6÷2 ＝ 14×3 ＝ 42cm² ✓

答え：42cm²`,
  tags: ['平面図形', '台形'], visualTypes: ['barModel'], isRandomGenerated: false,
},

{
  id: 'g6_plane_004',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', unit: 'cm',
  title: '三角形の高さを求める',
  text: '面積が36cm²の三角形があります。底辺が9cmのとき、高さは何cmですか？',
  answer: 8,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【公式・考え方】
  面積 ＝ 底辺 × 高さ ÷ 2
  → 高さ ＝ 面積 × 2 ÷ 底辺

① 面積：36cm²、底辺：9cm

② 高さを求める
  高さ ＝ 36 × 2 ÷ 9
  ＝ 72 ÷ 9
  ＝ 8cm

【確認】
  9 × 8 ÷ 2 ＝ 36cm² ✓

答え：8cm`,
  tags: ['平面図形', '三角形', '逆算'], visualTypes: ['areaReverse'], isRandomGenerated: false,
},

{
  id: 'g6_plane_005',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', unit: 'cm',
  title: '平行四辺形の高さを求める',
  text: '面積が60cm²の平行四辺形があります。底辺が12cmのとき、高さは何cmですか？',
  answer: 5,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く\n高さ ＝ 面積 ÷ 底辺',
  solution: `【公式・考え方】
  面積 ＝ 底辺 × 高さ
  → 高さ ＝ 面積 ÷ 底辺

① 面積：60cm²、底辺：12cm

② 高さを求める
  高さ ＝ 60 ÷ 12
  ＝ 5cm

【確認】
  12 × 5 ＝ 60cm² ✓

答え：5cm`,
  tags: ['平面図形', '平行四辺形', '逆算'], visualTypes: ['areaReverse'], isRandomGenerated: false,
},

/* ── 複合図形・補助線 ★3 ── */
{
  id: 'g6_plane_006',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: '引き算で求める',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: '長方形から三角形を切り取る',
  text: '下の図のように、たて10cm・よこ8cmの長方形の角から、底辺4cm・高さ5cmの三角形を切り取りました。残りの図形の面積を求めなさい。',
  answer: 70,
  hint: '長方形の面積 − 三角形の面積\n三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【公式・考え方】
  残りの面積 ＝ 長方形の面積 − 三角形の面積

① 長方形の面積：10 × 8 ＝ 80cm²

② 三角形の面積：4 × 5 ÷ 2 ＝ 10cm²

③ 残りの面積：80 − 10 ＝ 70cm²

【確認】
  80 − 10 ＝ 70cm² ✓

答え：70cm²`,
  tags: ['平面図形', '複合図形', '差'], visualTypes: ['areaDecompose'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 300 235" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="たて10cm・よこ8cmの長方形の左下角から、底辺4cm・高さ5cmの三角形を切り取った残りの図形">
      <polygon points="80,115 80,35 208,35 208,195 144,195" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="80,195 144,195 80,115" fill="#F5F5F5" stroke="#9E9E9E" stroke-width="1.5" stroke-dasharray="4"/>
      <text x="101" y="178" font-size="10" fill="#9E9E9E" text-anchor="middle">切り取り</text>
      <line x1="58" y1="35" x2="58" y2="195" stroke="#E53935" stroke-width="1.5"/>
      <line x1="52" y1="35" x2="64" y2="35" stroke="#E53935" stroke-width="1.5"/>
      <line x1="52" y1="195" x2="64" y2="195" stroke="#E53935" stroke-width="1.5"/>
      <text x="38" y="115" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 38 115)">たて10cm</text>
      <line x1="80" y1="20" x2="208" y2="20" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="80" y1="14" x2="80" y2="26" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="208" y1="14" x2="208" y2="26" stroke="#1565C0" stroke-width="1.5"/>
      <text x="144" y="13" font-size="12" fill="#1565C0" text-anchor="middle">よこ8cm</text>
      <line x1="80" y1="210" x2="144" y2="210" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="80" y1="204" x2="80" y2="216" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="144" y1="204" x2="144" y2="216" stroke="#EF6C00" stroke-width="1.5"/>
      <text x="112" y="228" font-size="11" fill="#EF6C00" text-anchor="middle">4cm</text>
      <line x1="225" y1="115" x2="225" y2="195" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="219" y1="115" x2="231" y2="115" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="219" y1="195" x2="231" y2="195" stroke="#EF6C00" stroke-width="1.5"/>
      <text x="252" y="159" font-size="11" fill="#EF6C00" text-anchor="middle" transform="rotate(-90 252 159)">5cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_007',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: 'L字型',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: 'L字型の図形の面積',
  text: '下の図形（L字型）の面積を求めなさい。\n外側の長方形：たて8cm・よこ10cm\n切り取った長方形：たて3cm・よこ4cm',
  answer: 68,
  hint: '大きい長方形の面積 − 切り取った長方形の面積',
  solution: `【公式・考え方】
  L字型の面積 ＝ 大きい長方形 − 切り取った長方形

① 大きい長方形の面積：8 × 10 ＝ 80cm²

② 切り取った長方形の面積：3 × 4 ＝ 12cm²

③ L字型の面積：80 − 12 ＝ 68cm²

【確認】
  80 − 12 ＝ 68cm² ✓

答え：68cm²`,
  tags: ['平面図形', '複合図形', 'L字型'], visualTypes: ['areaDecompose'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 300 220" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="外側たて8cm・よこ10cmの長方形の右上角から、たて3cm・よこ4cmの長方形を切り取ったL字型の図">
      <polygon points="60,40 156,40 156,88 220,88 220,168 60,168" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <rect x="156" y="40" width="64" height="48" fill="none" stroke="#BDBDBD" stroke-width="1.5" stroke-dasharray="4"/>
      <text x="188" y="68" font-size="11" fill="#9E9E9E" text-anchor="middle">切り取り</text>
      <line x1="60" y1="182" x2="220" y2="182" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="60" y1="176" x2="60" y2="188" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="220" y1="176" x2="220" y2="188" stroke="#1565C0" stroke-width="1.5"/>
      <text x="140" y="202" font-size="12" fill="#1565C0" text-anchor="middle">10cm</text>
      <line x1="40" y1="40" x2="40" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <line x1="34" y1="40" x2="46" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="34" y1="168" x2="46" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <text x="20" y="104" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 20 104)">8cm</text>
      <line x1="156" y1="22" x2="220" y2="22" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="156" y1="16" x2="156" y2="28" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="220" y1="16" x2="220" y2="28" stroke="#EF6C00" stroke-width="1.5"/>
      <text x="188" y="14" font-size="11" fill="#EF6C00" text-anchor="middle">4cm</text>
      <line x1="238" y1="40" x2="238" y2="88" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="232" y1="40" x2="244" y2="40" stroke="#EF6C00" stroke-width="1.5"/>
      <line x1="232" y1="88" x2="244" y2="88" stroke="#EF6C00" stroke-width="1.5"/>
      <text x="260" y="68" font-size="11" fill="#EF6C00" text-anchor="middle">3cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_008',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '台形の面積', pattern: '辺の逆算',
  difficulty: 3, answerType: 'number', unit: 'cm',
  title: '台形の下底を求める',
  text: '面積が48cm²の台形があります。上底4cm、高さ6cmのとき、下底は何cmですか？',
  answer: 12,
  hint: '面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2 を下底について解く\n上底 ＋ 下底 ＝ 面積 × 2 ÷ 高さ',
  solution: `【公式・考え方】
  面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2
  → 上底 ＋ 下底 ＝ 面積 × 2 ÷ 高さ
  → 下底 ＝ (面積 × 2 ÷ 高さ) − 上底

① 面積：48cm²、上底：4cm、高さ：6cm

② 上底 ＋ 下底 ＝ 48 × 2 ÷ 6 ＝ 96 ÷ 6 ＝ 16cm

③ 下底 ＝ 16 − 4 ＝ 12cm

【確認】
  (4＋12)×6÷2 ＝ 16×3 ＝ 48cm² ✓

答え：12cm`,
  tags: ['平面図形', '台形', '逆算'], visualTypes: ['areaReverse'], isRandomGenerated: false,
},

{
  id: 'g6_plane_009',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '補助線', pattern: '対角線で分割',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: '平行四辺形を対角線で分ける',
  text: '平行四辺形ABCDがあります。平行四辺形の底辺BCは10cm、高さは6cmです。\n対角線BDで2つの三角形に分けたとき、三角形ABDの面積を求めなさい。',
  answer: 30,
  hint: '平行四辺形を対角線で分けると、2つの三角形の面積は等しい\n三角形の面積 ＝ 平行四辺形の面積 ÷ 2',
  solution: `【公式・考え方】
  平行四辺形を対角線で分けると2つの合同な三角形ができる
  三角形ABDの面積 ＝ 平行四辺形ABCD の面積 ÷ 2

① 平行四辺形の面積：10 × 6 ＝ 60cm²

② 三角形ABDの面積：60 ÷ 2 ＝ 30cm²

【確認】
  対角線で分けた三角形は必ず面積が等しい ✓

答え：30cm²`,
  tags: ['平面図形', '補助線', '平行四辺形'], visualTypes: ['auxiliaryLine'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 320 210" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="平行四辺形ABCDに対角線BDを引き、三角形ABDを示した図">
      <polygon points="100,72 60,168 220,168 260,72" fill="none" stroke="#555" stroke-width="1.5"/>
      <polygon points="100,72 60,168 260,72" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
      <line x1="60" y1="168" x2="260" y2="72" stroke="#555" stroke-width="1.5"/>
      <text x="92" y="64" font-size="13" fill="#1a1a2e" text-anchor="middle">A</text>
      <text x="52" y="182" font-size="13" fill="#1a1a2e" text-anchor="middle">B</text>
      <text x="228" y="182" font-size="13" fill="#1a1a2e" text-anchor="middle">C</text>
      <text x="268" y="64" font-size="13" fill="#1a1a2e" text-anchor="middle">D</text>
      <line x1="60" y1="182" x2="220" y2="182" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="60" y1="176" x2="60" y2="188" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="220" y1="176" x2="220" y2="188" stroke="#1565C0" stroke-width="1.5"/>
      <text x="140" y="202" font-size="12" fill="#1565C0" text-anchor="middle">底辺BC 10cm</text>
      <line x1="220" y1="72" x2="220" y2="168" stroke="#E53935" stroke-width="1.5" stroke-dasharray="4"/>
      <text x="298" y="123" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 298 123)">高さ 6cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_010',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '補助線', pattern: '底辺の比と面積比',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: '補助線で分けた三角形の面積',
  text: '底辺12cm・高さ8cmの三角形の中に、頂点から底辺に補助線を引いて2つに分けました。\n補助線が底辺を3:1に分けるとき、大きい三角形の面積を求めなさい。',
  answer: 36,
  hint: '底辺の比 ＝ 3:1 → 面積の比も 3:1\n全体の面積 ＝ 12 × 8 ÷ 2 ＝ 48cm²\n大きい方 ＝ 48 × 3/4',
  solution: `【公式・考え方】
  高さが同じ三角形の面積比 ＝ 底辺の比

① 全体の三角形の面積：12 × 8 ÷ 2 ＝ 48cm²

② 底辺の比が 3:1 なので面積比も 3:1
  全体を 3＋1＝4 に分ける

③ 大きい三角形の面積：48 × 3/4 ＝ 36cm²

【確認】
  小さい方 ＝ 48 × 1/4 ＝ 12cm²
  36 ＋ 12 ＝ 48cm² ✓

答え：36cm²`,
  tags: ['平面図形', '補助線', '面積比'], visualTypes: ['areaRatio', 'auxiliaryLine'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 290 225" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="底辺12cm・高さ8cmの三角形を、頂点からの補助線で底辺を3:1に分けた図">
      <polygon points="40,168 184,168 184,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
      <polygon points="184,168 232,168 184,40" fill="none" stroke="#555" stroke-width="1.5"/>
      <line x1="184" y1="40" x2="184" y2="168" stroke="#555" stroke-width="1.5" stroke-dasharray="4"/>
      <text x="112" y="186" font-size="13" fill="#F57F17" text-anchor="middle" font-weight="bold">3</text>
      <text x="208" y="186" font-size="13" fill="#555" text-anchor="middle" font-weight="bold">1</text>
      <line x1="40" y1="200" x2="232" y2="200" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="194" x2="40" y2="206" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="232" y1="194" x2="232" y2="206" stroke="#1565C0" stroke-width="1.5"/>
      <text x="136" y="216" font-size="12" fill="#1565C0" text-anchor="middle">底辺 12cm</text>
      <line x1="252" y1="40" x2="252" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <line x1="246" y1="40" x2="258" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="246" y1="168" x2="258" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <text x="270" y="104" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 270 104)">高さ 8cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_011',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: '三角形＋台形',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: '三角形と台形の複合図形',
  text: '下の図のように、底辺14cm・高さ9cmの三角形と、上底3cm・下底7cm・高さ9cmの台形が合わさった図形の面積を求めなさい。',
  answer: 108,
  hint: '三角形の面積 ＋ 台形の面積\nそれぞれを公式で計算して足す',
  solution: `【公式・考え方】
  複合図形の面積 ＝ 三角形の面積 ＋ 台形の面積

① 三角形の面積：14 × 9 ÷ 2 ＝ 63cm²

② 台形の面積：(3＋7) × 9 ÷ 2 ＝ 10 × 9 ÷ 2 ＝ 45cm²

③ 合計：63 ＋ 45 ＝ 108cm²

【確認】
  63 ＋ 45 ＝ 108cm² ✓

答え：108cm²`,
  tags: ['平面図形', '複合図形', '三角形', '台形'], visualTypes: ['areaDecompose'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 400 225" width="100%" style="max-width:340px;display:block;margin:0 auto" role="img" aria-label="底辺14cm・高さ9cmの三角形と、上底3cm・下底7cm・高さ9cmの台形が、境界を共有して並んでいる図">
      <polygon points="40,180 236,180 236,54" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="236,54 278,54 334,180 236,180" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="194" x2="236" y2="194" stroke="#2E7D32" stroke-width="1.5"/>
      <line x1="40" y1="188" x2="40" y2="200" stroke="#2E7D32" stroke-width="1.5"/>
      <line x1="236" y1="188" x2="236" y2="200" stroke="#2E7D32" stroke-width="1.5"/>
      <text x="138" y="212" font-size="12" fill="#2E7D32" text-anchor="middle">14cm</text>
      <line x1="236" y1="194" x2="334" y2="194" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="334" y1="188" x2="334" y2="200" stroke="#1565C0" stroke-width="1.5"/>
      <text x="285" y="212" font-size="12" fill="#1565C0" text-anchor="middle">下底7cm</text>
      <line x1="236" y1="40" x2="278" y2="40" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="236" y1="34" x2="236" y2="46" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="278" y1="34" x2="278" y2="46" stroke="#1565C0" stroke-width="1.5"/>
      <text x="257" y="27" font-size="11" fill="#1565C0" text-anchor="middle">上底3cm</text>
      <line x1="354" y1="54" x2="354" y2="180" stroke="#E53935" stroke-width="1.5"/>
      <line x1="348" y1="54" x2="360" y2="54" stroke="#E53935" stroke-width="1.5"/>
      <line x1="348" y1="180" x2="360" y2="180" stroke="#E53935" stroke-width="1.5"/>
      <text x="378" y="117" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 378 117)">高さ 9cm</text>
    </svg>`,
  },
},

/* ── 等積変形・面積比 ★4〜5 ── */
{
  id: 'g6_plane_012',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形', pattern: '等積変形',
  difficulty: 2, answerType: 'number', unit: 'cm',
  title: '等積変形で高さを求める',
  text: '底辺8cm・高さ6cmの三角形と、面積が等しい平行四辺形を作ります。\n平行四辺形の底辺を8cmにするとき、高さは何cmですか？',
  answer: 3,
  hint: '三角形の面積 ＝ 平行四辺形の面積\n三角形: 8×6÷2＝24cm²\n平行四辺形の高さ ＝ 面積 ÷ 底辺',
  solution: `【公式・考え方】
  三角形の面積 ＝ 平行四辺形の面積 として高さを逆算する

① 三角形の面積：8 × 6 ÷ 2 ＝ 24cm²

② 平行四辺形の高さ：24 ÷ 8 ＝ 3cm

【確認】
  平行四辺形：8 × 3 ＝ 24cm²
  三角形：8 × 6 ÷ 2 ＝ 24cm²（等しい） ✓

答え：3cm`,
  tags: ['平面図形', '等積変形'], visualTypes: ['equalArea'], isRandomGenerated: false,
},

{
  id: 'g6_plane_013',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '面積比', pattern: '底辺の比と面積比',
  difficulty: 2, answerType: 'number', unit: 'cm²',
  title: '底辺の比から面積を求める',
  text: '2つの三角形があります。三角形Aの底辺は三角形Bの底辺の2倍で、高さは同じです。\n三角形Bの面積が15cm²のとき、三角形Aの面積を求めなさい。',
  answer: 30,
  hint: '高さが同じなら、面積の比 ＝ 底辺の比\n底辺が2倍 → 面積も2倍',
  solution: `【公式・考え方】
  高さが同じ三角形：面積の比 ＝ 底辺の比

① 三角形Aの底辺 ＝ 三角形Bの底辺 × 2
  → 面積の比も 2:1

② 三角形Aの面積 ＝ 三角形Bの面積 × 2
  ＝ 15 × 2 ＝ 30cm²

【確認】
  底辺2倍・高さ同じ → 面積2倍
  15 × 2 ＝ 30cm² ✓

答え：30cm²`,
  tags: ['平面図形', '面積比', '三角形'], visualTypes: ['areaRatio'], isRandomGenerated: false,
},

{
  id: 'g6_plane_014',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '面積比', pattern: '相似と面積比',
  difficulty: 3, answerType: 'number', unit: 'cm²',
  title: '相似比と面積比',
  text: '相似比が1:3の2つの正方形があります。小さい正方形の面積が4cm²のとき、大きい正方形の面積を求めなさい。',
  answer: 36,
  hint: '相似比が1:3 → 面積比は1²:3² ＝ 1:9\n大きい正方形の面積 ＝ 4 × 9',
  solution: `【公式・考え方】
  相似比が m:n → 面積比は m²:n²

① 相似比 1:3 → 面積比 1²:3² ＝ 1:9

② 大きい正方形の面積 ＝ 小さい正方形の面積 × 9
  ＝ 4 × 9 ＝ 36cm²

【確認】
  相似比1:3 → 辺の長さも1:3
  小の辺：2×2＝4なので一辺2cm → 大の辺：2 × 3 ＝ 6cm
  大の面積：6² ＝ 36cm² ✓

答え：36cm²`,
  tags: ['平面図形', '面積比', '相似'], visualTypes: ['areaRatio'], isRandomGenerated: false,
},

{
  id: 'g6_plane_015',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形・面積比', pattern: '対角線で4分割',
  difficulty: 3, answerType: 'number', unit: '%',
  title: '対角線で4分割した三角形の面積比',
  text: '底辺10cm・高さ8cmの平行四辺形ABCDがあります。\n2本の対角線ACとBDを引いて4つの三角形に分けたとき、向かい合う三角形（三角形OABと三角形OCD）の面積の和は全体の何%ですか？',
  answer: 50,
  hint: '平行四辺形の対角線は交点Oで互いを二等分する（AO＝OC、BO＝OD）\nこのとき4つの三角形はすべて面積が等しくなる',
  solution: `【公式・考え方】
  平行四辺形の対角線は、交点で互いを二等分する（AO＝OC、BO＝OD）
  この性質から、4つの三角形はすべて同じ面積になる

① 平行四辺形の面積：10 × 8 ＝ 80cm²

② 三角形OABと三角形OBCを比べると、底辺AOとOCは同じ直線AC上にあり長さが等しい
  頂点Bから直線ACまでの高さも共通なので、2つの面積は等しい
  同じ考え方で、4つの三角形OAB・OBC・OCD・ODAはすべて面積が等しい

③ 4等分なので、三角形1つ分は全体の 1/4（25%）

④ 向かい合う三角形OABとOCDの面積の和：25% × 2 ＝ 50%

【確認】
  80cm² ÷ 4 ＝ 20cm²（三角形1つ分）
  20 × 2 ＝ 40cm² → 40 ÷ 80 × 100 ＝ 50% ✓

答え：50%`,
  tags: ['平面図形', '面積比', '等積変形', '対角線'], visualTypes: ['areaRatio', 'auxiliaryLine'], isRandomGenerated: false,
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 320 220" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="平行四辺形ABCDに対角線ACとBDを引き、交点をOとした図">
      <polygon points="100,40 260,40 220,168 60,168" fill="#B3E5FC" stroke="#0277BD" stroke-width="2"/>
      <line x1="100" y1="40" x2="220" y2="168" stroke="#0277BD" stroke-width="1.5"/>
      <line x1="260" y1="40" x2="60" y2="168" stroke="#0277BD" stroke-width="1.5"/>
      <circle cx="160" cy="104" r="3" fill="#1a1a2e"/>
      <text x="168" y="101" font-size="12" fill="#1a1a2e">O</text>
      <text x="92" y="32" font-size="13" fill="#1a1a2e" text-anchor="middle">A</text>
      <text x="268" y="32" font-size="13" fill="#1a1a2e" text-anchor="middle">B</text>
      <text x="228" y="182" font-size="13" fill="#1a1a2e" text-anchor="middle">C</text>
      <text x="52" y="182" font-size="13" fill="#1a1a2e" text-anchor="middle">D</text>
      <line x1="60" y1="192" x2="220" y2="192" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="60" y1="186" x2="60" y2="198" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="220" y1="186" x2="220" y2="198" stroke="#1565C0" stroke-width="1.5"/>
      <text x="140" y="212" font-size="12" fill="#1565C0" text-anchor="middle">底辺 10cm</text>
      <line x1="220" y1="40" x2="220" y2="168" stroke="#E53935" stroke-width="1.5" stroke-dasharray="4"/>
      <text x="298" y="107" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 298 107)">高さ 8cm</text>
    </svg>`,
  },
},
];
