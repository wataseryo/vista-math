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
test('all current 230 problems pass structural validation',()=>{const r=validate(root);assert.equal(r.count,230);assert.deepEqual(r.errors,[]);});
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

for (const [name, from, to, reason] of [
 ['unknown member', "'g6_plane_002_v02'", "'missing'", 'unknown problemId'],
 ['category mismatch', "catId: 'pc-plane'", "catId: 'pc-ratio'", 'catId mismatch'],
 ['grade mismatch', 'grade: 6', 'grade: 5', 'grade mismatch'],
 ['course mismatch', "course: 'exam'", "course: 'std', chapterId: 'watertank'", 'course mismatch'],
 ['duplicate member', "'g6_plane_002_v02'", "'g6_plane_002_v01'", 'duplicate problemId in group'],
 ['malformed types', "['P-06']", "['wrong']", 'invalid curriculumTypeIds'],
 ['malformed members', "['g6_plane_002', 'g6_plane_002_v01', 'g6_plane_002_v02']", 'null', 'at least 2 entries'],
 ['short group', "['g6_plane_002', 'g6_plane_002_v01', 'g6_plane_002_v02']", "['g6_plane_002']", 'at least 2 entries'],
 ['missing title', "title: '底辺と高さから三角形の面積を求める'", "title: ''", 'missing title'],
 ['invalid grade', 'grade: 6', 'grade: 4', 'invalid grade'],
 ['invalid course', "course: 'exam'", "course: 'other'", 'invalid course'],
 ['unknown category', "catId: 'pc-plane'", "catId: 'missing'", 'unknown catId'],
 ['unknown chapter', "course: 'exam'", "course: 'std', chapterId: 'missing'", 'unknown chapterId'],
]) {
 test(`variant ${name} fixture fails`, t => { const d=fixture(t); edit(d,'data/practice-variant-groups.js',s=>s.replace(from,to)); assert(validate(d).errors.some(e=>e.includes('data/practice-variant-groups.js')&&e.includes(reason))); });
}
for (const duplicateId of [false,true]) test(`variant duplicate group ${duplicateId ? 'ID' : 'membership'} fails`,t=>{
 const d=fixture(t); edit(d,'data/practice-variant-groups.js',s=>s.replace(/\n\];/, `\n{ id: '${duplicateId ? 'g6-plane-triangle-area-basic' : 'another-group'}', grade: 6, course: 'exam', catId: 'pc-plane', title: 'duplicate', problemIds: ['g6_plane_002','g6_plane_002_v01'] },\n];`));
 assert(validate(d).errors.some(e=>e.includes(duplicateId ? 'duplicate ID' : 'already belongs')));
});
test('variant optional curriculum types may be omitted',t=>{const d=fixture(t);edit(d,'data/practice-variant-groups.js',s=>s.replace("curriculumTypeIds: ['P-06'],",''));assert.deepEqual(validate(d).errors,[]);});
for (const value of ['null','[null]']) test(`malformed variant table ${value} is diagnosed`,t=>{const d=fixture(t);edit(d,'data/practice-variant-groups.js',()=>`const PRACTICE_VARIANT_GROUPS = ${value};`);assert(validate(d).errors.some(e=>e.includes('data/practice-variant-groups.js')));});

// Sprint 2: target each new group, then every pair of the three groups.
for (const id of ['g6_plane_004', 'g6_plane_005']) {
 test(`variant ${id} unknown member fixture fails`,t=>{
  const d=fixture(t);edit(d,'data/practice-variant-groups.js',s=>s.replace(`'${id}_v02'`,"'missing-sprint2-member'"));
  assert(validate(d).errors.some(e=>e.includes('data/practice-variant-groups.js')&&e.includes('unknown problemId')&&e.includes('missing-sprint2-member')));
 });
 test(`variant ${id} duplicate member fixture fails`,t=>{
  const d=fixture(t);edit(d,'data/practice-variant-groups.js',s=>s.replace(`'${id}_v02'`,`'${id}_v01'`));
  assert(validate(d).errors.some(e=>e.includes('duplicate problemId in group')));
 });
}
for (const [owner, target] of [['g6_plane_002','g6_plane_004'],['g6_plane_002','g6_plane_005'],['g6_plane_004','g6_plane_005']]) {
 test(`variant membership collision ${owner} into ${target} fails`,t=>{
  const d=fixture(t);edit(d,'data/practice-variant-groups.js',s=>s.replace(`'${target}_v02'`,`'${owner}_v01'`));
  assert(validate(d).errors.some(e=>e.includes('data/practice-variant-groups.js')&&e.includes('already belongs')&&e.includes(`${owner}_v01`)));
 });
}
