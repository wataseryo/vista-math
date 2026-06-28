const PRACTICE_PROBLEMS = [
    /* 例：
    { id: 'pp1', catId: 'pc-special', grade: 5,
      title: '和差算 基本', difficulty: 2,
      text: '...', answer: 46, unit: '枚',
      solution: '解説文...',
      topicUnitId: 'u5-special'  // トピック学習へのリンク
    }, */
];

/* ════════════════════════════════════════
   CHALLENGES DATA
════════════════════════════════════════ */
const CHALLENGES = [
  { id:'c1', grade:6, category:'水槽', catColor:'#0277BD', catBg:'#E3F2FD', borderColor:'#0288D1', title:'途中で条件が変わる水槽', mainCategory:'solid_geometry', tags:['水槽', '立体図形・水量', 'グラフ'], difficulty:3,
    question:`容量100Lの水槽に最初20Lの水があります。\n毎分3Lの水を入れ始めました。\n5分後に、さらに毎分2Lの管を追加しました。\n\n最初から何分後に水槽の水が50Lになるか求めなさい。`,
    answer:8, answerUnit:'分', hint:`「5分後」を境に前半・後半に分けて考えよう。\n前半（5分間）で水は何Lになる？\n後半は毎分何L増える？`,
    explanation:[
      { title:'前半・後半に分ける', text:`「5分後に管が追加される」ので\n2つの場面に分けます。\n\n【前半】0〜5分：毎分3L入る\n【後半】5分以降：3＋2＝毎分5L入る`,
        visual:`<div class="vis-timeline"><div class="vis-phase" style="flex:5;background:#0288D1">前半<br>毎分3L</div><div class="vis-phase" style="flex:3;background:#E64A19">後半<br>毎分5L</div></div>` },
      { title:'前半（5分間）の水量を計算', text:`増えた水：3L × 5分 ＝ 15L\n5分後の水量：20 ＋ 15 ＝ 35L`,
        visual:`<div class="vis-tank-row"><div><div class="vis-tank"><div class="vis-water" style="height:20%"></div></div><div class="vis-tank-label">最初 20L</div></div><div style="font-size:1.4rem;color:#ccc;padding-bottom:16px">→</div><div><div class="vis-tank"><div class="vis-water" style="height:35%"></div></div><div class="vis-tank-label">5分後 35L</div></div></div><div class="vis-formula">20 ＋ 3×5 ＝ 35L</div>` },
      { title:'後半の必要時間を求める', text:`35Lから50Lまで残り：50－35＝15L\n後半の速さ：毎分5L\n15 ÷ 5 ＝ 3分`,
        visual:`<div class="vis-tank-row"><div><div class="vis-tank"><div class="vis-water" style="height:35%"></div></div><div class="vis-tank-label">35L</div></div><div style="font-size:1.4rem;color:#ccc;padding-bottom:16px">→</div><div><div class="vis-tank"><div class="vis-water" style="height:50%"></div></div><div class="vis-tank-label">50L 目標</div></div></div><div class="vis-formula">15 ÷ 5 ＝ 3分</div>` },
      { title:'合計する（答え）', text:`前半：5分\n後半：3分\n合計：5 ＋ 3 ＝ 8分`,
        visual:`<div class="vis-timeline"><div class="vis-phase" style="flex:5;background:#0288D1">前半 5分</div><div class="vis-phase" style="flex:3;background:#E64A19">後半 3分</div></div><div class="vis-formula">答え：8分後</div>` },
    ]
  },
  { id:'c2', grade:6, category:'水槽', catColor:'#0277BD', catBg:'#E3F2FD', borderColor:'#0288D1', title:'2つの管で満水にする', mainCategory:'solid_geometry', tags:['水槽', '立体図形・水量', 'グラフ'], difficulty:3,
    question:`空の水槽をA管だけで満水にすると30分、\nB管だけで満水にすると20分かかります。\n\nA管とB管を同時に使うと何分で満水になるか求めなさい。`,
    answer:12, answerUnit:'分', hint:`1分間にA管は全体の何分の1入れる？\n合わせた速さ＝A管＋B管`,
    explanation:[
      { title:'1分間に入る量を分数で表す', text:`A管：30分で満水 → 1分で全体の 1/30\nB管：20分で満水 → 1分で全体の 1/20`,
        visual:`<div class="vis-fraction"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">30</span></div><span style="color:#666;padding:0 4px">と</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">20</span></div></div>` },
      { title:'2つ合わせた速さを通分', text:`1/30 ＋ 1/20 ＝ 2/60 ＋ 3/60 ＝ 5/60 ＝ 1/12`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">30</span></div><span>+</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">20</span></div><span>=</span><div class="vis-frac"><span class="vis-frac-n">5</span><span class="vis-frac-d">60</span></div><span>=</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">12</span></div></div>` },
      { title:'満水までの時間を求める', text:`1分で 1/12 ずつ入る\n全体(1) ÷ 1/12 ＝ 12分`,
        visual:`<div class="vis-formula">1 ÷ (1/12) ＝ 12分</div>` },
    ]
  },
  { id:'c3', grade:6, category:'速さ', catColor:'#2E7D32', catBg:'#E8F5E9', borderColor:'#43A047', title:'出会い算', mainCategory:'speed', tags:['速さ', '線分図'], difficulty:2,
    question:`A地点とB地点は2000m離れています。\n太郎くんはA地点から分速60mで、\n花子さんはB地点から分速40mで\n同時に向かい合って歩きます。\n\n何分後に2人は出会うか求めなさい。`,
    answer:20, answerUnit:'分', hint:`2人が1分間に縮める距離の合計は？\n合わせた速さ＝太郎の速さ＋花子の速さ`,
    explanation:[
      { title:'状況を図にする', text:`2000mを2人が向き合って歩く\n→ 1分ごとに距離が縮まる`,
        visual:`<div class="vis-numline"><div class="vis-numline-bar"></div><div class="vis-numline-dot" style="background:#0288D1;left:8%"></div><div class="vis-numline-dot" style="background:#E64A19;left:92%"></div><div class="vis-numline-lbl" style="left:8%">太郎<br>60m/分→</div><div class="vis-numline-lbl" style="left:92%">←花子<br>40m/分</div><div style="position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:.7rem;color:#555;font-weight:bold">2000m</div></div>` },
      { title:'合わせた速さを求める', text:`1分間に縮まる距離\n＝60＋40＝100m/分`,
        visual:`<div class="vis-formula">合わせた速さ ＝ 60＋40 ＝ 100m/分</div>` },
      { title:'出会うまでの時間を求める', text:`2000 ÷ 100 ＝ 20分`,
        visual:`<div class="vis-formula">2000 ÷ 100 ＝ 20分</div>` },
    ]
  },
  { id:'c4', grade:6, category:'速さ', catColor:'#2E7D32', catBg:'#E8F5E9', borderColor:'#43A047', title:'追いかけ算', mainCategory:'speed', tags:['速さ', '線分図'], difficulty:3,
    question:`太郎は7時に家を出て、分速60mで学校へ向かう。\n母は7時10分に自転車で追いかけ、分速180mで走る。\n\n母が太郎に追いつくのは7時何分か求めなさい。`,
    answer:15, answerUnit:'分（7時）', hint:`お母さんが出発したとき、太郎くんは何m先？\n1分間に縮まる距離は？（差の速さ）`,
    explanation:[
      { title:'お母さん出発時の差を求める', text:`太郎くんは10分先に出発\n10分間に：60×10＝600m 先にいる`,
        visual:`<div class="vis-numline"><div class="vis-numline-bar"></div><div class="vis-numline-dot" style="background:#E64A19;left:8%"></div><div class="vis-numline-dot" style="background:#0288D1;left:55%"></div><div class="vis-numline-lbl" style="left:8%">お母さん<br>（7:10）</div><div class="vis-numline-lbl" style="left:55%">太郎<br>600m先</div></div><div class="vis-formula">60×10 ＝ 600m</div>` },
      { title:'縮まる速さを求める', text:`1分間に縮まる距離（差の速さ）：\n180－60＝120m/分`,
        visual:`<div class="vis-formula">180－60 ＝ 120m/分（差の速さ）</div>` },
      { title:'追いつく時間を求める', text:`600m ÷ 120m/分 ＝ 5分\nお母さん出発（7:10）から5分後\n→ 7時15分`,
        visual:`<div class="vis-formula">600 ÷ 120 ＝ 5分後 → 7時15分</div>` },
    ]
  },
  { id:'c5', grade:6, category:'割合', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA', title:'食塩水の混合', mainCategory:'ratio', tags:['割合・比', '面積図'], difficulty:4,
    question:`10%の食塩水200gと\n5%の食塩水300gを混ぜました。\n\n混ぜた後の食塩水の濃度は何%か求めなさい。`,
    answer:7, answerUnit:'%', hint:`まず「塩の量(g)」を先に求めよう。\n塩の量 ＝ 食塩水の量 × 濃度（÷100）`,
    explanation:[
      { title:'それぞれの塩の量を求める', text:`10%食塩水200g → 塩：200×0.1＝20g\n5%食塩水300g  → 塩：300×0.05＝15g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.45)"></div></div><div class="vis-beaker-lbl">10%<br>200g<br><b>塩20g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.2)"></div></div><div class="vis-beaker-lbl">5%<br>300g<br><b>塩15g</b></div></div></div>` },
      { title:'混ぜた後の量を合計', text:`塩の合計：20＋15＝35g\n食塩水の合計：200＋300＝500g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker" style="width:65px;height:80px"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.32)"></div></div><div class="vis-beaker-lbl">合計<br>500g<br><b>塩35g</b></div></div></div>` },
      { title:'濃度を計算する', text:`濃度＝塩の量÷食塩水の量×100\n＝35÷500×100＝7%`,
        visual:`<div class="vis-formula">35 ÷ 500 × 100 ＝ 7%</div>` },
    ]
  },
  { id:'c6', grade:5, category:'植木算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'道に木を植える（両端あり）', mainCategory:'word_problems', tags:['特殊算・文章題', '植木算'], difficulty:2,
    question:`100mの道の両端に木を植えます。\n木と木の間隔を10mにするとき、\n木は全部で何本必要か求めなさい。`,
    answer:11, answerUnit:'本', hint:`まず「間隔の数」を求めよう。\n両端に植えるとき：木の本数 ＝ 間隔の数 ＋ 1`,
    explanation:[
      { title:'間隔の数を求める', text:`道の長さ ÷ 間隔 ＝ 間隔の数\n100 ÷ 10 ＝ 10（個の間隔）`,
        visual:`<div class="vis-trees"><span style="font-size:1.2rem">🌲</span>${Array(10).fill(0).map(()=>'<span class="vis-tree-sp">10m</span><span style="font-size:1.2rem">🌲</span>').join('')}</div>` },
      { title:'木の本数を求める', text:`両端に植えるので\n木の本数 ＝ 間隔の数 ＋ 1 ＝ 10 ＋ 1 ＝ 11本`,
        visual:`<div class="vis-formula">間隔10個 → 木は11本</div>` },
    ]
  },
  { id:'c7', grade:5, category:'つるかめ算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'ツルとカメの足の数', mainCategory:'word_problems', tags:['特殊算・文章題', 'つるかめ算'], difficulty:3,
    question:`ツルとカメが合わせて10匹います。\n足の本数の合計は28本でした。\n\nツルは何匹か求めなさい。`,
    answer:6, answerUnit:'匹', hint:`「全部ツルだったら足は何本？」から考えよう。\nカメ1匹に替えると足は何本増える？`,
    explanation:[
      { title:'全部ツルと仮定する', text:`10匹すべてツルとすると\n足の合計：2×10＝20本\n実際は28本 → 28－20＝8本 多い`,
        visual:`<div class="vis-animals">${Array(10).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div>').join('')}</div><div class="vis-formula">2×10 ＝ 20本（実際より8本少ない）</div>` },
      { title:'ツル→カメに替えると', text:`ツル1匹をカメ1匹に替えると\n4－2＝2本 増える\n8本増やすには：8÷2＝4匹 カメにする`,
        visual:`<div style="display:flex;gap:10px;justify-content:center;align-items:center;padding:8px 0"><div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div><span style="font-size:1.2rem">→</span><div class="vis-animal"><div class="vis-animal-ico">🐢</div><div class="vis-animal-legs">4本</div></div><span style="font-size:.82rem;color:#E64A19;font-weight:bold">＋2本</span></div><div class="vis-formula">8 ÷ 2 ＝ 4匹がカメ</div>` },
      { title:'答えを求める（確認）', text:`カメ：4匹\nツル：10－4＝6匹\n確認：6×2＋4×4＝12＋16＝28本 ✓`,
        visual:`<div class="vis-animals">${Array(6).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div>').join('')}${Array(4).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🐢</div><div class="vis-animal-legs">4本</div></div>').join('')}</div><div class="vis-formula">答え：ツル 6匹</div>` },
    ]
  },
  { id:'c8', grade:5, category:'過不足算', catColor:'#AD1457', catBg:'#FCE4EC', borderColor:'#E91E63', title:'余りと不足（机と生徒）', mainCategory:'word_problems', tags:['特殊算・文章題', '過不足算'], difficulty:4,
    question:`生徒を机に座らせます。\n1つの机に4人ずつ座ると8人余ります。\n1つの机に6人ずつ座ると2人足りません。\n\n生徒は何人か求めなさい。`,
    answer:28, answerUnit:'人', hint:`机の台数を□として2つの式を立てよう。\n4×□＋8 ＝ 6×□－2`,
    explanation:[
      { title:'机の台数を□とおく', text:`机の台数を□台とすると：\n4人ずつ・余り8人 → 生徒数 ＝ 4×□＋8\n6人ずつ・2人不足 → 生徒数 ＝ 6×□－2`,
        visual:`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:6px 0"><div style="background:#E3F2FD;border:2px solid #0288D1;border-radius:8px;padding:6px 12px;font-size:.82rem;text-align:center">4人ずつ<br>→ 4□＋8</div><div style="background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:6px 12px;font-size:.82rem;text-align:center">6人ずつ<br>→ 6□－2</div></div>` },
      { title:'2つの式を等しくおいて解く', text:`4×□＋8 ＝ 6×□－2\n8＋2 ＝ 6×□－4×□\n10 ＝ 2×□\n□ ＝ 5（机は5台）`,
        visual:`<div class="vis-formula">4□＋8 ＝ 6□－2\n→ 2□ ＝ 10 → □ ＝ 5台</div>` },
      { title:'生徒数を求める（確認）', text:`□＝5を代入：4×5＋8＝20＋8＝28人\n確認：6×5－2＝30－2＝28人 ✓`,
        visual:`<div class="vis-formula">答え：机5台・生徒28人</div>` },
    ]
  },

  /* ── 和差算 ── */
  { id:'c9', grade:5, category:'和差算', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2', title:'シールの枚数（和差算 基本）', mainCategory:'word_problems', tags:['特殊算・文章題', '和差算', '線分図'], difficulty:2,
    question:`太郎と花子が持っているシールの合計は80枚で、\n太郎は花子より12枚多く持っている。\n\n太郎は何枚持っているか求めなさい。`,
    answer:46, answerUnit:'枚',
    hint:`テープ図を書いてみよう。\n大きい方 ＝ （和 ＋ 差）÷ 2 で求められるよ！`,
    explanation:[
      { title:'テープ図で整理する',
        text:`たろうをはなこに合わせると全部わかる！\nたろうの「12枚多い部分」をはなこに移すと…`,
        visual:`<div class="vis-tape-wrap">
  <div class="vis-tape-row"><span class="vis-tape-lbl">たろう</span><div class="vis-tape" style="width:68%;background:#1976D2">68%</div><div class="vis-tape" style="width:12%;background:#E64A19;margin-left:2px">＋12</div></div>
  <div class="vis-tape-row"><span class="vis-tape-lbl">はなこ</span><div class="vis-tape" style="width:68%;background:#43A047">同じ長さ</div></div>
  <div class="vis-tape-brace">←────── 合計 80枚 ──────→　差 12枚</div>
</div>` },
      { title:'はなこの枚数を求める',
        text:`差の12枚を除いた分を2等分します。\nはなこ × 2 ＝ 80 − 12 ＝ 68枚\nはなこ ＝ 68 ÷ 2 ＝ 34枚`,
        visual:`<div class="vis-formula">はなこ ＝ (80 − 12) ÷ 2 ＝ 34枚</div>` },
      { title:'たろうの枚数を求める（答え）',
        text:`たろうははなこより12枚多いので…\nたろう ＝ 34 ＋ 12 ＝ 46枚`,
        visual:`<div class="vis-formula">たろう ＝ 34 ＋ 12 ＝ 46枚\n\n別解：大きい方 ＝ (80 ＋ 12) ÷ 2 ＝ 46枚</div>` },
    ]
  },
  { id:'c10', grade:5, category:'和差算', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2', title:'2チームの得点（和差算 応用）', mainCategory:'word_problems', tags:['特殊算・文章題', '和差算', '線分図'], difficulty:2,
    question:`AチームとBチームの合計得点は96点で、\nAチームはBチームより14点多い。\n\nAチームの得点は何点か求めなさい。`,
    answer:55, answerUnit:'点',
    hint:`「大きい方＝（和＋差）÷2」の公式を使おう！\nAチームが大きい方だよ。`,
    explanation:[
      { title:'状況をテープ図で整理',
        text:`2チームの合計が96点、差が14点。\nAが多い方。`,
        visual:`<div class="vis-tape-wrap">
  <div class="vis-tape-row"><span class="vis-tape-lbl">A チーム</span><div class="vis-tape" style="width:65%;background:#1976D2">？</div><div class="vis-tape" style="width:13%;background:#E64A19;margin-left:2px">＋14</div></div>
  <div class="vis-tape-row"><span class="vis-tape-lbl">B チーム</span><div class="vis-tape" style="width:65%;background:#43A047">？</div></div>
  <div class="vis-tape-brace">←── 合計 96点 ──→　差 14点</div>
</div>` },
      { title:'大きい方（A）を求める公式',
        text:`大きい方 ＝ （合計 ＋ 差） ÷ 2\n＝（96 ＋ 14）÷ 2\n＝ 110 ÷ 2 ＝ 55点`,
        visual:`<div class="vis-formula">A ＝ (96 ＋ 14) ÷ 2 ＝ 55点</div>` },
      { title:'Bチームも確認',
        text:`B ＝ 96 − 55 ＝ 41点\n確認：A − B ＝ 55 − 41 ＝ 14点 ✓`,
        visual:`<div class="vis-formula">B ＝ 96 − 55 ＝ 41点　差：55 − 41 ＝ 14 ✓</div>` },
    ]
  },

  /* ── 年齢算 基礎 ── */
  { id:'c11', grade:5, category:'年齢算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'倍数での年齢算', mainCategory:'word_problems', tags:['特殊算・文章題', '年齢算'], difficulty:3,
    question:`現在、父の年齢は子の年齢の5倍です。\n父と子の年齢の差は28歳です。\n\n父は現在何歳か。`,
    answer:35, answerUnit:'歳',
    hint:`「差は変わらない」がポイント！\n父 − 子 ＝ 28歳\n父 ＝ 5×子 だから…\n5×子 − 子 ＝ 4×子 ＝ 28歳`,
    explanation:[
      { title:'差は変わらないことを確認',
        text:`年齢は同じスピードで増えるから\n父と子の差はいつも同じ！\n父 − 子 ＝ 28歳（ずっと）`,
        visual:`<div class="vis-age-tbl"><table><tr><th>　</th><th>父</th><th>子</th><th>差</th></tr><tr><td>現在</td><td>?歳</td><td>?歳</td><td class="hl">28歳</td></tr></table></div>` },
      { title:'倍数の関係から子の年齢を求める',
        text:`父 ＝ 子 × 5\n父 − 子 ＝ 子×5 − 子 ＝ 子×4\n\n子×4 ＝ 28\n子 ＝ 28 ÷ 4 ＝ 7歳`,
        visual:`<div class="vis-formula">5×子 − 1×子 ＝ 4×子 ＝ 28\n子 ＝ 28 ÷ 4 ＝ 7歳</div>` },
      { title:'父の年齢を求める（答え）',
        text:`父 ＝ 子 × 5 ＝ 7 × 5 ＝ 35歳\n確認：35 − 7 ＝ 28歳 ✓`,
        visual:`<div class="vis-age-tbl"><table><tr><th>　</th><th>父</th><th>子</th><th>差</th></tr><tr><td>現在</td><td class="hl">35歳</td><td>7歳</td><td>28歳 ✓</td></tr></table></div>` },
    ]
  },
  { id:'c12', grade:5, category:'年齢算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'何年後に○倍になるか', mainCategory:'word_problems', tags:['特殊算・文章題', '年齢算'], difficulty:3,
    question:`現在、母は37歳で、子は9歳です。\n\n何年後に母の年齢が子の年齢の3倍になるか求めなさい。`,
    answer:5, answerUnit:'年後',
    hint:`何年後かを□とおいて式を作ろう。\n(37＋□) ＝ 3×(9＋□) となるよ。`,
    explanation:[
      { title:'何年後かを□とおく',
        text:`□年後の年齢を表します。\n母：37＋□歳\n子：9＋□歳`,
        visual:`<div class="vis-age-tbl"><table><tr><th>　</th><th>母</th><th>子</th></tr><tr><td>現在</td><td>37歳</td><td>9歳</td></tr><tr><td class="hl">□年後</td><td class="hl">37＋□歳</td><td class="hl">9＋□歳</td></tr></table></div>` },
      { title:'3倍の式を作る',
        text:`□年後に「母＝子の3倍」になるから：\n37＋□ ＝ 3×(9＋□)\n37＋□ ＝ 27＋3□`,
        visual:`<div class="vis-formula">37 ＋ □ ＝ 3 × (9 ＋ □)</div>` },
      { title:'□を求める（答え）',
        text:`37＋□ ＝ 27＋3□\n37−27 ＝ 3□−□\n10 ＝ 2□\n□ ＝ 5年後`,
        visual:`<div class="vis-formula">10 ＝ 2□　→　□ ＝ 5年後</div><div class="vis-age-tbl" style="margin-top:8px"><table><tr><th>　</th><th>母</th><th>子</th><th>関係</th></tr><tr><td>5年後</td><td class="hl">42歳</td><td class="hl">14歳</td><td class="hl">3倍 ✓</td></tr></table></div>` },
    ]
  },

  /* ── 流水算 ── */
  { id:'c13', grade:6, category:'流水算', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5', title:'静水時の速さを求める', mainCategory:'speed', tags:['速さ', '流水算'], difficulty:3,
    question:`ある船が川を20km上るのに4時間、\n同じ20kmを下るのに2時間かかりました。\n\nこの船の静水時の速さを求めなさい。`,
    answer:7.5, answerUnit:'km/h',
    hint:`まず上りと下りの速さを別々に求めよう。\n静水時の速さ ＝ (上りの速さ ＋ 下りの速さ) ÷ 2`,
    explanation:[
      { title:'上りの速さと下りの速さを求める',
        text:`上りの速さ ＝ 距離 ÷ 時間\n＝ 20 ÷ 4 ＝ 5 km/h\n\n下りの速さ ＝ 20 ÷ 2 ＝ 10 km/h`,
        visual:`<div class="vis-river-wrap">
  <div class="vis-river-flow-lbl">→ 川の流れ</div>
  <div class="vis-river-boats">
    <div class="vis-boat-card"><div class="vis-boat-card-lbl">上り（川を遡る）</div><div class="vis-boat-card-val">5 km/h</div></div>
    <div class="vis-boat-card"><div class="vis-boat-card-lbl">下り（川を下る）</div><div class="vis-boat-card-val">10 km/h</div></div>
  </div>
</div>` },
      { title:'なぜ平均するの？',
        text:`上りの速さ ＝ 静水速 − 流速\n下りの速さ ＝ 静水速 ＋ 流速\n\n足すと流速が消える！\n(静水速−流速)＋(静水速＋流速) ＝ 静水速×2`,
        visual:`<div class="vis-river-formula">上り：静水速 − 流速 ＝ 5\n下り：静水速 ＋ 流速 ＝ 10\n─────────────────\n合計：静水速 × 2 ＝ 15</div>` },
      { title:'静水時の速さを求める（答え）',
        text:`静水時の速さ\n＝（上りの速さ ＋ 下りの速さ）÷ 2\n＝（5 ＋ 10）÷ 2 ＝ 7.5 km/h`,
        visual:`<div class="vis-formula">静水時の速さ ＝ (5 ＋ 10) ÷ 2 ＝ 7.5 km/h</div>` },
    ]
  },
  { id:'c14', grade:6, category:'流水算', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5', title:'上りの距離を求める', mainCategory:'speed', tags:['速さ', '流水算'], difficulty:4,
    question:`静水での速さが時速12kmの船があります。\n流速が時速3kmの川を上るのに2時間かかりました。\n\nこの区間の距離は何kmか求めなさい。`,
    answer:18, answerUnit:'km',
    hint:`上りの速さ ＝ 静水速 − 流速\n距離 ＝ 速さ × 時間`,
    explanation:[
      { title:'上りの速さを求める',
        text:`川を上るとき、流れが逆向きにブレーキをかける。\n\n上りの速さ ＝ 静水速 − 流速\n＝ 12 − 3 ＝ 9 km/h`,
        visual:`<div class="vis-river-wrap">
  <div class="vis-river-flow-lbl">→ 川の流れ（時速3km）</div>
  <div class="vis-river-boats">
    <div class="vis-boat-card"><div class="vis-boat-card-lbl">静水での速さ</div><div class="vis-boat-card-val">12 km/h</div></div>
    <div class="vis-boat-card"><div class="vis-boat-card-lbl">流速（引き算）</div><div class="vis-boat-card-val">−3 km/h</div></div>
    <div class="vis-boat-card" style="border-color:#E65100"><div class="vis-boat-card-lbl" style="color:#E65100">上りの速さ</div><div class="vis-boat-card-val" style="color:#BF360C">9 km/h</div></div>
  </div>
</div>` },
      { title:'距離を求める（答え）',
        text:`距離 ＝ 速さ × 時間\n＝ 9 × 2 ＝ 18 km`,
        visual:`<div class="vis-formula">距離 ＝ 9 × 2 ＝ 18 km</div>` },
    ]
  },

  /* ── 通過算 ── */
  { id:'c15', grade:6, category:'通過算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A', title:'電車が橋を渡る', mainCategory:'speed', tags:['速さ', '通過算'], difficulty:3,
    question:`長さ150mの電車が時速90kmで走っています。\n長さ450mの橋を渡り始めてから\n渡り終わるまでの時間は何秒か求めなさい。`,
    answer:24, answerUnit:'秒',
    hint:`電車が「完全に橋を渡る」距離は？\n電車の長さ ＋ 橋の長さ を考えよう！`,
    explanation:[
      { title:'電車が進む距離を考える',
        text:`電車の先頭が橋に入ってから\n電車の最後尾が橋を出るまで。\n→ 進む距離 ＝ 電車の長さ ＋ 橋の長さ`,
        visual:`<div class="vis-train-wrap">
  <div style="font-size:.72rem;color:#546E7A;margin-bottom:6px">先頭が橋に入る</div>
  <div class="vis-track-line"><div class="vis-train-el">🚂 電車150m →</div><div class="vis-track-gap"></div><div class="vis-bridge-el">橋 450m</div></div>
  <div class="vis-train-sum">進む距離 ＝ 150m ＋ 450m ＝ 600m</div>
</div>` },
      { title:'時速を秒速に直す',
        text:`時速90km ＝ 90000m ÷ 3600秒\n＝ 25m/秒`,
        visual:`<div class="vis-formula">90 km/h ＝ 90000 ÷ 3600 ＝ 25 m/秒</div>` },
      { title:'時間を求める（答え）',
        text:`時間 ＝ 距離 ÷ 速さ\n＝ 600 ÷ 25 ＝ 24秒`,
        visual:`<div class="vis-formula">600 ÷ 25 ＝ 24秒</div>` },
    ]
  },
  { id:'c16', grade:6, category:'通過算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A', title:'2列車が追い越す', mainCategory:'speed', tags:['速さ', '通過算'], difficulty:4,
    question:`長さ200mの電車Aが秒速30mで、\n長さ100mの電車Bが秒速20mで\n同じ方向に走っています。\n\nAがBに追いついてから完全に追い越すまでの時間は何秒か求めなさい。`,
    answer:30, answerUnit:'秒',
    hint:`追い越す距離 ＝ A の長さ ＋ B の長さ\n差の速さ ＝ 速いA − 遅いB`,
    explanation:[
      { title:'追い越す距離を考える',
        text:`AがBを「完全に追い越す」には\nAとBの長さを合わせた距離を進まないといけない！`,
        visual:`<div class="vis-train-wrap">
  <div class="vis-track-line"><div class="vis-train-el">B 100m →20m/s</div><div class="vis-track-gap"></div></div>
  <div class="vis-track-line"><div class="vis-train-el" style="background:linear-gradient(135deg,#E64A19,#BF360C)">A 200m →30m/s</div><div class="vis-track-gap"></div></div>
  <div class="vis-train-sum">追い越す距離 ＝ 200m ＋ 100m ＝ 300m</div>
</div>` },
      { title:'差の速さを求める',
        text:`同じ方向なので速さの差が縮まるスピード。\n差の速さ ＝ 30 − 20 ＝ 10 m/秒`,
        visual:`<div class="vis-formula">差の速さ ＝ 30 − 20 ＝ 10 m/秒</div>` },
      { title:'時間を求める（答え）',
        text:`時間 ＝ 距離 ÷ 差の速さ\n＝ 300 ÷ 10 ＝ 30秒`,
        visual:`<div class="vis-formula">300 ÷ 10 ＝ 30秒</div>` },
    ]
  },

  /* ── ニュートン算 ── */
  { id:'c17', grade:6, category:'ニュートン算', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA', title:'行列はなくなる（ニュートン算 基本）', mainCategory:'ratio', tags:['割合・比', 'ニュートン算'], difficulty:4,
    question:`入場ゲートの外に行列があります。\n毎分3人ずつ新たに並んできます。\n\nゲートを2つ開けると20分でなくなり、\n3つ開けると10分でなくなります。\n\n最初に並んでいた人は何人か求めなさい。`,
    answer:60, answerUnit:'人',
    hint:`式を2つ立てよう。\n最初の人数をN、1つのゲートが1分間に処理する人数をbとおく。\nN ＋ 増えた人数 ＝ 処理した人数`,
    explanation:[
      { title:'状況を整理する',
        text:`ポイント：行列は増えながら減っていく！\n\n最初の人数：N人\n毎分 3人ずつ増える\nゲート1つが毎分 b人処理する`,
        visual:`<div class="vis-newton-wrap">
  <div class="vis-newton-box"><div class="vis-newton-icon">🚶</div><div class="vis-newton-lbl">最初 N人</div></div>
  <div class="vis-newton-box"><div class="vis-newton-icon">➕</div><div class="vis-newton-lbl">毎分3人増加</div></div>
  <div class="vis-newton-box"><div class="vis-newton-icon">🚪</div><div class="vis-newton-lbl">ゲートがb人/分 処理</div></div>
</div>` },
      { title:'2つの式を立てる',
        text:`2ゲート・20分でなくなる：\nN ＋ 3×20 ＝ 2b×20\n→ N ＋ 60 ＝ 40b … ①\n\n3ゲート・10分でなくなる：\nN ＋ 3×10 ＝ 3b×10\n→ N ＋ 30 ＝ 30b … ②`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">①</span><span class="vis-eq-body">N ＋ 60 ＝ 40b</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">②</span><span class="vis-eq-body">N ＋ 30 ＝ 30b</span></div>
</div>` },
      { title:'bを求める',
        text:`①－②：\n(N＋60) − (N＋30) ＝ 40b − 30b\n30 ＝ 10b\nb ＝ 3人/分（ゲート1つの処理速度）`,
        visual:`<div class="vis-formula">① − ② ：30 ＝ 10b　→　b ＝ 3</div>` },
      { title:'最初の人数Nを求める（答え）',
        text:`②に b＝3 を代入：\nN ＋ 30 ＝ 30×3 ＝ 90\nN ＝ 60人`,
        visual:`<div class="vis-formula">N ＝ 90 − 30 ＝ 60人</div>` },
    ]
  },
  { id:'c18', grade:6, category:'ニュートン算', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA', title:'牧場の草（ニュートン算 応用）', mainCategory:'ratio', tags:['割合・比', 'ニュートン算'], difficulty:5,
    question:`草が毎日一定量生える牧場があります。\n4頭の牛が食べると10日で草がなくなり、\n2頭だと30日でなくなります。\n\n6頭だと何日で草がなくなるか求めなさい。`,
    answer:6, answerUnit:'日',
    hint:`最初の草の量をS、1日に生える量をa、\n牛1頭が1日に食べる量をbとおこう。\nS ＋ 日数×a ＝ 頭数×b×日数`,
    explanation:[
      { title:'文字を使って式を立てる',
        text:`最初の草：S\n1日に生える量：a\n牛1頭が1日に食べる量：b\n\n4頭×10日：S＋10a ＝ 40b … ①\n2頭×30日：S＋30a ＝ 60b … ②`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">①</span><span class="vis-eq-body">S ＋ 10a ＝ 40b</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">②</span><span class="vis-eq-body">S ＋ 30a ＝ 60b</span></div>
</div>` },
      { title:'②－①で aとbの関係を求める',
        text:`② − ① ：\n20a ＝ 20b\na ＝ b\n→ 1日に生える量 ＝ 牛1頭分の食べる量！`,
        visual:`<div class="vis-formula">② − ① ：20a ＝ 20b　→　a ＝ b</div>` },
      { title:'最初の草の量 S を求める',
        text:`①に a＝b を代入：\nS ＋ 10b ＝ 40b\nS ＝ 30b`,
        visual:`<div class="vis-formula">S ＝ 30b（最初の草は牛30頭分の1日分）</div>` },
      { title:'6頭の場合の日数を求める（答え）',
        text:`6頭・□日の場合：\nS ＋ □×a ＝ 6b×□\n30b ＋ □b ＝ 6b□\n30 ＋ □ ＝ 6□\n5□ ＝ 30\n□ ＝ 6日`,
        visual:`<div class="vis-formula">30 ＋ □ ＝ 6□\n5□ ＝ 30　→　□ ＝ 6日</div>` },
    ]
  },

  /* ── 消去算 ── */
  { id:'c19', grade:6, category:'消去算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'りんごとみかん（消去算 基本）', mainCategory:'word_problems', tags:['特殊算・文章題', '消去算'], difficulty:3,
    question:`りんご2個とみかん3個の合計は360円、\nりんご1個とみかん2個の合計は210円です。\n\nりんご1個の値段を求めなさい。`,
    answer:90, answerUnit:'円',
    hint:`2つの式の「みかん」を消そう！\n②×2でみかんの数を合わせてから引き算するよ。`,
    explanation:[
      { title:'式を立てる',
        text:`りんごをa円、みかんをb円とおく。\n2a ＋ 3b ＝ 360 … ①\na ＋ 2b ＝ 210 … ②`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">①</span><span class="vis-eq-body">りんご×2 ＋ みかん×3 </span><span class="vis-eq-ans">＝ 360円</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">②</span><span class="vis-eq-body">りんご×1 ＋ みかん×2 </span><span class="vis-eq-ans">＝ 210円</span></div>
</div>` },
      { title:'②を2倍してみかんの数を合わせる',
        text:`②×2：2a ＋ 4b ＝ 420 … ③\n\n③ − ①：b ＝ 420 − 360 ＝ 60円`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">②×2</span><span class="vis-eq-body">りんご×2 ＋ みかん×4 </span><span class="vis-eq-ans">＝ 420円</span></div>
  <div class="vis-eq-arrow">③ − ①：みかん×1 ＝ 60円</div>
</div>` },
      { title:'りんごの値段を求める（答え）',
        text:`②に b＝60 を代入：\na ＋ 2×60 ＝ 210\na ＋ 120 ＝ 210\na ＝ 90円`,
        visual:`<div class="vis-formula">りんご ＝ 210 − 120 ＝ 90円</div>` },
    ]
  },
  { id:'c20', grade:6, category:'消去算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'えんぴつとノート（消去算 応用）', mainCategory:'word_problems', tags:['特殊算・文章題', '消去算'], difficulty:4,
    question:`えんぴつ3本とノート2冊の合計は460円、\nえんぴつ5本とノート3冊の合計は740円です。\n\nえんぴつ1本の値段を求めなさい。`,
    answer:100, answerUnit:'円',
    hint:`ノートを消すために①×3、②×2で\nノートの数を合わせてみよう！`,
    explanation:[
      { title:'式を立てる',
        text:`えんぴつをa円、ノートをb円とおく。\n3a ＋ 2b ＝ 460 … ①\n5a ＋ 3b ＝ 740 … ②`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">①</span><span class="vis-eq-body">えんぴつ×3 ＋ ノート×2 </span><span class="vis-eq-ans">＝ 460円</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">②</span><span class="vis-eq-body">えんぴつ×5 ＋ ノート×3 </span><span class="vis-eq-ans">＝ 740円</span></div>
</div>` },
      { title:'ノートを消す（①×3と②×2で数を合わせる）',
        text:`①×3：9a ＋ 6b ＝ 1380\n②×2：10a ＋ 6b ＝ 1480\n\n②×2 − ①×3：\n10a − 9a ＝ 1480 − 1380\na ＝ 100円`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">①×3</span><span class="vis-eq-body">9a ＋ 6b </span><span class="vis-eq-ans">＝ 1380</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">②×2</span><span class="vis-eq-body">10a ＋ 6b </span><span class="vis-eq-ans">＝ 1480</span></div>
  <div class="vis-eq-arrow">②×2 − ①×3：えんぴつ 1本 ＝ 100円</div>
</div>` },
      { title:'ノートの値段も確認',
        text:`①に a＝100 を代入：\n3×100 ＋ 2b ＝ 460\n2b ＝ 160\nb ＝ 80円`,
        visual:`<div class="vis-formula">えんぴつ：100円　ノート：80円\n確認：5×100＋3×80 ＝ 500＋240 ＝ 740 ✓</div>` },
    ]
  },

  /* ── 植木算 2問目（池の周り） ── */
  { id:'c21', grade:5, category:'植木算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'池の周りに木を植える', mainCategory:'word_problems', tags:['特殊算・文章題', '植木算'], difficulty:2,
    question:`周囲が120mの池の周りに、\n10m間隔で木を植えます。\n\n木は全部で何本必要か求めなさい。`,
    answer:12, answerUnit:'本',
    hint:`「池の周り」は輪っか型！\n最後の木と最初の木の間も「間隔」になるよ。\n池の問題では 本数 ＝ 間隔の数 になるよ。`,
    explanation:[
      { title:'道型と池型の違いを確認',
        text:`道型（直線）：木の本数 ＝ 間隔の数 ＋ 1\n池型（輪っか）：木の本数 ＝ 間隔の数\n\n池は「端がない」から ＋1 が不要！`,
        visual:`<div class="vis-trees" style="flex-wrap:nowrap;justify-content:center;gap:4px;padding:12px 4px">
  <span style="font-size:1.2rem">🌳</span>
  <span class="vis-tree-sp">10m</span>
  <span style="font-size:1.2rem">🌳</span>
  <span class="vis-tree-sp">10m</span>
  <span style="font-size:1.2rem">🌳</span>
  <span class="vis-tree-sp">…</span>
  <span style="font-size:1.2rem">🌳</span>
  <span class="vis-tree-sp">10m</span>
  <span style="font-size:1.4rem;color:#1976D2">↩</span>
</div><div style="text-align:center;font-size:.72rem;color:#555;margin-top:4px">輪っか：最後の間隔も10m</div>` },
      { title:'間隔の数を求める',
        text:`間隔の数 ＝ 周囲 ÷ 間隔\n＝ 120 ÷ 10 ＝ 12（個の間隔）`,
        visual:`<div class="vis-formula">間隔の数 ＝ 120 ÷ 10 ＝ 12</div>` },
      { title:'木の本数を求める（答え）',
        text:`池型では 本数 ＝ 間隔の数\n→ 12本`,
        visual:`<div class="vis-formula">池型：木の本数 ＝ 間隔の数 ＝ 12本</div>` },
    ]
  },

  /* ── つるかめ算 2問目（点数問題） ── */
  { id:'c22', grade:5, category:'つるかめ算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'テストの点数（つるかめ算 応用）', mainCategory:'word_problems', tags:['特殊算・文章題', 'つるかめ算'], difficulty:3,
    question:`30問のテストで、\n正解すると4点もらえ、\n間違えると1点引かれます。\n\n全問解いて90点でした。\n正解は何問か求めなさい。`,
    answer:24, answerUnit:'問',
    hint:`「全部正解だったら何点？」から考えよう。\n4×30 ＝ 120点のはず。\n実際より30点少ない…なぜ？\n1問間違えるたびに 4＋1＝5点 減るよ！`,
    explanation:[
      { title:'全問正解と仮定する',
        text:`全部正解なら：4×30 ＝ 120点\n実際は90点\n差：120 − 90 ＝ 30点 少ない`,
        visual:`<div class="vis-formula">全問正解の仮定：4 × 30 ＝ 120点\n実際との差：120 − 90 ＝ 30点</div>` },
      { title:'1問間違えると何点変わるか',
        text:`正解を1問→間違いに替えると：\n・＋4点のはずが → −1点になる\n1問替えるたびに 4＋1＝5点 少なくなる`,
        visual:`<div class="vis-animals">
  <div class="vis-animal"><div class="vis-animal-ico">✅</div><div class="vis-animal-legs" style="color:#1976D2">＋4点</div></div>
  <div style="font-size:1.2rem;color:#ccc;padding:8px 4px">→</div>
  <div class="vis-animal"><div class="vis-animal-ico">❌</div><div class="vis-animal-legs">−1点</div></div>
  <div style="padding:8px 4px;font-size:.8rem;color:#555">差：5点ずつ減る</div>
</div>` },
      { title:'間違いの数を求める',
        text:`間違いの数 ＝ 差 ÷ 1問あたりの変化\n＝ 30 ÷ 5 ＝ 6問`,
        visual:`<div class="vis-formula">間違い ＝ 30 ÷ 5 ＝ 6問</div>` },
      { title:'正解の数を求める（答え）',
        text:`正解 ＝ 30 − 6 ＝ 24問\n確認：4×24 − 1×6 ＝ 96−6 ＝ 90点 ✓`,
        visual:`<div class="vis-formula">正解 ＝ 30 − 6 ＝ 24問\n確認：4×24 − 1×6 ＝ 90点 ✓</div>` },
    ]
  },

  /* ── 過不足算 2問目（おかし分け） ── */
  { id:'c23', grade:5, category:'過不足算', catColor:'#AD1457', catBg:'#FCE4EC', borderColor:'#E91E63', title:'おかしを配る（過不足算）', mainCategory:'word_problems', tags:['特殊算・文章題', '過不足算'], difficulty:3,
    question:`子どもたちにおかしを配ります。\n4個ずつ配ると6個余り、\n6個ずつ配ると10個足りません。\n\n子どもは何人か求めなさい。`,
    answer:8, answerUnit:'人',
    hint:`□を子どもの人数とすると2つの式が立てられるよ。\n4×□＋6 ＝ 6×□－10\nを解こう！`,
    explanation:[
      { title:'おかしの合計をそれぞれ表す',
        text:`同じおかしの数を2通りで表す：\n\n4個ずつ → 4×□＋6（6個余る）\n6個ずつ → 6×□－10（10個足りない）`,
        visual:`<div class="vis-eq-wrap">
  <div class="vis-eq-row"><span class="vis-eq-no">式1</span><span class="vis-eq-body">4×□ ＋ 6</span><span style="font-size:.72rem;color:#555;margin-left:8px">（4個配って6個余る）</span></div>
  <div class="vis-eq-row"><span class="vis-eq-no">式2</span><span class="vis-eq-body">6×□ − 10</span><span style="font-size:.72rem;color:#555;margin-left:8px">（6個配って10個足りない）</span></div>
</div>` },
      { title:'方程式を解く',
        text:`式1 ＝ 式2（同じおかしの数）\n4□＋6 ＝ 6□－10\n6＋10 ＝ 6□－4□\n16 ＝ 2□\n□ ＝ 8人`,
        visual:`<div class="vis-formula">4□ ＋ 6 ＝ 6□ − 10\n16 ＝ 2□\n□ ＝ 8人</div>` },
      { title:'おかしの数も確認（答え）',
        text:`子ども：8人\nおかしの数：4×8＋6 ＝ 38個\n確認：6×8－10 ＝ 48－10 ＝ 38個 ✓`,
        visual:`<div class="vis-formula">おかし：4×8＋6 ＝ 38個\n確認：6×8－10 ＝ 38個 ✓</div>` },
    ]
  },

  /* ── 旅人算 往復の平均速 ── */
  { id:'c24', grade:6, category:'速さ', catColor:'#2E7D32', catBg:'#E8F5E9', borderColor:'#43A047', title:'往復の平均の速さ', mainCategory:'speed', tags:['速さ', '線分図'], difficulty:4,
    question:`A地点からB地点まで行きは時速4km、\n帰りは時速6kmで歩きました。\n\n往復の平均の速さを求めなさい。`,
    answer:4.8, answerUnit:'km/h',
    hint:`距離を具体的な数で置いてみよう！\nAB間を12kmと仮定すると計算しやすいよ。\n平均の速さ ＝ 総距離 ÷ 総時間`,
    explanation:[
      { title:'なぜ単純に (4+6)÷2 ではダメなの？',
        text:`行きと帰りで速さが違うと\nかかる時間が違う。\n遅い方（行き4km/h）の時間が長い → 平均は4km/hに近くなる！`,
        visual:`<div class="vis-numline"><div class="vis-numline-bar"></div><div class="vis-numline-dot" style="background:#0288D1;left:8%"></div><div class="vis-numline-dot" style="background:#E64A19;left:92%"></div><div class="vis-numline-lbl" style="left:8%">A地点</div><div class="vis-numline-lbl" style="left:92%">B地点</div><div class="vis-numline-lbl" style="left:50%;transform:translateX(-50%);top:0">行き4km/h → 帰り6km/h ←</div></div>` },
      { title:'AB間を12kmと仮定して計算',
        text:`行きの時間：12 ÷ 4 ＝ 3時間\n帰りの時間：12 ÷ 6 ＝ 2時間\n\n往復の総距離：12×2 ＝ 24km\n往復の総時間：3＋2 ＝ 5時間`,
        visual:`<div class="vis-formula">行き：12÷4＝3時間\n帰り：12÷6＝2時間\n合計：24km ÷ 5時間</div>` },
      { title:'平均の速さを求める（答え）',
        text:`平均の速さ ＝ 総距離 ÷ 総時間\n＝ 24 ÷ 5 ＝ 4.8 km/h`,
        visual:`<div class="vis-formula">平均の速さ ＝ 24 ÷ 5 ＝ 4.8 km/h\n\n公式：2 ÷ (1/4 ＋ 1/6) ＝ 4.8 km/h</div>` },
    ]
  },

  /* ── 通過算 3問目（すれ違い） ── */
  { id:'c25', grade:6, category:'通過算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A', title:'2列車がすれ違う', mainCategory:'speed', tags:['速さ', '通過算'], difficulty:3,
    question:`長さ100mの電車Aが秒速15mで、\n長さ200mの電車Bが秒速10mで\n逆方向に走っています。\n\nすれ違い始めてから終わるまでの時間は何秒か求めなさい。`,
    answer:12, answerUnit:'秒',
    hint:`すれ違う距離 ＝ AとBの長さを合わせた距離\n逆方向なので合わせた速さ ＝ 速さの和！`,
    explanation:[
      { title:'すれ違う距離を考える',
        text:`先頭同士が出会ってから\n最後尾が離れるまで。\n→ 距離 ＝ 100 ＋ 200 ＝ 300m`,
        visual:`<div class="vis-train-wrap">
  <div class="vis-track-line"><div class="vis-train-el">← B 200m / 10m/s</div><div class="vis-track-gap"></div><div class="vis-train-el">A 100m / 15m/s →</div></div>
  <div class="vis-train-sum">すれ違う距離 ＝ 100m ＋ 200m ＝ 300m</div>
</div>` },
      { title:'合わせた速さを求める',
        text:`逆方向 → 速さを足す！\n合わせた速さ ＝ 15 ＋ 10 ＝ 25 m/秒`,
        visual:`<div class="vis-formula">逆方向の合わせた速さ ＝ 15 ＋ 10 ＝ 25 m/秒</div>` },
      { title:'時間を求める（答え）',
        text:`時間 ＝ 距離 ÷ 合わせた速さ\n＝ 300 ÷ 25 ＝ 12秒`,
        visual:`<div class="vis-formula">300 ÷ 25 ＝ 12秒</div>` },
    ]
  },

  /* ── 食塩水 蒸発 ── */
  { id:'c26', grade:6, category:'割合', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA', title:'食塩水を蒸発させる', mainCategory:'ratio', tags:['割合・比', '面積図'], difficulty:4,
    question:`10%の食塩水300gから\n水を蒸発させて15%にしたい。\n\n何gの水を蒸発させればよいか求めなさい。`,
    answer:100, answerUnit:'g',
    hint:`蒸発しても塩の量は変わらない！\nまず塩の量を求めて、\n15%になるときの食塩水の量を逆算しよう。`,
    explanation:[
      { title:'塩の量を求める',
        text:`塩の量は蒸発しても変わらない！\n塩 ＝ 300g × 10% ＝ 300 × 0.1 ＝ 30g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.45)"></div></div><div class="vis-beaker-lbl">10%<br>300g<br><b>塩30g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">→ 蒸発 →</span><div><div class="vis-beaker" style="width:45px;height:60px"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.6)"></div></div><div class="vis-beaker-lbl">15%<br>？g<br><b>塩30g</b></div></div></div>` },
      { title:'15%のときの食塩水の量を求める',
        text:`15% ＝ 塩30g ÷ 食塩水の量\n食塩水の量 ＝ 30 ÷ 0.15 ＝ 200g`,
        visual:`<div class="vis-formula">食塩水の量 ＝ 30 ÷ 0.15 ＝ 200g</div>` },
      { title:'蒸発させた水の量を求める（答え）',
        text:`蒸発量 ＝ 元の量 − 残った量\n＝ 300 − 200 ＝ 100g`,
        visual:`<div class="vis-formula">蒸発量 ＝ 300 − 200 ＝ 100g</div>` },
    ]
  },

  /* ── 売買損益 ── */
  { id:'c27', grade:6, category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32', title:'定価と利益（売買損益 基本）', mainCategory:'ratio', tags:['割合・比', '売買損益'], difficulty:3,
    question:`ある商品を450円で仕入れました。\n仕入れ値の20%の利益をのせて\n定価をつけました。\n\n定価を求めなさい。`,
    answer:540, answerUnit:'円',
    hint:`定価 ＝ 仕入れ値 × (1 ＋ 利益の割合)\n20%の利益 → 1.2倍！`,
    explanation:[
      { title:'売買損益の関係を整理',
        text:`仕入れ値：商品を買った値段\n利益：もうけた金額\n定価 ＝ 仕入れ値 ＋ 利益`,
        visual:`<div class="vis-tape-wrap">
  <div class="vis-tape-row"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:72%;background:#1976D2">仕入れ値 450円</div><div class="vis-tape" style="width:14%;background:#E64A19;margin-left:2px">利益20%</div></div>
</div>` },
      { title:'利益の金額を求める',
        text:`利益 ＝ 仕入れ値 × 利益の割合\n＝ 450 × 0.2 ＝ 90円`,
        visual:`<div class="vis-formula">利益 ＝ 450 × 0.2 ＝ 90円</div>` },
      { title:'定価を求める（答え）',
        text:`定価 ＝ 仕入れ値 ＋ 利益\n＝ 450 ＋ 90 ＝ 540円\n\n別解：450 × 1.2 ＝ 540円`,
        visual:`<div class="vis-formula">定価 ＝ 450 × 1.2 ＝ 540円</div>` },
    ]
  },
  { id:'c28', grade:6, category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32', title:'割引と損益（売買損益 応用）', mainCategory:'ratio', tags:['割合・比', '売買損益'], difficulty:4,
    question:`定価800円の品物を定価の15%引きで売りました。\n仕入れ値は600円です。\n\n利益は何円か求めなさい。`,
    answer:80, answerUnit:'円',
    hint:`まず売値を求めよう。\n売値 ＝ 定価 × (1 − 割引率)\n次に 利益 ＝ 売値 − 仕入れ値`,
    explanation:[
      { title:'割引後の売値を求める',
        text:`15%引き → 定価の(100−15)% ＝ 85%で売る\n売値 ＝ 800 × 0.85 ＝ 680円`,
        visual:`<div class="vis-tape-wrap">
  <div class="vis-tape-row"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:85%;background:#1976D2">売値の部分 85%</div><div class="vis-tape" style="width:13%;background:#999;margin-left:2px">割引15%</div></div>
</div><div class="vis-formula" style="margin-top:6px">売値 ＝ 800 × 0.85 ＝ 680円</div>` },
      { title:'利益を求める（答え）',
        text:`利益 ＝ 売値 − 仕入れ値\n＝ 680 − 600 ＝ 80円`,
        visual:`<div class="vis-formula">利益 ＝ 680 − 600 ＝ 80円</div>` },
    ]
  },

  /* ────────────────────────────────────────
     割合・比（ratio）テスト3問
  ──────────────────────────────────────── */

  /* 食塩水 */
  { id:'g6_ratio_salt_001', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'食塩水の混合',
    difficulty:2, answerType:'number',
    title:'食塩水を混ぜる（基本）',
    question:`8%の食塩水150gと、2%の食塩水100gを混ぜました。\n\n混ぜた後の食塩水の濃度は何%ですか。`,
    answer:5.6, answerUnit:'%',
    hint:`先に「塩の重さ」をそれぞれ求めよう。\n塩の重さ ＝ 食塩水の重さ × 濃度（÷100）\n2つの塩を合わせて、全体の重さで割ると濃度が出るよ。`,
    tags:['割合・比','食塩水','混合'],
    visualTypes:['beaker','balance'],
    isRandomGenerated:false,
    explanation:[
      { title:'なぜ「塩の重さ」から考えるのか',
        text:`濃度は「塩が全体の何%か」を表します。\n混ぜると食塩水の量は変わりますが、\n塩の重さは変わらず足し算できます。\nだから先に「塩の重さ」をそれぞれ求めます。`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.55)"></div></div><div class="vis-beaker-lbl">8%<br>150g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.2)"></div></div><div class="vis-beaker-lbl">2%<br>100g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">=</span><div><div class="vis-beaker" style="width:65px;height:80px"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.38)"></div></div><div class="vis-beaker-lbl">?%<br>250g</div></div></div>` },
      { title:'それぞれの塩の重さを求める',
        text:`8%の食塩水150g の塩：\n　150 × 0.08 ＝ 12g\n\n2%の食塩水100g の塩：\n　100 × 0.02 ＝ 2g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.55)"></div></div><div class="vis-beaker-lbl">8%・150g<br><b>塩 12g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.2)"></div></div><div class="vis-beaker-lbl">2%・100g<br><b>塩 2g</b></div></div></div>` },
      { title:'混ぜた後の合計を求める',
        text:`塩の合計：12 ＋ 2 ＝ 14g\n食塩水の合計：150 ＋ 100 ＝ 250g`,
        visual:`<div class="vis-formula">塩 12g ＋ 2g ＝ 14g<br>食塩水 150g ＋ 100g ＝ 250g</div>` },
      { title:'濃度を計算する（答え）',
        text:`濃度 ＝ 塩の重さ ÷ 食塩水の重さ × 100\n＝ 14 ÷ 250 × 100\n＝ 5.6%`,
        visual:`<div class="vis-formula">14 ÷ 250 × 100 ＝ <b>5.6%</b></div>` },
    ]
  },

  /* 売買損益 */
  { id:'g6_ratio_profit_001', grade:6, course:'exam',
    category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32',
    mainCategory:'ratio', unit:'売買損益', pattern:'原価から定価を求める',
    difficulty:2, answerType:'number',
    title:'定価を求める（利益率から）',
    question:`ある店が仕入れ値500円の品物に、\n仕入れ値の24%の利益を見込んで定価をつけました。\n\n定価は何円ですか。`,
    answer:620, answerUnit:'円',
    hint:`「利益を見込む」とは、仕入れ値に利益分を足すことだよ。\n定価 ＝ 仕入れ値 × (1 ＋ 利益率)`,
    tags:['割合・比','売買損益','定価'],
    visualTypes:['priceFlow','barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'「利益を見込む」とはどういう意味か',
        text:`仕入れ値に「いくら儲けたいか」を上乗せしたのが定価です。\n24%の利益 ＝ 仕入れ値の24%分を上乗せ\nつまり定価は仕入れ値の 100% ＋ 24% ＝ 124% になります。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">仕入れ値</span><div class="vis-tape" style="width:80%;background:#1976D2">仕入れ値 100%</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:80%;background:#1976D2">仕入れ値 100%</div><div class="vis-tape" style="width:19%;background:#43A047;margin-left:2px">利益 24%</div></div>` },
      { title:'計算式を作る',
        text:`定価 ＝ 仕入れ値 × (1 ＋ 0.24)\n＝ 500 × 1.24`,
        visual:`<div class="vis-formula">500 × 1.24 ＝ ?</div>` },
      { title:'計算する（答え）',
        text:`500 × 1.24 ＝ 620円`,
        visual:`<div class="vis-formula">500 × 1.24 ＝ <b>620円</b></div>` },
      { title:'答えを確かめる',
        text:`利益：620 − 500 ＝ 120円\n120 ÷ 500 × 100 ＝ 24% ✓\n仕入れ値の24%の利益になっているね。`,
        visual:`<div class="vis-formula">利益 120円 ÷ 仕入れ値 500円 × 100 ＝ 24% ✓</div>` },
    ]
  },

  /* 比の基本 */
  { id:'g6_ratio_ratio_001', grade:6, course:'exam',
    category:'比', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'比の基本', pattern:'比から量を求める',
    difficulty:2, answerType:'number',
    title:'比で量を求める（全体から分ける）',
    question:`AさんとBさんのあめの数の比は 3：5 です。\n2人のあめの合計は240個です。\n\nAさんのあめは何個ですか。`,
    answer:90, answerUnit:'個',
    hint:`比 3：5 は「全体を8に分けたとき、Aが3つ分・Bが5つ分」ということだよ。\nAの量 ＝ 全体 × 3/(3+5)`,
    tags:['割合・比','比','比から量を求める'],
    visualTypes:['ratioBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'比が表す意味を理解する',
        text:`3：5 は「Aが3、Bが5の割合」という意味です。\n合わせると 3＋5＝8 の部分になります。\nつまり全体240個を8等分したとき、Aは3つ分もらえます。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:37%;background:#8E24AA">3</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">B</span><div class="vis-tape" style="width:63%;background:#AB47BC">5</div></div><div style="text-align:center;color:#666;font-size:.85rem;margin-top:4px">合計 8 → 全体 240個</div>` },
      { title:'1あたりの量を求める',
        text:`全体 240個 が 8つ分にあたるので\n1つ分 ＝ 240 ÷ 8 ＝ 30個`,
        visual:`<div class="vis-formula">240 ÷ 8 ＝ 30個（1あたり）</div>` },
      { title:'Aの量を求める（答え）',
        text:`Aは3つ分なので\nA ＝ 30 × 3 ＝ 90個`,
        visual:`<div class="vis-formula">30 × 3 ＝ <b>90個</b></div>` },
      { title:'答えを確かめる',
        text:`A：B ＝ 90：150 ＝ 3：5 ✓\n合計：90 ＋ 150 ＝ 240個 ✓`,
        visual:`<div class="vis-formula">90 ＋ 150 ＝ 240 ✓　　90：150 ＝ 3：5 ✓</div>` },
    ]
  },


  /* ════════════════════════════════════════
     割合の基本（5問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_basic_001', grade:6, course:'exam',
    category:'割合の基本', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'割合の基本', pattern:'割合を求める',
    difficulty:1, answerType:'number',
    title:'割合を%で求める',
    question:`40個のりんごのうち8個が赤いりんごです。\n\n赤いりんごは全体の何%ですか。`,
    answer:20, answerUnit:'%',
    hint:`割合 ＝ 比べる量 ÷ もとにする量\n「全体40個がもと」「赤い8個が比べる量」だよ。\n最後に×100すると%になるよ。`,
    tags:['割合・比','割合の基本','百分率'],
    visualTypes:['barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'「割合」とは何か',
        text:`割合とは、「全体（もと）に対して、比べる量がどれくらいか」を表す数です。\n\n今回は「40個のうち8個が赤い」なので\nもとの量 ＝ 40個\n比べる量 ＝ 8個`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">全体</span><div class="vis-tape" style="width:80%;background:#AB47BC">40個（もと）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">赤</span><div class="vis-tape" style="width:16%;background:#E64A19">8個</div></div>` },
      { title:'割合の公式で計算する',
        text:`割合 ＝ 比べる量 ÷ もとにする量\n　　 ＝ 8 ÷ 40\n　　 ＝ 0.2`,
        visual:`<div class="vis-formula">8 ÷ 40 ＝ 0.2</div>` },
      { title:'%（パーセント）に直す（答え）',
        text:`小数を%に直すには×100します。\n0.2 × 100 ＝ 20%\n\n赤いりんごは全体の20%です。`,
        visual:`<div class="vis-formula">0.2 × 100 ＝ <b>20%</b></div>` },
    ]
  },

  { id:'g6_ratio_basic_002', grade:6, course:'exam',
    category:'割合の基本', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'割合の基本', pattern:'割合から量を求める',
    difficulty:2, answerType:'number',
    title:'割合から量を求める',
    question:`クラスの人数は40人です。\nそのうち35%が電車で通学しています。\n\n電車で通学している人は何人ですか。`,
    answer:14, answerUnit:'人',
    hint:`比べる量 ＝ もとにする量 × 割合\n35% ＝ 0.35 として計算しよう。`,
    tags:['割合・比','割合の基本','百分率'],
    visualTypes:['barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'何を求めるか整理する',
        text:`もとの量（全体） ＝ 40人\n割合 ＝ 35% ＝ 0.35\n求めるもの ＝ 電車通学の人数（比べる量）`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">全体</span><div class="vis-tape" style="width:80%;background:#AB47BC">40人</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">電車</span><div class="vis-tape" style="width:28%;background:#E64A19">?人（35%）</div></div>` },
      { title:'式を立てて計算する',
        text:`比べる量 ＝ もとの量 × 割合\n　　　　 ＝ 40 × 0.35\n　　　　 ＝ 14人`,
        visual:`<div class="vis-formula">40 × 0.35 ＝ <b>14人</b></div>` },
      { title:'答えを確かめる',
        text:`14 ÷ 40 × 100 ＝ 35% ✓\n全体の35%が14人になっているね。`,
        visual:`<div class="vis-formula">14 ÷ 40 × 100 ＝ 35% ✓</div>` },
    ]
  },

  { id:'g6_ratio_basic_003', grade:6, course:'exam',
    category:'割合の基本', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'割合の基本', pattern:'もとの量を求める',
    difficulty:2, answerType:'number',
    title:'もとの量を求める',
    question:`ある数の60%が48です。\n\nもとの数はいくつですか。`,
    answer:80, answerUnit:'',
    hint:`比べる量 ÷ 割合 ＝ もとの量\n「48が60%にあたる」から\nもとの量 ＝ 48 ÷ 0.6 で求められるよ。`,
    tags:['割合・比','割合の基本','逆算'],
    visualTypes:['barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'「60%が48」という関係を図にする',
        text:`全体（もと）が□のとき、その60%が48です。\nつまり □ × 0.6 ＝ 48 という式になります。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">もと</span><div class="vis-tape" style="width:80%;background:#AB47BC">□（全体）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl"></span><div class="vis-tape" style="width:48%;background:#E64A19">48（60%）</div></div>` },
      { title:'逆算で□を求める',
        text:`□ × 0.6 ＝ 48\nなので\n□ ＝ 48 ÷ 0.6\n□ ＝ 80`,
        visual:`<div class="vis-formula">48 ÷ 0.6 ＝ <b>80</b></div>` },
      { title:'答えを確かめる',
        text:`80 × 0.6 ＝ 48 ✓\nもとの数80の60%がちゃんと48になっているね。`,
        visual:`<div class="vis-formula">80 × 0.6 ＝ 48 ✓</div>` },
    ]
  },

  { id:'g6_ratio_basic_004', grade:6, course:'exam',
    category:'割合の基本', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'割合の基本', pattern:'2段階の割合',
    difficulty:3, answerType:'number',
    title:'割合を2段階で計算する',
    question:`定員120人の学校に、今年は定員の75%の生徒が入学しました。\nさらに入学者の20%は他の市から転校してきた生徒です。\n\n転校生は何人ですか。`,
    answer:18, answerUnit:'人',
    hint:`まず「今年の入学者数」を求めて、\nその20%を計算しよう。\n2段階に分けて落ち着いて計算しよう。`,
    tags:['割合・比','割合の基本','2段階'],
    visualTypes:['barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'入学者数を求める（1段階目）',
        text:`定員120人の75%が入学したので\n入学者 ＝ 120 × 0.75 ＝ 90人`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">定員</span><div class="vis-tape" style="width:80%;background:#AB47BC">120人</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">入学</span><div class="vis-tape" style="width:60%;background:#7B1FA2">90人（75%）</div></div><div class="vis-formula" style="margin-top:6px">120 × 0.75 ＝ 90人</div>` },
      { title:'転校生の数を求める（2段階目）',
        text:`入学者90人の20%が転校生なので\n転校生 ＝ 90 × 0.20 ＝ 18人`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">入学</span><div class="vis-tape" style="width:75%;background:#7B1FA2">90人</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">転校</span><div class="vis-tape" style="width:15%;background:#E64A19">18人（20%）</div></div><div class="vis-formula" style="margin-top:6px">90 × 0.20 ＝ 18人</div>` },
    ]
  },

  { id:'g6_ratio_basic_005', grade:6, course:'exam',
    category:'割合の基本', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA',
    mainCategory:'ratio', unit:'割合の基本', pattern:'割合での増減',
    difficulty:3, answerType:'number',
    title:'去年より何%増えたか求める',
    question:`ある市の人口は去年が20000人でした。\n今年は去年より1400人増えました。\n\n今年の人口は去年の何%増えですか。`,
    answer:7, answerUnit:'%',
    hint:`増えた割合 ＝ 増えた人数 ÷ 去年の人数 × 100\n「去年の人数」がもとの量だよ。`,
    tags:['割合・比','割合の基本','増減'],
    visualTypes:['barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'「何%増え」とはどういう意味か',
        text:`「去年より7%増え」とは、\n「去年の人口を100%としたとき、\n　増えた分が7%」という意味です。\n\n増えた割合 ＝ 増えた量 ÷ もとの量（去年）`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">去年</span><div class="vis-tape" style="width:75%;background:#AB47BC">20000人（100%）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">増加</span><div class="vis-tape" style="width:75%;background:#AB47BC">20000人</div><div class="vis-tape" style="width:5%;background:#E64A19;margin-left:2px">+?%</div></div>` },
      { title:'増えた割合を計算する（答え）',
        text:`増えた割合 ＝ 1400 ÷ 20000 × 100\n　　　　　 ＝ 0.07 × 100\n　　　　　 ＝ 7%`,
        visual:`<div class="vis-formula">1400 ÷ 20000 × 100 ＝ <b>7%</b></div>` },
      { title:'答えを確かめる',
        text:`20000 × 0.07 ＝ 1400人 ✓\n7%増えると1400人増えることが確認できるね。`,
        visual:`<div class="vis-formula">20000 × 0.07 ＝ 1400人 ✓</div>` },
    ]
  },

  /* ════════════════════════════════════════
     比の基本（残り4問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_ratio_002', grade:6, course:'exam',
    category:'比', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2',
    mainCategory:'ratio', unit:'比の基本', pattern:'片方から他方を求める',
    difficulty:1, answerType:'number',
    title:'片方の量から他方を求める',
    question:`AとBの本の数の比は 1：3 です。\nBが60冊のとき、Aは何冊ですか。`,
    answer:20, answerUnit:'冊',
    hint:`比 1：3 は「Bが3のとき、Aが1」という関係だよ。\nBの60冊が比の「3」にあたるから\n「1」はいくつになるか考えよう。`,
    tags:['割合・比','比','比から量を求める'],
    visualTypes:['ratioBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'比の意味を確認する',
        text:`A：B ＝ 1：3 は「Bがの量の3倍がB」という関係です。\nまた「1つ分の量」を決めれば両方が分かります。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:20%;background:#1976D2">1</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">B</span><div class="vis-tape" style="width:60%;background:#42A5F5">3（60冊）</div></div>` },
      { title:'1つ分の量を求める',
        text:`Bの60冊が「3つ分」にあたります。\n1つ分 ＝ 60 ÷ 3 ＝ 20冊`,
        visual:`<div class="vis-formula">60 ÷ 3 ＝ 20冊（1つ分）</div>` },
      { title:'Aの量を求める（答え）',
        text:`Aは「1つ分」なので\nA ＝ 20 × 1 ＝ 20冊`,
        visual:`<div class="vis-formula">20 × 1 ＝ <b>20冊</b></div>` },
    ]
  },

  { id:'g6_ratio_ratio_003', grade:6, course:'exam',
    category:'比', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2',
    mainCategory:'ratio', unit:'比の基本', pattern:'3つの量を比で分ける',
    difficulty:2, answerType:'number',
    title:'3人でカードを比の通りに分ける',
    question:`A・B・Cの3人でカード100枚を\n2：3：5 の比で分けました。\n\nBのカードは何枚ですか。`,
    answer:30, answerUnit:'枚',
    hint:`3つの比の合計 ＝ 2＋3＋5 ＝ 10（全体）\nBは「10のうちの3」にあたるよ。`,
    tags:['割合・比','比','3数の比'],
    visualTypes:['ratioBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'比の合計を求める',
        text:`2：3：5 の合計は\n2＋3＋5 ＝ 10（つ分）\n全体100枚を「10等分」したのが1つ分です。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:20%;background:#1976D2">2</div></div><div class="vis-tape-row" style="margin-top:4px"><span class="vis-tape-lbl">B</span><div class="vis-tape" style="width:30%;background:#1565C0">3</div></div><div class="vis-tape-row" style="margin-top:4px"><span class="vis-tape-lbl">C</span><div class="vis-tape" style="width:50%;background:#0D47A1">5</div></div><div style="text-align:center;color:#666;font-size:.8rem;margin-top:4px">合計 10 → 全体 100枚</div>` },
      { title:'1つ分の量を求める',
        text:`100枚 ÷ 10 ＝ 10枚（1つ分）`,
        visual:`<div class="vis-formula">100 ÷ 10 ＝ 10枚（1つ分）</div>` },
      { title:'Bの枚数を求める（答え）',
        text:`Bは3つ分なので\nB ＝ 10 × 3 ＝ 30枚`,
        visual:`<div class="vis-formula">10 × 3 ＝ <b>30枚</b></div>` },
    ]
  },

  { id:'g6_ratio_ratio_004', grade:6, course:'exam',
    category:'比', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2',
    mainCategory:'ratio', unit:'比の基本', pattern:'差から全体を求める',
    difficulty:3, answerType:'number',
    title:'差を使って比から量を求める',
    question:`AとBのシールの数の比は 5：3 です。\nAはBより16枚多いです。\n\nAのシールは何枚ですか。`,
    answer:40, answerUnit:'枚',
    hint:`AはBより「比の差（5－3）＝2つ分」だけ多い。\n2つ分が16枚なら、1つ分はいくつ？\n→ Aは5つ分だから…`,
    tags:['割合・比','比','差から求める'],
    visualTypes:['ratioBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'「差」が何つ分かを考える',
        text:`A：B ＝ 5：3 のとき\nAとBの差は 5－3 ＝ 2（つ分）\nこの「2つ分」がちょうど16枚にあたります。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:50%;background:#1976D2">5つ分</div></div><div class="vis-tape-row" style="margin-top:4px"><span class="vis-tape-lbl">B</span><div class="vis-tape" style="width:30%;background:#42A5F5">3つ分</div><div class="vis-tape" style="width:20%;background:#E64A19;margin-left:2px">差2つ分=16枚</div></div>` },
      { title:'1つ分の量を求める',
        text:`2つ分 ＝ 16枚\n1つ分 ＝ 16 ÷ 2 ＝ 8枚`,
        visual:`<div class="vis-formula">16 ÷ 2 ＝ 8枚（1つ分）</div>` },
      { title:'Aの枚数を求める（答え）',
        text:`Aは5つ分なので\nA ＝ 8 × 5 ＝ 40枚`,
        visual:`<div class="vis-formula">8 × 5 ＝ <b>40枚</b></div>` },
      { title:'答えを確かめる',
        text:`B ＝ 8 × 3 ＝ 24枚\nA－B ＝ 40－24 ＝ 16枚 ✓\nA：B ＝ 40：24 ＝ 5：3 ✓`,
        visual:`<div class="vis-formula">40 ÷ 8 ＝ 5、24 ÷ 8 ＝ 3 → 5：3 ✓</div>` },
    ]
  },

  { id:'g6_ratio_ratio_005', grade:6, course:'exam',
    category:'比', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2',
    mainCategory:'ratio', unit:'比の基本', pattern:'連比',
    difficulty:4, answerType:'number',
    title:'A：B：Cの連比を求める',
    question:`AとBの比は 3：4、\nBとCの比は 2：5 です。\nA、B、Cの合計が136のとき、\n\nAはいくつですか。`,
    answer:24, answerUnit:'',
    hint:`「B」を共通の数にそろえると\nA：B：C がひとつの比で表せるよ。\nBを 3：4 の「4」と 2：5 の「2」の\n最小公倍数「8」にそろえよう。`,
    tags:['割合・比','比','連比'],
    visualTypes:['ratioBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'Bを共通の数にそろえる',
        text:`A：B ＝ 3：4\nB：C ＝ 2：5\nBの「4」と「2」の最小公倍数は「8」です。\nA：B ＝ 6：8（両方を×2）\nB：C ＝ 8：20（両方を×4）`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A：B</span><div class="vis-tape" style="width:30%;background:#1976D2">6</div><div class="vis-tape" style="width:40%;background:#42A5F5;margin-left:2px">8</div></div><div class="vis-tape-row" style="margin-top:4px"><span class="vis-tape-lbl">B：C</span><div class="vis-tape" style="width:40%;background:#42A5F5">8</div><div class="vis-tape" style="width:50%;background:#0D47A1;margin-left:2px" >20</div></div>` },
      { title:'A：B：Cをひとつの比にまとめる',
        text:`BがそろったのでA：B：C ＝ 6：8：20\n約分して ＝ 3：4：10`,
        visual:`<div class="vis-formula">A：B：C ＝ 6：8：20 ＝ 3：4：10</div>` },
      { title:'合計からAを求める（答え）',
        text:`合計のつ数：3＋4＋10 ＝ 17\n1つ分 ＝ 136 ÷ 17 ＝ 8\nA ＝ 8 × 3 ＝ 24`,
        visual:`<div class="vis-formula">136 ÷ 17 ＝ 8 → A ＝ 8 × 3 ＝ <b>24</b></div>` },
      { title:'答えを確かめる',
        text:`B ＝ 8×4＝32、C ＝ 8×10＝80\n合計 ＝ 24＋32＋80 ＝ 136 ✓\nA：B ＝ 24：32 ＝ 3：4 ✓\nB：C ＝ 32：80 ＝ 2：5 ✓`,
        visual:`<div class="vis-formula">24＋32＋80 ＝ 136 ✓</div>` },
    ]
  },

  /* ════════════════════════════════════════
     売買損益（残り4問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_profit_002', grade:6, course:'exam',
    category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32',
    mainCategory:'ratio', unit:'売買損益', pattern:'割引後の値段を求める',
    difficulty:1, answerType:'number',
    title:'20%引きの値段を求める',
    question:`定価800円の商品が20%引きで売られています。\n\n売値は何円ですか。`,
    answer:640, answerUnit:'円',
    hint:`20%引き ＝ 定価の（100－20）% ＝ 80% で売るということ。\n売値 ＝ 定価 × 0.8`,
    tags:['割合・比','売買損益','割引'],
    visualTypes:['priceFlow','barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'「20%引き」を式で表す',
        text:`「20%引き」とは、定価から20%分を引いて売ること。\n定価の100% − 20% ＝ 80% で売るということです。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:80%;background:#2E7D32">800円（100%）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">売値</span><div class="vis-tape" style="width:64%;background:#43A047">?円（80%）</div><div class="vis-tape" style="width:16%;background:#999;margin-left:2px">20%引き</div></div>` },
      { title:'売値を計算する（答え）',
        text:`売値 ＝ 800 × 0.8 ＝ 640円`,
        visual:`<div class="vis-formula">800 × 0.8 ＝ <b>640円</b></div>` },
    ]
  },

  { id:'g6_ratio_profit_003', grade:6, course:'exam',
    category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32',
    mainCategory:'ratio', unit:'売買損益', pattern:'原価を求める',
    difficulty:3, answerType:'number',
    title:'定価から原価（仕入れ値）を逆算する',
    question:`ある商品に原価の25%の利益を見込んで\n定価をつけたところ、定価は1500円になりました。\n\n原価は何円ですか。`,
    answer:1200, answerUnit:'円',
    hint:`定価 ＝ 原価 × (1＋0.25) ＝ 原価 × 1.25\nこれを逆算すると\n原価 ＝ 定価 ÷ 1.25`,
    tags:['割合・比','売買損益','原価','逆算'],
    visualTypes:['priceFlow','barModel'],
    isRandomGenerated:false,
    explanation:[
      { title:'定価と原価の関係を式にする',
        text:`「原価の25%の利益」を乗せると定価になるので\n定価 ＝ 原価 × (1＋0.25) ＝ 原価 × 1.25\nつまり　原価 × 1.25 ＝ 1500`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">原価</span><div class="vis-tape" style="width:64%;background:#2E7D32">原価（100%）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:64%;background:#2E7D32">原価 100%</div><div class="vis-tape" style="width:16%;background:#FFC107;margin-left:2px">利益25%</div></div>` },
      { title:'逆算して原価を求める（答え）',
        text:`原価 × 1.25 ＝ 1500\n原価 ＝ 1500 ÷ 1.25 ＝ 1200円`,
        visual:`<div class="vis-formula">1500 ÷ 1.25 ＝ <b>1200円</b></div>` },
      { title:'答えを確かめる',
        text:`1200 × 1.25 ＝ 1500円 ✓\n利益：1500－1200 ＝ 300円\n300 ÷ 1200 × 100 ＝ 25% ✓`,
        visual:`<div class="vis-formula">1200 × 1.25 ＝ 1500円 ✓</div>` },
    ]
  },

  { id:'g6_ratio_profit_004', grade:6, course:'exam',
    category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32',
    mainCategory:'ratio', unit:'売買損益', pattern:'定価割引後の利益',
    difficulty:4, answerType:'number',
    title:'割引後の利益額を求める',
    question:`仕入れ値600円の商品に40%の利益を見込んで\n定価をつけました。\nその後、定価の10%引きで売りました。\n\n利益は何円ですか。`,
    answer:156, answerUnit:'円',
    hint:`まず定価を求めて、次に割引後の売値を求めよう。\n利益 ＝ 売値 − 仕入れ値`,
    tags:['割合・比','売買損益','定価','割引','利益'],
    visualTypes:['priceFlow'],
    isRandomGenerated:false,
    explanation:[
      { title:'定価を求める',
        text:`仕入れ値600円に40%の利益を乗せると\n定価 ＝ 600 × 1.4 ＝ 840円`,
        visual:`<div class="vis-formula">600 × 1.4 ＝ 840円（定価）</div>` },
      { title:'10%引きの売値を求める',
        text:`定価840円の10%引きなので\n売値 ＝ 840 × 0.9 ＝ 756円`,
        visual:`<div class="vis-formula">840 × 0.9 ＝ 756円（売値）</div>` },
      { title:'利益を求める（答え）',
        text:`利益 ＝ 売値 − 仕入れ値\n　　 ＝ 756 − 600\n　　 ＝ 156円`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">仕入れ</span><div class="vis-tape" style="width:60%;background:#2E7D32">600円</div></div><div class="vis-tape-row" style="margin-top:4px"><span class="vis-tape-lbl">売値</span><div class="vis-tape" style="width:60%;background:#2E7D32">600円</div><div class="vis-tape" style="width:15%;background:#FFC107;margin-left:2px">利益156円</div></div><div class="vis-formula" style="margin-top:6px">756 − 600 ＝ <b>156円</b></div>` },
    ]
  },

  { id:'g6_ratio_profit_005', grade:6, course:'exam',
    category:'売買損益', catColor:'#1B5E20', catBg:'#E8F5E9', borderColor:'#2E7D32',
    mainCategory:'ratio', unit:'売買損益', pattern:'売価から損益判定',
    difficulty:4, answerType:'number',
    title:'定価の15%引きで売ったときの利益',
    question:`仕入れ値1000円の商品に定価を1400円でつけ、\nその後定価の15%引きで売りました。\n\n利益は何円ですか。`,
    answer:190, answerUnit:'円',
    hint:`売値 ＝ 定価 × (1－0.15) ＝ 定価 × 0.85\n利益 ＝ 売値 − 仕入れ値`,
    tags:['割合・比','売買損益','定価','割引','利益'],
    visualTypes:['priceFlow'],
    isRandomGenerated:false,
    explanation:[
      { title:'15%引きの売値を求める',
        text:`定価1400円の15%引き\n売値 ＝ 1400 × (1－0.15)\n　　 ＝ 1400 × 0.85\n　　 ＝ 1190円`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">定価</span><div class="vis-tape" style="width:70%;background:#2E7D32">1400円（100%）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">売値</span><div class="vis-tape" style="width:59%;background:#43A047">1190円（85%）</div><div class="vis-tape" style="width:10%;background:#999;margin-left:2px">15%</div></div>` },
      { title:'利益を求める（答え）',
        text:`利益 ＝ 売値 − 仕入れ値\n　　 ＝ 1190 − 1000\n　　 ＝ 190円`,
        visual:`<div class="vis-formula">1190 − 1000 ＝ <b>190円</b></div>` },
    ]
  },

  /* ════════════════════════════════════════
     食塩水（残り4問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_salt_002', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'水を加えて薄める',
    difficulty:3, answerType:'number',
    title:'水を加えて薄める',
    question:`10%の食塩水200gに水を加えて8%にしたいです。\n\n水を何g加えればよいですか。`,
    answer:50, answerUnit:'g',
    hint:`塩の重さは変わらない！\n加えた後の食塩水全体の重さを□として\n塩の重さ ÷ □ ＝ 8% で式を立てよう。`,
    tags:['割合・比','食塩水','希釈'],
    visualTypes:['beaker'],
    isRandomGenerated:false,
    explanation:[
      { title:'塩の重さを求める（水を加えても変わらない）',
        text:`10%の食塩水200gの塩の重さ：\n塩 ＝ 200 × 0.10 ＝ 20g\n\n水を加えても塩の重さは20gのまま変わりません。`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.5)"></div></div><div class="vis-beaker-lbl">10%・200g<br><b>塩 20g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＋</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(200,230,255,.3)"></div></div><div class="vis-beaker-lbl">水□g</div></div></div>` },
      { title:'8%になる全体の重さを求める',
        text:`8%になったとき「塩20g ＝ 全体の8%」なので\n全体 ＝ 20 ÷ 0.08 ＝ 250g`,
        visual:`<div class="vis-formula">20 ÷ 0.08 ＝ 250g（全体）</div>` },
      { title:'加えた水の重さを求める（答え）',
        text:`加えた水 ＝ 全体 − もとの食塩水\n　　　　 ＝ 250 − 200\n　　　　 ＝ 50g`,
        visual:`<div class="vis-formula">250 − 200 ＝ <b>50g</b></div>` },
      { title:'答えを確かめる',
        text:`加えた後：塩20g、全体250g\n濃度 ＝ 20 ÷ 250 × 100 ＝ 8% ✓`,
        visual:`<div class="vis-formula">20 ÷ 250 × 100 ＝ 8% ✓</div>` },
    ]
  },

  { id:'g6_ratio_salt_003', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'水を蒸発させる',
    difficulty:3, answerType:'number',
    title:'水を蒸発させて濃くする',
    question:`5%の食塩水300gを加熱して、\n水を60g蒸発させました。\n\n何%の食塩水になりますか。`,
    answer:6.25, answerUnit:'%',
    hint:`蒸発するのは水だけ。塩の重さは変わらないよ。\n蒸発後の食塩水の重さ ＝ 300 − 60 ＝ 240g`,
    tags:['割合・比','食塩水','蒸発'],
    visualTypes:['beaker'],
    isRandomGenerated:false,
    explanation:[
      { title:'もとの塩の重さを求める',
        text:`5%の食塩水300gの塩の重さ：\n塩 ＝ 300 × 0.05 ＝ 15g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.3)"></div></div><div class="vis-beaker-lbl">5%・300g<br><b>塩 15g</b></div></div></div>` },
      { title:'蒸発後の食塩水の重さを求める',
        text:`水だけが60g蒸発するので\n蒸発後 ＝ 300 − 60 ＝ 240g\n（塩の15gは変わらない）`,
        visual:`<div class="vis-formula">300 − 60 ＝ 240g（蒸発後）</div>` },
      { title:'濃度を計算する（答え）',
        text:`濃度 ＝ 15 ÷ 240 × 100\n　　 ＝ 6.25%`,
        visual:`<div class="vis-formula">15 ÷ 240 × 100 ＝ <b>6.25%</b></div>` },
    ]
  },

  { id:'g6_ratio_salt_004', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'一部取り出して水を加える',
    difficulty:4, answerType:'number',
    title:'一部取り出して水を加える',
    question:`8%の食塩水250gから50gを取り出し、\n代わりに水50gを加えました。\n\n何%の食塩水になりますか。`,
    answer:6.4, answerUnit:'%',
    hint:`取り出した50gの中にも8%の塩が含まれているよ。\n残った塩の量を正確に求めよう。`,
    tags:['割合・比','食塩水','取り出し','置き換え'],
    visualTypes:['beaker'],
    isRandomGenerated:false,
    explanation:[
      { title:'もとの塩の重さを求める',
        text:`8%の食塩水250gの塩の重さ：\n塩 ＝ 250 × 0.08 ＝ 20g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.5)"></div></div><div class="vis-beaker-lbl">8%・250g<br><b>塩 20g</b></div></div></div>` },
      { title:'取り出した50gの中の塩を求める',
        text:`取り出した50gも8%の食塩水なので\n塩 ＝ 50 × 0.08 ＝ 4g`,
        visual:`<div class="vis-formula">取り出した塩 ＝ 50 × 0.08 ＝ 4g</div>` },
      { title:'残った塩の量を求める',
        text:`残った塩 ＝ もとの塩 − 取り出した塩\n　　　　 ＝ 20 − 4 ＝ 16g\n（水50gを加えても塩は変わらない）\n全体はもとの250gのまま`,
        visual:`<div class="vis-formula">塩 20g − 4g ＝ 16g　全体 250g（変わらず）</div>` },
      { title:'濃度を計算する（答え）',
        text:`濃度 ＝ 16 ÷ 250 × 100 ＝ 6.4%`,
        visual:`<div class="vis-formula">16 ÷ 250 × 100 ＝ <b>6.4%</b></div>` },
    ]
  },

  { id:'g6_ratio_salt_005', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'3つの食塩水を混ぜる',
    difficulty:5, answerType:'number',
    title:'3つの食塩水を混ぜて目標濃度にする',
    question:`4%の食塩水100g、12%の食塩水100g、\n18%の食塩水□gを混ぜたら10%の食塩水になりました。\n\n□は何gですか。`,
    answer:50, answerUnit:'g',
    hint:`3つの塩の合計 ＝ 混ぜた全体 × 10%\nという方程式を立てよう。\n「塩の合計」と「食塩水の合計」をそれぞれ□で表す。`,
    tags:['割合・比','食塩水','混合','方程式'],
    visualTypes:['beaker','balance'],
    isRandomGenerated:false,
    explanation:[
      { title:'それぞれの塩の重さを表す',
        text:`4%の食塩水100g  → 塩：100×0.04 ＝ 4g\n12%の食塩水100g → 塩：100×0.12 ＝ 12g\n18%の食塩水□g  → 塩：□×0.18 g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:55%;background:rgba(3,169,244,.25)"></div></div><div class="vis-beaker-lbl">4%・100g<br><b>塩4g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:55%;background:rgba(3,169,244,.6)"></div></div><div class="vis-beaker-lbl">12%・100g<br><b>塩12g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:55%;background:rgba(2,119,189,.8)"></div></div><div class="vis-beaker-lbl">18%・□g<br><b>塩0.18□g</b></div></div></div>` },
      { title:'塩の合計で方程式を作る',
        text:`混ぜた後は10%で全体は（200＋□）g\n\n塩の合計（左辺）＝全体の10%（右辺）\n4 ＋ 12 ＋ 0.18□ ＝ (200＋□) × 0.10`,
        visual:`<div class="vis-formula">16 ＋ 0.18□ ＝ 20 ＋ 0.1□</div>` },
      { title:'□を求める（答え）',
        text:`16 ＋ 0.18□ ＝ 20 ＋ 0.1□\n0.08□ ＝ 4\n□ ＝ 4 ÷ 0.08 ＝ 50g`,
        visual:`<div class="vis-formula">4 ÷ 0.08 ＝ <b>50g</b></div>` },
      { title:'答えを確かめる',
        text:`塩の合計：4＋12＋50×0.18 ＝ 4＋12＋9 ＝ 25g\n全体：100＋100＋50 ＝ 250g\n濃度：25÷250×100 ＝ 10% ✓`,
        visual:`<div class="vis-formula">25 ÷ 250 × 100 ＝ 10% ✓</div>` },
    ]
  },

  /* ════════════════════════════════════════
     相当算・倍数算（5問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_equivalent_001', grade:6, course:'exam',
    category:'相当算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00',
    mainCategory:'ratio', unit:'相当算・倍数算', pattern:'分数の相当算（基本）',
    difficulty:1, answerType:'number',
    title:'分数から全体を求める（相当算）',
    question:`あるクラスの人数の 3/5 が30人です。\n\nクラスは全部で何人ですか。`,
    answer:50, answerUnit:'人',
    hint:`「3/5 が30人」ということは\n全体を5等分したうちの3つが30人だよ。\n1つ分の人数を求めてから、5つ分を出そう。`,
    tags:['割合・比','相当算','分数'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'「3/5が30人」を図にする',
        text:`全体を5等分したとき、3つ分が30人という意味です。\n1つ分の人数 ＝ 30 ÷ 3 ＝ 10人`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">全体</span><div class="vis-tape" style="width:10%;background:#FB8C00;margin:1px">1</div><div class="vis-tape" style="width:10%;background:#FB8C00;margin:1px">1</div><div class="vis-tape" style="width:10%;background:#FB8C00;margin:1px">1</div><div class="vis-tape" style="width:10%;background:#ccc;margin:1px">1</div><div class="vis-tape" style="width:10%;background:#ccc;margin:1px">1</div></div><div style="color:#666;font-size:.8rem;margin-top:4px">←── 3つ分＝30人 ──→</div>` },
      { title:'全体（5つ分）を求める（答え）',
        text:`全体 ＝ 1つ分 × 5\n　　 ＝ 10 × 5 ＝ 50人`,
        visual:`<div class="vis-formula">30 ÷ 3 × 5 ＝ <b>50人</b></div>` },
    ]
  },

  { id:'g6_ratio_equivalent_002', grade:6, course:'exam',
    category:'相当算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00',
    mainCategory:'ratio', unit:'相当算・倍数算', pattern:'倍数算（比から求める）',
    difficulty:2, answerType:'number',
    title:'姉と妹の所持金（倍数算）',
    question:`姉と妹の所持金の比は 4：3 です。\n姉の所持金が360円のとき、\n\n妹の所持金は何円ですか。`,
    answer:270, answerUnit:'円',
    hint:`姉が「4つ分」＝360円から「1つ分」を求め\n妹の「3つ分」を計算しよう。`,
    tags:['割合・比','比','倍数算'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'1つ分の金額を求める',
        text:`姉の360円が「4つ分」にあたるので\n1つ分 ＝ 360 ÷ 4 ＝ 90円`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">姉</span><div class="vis-tape" style="width:64%;background:#FB8C00">360円（4つ分）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">妹</span><div class="vis-tape" style="width:48%;background:#FFA726">?円（3つ分）</div></div>` },
      { title:'妹の所持金を求める（答え）',
        text:`妹は「3つ分」なので\n妹 ＝ 90 × 3 ＝ 270円`,
        visual:`<div class="vis-formula">90 × 3 ＝ <b>270円</b></div>` },
    ]
  },

  { id:'g6_ratio_equivalent_003', grade:6, course:'exam',
    category:'相当算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00',
    mainCategory:'ratio', unit:'相当算・倍数算', pattern:'残りから全体を求める',
    difficulty:3, answerType:'number',
    title:'使った後の残りから元の金額を求める',
    question:`所持金の 2/5 を使ったら、残りが1800円になりました。\n\n最初の所持金はいくらですか。`,
    answer:3000, answerUnit:'円',
    hint:`使ったのが 2/5 なら、残りは（1 − 2/5）＝ 3/5 だよ。\n3/5 が1800円にあたるから全体を求めよう。`,
    tags:['割合・比','相当算','残りの割合'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'残りの割合を求める',
        text:`使った割合：2/5\n残りの割合：1 − 2/5 ＝ 3/5\nこの 3/5 が1800円にあたります。`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">全体</span><div class="vis-tape" style="width:40%;background:#999">使った 2/5</div><div class="vis-tape" style="width:60%;background:#FB8C00;margin-left:2px">残り 3/5＝1800円</div></div>` },
      { title:'1/5（1つ分）の金額を求める',
        text:`3/5 ＝ 1800円\n1/5（1つ分） ＝ 1800 ÷ 3 ＝ 600円`,
        visual:`<div class="vis-formula">1800 ÷ 3 ＝ 600円（1/5）</div>` },
      { title:'全体（5/5）を求める（答え）',
        text:`全体 ＝ 600 × 5 ＝ 3000円`,
        visual:`<div class="vis-formula">600 × 5 ＝ <b>3000円</b></div>` },
    ]
  },

  { id:'g6_ratio_equivalent_004', grade:6, course:'exam',
    category:'相当算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00',
    mainCategory:'ratio', unit:'相当算・倍数算', pattern:'年齢算（何年後に何倍）',
    difficulty:3, answerType:'number',
    title:'父の年齢が息子の2倍になる年',
    question:`現在、父は40歳、息子は10歳です。\n\n父の年齢が息子の年齢のちょうど2倍になるのは\n何年後ですか。`,
    answer:20, answerUnit:'年後',
    hint:`□年後の父：40＋□　息子：10＋□\n「父が息子の2倍」という式を立てよう。\n40＋□ ＝ 2×(10＋□)`,
    tags:['割合・比','倍数算','年齢算'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'□年後の年齢を式にする',
        text:`□年後の父の年齢：40＋□\n□年後の息子の年齢：10＋□\n\n父が息子の2倍なので\n40＋□ ＝ 2 × (10＋□)`,
        visual:`<div class="vis-formula">40＋□ ＝ 2×(10＋□)</div>` },
      { title:'式を展開して□を求める',
        text:`40＋□ ＝ 20＋2□\n40－20 ＝ 2□－□\n20 ＝ □`,
        visual:`<div class="vis-formula">40 − 20 ＝ 2□ − □ → □ ＝ <b>20</b></div>` },
      { title:'答えを確かめる',
        text:`20年後：父 40＋20＝60歳、息子 10＋20＝30歳\n60 ÷ 30 ＝ 2倍 ✓`,
        visual:`<div class="vis-formula">60歳 ÷ 30歳 ＝ 2倍 ✓</div>` },
    ]
  },

  { id:'g6_ratio_equivalent_005', grade:6, course:'exam',
    category:'相当算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00',
    mainCategory:'ratio', unit:'相当算・倍数算', pattern:'2回使った相当算',
    difficulty:4, answerType:'number',
    title:'2段階で使った後の所持金から逆算',
    question:`所持金から600円を使い、\n残りのお金の 1/4 をさらに使ったら750円残りました。\n\n最初の所持金はいくらですか。`,
    answer:1600, answerUnit:'円',
    hint:`「残りの1/4を使った」ということは「残りの3/4が750円」だよ。\n後ろから順番に逆算していこう。`,
    tags:['割合・比','相当算','逆算','2段階'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'「残りの3/4が750円」から逆算する',
        text:`残りの1/4を使った → 残りの3/4が750円\n600円を使った後の残り（A）は\nA × 3/4 ＝ 750\nA ＝ 750 ÷ 3/4 ＝ 750 × 4/3 ＝ 1000円`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:25%;background:#999">1/4使う</div><div class="vis-tape" style="width:75%;background:#FB8C00;margin-left:2px">3/4 ＝ 750円</div></div><div class="vis-formula" style="margin-top:6px">750 ÷ 3 × 4 ＝ 1000円（A）</div>` },
      { title:'最初の所持金を求める（答え）',
        text:`600円使った後が1000円なので\n最初の所持金 ＝ 1000＋600 ＝ 1600円`,
        visual:`<div class="vis-formula">1000 ＋ 600 ＝ <b>1600円</b></div>` },
      { title:'答えを確かめる',
        text:`1600 − 600 ＝ 1000円\n1000 × 1/4 ＝ 250円を使う\n残り：1000 − 250 ＝ 750円 ✓`,
        visual:`<div class="vis-formula">1600 → −600 → 1000 → −250 → 750円 ✓</div>` },
    ]
  },

  /* ════════════════════════════════════════
     仕事算・ニュートン算（5問）
  ════════════════════════════════════════ */

  { id:'g6_ratio_work_001', grade:6, course:'exam',
    category:'仕事算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A',
    mainCategory:'ratio', unit:'仕事算・ニュートン算', pattern:'仕事算の基本（全体を1）',
    difficulty:2, answerType:'number',
    title:'2人で一緒にやると何日で終わる',
    question:`ある仕事をAだけでやると6日、\nBだけでやると3日かかります。\n\n2人で一緒にやると何日で終わりますか。`,
    answer:2, answerUnit:'日',
    hint:`全体の仕事量を「1」として\n1日にできる量をそれぞれ分数で表そう。\nA の1日分：1/6　B の1日分：1/3`,
    tags:['割合・比','仕事算','全体を1'],
    visualTypes:['workBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'全体の仕事を「1」として考える',
        text:`仕事算のコツは全体を「1」にすること。\n1日でできる仕事量を分数で表します。\n\nA：6日で全体 → 1日で 1/6\nB：3日で全体 → 1日で 1/3`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A（1日）</span><div class="vis-tape" style="width:16%;background:#546E7A">1/6</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">B（1日）</span><div class="vis-tape" style="width:33%;background:#78909C">1/3</div></div>` },
      { title:'2人の1日の合計を求める',
        text:`1日の合計 ＝ 1/6 ＋ 1/3\n　　　　　 ＝ 1/6 ＋ 2/6\n　　　　　 ＝ 3/6 ＝ 1/2`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">6</span></div><span>＋</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">3</span></div><span>＝</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">2</span></div></div>` },
      { title:'かかる日数を求める（答え）',
        text:`1日で 1/2 ずつ進むので\n全体(1) ÷ 1/2 ＝ 2日`,
        visual:`<div class="vis-formula">1 ÷ (1/2) ＝ <b>2日</b></div>` },
    ]
  },

  { id:'g6_ratio_work_002', grade:6, course:'exam',
    category:'仕事算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A',
    mainCategory:'ratio', unit:'仕事算・ニュートン算', pattern:'一方の日数を求める',
    difficulty:3, answerType:'number',
    title:'Bだけでやると何日かかるか',
    question:`ある仕事をAとBで一緒にやると6日かかります。\nAだけでやると10日かかります。\n\nBだけでやると何日かかりますか。`,
    answer:15, answerUnit:'日',
    hint:`AとBの1日の合計 ＝ 1/6\nAの1日 ＝ 1/10\nBの1日 ＝ 合計 − Aで求められるよ。`,
    tags:['割合・比','仕事算','引き算で求める'],
    visualTypes:['workBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'1日の仕事量を式で表す',
        text:`A＋B の1日の仕事量 ＝ 1/6\nA の1日の仕事量    ＝ 1/10`,
        visual:`<div class="vis-tape-row"><span class="vis-tape-lbl">A＋B</span><div class="vis-tape" style="width:50%;background:#546E7A">1/6（6日で完成）</div></div><div class="vis-tape-row" style="margin-top:6px"><span class="vis-tape-lbl">A</span><div class="vis-tape" style="width:30%;background:#78909C">1/10（10日で完成）</div></div>` },
      { title:'Bの1日の仕事量を求める',
        text:`Bの1日 ＝ (A＋B) − A\n　　　  ＝ 1/6 − 1/10\n　　　  ＝ 5/30 − 3/30\n　　　  ＝ 2/30 ＝ 1/15`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">6</span></div><span>−</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">10</span></div><span>＝</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">15</span></div></div>` },
      { title:'Bだけでかかる日数（答え）',
        text:`Bは1日で 1/15 できるので\n全体(1) ÷ 1/15 ＝ 15日`,
        visual:`<div class="vis-formula">1 ÷ (1/15) ＝ <b>15日</b></div>` },
    ]
  },

  { id:'g6_ratio_work_003', grade:6, course:'exam',
    category:'ニュートン算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A',
    mainCategory:'ratio', unit:'仕事算・ニュートン算', pattern:'ニュートン算（窓口）',
    difficulty:3, answerType:'number',
    title:'窓口の処理速度を求める（ニュートン算）',
    question:`100人の行列があり、毎分10人ずつ新たに並びます。\n窓口が1つのとき20分で行列がなくなり、\n2つのとき8分でなくなります。\n\n窓口1つが1分間に処理できる人数は何人ですか。`,
    answer:30, answerUnit:'人',
    hint:`「最初の行列数＋増えた人数 ＝ 処理した人数」\n2つの場合でそれぞれ式を立てて\n引き算して窓口の速さを求めよう。`,
    tags:['割合・比','ニュートン算','窓口'],
    visualTypes:['lineDiagram'],
    isRandomGenerated:false,
    explanation:[
      { title:'2つの式を立てる',
        text:`窓口1つの処理速度をx人/分、最初の行列をQ人とします。\n\n窓口1つで20分：Q ＋ 20×10 ＝ x×20\n窓口2つで 8分：Q ＋ 8×10  ＝ 2x×8`,
        visual:`<div class="vis-formula">Q＋200 ＝ 20x　①<br>Q＋80 ＝ 16x　②</div>` },
      { title:'①－②で Qを消去する',
        text:`① − ②：\n(Q＋200) − (Q＋80) ＝ 20x − 16x\n120 ＝ 4x\nx ＝ 30`,
        visual:`<div class="vis-formula">120 ÷ 4 ＝ <b>30人/分</b></div>` },
      { title:'答えを確かめる',
        text:`Q ＝ 20×30 − 200 ＝ 400人（最初の行列）\n1窓口20分：400＋200 ＝ 600 ＝ 30×20 ✓\n2窓口 8分：400＋80  ＝ 480 ＝ 60×8  ✓`,
        visual:`<div class="vis-formula">最初の行列 400人 ✓</div>` },
    ]
  },

  { id:'g6_ratio_work_004', grade:6, course:'exam',
    category:'ニュートン算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A',
    mainCategory:'ratio', unit:'仕事算・ニュートン算', pattern:'ニュートン算（牧場）',
    difficulty:4, answerType:'number',
    title:'牧場の草がなくならない牛の頭数',
    question:`牧場に草があり、毎日一定量の草が生えます。\n30頭の牛が食べると24日で草がなくなります。\n20頭の牛が食べると48日で草がなくなります。\n\n何頭以下だと草が永遠になくなりませんか。`,
    answer:10, answerUnit:'頭',
    hint:`最初の草の量と毎日生える量を求めよう。\n「毎日生える量だけ食べる頭数」が答えだよ。`,
    tags:['割合・比','ニュートン算','牧場'],
    visualTypes:['workBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'2つの式を立てる',
        text:`1頭が1日に食べる量を1、最初の草をS、\n毎日生える量をrとします。\n\n30頭24日：S ＋ 24r ＝ 30×24 ＝ 720\n20頭48日：S ＋ 48r ＝ 20×48 ＝ 960`,
        visual:`<div class="vis-formula">S＋24r ＝ 720　①<br>S＋48r ＝ 960　②</div>` },
      { title:'②－①でrを求める',
        text:`②－①：\n24r ＝ 240\nr ＝ 10（毎日10単位の草が生える）\nS ＝ 720 − 24×10 ＝ 480（最初の草）`,
        visual:`<div class="vis-formula">r ＝ 10、S ＝ 480</div>` },
      { title:'永遠になくならない条件（答え）',
        text:`毎日生える量（r＝10）と\n牛が食べる量が同じか少なければ草はなくなりません。\n\n食べる量 ＝ 頭数 × 1 ≦ 10\n∴ 10頭以下なら草は永遠になくならない`,
        visual:`<div class="vis-formula">毎日生える量10 ÷ 1頭分 ＝ <b>10頭</b></div>` },
    ]
  },

  { id:'g6_ratio_work_005', grade:6, course:'exam',
    category:'仕事算', catColor:'#37474F', catBg:'#ECEFF1', borderColor:'#546E7A',
    mainCategory:'ratio', unit:'仕事算・ニュートン算', pattern:'3人の仕事算',
    difficulty:5, answerType:'number',
    title:'3人の仕事算（Aだけの日数を求める）',
    question:`A・B・C の3人で仕事をすると4日で終わります。\nAとBの2人だと6日、\nBとCの2人だと8日で終わります。\n\nAだけでやると何日かかりますか。`,
    answer:8, answerUnit:'日',
    hint:`まず A＋B＋C、A＋B、B＋C の1日量を分数で表そう。\nCの1日量 ＝ (A＋B＋C) − (A＋B)\nBの1日量 ＝ (B＋C) − C\nAの1日量 ＝ (A＋B) − B`,
    tags:['割合・比','仕事算','3人','難問'],
    visualTypes:['workBar'],
    isRandomGenerated:false,
    explanation:[
      { title:'3つの1日の仕事量を整理する',
        text:`A＋B＋C の1日 ＝ 1/4\nA＋B　  の1日 ＝ 1/6\nB＋C　  の1日 ＝ 1/8`,
        visual:`<div class="vis-formula">A＋B＋C ＝ 1/4、A＋B ＝ 1/6、B＋C ＝ 1/8</div>` },
      { title:'Cの1日量を求める',
        text:`C ＝ (A＋B＋C) − (A＋B)\n　 ＝ 1/4 − 1/6\n　 ＝ 3/12 − 2/12 ＝ 1/12`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">4</span></div><span>−</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">6</span></div><span>＝</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">12</span></div><span>（C）</span></div>` },
      { title:'Bの1日量を求める',
        text:`B ＝ (B＋C) − C\n　 ＝ 1/8 − 1/12\n　 ＝ 3/24 − 2/24 ＝ 1/24`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">8</span></div><span>−</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">12</span></div><span>＝</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">24</span></div><span>（B）</span></div>` },
      { title:'Aの日数を求める（答え）',
        text:`A ＝ (A＋B) − B\n　 ＝ 1/6 − 1/24\n　 ＝ 4/24 − 1/24 ＝ 3/24 ＝ 1/8\nAだけ：1 ÷ 1/8 ＝ 8日`,
        visual:`<div class="vis-formula">A ＝ 1/8 → 1 ÷ (1/8) ＝ <b>8日</b></div>` },
    ]
  },

  /* ════════════════════════════════════════
     食塩水 難問チャレンジ追加（★4〜★5）
  ════════════════════════════════════════ */

  { id:'g6_ratio_salt_006', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'食塩を加えて濃くする',
    difficulty:4, answerType:'number',
    title:'食塩を加えて濃度を上げる',
    question:`8%の食塩水200gに食塩を加えて、\n20%の食塩水を作りたいです。\n\n食塩を何g加えればよいですか。`,
    answer:30, answerUnit:'g',
    hint:`塩を加えると「塩の量」と「食塩水の重さ」が両方増えるよ。\n加える塩を□gとすると\n（もとの塩＋□）÷（食塩水全体＋□）＝ 0.20\nという式が立てられるね。`,
    tags:['割合・比','食塩水','食塩を加える','方程式'],
    visualTypes:['beaker','balance'],
    isRandomGenerated:false,
    explanation:[
      { title:'なぜこの問題が難しいのか',
        text:`水を加えるときは「食塩水の重さだけ」増えます。\nしかし塩を加えると「塩の量」と「食塩水の重さ」が\n同時に増えるため、式が複雑になります。`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.5)"></div></div><div class="vis-beaker-lbl">8%<br>200g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＋</span><div><div class="vis-beaker" style="width:50px;height:60px"><div class="vis-beaker-liq" style="height:80%;background:rgba(255,255,255,.9);border:1px solid #ccc"></div></div><div class="vis-beaker-lbl">塩□g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＝</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.8)"></div></div><div class="vis-beaker-lbl">20%<br>?g</div></div></div>` },
      { title:'もとの塩の量を求める',
        text:`8%の食塩水200gに含まれる塩：\n200 × 0.08 ＝ 16g`,
        visual:`<div class="vis-formula">もとの塩 ＝ 200 × 0.08 ＝ 16g</div>` },
      { title:'方程式を立てる',
        text:`加える塩を□gとすると\n・塩の合計：16 ＋ □\n・食塩水の合計：200 ＋ □\n\nこれが20%になるから\n(16 ＋ □) ÷ (200 ＋ □) ＝ 0.20\n両辺に(200 ＋ □)をかけると\n16 ＋ □ ＝ 0.20 × (200 ＋ □)\n16 ＋ □ ＝ 40 ＋ 0.20□`,
        visual:`<div class="vis-formula">16 ＋ □ ＝ 40 ＋ 0.20□</div>` },
      { title:'□を求める（答え）',
        text:`16 ＋ □ ＝ 40 ＋ 0.20□\n□ − 0.20□ ＝ 40 − 16\n0.80□ ＝ 24\n□ ＝ 24 ÷ 0.80 ＝ 30g`,
        visual:`<div class="vis-formula">24 ÷ 0.80 ＝ <b>30g</b></div>` },
      { title:'答えを確かめる',
        text:`塩：16 ＋ 30 ＝ 46g\n食塩水：200 ＋ 30 ＝ 230g\n濃度：46 ÷ 230 × 100 ＝ 20% ✓`,
        visual:`<div class="vis-formula">46 ÷ 230 × 100 ＝ 20% ✓</div>` },
    ]
  },

  { id:'g6_ratio_salt_007', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'2種類を混ぜて目標量を作る',
    difficulty:4, answerType:'number',
    title:'2種類の食塩水で目標濃度の食塩水を作る',
    question:`6%の食塩水と14%の食塩水を混ぜて、\n10%の食塩水を300g作りたいです。\n\n6%の食塩水は何g必要ですか。`,
    answer:150, answerUnit:'g',
    hint:`6%の食塩水をxg使うとすると\n14%の食塩水は（300−x）g。\n「塩の合計」で方程式を作ろう。`,
    tags:['割合・比','食塩水','混合','目標濃度'],
    visualTypes:['beaker','balance'],
    isRandomGenerated:false,
    explanation:[
      { title:'状況を整理する',
        text:`6%食塩水：x g 使う\n14%食塩水：(300 − x) g 使う\n混ぜた後：10%の食塩水 300g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.3)"></div></div><div class="vis-beaker-lbl">6%<br>x g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＋</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.7)"></div></div><div class="vis-beaker-lbl">14%<br>(300−x)g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＝</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.5)"></div></div><div class="vis-beaker-lbl">10%<br>300g</div></div></div>` },
      { title:'塩の合計で方程式を立てる',
        text:`塩の合計（左辺）＝ 混合後の塩（右辺）\n0.06x ＋ 0.14(300 − x) ＝ 0.10 × 300\n0.06x ＋ 42 − 0.14x ＝ 30`,
        visual:`<div class="vis-formula">0.06x ＋ 42 − 0.14x ＝ 30</div>` },
      { title:'xを求める（答え）',
        text:`0.06x − 0.14x ＝ 30 − 42\n−0.08x ＝ −12\nx ＝ 150g`,
        visual:`<div class="vis-formula">x ＝ 12 ÷ 0.08 ＝ <b>150g</b></div>` },
      { title:'答えを確かめる',
        text:`6%食塩水150g → 塩：9g\n14%食塩水150g → 塩：21g\n合計：塩30g、食塩水300g\n濃度：30÷300×100 ＝ 10% ✓`,
        visual:`<div class="vis-formula">9 ＋ 21 ＝ 30g → 30÷300×100 ＝ 10% ✓</div>` },
    ]
  },

  { id:'g6_ratio_salt_008', grade:6, course:'exam',
    category:'食塩水', catColor:'#0277BD', catBg:'#E1F5FE', borderColor:'#039BE5',
    mainCategory:'ratio', unit:'食塩水', pattern:'取り出して別の食塩水に加える',
    difficulty:5, answerType:'number',
    title:'一方から取り出して他方に加える',
    question:`10%の食塩水200gと、4%の食塩水300gがあります。\n10%の食塩水から何gか取り出し、\nそれを4%の食塩水に加えたところ6%になりました。\n\n取り出した食塩水は何gですか。`,
    answer:150, answerUnit:'g',
    hint:`取り出した量をxgとしよう。\n4%食塩水300gにxgを加えた後の\n塩の量と全体の量を式にしよう。`,
    tags:['割合・比','食塩水','取り出し','混合','方程式'],
    visualTypes:['beaker','balance'],
    isRandomGenerated:false,
    explanation:[
      { title:'取り出した食塩水の塩の量を表す',
        text:`取り出すのは10%の食塩水なので\n取り出したxgの中の塩：x × 0.10 ＝ 0.10x g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.65)"></div></div><div class="vis-beaker-lbl">10%・200g<br>→ x g取り出す</div></div></div><div class="vis-formula" style="margin-top:8px">取り出した塩 ＝ 0.10x g</div>` },
      { title:'4%食塩水にxgを加えた後を計算する',
        text:`4%食塩水300g の塩：300 × 0.04 ＝ 12g\n加えた後の塩：12 ＋ 0.10x\n加えた後の全体：300 ＋ x`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.25)"></div></div><div class="vis-beaker-lbl">4%・300g<br>塩12g</div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">＋</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:65%;background:rgba(3,169,244,.65)"></div></div><div class="vis-beaker-lbl">10%・xg<br>塩0.10xg</div></div></div>` },
      { title:'6%になる方程式を立てて解く',
        text:`(12 ＋ 0.10x) ÷ (300 ＋ x) ＝ 0.06\n12 ＋ 0.10x ＝ 0.06(300 ＋ x)\n12 ＋ 0.10x ＝ 18 ＋ 0.06x\n0.04x ＝ 6\nx ＝ 150g`,
        visual:`<div class="vis-formula">0.04x ＝ 6 → x ＝ <b>150g</b></div>` },
      { title:'答えを確かめる',
        text:`塩：12 ＋ 0.10×150 ＝ 12 ＋ 15 ＝ 27g\n全体：300 ＋ 150 ＝ 450g\n濃度：27 ÷ 450 × 100 ＝ 6% ✓`,
        visual:`<div class="vis-formula">27 ÷ 450 × 100 ＝ 6% ✓</div>` },
    ]
  },

];