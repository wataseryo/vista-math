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
《③ 8×5＝40cm²》

【広げてみよう】
平行四辺形は、片方の端を切り取ってもう片方にくっつけると、底辺×高さの長方形になる。形が傾いていても、底辺に垂直な高ささえわかれば、長方形と同じしくみで面積が求められる。

【確認】
《底辺8cm×高さ5cm＝40cm²》

答え：40cm²`,
  expandVisual: 'parallelogram-cut',
  expandVisualData: { base: 8, height: 5, area: 40 },
  expandAdvice: '次は、傾いた平行四辺形を見ただけで「切って動かせば長方形になりそう」と気づけるようにしよう！',
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
《③ 6×4÷2＝12cm²》

【広げてみよう】
同じ三角形をもう1つ180°回転させて組み合わせると、底辺・高さが同じ平行四辺形になる。三角形の面積が÷2になるのは、平行四辺形をちょうど半分に分けた形だから。

【確認】
《6×4＝24(組み合わせた平行四辺形の面積)、24÷2＝12》
もとの三角形の面積と一致する。

答え：12cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 6, height: 4, area: 12 },
  expandAdvice: '次は三角形を見たときに、「2つ合わせたら平行四辺形になるな」とイメージできるようにしよう！',
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
《③ (3＋7)×4÷2＝10×4÷2＝40÷2＝20cm²》

【広げてみよう】
同じ台形をもう1つ180°回転させて組み合わせると、底辺が(上底＋下底)、高さが同じ平行四辺形になる。台形の面積が÷2になるのは三角形の公式と同じしくみ。

【確認】
《(3＋7)×4＝40(組み合わせた平行四辺形の面積)、40÷2＝20》
もとの面積と一致する。

答え：20cm²`,
  expandVisual: 'trapezoid-rotate',
  expandVisualData: { upper: 3, lower: 7, height: 4, area: 20 },
  expandAdvice: '台形が出てきたら、三角形のときと同じように「もう1つ組み合わせたら?」と考えるくせをつけよう！',
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
《① 三角形1の面積は10×6÷2＝30cm²》
《② 三角形2の面積は4×6÷2＝12cm²》
《③ 合計は30＋12＝42cm²》

【広げてみよう】
この2つの三角形は、同じ頂点を共有していて、底辺が一直線に並んでいる。だから、分けずに1つの三角形と見ることもできる。
《底辺10＋4＝14cm》
《14×6÷2＝42cm²》
分けて計算したときと同じ答えになる。

【確認】
《42－12＝30cm²》
三角形1の面積と一致する。

答え：42cm²`,
  expandVisual: 'merge-triangles',
  expandVisualData: { base1: 10, base2: 4, height: 6, area: 42 },
  expandAdvice: '図形が2つに分かれているように見えたときも、「本当は1つの形にまとめられないか」を自分で確かめてみよう！',
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
《③ 12×7＝84cm²》

【広げてみよう】
平行四辺形は、片方の端を切り取ってもう片方にくっつけると、底辺×高さの長方形になる。形が傾いていても、底辺に垂直な高ささえわかれば、長方形と同じしくみで面積が求められる。

【確認】
《底辺12cm×高さ7cm＝84cm²》

答え：84cm²`,
  expandVisual: 'parallelogram-cut',
  expandVisualData: { base: 12, height: 7, area: 84 },
  expandAdvice: '次は、傾いた平行四辺形を見ただけで「切って動かせば長方形になりそう」と気づけるようにしよう！',
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
《③ 10×8÷2＝40cm²》

【広げてみよう】
同じ三角形をもう1つ180°回転させて組み合わせると、底辺・高さが同じ平行四辺形になる。三角形の面積が÷2になるのは、平行四辺形をちょうど半分に分けた形だから。

【確認】
《10×8＝80(組み合わせた平行四辺形の面積)、80÷2＝40》
もとの三角形の面積と一致する。

答え：40cm²`,
  expandVisual: 'triangle-rotate',
  expandVisualData: { base: 10, height: 8, area: 40 },
  expandAdvice: '次は三角形を見たときに、「2つ合わせたら平行四辺形になるな」とイメージできるようにしよう！',
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
《③ (5＋9)×6÷2＝14×6÷2＝84÷2＝42cm²》

【広げてみよう】
同じ台形をもう1つ180°回転させて組み合わせると、底辺が(上底＋下底)、高さが同じ平行四辺形になる。台形の面積が÷2になるのは三角形の公式と同じしくみ。

【確認】
《(5＋9)×6＝84(組み合わせた平行四辺形の面積)、84÷2＝42》
もとの面積と一致する。

答え：42cm²`,
  expandVisual: 'trapezoid-rotate',
  expandVisualData: { upper: 5, lower: 9, height: 6, area: 42 },
  expandAdvice: '台形が出てきたら、三角形のときと同じように「もう1つ組み合わせたら?」と考えるくせをつけよう！',
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
② 面積36cm²、底辺9cmなので、
《高さ×9÷2＝36》
という式になる。
《③ 高さ＝36×2÷9＝8cm》

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、どの文字について求めたいかを変えても使える。面積と底辺が分かれば高さを、面積と高さが分かれば底辺を、同じしくみで逆算できる。

【確認】
《9×8÷2＝36cm²》
もとの面積と一致する。

答え：8cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 9, height: 8, area: 36 },
  expandAdvice: '次に何かの値を求める問題で詰まったら、まず公式を書き出して「どこが？なのか」を整理してみよう！',
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
② 面積60cm²、底辺12cmなので、
《高さ×12＝60》
という式になる。
《③ 高さ＝60÷12＝5cm》

【広げてみよう】
「底辺×高さ＝面積」の公式は、底辺・高さ・面積のうち2つが分かれば残り1つを求められる。三角形の公式(÷2が付く)も同じ考え方で逆算できる。

【確認】
《12×5＝60cm²》
もとの面積と一致する。

答え：5cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 12, height: 5, area: 60 },
  expandAdvice: '底辺や高さを求める問題が出たら、公式のどの文字を求めればいいか、自分で整理するくせをつけよう！',
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
《① 長方形の面積は10×8＝80cm²》
《② 切り取った三角形の面積は4×5÷2＝10cm²》
《③ 残りの面積は80－10＝70cm²》

【広げてみよう】
欠けた部分があって直接公式が使えない図形でも、「全体－欠けた部分」と考えれば、知っている公式(長方形・三角形)だけで求められる。

【確認】
《70＋10＝80cm²》
もとの長方形の面積と一致する。

答え：70cm²`,
  expandVisual: 'subtract-triangle',
  expandVisualData: { resultText: '残りの面積 → 80－10＝70cm²' },
  expandAdvice: '今回は点線で欠けている部分を示してあったけど、次は点線がなくても「ここに三角形が隠れていそう」と自分で気づけるようにしよう！',
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
《① 外側の大きい長方形の面積は8×10＝80cm²》
《② 切り取った長方形の面積は3×4＝12cm²》
《③ L字型の面積は80－12＝68cm²》

【広げてみよう】
L字型は、欠けた角を補って大きい長方形に戻してから引く以外に、2つの長方形に分けて足す方法でも求められる。

【別解】
たて8cmを保ったまま、よこを6cmと4cmの2つの長方形に分ける。
《左の長方形：6×8＝48cm²》
《右下の長方形：4×(8－3)＝4×5＝20cm²》
《合計：48＋20＝68cm²》
（同じ答えになる）

【確認】
《68＋12＝80cm²》
もとの長方形の面積と一致する。

答え：68cm²`,
  expandVisual: 'subtract-rect',
  expandVisualData: { resultText: 'L字型の面積 → 80－12＝68cm²' },
  expandAdvice: 'L字型を見たら、点線がなくても「どこかに長方形が隠れていないか」を自分で探せるようになろう！',
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
② 面積48cm²、上底4cm、高さ6cmなので、
《(4＋下底)×6÷2＝48》
という式になる。
《③ 4＋下底＝48×2÷6＝16、下底＝16－4＝12cm》

【広げてみよう】
式を1段階ずつ逆にたどれば、どんな公式も「知りたい文字」について解くことができる。(上底＋下底)をひとかたまりとして先に求めてから、上底を引いて下底だけを取り出すのがコツ。

【確認】
《(4＋12)×6÷2＝96÷2＝48cm²》
もとの面積と一致する。

答え：12cm`,
  expandVisual: 'trapezoid-formula-slot',
  expandVisualData: { upper: 4, lower: 12, height: 6, area: 48 },
  expandAdvice: '台形の下底や上底を求める問題が出ても、同じ手順を自分で再現できるようにしておこう！',
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
《① 平行四辺形の面積は10×6＝60cm²》
② 対角線BDで分けた三角形ABDと三角形CBDは、向かい合う辺の長さが等しく対角線BDを共有する合同な三角形なので、面積も等しい。
《③ 三角形ABDの面積は60÷2＝30cm²》

【広げてみよう】
三角形ABDを、対角線BDの真ん中の点を軸に180°回転させると、ぴったり三角形CBDに重なる。これは平行四辺形の向かい合う辺の長さが等しいから成り立つ。

【確認】
《30＋30＝60cm²》
もとの平行四辺形の面積と一致する。

答え：30cm²`,
  expandVisual: 'diagonal-rotate',
  expandVisualData: { area: 60, halfArea: 30 },
  expandAdvice: '対角線で分けられた図形を見たら、「この2つは本当に同じ面積かな」と疑ってみる習慣をつけよう！',
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
《① 全体の三角形の面積は12×8÷2＝48cm²》
② 補助線が底辺を3:1に分けるので、2つの三角形の面積の比も3:1(どちらも頂点から底辺までの高さが同じだから)。
③ 全体を3＋1＝4等分した3つ分なので、
《大きい三角形の面積＝48×3/4＝36cm²》

【広げてみよう】
高さが同じ三角形は、底辺を伸ばせば面積もそのまま比例して増える。底辺の比がそのまま面積の比になるのは、「底辺×高さ÷2」の高さの部分が共通だから。

【確認】
《小さい三角形は48×1/4＝12cm²》
《36＋12＝48cm²》
全体と一致する。

答え：36cm²`,
  expandVisual: 'same-height-ratio',
  expandVisualData: { baseBig: 9, baseSmall: 3, height: 8, bigArea: 36, smallArea: 12 },
  expandAdvice: '底辺の比が出てきたら、まず「高さは同じかな」を確認するくせをつけよう！',
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
《① 三角形の面積は14×9÷2＝63cm²》
《② 台形の面積は(3＋7)×9÷2＝45cm²》
《③ 合計は63＋45＝108cm²》

【広げてみよう】
形に分けるとき、境目をどこで区切るかは1通りではないことが多い。どの分け方でも、それぞれの面積の公式がそのまま使える区切り方を選べば同じ答えになる。

こうも解ける！
この三角形と台形は、どちらも高さが9cmで同じ。しかも、三角形の底辺(14cm)と台形の下底(7cm)が一直線に並んでいる。だから、分けて計算しなくても、全体をまるごと1つの台形として見ることができる。
上底は、もとの台形の上底3cmのまま変わらない。
下底は、三角形の底辺14cmと台形の下底7cmをつなげて求める。
《下底＝14＋7＝21cm》
高さは9cmのまま。
《(上底＋下底)×高さ÷2＝(3＋21)×9÷2＝24×9÷2＝108cm²》
分けて計算したときと同じ答えになる。

【確認】
《108－45＝63cm²》
三角形の面積と一致する。

答え：108cm²`,
  expandVisual: 'compose-add',
  expandVisualData: { partALabel: '三角形 14×9÷2＝63cm²', partBLabel: '台形 (3＋7)×9÷2＝45cm²', resultText: '合計 → 63＋45＝108cm²' },
  expandAdvice: '複雑な形を見たときも、「知っている形に分けられないか」と自分から探してみよう！',
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
《① 三角形の面積は8×6÷2＝24cm²》
② 平行四辺形の面積も24cm²にしたいので、
《底辺8×高さ＝24》
という式になる。
《③ 高さ＝24÷8＝3cm》

【広げてみよう】
三角形の面積の公式には÷2が付くけど、平行四辺形の面積の公式には付かない。だから、底辺が同じで面積も同じにしたいなら、÷2の分だけ平行四辺形の高さは三角形の高さのちょうど半分でいい。
《6÷2＝3cm》

【確認】
《8×3＝24cm²》
三角形の面積と一致する。

答え：3cm`,
  expandVisual: 'inverse-proportion',
  expandVisualData: { target: 24, highlightBase: 8, highlightHeight: 3, triangleHeight: 6 },
  expandAdvice: '面積が同じという条件が出てきたら、「底辺と高さ、どちらかが分かれば残りも求まる」と思い出そう！',
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
これは、さっき見た「高さが同じなら底辺の比＝面積の比」(問14)と同じ考え方だね！
① 三角形Aの底辺は、三角形Bの底辺の2倍。
② 高さが同じとき、面積の比は底辺の比と同じになるので、面積の比も2:1。
③ 三角形Aの面積は、三角形Bの面積の2倍。
《15×2＝30cm²》

【広げてみよう】
三角形Bの底辺をa、高さをhとすると、
《面積＝a×h÷2》
三角形Aは底辺が2a、高さは同じhなので、
《面積＝2a×h÷2＝2×(a×h÷2)》
つまり三角形Bの面積のちょうど2倍になる。

もし底辺も高さもそれぞれ違う倍率で変わったら、面積はどうなるだろう?
底辺をm倍、高さをn倍にすると、
《面積＝(m×a)×(n×h)÷2＝m×n×(a×h÷2)》
m×n倍になる。底辺と高さを同じ倍率で変えると、面積はその2乗倍になる。

【確認】
《30÷2＝15cm²》
三角形Bの面積と一致する。

答え：30cm²`,
  expandVisual: 'triangle-base-scale',
  expandVisualData: {},
  expandAdvice: '底辺や高さの倍率が出てきたら、面積が何倍になるかすぐに考えられるようにしよう！',
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
  hint: '相似比が1:3 → 面積比は(1×1):(3×3) ＝ 1:9\n大きい正方形の面積 ＝ 4 × 9',
  solution: `【ポイント】
相似比がm:nの図形は、面積の比が(m×m):(n×n)になる。

【解説】
① 相似比は1:3。
② 相似な図形は、たて・よこがどちらも同じ比率で大きくなるので、
《面積の比＝(1×1):(3×3)＝1:9》
③ 大きい正方形の面積は、小さい正方形の9倍。
《4×9＝36cm²》

【広げてみよう】
前の問題(問17)で見たとおり、底辺をm倍・高さをn倍すると、面積はm×n倍になる。相似な図形は、たて・よこの長さがどちらも同じ倍率(ここでは相似比どおり3倍)で大きくなるので、m＝n＝3として考えればいい。
小さい正方形の1辺をaとすると、大きい正方形の1辺は3aで、
《面積＝3a×3a＝3×3×(a×a)＝9×(a×a)》
たて・よこがそれぞれ3倍になるから、面積は3×3＝9倍になる。
《4×9＝36cm²》

【確認】
《36÷9＝4cm²》
小さい正方形の面積と一致する。

答え：36cm²`,
  expandVisual: 'similarity-tiles',
  expandVisualData: { smallArea: 4, bigArea: 36 },
  expandAdvice: '相似な図形が出てきたら、たて・よこの倍率を掛け合わせれば面積の比になることを自分で思い出せるようにしよう！',
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
《① 平行四辺形の面積は10×8＝80cm²》
② 対角線AC・BDの交点Oは、どちらの対角線も真ん中の点になる(AO＝OC、BO＝OD)ので、4つの三角形OAB・OBC・OCD・ODAはすべて面積が等しい。
③ 4等分なので、
《三角形1つ分＝全体の1/4(25%)》
④ 向かい合う三角形OABとOCDの和は、
《25%×2＝50%》

【広げてみよう】
三角形OABを交点Oを軸に180°回転させると、ぴったり三角形OCDに重なる。OA＝OC、OB＝ODだから。同じように、三角形OBCを180°回転させると三角形ODAに重なる。

【確認】
《20×2＝40cm²、40÷80×100＝50%》
もとの全体と一致する。

答え：50%`,
  expandVisual: 'diagonal-quarter',
  expandVisualData: { total: 80, pairPercent: 50 },
  expandAdvice: '対角線が2本に増えても、同じように回転させて重ねられないか自分で考えてみよう！',
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
《④ x＝50°＋35°＝85°》

【広げてみよう】
平行線を増やして知っている角に分解するこの考え方は、Z字型・N字型のどんな折れ線にも使える。平面図形の角度問題のほとんどで登場する。

【確認】
補助線で分けた2つの角を足すと、
《50°＋35°＝85°》
もとの折れ角と一致する。

答え：85°`,
  expandVisual: 'angle-reveal',
  expandVisualData: { angle1: 50, angle2: 35, total: 85 },
  expandAdvice: '折れ線の角度を見たら、補助線の点線がなくても「どこに引けば錯角が使えるか」を自分で探せるようにしよう！',
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
① 正八角形は辺が8つあるので、
《内角の和＝（8－2）×180＝1080°》
② 正八角形はすべての内角が等しいので、1080°を8で割ると1つの内角がわかる。
《③ 1080÷8＝135°》

【広げてみよう】
「（辺の数－2）×180°」という内角の和の公式は、三角形（3－2＝1、180°）や四角形（4－2＝2、360°）でも同じしくみで成り立つ。多角形は、1つの頂点から対角線を引くと三角形に分けられることから導ける。

【確認】
多角形の外角の和はどんな多角形でも360°。正八角形の1つの外角は
《360÷8＝45°》
内角と外角を足すと180°になるので、
《135＋45＝180°》
で一致する。

答え：135°`,
  expandVisual: 'exterior-angle-circle',
  expandVisualData: { sides: 8, exterior: 45, interior: 135 },
  expandAdvice: '他の正多角形(五角形や六角形)が出てきても、同じように外角の和360°から求められるか自分で試してみよう！',
  tags: ['平面図形', '角度', '多角形', '正多角形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 160 160" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="正八角形の図、1つの内角に？マーク">
      <polygon points="55.1,20 104.9,20 140,55.1 140,104.9 104.9,140 55.1,140 20,104.9 20,55.1" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
      <text x="123" y="48" font-size="14" fill="#E53935" font-weight="bold">？</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_018',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '合同・対応点', pattern: '対応順の読み取り',
  difficulty: 2, answerType: 'number', answerUnit: '度',
  title: '合同な三角形の対応する角',
  text: '下の図で、三角形ABCと三角形DEFは合同です(△ABC≡△DEF)。\n角B＝65°、角C＝48°、角E＝65°のとき、角Dの大きさを求めなさい。',
  answer: 67,
  hint: '△ABC≡△DEFという記号は、A↔D、B↔E、C↔Fの対応順を表す。図の見た目の位置ではなく、記号の順番で対応する角を探す。',
  solution: `【ポイント】
合同を表す記号の対応順(△ABC≡△DEFならA↔D、B↔E、C↔F)で、対応する角を読み取る。

【解説】
① 三角形の内角の和は180°なので、三角形ABCで、
《角A＝180－65－48＝67°》
② △ABC≡△DEFの対応順はA↔D、B↔E、C↔Fなので、角Dは角Aと対応する。
③ 合同な図形は対応する角がそれぞれ等しいので、
《角D＝角A＝67°》

【広げてみよう】
図の中でDEFがABCと違う向き(回転した向き)で描かれていても、対応順さえ正しく読めれば角は求められる。この「見た目の位置ではなく記号の順番で対応点を追う」考え方は、合同だけでなく相似や、立体図形の見取図・展開図で対応する頂点を探すときにも同じように使える。

【確認】
角E＝65°は角Bと対応しており、問題文の角B＝65°と一致する。同様に角F＝角C＝48°。対応する角を合計すると、
《角D＋角E＋角F＝67＋65＋48＝180°》
三角形DEFの内角の和も180°になり、矛盾しない。

答え：67°`,
  expandVisual: 'congruence-match',
  expandVisualData: { angleA: 67, angleB: 65, angleC: 48, angleD: 67, angleE: 65, angleF: 48 },
  expandAdvice: '合同の記号の対応順さえ正しく読めれば、図の向きが変わっていても対応する角や辺を自分で見つけられるようにしよう！',
  tags: ['平面図形', '合同', '対応点', '角度'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 360 230" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="三角形ABCと、向きの違う三角形DEF。角B65度、角C48度、角E65度、角D は？">
      <polygon points="81,52 40,140 160,140" fill="none" stroke="#1a1a2e" stroke-width="2"/>
      <polygon points="279,208 320,120 200,120" fill="none" stroke="#1a1a2e" stroke-width="2"/>
      <text x="75" y="40" font-size="13" fill="#1a1a2e">A</text>
      <text x="18" y="150" font-size="13" fill="#1a1a2e">B</text>
      <text x="166" y="150" font-size="13" fill="#1a1a2e">C</text>
      <text x="283" y="226" font-size="13" fill="#1a1a2e">D</text>
      <text x="330" y="112" font-size="13" fill="#1a1a2e">E</text>
      <text x="180" y="112" font-size="13" fill="#1a1a2e">F</text>
      <text x="50" y="128" font-size="12" fill="#555">65°</text>
      <text x="128" y="128" font-size="12" fill="#555">48°</text>
      <text x="296" y="133" font-size="12" fill="#555">65°</text>
      <text x="268" y="193" font-size="14" fill="#E53935" font-weight="bold">？</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_019',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '円の性質', pattern: '円周から半径を逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '円周の長さから半径を求める',
  text: '円周の長さが62.8cmの円があります。\nこの円の半径は何cmですか。円周率は3.14とします。',
  answer: 10,
  hint: '円周＝直径×3.14。まず直径を求めてから、半径は直径の半分であることを使う。',
  solution: `【ポイント】
円周の公式(円周＝直径×3.14)を逆向きに使って、直径→半径の順に求める。

【解説】
① 円周＝直径×3.14なので、直径は、
《直径＝62.8÷3.14＝20cm》
② 半径は直径の半分なので、
《半径＝20÷2＝10cm》

【広げてみよう】
「直径×3.14」の公式は、求めたいものが直径でも半径でも、÷3.14や÷2を組み合わせれば逆向きに使える。おうぎ形の弧の長さや、円の面積の逆算でも同じように「公式を逆から使う」考え方が使える。

【確認】
半径10cmから円周を計算すると、
《10×2×3.14＝62.8cm》
問題文の円周62.8cmと一致する。

答え：10cm`,
  expandVisual: 'circle-radius-reveal',
  expandVisualData: { circumference: 62.8, diameter: 20, radius: 10 },
  expandAdvice: '直径や半径を求める問題が出ても、円周の公式を逆向きに使えば自分で求められるようにしよう！',
  tags: ['平面図形', '円', '円周', '逆算'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 200 200" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="円周62.8cmの円。中心から円周までの半径は？">
      <circle cx="100" cy="100" r="70" fill="none" stroke="#1a1a2e" stroke-width="2"/>
      <circle cx="100" cy="100" r="2.5" fill="#1a1a2e"/>
      <line x1="100" y1="100" x2="170" y2="100" stroke="#1565C0" stroke-width="2"/>
      <text x="118" y="95" font-size="14" fill="#E53935" font-weight="bold">？</text>
      <text x="55" y="24" font-size="12" fill="#555">円周62.8cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_020',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '縮図・拡大図', pattern: '縮尺と単位換算',
  difficulty: 2, answerType: 'number', answerUnit: 'km',
  title: '縮尺と実際の距離',
  text: '縮尺1/25000の地図があります。\n地図上で2つの地点の間の長さを測ったら4cmでした。実際の距離は何kmですか。',
  answer: 1,
  hint: '縮尺1/25000は「地図上の長さ×25000＝実際の長さ」という意味。単位はcmのまま計算してから、最後にkmへ変換する。',
  solution: `【ポイント】
縮尺1/25000は、地図上の長さを25000倍すると実際の長さになるという意味。

【解説】
① 地図上の長さは4cmなので、実際の長さは、
《4×25000＝100000cm》
② 100000cmを単位変換すると、
《100000cm＝1000m＝1km》

【広げてみよう】
「地図上の長さ×縮尺の分母＝実際の長さ」という考え方は、どんな縮尺(1/1000や1/50000など)でも同じように使える。単位をそろえてから最後にcm→m→kmと変換する順番を覚えておくと、速さの単位換算(時速⇄分速⇄秒速)など他の単位変換でも迷わない。

【確認】
実際の距離1kmを地図の縮尺に戻すと、
《1km＝100000cm、100000÷25000＝4cm》
問題文の地図上の長さ4cmと一致する。

答え：1km`,
  expandVisual: 'scale-drawing-reveal',
  expandVisualData: { mapLength: 4, scaleDenominator: 25000, actualCm: 100000, actualM: 1000, actualKm: 1 },
  expandAdvice: '縮尺の問題が出たら、まず地図上の長さ×縮尺の分母で実際の長さ(cm)を求め、そこから単位変換できるようにしよう！',
  tags: ['平面図形', '縮図', '拡大図', '縮尺', '単位変換'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 220 150" width="100%" style="max-width:260px;display:block;margin:0 auto" role="img" aria-label="縮尺1/25000の地図、地図上の長さ4cm、実際の距離は？">
      <text x="10" y="22" font-size="12" fill="#555">縮尺 1/25000 の地図</text>
      <line x1="20" y1="70" x2="90" y2="70" stroke="#1565C0" stroke-width="4"/>
      <text x="28" y="92" font-size="13" fill="#1565C0" font-weight="bold">4cm</text>
      <text x="115" y="55" font-size="12" fill="#555">実際の距離</text>
      <text x="150" y="80" font-size="15" fill="#E53935" font-weight="bold">？km</text>
    </svg>`,
  },
},

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
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺14×高さ9に合わせて頂点・寸法線・viewBoxを算定。
    markup: `<svg viewBox="0 0 326 216" width="100%" style="max-width:326px;display:block;margin:0 auto" role="img" aria-label="底辺14cm、高さ9cm、頂点が上の三角形">
      <polygon points="40,166 236,166 138,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="180" x2="236" y2="180" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="174" x2="40" y2="186" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="236" y1="174" x2="236" y2="186" stroke="#1565C0" stroke-width="1.5"/>
      <text x="138" y="200" font-size="12" fill="#1565C0" text-anchor="middle">底辺 14cm</text>
      <line x1="252" y1="40" x2="252" y2="166" stroke="#E53935" stroke-width="1.5"/>
      <line x1="246" y1="40" x2="258" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="246" y1="166" x2="258" y2="166" stroke="#E53935" stroke-width="1.5"/>
      <text x="270" y="103" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 270 103)">高さ 9cm</text>
    </svg>`,
  },
},

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
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺11×高さ8に合わせて頂点・寸法線・viewBoxを算定。
    markup: `<svg viewBox="0 0 284 194" width="100%" style="max-width:284px;display:block;margin:0 auto" role="img" aria-label="底辺11cm、高さ8cm、頂点が下の三角形">
      <polygon points="40,56 194,56 117,168" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <line x1="40" y1="42" x2="194" y2="42" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="36" x2="40" y2="48" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="194" y1="36" x2="194" y2="48" stroke="#1565C0" stroke-width="1.5"/>
      <text x="117" y="32" font-size="12" fill="#1565C0" text-anchor="middle">底辺 11cm</text>
      <line x1="210" y1="56" x2="210" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <line x1="204" y1="56" x2="216" y2="56" stroke="#E53935" stroke-width="1.5"/>
      <line x1="204" y1="168" x2="216" y2="168" stroke="#E53935" stroke-width="1.5"/>
      <text x="228" y="112" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 228 112)">高さ 8cm</text>
    </svg>`,
  },
}
,

{
  id: 'g6_plane_004_v01',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '三角形の高さを求める（類題1）',
  text: '面積が42cm²の三角形があります。底辺が7cmのとき、高さは何cmですか？',
  answer: 12,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 三角形の面積は、底辺×高さ÷2。
② 面積42cm²、底辺7cmなので、
《高さ×7÷2＝42》
という式になる。
《③ 高さ＝42×2÷7＝12cm》

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、どの文字について求めたいかを変えても使える。面積と底辺が分かれば高さを、面積と高さが分かれば底辺を、同じしくみで逆算できる。

【確認】
《7×12÷2＝42cm²》
もとの面積と一致する。

答え：12cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 7, height: 12, area: 42 },
  expandAdvice: '次に何かの値を求める問題で詰まったら、まず公式を書き出して「どこが？なのか」を整理してみよう！',
  tags: ['平面図形', '三角形', '逆算'],
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺・高さに合わせて頂点・寸法線・viewBoxを再計算。高さは未知表示。
    markup: `<svg viewBox="0 0 228 258" width="100%" style="max-width:228px;display:block;margin:0 auto" role="img" aria-label="底辺7cm、面積42cm²、高さは未知、頂点が上の三角形">
      <polygon points="40,208 138,208 89,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <text x="89" y="154.24" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積42cm²</text>
      <line x1="40" y1="222" x2="138" y2="222" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="216" x2="40" y2="228" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="138" y1="216" x2="138" y2="228" stroke="#1565C0" stroke-width="1.5"/>
      <text x="89" y="242" font-size="12" fill="#1565C0" text-anchor="middle">底辺 7cm</text>
      <line x1="154" y1="40" x2="154" y2="208" stroke="#E53935" stroke-width="1.5"/>
      <line x1="148" y1="40" x2="160" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="148" y1="208" x2="160" y2="208" stroke="#E53935" stroke-width="1.5"/>
      <text x="172" y="124" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 172 124)">高さ ？</text>
      </svg>`,
  },
},

{
  id: 'g6_plane_004_v02',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '三角形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '三角形の高さを求める（類題2・向きを変えた問題）',
  text: '下の図のように、頂点が下を向いている三角形があります。面積が72cm²、底辺が16cmのとき、高さは何cmですか？',
  answer: 9,
  hint: '面積 ＝ 底辺 × 高さ ÷ 2 を高さについて解く(向きが変わっても公式は同じ)\n高さ ＝ 面積 × 2 ÷ 底辺',
  solution: `【ポイント】
三角形の向きが変わっても、面積の公式(底辺×高さ÷2)を逆向きに使う考え方は同じ。

【解説】
① 図の向きが変わっていても、底辺とそれに垂直な高さの組を見つければよい。底辺は16cm。
② 面積72cm²、底辺16cmなので、
《高さ×16÷2＝72》
という式になる。
《③ 高さ＝72×2÷16＝9cm》

【広げてみよう】
「底辺×高さ÷2＝面積」の公式は、三角形をどの向きに置いても変わらない。向きに惑わされず、底辺とそれに垂直な高さの組を見つけることが大切。

【確認】
《16×9÷2＝72cm²》
もとの面積と一致する。

答え：9cm`,
  expandVisual: 'triangle-formula-slot',
  expandVisualData: { base: 16, height: 9, area: 72 },
  expandAdvice: '次に何かの値を求める問題で詰まったら、まず公式を書き出して「どこが？なのか」を整理してみよう！',
  tags: ['平面図形', '三角形', '逆算', '向き'],
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺・高さに合わせて頂点・寸法線・viewBoxを再計算。高さは未知表示。
    markup: `<svg viewBox="0 0 354 208" width="100%" style="max-width:354px;display:block;margin:0 auto" role="img" aria-label="底辺16cm、面積72cm²、高さは未知、頂点が下の三角形">
      <polygon points="40,56 264,56 152,182" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <text x="152" y="101.36" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積72cm²</text>
      <line x1="40" y1="42" x2="264" y2="42" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="36" x2="40" y2="48" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="264" y1="36" x2="264" y2="48" stroke="#1565C0" stroke-width="1.5"/>
      <text x="152" y="32" font-size="12" fill="#1565C0" text-anchor="middle">底辺 16cm</text>
      <line x1="280" y1="56" x2="280" y2="182" stroke="#E53935" stroke-width="1.5"/>
      <line x1="274" y1="56" x2="286" y2="56" stroke="#E53935" stroke-width="1.5"/>
      <line x1="274" y1="182" x2="286" y2="182" stroke="#E53935" stroke-width="1.5"/>
      <text x="298" y="119" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 298 119)">高さ ？</text>
      </svg>`,
  },
},

{
  id: 'g6_plane_005_v01',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の高さを求める（類題1）',
  text: '面積が90cm²の平行四辺形があります。底辺が15cmのとき、高さは何cmですか？',
  answer: 6,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く\n高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
面積の公式を逆向きに使うと、面積と底辺から高さを求められる。

【解説】
① 平行四辺形の面積は、底辺×高さ。
② 面積90cm²、底辺15cmなので、
《高さ×15＝90》
という式になる。
《③ 高さ＝90÷15＝6cm》

【広げてみよう】
「底辺×高さ＝面積」の公式は、底辺・高さ・面積のうち2つが分かれば残り1つを求められる。三角形の公式(÷2が付く)も同じ考え方で逆算できる。

【確認】
《15×6＝90cm²》
もとの面積と一致する。

答え：6cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 15, height: 6, area: 90 },
  expandAdvice: '底辺や高さを求める問題が出たら、公式のどの文字を求めればいいか、自分で整理するくせをつけよう！',
  tags: ['平面図形', '平行四辺形', '逆算'],
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺・高さに合わせて頂点・寸法線・viewBoxを再計算。高さは未知表示。
    markup: `<svg viewBox="0 0 368 174" width="100%" style="max-width:368px;display:block;margin:0 auto" role="img" aria-label="底辺15cm、面積90cm²、高さは未知、右肩上がりの平行四辺形">
      <polygon points="68,40 278,40 250,124 40,124" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <text x="159" y="86" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積90cm²</text>
      <line x1="40" y1="138" x2="250" y2="138" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="40" y1="132" x2="40" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="250" y1="132" x2="250" y2="144" stroke="#1565C0" stroke-width="1.5"/>
      <text x="145" y="158" font-size="12" fill="#1565C0" text-anchor="middle">底辺 15cm</text>
      <line x1="294" y1="40" x2="294" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <line x1="288" y1="40" x2="300" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="288" y1="124" x2="300" y2="124" stroke="#E53935" stroke-width="1.5"/>
      <text x="312" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 312 82)">高さ ？</text>
      </svg>`,
  },
},

{
  id: 'g6_plane_005_v02',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '平行四辺形の面積', pattern: '辺の逆算',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の高さを求める（類題2・向きを変えた問題）',
  text: '下の図のように、傾きの向きが逆になっている平行四辺形があります。面積が96cm²、底辺が8cmのとき、高さは何cmですか？',
  answer: 12,
  hint: '面積 ＝ 底辺 × 高さ を高さについて解く(傾きの向きが変わっても公式は同じ)\n高さ ＝ 面積 ÷ 底辺',
  solution: `【ポイント】
平行四辺形の傾きの向きが変わっても、面積の公式(底辺×高さ)を逆向きに使う考え方は同じ。

【解説】
① 図の傾きの向きが変わっていても、底辺とそれに垂直な高さの組を見つければよい。底辺は8cm。
② 面積96cm²、底辺8cmなので、
《高さ×8＝96》
という式になる。
《③ 高さ＝96÷8＝12cm》

【広げてみよう】
「底辺×高さ＝面積」の公式は、平行四辺形がどちら向きに傾いていても変わらない。傾きに惑わされず、底辺とそれに垂直な高さの組を見つけることが大切。

【確認】
《8×12＝96cm²》
もとの面積と一致する。

答え：12cm`,
  expandVisual: 'parallelogram-formula-slot',
  expandVisualData: { base: 8, height: 12, area: 96 },
  expandAdvice: '底辺や高さを求める問題が出たら、公式のどの文字を求めればいいか、自分で整理するくせをつけよう！',
  tags: ['平面図形', '平行四辺形', '逆算', '向き'],
  diagram: {
    kind: 'svg',
    // 縮尺14px/cm。底辺・高さに合わせて頂点・寸法線・viewBoxを再計算。高さは未知表示。
    markup: `<svg viewBox="0 0 270 258" width="100%" style="max-width:270px;display:block;margin:0 auto" role="img" aria-label="底辺8cm、面積96cm²、高さは未知、左肩上がりの平行四辺形">
      <polygon points="40,40 152,40 180,208 68,208" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <text x="110" y="128" font-size="12" fill="#1a1a2e" text-anchor="middle" font-weight="bold">面積96cm²</text>
      <line x1="68" y1="222" x2="180" y2="222" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="68" y1="216" x2="68" y2="228" stroke="#1565C0" stroke-width="1.5"/>
      <line x1="180" y1="216" x2="180" y2="228" stroke="#1565C0" stroke-width="1.5"/>
      <text x="124" y="242" font-size="12" fill="#1565C0" text-anchor="middle">底辺 8cm</text>
      <line x1="196" y1="40" x2="196" y2="208" stroke="#E53935" stroke-width="1.5"/>
      <line x1="190" y1="40" x2="202" y2="40" stroke="#E53935" stroke-width="1.5"/>
      <line x1="190" y1="208" x2="202" y2="208" stroke="#E53935" stroke-width="1.5"/>
      <text x="214" y="124" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 214 124)">高さ ？</text>
      </svg>`,
  },
},

/* ── P-05 正方形・長方形・ひし形の面積（公式単体） ── */
{
  id: 'g6_plane_021',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '正方形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '正方形の面積（基本）',
  text: '1辺が9cmの正方形があります。面積を求めなさい。',
  answer: 81,
  hint: '正方形の面積 ＝ 1辺 × 1辺',
  solution: `【ポイント】
正方形の面積は、1辺×1辺で求められる。

【解説】
① 正方形は4つの辺の長さがすべて等しい四角形で、1辺の長さは9cm。
② 正方形の面積は、1辺×1辺なので、9×9を計算する。
《③ 9×9＝81cm²》

【広げてみよう】
正方形は、たてとよこの長さが等しい長方形と見ることもできる。長方形の面積の公式「たて×よこ」に、たてとよこの両方に9cmを当てはめても、9×9＝81cm²になり、同じ答えになる。

【確認】
《81÷9＝9》
もとの1辺の長さと一致する。

答え：81cm²`,
  expandVisual: 'square-formula-slot',
  expandVisualData: { side: 9, area: 81 },
  expandAdvice: '正方形を見たら「たて・よこが同じ長さの長方形」と考えて、長方形の公式とのつながりを意識できるようにしよう！',
  tags: ['平面図形', '正方形'],
  diagram: {
    kind: 'svg',
    // 14px/cm: 9×14=126px、左右余白47px・上下の寸法表示余白から220×210。
    markup: `<svg viewBox="0 0 220 210" width="100%" style="max-width:220px;display:block;margin:0 auto" role="img" aria-label="4辺が等しく、1辺9cmの正方形">
      <polygon points="47,40 173,40 173,166 47,166" fill="#CE93D8" stroke="#6A1B9A" stroke-width="2"/>
      <g stroke="#6A1B9A" stroke-width="2">
        <line x1="110" y1="36" x2="110" y2="44"/>
        <line x1="169" y1="103" x2="177" y2="103"/>
        <line x1="110" y1="162" x2="110" y2="170"/>
        <line x1="43" y1="103" x2="51" y2="103"/>
      </g>
      <g stroke="#1565C0" stroke-width="1.5">
        <line x1="47" y1="180" x2="173" y2="180"/>
        <line x1="47" y1="174" x2="47" y2="186"/>
        <line x1="173" y1="174" x2="173" y2="186"/>
      </g>
      <text x="110" y="200" font-size="12" fill="#1565C0" text-anchor="middle">1辺 9cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_022',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '長方形の面積', pattern: '公式適用',
  difficulty: 1, answerType: 'number', answerUnit: 'cm²',
  title: '長方形の面積（基本）',
  text: 'たて6cm、よこ11cmの長方形があります。面積を求めなさい。',
  answer: 66,
  hint: '長方形の面積 ＝ たて × よこ',
  solution: `【ポイント】
長方形の面積は、たて×よこで求められる。

【解説】
① たては6cm、よこは11cm。
② 長方形の面積は、たて×よこなので、6×11を計算する。
《③ 6×11＝66cm²》

【広げてみよう】
長方形は、1辺1cmの正方形(面積1cm²)を、たてに6個・よこに11個すき間なく並べた形と考えられる。たて×よこの計算は、この1cm²の正方形が全部でいくつ並ぶかを求めていることと同じ。

【確認】
《66÷6＝11》
もとのよこの長さと一致する。

答え：66cm²`,
  expandVisual: 'rectangle-formula-slot',
  expandVisualData: { vertical: 6, horizontal: 11, area: 66 },
  expandAdvice: '面積の公式はいつも「2つの長さの積」であることを意識して、たてとよこを求める逆算にも挑戦できるようにしよう！',
  tags: ['平面図形', '長方形'],
  diagram: {
    kind: 'svg',
    // 14px/cm: よこ11×14=154px、たて6×14=84px。寸法表示余白込み280×170。
    markup: `<svg viewBox="0 0 280 170" width="100%" style="max-width:280px;display:block;margin:0 auto" role="img" aria-label="たて6cm、よこ11cmの長方形">
      <polygon points="50,40 204,40 204,124 50,124" fill="#FFF59D" stroke="#F9A825" stroke-width="2"/>
      <g stroke="#1565C0" stroke-width="1.5">
        <line x1="50" y1="138" x2="204" y2="138"/>
        <line x1="50" y1="132" x2="50" y2="144"/>
        <line x1="204" y1="132" x2="204" y2="144"/>
      </g>
      <text x="127" y="158" font-size="12" fill="#1565C0" text-anchor="middle">よこ 11cm</text>
      <g stroke="#E53935" stroke-width="1.5">
        <line x1="220" y1="40" x2="220" y2="124"/>
        <line x1="214" y1="40" x2="226" y2="40"/>
        <line x1="214" y1="124" x2="226" y2="124"/>
      </g>
      <text x="242" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 242 82)">たて 6cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_023',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: 'ひし形の面積', pattern: '公式適用',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: 'ひし形の面積（基本）',
  text: '対角線の長さが14cmと10cmのひし形があります。面積を求めなさい。',
  answer: 70,
  hint: 'ひし形の面積 ＝ 対角線1 × 対角線2 ÷ 2',
  solution: `【ポイント】
ひし形の面積は、対角線×対角線÷2で求められる。

【解説】
① ひし形の2本の対角線は、それぞれ14cmと10cm。
② ひし形の面積は、対角線×対角線÷2なので、14×10÷2を計算する。
《③ 14×10÷2＝140÷2＝70cm²》

【広げてみよう】
ひし形の2本の対角線は、たがいに直角に交わり、それぞれを2等分する。この2本の対角線を使って、ひし形をちょうど囲む「たて10cm×よこ14cmの長方形」を考えると、ひし形の面積はその長方形のちょうど半分になっている。だから、対角線×対角線÷2という÷2の付いた公式になる。

【確認】
《14×10＝140(ひし形を囲む長方形の面積)、140÷2＝70》
もとのひし形の面積と一致する。

答え：70cm²`,
  expandVisual: 'rhombus-formula-slot',
  expandVisualData: { diag1: 14, diag2: 10, area: 70 },
  expandAdvice: 'ひし形を見たら、2本の対角線が直角に交わって作る長方形の半分として面積をとらえられるようにしよう！',
  tags: ['平面図形', 'ひし形'],
  diagram: {
    kind: 'svg',
    // 14px/cm: 対角線196px×140px、中心(160,110)。寸法表示余白込み320×220。
    markup: `<svg viewBox="0 0 320 220" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="対角線14cmと10cmが直角に交わり、それぞれを2等分するひし形">
      <polygon points="160,40 258,110 160,180 62,110" fill="#80CBC4" stroke="#00695C" stroke-width="2"/>
      <line x1="62" y1="110" x2="258" y2="110" stroke="#1565C0" stroke-width="1.5" stroke-dasharray="5 4"/>
      <line x1="160" y1="40" x2="160" y2="180" stroke="#E53935" stroke-width="1.5" stroke-dasharray="5 4"/>
      <path d="M160 102 H168 V110" fill="none" stroke="#00695C" stroke-width="1.5"/>
      <g stroke="#1565C0" stroke-width="1.5">
        <line x1="62" y1="194" x2="258" y2="194"/>
        <line x1="62" y1="188" x2="62" y2="200"/>
        <line x1="258" y1="188" x2="258" y2="200"/>
      </g>
      <text x="160" y="214" font-size="12" fill="#1565C0" text-anchor="middle">対角線 14cm</text>
      <g stroke="#E53935" stroke-width="1.5">
        <line x1="274" y1="40" x2="274" y2="180"/>
        <line x1="268" y1="40" x2="280" y2="40"/>
        <line x1="268" y1="180" x2="280" y2="180"/>
      </g>
      <text x="296" y="110" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 296 110)">対角線 10cm</text>
    </svg>`,
  },
},

/* ── P-29 三角形・四角形の性質と対角線 ── */
{
  id: 'g6_plane_024',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '二等辺三角形の性質', pattern: '底角が等しい',
  difficulty: 1, answerType: 'number', answerUnit: '度',
  title: '二等辺三角形の角の性質',
  text: '二等辺三角形ABCがあります。AB＝ACで、角Bの大きさは63°です。\n角Aの大きさを求めなさい。',
  answer: 54,
  hint: 'AB＝ACの二等辺三角形では、底角(角Bと角C)の大きさが等しい。三角形の内角の和は180°。',
  solution: `【ポイント】
AB＝ACの二等辺三角形では、底辺BCに対する2つの角(角Bと角C)の大きさが等しい。

【解説】
① AB＝ACなので、角Bと角Cは底角であり、大きさが等しい。
② 角Bは63°なので、角Cも63°になる。
③ 三角形の内角の和は180°なので、角Aは、
《角A＝180－63－63＝54°》

【広げてみよう】
二等辺三角形を、頂角Aから底辺BCへ垂直に引いた線で折ると、角Bと角Cがぴったり重なる。これは三角形ABCが、その折り目の線を軸とした線対称の図形になっているから。正三角形も、3つの角がすべて等しい二等辺三角形の特別な場合と考えられる。

【確認】
《54＋63＋63＝180°》
三角形の内角の和と一致する。

答え：54°`,
  tags: ['平面図形', '三角形', '二等辺三角形', '角度'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 240 200" width="100%" style="max-width:240px;display:block;margin:0 auto" role="img" aria-label="ABとACが等しい二等辺三角形ABC。角Bは63度、角Aを求める">
      <polygon points="120,30 40,170 200,170" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
      <g stroke="#1565C0" stroke-width="2"><line x1="74" y1="97" x2="86" y2="103"/><line x1="154" y1="103" x2="166" y2="97"/></g>
      <g font-size="14" fill="#333" text-anchor="middle"><text x="120" y="20">A</text><text x="29" y="185">B</text><text x="211" y="185">C</text></g>
      <text x="64" y="156" font-size="14" fill="#1565C0">63°</text>
      <text x="120" y="69" font-size="18" fill="#E53935" text-anchor="middle">？</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_025',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '対角線の性質', pattern: '互いの中点で交わる',
  difficulty: 2, answerType: 'number', answerUnit: 'cm',
  title: '平行四辺形の対角線の交点',
  text: '平行四辺形ABCDの対角線ACとBDは、点Oで交わります。平行四辺形の対角線は、それぞれの中点で交わる性質があります。\n対角線ACの長さが18cm、対角線BDの長さが12cmのとき、OAの長さとODの長さの和を求めなさい。',
  answer: 15,
  hint: '対角線はそれぞれの中点で交わるので、OAは対角線ACの半分、ODは対角線BDの半分になる。',
  solution: `【ポイント】
平行四辺形の対角線は、それぞれの中点で交わる。

【解説】
① 点OはACの中点なので、OAはACの半分の長さになる。
《② OA＝18÷2＝9cm》
③ 点OはBDの中点でもあるので、ODはBDの半分の長さになる。
《④ OD＝12÷2＝6cm》
⑤ OAとODの長さの和は、
《⑥ 9＋6＝15cm》

【広げてみよう】
対角線が互いの中点で交わるという性質は、平行四辺形だけでなく、長方形・ひし形・正方形でも成り立つ(これらはすべて平行四辺形の仲間だから)。ただし、対角線の長さそのものが等しくなる(OA＝OB＝OC＝OD)のは、長方形・正方形のように対角線の長さが等しい図形に限られる。

【確認】
《OA＋OC＝9＋9＝18cm》
対角線ACの長さと一致する。
《OB＋OD＝6＋6＝12cm》
対角線BDの長さとも一致する。

答え：15cm`,
  tags: ['平面図形', '四角形', '対角線', '平行四辺形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 320 210" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="平行四辺形ABCD。対角線ACは18cm、BDは12cmで、中点Oで交わる">
      <polygon points="52,51 88,141 268,159 232,69" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
      <line x1="52" y1="51" x2="268" y2="159" stroke="#1565C0" stroke-width="1.5" stroke-dasharray="5 4"/>
      <line x1="88" y1="141" x2="232" y2="69" stroke="#E53935" stroke-width="1.5" stroke-dasharray="5 4"/>
      <circle cx="160" cy="105" r="3" fill="#333"/>
      <g font-size="14" fill="#333" text-anchor="middle"><text x="42" y="45">A</text><text x="76" y="153">B</text><text x="280" y="172">C</text><text x="243" y="65">D</text><text x="160" y="126">O</text></g>
      <text x="108" y="69" font-size="12" fill="#1565C0" text-anchor="middle" transform="rotate(26.565 108 69)" stroke="white" stroke-width="3" paint-order="stroke">対角線AC 18cm</text>
      <text x="204" y="100" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-26.565 204 100)" stroke="white" stroke-width="3" paint-order="stroke">対角線BD 12cm</text>
    </svg>`,
  },
},

{
  id: 'g6_plane_026',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '対角線の性質', pattern: '垂直に中点で交わる',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '正方形の対角線と三角形の面積',
  text: '正方形ABCDがあります。2本の対角線AC、BDは、点Oで垂直に交わり、それぞれの中点で交わります。対角線の長さは16cmです。\n三角形OABの面積を求めなさい。',
  answer: 32,
  hint: '対角線はそれぞれの中点で交わるので、OA、OBはどちらも対角線の半分の長さになる。角AOBは直角。',
  solution: `【ポイント】
正方形の対角線は、それぞれの中点で垂直に交わる。この2つの性質を使うと、対角線で区切られた三角形の面積を求められる。

【解説】
① 対角線の長さは16cmで、点Oはその中点なので、
《OA＝OB＝16÷2＝8cm》
② 2本の対角線は垂直に交わるので、角AOBは直角になる。
③ 三角形OABは、OAとOBを直角をはさむ2辺とする直角三角形とみなせるので、面積は、
《8×8÷2＝32cm²》

【広げてみよう】
同じように考えると、三角形OBC、OCD、ODAもすべてOA＝OB＝OC＝OD＝8cmの直角二等辺三角形になり、4つとも合同で面積が等しい。正方形全体の面積は32×4＝128cm²で、ひし形の面積公式(対角線×対角線÷2)を正方形(対角線が等しいひし形の仲間)に当てはめた16×16÷2＝128cm²とも一致する。

【確認】
《32×4＝128cm²》
正方形全体の面積と一致する。

答え：32cm²`,
  expandVisual: 'diagonal-quarter',
  expandVisualData: { pairPercent: 50 },
  expandAdvice: '対角線の交点を見つけたら、「中点で交わるか」「垂直に交わるか」の2つの性質を両方使えないか考えられるようにしよう！',
  tags: ['平面図形', '四角形', '対角線', '正方形'],
  diagram: {
    kind: 'svg',
    markup: `<svg viewBox="0 0 320 320" width="100%" style="max-width:320px;display:block;margin:0 auto" role="img" aria-label="正方形ABCDの対角線は16cm。中点Oで垂直に交わり、三角形OABを強調">
      <polygon points="160,40 280,160 160,280 40,160" fill="#CE93D8" stroke="#6A1B9A" stroke-width="2"/>
      <polygon points="160,160 160,40 280,160" fill="#F3E5F5" stroke="#6A1B9A" stroke-width="1"/>
      <text x="205" y="123" font-size="18" fill="#E53935" text-anchor="middle">？</text>
      <line x1="160" y1="40" x2="160" y2="280" stroke="#E53935" stroke-width="1.5" stroke-dasharray="5 4"/>
      <line x1="40" y1="160" x2="280" y2="160" stroke="#1565C0" stroke-width="1.5" stroke-dasharray="5 4"/>
      <path d="M160 150 H170 V160" fill="none" stroke="#6A1B9A" stroke-width="1.5"/>
      <circle cx="160" cy="160" r="3" fill="#6A1B9A"/>
      <g font-size="14" fill="#333" text-anchor="middle"><text x="160" y="28">A</text><text x="295" y="165">B</text><text x="160" y="300">C</text><text x="25" y="165">D</text><text x="146" y="180">O</text></g>
      <text x="142" y="220" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 142 220)" stroke="white" stroke-width="3" paint-order="stroke">対角線 16cm</text>
    </svg>`,
  },
},

/* ── P-11 相似の発見(直角着目型) ── */
{
  id: 'g6_plane_027',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '相似の発見', pattern: '直角三角形の高さ(ミミ相似)',
  difficulty: 3, answerType: 'number', answerUnit: 'cm',
  title: '直角三角形の高さと相似',
  text: '直角三角形ABC(角C＝90°)があります。頂点Cから辺AB(斜辺)に垂線を引き、ABとの交点をHとします。AH＝9cm、BH＝16cmのとき、CHの長さを求めなさい。',
  answer: 12,
  hint: '垂線CHによって三角形ABCは三角形ACHと三角形CBHに分かれる。この2つは相似になる(角Aと角BCHが等しい)。AH：CH＝CH：BHの比例式が作れる。',
  solution: `【ポイント】
ある角とたして90°になる角を、その角の余角という。同じ角の余角どうしは、いつも同じ大きさになる。

【解説】
① 垂線CHによって、三角形ABCは三角形ACHと三角形CBHの2つの直角三角形に分かれる。角AHC、角CHBはどちらも90°。
② 三角形ABCは角Cが90°なので、角A＋角B＝90°。また、CHは角Cを角ACHと角BCHに分けているので、角ACH＋角BCH＝90°。
③ 角Aと角BCHは、どちらも角ACHの余角なので、同じ大きさ。同じように、角Bと角ACHも角BCHの余角どうしなので、同じ大きさ。
④ 角A＝角BCHで、どちらの三角形も直角をもつので、三角形ACHと三角形CBHは相似である(2つとも三角形ABCとも相似)。対応する辺の比から、
《AH：CH＝CH：BH》
⑤ 9：CH＝CH：16にあてはめる。比例式では、外側どうしの積と内側どうしの積が等しくなるので、
《CH×CH＝9×16＝144》
⑥ 2回かけて144になる数を探すと、12×12＝144なので、
《CH＝12cm》

【広げてみよう】
この「直角三角形の高さが作る3つの相似」はとてもよく出てくる形で、CHだけでなく、辺AC・BCを求める問題にも同じしくみが使える。AH：AC＝AC：ABの比例式からAC×AC＝9×25＝225、AC＝15cm。BH：BC＝BC：ABの比例式からBC×BC＝16×25＝400、BC＝20cmになる。直角三角形の中に垂線が引かれているのを見たら、まず「3つの相似な直角三角形」を探す習慣をつけるとよい。

【確認】
《AC＝15cm、BC＝20cmとすると、AC×BC÷2＝15×20÷2＝150cm²》
《AB×CH÷2＝(9＋16)×12÷2＝25×12÷2＝150cm²》
三角形ABCの面積を、直角をはさむ2辺(AC・BC)から求めても、底辺ABと高さCHから求めても、どちらも150cm²で一致する。

答え：12cm`,
  expandVisual: 'triangle-altitude-similarity',
  expandVisualData: { ah: 9, bh: 16, ch: 12 },
  expandAdvice: '直角三角形の中に垂線が見えたら、「3つの相似な直角三角形」が隠れていないか、まず角の対応を探せるようにしよう！',
  tags: ['平面図形', '相似', '直角三角形'],
  diagram: { kind: 'svg', markup: `<svg viewBox="0 0 280 170" width="100%" style="max-width:280px;display:block;margin:0 auto" role="img" aria-label="直角三角形ABC。斜辺AB上のHに垂線CHを引き、AHは9cm、BHは16cm、CHは不明">
    <polygon points="40,140 240,140 112,44" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
    <line x1="112" y1="44" x2="112" y2="140" stroke="#E53935" stroke-width="1.5"/>
    <path d="M104,140 L104,132 L112,132 M107.2,50.4 L113.6,55.2 L118.4,48.8" fill="none" stroke="#555" stroke-width="1.3"/>
    <g font-size="12" fill="#1a1a2e"><text x="26" y="144">A</text><text x="246" y="144">B</text><text x="108" y="35">C</text><text x="108" y="155">H</text></g>
    <text x="74" y="167" font-size="12" text-anchor="middle" fill="#1565C0">AH 9cm</text><text x="181" y="167" font-size="12" text-anchor="middle" fill="#E53935">BH 16cm</text>
    <text x="120" y="100" font-size="16" fill="#E53935">？</text>
  </svg>` },
},

{
  id: 'g6_plane_028',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '相似の発見', pattern: '直角三角形の重なり(イカ相似)',
  difficulty: 4, answerType: 'number', answerUnit: 'cm',
  title: '正方形の中にできる直角三角形の相似',
  text: '1辺9cmの正方形ABCDがあります。辺AB上に点P、辺BC上に点Qをとり、PDとPQが垂直に交わるようにします。AP＝6cmのとき、BQの長さを求めなさい。',
  answer: 2,
  hint: '三角形APDと三角形BQPは、どちらも直角三角形で、角ADPと角BPQが等しくなる(余角の関係)。AP：BQ＝AD：BPの比例式が作れる。',
  solution: `【ポイント】
点Pを通る一直線上に3つの角が並んでいるとき、その3つの角の和は180°になる。この性質と「同じ角の余角は等しい」を組み合わせると、離れて見える2つの直角三角形の間にも、同じ角を見つけられる。

【解説】
① 直角三角形APDと直角三角形BQPに注目する。角Aと角Bは、どちらも正方形の角なので90°。
② 点Pでは、点A・P・Bが一直線上にあるので、角APD＋角DPQ＋角QPBを足すと180°になる。角DPQは90°(PDとPQが垂直)なので、
《角APD＋角QPB＝180－90＝90°》
③ 一方、三角形APDは角Aが90°の直角三角形なので、
《角APD＋角ADP＝90°》
②と③はどちらも「角APDに何かを足すと90°になる」という形なので、
《角QPB＝角ADP》
④ 同じように考えると、角APDと角BQPも同じ大きさになる。だから三角形APDと三角形BQPは相似である。対応する辺の比から、
《AP：BQ＝AD：BP》
⑤ AP＝6cm、AD(正方形の1辺)＝9cm、BP＝9－6＝3cmなので、
《6：BQ＝9：3》
⑥ 比例式の性質(外側どうしの積＝内側どうしの積)より、6×3＝9×BQなので、
《BQ＝6×3÷9＝2cm》

【広げてみよう】
この問題のように、2つの直角三角形が直角の頂点を共有せず、離れた場所にあるように見えても、「一直線上の角の和は180°」「同じ角の余角は等しい」を手がかりにすると、隠れた相似を見つけられることがある。平行線がなくても相似が作れる点が、ピラミッド型・クロス型(平行線を使う相似)との大きな違いである。

【確認】
《AP÷BQ＝6÷2＝3》
《AD÷BP＝9÷3＝3》
相似な三角形の対応する辺の比は、どちらを計算しても同じ値(3)になるはずなので、この一致によりBQ＝2cmが正しいことが確認できる。

答え：2cm`,
  expandVisual: 'square-perpendicular-similarity',
  expandVisualData: { ap: 6, bp: 3, ad: 9, bq: 2 },
  expandAdvice: '直角三角形どうしが離れて見えても、一直線上の角の和(180°)や余角の関係を使えば、隠れた相似を見つけられることを意識しよう！',
  tags: ['平面図形', '相似', '直角三角形', '正方形'],
  diagram: { kind: 'svg', markup: `<svg viewBox="0 0 260 230" width="100%" style="max-width:260px;display:block;margin:0 auto" role="img" aria-label="1辺9cmの正方形ABCD。辺AB上のPはAPが6cm、BPが3cm。PDとPQは垂直で、辺BC上のQまでのBQは不明">
    <polygon points="40,40 200,40 200,200 40,200" fill="none" stroke="#1a1a2e" stroke-width="2"/>
    <path d="M146.667,40 L40,200 M146.667,40 L200,75.556" fill="none" stroke="#555" stroke-width="2"/>
    <path d="M142.229,46.656 L148.885,51.094 L153.323,44.438" fill="none" stroke="#555" stroke-width="1.3"/>
    <g font-size="12" fill="#1a1a2e"><text x="26" y="40">A</text><text x="206" y="38">B</text><text x="206" y="211">C</text><text x="26" y="211">D</text><text x="143" y="36">P</text><text x="209" y="83">Q</text></g>
    <text x="90" y="22" font-size="12" text-anchor="middle" fill="#1565C0">AP 6cm</text><text x="176" y="22" font-size="12" text-anchor="middle" fill="#E53935">BP 3cm</text>
    <text x="13" y="125" font-size="12" fill="#E53935">9cm</text><text x="211" y="62" font-size="16" fill="#E53935">？</text>
  </svg>` },
},

/* ── P-09 等積変形と等しい高さ ── */
{
  id: 'g6_plane_029',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形', pattern: '等しい高さ(頂点のスライド)',
  difficulty: 2, answerType: 'number', answerUnit: 'cm²',
  title: '頂点を動かしても変わらない面積',
  text: '下の図のように、平行な2本の直線ℓ、mがあります。直線ℓ上にA、Bの2点があり、AB＝10cmです。直線m上に点Pをとり、三角形ABPを作ります。直線ℓとmの間の長さは6cmです。\n点Pを直線m上のどこに動かしても、三角形ABPの面積は変わりません。三角形ABPの面積を求めなさい。',
  answer: 30,
  hint: '三角形の面積＝底辺×高さ÷2。点Pがどこにあっても、底辺ABの長さと、直線ℓとmの間のきょり(高さ)は変わらない。',
  solution: `【ポイント】
底辺が同じで高さも同じなら、頂点の位置がどこに動いても三角形の面積は変わらない。

【解説】
① 三角形ABPの底辺はAB。点Pをどこに動かしても、底辺の長さはAB＝10cmのまま変わらない。
② 三角形ABPの高さは、頂点Pから底辺AB(直線ℓ)までの垂直な距離にあたる。点Pは直線m上にあり、直線ℓとmの間のきょりはどこでも6cmなので、高さも6cmのまま変わらない。
《③ 面積＝10×6÷2＝30cm²》

【広げてみよう】
このように、底辺を固定したまま、頂点を底辺に平行な直線上でどこに動かしても面積が変わらない変形を「等積変形」という。見た目の三角形の形(とがり方)は大きく変わっても、底辺と高さが変わらなければ面積はいつも同じになる。

【確認】
《点Pを直線mの別の場所に動かしても、底辺AB＝10cm・高さ6cmは変わらないので、面積は常に10×6÷2＝30cm²になる》
どの位置のPで計算しても、同じ答えになることが確認できる。

答え：30cm²`,
  expandVisual: 'equal-height-slide',
  expandVisualData: { base: 10, height: 6, area: 30 },
  expandAdvice: '頂点が動いても、底辺と高さが変わらなければ面積も変わらないことを、形が変わっても恐れずに使えるようにしよう！',
  tags: ['平面図形', '三角形', '等積変形'],
  diagram: { kind: 'svg', markup: `<svg viewBox="0 0 380 180" width="100%" style="max-width:380px;display:block;margin:0 auto" role="img" aria-label="平行な直線ℓとmの間は高さ6cm。底辺ABは10cmで固定し、頂点Pの候補P₁、P₂、P₃は直線m上にある">
    <defs><marker id="p09-height-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10" fill="#E53935"/></marker></defs>
    <path d="M58,40 H340 M58,124 H340" fill="none" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4 4"/>
    <g font-size="12" fill="#777"><text x="345" y="44">m</text><text x="345" y="128">ℓ</text></g>
    <polygon points="110,124 250,124 140,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
    <path d="M110,124 L140,40 L250,124 M110,124 L230,40 L250,124 M110,124 L320,40 L250,124" fill="none" stroke="#7c3aed" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="4 4"/>
    <line x1="110" y1="124" x2="250" y2="124" stroke="#1565C0" stroke-width="3"/>
    <line x1="65" y1="40" x2="65" y2="124" stroke="#E53935" marker-start="url(#p09-height-arrow)" marker-end="url(#p09-height-arrow)"/>
    <text x="48" y="82" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 48 82)">高さ6cm</text>
    <g font-size="12" fill="#1a1a2e" text-anchor="middle"><text x="140" y="30">P₁</text><text x="230" y="30">P₂</text><text x="320" y="30">P₃</text><text x="100" y="139">A</text><text x="260" y="139">B</text></g>
    <text x="180" y="145" font-size="12" fill="#1565C0" text-anchor="middle">AB 10cm</text>
    <text x="190" y="168" font-size="10" fill="#777" text-anchor="middle">※ 図のPの位置は一例です</text>
  </svg>` },
},

{
  id: 'g6_plane_030',
  catId: 'pc-plane', grade: 6, course: 'exam',
  mainCategory: 'plane_geometry', lessonUnit: '等積変形', pattern: '形がちがっても等しい面積',
  difficulty: 3, answerType: 'number', answerUnit: 'cm²',
  title: '形がちがっても面積が同じ三角形',
  text: '三角形ABCは、底辺BC＝9cm、高さ8cmの直角三角形です。\n三角形DEFは、三角形ABCと底辺の長さ・高さがどちらも同じです(底辺EF＝9cm、高さ8cm)。ただし、三角形DEFは二等辺三角形で、三角形ABCとは形がちがいます。\n三角形DEFの面積を求めなさい。',
  answer: 36,
  hint: '三角形の面積は底辺×高さ÷2で決まる。形(とがり方)がちがっても、底辺と高さがどちらも同じなら面積も同じになる。',
  solution: `【ポイント】
三角形の面積は底辺×高さ÷2で決まる。直角三角形か二等辺三角形かといった形のちがいは、面積の値そのものには関係しない。

【解説】
① 三角形ABCは、底辺BC＝9cm、高さ8cmの直角三角形。
《② 三角形ABCの面積＝9×8÷2＝36cm²》
③ 三角形DEFは、底辺EF＝9cm、高さ8cmで、三角形ABCと底辺・高さがどちらも同じ。
④ 面積の公式(底辺×高さ÷2)に当てはめる数(9と8)が三角形ABCと全く同じなので、形がちがっていても、
《⑤ 三角形DEFの面積＝9×8÷2＝36cm²》

【広げてみよう】
この問題のように、見た目の形(直角三角形か二等辺三角形か)がどんなにちがっても、「底辺の長さ」と「高さ」の2つの数値だけで面積が決まる。逆に言うと、面積の公式に出てくる数値以外(角の大きさなど)は、面積そのものには関係しない。

【確認】
《36÷9＝4(高さの半分)、4×2＝8》
三角形DEFの高さがもとの8cmと一致することから、面積36cm²が正しいと確認できる。

答え：36cm²`,
  tags: ['平面図形', '三角形', '等積変形', '面積'],
  diagram: { kind: 'svg', markup: `<svg viewBox="0 0 350 190" width="100%" style="max-width:350px;display:block;margin:0 auto" role="img" aria-label="底辺9cm、高さ8cmが共通の直角三角形ABCと二等辺三角形DEFを並べた図">
    <path d="M28,32 H335 M28,144 H335" fill="none" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4 4"/>
    <polygon points="48,32 48,144 174,144" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
    <polygon points="263,32 200,144 326,144" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
    <path d="M48,134 H58 V144" fill="none" stroke="#555" stroke-width="1.3"/>
    <line x1="263" y1="32" x2="263" y2="144" stroke="#E53935" stroke-width="1.5" stroke-dasharray="4 4"/>
    <path d="M263,134 H273 V144" fill="none" stroke="#E53935" stroke-width="1.3"/>
    <line x1="29" y1="32" x2="29" y2="144" stroke="#E53935" stroke-width="1.5"/>
    <path d="M24,32 H34 M24,144 H34" stroke="#E53935" stroke-width="1.5"/>
    <text x="17" y="88" font-size="12" fill="#E53935" text-anchor="middle" transform="rotate(-90 17 88)">高さ8cm</text>
    <g font-size="12" fill="#1a1a2e" text-anchor="middle"><text x="48" y="22">A</text><text x="40" y="159">B</text><text x="179" y="159">C</text><text x="263" y="22">D</text><text x="197" y="159">E</text><text x="331" y="159">F</text></g>
    <g font-size="12" fill="#1565C0" text-anchor="middle"><text x="111" y="165">BC 9cm</text><text x="263" y="165">EF 9cm</text></g>
  </svg>` },
}
];
