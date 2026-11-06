const PRACTICE_G6_PLANE = [
/* ════════════════════════════════════════
   平面図形 体験問題（topicUnitId: 'u6-plane'）
   initTopicTrial('u6-plane') で最大3問表示
════════════════════════════════════════ */

{
  id: 'u6_plane_trial_001',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '底辺×高さ',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '平行四辺形の面積（基本）',
  text: '底辺8cm、高さ5cmの平行四辺形の面積を求めなさい。',
  answer: 40,
  hint: '平行四辺形の面積 ＝ 底辺 × 高さ',
  solution: `【ポイント】
平行四辺形の面積は、底辺×高さで求められる。

【解説】
① 底辺は8cm、高さは5cm。
② 平行四辺形の面積は、底辺×高さなので、8×5を計算する。
③ 8×5＝40cm²。

【広げてみよう】
平行四辺形は、片方の端を切り取ってもう片方にくっつけると、底辺×高さの長方形になる。形が傾いていても、底辺に垂直な高ささえわかれば、長方形と同じしくみで面積が求められる。

【確認】
底辺8cm×高さ5cm＝40cm²。

答え：40cm²`,
  expandVisual: 'parallelogram-cut',
  expandVisualData: { base: 8, height: 5, area: 40 },
  tags: ['平面図形', '平行四辺形', '面積'],
  topicUnitId: 'u6-plane',
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 268 160" width="100%" style="max-width:268px;display:block;margin:0 auto" role="img" aria-label="平行四辺形の図">
      <polygon points="66,40 178,40 152,110 40,110" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <line x1="40" y1="124" x2="152" y2="124" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="118" x2="40" y2="130" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="152" y1="118" x2="152" y2="130" stroke="#1565C0" stroke-width="1.5"/>
      <text x="96" y="144" font-size="12" fill="#1565C0" text-anchor="middle">底辺 8cm</text>
      <line x1="168" y1="40" x2="168" y2="110" stroke="#E53935" stroke-width="1.5"/>
      <line x1="162" y1="40" x2="174" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="162" y1="110" x2="174" y2="110" stroke="#E53935" stroke-width="1.5"/>
      <text x="186" y="75" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 186 75)">高さ 5cm</text>
    </svg>`,
  },
},

{
  id: 'u6_plane_trial_002',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '底辺×高さ÷2',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '三角形の面積（基本）',
  text: '底辺6cm、高さ4cmの三角形の面積を求めなさい。',
  answer: 12,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【ポイント】
三角形の面積は、底辺×高さ÷2で求められる。

【解説】
① 底辺は6cm、高さは4cm。
② 三角形の面積は、底辺×高さ÷2なので、6×4÷2を計算する。
③ 6×4÷2＝12cm²。

【広げてみよう】
同じ三角形をもう1つ180°回転させて組み合わせると、底辺・高さが同じ平行四辺形になる。三角形の面積が÷2になるのは、平行四辺形をちょうど半分に分けた形だから。

【確認】
6×4＝24(組み合わせた平行四辺形の面積)、24÷2＝12で一致する。

答え：12cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 6, height: 4, area: 12 },
  tags: ['平面図形', '三角形', '面積'],
  topicUnitId: 'u6-plane',
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 214 146" width="100%" style="max-width:214px;display:block;margin:0 auto" role="img" aria-label="三角形の図">
      <polygon points="40,96 124,96 82,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="110" x2="124" y2="110" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="104" x2="40" y2="116" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="124" y1="104" x2="124" y2="116" stroke="#1565C0" stroke-width="1.5"/>
      <text x="82" y="130" font-size="12" fill="#1565C0" text-anchor="middle">底辺 6cm</text>
      <line x1="140" y1="40" x2="140" y2="96" stroke="#E53935" stroke-width="1.5"/>
      <line x1="134" y1="40" x2="146" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="134" y1="96" x2="146" y2="96" stroke="#E53935" stroke-width="1.5"/>
      <text x="158" y="68" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 158 68)">高さ 4cm</text>
    </svg>`,
  },
},

{
  id: 'u6_plane_trial_003',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '台形の面積', pattern: '(上底+下底)×高さ÷2',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '台形の面積（基本）',
  text: '上底3cm、下底7cm、高さ4cmの台形の面積を求めなさい。',
  answer: 20,
  hint: '台形の面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2',
  solution: `【ポイント】
台形の面積は、(上底＋下底)×高さ÷2で求められる。

【解説】
① 上底は3cm、下底は7cm、高さは4cm。
② 台形の面積は、(上底＋下底)×高さ÷2なので、(3＋7)×4÷2を計算する。
③ (3＋7)×4÷2＝10×4÷2＝40÷2＝20cm²。

【広げてみよう】
同じ台形をもう1つ180°回転させて組み合わせると、底辺が(上底＋下底)、高さが同じ平行四辺形になる。台形の面積が÷2になるのは三角形の公式と同じしくみ。

【確認】
(3＋7)×4＝40(組み合わせた平行四辺形の面積)、40÷2＝20で一致する。

答え：20cm²`,
  expandVisual: 'trapezoid-rotate',
  expandVisualData: { upper: 3, lower: 7, height: 4, area: 20 },
  tags: ['平面図形', '台形', '面積'],
  topicUnitId: 'u6-plane',
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 228 146" width="100%" style="max-width:228px;display:block;margin:0 auto" role="img" aria-label="台形の図">
      <polygon points="40,40 82,40 138,96 40,96" fill="#FFB74D" stroke="#E65100" stroke-width="2"/>
      <line x1="40" y1="26" x2="82" y2="26" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="82" y1="20" x2="82" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <text x="61" y="16" font-size="11" fill="#1565C0" text-anchor="middle">上底3cm</text>
      <line x1="40" y1="110" x2="138" y2="110" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="104" x2="40" y2="116" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="138" y1="104" x2="138" y2="116" stroke="#1565C0" stroke-width="1.5"/>
      <text x="89" y="130" font-size="12" fill="#1565C0" text-anchor="middle">下底7cm</text>
      <line x1="154" y1="40" x2="154" y2="96" stroke="#E53935" stroke-width="1.5"/>
      <line x1="148" y1="40" x2="160" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="148" y1="96" x2="160" y2="96" stroke="#E53935" stroke-width="1.5"/>
      <text x="172" y="68" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 172 68)">高さ4cm</text>
    </svg>`,
  },
},

{
  id: 'u6_plane_trial_004',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: '分割して合計',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '複合図形の面積（三角形2つ）',
  text: '下の図のように、底辺10cm・高さ6cmの三角形と、底辺4cm・高さ6cmの三角形を合わせた図形の面積を求めなさい。',
  answer: 42,
  hint: '2つの三角形に分けて、それぞれの面積を求めて足す。\n三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【ポイント】
複合図形は、知っている形(三角形など)に分けて、それぞれの面積を足せば求められる。

【解説】
① 三角形1の面積は10×6÷2＝30cm²。
② 三角形2の面積は4×6÷2＝12cm²。
③ 合計は30＋12＝42cm²。

【広げてみよう】
この2つの三角形は、同じ頂点を共有していて、底辺が一直線に並んでいる。だから、分けずに底辺を10＋4＝14cmとした1つの三角形と見ることもできる。14×6÷2＝42cm²で、分けて計算したときと同じ答えになる。

【確認】
42－12＝30cm²で、三角形1の面積と一致する。

答え：42cm²`,
  expandVisual: 'merge-triangles',
  expandVisualData: { base1: 10, base2: 4, height: 6, area: 42 },
  tags: ['平面図形', '複合図形', '分割'],
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
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '平行四辺形の面積（基本）',
  text: '底辺12cm、高さ7cmの平行四辺形の面積を求めなさい。',
  answer: 84,
  hint: '平行四辺形の面積 ＝ 底辺 × 高さ',
  solution: `【ポイント】
平行四辺形の面積は、底辺×高さで求められる。

【解説】
① 底辺は12cm、高さは7cm。
② 平行四辺形の面積は、底辺×高さなので、12×7を計算する。
③ 12×7＝84cm²。

【広げてみよう】
平行四辺形は、片方の端を切り取ってもう片方にくっつけると、底辺×高さの長方形になる。形が傾いていても、底辺に垂直な高ささえわかれば、長方形と同じしくみで面積が求められる。

【確認】
底辺12cm×高さ7cm＝84cm²。

答え：84cm²`,
  expandVisual: 'parallelogram-cut',
  expandVisualData: { base: 12, height: 7, area: 84 },
  tags: ['平面図形', '平行四辺形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 324 188" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="平行四辺形の図">
      <polygon points="66,40 234,40 208,138 40,138" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <line x1="40" y1="152" x2="208" y2="152" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="146" x2="40" y2="158" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="208" y1="146" x2="208" y2="158" stroke="#1565C0" stroke-width="1.5"/>
      <text x="124" y="172" font-size="12" fill="#1565C0" text-anchor="middle">底辺 12cm</text>
      <line x1="224" y1="40" x2="224" y2="138" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="40" x2="230" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="138" x2="230" y2="138" stroke="#E53935" stroke-width="1.5"/>
      <text x="242" y="89" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 242 89)">高さ 7cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_002',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '三角形の面積（基本）',
  text: '底辺10cm、高さ8cmの三角形の面積を求めなさい。',
  answer: 40,
  hint: '三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【ポイント】
三角形の面積は、底辺×高さ÷2で求められる。

【解説】
① 底辺は10cm、高さは8cm。
② 三角形の面積は、底辺×高さ÷2なので、10×8÷2を計算する。
③ 10×8÷2＝40cm²。

【広げてみよう】
同じ三角形をもう1つ180°回転させて組み合わせると、底辺・高さが同じ平行四辺形になる。三角形の面積が÷2になるのは、平行四辺形をちょうど半分に分けた形だから。

【確認】
10×8＝80(組み合わせた平行四辺形の面積)、80÷2＝40で一致する。

答え：40cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 10, height: 8, area: 40 },
  tags: ['平面図形', '三角形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 270 202" width="100%" style="max-width:270px;display:block;margin:0 auto" role="img" aria-label="三角形の図">
      <polygon points="40,152 180,152 110,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="166" x2="180" y2="166" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="160" x2="40" y2="172" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="180" y1="160" x2="180" y2="172" stroke="#1565C0" stroke-width="1.5"/>
      <text x="110" y="186" font-size="12" fill="#1565C0" text-anchor="middle">底辺 10cm</text>
      <line x1="196" y1="40" x2="196" y2="152" stroke="#E53935" stroke-width="1.5"/>
      <line x1="190" y1="40" x2="202" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="190" y1="152" x2="202" y2="152" stroke="#E53935" stroke-width="1.5"/>
      <text x="214" y="96" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 214 96)">高さ 8cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_003',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '台形の面積', pattern: '公式適用',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '台形の面積（基本）',
  text: '上底5cm、下底9cm、高さ6cmの台形の面積を求めなさい。',
  answer: 42,
  hint: '台形の面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2',
  solution: `【ポイント】
台形の面積は、(上底＋下底)×高さ÷2で求められる。

【解説】
① 上底は5cm、下底は9cm、高さは6cm。
② 台形の面積は、(上底＋下底)×高さ÷2なので、(5＋9)×6÷2を計算する。
③ (5＋9)×6÷2＝14×6÷2＝84÷2＝42cm²。

【広げてみよう】
同じ台形をもう1つ180°回転させて組み合わせると、底辺が(上底＋下底)、高さが同じ平行四辺形になる。台形の面積が÷2になるのは三角形の公式と同じしくみ。

【確認】
(5＋9)×6＝84(組み合わせた平行四辺形の面積)、84÷2＝42で一致する。

答え：42cm²`,
  expandVisual: 'trapezoid-rotate',
  expandVisualData: { upper: 5, lower: 9, height: 6, area: 42 },
  tags: ['平面図形', '台形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 256 174" width="100%" style="max-width:256px;display:block;margin:0 auto" role="img" aria-label="台形の図">
      <polygon points="40,40 110,40 166,124 40,124" fill="#FFB74D" stroke="#E65100" stroke-width="2"/>
      <line x1="40" y1="26" x2="110" y2="26" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="110" y1="20" x2="110" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <text x="75" y="16" font-size="11" fill="#1565C0" text-anchor="middle">上底5cm</text>
      <line x1="40" y1="138" x2="166" y2="138" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="132" x2="40" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="166" y1="132" x2="166" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <text x="103" y="158" font-size="12" fill="#1565C0" text-anchor="middle">下底9cm</text>
      <line x1="182" y1="40" x2="182" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <line x1="176" y1="40" x2="188" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="176" y1="124" x2="188" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <text x="200" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 200 82)">高さ6cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_004',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '三角形の高さを求める',
  text: '面積が36cm²の三角形があります。底辺が9cmのとき、高さは何cmですか？',
  answer: 8,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 三角形の面積は、底辺×高さ÷2。
② 面積36cm²、底辺9cmなので、高さ×9÷2＝36という式になる。
③ 高さ＝36×2÷9＝8cm。

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、どの文字について求めたいかを変えても使える。面積と底辺が分かれば高さを、面積と高さが分かれば底辺を、同じしくみで逆算できる。

【確認】
9×8÷2＝36cm²で、もとの面積と一致する。

答え：8cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 9, height: 8, area: 36 },
  tags: ['平面図形', '三角形', '逆算'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 256 202" width="100%" style="max-width:256px;display:block;margin:0 auto" role="img" aria-label="三角形の図">
      <polygon points="40,152 166,152 103,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <text x="103" y="116.16" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積36cm²</text>
      <line x1="40" y1="166" x2="166" y2="166" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="160" x2="40" y2="172" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="166" y1="160" x2="166" y2="172" stroke="#1565C0" stroke-width="1.5"/>
      <text x="103" y="186" font-size="12" fill="#1565C0" text-anchor="middle">底辺 9cm</text>
      <line x1="182" y1="40" x2="182" y2="152" stroke="#E53935" stroke-width="1.5"/>
      <line x1="176" y1="40" x2="188" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="176" y1="152" x2="188" y2="152" stroke="#E53935" stroke-width="1.5"/>
      <text x="200" y="96" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 200 96)">高さ ？</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_005',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の高さを求める',
  text: '面積が60cm²の平行四辺形があります。底辺が12cmのとき、高さは何cmですか？',
  answer: 5,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く\n高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 平行四辺形の面積は、底辺×高さ。
② 面積60cm²、底辺12cmなので、高さ×12＝60という式になる。
③ 高さ＝60÷12＝5cm。

【広げてみよう】
「底辺×高さ＝面積」の公式は、底辺・高さ・面積のうち2つが分かれば残り1つを求められる。三角形の公式(÷2が付く)も同じ考え方で逆算できる。

【確認】
12×5＝60cm²で、もとの面積と一致する。

答え：5cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 12, height: 5, area: 60 },
  tags: ['平面図形', '平行四辺形', '逆算'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 324 160" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="平行四辺形の図">
      <polygon points="66,40 234,40 208,110 40,110" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <text x="137" y="79" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積60cm²</text>
      <line x1="40" y1="124" x2="208" y2="124" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="118" x2="40" y2="130" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="208" y1="118" x2="208" y2="130" stroke="#1565C0" stroke-width="1.5"/>
      <text x="124" y="144" font-size="12" fill="#1565C0" text-anchor="middle">底辺 12cm</text>
      <line x1="224" y1="40" x2="224" y2="110" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="40" x2="230" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="110" x2="230" y2="110" stroke="#E53935" stroke-width="1.5"/>
      <text x="242" y="75" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 242 75)">高さ ？</text>
    </svg>`,
  },
},

/* ── 複合図形・補助線 ★3 ── */
{
  id: 'g6_plane_006',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '複合図形', pattern: '引き算で求める',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '長方形から三角形を切り取る',
  text: '下の図のように、たて10cm・よこ8cmの長方形の角から、底辺4cm・高さ5cmの三角形を切り取りました。残りの図形の面積を求めなさい。',
  answer: 70,
  hint: '長方形の面積 − 三角形の面積\n三角形の面積 ＝ 底辺 × 高さ ÷ 2',
  solution: `【ポイント】
複合図形の面積は、もとの形から欠けた部分を引けば求められる。

【解説】
① 長方形の面積は10×8＝80cm²。
② 切り取った三角形の面積は4×5÷2＝10cm²。
③ 残りの面積は、長方形から三角形を引いて80－10＝70cm²。

【広げてみよう】
欠けた部分があって直接公式が使えない図形でも、「全体－欠けた部分」と考えれば、知っている公式(長方形・三角形)だけで求められる。

【確認】
70＋10＝80cm²で、もとの長方形の面積と一致する。

答え：70cm²`,
  expandVisual: 'subtract-triangle',
  expandVisualData: { resultText: '残りの面積 → 80－10＝70cm²' },
  tags: ['平面図形', '複合図形', '差'],
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
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: 'L字型の図形の面積',
  text: '下の図形（L字型）の面積を求めなさい。\n外側の長方形：たて8cm・よこ10cm\n切り取った長方形：たて3cm・よこ4cm',
  answer: 68,
  hint: '大きい長方形の面積 − 切り取った長方形の面積',
  solution: `【ポイント】
L字型も、欠けた長方形を引けば求められる。

【解説】
① 外側の大きい長方形の面積は8×10＝80cm²。
② 切り取った長方形の面積は3×4＝12cm²。
③ L字型の面積は、80－12＝68cm²。

【広げてみよう】
L字型は、欠けた角を補って大きい長方形に戻してから引く以外に、2つの長方形に分けて足す方法でも求められる。

【別解】
たて8cmを保ったまま、よこを6cmと4cmの2つの長方形に分ける。
左の長方形：6×8＝48cm²
右下の長方形：4×(8－3)＝4×5＝20cm²
合計：48＋20＝68cm²（同じ答えになる）

【確認】
68＋12＝80cm²で、もとの長方形の面積と一致する。

答え：68cm²`,
  expandVisual: 'subtract-rect',
  expandVisualData: { resultText: 'L字型の面積 → 80－12＝68cm²' },
  tags: ['平面図形', '複合図形', 'L字型'],
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
  difficulty: 3, answerType: 'number', answerUnit: 'cm',
  title: '台形の下底を求める',
  text: '面積が48cm²の台形があります。上底4cm、高さ6cmのとき、下底は何cmですか？',
  answer: 12,
  hint: '面積 ＝ (上底 ＋ 下底) × 高さ ÷ 2 を下底について解く\n上底 ＋ 下底 ＝ 面積 × 2 ÷ 高さ',
  solution: `【ポイント】
台形の面積公式も逆向きに使うと、上底・下底・高さのどれかを求められる。

【解説】
① 台形の面積は(上底＋下底)×高さ÷2。
② 面積48cm²、上底4cm、高さ6cmなので、(4＋下底)×6÷2＝48という式になる。
③ 4＋下底＝48×2÷6＝16なので、下底＝16－4＝12cm。

【広げてみよう】
式を1段階ずつ逆にたどれば、どんな公式も「知りたい文字」について解くことができる。(上底＋下底)をひとかたまりとして先に求めてから、上底を引いて下底だけを取り出すのがコツ。

【確認】
(4＋12)×6÷2＝96÷2＝48cm²で、もとの面積と一致する。

答え：12cm`,
  expandVisual: 'trapezoid-formula-slot',
  expandVisualData: { upper: 4, lower: 12, height: 6, area: 48 },
  tags: ['平面図形', '台形', '逆算'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 298 174" width="100%" style="max-width:298px;display:block;margin:0 auto" role="img" aria-label="台形の図">
      <polygon points="40,40 96,40 208,124 40,124" fill="#FFB74D" stroke="#E65100" stroke-width="2"/>
      <text x="96" y="86" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積48cm²</text>
      <line x1="40" y1="26" x2="96" y2="26" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="96" y1="20" x2="96" y2="32" stroke="#1565C0" stroke-width="1.5"/>
      <text x="68" y="16" font-size="11" fill="#1565C0" text-anchor="middle">上底4cm</text>
      <line x1="40" y1="138" x2="208" y2="138" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="132" x2="40" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="208" y1="132" x2="208" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <text x="124" y="158" font-size="12" fill="#1565C0" text-anchor="middle">下底 ？</text>
      <line x1="224" y1="40" x2="224" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="40" x2="230" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="218" y1="124" x2="230" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <text x="242" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 242 82)">高さ6cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_009',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '補助線', pattern: '対角線で分割',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '平行四辺形を対角線で分ける',
  text: '平行四辺形ABCDがあります。平行四辺形の底辺BCは10cm、高さは6cmです。\n対角線BDで2つの三角形に分けたとき、三角形ABDの面積を求めなさい。',
  answer: 30,
  hint: '平行四辺形を対角線で分けると、2つの三角形の面積は等しい\n三角形の面積 ＝ 平行四辺形の面積 ÷ 2',
  solution: `【ポイント】
平行四辺形を対角線で分けると、できる2つの三角形の面積は必ず等しい。

【解説】
① 平行四辺形の面積は10×6＝60cm²。
② 対角線BDで分けた三角形ABDと三角形CBDは、向かい合う辺の長さが等しく対角線BDを共有する合同な三角形なので、面積も等しい。
③ 三角形ABDの面積は、60÷2＝30cm²。

【広げてみよう】
三角形ABDを、対角線BDの真ん中の点を軸に180°回転させると、ぴったり三角形CBDに重なる。これは平行四辺形の向かい合う辺の長さが等しいから成り立つ。

【確認】
30＋30＝60cm²で、もとの平行四辺形の面積と一致する。

答え：30cm²`,
  expandVisual: 'diagonal-rotate',
  expandVisualData: { area: 60, halfArea: 30 },
  tags: ['平面図形', '補助線', '平行四辺形'],
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
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '補助線で分けた三角形の面積',
  text: '底辺12cm・高さ8cmの三角形の中に、頂点から底辺に補助線を引いて2つに分けました。\n補助線が底辺を3:1に分けるとき、大きい三角形の面積を求めなさい。',
  answer: 36,
  hint: '底辺の比 ＝ 3:1 → 面積の比も 3:1\n全体の面積 ＝ 12 × 8 ÷ 2 ＝ 48cm²\n大きい方 ＝ 48 × 3/4',
  solution: `【ポイント】
高さが同じ三角形どうしは、面積の比が底辺の比と同じになる。

【解説】
① 全体の三角形の面積は12×8÷2＝48cm²。
② 補助線が底辺を3:1に分けるので、2つの三角形の面積の比も3:1(どちらも頂点から底辺までの高さが同じだから)。
③ 全体を3＋1＝4等分した3つ分なので、大きい三角形の面積は48×3/4＝36cm²。

【広げてみよう】
高さが同じ三角形は、底辺を伸ばせば面積もそのまま比例して増える。底辺の比がそのまま面積の比になるのは、「底辺×高さ÷2」の高さの部分が共通だから。

【確認】
小さい三角形は48×1/4＝12cm²。36＋12＝48cm²で全体と一致する。

答え：36cm²`,
  expandVisual: 'same-height-ratio',
  expandVisualData: { total: 48, bigArea: 36, smallArea: 12 },
  tags: ['平面図形', '補助線', '面積比'],
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
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '三角形と台形の複合図形',
  text: '下の図のように、底辺14cm・高さ9cmの三角形と、上底3cm・下底7cm・高さ9cmの台形が合わさった図形の面積を求めなさい。',
  answer: 108,
  hint: '三角形の面積 ＋ 台形の面積\nそれぞれを公式で計算して足す',
  solution: `【ポイント】
複合図形は、知っている形(三角形・台形など)に分けて、それぞれの面積を足せば求められる。

【解説】
① 三角形の面積は14×9÷2＝63cm²。
② 台形の面積は(3＋7)×9÷2＝45cm²。
③ 合計は63＋45＝108cm²。

【広げてみよう】
形に分けるとき、境目をどこで区切るかは1通りではないことが多い。どの分け方でも、それぞれの面積の公式がそのまま使える区切り方を選べば同じ答えになる。

【確認】
108－45＝63cm²で、三角形の面積と一致する。

答え：108cm²`,
  expandVisual: 'compose-add',
  expandVisualData: { partALabel: '三角形 14×9÷2＝63cm²', partBLabel: '台形 (3＋7)×9÷2＝45cm²', resultText: '合計 → 63＋45＝108cm²' },
  tags: ['平面図形', '複合図形', '三角形', '台形'],
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
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '等積変形で高さを求める',
  text: '底辺8cm・高さ6cmの三角形と、面積が等しい平行四辺形を作ります。\n平行四辺形の底辺を8cmにするとき、高さは何cmですか？',
  answer: 3,
  hint: '三角形の面積 ＝ 平行四辺形の面積\n三角形: 8×6÷2＝24cm²\n平行四辺形の高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
底辺が同じとき、面積が同じなら高さも1通りに決まる(高さ＝面積÷底辺)。

【解説】
① 三角形の面積は8×6÷2＝24cm²。
② 平行四辺形の面積も24cm²にしたいので、底辺8×高さ＝24という式になる。
③ 高さ＝24÷8＝3cm。

【広げてみよう】
底辺を固定すると、面積は高さに比例して決まる。底辺8cmで面積24cm²にする高さは3cmだけでなく、底辺を変えれば(例えば底辺4cmなら高さ6cm、底辺6cmなら高さ4cm)、底辺×高さが24になる組み合わせがいろいろ作れる。

【確認】
8×3＝24cm²で、三角形の面積と一致する。

答え：3cm`,
  expandVisual: 'inverse-proportion',
  expandVisualData: { target: 24, highlightBase: 8, highlightHeight: 3 },
  tags: ['平面図形', '等積変形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 460 200" width="100%" style="max-width:420px;display:block;margin:0 auto" role="img" aria-label="底辺8cm高さ6cmの三角形と、面積が等しい底辺8cmの平行四辺形（高さは？）の図。図の縦横比は実際の比率とは異なります">
      <polygon points="40,124 152,124 96,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="138" x2="152" y2="138" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="132" x2="40" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="152" y1="132" x2="152" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <text x="96" y="158" font-size="12" fill="#1565C0" text-anchor="middle">底辺8cm</text>
      <line x1="168" y1="40" x2="168" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <line x1="162" y1="40" x2="174" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="162" y1="124" x2="174" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <text x="186" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 186 82)">高さ6cm</text>
      <text x="205" y="90" font-size="22" fill="#555" text-anchor="middle">＝</text>
      <polygon points="246,40 358,40 332,124 220,124" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <line x1="220" y1="138" x2="332" y2="138" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="220" y1="132" x2="220" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="332" y1="132" x2="332" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <text x="276" y="158" font-size="12" fill="#1565C0" text-anchor="middle">底辺8cm</text>
      <line x1="348" y1="40" x2="348" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <line x1="342" y1="40" x2="354" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="342" y1="124" x2="354" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <text x="366" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 366 82)">高さ ？</text>
      <text x="230" y="184" font-size="10" fill="#888" text-anchor="middle">※ 図の高さは実際の比率ではありません</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_013',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '面積比', pattern: '底辺の比と面積比',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '底辺の比から面積を求める',
  text: '2つの三角形があります。三角形Aの底辺は三角形Bの底辺の2倍で、高さは同じです。\n三角形Bの面積が15cm²のとき、三角形Aの面積を求めなさい。',
  answer: 30,
  hint: '高さが同じなら、面積の比 ＝ 底辺の比\n底辺が2倍 → 面積も2倍',
  solution: `【ポイント】
高さが同じ三角形どうしは、面積の比が底辺の比と同じになる。

【解説】
① 三角形Aの底辺は、三角形Bの底辺の2倍。
② 高さが同じとき、面積の比は底辺の比と同じになるので、面積の比も2:1。
③ 三角形Aの面積は、三角形Bの面積の2倍。15×2＝30cm²。

【広げてみよう】
三角形Aは、底辺の真ん中から頂点へ線を引くと、三角形Bと同じ底辺・同じ高さの三角形2つに分けられる。だから面積がちょうど2倍になる。

【確認】
30÷2＝15cm²で、三角形Bの面積と一致する。

答え：30cm²`,
  expandVisual: 'base-ratio-split',
  expandVisualData: { areaB: 15, areaA: 30 },
  tags: ['平面図形', '面積比', '三角形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 300 170" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="三角形Bと、底辺が2倍で高さが同じ三角形Aの図。Bの面積は15cm2、Aの面積は？">
      <text x="70" y="20" font-size="10" fill="#555" text-anchor="middle">三角形B</text>
      <polygon points="40,130 100,130 70,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <text x="70" y="95" font-size="11" fill="#1a1a2e" text-anchor="middle" font-weight="bold">15cm²</text>
      <text x="70" y="148" font-size="11" fill="#1565C0" text-anchor="middle">底辺</text>
      <text x="200" y="20" font-size="10" fill="#555" text-anchor="middle">三角形A</text>
      <polygon points="140,130 260,130 200,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
      <text x="200" y="95" font-size="13" fill="#1a1a2e" text-anchor="middle" font-weight="bold">？</text>
      <text x="200" y="148" font-size="11" fill="#1565C0" text-anchor="middle">底辺 × 2</text>
      <line x1="70" y1="40" x2="200" y2="40" stroke="#E53935" stroke-width="1.5" stroke-dasharray="3"/>
      <text x="135" y="32" font-size="10" fill="#E53935" text-anchor="middle">高さは同じ</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_014',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '面積比', pattern: '相似と面積比',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '相似比と面積比',
  text: '相似比が1:3の2つの正方形があります。小さい正方形の面積が4cm²のとき、大きい正方形の面積を求めなさい。',
  answer: 36,
  hint: '相似比が1:3 → 面積比は1²:3² ＝ 1:9\n大きい正方形の面積 ＝ 4 × 9',
  solution: `【ポイント】
相似比がm:nの図形は、面積の比がm²:n²になる。

【解説】
① 相似比は1:3。
② 面積の比は、相似比を2乗して1²:3²＝1:9になる。
③ 大きい正方形の面積は、小さい正方形の9倍。4×9＝36cm²。

【広げてみよう】
大きい正方形は、小さい正方形を縦3個×横3個、合計9個ならべた大きさにちょうど一致する。辺の長さが3倍になると面積は3×3＝9倍になるのは、このため。

【確認】
36÷9＝4cm²で、小さい正方形の面積と一致する。

答え：36cm²`,
  expandVisual: 'similarity-tiles',
  expandVisualData: { smallArea: 4, bigArea: 36 },
  tags: ['平面図形', '面積比', '相似'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 280 170" width="100%" style="max-width:280px;display:block;margin:0 auto" role="img" aria-label="相似比1:3の正方形2つの図。小さい正方形の面積は4cm2、大きい正方形の面積は？">
      <rect x="40" y="100" width="40" height="40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <text x="60" y="124" font-size="11" fill="#1a1a2e" text-anchor="middle" font-weight="bold">4cm²</text>
      <text x="60" y="156" font-size="11" fill="#555" text-anchor="middle">比 1</text>
      <rect x="120" y="20" width="120" height="120" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
      <text x="180" y="86" font-size="15" fill="#1a1a2e" text-anchor="middle" font-weight="bold">？</text>
      <text x="180" y="156" font-size="11" fill="#555" text-anchor="middle">比 3</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_015',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形・面積比', pattern: '対角線で4分割',
  difficulty: 3, answerType: 'number', answerUnit: '%',
  title: '対角線で4分割した三角形の面積比',
  text: '底辺10cm・高さ8cmの平行四辺形ABCDがあります。\n2本の対角線ACとBDを引いて4つの三角形に分けたとき、向かい合う三角形（三角形OABと三角形OCD）の面積の和は全体の何%ですか？',
  answer: 50,
  hint: '平行四辺形の対角線は交点Oで互いを二等分する（AO＝OC、BO＝OD）\nこのとき4つの三角形はすべて面積が等しくなる',
  solution: `【ポイント】
平行四辺形の対角線は交点で互いを二等分するので、2本の対角線で分けた4つの三角形はすべて面積が等しい。

【解説】
① 平行四辺形の面積は10×8＝80cm²。
② 対角線AC・BDの交点Oは、どちらの対角線も真ん中の点になる(AO＝OC、BO＝OD)ので、4つの三角形OAB・OBC・OCD・ODAはすべて面積が等しい。
③ 4等分なので、三角形1つ分は全体の1/4(25%)。
④ 向かい合う三角形OABとOCDの和は、25%×2＝50%。

【広げてみよう】
三角形OABを交点Oを軸に180°回転させると、ぴったり三角形OCDに重なる。OA＝OC、OB＝ODだから。同じように、三角形OBCを180°回転させると三角形ODAに重なる。

【確認】
20×2＝40cm²、40÷80×100＝50%で一致する。

答え：50%`,
  expandVisual: 'diagonal-quarter',
  expandVisualData: { total: 80, pairPercent: 50 },
  tags: ['平面図形', '面積比', '等積変形', '対角線'],
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

{
  id: 'g6_plane_016',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行線と角度', pattern: '補助線で角を分解',
  difficulty: 2, answerType: 'number', answerUnit: '度',
  title: '平行線にはさまれた折れ角',
  text: '下の図のように、2本の平行な直線ℓ、mの間で道が折れ曲がっています。\n曲がり角xは何度ですか。',
  answer: 85,
  hint: '曲がり角を通り、ℓ・mに平行な補助線を引くと、角xは2つの角に分かれる。',
  solution: `【ポイント】
曲がり角を通り、ℓ・mに平行な補助線を引くと、角xは2つの角に分かれる。

【解説】
① 曲がり角を通り、ℓ、mと平行な補助線を引く。角xは補助線によって2つの角に分かれる。
② 上側の角は、ℓと補助線が平行なので、50°の錯角として50°になる。
③ 下側の角は、mと補助線が平行なので、35°の錯角として35°になる。
④ x ＝ 50°＋35°＝85°

【広げてみよう】
平行線を増やして知っている角に分解するこの考え方は、Z字型・N字型のどんな折れ線にも使える。平面図形の角度問題のほとんどで登場する。

【確認】
補助線で分けた2つの角を足すと、50°＋35°＝85°。もとの折れ角と一致する。

答え：85°`,
  expandVisual: 'angle-reveal',
  expandVisualData: { angle1: 50, angle2: 35, total: 85 },
  tags: ['平面図形', '角度', '平行線', '錯角'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 220 170" width="100%" style="max-width:260px;display:block;margin:0 auto" role="img" aria-label="平行な2直線ℓ、mの間で折れ曲がる角xの図">
      <line x1="10" y1="30" x2="210" y2="30" stroke="#1a1a2e" stroke-width="2"/>
      <line x1="10" y1="140" x2="210" y2="140" stroke="#1a1a2e" stroke-width="2"/>
      <polyline points="60,30 130,85 70,140" fill="none" stroke="#1565C0" stroke-width="3"/>
      <text x="64" y="24" font-size="13" fill="#1a1a2e">ℓ</text>
      <text x="64" y="156" font-size="13" fill="#1a1a2e">m</text>
      <text x="30" y="46" font-size="12" fill="#555">50°</text>
      <text x="32" y="132" font-size="12" fill="#555">35°</text>
      <text x="134" y="82" font-size="14" fill="#E53935" font-weight="bold">x</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_017',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '多角形の内角・外角', pattern: '内角の和の公式',
  difficulty: 2, answerType: 'number', answerUnit: '度',
  title: '正八角形の内角',
  text: '正八角形は、どの辺の長さも、どの内角の大きさも、それぞれ等しい図形です。\n正八角形の1つの内角の大きさを求めなさい。',
  answer: 135,
  hint: '多角形の内角の和 ＝（辺の数－2）×180°。正多角形は内角の和を辺の数で割ると1つ分の大きさになる。',
  solution: `【ポイント】
多角形の内角の和は、（辺の数－2）×180°で求められる。正多角形はすべての内角が等しいので、内角の和を辺の数で割ると1つの内角がわかる。

【解説】
① 正八角形は辺が8つあるので、内角の和は（8－2）×180＝1080°。
② 正八角形はすべての内角が等しいので、1080°を8で割ると1つの内角がわかる。
③ 1080÷8＝135°。

【広げてみよう】
「（辺の数－2）×180°」という内角の和の公式は、三角形（3－2＝1、180°）や四角形（4－2＝2、360°）でも同じしくみで成り立つ。多角形は、1つの頂点から対角線を引くと三角形に分けられることから導ける。

【確認】
多角形の外角の和はどんな多角形でも360°。正八角形の1つの外角は360÷8＝45°。内角と外角を足すと180°になるので、135＋45＝180°で一致する。

答え：135°`,
  expandVisual: 'exterior-angle-circle',
  expandVisualData: { sides: 8, exterior: 45, interior: 135 },
  tags: ['平面図形', '角度', '多角形', '正多角形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 160 160" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="正八角形の図、1つの内角に？マーク">
      <polygon points="55.1,20 104.9,20 140,55.1 140,104.9 104.9,140 55.1,140 20,104.9 20,55.1" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
      <text x="123" y="48" font-size="14" fill="#E53935" font-weight="bold">？</text>
    </svg>`,
  },
},
];
