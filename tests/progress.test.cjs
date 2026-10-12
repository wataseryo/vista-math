const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function harness(){
 const elements=new Map();
 const element=id=>{if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},focus(){},addEventListener(){}});return elements.get(id)};
 const memory={};
 const ctx=vm.createContext({Date,Math:Object.create(Math),Set,document:{getElementById:element,querySelector:()=>element('query'),querySelectorAll:()=>[],addEventListener(){}},lsGet:(key,fallback)=>memory[key]??fallback,lsSet:(key,value)=>memory[key]=String(value),recordAttemptTimestamp(id){const times=JSON.parse(memory.vista_attempt_ts||'{}');times[id]=Date.now();memory.vista_attempt_ts=JSON.stringify(times)},setTimeout(){}});
 const files=['data/categories.js',...fs.readdirSync(path.join(root,'data/problems')).filter(f=>f.endsWith('.js')).map(f=>'data/problems/'+f),'data/problems.js','js/catalog.js','js/app.js'];
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
 const run=source=>vm.runInContext(source,ctx);
 run('addStar=()=>{};showAccuracyCard=()=>{};appState.grade=6');
 return {element,memory,run,count:key=>JSON.parse(memory.vista_stats)[key].total};
}
test('practice grading counts once until explicit retry, wrong grade rejects',()=>{
 const h=harness();
 h.run("pracState.currentCatId='pc-ratio';pracState.currentProbId=PRACTICE_PROBLEMS.find(p=>p.grade===6&&p.catId==='pc-ratio').id");
 h.element('prac-ans-input').value='40';h.run('pracCheckAnswer();pracCheckAnswer()');assert.equal(h.count('g6_exam_pc-ratio'),1);
 h.run('pracRetry()');h.element('prac-ans-input').value='40';h.run('pracCheckAnswer()');assert.equal(h.count('g6_exam_pc-ratio'),2);
 h.run('appState.grade=5;pracState.answered=false;pracCheckAnswer()');assert.equal(h.count('g6_exam_pc-ratio'),2);
});
test('water, salt and challenge repeated grading each counts once',()=>{
 const h=harness();h.run("quiz.problem={answer:10,exp:'x',unit:'L'};quiz.answered=false");h.element('ans-input').value='10';h.run('checkAnswer();checkAnswer()');assert.equal(h.count('g6_std_watertank'),1);
 h.element('salt-quiz-input').value='20';h.run('checkSaltConfirm();checkSaltConfirm()');assert.equal(h.count('g6_exam_salt_topic'),1);
 h.run("chState.currentId='c1';chState.answered=false");h.element('ch-ans-input').value='8';h.run('chSubmitAnswer();chSubmitAnswer()');assert.equal(h.count('g6_ch_水槽'),1);
});
test('standard grading prevents repeats and ignores exam-course problem',()=>{
 const h=harness();h.run("PRACTICE_PROBLEMS.push({id:'fixture_std',grade:6,course:'std',chapterId:'watertank',answer:10});stdPracState.currentCatId='watertank';stdPracState.currentProbId='fixture_std'");h.element('std-prac-ans-input').value='10';h.run('stdPracCheckAnswer();stdPracCheckAnswer()');assert.equal(h.count('g6_std_watertank'),1);
 h.run("stdPracRetry();stdPracState.currentProbId=PRACTICE_PROBLEMS.find(p=>p.course==='exam').id;stdPracCheckAnswer()");assert.equal(h.count('g6_std_watertank'),1);
});
test('selected exam history excludes another grade, standard, challenges and deleted IDs',()=>{
 const h=harness();h.run("PRACTICE_PROBLEMS.push({id:'fixture_std',grade:6,course:'std'})");
 const id6=h.run("PRACTICE_PROBLEMS.find(p=>p.grade===6&&p.course==='exam').id"),id5=h.run("PRACTICE_PROBLEMS.find(p=>p.grade===5&&p.course==='exam').id");
 h.memory.vista_history=JSON.stringify({[id6]:[true],[id5]:[false],fixture_std:[false],c1:[true],deleted:[true]});
 assert.deepEqual(Array.from(h.run('Object.keys(selectedExamHistory(6))')),[id6]);
});
test('challenge-only report explicitly shows challenge records without claiming exercise attempts',()=>{
 const h=harness();h.memory.vista_stats=JSON.stringify({'g6_ch_水槽':{correct:4,total:5},'g5_ch_水槽':{correct:30,total:40}});h.memory.vista_history=JSON.stringify({c1:[true,true,true,true,false]});h.run('renderReport()');
 const html=h.element('rpt-body').innerHTML;assert.match(html,/5回解答・4回正解/);assert.match(html,/80%/);assert.match(html,/演習の解答回数/);assert.doesNotMatch(html,/40回解答/);assert.match(html,/受験コース/);
});
test('recent wrong ordering follows attempt timestamps; dots cap display but retain history',()=>{
 const h=harness();h.memory.vista_attempt_ts=JSON.stringify({old:100,new:200});assert.deepEqual(Array.from(h.run("sortRecentProblems([{id:'old'},{id:'new'},{id:'legacy'}]).map(p=>p.id)")),['new','old','legacy']);
 h.memory.vista_history=JSON.stringify({old:Array(25).fill(false)});assert.equal((h.run("getAttemptDots('old')").match(/att-dot /g)||[]).length,10);assert.equal(JSON.parse(h.memory.vista_history).old.length,25);
});
test('topic trial excludes incorrect grade and standard course',()=>{
 const h=harness();h.run("PRACTICE_PROBLEMS.unshift({id:'wronggrade',grade:5,course:'exam',topicUnitId:'u6-ratio',difficulty:1},{id:'wrongcourse',grade:6,course:'std',topicUnitId:'u6-ratio',difficulty:1});renderTrialQuestion=()=>{};initTopicTrial('u6-ratio')");assert.equal(h.run("trialState['u6-ratio'].problems.every(p=>p.grade===6&&p.course==='exam')"),true);
});

test('empty challenge selection provides explanation and a way back',()=>{
 const h=harness();h.run("appState.grade=5;chState.mainCategory='calculation';renderChallengeList()");
 assert.match(h.element('ch-cards-container').innerHTML,/準備中/);assert.match(h.element('ch-cards-container').innerHTML,/goBackFromChallenges/);
});

test('3000 seeded water problems use exact integer times and truthful division explanations',()=>{
 const h=harness();
 h.run("Math.random=(()=>{let seed=20261012;return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}})()");
 let full=0,empty=0;
 for(let i=0;i<3000;i++){
  const p=h.run('generators[3]()');
  const net=p.inflow-p.outflow;
  assert(Number.isInteger(p.answer)&&p.answer>0);
  const division=p.exp.match(/(\d+)÷(\d+)=(\d+)分/);
  assert(division,'explanation must contain its exact division');
  assert.equal(Number(division[1])/Number(division[2]),p.answer);
  assert.equal(Number(division[3]),p.answer);
  if(net>0){
   full++;const capacity=Number(p.text.match(/容量 (\d+)L/)[1]);
   assert.equal(p.initial+net*p.answer,capacity);
   assert.equal(Number(division[1]),capacity-p.initial);
  }else{
   empty++;assert.equal(p.initial+net*p.answer,0);
   assert.equal(Number(division[1]),p.initial);
  }
  assert.equal(Number(division[2]),Math.abs(net));
 }
 assert(full>1000&&empty>1000,'both filling and draining branches are exercised');
});
