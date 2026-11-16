const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function harness(){
 const elements=new Map();
 const element=id=>{if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},focus(){},addEventListener(){}});return elements.get(id);};
 const memory={};
 const ctx=vm.createContext({Date,Math,Set,document:{getElementById:element,querySelector:()=>element('query'),querySelectorAll:()=>[],addEventListener(){}},lsGet:(k,f)=>memory[k]??f,lsSet:(k,v)=>memory[k]=String(v),recordAttemptTimestamp(){},setTimeout(){}});
 ctx.window=ctx;
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const files=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]).filter(f=>f.startsWith('data/')||['js/catalog.js','js/app.js'].includes(f));
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
 const run=source=>vm.runInContext(source,ctx);
 run('addStar=()=>{};showAccuracyCard=()=>{};appState.grade=6;wirePlaneExpandVisual=()=>{}');
 return {element,memory,run,open(id){run(`pracOpenProb(${JSON.stringify(id)})`);const html=element('prac-detail-body').innerHTML;const nav=element('prac-variant-nav');nav.innerHTML=html.match(/<div id="prac-variant-nav" class="prac-variant-nav" style="display:none">([\s\S]*?)\n        <div id="prac-steps-card"/)[1].replace(/<\/div>\s*$/,'');nav.style.display='none';}};
}
test('variant lookup, numbering and generated nav cover member and nonmember problems',()=>{
 const h=harness();assert.equal(h.run("pracFindVariantGroupIndex('g6_plane_001')"),null);
 assert.equal(h.run("pracFindVariantGroupIndex('g6_plane_002_v01').idx"),1);
 assert.equal(h.run("pracProblemNumberInCat('g6_plane_002_v01')"),25);assert.equal(h.run("pracProblemNumberInCat('missing')"),null);
 h.open('g6_plane_002');assert.match(h.element('prac-detail-body').innerHTML, /prac-result-box[\s\S]*?prac-variant-nav[\s\S]*?問25/);assert.equal(h.element('prac-variant-nav').style.display,'none');
 h.run("window.pracOpenProb=id=>{window.opened=id};pracOpenNextVariant('g6_plane_002_v01')");assert.equal(h.run('window.opened'),'g6_plane_002_v01');
});
test('correct and wrong grading reveal same nav, guard prevents repeats and retry hides it',()=>{
 const h=harness();let text;
 for(const answer of [0,40]){
  h.open('g6_plane_002');h.element('prac-ans-input').value=String(answer);h.run('pracCheckAnswer();pracCheckAnswer()');
  assert.equal(h.element('prac-variant-nav').style.display,'block');
  if(text)assert.equal(h.element('prac-variant-nav').innerHTML,text);else text=h.element('prac-variant-nav').innerHTML;
  assert.equal(JSON.parse(h.memory.vista_history).g6_plane_002.length,answer===0?1:2);
  h.run('pracRetry()');assert.equal(h.element('prac-variant-nav').style.display,'none');assert.equal(h.element('prac-result-box').style.display,'none');
 }
});
test('last variant has no next button and unrelated problem nav remains empty and hidden',()=>{
 const h=harness();h.open('g6_plane_002_v02');h.element('prac-ans-input').value='44';h.run('pracCheckAnswer()');
 assert.equal(h.element('prac-variant-nav').style.display,'block');assert.match(h.element('prac-variant-nav').innerHTML,/このセットの最後/);assert.doesNotMatch(h.element('prac-variant-nav').innerHTML,/<button/);
 h.open('g6_plane_001');h.element('prac-ans-input').value='0';h.run('pracCheckAnswer()');assert.equal(h.element('prac-variant-nav').innerHTML,'');assert.equal(h.element('prac-variant-nav').style.display,'none');
});
test('new problem fields exactly match supplied spec except authored diagrams',()=>{
 const h=harness(),spec=fs.readFileSync(path.join(root,'specs/2026-11-16-practice-repetition-sprint1.md'),'utf8');
 for(const id of ['g6_plane_002_v01','g6_plane_002_v02']){
  const start=spec.indexOf(`{\n  id: '${id}'`),end=spec.indexOf('\n```',start);
  const source=spec.slice(start,end).replace('diagram: { /* Codexが実装。本章末の指示を参照 */ },','diagram: null,');
  const expected=JSON.parse(JSON.stringify(vm.runInNewContext('('+source+')'))),actual=JSON.parse(h.run(`JSON.stringify(PRACTICE_PROBLEMS.find(p=>p.id==='${id}'))`));delete expected.diagram;delete actual.diagram;assert.deepEqual(actual,expected);
 }
});
