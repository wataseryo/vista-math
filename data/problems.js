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
  { id:'c1', grade:6, category:'水槽', catColor:'#0277BD', catBg:'#E3F2FD', borderColor:'#0288D1', title:'途中で条件が変わる水槽', mainCategory:'solid', tags:['水槽', '立体図形・水量', 'グラフ'], difficulty:3,
    text:`容量100Lの水槽に最初20Lの水があります。\n毎分3Lの水を入れ始めました。\n5分後に、さらに毎分2Lの管を追加しました。\n\n最初から何分後に水槽の水が50Lになるか求めなさい。`,
    answer:8, answerUnit:'分', hint:`「5分後」を境に前半・後半に分けて考えよう。\n前半（5分間）で水は何Lになる？\n後半は毎分何L増える？`,
    steps:[
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
  { id:'c2', grade:6, category:'水槽', catColor:'#0277BD', catBg:'#E3F2FD', borderColor:'#0288D1', title:'2つの管で満水にする', mainCategory:'solid', tags:['水槽', '立体図形・水量', 'グラフ'], difficulty:3,
    text:`空の水槽をA管だけで満水にすると30分、\nB管だけで満水にすると20分かかります。\n\nA管とB管を同時に使うと何分で満水になるか求めなさい。`,
    answer:12, answerUnit:'分', hint:`1分間にA管は全体の何分の1入れる？\n合わせた速さ＝A管＋B管`,
    steps:[
      { title:'1分間に入る量を分数で表す', text:`A管：30分で満水 → 1分で全体の 1/30\nB管：20分で満水 → 1分で全体の 1/20`,
        visual:`<div class="vis-fraction"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">30</span></div><span style="color:#666;padding:0 4px">と</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">20</span></div></div>` },
      { title:'2つ合わせた速さを通分', text:`1/30 ＋ 1/20 ＝ 2/60 ＋ 3/60 ＝ 5/60 ＝ 1/12`,
        visual:`<div class="vis-fraction" style="flex-wrap:wrap;gap:6px"><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">30</span></div><span>+</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">20</span></div><span>=</span><div class="vis-frac"><span class="vis-frac-n">5</span><span class="vis-frac-d">60</span></div><span>=</span><div class="vis-frac"><span class="vis-frac-n">1</span><span class="vis-frac-d">12</span></div></div>` },
      { title:'満水までの時間を求める', text:`1分で 1/12 ずつ入る\n全体(1) ÷ 1/12 ＝ 12分`,
        visual:`<div class="vis-formula">1 ÷ (1/12) ＝ 12分</div>` },
    ]
  },
  { id:'c3', grade:6, category:'速さ', catColor:'#2E7D32', catBg:'#E8F5E9', borderColor:'#43A047', title:'出会い算', mainCategory:'speed', tags:['速さ', '線分図'], difficulty:2,
    text:`A地点とB地点は2000m離れています。\n太郎くんはA地点から分速60mで、\n花子さんはB地点から分速40mで\n同時に向かい合って歩きます。\n\n何分後に2人は出会うか求めなさい。`,
    answer:20, answerUnit:'分', hint:`2人が1分間に縮める距離の合計は？\n合わせた速さ＝太郎の速さ＋花子の速さ`,
    steps:[
      { title:'状況を図にする', text:`2000mを2人が向き合って歩く\n→ 1分ごとに距離が縮まる`,
        visual:`<div class="vis-numline"><div class="vis-numline-bar"></div><div class="vis-numline-dot" style="background:#0288D1;left:8%"></div><div class="vis-numline-dot" style="background:#E64A19;left:92%"></div><div class="vis-numline-lbl" style="left:8%">太郎<br>60m/分→</div><div class="vis-numline-lbl" style="left:92%">←花子<br>40m/分</div><div style="position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:.7rem;color:#555;font-weight:bold">2000m</div></div>` },
      { title:'合わせた速さを求める', text:`1分間に縮まる距離\n＝60＋40＝100m/分`,
        visual:`<div class="vis-formula">合わせた速さ ＝ 60＋40 ＝ 100m/分</div>` },
      { title:'出会うまでの時間を求める', text:`2000 ÷ 100 ＝ 20分`,
        visual:`<div class="vis-formula">2000 ÷ 100 ＝ 20分</div>` },
    ]
  },
  { id:'c4', grade:6, category:'速さ', catColor:'#2E7D32', catBg:'#E8F5E9', borderColor:'#43A047', title:'追いかけ算', mainCategory:'speed', tags:['速さ', '線分図'], difficulty:3,
    text:`太郎は7時に家を出て、分速60mで学校へ向かう。\n母は7時10分に自転車で追いかけ、分速180mで走る。\n\n母が太郎に追いつくのは7時何分か求めなさい。`,
    answer:15, answerUnit:'分（7時）', hint:`お母さんが出発したとき、太郎くんは何m先？\n1分間に縮まる距離は？（差の速さ）`,
    steps:[
      { title:'お母さん出発時の差を求める', text:`太郎くんは10分先に出発\n10分間に：60×10＝600m 先にいる`,
        visual:`<div class="vis-numline"><div class="vis-numline-bar"></div><div class="vis-numline-dot" style="background:#E64A19;left:8%"></div><div class="vis-numline-dot" style="background:#0288D1;left:55%"></div><div class="vis-numline-lbl" style="left:8%">お母さん<br>（7:10）</div><div class="vis-numline-lbl" style="left:55%">太郎<br>600m先</div></div><div class="vis-formula">60×10 ＝ 600m</div>` },
      { title:'縮まる速さを求める', text:`1分間に縮まる距離（差の速さ）：\n180－60＝120m/分`,
        visual:`<div class="vis-formula">180－60 ＝ 120m/分（差の速さ）</div>` },
      { title:'追いつく時間を求める', text:`600m ÷ 120m/分 ＝ 5分\nお母さん出発（7:10）から5分後\n→ 7時15分`,
        visual:`<div class="vis-formula">600 ÷ 120 ＝ 5分後 → 7時15分</div>` },
    ]
  },
  { id:'c5', grade:6, category:'割合', catColor:'#6A1B9A', catBg:'#F3E5F5', borderColor:'#8E24AA', title:'食塩水の混合', mainCategory:'ratio', tags:['割合・比', '面積図'], difficulty:4,
    text:`10%の食塩水200gと\n5%の食塩水300gを混ぜました。\n\n混ぜた後の食塩水の濃度は何%か求めなさい。`,
    answer:7, answerUnit:'%', hint:`まず「塩の量(g)」を先に求めよう。\n塩の量 ＝ 食塩水の量 × 濃度（÷100）`,
    steps:[
      { title:'それぞれの塩の量を求める', text:`10%食塩水200g → 塩：200×0.1＝20g\n5%食塩水300g  → 塩：300×0.05＝15g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.45)"></div></div><div class="vis-beaker-lbl">10%<br>200g<br><b>塩20g</b></div></div><span style="font-size:1.5rem;color:#ccc;padding-bottom:20px">+</span><div><div class="vis-beaker"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.2)"></div></div><div class="vis-beaker-lbl">5%<br>300g<br><b>塩15g</b></div></div></div>` },
      { title:'混ぜた後の量を合計', text:`塩の合計：20＋15＝35g\n食塩水の合計：200＋300＝500g`,
        visual:`<div class="vis-beakers"><div><div class="vis-beaker" style="width:65px;height:80px"><div class="vis-beaker-liq" style="height:70%;background:rgba(3,169,244,.32)"></div></div><div class="vis-beaker-lbl">合計<br>500g<br><b>塩35g</b></div></div></div>` },
      { title:'濃度を計算する', text:`濃度＝塩の量÷食塩水の量×100\n＝35÷500×100＝7%`,
        visual:`<div class="vis-formula">35 ÷ 500 × 100 ＝ 7%</div>` },
    ]
  },
  { id:'c6', grade:5, category:'植木算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'道に木を植える（両端あり）', mainCategory:'special', tags:['特殊算・文章題', '植木算'], difficulty:2,
    text:`100mの道の両端に木を植えます。\n木と木の間隔を10mにするとき、\n木は全部で何本必要か求めなさい。`,
    answer:11, answerUnit:'本', hint:`まず「間隔の数」を求めよう。\n両端に植えるとき：木の本数 ＝ 間隔の数 ＋ 1`,
    steps:[
      { title:'間隔の数を求める', text:`道の長さ ÷ 間隔 ＝ 間隔の数\n100 ÷ 10 ＝ 10（個の間隔）`,
        visual:`<div class="vis-trees"><span style="font-size:1.2rem">🌲</span>${Array(10).fill(0).map(()=>'<span class="vis-tree-sp">10m</span><span style="font-size:1.2rem">🌲</span>').join('')}</div>` },
      { title:'木の本数を求める', text:`両端に植えるので\n木の本数 ＝ 間隔の数 ＋ 1 ＝ 10 ＋ 1 ＝ 11本`,
        visual:`<div class="vis-formula">間隔10個 → 木は11本</div>` },
    ]
  },
  { id:'c7', grade:5, category:'つるかめ算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'ツルとカメの足の数', mainCategory:'special', tags:['特殊算・文章題', 'つるかめ算'], difficulty:3,
    text:`ツルとカメが合わせて10匹います。\n足の本数の合計は28本でした。\n\nツルは何匹か求めなさい。`,
    answer:6, answerUnit:'匹', hint:`「全部ツルだったら足は何本？」から考えよう。\nカメ1匹に替えると足は何本増える？`,
    steps:[
      { title:'全部ツルと仮定する', text:`10匹すべてツルとすると\n足の合計：2×10＝20本\n実際は28本 → 28－20＝8本 多い`,
        visual:`<div class="vis-animals">${Array(10).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div>').join('')}</div><div class="vis-formula">2×10 ＝ 20本（実際より8本少ない）</div>` },
      { title:'ツル→カメに替えると', text:`ツル1匹をカメ1匹に替えると\n4－2＝2本 増える\n8本増やすには：8÷2＝4匹 カメにする`,
        visual:`<div style="display:flex;gap:10px;justify-content:center;align-items:center;padding:8px 0"><div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div><span style="font-size:1.2rem">→</span><div class="vis-animal"><div class="vis-animal-ico">🐢</div><div class="vis-animal-legs">4本</div></div><span style="font-size:.82rem;color:#E64A19;font-weight:bold">＋2本</span></div><div class="vis-formula">8 ÷ 2 ＝ 4匹がカメ</div>` },
      { title:'答えを求める（確認）', text:`カメ：4匹\nツル：10－4＝6匹\n確認：6×2＋4×4＝12＋16＝28本 ✓`,
        visual:`<div class="vis-animals">${Array(6).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🦢</div><div class="vis-animal-legs">2本</div></div>').join('')}${Array(4).fill(0).map(()=>'<div class="vis-animal"><div class="vis-animal-ico">🐢</div><div class="vis-animal-legs">4本</div></div>').join('')}</div><div class="vis-formula">答え：ツル 6匹</div>` },
    ]
  },
  { id:'c8', grade:5, category:'過不足算', catColor:'#AD1457', catBg:'#FCE4EC', borderColor:'#E91E63', title:'余りと不足（机と生徒）', mainCategory:'special', tags:['特殊算・文章題', '過不足算'], difficulty:4,
    text:`生徒を机に座らせます。\n1つの机に4人ずつ座ると8人余ります。\n1つの机に6人ずつ座ると2人足りません。\n\n生徒は何人か求めなさい。`,
    answer:28, answerUnit:'人', hint:`机の台数を□として2つの式を立てよう。\n4×□＋8 ＝ 6×□－2`,
    steps:[
      { title:'机の台数を□とおく', text:`机の台数を□台とすると：\n4人ずつ・余り8人 → 生徒数 ＝ 4×□＋8\n6人ずつ・2人不足 → 生徒数 ＝ 6×□－2`,
        visual:`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:6px 0"><div style="background:#E3F2FD;border:2px solid #0288D1;border-radius:8px;padding:6px 12px;font-size:.82rem;text-align:center">4人ずつ<br>→ 4□＋8</div><div style="background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:6px 12px;font-size:.82rem;text-align:center">6人ずつ<br>→ 6□－2</div></div>` },
      { title:'2つの式を等しくおいて解く', text:`4×□＋8 ＝ 6×□－2\n8＋2 ＝ 6×□－4×□\n10 ＝ 2×□\n□ ＝ 5（机は5台）`,
        visual:`<div class="vis-formula">4□＋8 ＝ 6□－2\n→ 2□ ＝ 10 → □ ＝ 5台</div>` },
      { title:'生徒数を求める（確認）', text:`□＝5を代入：4×5＋8＝20＋8＝28人\n確認：6×5－2＝30－2＝28人 ✓`,
        visual:`<div class="vis-formula">答え：机5台・生徒28人</div>` },
    ]
  },

  /* ── 和差算 ── */
  { id:'c9', grade:5, category:'和差算', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2', title:'シールの枚数（和差算 基本）', mainCategory:'special', tags:['特殊算・文章題', '和差算', '線分図'], difficulty:2,
    text:`太郎と花子が持っているシールの合計は80枚で、\n太郎は花子より12枚多く持っている。\n\n太郎は何枚持っているか求めなさい。`,
    answer:46, answerUnit:'枚',
    hint:`テープ図を書いてみよう。\n大きい方 ＝ （和 ＋ 差）÷ 2 で求められるよ！`,
    steps:[
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
  { id:'c10', grade:5, category:'和差算', catColor:'#1565C0', catBg:'#E3F2FD', borderColor:'#1976D2', title:'2チームの得点（和差算 応用）', mainCategory:'special', tags:['特殊算・文章題', '和差算', '線分図'], difficulty:2,
    text:`AチームとBチームの合計得点は96点で、\nAチームはBチームより14点多い。\n\nAチームの得点は何点か求めなさい。`,
    answer:55, answerUnit:'点',
    hint:`「大きい方＝（和＋差）÷2」の公式を使おう！\nAチームが大きい方だよ。`,
    steps:[
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
  { id:'c11', grade:5, category:'年齢算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'倍数での年齢算', mainCategory:'special', tags:['特殊算・文章題', '年齢算'], difficulty:3,
    text:`現在、父の年齢は子の年齢の5倍です。\n父と子の年齢の差は28歳です。\n\n父は現在何歳か。`,
    answer:35, answerUnit:'歳',
    hint:`「差は変わらない」がポイント！\n父 − 子 ＝ 28歳\n父 ＝ 5×子 だから…\n5×子 − 子 ＝ 4×子 ＝ 28歳`,
    steps:[
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
  { id:'c12', grade:5, category:'年齢算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'何年後に○倍になるか', mainCategory:'special', tags:['特殊算・文章題', '年齢算'], difficulty:3,
    text:`現在、母は37歳で、子は9歳です。\n\n何年後に母の年齢が子の年齢の3倍になるか求めなさい。`,
    answer:5, answerUnit:'年後',
    hint:`何年後かを□とおいて式を作ろう。\n(37＋□) ＝ 3×(9＋□) となるよ。`,
    steps:[
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
    text:`ある船が川を20km上るのに4時間、\n同じ20kmを下るのに2時間かかりました。\n\nこの船の静水時の速さを求めなさい。`,
    answer:7.5, answerUnit:'km/h',
    hint:`まず上りと下りの速さを別々に求めよう。\n静水時の速さ ＝ (上りの速さ ＋ 下りの速さ) ÷ 2`,
    steps:[
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
    text:`静水での速さが時速12kmの船があります。\n流速が時速3kmの川を上るのに2時間かかりました。\n\nこの区間の距離は何kmか求めなさい。`,
    answer:18, answerUnit:'km',
    hint:`上りの速さ ＝ 静水速 − 流速\n距離 ＝ 速さ × 時間`,
    steps:[
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
    text:`長さ150mの電車が時速90kmで走っています。\n長さ450mの橋を渡り始めてから\n渡り終わるまでの時間は何秒か求めなさい。`,
    answer:24, answerUnit:'秒',
    hint:`電車が「完全に橋を渡る」距離は？\n電車の長さ ＋ 橋の長さ を考えよう！`,
    steps:[
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
    text:`長さ200mの電車Aが秒速30mで、\n長さ100mの電車Bが秒速20mで\n同じ方向に走っています。\n\nAがBに追いついてから完全に追い越すまでの時間は何秒か求めなさい。`,
    answer:30, answerUnit:'秒',
    hint:`追い越す距離 ＝ A の長さ ＋ B の長さ\n差の速さ ＝ 速いA − 遅いB`,
    steps:[
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
    text:`入場ゲートの外に行列があります。\n毎分3人ずつ新たに並んできます。\n\nゲートを2つ開けると20分でなくなり、\n3つ開けると10分でなくなります。\n\n最初に並んでいた人は何人か求めなさい。`,
    answer:60, answerUnit:'人',
    hint:`式を2つ立てよう。\n最初の人数をN、1つのゲートが1分間に処理する人数をbとおく。\nN ＋ 増えた人数 ＝ 処理した人数`,
    steps:[
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
    text:`草が毎日一定量生える牧場があります。\n4頭の牛が食べると10日で草がなくなり、\n2頭だと30日でなくなります。\n\n6頭だと何日で草がなくなるか求めなさい。`,
    answer:6, answerUnit:'日',
    hint:`最初の草の量をS、1日に生える量をa、\n牛1頭が1日に食べる量をbとおこう。\nS ＋ 日数×a ＝ 頭数×b×日数`,
    steps:[
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
  { id:'c19', grade:6, category:'消去算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'りんごとみかん（消去算 基本）', mainCategory:'special', tags:['特殊算・文章題', '消去算'], difficulty:3,
    text:`りんご2個とみかん3個の合計は360円、\nりんご1個とみかん2個の合計は210円です。\n\nりんご1個の値段を求めなさい。`,
    answer:90, answerUnit:'円',
    hint:`2つの式の「みかん」を消そう！\n②×2でみかんの数を合わせてから引き算するよ。`,
    steps:[
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
  { id:'c20', grade:6, category:'消去算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'えんぴつとノート（消去算 応用）', mainCategory:'special', tags:['特殊算・文章題', '消去算'], difficulty:4,
    text:`えんぴつ3本とノート2冊の合計は460円、\nえんぴつ5本とノート3冊の合計は740円です。\n\nえんぴつ1本の値段を求めなさい。`,
    answer:100, answerUnit:'円',
    hint:`ノートを消すために①×3、②×2で\nノートの数を合わせてみよう！`,
    steps:[
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
  { id:'c21', grade:5, category:'植木算', catColor:'#E65100', catBg:'#FFF3E0', borderColor:'#FB8C00', title:'池の周りに木を植える', mainCategory:'special', tags:['特殊算・文章題', '植木算'], difficulty:2,
    text:`周囲が120mの池の周りに、\n10m間隔で木を植えます。\n\n木は全部で何本必要か求めなさい。`,
    answer:12, answerUnit:'本',
    hint:`「池の周り」は輪っか型！\n最後の木と最初の木の間も「間隔」になるよ。\n池の問題では 本数 ＝ 間隔の数 になるよ。`,
    steps:[
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
  { id:'c22', grade:5, category:'つるかめ算', catColor:'#00695C', catBg:'#E0F2F1', borderColor:'#00897B', title:'テストの点数（つるかめ算 応用）', mainCategory:'special', tags:['特殊算・文章題', 'つるかめ算'], difficulty:3,
    text:`30問のテストで、\n正解すると4点もらえ、\n間違えると1点引かれます。\n\n全問解いて90点でした。\n正解は何問か求めなさい。`,
    answer:24, answerUnit:'問',
    hint:`「全部正解だったら何点？」から考えよう。\n4×30 ＝ 120点のはず。\n実際より30点少ない…なぜ？\n1問間違えるたびに 4＋1＝5点 減るよ！`,
    steps:[
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
  { id:'c23', grade:5, category:'過不足算', catColor:'#AD1457', catBg:'#FCE4EC', borderColor:'#E91E63', title:'おかしを配る（過不足算）', mainCategory:'special', tags:['特殊算・文章題', '過不足算'], difficulty:3,
    text:`子どもたちにおかしを配ります。\n4個ずつ配ると6個余り、\n6個ずつ配ると10個足りません。\n\n子どもは何人か求めなさい。`,
    answer:8, answerUnit:'人',
    hint:`□を子どもの人数とすると2つの式が立てられるよ。\n4×□＋6 ＝ 6×□－10\nを解こう！`,
    steps:[
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
    text:`A地点からB地点まで行きは時速4km、\n帰りは時速6kmで歩きました。\n\n往復の平均の速さを求めなさい。`,
    answer:4.8, answerUnit:'km/h',
    hint:`距離を具体的な数で置いてみよう！\nAB間を12kmと仮定すると計算しやすいよ。\n平均の速さ ＝ 総距離 ÷ 総時間`,
    steps:[
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
    text:`長さ100mの電車Aが秒速15mで、\n長さ200mの電車Bが秒速10mで\n逆方向に走っています。\n\nすれ違い始めてから終わるまでの時間は何秒か求めなさい。`,
    answer:12, answerUnit:'秒',
    hint:`すれ違う距離 ＝ AとBの長さを合わせた距離\n逆方向なので合わせた速さ ＝ 速さの和！`,
    steps:[
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
    text:`10%の食塩水300gから\n水を蒸発させて15%にしたい。\n\n何gの水を蒸発させればよいか求めなさい。`,
    answer:100, answerUnit:'g',
    hint:`蒸発しても塩の量は変わらない！\nまず塩の量を求めて、\n15%になるときの食塩水の量を逆算しよう。`,
    steps:[
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
    text:`ある商品を450円で仕入れました。\n仕入れ値の20%の利益をのせて\n定価をつけました。\n\n定価を求めなさい。`,
    answer:540, answerUnit:'円',
    hint:`定価 ＝ 仕入れ値 × (1 ＋ 利益の割合)\n20%の利益 → 1.2倍！`,
    steps:[
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
    text:`定価800円の品物を定価の15%引きで売りました。\n仕入れ値は600円です。\n\n利益は何円か求めなさい。`,
    answer:80, answerUnit:'円',
    hint:`まず売値を求めよう。\n売値 ＝ 定価 × (1 − 割引率)\n次に 利益 ＝ 売値 − 仕入れ値`,
    steps:[
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
];
