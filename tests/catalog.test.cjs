const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const vm=require('node:vm');
const {validate}=require('../scripts/validate-content.cjs');
const root=path.resolve(__dirname,'..');
function fixture(t) {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'vista-catalog-'));
 fs.cpSync(path.join(root,'data'),path.join(dir,'data'),{recursive:true});
 fs.copyFileSync(path.join(root,'index.html'),path.join(dir,'index.html'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));return dir;
}
function edit(dir,file,fn){const p=path.join(dir,file);fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));}
test('all current 202 problems pass structural validation',()=>{const r=validate(root);assert.equal(r.count,202);assert.deepEqual(r.errors,[]);});
test('missing script is rejected with file diagnostics',t=>{const d=fixture(t);edit(d,'index.html',s=>s.replace('<script src="data/problems/practice-g6-plane.js"></script>',''));assert(validate(d).errors.some(e=>e.includes('practice-g6-plane.js')&&e.includes('script loading')));});
test('unaggregated source is rejected',t=>{const d=fixture(t);edit(d,'data/problems.js',s=>s.replace('...PRACTICE_G6_PLANE,',''));assert(validate(d).errors.some(e=>e.includes('practice-g6-plane.js')&&e.includes('aggregation')));});
for(const [name,from,to,reason] of [
 ['duplicate ID',"id: 'g6_ratio_basic_extra_002'","id: 'g6_ratio_basic_extra_001'",'duplicate ID'],
 ['invalid grade','catId: \'pc-ratio\', grade: 6','catId: \'pc-ratio\', grade: 4','invalid grade'],
 ['invalid answer','answer: 40,','answer: NaN,','finite number'],
 ['unknown category',"catId: 'pc-ratio'","catId: 'missing'",'unknown catId'],
 ['unknown unit',"topicUnitId: 'u6-ratio'","topicUnitId: 'missing'",'unknown topicUnitId'],
 ['missing solution','solution: `【割合の公式】','solution: null, legacySolution: `【割合の公式】','missing solution']]) {
 test(`${name} fixture fails`,t=>{const d=fixture(t);edit(d,'data/problems/practice-g6-ratio.js',s=>s.replace(from,to));assert(validate(d).errors.some(e=>e.includes(reason)));});
}
test('catalog uses actual data and explicit salt topic',()=>{
 const ctx=vm.createContext({});
 const files=['data/categories.js',...fs.readdirSync(path.join(root,'data/problems')).filter(f=>f.endsWith('.js')).map(f=>'data/problems/'+f),'data/problems.js','js/catalog.js'];
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 assert.equal(vm.runInContext("VistaCatalog.problemTopic({grade:6,course:'exam',catId:'pc-ratio',topicUnitId:'u6-salt'},6)",ctx),'salt');
 assert.equal(vm.runInContext("VistaCatalog.standardTopic(6,'watertank')",ctx),'watertank');
 assert.equal(vm.runInContext("VistaCatalog.standardTopic(6,'speed-g6')",ctx),null);
 assert.equal(vm.runInContext("VistaCatalog.unitCount(6,'u6-ratio')",ctx),vm.runInContext("CHALLENGES.filter(p=>p.grade===6&&EXAM_UNITS_G6.find(u=>u.id==='u6-ratio').categories.includes(p.categoryLabel)).length",ctx));
 assert.equal(vm.runInContext("VistaCatalog.practice(6,'std').length",ctx),0);
});
