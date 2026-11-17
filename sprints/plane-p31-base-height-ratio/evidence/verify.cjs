// Reproducible source-level checks; not a substitute for a real browser.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../../..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const head = f => execFileSync('git', ['show', `HEAD:${f}`], { cwd:root, encoding:'utf8' });
const before = head('js/app.js'), after = read('js/app.js');
function entry(source, key) {
 const start = source.indexOf(`    '${key}':`);
 const tail = source.slice(start);
 const end = tail.slice(1).search(/\n    '[a-z-]+':/);
 return end < 0 ? tail : tail.slice(0, end + 1);
}
function func(source, name) {
 const start = source.indexOf(`function ${name}(`);
 assert(start >= 0, name);
 return source.slice(start, source.indexOf('\n}\n', start) + 3);
}
function plain(value) { return JSON.parse(JSON.stringify(value)); }
function snapshot(source) {
 const nodes = {}, queue = [];
 const node = id => nodes[id] ||= { textContent:'', steps:[], attributes:{}, classes:[], events:{}, disabled:false,
  toggleAttribute(k, flag) { if(flag) this.attributes[k]=''; else delete this.attributes[k]; },
  addEventListener(k, fn) { this.events[k]=fn; },
  classList: { add(k) { nodes[id].classes.push(k); }, remove(k) { nodes[id].classes=nodes[id].classes.filter(c=>c!==k); } } };
 const ctx = vm.createContext({ document:{ getElementById:node },
  createTopicSequence:()=>({ cancel:()=>{queue.length=0;}, after:(ms, fn)=>queue.push(fn) }),
  topicReducedMotion:()=>false, clearExpandSteps:el=>{el.steps=[];}, appendExpandStep:(el,text)=>el.steps.push(text) });
 const helper = source.includes('function simplifyRatio(') ? func(source,'simplifyRatio') : '';
 vm.runInContext(helper + '\n' + func(source,'wireHeightRatioVisual'), ctx);
 const factory = entry(source,'same-height-ratio').trim().replace(/^'same-height-ratio': /,'').replace(/,$/,'');
 const d = { baseBig:9, baseSmall:3, height:8, bigArea:36, smallArea:12 };
 const html = vm.runInContext(`(${factory})`,ctx)(d).html;
 const text = id => html.match(new RegExp(`id="${id}"[^>]*>([^<]*)<`))[1];
 node('pe-hr-status').textContent=text('pe-hr-status');
 ctx.wireHeightRatioVisual('pe-hr',d);
 node('pe-hr-play').events.click();
 while(queue.length) queue.shift()();
 const result = { html, desc:text('pe-hr-desc'), initialStatus:text('pe-hr-status'), steps:node('pe-hr-steps').steps.slice(), result:text('pe-hr-result') };
 node('pe-hr-reset').events.click();
 assert.equal(node('pe-hr-steps').steps.length,0);
 assert.equal(node('pe-hr-status').textContent,result.initialStatus);
 return result;
}
const original=snapshot(before), current=snapshot(after);
assert.deepEqual(current,original);
fs.writeFileSync(path.join(__dirname,'g6-plane-010-before.json'),JSON.stringify(original,null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'g6-plane-010-after.json'),JSON.stringify(current,null,2)+'\n');
console.log(`g6_plane_010 generated HTML: ${original.html.length} UTF-16 code units; exact equality PASS`);
console.log('g6_plane_010 desc, status, four steps, result and reset: exact equality PASS');
console.log(JSON.stringify(current,null,2));
for(const name of ['wireScaleVisual','wireScaleSlotVisual']) assert.equal(func(after,name),func(before,name));
assert.equal(entry(after,'triangle-base-scale'),entry(before,'triangle-base-scale'));
console.log('wireScaleVisual, wireScaleSlotVisual and triangle-base-scale: byte-for-byte unchanged PASS');
for(const file of ['js/navigation.js','scripts/validate-content.cjs','index.html','data/categories.js','data/practice-variant-groups.js','css/style.css']) assert.equal(read(file),head(file),file);
console.log('Six protected files: unchanged PASS');
const dataFile='data/problems/practice-g6-plane.js';
const loadData = source => plain(vm.runInNewContext(source+'\nPRACTICE_G6_PLANE'));
const prev=loadData(head(dataFile)), next=loadData(read(dataFile));
assert.deepEqual(next.slice(0,prev.length),prev);
assert.deepEqual(next.slice(prev.length).map(p=>p.id),['g6_plane_031','g6_plane_032']);
console.log(`All ${prev.length} existing entries in plane data: unchanged PASS; appended IDs/order PASS`);
const spec=read('specs/2026-11-17-plane-p31-base-height-ratio.md');
const blocks=Array.from(spec.matchAll(/```js\n([\s\S]*?)\n```/g),m=>m[1]);
for(const p of next.slice(prev.length)) {
 const source=blocks.find(b=>b.includes(`id: '${p.id}'`));
 const expected=plain(vm.runInNewContext('('+source+')'));
 const actual={...p};delete actual.diagram;delete expected.diagram;
 assert.deepEqual(actual,expected);
 console.log(`${p.id} all non-diagram fields: exact spec match PASS`);
}
for(const name of ['simplifyRatio','wireBaseHeightRatioVisual']) {
 const expected=blocks.find(b=>b.includes(`function ${name}(`));
 assert.equal(func(after,name).trim(),expected.slice(expected.indexOf(`function ${name}(`)).trim());
}
for(const name of ['same-height-ratio','base-height-ratio-product']) assert.equal(entry(after,name).trim(),blocks.find(b=>b.startsWith(`    '${name}':`)).trim());
console.log('New helper, new entry/wire and modified entry: exact specified code PASS');
const ctx=vm.createContext({});vm.runInContext(func(after,'simplifyRatio'),ctx);
assert.deepEqual(plain(ctx.simplifyRatio(9,3)),[3,1]);assert.deepEqual(plain(ctx.simplifyRatio(15,10)),[3,2]);
console.log('simplifyRatio(9,3)=[3,1], simplifyRatio(15,10)=[3,2] PASS');
function catalog(useHead) {
 const c=vm.createContext({});
 const files=['data/categories.js',...fs.readdirSync(path.join(root,'data/problems')).filter(f=>f.endsWith('.js')).map(f=>'data/problems/'+f),'data/problems.js'];
 for(const f of files) vm.runInContext(useHead?head(f):read(f),c);
 return plain(vm.runInContext('PRACTICE_PROBLEMS.concat(CHALLENGES)',c));
}
const oldCatalog=catalog(true), newCatalog=catalog(false);
assert.equal(oldCatalog.length,240);assert.equal(newCatalog.length,242);
assert.deepEqual(newCatalog.filter(p=>!['g6_plane_031','g6_plane_032'].includes(p.id)),oldCatalog);
console.log('All 240 existing practice/challenge objects across every data file: deep equality PASS');
const oldWire=func(before,'wireHeightRatioVisual');
const expectedWire=oldWire.replace('    const seqHr','    const [ratioBig, ratioSmall] = simplifyRatio(d.baseBig, d.baseSmall);\n    const seqHr').replaceAll('＝3:1。','＝${ratioBig}:${ratioSmall}。');
assert.equal(func(after,'wireHeightRatioVisual'),expectedWire);
console.log('wireHeightRatioVisual: only specified declaration/two string replacements PASS');
// Exercise real production driver callbacks with a small DOM stub, not a browser.
for(const reduced of [false,true]) {
 const nodes={},scheduled=[];
 const node=id=>nodes[id]||=( {textContent:id.endsWith('-a-area')?'？':'initial',attrs:{},classes:new Set(),steps:[],events:{},
  toggleAttribute(k,v){if(v)this.attrs[k]='';else delete this.attrs[k];},
  addEventListener(k,fn){this.events[k]=fn;},
  classList:{add(k){nodes[id].classes.add(k);},remove(k){nodes[id].classes.delete(k);}} });
 const c=vm.createContext({document:{getElementById:node},topicReducedMotion:()=>reduced,
  createTopicSequence:()=>({cancel:()=>{scheduled.length=0;},after:(ms,fn)=>scheduled.push({ms,fn})}),
  clearExpandSteps:el=>{el.steps=[];},appendExpandStep:(el,text)=>el.steps.push(text)});
 vm.runInContext(func(after,'wireBaseHeightRatioVisual'),c);
 c.wireBaseHeightRatioVisual('pe-br',next.find(p=>p.id==='g6_plane_031').expandVisualData);
 node('pe-br-play').events.click();
 if(!reduced) {
  assert.equal(node('pe-br-steps').steps.length,1);
  assert.deepEqual(scheduled.map(t=>t.ms),[800,1600,2500]);
  while(scheduled.length) scheduled.shift().fn();
 }
 assert.equal(node('pe-br-steps').steps.length,4);assert.equal(node('pe-br-a-area').textContent,'36cm²');
 assert(node('pe-br-result').classes.has('visible'));
 node('pe-br-reset').events.click();
 assert.equal(node('pe-br-a-area').textContent,'？');assert.equal(node('pe-br-steps').steps.length,0);
 for(const id of ['base-label','height-line','height-label']) assert('hidden' in node('pe-br-'+id).attrs);
 assert.equal(node('pe-br-play').disabled,false);assert.equal(scheduled.length,0);
 console.log(`P-31 driver DOM-stub execution: four stages/final/reset; reducedMotion=${reduced} PASS`);
}
