const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require('node:path').join(__dirname, '../js/storage.js'), 'utf8');
function boot(initial = {}, blocked = false) {
    const data = new Map(Object.entries(initial));
    const localStorage = {getItem(k) { if (blocked) throw Error('blocked'); return data.get(k) ?? null; }, setItem(k,v) { if (blocked) throw Error('quota'); data.set(k,v); }};
    const context = vm.createContext({localStorage}); vm.runInContext(code, context);
    return {c:context, data, block() { blocked = true; }, reload() { const c=vm.createContext({localStorage}); vm.runInContext(code,c); return c; }};
}
test('legacy data migrates without erasing original keys; unknown problem IDs survive', () => {
    const {c,data,reload} = boot({vista_stats:'{"g6_exam_pc-ratio":{"correct":2,"total":3}}', vista_history:'{"future_problem":[false,true]}', math_stars:'12'});
    assert.equal(c.lsReadObject('vista_stats')['g6_exam_pc-ratio'].total, 3);
    assert.equal(c.lsSet('math_stars',13), true);
    assert.equal(data.get('math_stars'),'12');
    assert.equal(reload().lsGet('math_stars'),'13');
    assert.equal(reload().lsReadObject('vista_history').future_problem.length,2);
});
test('malformed JSON and shapes recover safe subsets while retaining original bytes', () => {
    for (const raw of ['{','null','[]','{"bad":2}']) {
        const {c,reload}=boot({vista_history:raw});
        assert.equal(c.lsGet('vista_history'),'{}');
        assert.equal(c.VistaStorage.status().damaged,true);
        c.lsSet('math_stars',1);
        assert.equal(JSON.parse(reload().VistaStorage.exportData()).preserved.vista_history,raw);
    }
    const {c}=boot({vista_stats:'{"ok":{"correct":1,"total":2},"bad":{"correct":8,"total":2}}'});
    assert.equal(c.lsReadObject('vista_stats').ok.correct,1);
    assert.equal(c.lsReadObject('vista_stats').bad,undefined);
});
test('storage unavailable retains current session and reports non-durability', () => {
    const {c}=boot({},true);
    assert.equal(c.lsSet('vista_history','{"p":[true]}'),false);
    assert.equal(c.lsReadObject('vista_history').p[0],true);
    assert.equal(c.VistaStorage.status().unsaved,true);
});
test('export/import roundtrip, cancellation and invalid data preserve current records', () => {
    const source=boot().c;
    source.lsSet('vista_history','{"unknown":[false,true]}'); source.lsSet('math_stars',9);
    source.recordAttemptTimestamp('unknown'); source.lsSet('vista_first_ts','100'); source.lsSet('vista_last_ts','200');
    const backup=source.VistaStorage.exportData();
    const target=boot(); target.c.lsSet('math_stars',3);
    assert.equal(target.c.VistaStorage.importData(backup,()=>false),false);
    assert.equal(target.c.lsGet('math_stars'),'3');
    assert.throws(()=>target.c.VistaStorage.importData('{',()=>true));
    const broken=JSON.parse(backup); broken.records.vista_history='{"p":["true"]}';
    assert.throws(()=>target.c.VistaStorage.importData(JSON.stringify(broken),()=>true));
    assert.equal(target.c.lsGet('math_stars'),'3');
    assert.equal(target.c.VistaStorage.importData(backup,()=>true),true);
    const reloaded=target.reload();
    assert.equal(reloaded.lsGet('math_stars'),'9');
    assert.equal(reloaded.lsGet('vista_first_ts'),'100');
    assert.equal(reloaded.lsGet('vista_last_ts'),'200');
    assert.equal(reloaded.lsReadObject('vista_history').unknown.length,2);
    assert.ok(reloaded.lsReadObject('vista_attempt_ts').unknown > 0);
});
test('failed atomic restore leaves old persistent and session records untouched', () => {
    const target=boot(); target.c.lsSet('math_stars',3);
    const before=target.data.get('vista_records_v1'); const source=boot().c; source.lsSet('math_stars',20);
    target.block();
    assert.throws(()=>target.c.VistaStorage.importData(source.VistaStorage.exportData(),()=>true));
    assert.equal(target.c.lsGet('math_stars'),'3'); assert.equal(target.data.get('vista_records_v1'),before);
});
test('nonfinite, negative and excess values never reach numeric UI', () => {
    for (const raw of ['-1','NaN','Infinity','1.5']) assert.equal(boot({math_stars:raw}).c.lsGet('math_stars'),'0');
    const {c}=boot({vista_stats:'{"x":{"correct":-1,"total":3},"y":{"correct":1,"total":null}}'});
    assert.equal(c.lsGet('vista_stats'),'{}');
});
test('a stale tab cannot overwrite another tab or a deletion of persisted records', () => {
    const shared=boot(); const a=shared.c; a.lsSet('math_stars',1);
    const b=shared.reload(); assert.equal(b.lsGet('math_stars'),'1');
    a.lsSet('math_stars',2);
    assert.equal(b.lsSet('math_stars',3),false);
    assert.equal(b.VistaStorage.status().conflict,true);
    assert.equal(shared.reload().lsGet('math_stars'),'2');
    assert.equal(JSON.parse(b.VistaStorage.exportData()).records.math_stars,'3');
    assert.equal(b.lsSet('vista_history','{"local":[true]}'),false);
    const c=shared.reload(); c.lsGet('math_stars'); shared.data.delete('vista_records_v1');
    assert.equal(c.lsSet('math_stars',8),false);
    assert.equal(shared.data.has('vista_records_v1'),false);
});
test('corrupted snapshot field types remain exportable and recoverable', () => {
    const snapshot={version:1,records:{vista_history:{bad:[true]},vista_stats:null},preserved:{}};
    const {c}=boot({vista_records_v1:JSON.stringify(snapshot)});
    assert.equal(c.lsGet('vista_history'),'{}');
    assert.equal(c.VistaStorage.status().damaged,true);
    const backup=c.VistaStorage.exportData();
    assert.equal(typeof JSON.parse(backup).preserved.vista_history,'string');
    assert.equal(boot().c.VistaStorage.importData(backup,()=>true),true);
});
test('incomplete version 1 snapshots are reported and preserved while valid fields survive', () => {
    for (const records of [{}, {math_stars:'7'}]) {
        const raw=JSON.stringify({version:1,records,preserved:{}});
        const {c,reload}=boot({vista_records_v1:raw,vista_history:'{"legacy":[true]}'});
        assert.equal(c.VistaStorage.status().damaged,true);
        assert.equal(c.lsGet('math_stars'),records.math_stars || '0');
        assert.equal(c.lsReadObject('vista_history').legacy[0],true);
        assert.equal(JSON.parse(c.VistaStorage.exportData()).preserved.vista_records_v1,raw);
        c.lsSet('vista_last_ts','200');
        assert.equal(JSON.parse(reload().VistaStorage.exportData()).preserved.vista_records_v1,raw);
    }
});
