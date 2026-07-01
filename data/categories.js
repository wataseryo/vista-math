/* ════════════════════════════════════════
   STANDARD COURSE DATA
════════════════════════════════════════ */
const STANDARD_CHAPTERS = [
    { id: 'watertank', num: '第1章', title: '水と量の問題', sub: '水槽・流量・仕事算の基礎', tags: ['水槽問題', '流量計算'], available: true },
    { id: 'speed',    num: '第2章', title: '速さと時間',   sub: '速さ・時間・距離の関係',  tags: ['速さ計算', 'ダイヤグラム'], available: false },
    { id: 'ratio',    num: '第3章', title: '割合と比',     sub: '割合・面積図・比の利用',  tags: ['割合', '面積図', '比'], available: false },
    { id: 'cases',    num: '第4章', title: '場合の数',     sub: '順列・組み合わせ・樹形図', tags: ['樹形図', '組み合わせ'], available: false },
    { id: 'figures',  num: '第5章', title: '図形の面積',   sub: '補助線・分割・移動',      tags: ['面積', '補助線'], available: false },
];

/* ════════════════════════════════════════
   EXAM COURSE DATA
════════════════════════════════════════ */
const EXAM_UNITS = [
    { id: 'unit-water',   num: 'Unit 01', title: '水槽・仕事算',    sub: '複数の管・途中で条件が変わる問題', difficulty: 3, category: '水槽',     count: 2, available: true },
    { id: 'unit-speed',   num: 'Unit 02', title: '速さ算',          sub: '出会い算・追いかけ算',           difficulty: 3, category: '速さ',     count: 2, available: true },
    { id: 'unit-ratio',   num: 'Unit 03', title: '割合・食塩水',    sub: '濃度計算・混合問題',             difficulty: 4, category: '割合',     count: 1, available: true },
    { id: 'unit-plant',   num: 'Unit 04', title: '植木算',          sub: '間隔と本数の関係',               difficulty: 2, category: '植木算',   count: 1, available: true },
    { id: 'unit-crane',   num: 'Unit 05', title: 'つるかめ算',      sub: '仮定して差し引く解法',           difficulty: 3, category: 'つるかめ算', count: 1, available: true },
    { id: 'unit-surplus', num: 'Unit 06', title: '過不足算',        sub: '余りと不足から求める',           difficulty: 4, category: '過不足算', count: 1, available: true },
    { id: 'unit-age',     num: 'Unit 07', title: '年齢算・和差算',  sub: '準備中',                         difficulty: 3, category: null,       count: 0, available: false },
    { id: 'unit-ratio2',  num: 'Unit 08', title: '比の文章題',      sub: '準備中',                         difficulty: 4, category: null,       count: 0, available: false },
];

/* ════════════════════════════════════════
   GRADE-SPECIFIC DATA
════════════════════════════════════════ */
const STANDARD_CHAPTERS_G5 = [
    { id: 'watertank', num: '第1章', title: '水と量の問題',  sub: '水槽・流量の基礎', tags: ['水槽問題', '流量計算'], available: true },
    { id: 'speed-g5',  num: '第2章', title: '速さと時間',    sub: '速さ・時間・距離の三角形（みはじ）', tags: ['速さ計算', 'みはじ'], available: false },
    { id: 'ratio-g5',  num: '第3章', title: '割合と百分率',  sub: '何%・何倍の問題', tags: ['割合', '百分率'], available: false },
    { id: 'cases-g5',  num: '第4章', title: '場合の数',      sub: '順序よく数える・樹形図', tags: ['樹形図', '数え方'], available: false },
    { id: 'figures-g5',num: '第5章', title: '図形の面積',    sub: '三角形・台形・平行四辺形', tags: ['面積', '補助線'], available: false },
];
const STANDARD_CHAPTERS_G6 = [
    { id: 'watertank', num: '第1章', title: '水と量・仕事算', sub: '複数の管・仕事算・ニュートン算入門', tags: ['水槽問題', '仕事算'], available: true },
    { id: 'speed-g6',  num: '第2章', title: '速さの応用',    sub: '旅人算・通過算・流水算', tags: ['旅人算', '速さ応用'], available: false },
    { id: 'ratio-g6',  num: '第3章', title: '割合と比の応用', sub: '食塩水・売買損益・相当算', tags: ['食塩水', '比の利用'], available: false },
    { id: 'cases-g6',  num: '第4章', title: '場合の数 応用', sub: '順列・組み合わせ・確率入門', tags: ['順列', '組み合わせ'], available: false },
    { id: 'figures-g6',num: '第5章', title: '図形・空間図形', sub: '面積比・体積・図形の移動', tags: ['面積比', '体積'], available: false },
];

/* 8分野構成 ── 5年生 */
const EXAM_UNITS_G5 = [
    { id: 'u5-calc',    num: '①', icon: '🔢', title: '計算・数の処理',   sub: '工夫した計算・逆算・特殊な計算',          difficulty: 1, categories: ['計算'],                                              count: 0,  available: false },
    { id: 'u5-number',  num: '②', icon: '🔍', title: '数の性質・規則性', sub: '約数・倍数・余り・数列・周期算・場合分け', difficulty: 3, categories: ['数の性質','規則性'],                               count: 0,  available: false },
    { id: 'u5-ratio',   num: '③', icon: '⚖️', title: '割合・比',          sub: '割合・百分率・濃度・売買損益・比の利用',  difficulty: 4, categories: ['割合','売買損益'],                               count: 0,  available: false },
    { id: 'u5-special', num: '④', icon: '📝', title: '特殊算・文章題',   sub: '和差算・つるかめ算・年齢算・過不足算・植木算', difficulty: 3, categories: ['和差算','年齢算','つるかめ算','過不足算','植木算'], count: 10, available: true  },
    { id: 'u5-speed',   num: '⑤', icon: '🏃', title: '速さ',              sub: '速さの基本・旅人算・ダイヤグラム',        difficulty: 3, categories: ['速さ'],                                          count: 0,  available: false },
    { id: 'u5-plane',   num: '⑥', icon: '📐', title: '平面図形',          sub: '面積・角度・円・相似・図形移動',          difficulty: 4, categories: ['平面図形'],                                      count: 0,  available: false },
    { id: 'u5-solid',   num: '⑦', icon: '📦', title: '立体図形・水量',   sub: '体積・表面積・水そう・水深グラフ',        difficulty: 4, categories: ['水槽','立体'],                                   count: 0,  available: false },
    { id: 'u5-cases',   num: '⑧', icon: '🎯', title: '場合の数・論理',   sub: '順列・組合せ・樹形図・条件整理',         difficulty: 3, categories: ['場合の数'],                                      count: 0,  available: false },
];
/* 8分野構成 ── 6年生 */
const EXAM_UNITS_G6 = [
    { id: 'u6-calc',    num: '①', icon: '🔢', title: '計算・数の処理',   sub: '逆算・条件付き計算・工夫した計算',            difficulty: 2, categories: ['計算'],                                    count: 0,  available: false },
    { id: 'u6-number',  num: '②', icon: '🔍', title: '数・規則・論理',   sub: '約数・余り・規則性・推理・場合分け',          difficulty: 4, categories: ['数の性質','規則性'],                       count: 0,  available: false },
    { id: 'u6-ratio',   num: '③', icon: '⚖️', title: '割合・比の完成',   sub: '連比・相当算・売買・濃度・比融合問題',        difficulty: 5, categories: ['割合','比','割合の基本','売買損益','相当算','倍数算','仕事算','ニュートン算'],  count: 32, available: true  },
    { id: 'u6-salt',    num: '③+', icon: '🧪', title: '食塩水',          sub: '濃度計算・混合・蒸発・希釈',                  difficulty: 4, categories: ['食塩水'],                              count: 7,  available: true, topicScreen: 'salt' },
    { id: 'u6-special', num: '④', icon: '📝', title: '特殊算・文章題',   sub: '和差算・つるかめ算・過不足算・植木算・年齢算・平均算・分配算・集合算・消去算', difficulty: 4, categories: ['和差算','つるかめ算','過不足算','植木算','年齢算','平均算','消去算','分配算','集合算','水槽','ニュートン算'], count: 22, available: true  },
    { id: 'u6-speed',   num: '⑤', icon: '🏃', title: '速さの完成',       sub: '旅人算・流水算・通過算・ダイヤグラム・速さと比', difficulty: 4, categories: ['速さ','流水算','通過算','時計算','ダイヤグラム','速さと比'], count: 18, available: true  },
    { id: 'u6-plane',   num: '⑥', icon: '📐', title: '平面図形の完成',   sub: '面積比・相似・円・移動・図形融合',            difficulty: 5, categories: ['平面図形'],                            count: 0,  available: false },
    { id: 'u6-solid',   num: '⑦', icon: '📦', title: '立体図形の完成',   sub: '回転体・切断・体積比・投影図',                difficulty: 5, categories: ['立体'],                                count: 0,  available: false },
    { id: 'u6-cases',   num: '⑧', icon: '🎯', title: '場合の数・論理',   sub: '条件付き・道順・塗り分け・論理融合',         difficulty: 4, categories: ['場合の数'],                             count: 0,  available: false },
];

/* 演習問題 8分野カテゴリ定義 */
const PRACTICE_CATS = [
    { id: 'pc-calc',    icon: '🔢', title: '計算・数の処理',   sub: '工夫した計算・逆算',           unitId5: 'u5-calc',    unitId6: 'u6-calc'    },
    { id: 'pc-number',  icon: '🔍', title: '数の性質・規則性', sub: '約数・倍数・数列・周期',        unitId5: 'u5-number',  unitId6: 'u6-number'  },
    { id: 'pc-ratio',   icon: '⚖️', title: '割合・比',          sub: '濃度・売買・比の利用',         unitId5: 'u5-ratio',   unitId6: 'u6-ratio'   },
    { id: 'pc-special', icon: '📝', title: '特殊算・文章題',   sub: '和差算・つるかめ算・仕事算',   unitId5: 'u5-special', unitId6: 'u6-special' },
    { id: 'pc-speed',   icon: '🏃', title: '速さ',              sub: '旅人算・流水算・通過算',       unitId5: 'u5-speed',   unitId6: 'u6-speed'   },
    { id: 'pc-plane',   icon: '📐', title: '平面図形',          sub: '面積・角度・相似・円',         unitId5: 'u5-plane',   unitId6: 'u6-plane'   },
    { id: 'pc-solid',   icon: '📦', title: '立体図形・水量',   sub: '体積・水そう・水深グラフ',     unitId5: 'u5-solid',   unitId6: 'u6-solid'   },
    { id: 'pc-cases',   icon: '🎯', title: '場合の数・論理',   sub: '順列・組合せ・条件整理',      unitId5: 'u5-cases',   unitId6: 'u6-cases'   },
];

/* ════════════════════════════════════════
   CATEGORIES MASTER（8分野 正規ID）
════════════════════════════════════════ */
const CATEGORIES = [
    { id: 'calculation',         name: '計算・数の処理',   priority: 'C' },
    { id: 'number_properties',   name: '数の性質・規則性', priority: 'B' },
    { id: 'ratio',               name: '割合・比',          priority: 'A' },
    { id: 'speed',               name: '速さ',              priority: 'A' },
    { id: 'word_problems',       name: '特殊算・文章題',   priority: 'A' },
    { id: 'plane_geometry',      name: '平面図形',          priority: 'A' },
    { id: 'solid_geometry',      name: '立体図形・水量',   priority: 'A' },
    { id: 'combinatorics_logic', name: '場合の数・論理',   priority: 'B' },
];
