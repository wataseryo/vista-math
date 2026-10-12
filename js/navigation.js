/* Learning routes contain data and UI properties, never a copy of the page HTML.
 * They live in this tab's sessionStorage; permanent learning records are separate. */
const vistaNavigation = (() => {
    const key = 'vista_navigation_v1';
    const maxBytes = 1500000;
    let entries = {}, current = null, depth = 0, restoring = false;
    const baseShow = showScreen;
    const standardScreens = new Set(['standard', 'std-mode', 'std-practice', 'watertank']);
    const examScreens = new Set(['exam', 'exam-mode', 'practice', 'challenges', 'hard-challenge', 'salt', 'u6-ratio', 'u6-speed', 'u6-special', 'u6-plane']);
    const activeScreen = () => document.querySelector('.screen.active');
    const visible = id => document.getElementById(id)?.style.display !== 'none';
    const clone = value => JSON.parse(JSON.stringify(value));

    function notice(text) {
        let el = document.getElementById('navigation-notice');
        if (!el) {
            el = document.createElement('div'); el.id = 'navigation-notice';
            el.setAttribute('role', 'status');
            el.style.cssText = 'position:fixed;top:60px;left:12px;right:12px;padding:12px;background:#fff4d6;color:#563a00;border-radius:10px;z-index:1000';
            el.addEventListener('click', () => el.remove()); document.body.append(el);
        }
        el.textContent = text;
    }
    function persist() {
        try {
            let serialized = JSON.stringify({ entries, current });
            // Preserve current position, immediate back target and explicit problem return target.
            const protectedTokens = new Set([current, entries[current]?.previous, appState.problemReturnToken]);
            for (const token of Object.keys(entries)) {
                if (serialized.length * 2 <= maxBytes) break;
                if (protectedTokens.has(token)) continue;
                delete entries[token]; serialized = JSON.stringify({ entries, current });
            }
            if (serialized.length * 2 > maxBytes) {
                notice('学習位置の保存量が上限に達しました。現在の問題はそのまま使えますが、再読込前に入力を控えてください。');
                return;
            }
            sessionStorage.setItem(key, serialized);
        }
        catch (_) { notice('このタブの学習位置を保存できません。再読込すると入力が失われる場合があります。'); }
    }
    function pathFor(el, root) {
        if (el.id) return '#' + CSS.escape(el.id);
        const path = [];
        while (el && el !== root) {
            path.unshift(':scope > :nth-child(' + (Array.prototype.indexOf.call(el.parentElement.children, el) + 1) + ')');
            el = el.parentElement;
        }
        return path.join(' ').replaceAll(' :scope', '');
    }
    function captureUI(root) {
        const ui = [];
        root.querySelectorAll('*').forEach(el => {
            const control = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(el.tagName);
            const result = /^(?:std-prac-result-box|prac-result-box|ch-result-hl|ch-result-msg|result-headline|result-msg|result-exp|salt-quiz-result)$/.test(el.id);
            if (!control && !el.id && !el.style.display && !el.scrollTop && !el.classList.contains('open') && !el.classList.contains('active')) return;
            const data = { selector: pathFor(el, root), classes: el.getAttribute('class') || '', display: el.style.display, color: el.style.color, backgroundColor: el.style.backgroundColor, transform: el.style.transform, opacity: el.style.opacity, top: el.scrollTop, left: el.scrollLeft };
            if (control) { data.value = el.value; data.checked = !!el.checked; data.disabled = !!el.disabled; }
            if (result) {
                const copy = el.cloneNode(true); copy.querySelectorAll('button').forEach(b => b.remove());
                data.resultText = copy.textContent.slice(0, 12000);
                data.reveal = !!el.querySelector('.reveal-ans-btn');
            }
            ui.push(data);
        });
        return ui;
    }
    function snapshot() {
        const screen = activeScreen();
        if (!screen) return null;
        const id = screen.id.replace(/-screen$/, '');
        const route = { screen: id, grade: appState.grade, course: appState.course, ui: captureUI(screen), scroll: [screen.scrollTop, screen.scrollLeft], windowScroll: [window.scrollX || 0, window.scrollY || 0] };
        if (id === 'practice') route.practice = { cat: pracState.currentCatId, prob: visible('prac-detail-view') ? pracState.currentProbId : null, answered: !!pracState.answered, view: visible('prac-cat-view') ? 'cats' : 'probs' };
        if (id === 'std-practice') route.practice = { cat: stdPracState.currentCatId, prob: visible('std-prac-detail-view') ? stdPracState.currentProbId : null, answered: !!stdPracState.answered, view: visible('std-prac-cat-view') ? 'cats' : 'probs' };
        if (id === 'challenges') route.challenge = { ...chState, detail: document.getElementById('ch-detail-view').classList.contains('active'), title: document.getElementById('ch-screen-title').textContent };
        if (trialState[id]) {
            const t = trialState[id];
            route.trial = { current: t.current, answered: t.answered, revealedAnswer: t.revealedAnswer, choiceIdx: t.choiceIdx, isCorrect: t.isCorrect, choices: t.choices, choicesFor: t.choicesFor, ids: t.problems.map(p => p.id) };
        }
        if (id === 'watertank') route.water = { inflow: learn.inflow, outflow: learn.outflow, initial: learn.initial, current: learn.current, capacity: learn.capacity, simTime: learn.simTime, quiz: { level: quiz.level, correct: quiz.correct, wrong: quiz.wrong, problem: quiz.problem, hintVisible: quiz.hintVisible, answered: !!quiz.answered } };
        if (id === 'salt' && typeof saltConfirmState !== 'undefined') route.saltAnswered = !!saltConfirmState.answered;
        route.reviewFrom = appState.recommendedReviewFrom;
        route.returnToken = appState.problemReturnToken || null;
        return route;
    }
    function signature(route) {
        return JSON.stringify([route.screen, route.grade, route.course, route.practice, route.challenge && [route.challenge.detail, route.challenge.currentId, route.challenge.filter, route.challenge.mainCategory, route.challenge.unitCategories], route.trial?.current]);
    }
    function saveCurrent() {
        if (current && entries[current] && !restoring) entries[current].route = snapshot();
    }
    function commit(before) {
        const route = snapshot(); if (!route) return;
        if (before && signature(before) === signature(route)) {
            if (current && entries[current]) entries[current].route = route;
        } else {
            const token = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
            entries[token] = { previous: current, route }; current = token;
            const tokens = Object.keys(entries);
            const keep = new Set([current, entries[current]?.previous, appState.problemReturnToken]);
            let remaining = tokens.length;
            for (const old of tokens) { if (remaining <= 80) break; if (!keep.has(old)) { delete entries[old]; remaining--; } }
            history.pushState({ vista: token }, '', '#vista=' + token);
        }
        persist(); updateReturnButton();
    }
    function transact(fn, args) {
        if (depth || restoring) return fn(...args);
        saveCurrent(); const before = snapshot(); depth++;
        try { return fn(...args); }
        finally { depth--; commit(before); }
    }
    function restoreUI(root, ui) {
        if (!Array.isArray(ui)) return;
        ui.slice(0, 2500).forEach(data => {
            if (!data || typeof data.selector !== 'string') return;
            let el; try { el = root.querySelector(data.selector); } catch (_) { return; }
            if (!el) return;
            if (typeof data.classes === 'string') el.setAttribute('class', data.classes);
            if (['', 'none', 'block', 'flex', 'grid', 'inline', 'inline-block'].includes(data.display)) el.style.display = data.display;
            if (typeof data.color === 'string') el.style.color = data.color;
            if (typeof data.backgroundColor === 'string') el.style.backgroundColor = data.backgroundColor;
            if (typeof data.transform === 'string' && /^(?:|none|translate[XY]?\([-\d., px%]+\)|rotate\([-\d.]+deg\))$/.test(data.transform)) el.style.transform = data.transform;
            if (typeof data.opacity === 'string' && /^(?:|0|1|0?\.\d+)$/.test(data.opacity)) el.style.opacity = data.opacity;
            if ('value' in data && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.value = String(data.value ?? '');
            if ('disabled' in data && /^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(el.tagName)) el.disabled = !!data.disabled;
            if ('checked' in data && el.tagName === 'INPUT') el.checked = !!data.checked;
            if (typeof data.resultText === 'string' && /^(?:std-prac-result-box|prac-result-box|ch-result-hl|ch-result-msg|result-headline|result-msg|result-exp|salt-quiz-result)$/.test(el.id)) {
                // Generated retry/reveal buttons are recreated from handlers, never stored HTML.
                el.textContent = data.resultText;
                const retry = el.id === 'prac-result-box' ? pracRetry : el.id === 'std-prac-result-box' ? stdPracRetry : el.id === 'ch-result-msg' ? chRetry : el.id === 'salt-quiz-result' ? saltConfirmRetry : null;
                if (data.display !== 'none') {
                    if (data.reveal) {
                        const probId = el.id === 'prac-result-box' ? pracState.currentProbId : stdPracState.currentProbId;
                        const p = el.id === 'ch-result-msg' ? CHALLENGES.find(q => q.id === chState.currentId) : el.id === 'result-msg' ? quiz.problem : PRACTICE_PROBLEMS.find(q => q.id === probId);
                        if (p) { const reveal = document.createElement('button'); reveal.className = 'reveal-ans-btn'; reveal.textContent = '解答を確認する'; reveal.dataset.answer = p.answer; reveal.dataset.unit = p.answerUnit || p.unit || ''; reveal.onclick = () => revealAnswer(reveal); el.append(reveal); }
                    }
                    if (el.id === 'salt-quiz-result' && data.resultText.includes('正解')) { const next = document.createElement('button'); next.className = 'topic-nav-btn prac'; next.textContent = '演習問題に進む →'; next.onclick = openSaltPractice; el.append(next); }
                    if (retry) { const btn = document.createElement('button'); btn.className = 'retry-btn'; btn.textContent = 'もう一度解く'; btn.onclick = retry; el.append(btn); }
                }
            }
            el.scrollTop = Number.isFinite(data.top) ? data.top : 0;
            el.scrollLeft = Number.isFinite(data.left) ? data.left : 0;
        });
    }
    function validRoute(route) {
        return route && typeof route.screen === 'string' && [5, 6].includes(route.grade) && ['std', 'exam'].includes(route.course) && !!document.getElementById(route.screen + '-screen') && (!standardScreens.has(route.screen) || route.course === 'std') && (!examScreens.has(route.screen) || route.course === 'exam');
    }
    function render(route) {
        if (!validRoute(route)) { route = { screen: 'grade', grade: 5, course: 'std', ui: [] }; notice('保存された学習位置を開けませんでした。学年を選び直してください。'); }
        appState.grade = route.grade; appState.course = route.course;
        document.getElementById('home-grade-display').textContent = route.grade + '年生 のコースを選ぼう';
        appState.recommendedReviewFrom = route.reviewFrom;
        appState.problemReturnToken = typeof route.returnToken === 'string' && entries[route.returnToken] ? route.returnToken : null;
        const opts = route.challenge ? { categories: route.challenge.unitCategories, mainCategory: route.challenge.mainCategory, tierMin: route.challenge.tierMin, tierMax: route.challenge.tierMax, fromScreen: route.challenge.fromScreen, unitTitle: route.challenge.title } : {};
        if (route.trial && /^(u6-ratio|u6-speed|u6-special|u6-plane)$/.test(route.screen)) {
            const t = route.trial;
            const problems = PRACTICE_PROBLEMS.filter(p => p.topicUnitId === route.screen && p.grade === route.grade && p.course === route.course && p.difficulty <= 2).slice(0, 3);
            if (Number.isInteger(t.current) && t.current >= 0 && t.current < problems.length) {
                // Choices are always generated by the app; session data cannot inject handlers.
                const prob = problems[t.current];
                const choices = Array.isArray(t.choices) && t.choices.length === 4 && t.choices.every(c => c && typeof c.value === 'number' && Number.isFinite(c.value))
                    ? t.choices.map(c => ({ value: c.value, label: String(c.value) + (prob.answerUnit || ''), isCorrect: c.value === prob.answer })) : undefined;
                trialState[route.screen] = { current: t.current, answered: !!t.answered, revealedAnswer: !!t.revealedAnswer, choiceIdx: Number.isInteger(t.choiceIdx) ? t.choiceIdx : 0, isCorrect: !!t.isCorrect, choicesFor: prob.id, problems, choices };
            }
        }
        baseShow(route.screen, opts);
        // Replaying a position must not animate horizontal overflow: on mobile
        // translateX expands the layout viewport and clamps restored scrollY.
        activeScreen()?.classList.remove('slide-in');
        if (route.practice) {
            const std = route.screen === 'std-practice'; const p = route.practice;
            const cats = std ? (route.grade === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6) : PRACTICE_CATS;
            if (p.view !== 'cats' && (!p.cat || !cats.some(c => c.id === p.cat))) {
                route.ui = []; notice('この分野は現在開けません。分野一覧に戻りました。');
            } else if (p.cat && p.view !== 'cats') {
                (std ? stdPracOpenCat : pracOpenCat)(p.cat);
                if (p.prob) {
                    const prob = PRACTICE_PROBLEMS.find(q => q.id === p.prob && q.grade === route.grade && q.course === route.course && (std ? q.chapterId : q.catId) === p.cat);
                    if (prob) { (std ? stdPracOpenProb : pracOpenProb)(prob.id); (std ? stdPracState : pracState).answered = !!p.answered; }
                    else { route.ui = []; notice('この問題は現在開けません。同じ分野の問題一覧に戻りました。'); }
                }
            }
        }
        if (route.challenge) {
            chState.filter = route.challenge.filter; renderChallengeList();
            if (route.challenge.detail && getCurrentChallengesFiltered().some(p => p.id === route.challenge.currentId)) {
                openChallenge(route.challenge.currentId);
                chState.answered = !!route.challenge.answered;
                chState.hintVisible = !!route.challenge.hintVisible;
                chState.stepOpen = route.challenge.stepOpen && typeof route.challenge.stepOpen === 'object' ? route.challenge.stepOpen : {};
            }
            else if (route.challenge.detail) { route.ui = []; notice('この問題は現在開けません。問題一覧に戻りました。'); }
        }
        if (route.water) {
            const w = route.water;
            ['inflow', 'outflow', 'initial', 'current', 'capacity', 'simTime'].forEach(k => { if (Number.isFinite(w[k])) learn[k] = w[k]; });
            if (w.quiz && typeof w.quiz === 'object') Object.assign(quiz, w.quiz);
            refreshInfoPanel();
            document.getElementById('val-inflow').textContent = learn.inflow;
            document.getElementById('val-outflow').textContent = learn.outflow;
            document.getElementById('val-initial').textContent = learn.initial;
            document.getElementById('sim-time').textContent = learn.simTime.toFixed(1);
            document.getElementById('score-ok').textContent = quiz.correct;
            document.getElementById('score-ng').textContent = quiz.wrong;
            if (quiz.problem) {
                const p = quiz.problem;
                document.getElementById('prob-text').textContent = p.text || '';
                document.getElementById('ans-unit').textContent = p.unit || '';
                document.getElementById('hint-box').textContent = p.hint || '';
                document.getElementById('prob-badge').textContent = 'レベル' + quiz.level;
                document.getElementById('mini-in-label').textContent = `⬇️ 毎分${p.inflow}L`;
                document.getElementById('mini-out-label').textContent = `⬆️ 毎分${p.outflow}L`;
                document.getElementById('mini-chip-in').textContent = `入る: ${p.inflow}L/分`;
                document.getElementById('mini-chip-out').textContent = `出る: ${p.outflow}L/分`;
                document.getElementById('mini-water').style.height = Math.max(8, Math.min(90, (p.initial / 100) * 90)) + '%';
            }
        }
        if (route.screen === 'salt' && typeof saltConfirmState !== 'undefined') saltConfirmState.answered = !!route.saltAnswered;
        const screen = activeScreen(); restoreUI(screen, route.ui);
        if (Array.isArray(route.scroll)) { screen.scrollTop = route.scroll[0] || 0; screen.scrollLeft = route.scroll[1] || 0; }
        updateReturnButton();
        if (Array.isArray(route.windowScroll) && typeof window.scrollTo === 'function') window.scrollTo({ left: Number.isFinite(route.windowScroll[0]) ? route.windowScroll[0] : 0, top: Number.isFinite(route.windowScroll[1]) ? route.windowScroll[1] : 0, behavior: 'instant' });
    }
    function restoreToken(token) {
        if (!entries[token]) return false;
        restoring = true; stopSim(); Object.values(planeAnimTimers).forEach(clearTimeout);
        try { current = token; render(clone(entries[token].route)); }
        catch (error) { console.warn('Learning route could not be restored', error); appState.grade = 5; appState.course = 'std'; baseShow('grade'); notice('前回の学習位置を開けませんでした。学年を選び直してください。'); }
        finally { restoring = false; persist(); }
        return true;
    }
    function back(fallback) {
        saveCurrent(); persist();
        if (entries[current]?.previous && entries[entries[current].previous]) history.back();
        else showScreen(fallback || 'home');
    }
    function updateReturnButton() {
        document.getElementById('problem-return-button')?.remove();
        const token = appState.problemReturnToken;
        const root = activeScreen();
        if (!token || !entries[token] || !root || !['salt', 'u6-ratio', 'u6-speed', 'u6-special', 'u6-plane', 'standard', 'watertank'].includes(root.id.replace(/-screen$/, ''))) return;
        const btn = document.createElement('button'); btn.id = 'problem-return-button'; btn.className = 'prac-detail-btn';
        btn.textContent = '← 元の問題へ戻る'; btn.style.cssText = 'margin:10px;flex-shrink:0;background:#e3f2fd;color:#1565c0';
        btn.onclick = () => { saveCurrent(); if (restoreToken(token)) history.pushState({ vista: token }, '', '#vista=' + token); };
        root.insertBefore(btn, root.children[1] || null);
    }

    showScreen = function(id, opts = {}) {
        if (!document.getElementById(id + '-screen')) { notice('指定されたページは開けません。現在の画面で学習を続けられます。'); return; }
        return transact(() => {
            if (activeScreen()?.id === 'std-practice-screen' && visible('std-prac-detail-view') && ['standard', 'watertank'].includes(id)) appState.problemReturnToken = current;
            if (activeScreen()?.id === 'practice-screen' && visible('prac-detail-view') && ['salt', 'u6-ratio', 'u6-speed', 'u6-special', 'u6-plane'].includes(id)) appState.problemReturnToken = current;
            if (activeScreen()?.id === 'watertank-screen' && id !== 'watertank') stopSim();
            if (activeScreen()?.id === 'u6-plane-screen' && id !== 'u6-plane') Object.values(planeAnimTimers).forEach(clearTimeout);
            if (id === 'grade' || id === 'home') appState.problemReturnToken = null;
            if (standardScreens.has(id)) appState.course = 'std';
            if (examScreens.has(id)) appState.course = 'exam';
            baseShow(id, opts);
        }, []);
    };
    const wrappers = { selectGrade, pracShowCats, pracOpenCat, pracOpenProb, pracShowProbs, pracNextProblem, stdPracShowCats, stdPracOpenCat, stdPracOpenProb, stdPracShowProbs, stdPracNextProblem, openChallenge, closeChallenge, chSetFilter, chNextProblem, openUnitPractice, wrGoToCat, nextTrialQuestion };
    Object.entries(wrappers).forEach(([name, fn]) => { window[name] = (...args) => transact(fn, args); });
    const oldTopic = pracGoToTopic;
    pracGoToTopic = (...args) => { appState.problemReturnToken = current; return transact(oldTopic, args); };
    pracGoBack = () => back('exam-mode'); stdPracGoBack = () => back('std-mode');
    goBackFromChallenges = () => back(chState.fromScreen || 'exam');
    goBackFromWatertank = () => back('standard');
    goBackFromRecommendedReview = () => back(appState.recommendedReviewFrom || 'home');

    window.addEventListener('popstate', event => {
        saveCurrent(); Object.values(planeAnimTimers).forEach(clearTimeout);
        if (!restoreToken(event.state?.vista)) { restoring = true; baseShow('grade'); restoring = false; current = null; }
    });
    window.addEventListener('pagehide', () => { saveCurrent(); persist(); stopSim(); Object.values(planeAnimTimers).forEach(clearTimeout); });
    document.addEventListener('input', () => { saveCurrent(); persist(); });
    document.addEventListener('change', () => { saveCurrent(); persist(); });
    document.addEventListener('click', () => { if (!restoring) { saveCurrent(); persist(); } });
    document.addEventListener('scroll', () => { if (!restoring) saveCurrent(); }, true);
    document.addEventListener('DOMContentLoaded', () => {
        try { const raw = sessionStorage.getItem(key) || '{}'; if (raw.length * 2 > maxBytes) throw Error('navigation data too large'); const data = JSON.parse(raw); if (data.entries && typeof data.entries === 'object' && !Array.isArray(data.entries)) entries = data.entries; }
        catch (_) { notice('前回の学習位置を読み込めませんでした。学習記録とは別のデータです。'); }
        const token = history.state?.vista || (location.hash.startsWith('#vista=') ? location.hash.slice(7) : null);
        if (token && restoreToken(token)) { history.replaceState({ vista: token }, '', '#vista=' + token); return; }
        current = 'initial-' + Date.now().toString(36);
        entries[current] = { previous: null, route: snapshot() };
        history.replaceState({ vista: current }, '', '#vista=' + current); persist();
    });
    return { back, snapshot, restoreToken, notice };
})();
