const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../js/navigation.js'), 'utf8');

// Deliberately small DOM: these tests cover navigation storage/route safety;
// real rendering, input, scrolling and browser history need browser evaluation.
function setup({ stored = null, denied = false, token = null } = {}) {
    const events = {}, windowEvents = {}, elements = new Map();
    let active;
    function element(id = '') {
        const el = {
            id, children: [], style: {}, scrollTop: 0, scrollLeft: 0, textContent: '',
            classList: { contains: () => false, add() {}, remove() {} },
            getAttribute: () => '', setAttribute() {}, addEventListener() {},
            append(child) { this.children.push(child); if (child.id) elements.set(child.id, child); },
            insertBefore(child) { this.append(child); },
            remove() { elements.delete(this.id); }, querySelectorAll: () => [], querySelector: () => null,
        };
        if (id) elements.set(id, el);
        return el;
    }
    ['grade', 'home', 'exam', 'exam-mode', 'std-mode', 'practice', 'std-practice', 'report', 'salt', 'watertank'].forEach(id => element(id + '-screen'));
    ['home-grade-display', 'prac-cat-view', 'prac-detail-view', 'std-prac-cat-view', 'std-prac-detail-view'].forEach(element);
    active = elements.get('grade-screen');
    const document = {
        getElementById: id => elements.get(id) || null,
        querySelector: selector => selector === '.screen.active' ? active : null,
        querySelectorAll: () => [], createElement: () => element(), body: element(),
        addEventListener: (name, fn) => { events[name] = fn; },
    };
    const pushes = [], replaces = [], writes = [], scrolls = [];
    const context = {
        document, CSS: { escape: value => value }, console: { warn() {} },
        location: { hash: token ? '#vista=' + token : '' },
        history: { state: token ? { vista: token } : null, pushState: (...a) => pushes.push(a), replaceState: (...a) => replaces.push(a), back() {} },
        sessionStorage: { getItem() { if (denied) throw Error('denied'); return stored; }, setItem(key, value) { if (denied) throw Error('denied'); writes.push(value); } },
        appState: { grade: 5, course: 'std' }, pracState: {}, stdPracState: {}, chState: {}, trialState: {},
        learn: {}, quiz: {}, saltConfirmState: {}, planeAnimTimers: {},
        PRACTICE_PROBLEMS: [], PRACTICE_CATS: [], STANDARD_CHAPTERS_G5: [], STANDARD_CHAPTERS_G6: [], CHALLENGES: [],
        showScreen(id) { active = elements.get(id + '-screen'); },
        stopSim() {}, refreshInfoPanel() {}, renderChallengeList() {}, getCurrentChallengesFiltered: () => [],
        setTimeout, clearTimeout, scrollX: 0, scrollY: 0, scrollTo: options => scrolls.push(options),
    };
    const names = ['selectGrade', 'pracShowCats', 'pracOpenCat', 'pracOpenProb', 'pracShowProbs', 'pracNextProblem', 'stdPracShowCats', 'stdPracOpenCat', 'stdPracOpenProb', 'stdPracShowProbs', 'stdPracNextProblem', 'openChallenge', 'closeChallenge', 'chSetFilter', 'chNextProblem', 'openUnitPractice', 'wrGoToCat', 'nextTrialQuestion', 'pracGoToTopic', 'pracGoBack', 'stdPracGoBack', 'goBackFromChallenges', 'goBackFromWatertank', 'goBackFromRecommendedReview'];
    names.forEach(name => { context[name] = () => {}; });
    context.addEventListener = (name, fn) => { windowEvents[name] = fn; };
    context.window = context;
    vm.createContext(context); vm.runInContext(source, context);
    const navigation = vm.runInContext('vistaNavigation', context);
    return { context, navigation, events, windowEvents, pushes, replaces, writes, scrolls, elements, active: () => active?.id };
}

test('initial navigation replaces history without adding an artificial back entry', () => {
    const env = setup(); env.events.DOMContentLoaded();
    assert.equal(env.replaces.length, 1); assert.equal(env.pushes.length, 0);
    env.context.showScreen('exam-mode');
    assert.equal(env.active(), 'exam-mode-screen'); assert.equal(env.pushes.length, 1);
    assert.equal(env.context.appState.course, 'exam');
});

test('malformed JSON and rejected sessionStorage do not prevent learning', () => {
    for (const options of [{ stored: '{broken' }, { denied: true }]) {
        const env = setup(options);
        assert.doesNotThrow(() => env.events.DOMContentLoaded());
        assert.doesNotThrow(() => env.context.showScreen('exam-mode'));
        assert.equal(env.active(), 'exam-mode-screen');
        assert.ok(env.elements.has('navigation-notice'));
    }
});

test('unknown screen leaves current screen visible and adds no history entry', () => {
    const env = setup(); env.events.DOMContentLoaded();
    env.context.showScreen('missing-screen');
    assert.equal(env.active(), 'grade-screen'); assert.equal(env.pushes.length, 0);
});

test('corrupted stored routes recover safely to grade selection', () => {
    for (const route of [null, {}, { screen: 'missing', grade: 6, course: 'exam' }, { screen: 'practice', grade: 99, course: 'exam' }]) {
        const env = setup({ stored: JSON.stringify({ entries: { broken: { route, previous: null } } }), token: 'broken' });
        assert.doesNotThrow(() => env.events.DOMContentLoaded());
        assert.equal(env.active(), 'grade-screen'); assert.ok(env.elements.has('navigation-notice'));
    }
});

test('valid stored course and grade are restored on refresh without push', () => {
    const route = { screen: 'exam-mode', grade: 6, course: 'exam', ui: [] };
    const env = setup({ stored: JSON.stringify({ entries: { saved: { route, previous: null } } }), token: 'saved' });
    env.events.DOMContentLoaded();
    assert.equal(env.active(), 'exam-mode-screen'); assert.equal(env.context.appState.grade, 6);
    assert.equal(env.context.appState.course, 'exam'); assert.equal(env.pushes.length, 0);
});

test('restoring a stored route does not invoke grading functions', () => {
    const env = setup(); env.events.DOMContentLoaded();
    ['recordAnswer', 'recordProblemAttempt', 'addStar'].forEach(name => { env.context[name] = () => assert.fail('restoring must not grade'); });
    env.context.showScreen('exam-mode');
    assert.doesNotThrow(() => env.navigation.restoreToken(env.pushes[0][0].vista));
});


test('document scrolling is captured and restored alongside screen scrolling', () => {
    const route = { screen: 'exam-mode', grade: 6, course: 'exam', ui: [], windowScroll: [12, 345] };
    const env = setup({ stored: JSON.stringify({ entries: { saved: { route, previous: null } } }), token: 'saved' });
    env.events.DOMContentLoaded();
    assert.equal(env.scrolls.at(-1).left, 12); assert.equal(env.scrolls.at(-1).top, 345);
    env.context.scrollX = 20; env.context.scrollY = 200;
    assert.equal(env.navigation.snapshot().windowScroll[0], 20);
    assert.equal(env.navigation.snapshot().windowScroll[1], 200);
});

test('bounded navigation history preserves explicit original problem return token', () => {
    const env = setup(); env.events.DOMContentLoaded();
    env.context.showScreen('exam-mode');
    const original = env.pushes[0][0].vista; env.context.appState.problemReturnToken = original;
    for (let i = 0; i < 100; i++) env.context.showScreen(i % 2 ? 'exam-mode' : 'exam');
    const saved = JSON.parse(env.writes.at(-1));
    assert.ok(Object.keys(saved.entries).length <= 80);
    assert.ok(saved.entries[original]); assert.ok(saved.entries[saved.current]);
    assert.ok(env.writes.at(-1).length * 2 <= 1500000);
});

test('oversized untrusted session data is rejected before restoring a route', () => {
    const env = setup({ stored: ' '.repeat(750001), token: 'bad' });
    assert.doesNotThrow(() => env.events.DOMContentLoaded());
    assert.equal(env.active(), 'grade-screen'); assert.ok(env.elements.has('navigation-notice'));
});
