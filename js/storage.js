/* Browser-local learning records. One atomic snapshot protects imports from partial writes. */
(function (root) {
    'use strict';
    const SNAPSHOT = 'vista_records_v1';
    const KEYS = ['vista_stats', 'vista_history', 'math_stars', 'vista_first_ts', 'vista_last_ts', 'vista_attempt_ts'];
    const memory = Object.create(null);
    let loaded = false, unsaved = false, damaged = false, conflict = false;
    let baseline = null;
    let preserved = Object.create(null);
    const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
    const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
    const count = v => Number.isSafeInteger(v) && v >= 0;
    const safeKey = k => !['__proto__', 'constructor', 'prototype'].includes(k);
    function normalize(key, raw) {
        if (raw == null) return key === 'math_stars' ? '0' : key.endsWith('_ts') && key !== 'vista_attempt_ts' ? '' : '{}';
        if (key === 'math_stars') {
            const n = Number(raw); if (!count(n)) throw Error('星の値が不正です'); return String(n);
        }
        if (key === 'vista_first_ts' || key === 'vista_last_ts') {
            if (raw === '') return ''; const n = Number(raw); if (!count(n)) throw Error('日時が不正です'); return String(n);
        }
        const parsed = JSON.parse(raw);
        if (!object(parsed)) throw Error('記録の形式が不正です');
        const clean = Object.create(null);
        let invalid = false;
        for (const [k, v] of Object.entries(parsed)) {
            let ok = safeKey(k);
            if (key === 'vista_stats') ok = ok && object(v) && count(v.total) && count(v.correct) && v.correct <= v.total;
            else if (key === 'vista_history') ok = ok && Array.isArray(v) && v.every(x => typeof x === 'boolean');
            else if (key === 'vista_attempt_ts') ok = ok && count(v);
            if (ok) clean[k] = v; else invalid = true;
        }
        if (invalid) { const err = Error('一部の記録が不正です'); err.recovered = JSON.stringify(clean); throw err; }
        return JSON.stringify(clean);
    }
    function rawRead(key) { try { return root.localStorage.getItem(key); } catch (_) { unsaved = true; return null; } }
    function notify() {
        if (!root.document) return;
        const el = root.document.getElementById('vista-storage-status');
        if (el) el.textContent = conflict ? '別のタブで学習記録が更新されました。上書きを防ぐため、このタブの保存を止めています。このタブで解いた分をバックアップしてから再読込してください。' : unsaved ? 'このブラウザに保存できません。記録はこの画面を閉じると失われる可能性があります。今すぐバックアップしてください。' : damaged ? '読めない記録を保護しました。正常な記録で続けられます。バックアップには保護した原データも含まれます。' : '記録はこの端末・ブラウザ内に保存されます。';
        const tools = root.document.getElementById('vista-record-tools');
        if (tools && (unsaved || damaged)) tools.open = true;
    }
    function load() {
        if (loaded) return; loaded = true;
        let source = null;
        const raw = rawRead(SNAPSHOT);
        baseline = raw;
        if (raw !== null) {
            try {
                const s = JSON.parse(raw);
                if (!object(s) || s.version !== 1 || !object(s.records) || !object(s.preserved) || !Object.values(s.preserved).every(v => typeof v === 'string')) throw Error();
                source = s.records; preserved = Object.assign(Object.create(null), s.preserved);
                damaged = Object.keys(preserved).length > 0;
                // Version 1 snapshots are complete. Missing fields are damage,
                // not a silent schema migration; recover remaining fields and legacy values.
                if (!KEYS.every(key => own(source, key))) {
                    damaged = true;
                    preserved[SNAPSHOT] = raw;
                }
            } catch (_) { damaged = true; preserved[SNAPSHOT] = raw; }
        }
        for (const key of KEYS) {
            const value = source && own(source, key) ? source[key] : rawRead(key);
            try {
                if (source && own(source, key) && typeof value !== 'string') throw Error('保存形式が不正です');
                memory[key] = normalize(key, value);
            }
            catch (e) { damaged = true; preserved[key] = typeof value === 'string' ? value : JSON.stringify(value); memory[key] = e.recovered || normalize(key, null); }
        }
        notify();
    }
    function snapshot(records) { return JSON.stringify({version: 1, records, preserved}); }
    function persist(records) {
        try {
            if (conflict || root.localStorage.getItem(SNAPSHOT) !== baseline) {
                conflict = true; unsaved = true; notify(); return false;
            }
            const next = snapshot(records);
            root.localStorage.setItem(SNAPSHOT, next);
            baseline = next; unsaved = false; notify(); return true;
        }
        catch (_) { unsaved = true; notify(); return false; }
    }
    root.lsGet = function (key, fallback = null) {
        load(); if (KEYS.includes(key)) return memory[key];
        if (own(memory, key)) return memory[key];
        const val = rawRead(key); notify(); return val === null ? fallback : val;
    };
    root.lsSet = function (key, value) {
        load();
        if (KEYS.includes(key)) {
            try { memory[key] = normalize(key, String(value)); }
            catch (_) { damaged = true; notify(); return false; }
            return persist(Object.fromEntries(KEYS.map(k => [k, memory[k]])));
        }
        memory[key] = String(value);
        try { root.localStorage.setItem(key, String(value)); return true; }
        catch (_) { unsaved = true; notify(); return false; }
    };
    root.lsReadObject = key => JSON.parse(root.lsGet(key, '{}'));
    root.recordAttemptTimestamp = function (id) {
        const times = root.lsReadObject('vista_attempt_ts');
        if (safeKey(id)) { times[id] = Date.now(); root.lsSet('vista_attempt_ts', JSON.stringify(times)); }
    };
    function exportData() {
        load();
        return JSON.stringify({app: 'VISTA', version: 1, exportedAt: new Date().toISOString(), records: Object.fromEntries(KEYS.map(k => [k, memory[k]])), preserved}, null, 2);
    }
    function importData(text, confirmReplace) {
        load(); const data = JSON.parse(text);
        if (!object(data) || data.app !== 'VISTA' || data.version !== 1 || !object(data.records) || !object(data.preserved)) throw Error('VISTAの対応するバックアップではありません。');
        const records = Object.create(null);
        for (const key of KEYS) {
            if (!own(data.records, key) || typeof data.records[key] !== 'string') throw Error('必要な記録が不足しています。');
            records[key] = normalize(key, data.records[key]);
        }
        if (!Object.values(data.preserved).every(v => typeof v === 'string')) throw Error('保護データが不正です。');
        if (!confirmReplace()) return false;
        const previous = preserved;
        preserved = Object.assign(Object.create(null), data.preserved);
        if (!persist(records)) { preserved = previous; throw Error('保存できませんでした。現在の記録は変更していません。'); }
        for (const key of KEYS) memory[key] = records[key];
        damaged = Object.keys(preserved).length > 0; notify(); return true;
    }
    root.VistaStorage = {exportData, importData, status: () => { load(); return {unsaved, damaged, conflict}; }};
    if (root.addEventListener) root.addEventListener('storage', event => {
        if (loaded && (event.key === SNAPSHOT || event.key === null) && rawRead(SNAPSHOT) !== baseline) {
            conflict = true; unsaved = true; notify();
        }
    });
    if (root.document) root.document.addEventListener('DOMContentLoaded', function () {
        load();
        const box = root.document.createElement('details');
        box.id = 'vista-record-tools';
        box.style.cssText = 'position:relative;width:calc(100% - 16px);max-width:720px;margin:8px auto;box-sizing:border-box;background:#fff;color:#243047;border:1px solid #b8c5d6;border-radius:10px;padding:10px;font-size:13px;overflow-wrap:anywhere';
        box.innerHTML = '<summary style="cursor:pointer;min-height:44px;display:list-item;padding:10px 0">学習記録・バックアップ</summary><p id="vista-storage-status" role="status" aria-live="polite"></p><p>正答集計・問題履歴・星・学習日時を保存できます。共有端末では利用者別に分かれません。クラウド同期はなく、ブラウザのデータ削除で失われます。同時に複数タブで学習せず、1つのタブを使ってください。</p><button type="button" id="vista-export" style="min-height:44px">バックアップを保存</button> <button type="button" id="vista-import" style="min-height:44px">ファイルから復元</button><input id="vista-import-file" type="file" accept="application/json,.json" hidden><p id="vista-import-result" role="status"></p>';
        root.document.body.prepend(box); notify();
        if (unsaved || damaged) box.open = true;
        root.document.getElementById('vista-export').onclick = function () {
            const url = root.URL.createObjectURL(new root.Blob([exportData()], {type:'application/json'}));
            const a = root.document.createElement('a'); a.href = url; a.download = 'vista-records-' + new Date().toISOString().slice(0,10) + '.json'; a.click(); root.setTimeout(() => root.URL.revokeObjectURL(url), 1000);
        };
        const input = root.document.getElementById('vista-import-file');
        root.document.getElementById('vista-import').onclick = () => input.click();
        input.onchange = async function () {
            const file = input.files[0]; if (!file) return;
            const result = root.document.getElementById('vista-import-result');
            try {
                if (file.size > 20 * 1024 * 1024) throw Error('ファイルが大きすぎます。');
                const ok = importData(await file.text(), () => root.confirm('このブラウザの学習記録をファイルの記録で置き換えます。合算しません。続けますか？'));
                result.textContent = ok ? '復元しました。再読込して表示に反映します。' : '復元を取り消しました。';
                if (ok) root.location.reload();
            } catch (e) { result.textContent = '復元できませんでした：' + e.message; }
            input.value = '';
        };
    });
})(typeof window !== 'undefined' ? window : globalThis);
