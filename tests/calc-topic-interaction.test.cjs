const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
// Exercise production selection/timer logic; rendering remains a separate browser check.
function setup(reduced = false) {
    const make = () => ({ hidden: false, textContent: '', classList: { add() {}, remove() {} }, setAttribute(k, v) { this[k] = v; }, focus() {} });
    const elements = new Map();
    const get = id => { if (!elements.has(id)) elements.set(id, make()); return elements.get(id); };
    const tiles = [25, 13, 4].map(n => Object.assign(make(), { dataset: { calcNumber: String(n) } }));
    const stages = Array.from({ length: 7 }, make);
    let id = 0;
    const timers = new Map();
    const context = vm.createContext({
        document: { getElementById: get, querySelector: () => tiles[0], querySelectorAll: s => s.includes('comparison') ? stages : s.includes('aria-pressed') ? tiles.filter(t => t['aria-pressed'] === 'true') : tiles, addEventListener() {} },
        window: { matchMedia: () => ({ matches: reduced }) },
        setTimeout: fn => { timers.set(++id, fn); return id; }, clearTimeout: id => timers.delete(id),
    });
    const source = fs.readFileSync(require.resolve('../js/app.js'), 'utf8');
    vm.runInContext(source.slice(source.indexOf('// 再利用できる段階表示。')), context);
    return { get, tiles, stages, timers, run: code => vm.runInContext(code, context), flush() { const pending = [...timers.values()]; timers.clear(); pending.forEach(fn => fn()); } };
}

test('calc pairs preview both retry products, cancel stale rewards and reset selection', () => {
    const app = setup();
    app.run('initCalcExample(); selectCalcNumber(25); selectCalcNumber(13)');
    assert.match(app.get('calc-product-preview').textContent, /325/);
    assert.match(app.get('calc-prediction-feedback').textContent, /他の組み合わせ/);
    app.run('selectCalcNumber(25); selectCalcNumber(4)');
    assert.match(app.get('calc-product-preview').textContent, /52/);
    app.run('selectCalcNumber(13); selectCalcNumber(25)');
    assert.equal(app.timers.size, 1);
    app.run('initCalcExample()');
    app.flush();
    assert.equal(app.get('calc-example-reveal').hidden, true);
    assert.ok(app.tiles.every(t => t['aria-pressed'] === 'false'));
    app.run('selectCalcNumber(25); selectCalcNumber(4)');
    app.flush();
    assert.equal(app.get('calc-example-reveal').hidden, false);
});

test('comparison replay cancels previous sequence and reduced motion removes waits', () => {
    const app = setup();
    app.run('playCalcComparison()');
    assert.equal(app.timers.size, 6);
    assert.equal(app.stages[0].hidden, false);
    assert.equal(app.stages[3].hidden, true);
    app.run('playCalcComparison()');
    assert.equal(app.timers.size, 6);
    app.flush();
    assert.ok(app.stages.every(stage => !stage.hidden));
    const reduced = setup(true);
    reduced.run('initCalcExample(); selectCalcNumber(25); selectCalcNumber(4); playCalcComparison()');
    assert.equal(reduced.timers.size, 0);
    assert.equal(reduced.get('calc-example-reveal').hidden, false);
    assert.ok(reduced.stages.every(stage => !stage.hidden));
});
