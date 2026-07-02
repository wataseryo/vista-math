/* ════════════════════════════════════════
   LOCAL STORAGE SAFE WRAPPER
   プライベートブラウジング等でのクラッシュを防ぐ
════════════════════════════════════════ */
function lsGet(key, fallback = null) {
    try {
        const val = localStorage.getItem(key);
        return val !== null ? val : fallback;
    } catch (e) {
        return fallback;
    }
}
function lsSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (e) { /* サイレント失敗 */ }
}

const appState = { grade: 5, previousScreen: 'std-mode' };
const learn = { inflow:3, outflow:1, initial:50, current:50, simRunning:false, simTimer:null, simTime:0, capacity:100 };
const quiz  = { level:1, correct:0, wrong:0, problem:null, hintVisible:false };
const chState = { filter:'すべて', currentId:null, hintVisible:false, stepOpen:{}, tierMin:1, tierMax:5, fromScreen:'exam', mainCategory:null };

const HC_CATEGORIES = [
    { id: 'ratio',               icon: '⚖️', title: '割合・比' },
    { id: 'speed',               icon: '🏃', title: '速さ' },
    { id: 'word_problems',       icon: '📝', title: '特殊算・文章題' },
    { id: 'solid_geometry',      icon: '📦', title: '立体図形・水量' },
    { id: 'plane_geometry',      icon: '📐', title: '平面図形' },
    { id: 'number_properties',   icon: '🔍', title: '数の性質・規則性' },
    { id: 'combinatorics_logic', icon: '🎯', title: '場合の数・論理' },
    { id: 'calculation',         icon: '🔢', title: '計算・数の処理' },
];

/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
function selectGrade(g) {
    appState.grade = g;
    const label = g + '年生';
    document.getElementById('home-grade-display').innerHTML =
        `<span style="background:rgba(255,255,255,.25);padding:3px 12px;border-radius:20px;font-weight:bold">${label}</span> のコースを選ぼう`;
    showScreen('home');
}

/* ════════════════════════════════════════
   EXAM MODE SELECTION
════════════════════════════════════════ */
function renderExamMode() {
    const label = appState.grade + '年生';
    document.getElementById('exam-mode-grade-badge').textContent = label + ' 受験コース';
}

/* ════════════════════════════════════════
   STANDARD MODE SELECTION
════════════════════════════════════════ */
function renderStdMode() {
    const label = appState.grade + '年生';
    document.getElementById('std-mode-grade-badge').textContent = label + ' 標準コース';
}

/* ════════════════════════════════════════
   STANDARD PRACTICE SCREEN
════════════════════════════════════════ */
const stdPracState = { currentCatId: null, currentProbId: null };

function renderStdPractice() {
    const label = appState.grade + '年生';
    document.getElementById('std-prac-hero-title').textContent = label + ' 演習問題';
    stdPracShowCats();
}

function stdPracShowCats() {
    document.getElementById('std-prac-cat-view').style.display    = 'flex';
    document.getElementById('std-prac-prob-view').style.display   = 'none';
    document.getElementById('std-prac-detail-view').style.display = 'none';
    document.getElementById('std-prac-screen-title').textContent  = '演習問題';

    const g = appState.grade;
    const chapters = g === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    // 標準コースの章をカテゴリとして使う
    document.getElementById('std-prac-cat-grid').innerHTML = chapters.map((ch, i) => {
        const probs = PRACTICE_PROBLEMS.filter(p => p.chapterId === ch.id && p.grade === g && p.course === 'std');
        const count = probs.length;
        const avail = count > 0;
        const accBadge = avail ? getAccuracyBadge(`g${g}_std_${ch.id}`) : '';
        return `<div class="prac-cat-card ${avail?'avail':'coming'}" onclick="${avail?`stdPracOpenCat('${ch.id}')`:''}">
            <div class="prac-cat-icon">${['💧','🏃','⚖️','🎲','📐'][i] || '📘'}</div>
            <div class="prac-cat-num">${ch.num}</div>
            <div class="prac-cat-title">${ch.title}</div>
            <div class="prac-cat-sub">${ch.sub}</div>
            ${avail
                ? `<div class="prac-cat-count">${count}問</div>${accBadge}`
                : `<div class="prac-cat-coming">準備中</div>`}
        </div>`;
    }).join('');
}

function stdPracOpenCat(chapterId) {
    stdPracState.currentCatId = chapterId;
    const g = appState.grade;
    const chapters = g === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    const ch = chapters.find(c => c.id === chapterId);
    const probs = PRACTICE_PROBLEMS.filter(p => p.chapterId === chapterId && p.grade === g && p.course === 'std');
    document.getElementById('std-prac-cat-view').style.display    = 'none';
    document.getElementById('std-prac-prob-view').style.display   = 'flex';
    document.getElementById('std-prac-detail-view').style.display = 'none';
    document.getElementById('std-prac-prob-section-title').textContent = ch ? ch.title : '';
    document.getElementById('std-prac-screen-title').textContent  = ch ? ch.title : '演習問題';
    if (probs.length === 0) {
        document.getElementById('std-prac-prob-list-body').innerHTML =
            `<div class="prac-empty-msg">この単元の演習問題は<br>準備中です 🚧<br><br>トピック学習で解き方を確認しよう！</div>`;
    } else {
        document.getElementById('std-prac-prob-list-body').innerHTML = probs.map((p, i) => {
            const stars = '★'.repeat(p.difficulty) + '☆'.repeat(5 - p.difficulty);
            return `<div class="prac-prob-card" onclick="stdPracOpenProb('${p.id}')">
                <div class="prac-prob-num">問${i+1}</div>
                <div class="prac-prob-body">
                    <div class="prac-prob-title">${p.title}</div>
                    <div class="prac-prob-meta">${stars}</div>
                    ${getAttemptDots(p.id)}
                </div>
                <span style="color:#bbb;font-size:1.1rem">›</span>
            </div>`;
        }).join('');
    }
}

function stdPracOpenProb(probId) {
    stdPracState.currentProbId = probId;
    const p = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p) return;
    const g = appState.grade;
    const chapters = g === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    const ch = chapters.find(c => c.id === p.chapterId);
    const probs = PRACTICE_PROBLEMS.filter(q => q.chapterId === stdPracState.currentCatId && q.grade === g && q.course === 'std');
    const currentIdx = probs.findIndex(q => q.id === probId);
    document.getElementById('std-prac-prob-view').style.display   = 'none';
    document.getElementById('std-prac-detail-view').style.display = 'flex';
    document.getElementById('std-prac-detail-cat-label').textContent = ch ? ch.title : '';
    document.getElementById('std-prac-screen-title').textContent  = p.title;
    document.getElementById('std-prac-detail-body').innerHTML = `
        <div class="prac-detail-q">${p.text}</div>
        <div class="prac-ans-row">
            <input class="prac-ans-input" id="std-prac-ans-input" type="number" placeholder="答えを入力" />
            <span class="prac-ans-unit">${p.unit}</span>
            <button class="prac-check-btn" style="background:linear-gradient(135deg,#42A5F5,#1976D2)" onclick="stdPracCheckAnswer()">答え合わせ</button>
        </div>
        <div id="std-prac-result-box" style="display:none;background:#E8F5E9;border-radius:10px;padding:12px;margin-bottom:14px;font-weight:bold;font-size:.9rem"></div>
        <div class="prac-detail-actions">
            <button class="prac-detail-btn btn-prac-sol" onclick="stdPracToggleSolution()">💡 解説を見る</button>
            ${ch ? `<button class="prac-detail-btn" style="background:#E3F2FD;color:#1565C0" onclick="showScreen('standard')">トピックで学ぶ</button>` : ''}
        </div>
        <div id="std-prac-sol-box" class="prac-sol-box" style="display:none">${p.solution || '解説を準備中です。'}</div>
        ${ch ? `<div class="prac-topic-link" style="border-color:var(--std-primary)" onclick="showScreen('standard')">
            <div class="prac-topic-link-body">
                <div class="prac-topic-link-title" style="color:var(--std-primary)">${ch.num} ${ch.title}</div>
                <div class="prac-topic-link-sub">ステップ解説でじっくり学ぼう →</div>
            </div>
        </div>` : ''}
    `;
    const nextBtn = document.getElementById('std-prac-next-prob-btn');
    if (nextBtn) {
        if (probs.length > 1) {
            nextBtn.style.display = '';
            nextBtn.textContent = `次の問題 (${currentIdx + 1}/${probs.length}) →`;
        } else {
            nextBtn.style.display = 'none';
        }
    }
    document.getElementById('std-prac-detail-body').scrollTop = 0;
    const stdAnsInput = document.getElementById('std-prac-ans-input');
    if (stdAnsInput) stdAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') stdPracCheckAnswer(); });
}

function stdPracNextProblem() {
    const g = appState.grade;
    const probs = PRACTICE_PROBLEMS.filter(p => p.chapterId === stdPracState.currentCatId && p.grade === g && p.course === 'std');
    const idx = probs.findIndex(p => p.id === stdPracState.currentProbId);
    if (idx + 1 < probs.length) stdPracOpenProb(probs[idx + 1].id);
    else stdPracShowCats();
}

function stdPracCheckAnswer() {
    const p = PRACTICE_PROBLEMS.find(x => x.id === stdPracState.currentProbId);
    if (!p) return;
    const val = parseFloat(document.getElementById('std-prac-ans-input').value);
    if (isNaN(val)) return;
    const ok = Math.abs(val - p.answer) < 0.01;
    document.getElementById('std-prac-ans-input').className = 'prac-ans-input ' + (ok ? 'correct' : 'wrong');
    const rb = document.getElementById('std-prac-result-box');
    rb.style.display = 'block';
    const pid = stdPracState.currentProbId;
    if (ok) {
        rb.style.background = '#E8F5E9'; rb.style.color = '#2E7D32';
        rb.innerHTML = `<div>⭕ 正解！</div><button class="retry-btn" onclick="stdPracRetry()">もう一度解く</button>`;
        recordProblemAttempt(pid, true);
        recordAnswer(`g${appState.grade}_std_${stdPracState.currentCatId}`, true);
        addStar();
        { const _k=`g${appState.grade}_std_${stdPracState.currentCatId}`; const _s=getStatsForKey(_k); const _ch=(appState.grade===5?STANDARD_CHAPTERS_G5:STANDARD_CHAPTERS_G6).find(c=>c.id===stdPracState.currentCatId); if(_s) showAccuracyCard(_ch?_ch.title:'標準演習', _s.correct, _s.total); }
    } else {
        rb.style.background = '#FFEBEE'; rb.style.color = '#C62828';
        rb.innerHTML = `<div>❌ ${getWrongMsg()}</div><button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.unit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="stdPracRetry()">もう一度解く</button>`;
        recordProblemAttempt(pid, false);
        recordAnswer(`g${appState.grade}_std_${stdPracState.currentCatId}`, false);
        resetStreak();
    }
}

function stdPracToggleSolution() {
    const box = document.getElementById('std-prac-sol-box');
    const btn = document.querySelector('.btn-prac-sol');
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'block' : 'none';
    if (btn) btn.textContent = isHidden ? '💡 解説を閉じる' : '💡 解説を見る';
}

function stdPracShowProbs() {
    if (stdPracState.currentCatId) stdPracOpenCat(stdPracState.currentCatId);
    else stdPracShowCats();
}

function stdPracGoBack() {
    const catView    = document.getElementById('std-prac-cat-view');
    const probView   = document.getElementById('std-prac-prob-view');
    const detailView = document.getElementById('std-prac-detail-view');
    if (detailView.style.display !== 'none') { stdPracShowProbs(); }
    else if (probView.style.display !== 'none') { stdPracShowCats(); }
    else { showScreen('std-mode'); }
}

/* ════════════════════════════════════════
   PRACTICE SCREEN
════════════════════════════════════════ */
const pracState = { currentCatId: null, currentProbId: null };

function renderPractice() {
    const label = appState.grade + '年生';
    const heroEl = document.getElementById('prac-hero-title');
    if (heroEl) heroEl.textContent = label + ' 演習問題';
    pracShowCats();
}

function pracShowCats() {
    document.getElementById('prac-cat-view').style.display  = 'flex';
    document.getElementById('prac-prob-view').style.display = 'none';
    document.getElementById('prac-detail-view').style.display = 'none';
    document.getElementById('prac-screen-title').textContent = '演習問題';

    const g = appState.grade;
    const units = g === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    document.getElementById('prac-cat-grid').innerHTML = PRACTICE_CATS.map(cat => {
        const unitId = g === 5 ? cat.unitId5 : cat.unitId6;
        const unit   = units.find(u => u.id === unitId);
        const probs  = PRACTICE_PROBLEMS.filter(p => p.catId === cat.id && p.grade === g);
        const count  = probs.length;
        const avail  = count > 0;
        const accBadge = avail ? getAccuracyBadge(`g${g}_exam_${cat.id}`) : '';
        return `<div class="prac-cat-card ${avail?'avail':'coming'}" onclick="${avail?`pracOpenCat('${cat.id}')`:''}">
            <div class="prac-cat-icon">${cat.icon}</div>
            <div class="prac-cat-num">${unit ? unit.num : ''}</div>
            <div class="prac-cat-title">${cat.title}</div>
            <div class="prac-cat-sub">${cat.sub}</div>
            ${avail
                ? `<div class="prac-cat-count">${count}問</div>${accBadge}`
                : `<div class="prac-cat-coming">準備中</div>`}
        </div>`;
    }).join('');
}

function pracOpenCat(catId) {
    pracState.currentCatId = catId;
    const cat   = PRACTICE_CATS.find(c => c.id === catId);
    const probs = PRACTICE_PROBLEMS.filter(p => p.catId === catId && p.grade === appState.grade);
    document.getElementById('prac-cat-view').style.display  = 'none';
    document.getElementById('prac-prob-view').style.display = 'flex';
    document.getElementById('prac-detail-view').style.display = 'none';
    document.getElementById('prac-prob-section-title').textContent = cat ? cat.title : '';
    document.getElementById('prac-screen-title').textContent = cat ? cat.title : '演習問題';
    if (probs.length === 0) {
        document.getElementById('prac-prob-list-body').innerHTML =
            `<div class="prac-empty-msg">この分野の演習問題は<br>準備中です 🚧<br><br>トピック学習で解き方を確認しよう！</div>`;
    } else {
        document.getElementById('prac-prob-list-body').innerHTML = probs.map((p, i) => {
            const stars = '★'.repeat(p.difficulty) + '☆'.repeat(5 - p.difficulty);
            return `<div class="prac-prob-card" onclick="pracOpenProb('${p.id}')">
                <div class="prac-prob-num">問${i+1}</div>
                <div class="prac-prob-body">
                    <div class="prac-prob-title">${p.title}</div>
                    <div class="prac-prob-meta">${stars}</div>
                    ${getAttemptDots(p.id)}
                </div>
                <span style="color:#bbb;font-size:1.1rem">›</span>
            </div>`;
        }).join('');
    }
}

function pracOpenProb(probId) {
    pracState.currentProbId = probId;
    const p   = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p) return;
    const cat = PRACTICE_CATS.find(c => c.id === p.catId);
    if (!cat) { console.warn('pracOpenProb: cat not found for', p.catId); return; }
    const unitId = appState.grade === 5 ? cat.unitId5 : cat.unitId6;
    const units  = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const unit   = units.find(u => u.id === unitId);
    const probs  = PRACTICE_PROBLEMS.filter(q => q.catId === pracState.currentCatId && q.grade === appState.grade);
    const currentIdx = probs.findIndex(q => q.id === probId);

    document.getElementById('prac-prob-view').style.display   = 'none';
    document.getElementById('prac-detail-view').style.display = 'flex';
    document.getElementById('prac-detail-cat-label').textContent = cat ? cat.title : '';
    document.getElementById('prac-screen-title').textContent  = p.title;

    const body = document.getElementById('prac-detail-body');
    body.innerHTML = `
        <div class="prac-detail-q">${p.text}</div>
        <div class="prac-ans-row">
            <input class="prac-ans-input" id="prac-ans-input" type="number" placeholder="答えを入力" />
            <span class="prac-ans-unit">${p.unit}</span>
            <button class="prac-check-btn" onclick="pracCheckAnswer()">答え合わせ</button>
        </div>
        <div id="prac-result-box" style="display:none;background:#E8F5E9;border-radius:10px;padding:12px;margin-bottom:14px;font-weight:bold;font-size:.9rem"></div>
        <div class="prac-detail-actions">
            <button class="prac-detail-btn btn-prac-sol" onclick="pracToggleSolution()">💡 解説を見る</button>
            ${unit ? `<button class="prac-detail-btn btn-prac-topic" onclick="pracGoToTopic('${unitId}')">トピックで学ぶ</button>` : ''}
        </div>
        <div id="prac-sol-box" class="prac-sol-box" style="display:none">${p.solution || '解説を準備中です。'}</div>
        ${unit ? `<div class="prac-topic-link" onclick="pracGoToTopic('${unitId}')">
            <div class="prac-topic-link-body">
                <div class="prac-topic-link-title">${unit.num} ${unit.title}</div>
                <div class="prac-topic-link-sub">ステップ解説でじっくり学ぼう →</div>
            </div>
        </div>` : ''}
    `;
    const nextBtn = document.getElementById('prac-next-prob-btn');
    if (nextBtn) {
        if (probs.length > 1) {
            nextBtn.style.display = '';
            nextBtn.textContent = `次の問題 (${currentIdx + 1}/${probs.length}) →`;
        } else {
            nextBtn.style.display = 'none';
        }
    }
    body.scrollTop = 0;
    const pracAnsInput = document.getElementById('prac-ans-input');
    if (pracAnsInput) pracAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') pracCheckAnswer(); });
}

function pracNextProblem() {
    const probs = PRACTICE_PROBLEMS.filter(p => p.catId === pracState.currentCatId && p.grade === appState.grade);
    const idx = probs.findIndex(p => p.id === pracState.currentProbId);
    if (idx + 1 < probs.length) pracOpenProb(probs[idx + 1].id);
    else pracShowCats();
}

function pracCheckAnswer() {
    const p = PRACTICE_PROBLEMS.find(x => x.id === pracState.currentProbId);
    if (!p) return;
    const val = parseFloat(document.getElementById('prac-ans-input').value);
    if (isNaN(val)) return;
    const ok = Math.abs(val - p.answer) < 0.01;
    document.getElementById('prac-ans-input').className = 'prac-ans-input ' + (ok ? 'correct' : 'wrong');
    const rb = document.getElementById('prac-result-box');
    rb.style.display = 'block';
    const pid = pracState.currentProbId;
    if (ok) {
        rb.style.background = '#E8F5E9'; rb.style.color = '#2E7D32';
        rb.innerHTML = `<div>⭕ 正解！</div><button class="retry-btn" onclick="pracRetry()">もう一度解く</button>`;
        recordProblemAttempt(pid, true);
        recordAnswer(`g${appState.grade}_exam_${pracState.currentCatId}`, true);
        addStar();
        { const _k=`g${appState.grade}_exam_${pracState.currentCatId}`; const _s=getStatsForKey(_k); const _cat=PRACTICE_CATS.find(c=>c.id===pracState.currentCatId); if(_s) showAccuracyCard(_cat?_cat.title:'受験演習', _s.correct, _s.total); }
    } else {
        rb.style.background = '#FFEBEE'; rb.style.color = '#C62828';
        rb.innerHTML = `<div>❌ ${getWrongMsg()}</div><button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.unit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="pracRetry()">もう一度解く</button>`;
        recordProblemAttempt(pid, false);
        recordAnswer(`g${appState.grade}_exam_${pracState.currentCatId}`, false);
        resetStreak();
    }
}

function pracToggleSolution() {
    const box = document.getElementById('prac-sol-box');
    const btn = document.querySelector('.btn-prac-sol');
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'block' : 'none';
    if (btn) btn.textContent = isHidden ? '💡 解説を閉じる' : '💡 解説を見る';
}

function pracGoToTopic(unitId) {
    // exam-mode → exam → unit の challenges へ遷移
    appState.pracReturnCatId = pracState.currentCatId;
    openUnit(unitId);
}

function pracShowProbs() {
    if (pracState.currentCatId) pracOpenCat(pracState.currentCatId);
    else pracShowCats();
}

function pracGoBack() {
    const catView    = document.getElementById('prac-cat-view');
    const probView   = document.getElementById('prac-prob-view');
    const detailView = document.getElementById('prac-detail-view');
    if (detailView.style.display !== 'none') { pracShowProbs(); }
    else if (probView.style.display !== 'none') { pracShowCats(); }
    else { showScreen('exam-mode'); }
}

function showScreen(id, opts={}) {
    const current = document.querySelector('.screen.active');
    if (current) appState.previousScreen = current.id.replace('-screen', '');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'slide-in'));
    const next = document.getElementById(id + '-screen');
    if (!next) { console.warn('showScreen: unknown screen id:', id); return; }
    next.classList.add('active');
    void next.offsetWidth;
    next.classList.add('slide-in');
    if (id === 'home')          renderHomeProgress();
    if (id === 'standard')      renderStandardCourse();
    if (id === 'std-mode')      renderStdMode();
    if (id === 'std-practice')  renderStdPractice();
    if (id === 'exam')          renderExamCourse();
    if (id === 'exam-mode')     renderExamMode();
    if (id === 'practice')      renderPractice();
    if (id === 'watertank')  { updateLearn(); generateProblem(); }
    if (id === 'hard-challenge') { hcSwitchMode('all'); renderHardChallenge(); }
    if (id === 'weak-review')          { renderWeakReview(); }
    if (id === 'recommended-review')   { renderRecommendedReview(); }
    if (id === 'report')               { renderReport(); }
    if (id === 'u6-ratio')   { initTopicTrial('u6-ratio'); }
    if (id === 'u6-speed')   { initTopicTrial('u6-speed'); }
    if (id === 'u6-special') { initTopicTrial('u6-special'); }
    if (id === 'challenges') {
        if (opts.unitTitle) document.getElementById('ch-screen-title').textContent = opts.unitTitle;
        else document.getElementById('ch-screen-title').textContent = '難問チャレンジ';
        chState.unitCategories = opts.categories || null;
        chState.mainCategory   = opts.mainCategory || null;
        chState.tierMin = opts.tierMin !== undefined ? opts.tierMin : 1;
        chState.tierMax = opts.tierMax !== undefined ? opts.tierMax : 5;
        chState.fromScreen = opts.fromScreen || 'exam';
        chState.filter = 'すべて';
        document.getElementById('ch-list-view').style.display = 'block';
        document.getElementById('ch-detail-view').classList.remove('active');
        renderChallengeList();
    }
    // スターバッジ表示制御
    const noStarScreens = ['grade', 'home'];
    const badge = document.getElementById('star-counter-badge');
    if (badge) {
        if (noStarScreens.includes(id)) badge.classList.remove('visible');
        else badge.classList.add('visible');
    }
}

function goBackFromChallenges() {
    showScreen(chState.fromScreen || 'exam');
}

function goBackFromWatertank() {
    showScreen(appState.previousScreen || 'std-mode');
}

/* ════════════════════════════════════════
   STANDARD COURSE
════════════════════════════════════════ */
function renderStandardCourse() {
    const chapters = appState.grade === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    const el = document.getElementById('std-chapter-list');
    el.innerHTML = chapters.map((ch, i) => {
        if (ch.available) {
            return `<div class="chapter-card available" onclick="showScreen('watertank')">
                <div class="chapter-card-inner">
                    <div class="chapter-num-badge">
                        <span class="chapter-num-label">第${i+1}章</span>
                        <span class="chapter-num-val">${i+1}</span>
                    </div>
                    <div class="chapter-body">
                        <div class="chapter-title">${ch.title}</div>
                        <div class="chapter-sub">${ch.sub}</div>
                        <div class="chapter-tags">${ch.tags.map(t=>`<span class="chapter-tag">${t}</span>`).join('')}</div>
                    </div>
                    <span class="chapter-arrow">›</span>
                </div>
                <div class="chapter-card-footer">
                    <button class="chapter-action-btn btn-learn" onclick="event.stopPropagation();showScreen('watertank');switchTab('learn')">📖 学ぶ</button>
                    <button class="chapter-action-btn btn-practice" onclick="event.stopPropagation();showScreen('watertank');switchTab('quiz')">✏️ 練習</button>
                </div>
            </div>`;
        } else {
            return `<div class="chapter-card locked">
                <div class="chapter-card-inner">
                    <div class="chapter-num-badge">
                        <span class="chapter-num-label">第${i+1}章</span>
                        <span class="chapter-num-val">${i+1}</span>
                    </div>
                    <div class="chapter-body">
                        <div class="chapter-title">${ch.title}</div>
                        <div class="chapter-sub">${ch.sub}</div>
                        <div class="chapter-tags">${ch.tags.map(t=>`<span class="chapter-tag">${t}</span>`).join('')}</div>
                    </div>
                    <span class="chapter-coming-badge">準備中</span>
                </div>
            </div>`;
        }
    }).join('');
}

/* ════════════════════════════════════════
   EXAM COURSE
════════════════════════════════════════ */
function renderExamCourse() {
    const units = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const el = document.getElementById('exam-unit-list');
    el.innerHTML = units.map(u => {
        const stars = '★'.repeat(u.difficulty) + '☆'.repeat(5 - u.difficulty);
        if (u.available) {
            return `<div class="unit-card available" onclick="openUnit('${u.id}')">
                <div class="unit-card-inner">
                    <div class="unit-num-badge" style="font-size:1.1rem;width:36px;height:36px">${u.icon||u.num}</div>
                    <div class="unit-body">
                        <div class="unit-title">${u.num} ${u.title}</div>
                        <div class="unit-sub">${u.sub}</div>
                        <div class="unit-meta">
                            <span class="unit-stars">${stars}</span>
                            <span class="unit-count">${u.count}問</span>
                        </div>
                    </div>
                    <span class="unit-arrow">›</span>
                </div>
            </div>`;
        } else {
            return `<div class="unit-card locked">
                <div class="unit-card-inner">
                    <div class="unit-num-badge" style="font-size:1.1rem;width:36px;height:36px">${u.icon||u.num}</div>
                    <div class="unit-body">
                        <div class="unit-title">${u.num} ${u.title}</div>
                        <div class="unit-sub">${u.sub}</div>
                        <div class="unit-meta"><span class="unit-stars">${stars}</span></div>
                    </div>
                    <span class="unit-coming">準備中</span>
                </div>
            </div>`;
        }
    }).join('');
    // ヘッダーのstat更新
    const total = units.reduce((s,u) => s + u.count, 0);
    const el2 = document.getElementById('exam-stat-problems');
    if (el2) el2.textContent = total;
}

function openUnit(unitId) {
    const units = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const unit = units.find(u => u.id === unitId);
    if (!unit || !unit.available) return;
    if (unit.topicScreen) { showScreen(unit.topicScreen); return; }
    showScreen('challenges', { categories: unit.categories, unitTitle: unit.num + ' ' + unit.title });
}

function openHardChallenge() {
    showScreen('hard-challenge');
}

function renderHardChallenge() {
    const grade = appState.grade;
    const hard = CHALLENGES.filter(c => c.grade === grade && c.difficulty >= 4 && c.difficulty <= 5);
    const countEl = document.getElementById('hc-all-count');
    if (countEl) countEl.textContent = hard.length + '問';
    const grid = document.getElementById('hc-cat-grid');
    if (grid) {
        grid.innerHTML = HC_CATEGORIES.map(cat => {
            const count = hard.filter(c => c.mainCategory === cat.id).length;
            const avail = count > 0;
            return `<div class="hc-cat-card ${avail ? 'avail' : 'empty'}" ${avail ? `onclick="hcOpenCat('${cat.id}','${cat.title}')"` : ''}>
                <div class="hc-cat-icon">${cat.icon}</div>
                <div class="hc-cat-title">${cat.title}</div>
                ${avail
                    ? `<div class="hc-cat-count">${count}問</div>`
                    : `<div class="hc-cat-coming">準備中</div>`}
            </div>`;
        }).join('');
    }
}

function hcSwitchMode(mode) {
    document.querySelectorAll('.hc-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('hc-tab-' + mode + '-btn').classList.add('active');
    document.getElementById('hc-mode-all').style.display = mode === 'all' ? 'block' : 'none';
    document.getElementById('hc-mode-cat').style.display = mode === 'cat' ? 'block' : 'none';
}

function hcStartAll() {
    showScreen('challenges', {
        unitTitle: '総合チャレンジ ★4〜★5',
        tierMin: 4, tierMax: 5,
        fromScreen: 'hard-challenge',
    });
}

function hcOpenCat(mainCatId, title) {
    showScreen('challenges', {
        mainCategory: mainCatId,
        unitTitle: title + ' 難問チャレンジ',
        tierMin: 4, tierMax: 5,
        fromScreen: 'hard-challenge',
    });
}

function saltSwitchTab(tab) {
    document.querySelectorAll('.salt-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.salt-tab-content').forEach(c => c.style.display = 'none');
    document.getElementById('salt-tab-' + tab + '-btn').classList.add('active');
    document.getElementById('salt-tab-' + tab).style.display = 'block';
}

/* ── 各トピック画面から演習問題へ遷移 ── */
// unitId: 'u6-ratio' | 'u6-speed' | 'u6-special'
function openUnitPractice(unitId) {
    const units = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;
    showScreen('challenges', {
        categories: unit.categories,
        unitTitle: unit.title + ' — 演習問題',
        tierMin: 1, tierMax: 3,
        fromScreen: unitId,
    });
}

function openSaltPractice() {
    showScreen('challenges', {
        categories: ['食塩水'],
        unitTitle: '食塩水 — 演習問題',
        tierMin: 2, tierMax: 3,
        fromScreen: 'salt',
    });
}

function openSaltChallenge() {
    showScreen('challenges', {
        categories: ['食塩水'],
        unitTitle: '食塩水 — 難問チャレンジ',
        tierMin: 4, tierMax: 5,
        fromScreen: 'salt',
    });
}

function checkSaltConfirm() {
    const raw = document.getElementById('salt-quiz-input').value
        .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)).trim();
    const val = parseFloat(raw);
    const el = document.getElementById('salt-quiz-result');
    if (isNaN(val)) return;
    const ok = Math.abs(val - 20) < 0.01;
    el.style.display = 'block';
    if (ok) {
        el.innerHTML = `<div class="ch-result-box ok"><div class="ch-result-hl">⭕ 正解！</div><div class="ch-result-msg">250 × 0.08 ＝ 20g　よくできました！<br><button class="topic-nav-btn prac" style="margin-top:10px" onclick="openSaltPractice()">演習問題に進む →</button></div></div>`;
        recordAnswer('g' + appState.grade + '_salt_topic', true);
        addStar();
    } else {
        el.innerHTML = `<div class="ch-result-box ng"><div class="ch-result-hl">❌ もう一度考えよう</div><div class="ch-result-msg">塩の重さ ＝ 食塩水の重さ × 濃度<br>＝ 250 × 0.08 で計算してみよう。</div></div>`;
        recordAnswer('g' + appState.grade + '_salt_topic', false);
    }
}

/* ════════════════════════════════════════
   LEARN MODE
════════════════════════════════════════ */
function switchTab(tab) {
    const tabs = document.querySelectorAll('#watertank-screen .tab');
    tabs.forEach((t,i) => t.classList.toggle('active', (tab==='learn'?0:1)===i));
    document.querySelectorAll('#watertank-screen .tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
}

function updateLearn() {
    learn.inflow  = +document.getElementById('slider-inflow').value;
    learn.outflow = +document.getElementById('slider-outflow').value;
    learn.initial = +document.getElementById('slider-initial').value;
    if (!learn.simRunning) learn.current = learn.initial;
    document.getElementById('val-inflow').textContent  = learn.inflow;
    document.getElementById('val-outflow').textContent = learn.outflow;
    document.getElementById('val-initial').textContent = learn.initial;
    refreshInfoPanel();
}

function refreshInfoPanel() {
    const net = learn.inflow - learn.outflow;
    document.getElementById('info-inflow').textContent  = learn.inflow  + ' L/分';
    document.getElementById('info-outflow').textContent = learn.outflow + ' L/分';
    document.getElementById('info-net').textContent     = (net>=0?'+':'') + net + ' L';
    document.getElementById('info-current').textContent = Math.round(learn.current) + ' L';
    document.getElementById('flow-net-card').classList.toggle('negative', net<0);
    const pct = Math.min(Math.abs(net)/10*50, 50);
    const bar = document.getElementById('net-bar');
    bar.className = 'net-bar-fill ' + (net>=0?'pos':'neg');
    bar.style.width = pct + '%';
    const txt = document.getElementById('net-bar-text');
    if (net>0)      { txt.textContent=`毎分 +${net}L 増えています`; txt.style.color='#2E7D32'; }
    else if (net<0) { txt.textContent=`毎分 ${net}L 減っています`; txt.style.color='#B71C1C'; }
    else            { txt.textContent='水量は変わりません（入出が同じ）'; txt.style.color='#555'; }
    const pctW = Math.max(0, Math.min(100, learn.current/learn.capacity*100));
    document.getElementById('water-fill').style.height = pctW + '%';
}

function startSim() {
    if (learn.simRunning) return;
    learn.simRunning=true; learn.simTime=0; learn.current=learn.initial;
    learn.simTimer = setInterval(() => {
        const dt=0.05;
        learn.current = Math.max(0, Math.min(learn.capacity, learn.current+(learn.inflow-learn.outflow)*dt));
        learn.simTime += dt;
        document.getElementById('sim-time').textContent = learn.simTime.toFixed(1);
        refreshInfoPanel();
        if (learn.current<=0 || learn.current>=learn.capacity) stopSim();
    }, 50);
}
function stopSim() { clearInterval(learn.simTimer); learn.simRunning=false; }
function resetSim() { stopSim(); learn.simTime=0; learn.current=learn.initial; document.getElementById('sim-time').textContent='0.0'; refreshInfoPanel(); }

/* ════════════════════════════════════════
   QUIZ
════════════════════════════════════════ */
function ri(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

const generators = {
    1() {
        const inflow=ri(2,9), outflow=ri(1,inflow), net=inflow-outflow;
        return { text:`水槽に毎分 ${inflow}L の水が入り、\n毎分 ${outflow}L の水が出ていきます。\n\n1分間で水は何L 増えますか？\n（減る場合はマイナスで答えよう）`, inflow, outflow, initial:0,
            answer:net, unit:'L', hint:`入ってくる水 − 出ていく水 = 1分間の変化\n${inflow} − ${outflow} = ？`,
            exp:`入ってくる水 ${inflow}L から\n出ていく水 ${outflow}L を引くと\n${inflow} − ${outflow} = ${net}L` };
    },
    2() {
        const inflow=ri(3,8), outflow=ri(1,inflow-1), initial=ri(1,4)*10, time=ri(3,8), net=inflow-outflow, answer=initial+net*time;
        return { text:`水槽に最初 ${initial}L の水があります。\n毎分 ${inflow}L 入り、毎分 ${outflow}L 出ていきます。\n\n${time}分後は何Lですか？`, inflow, outflow, initial, time,
            answer:Math.max(0,answer), unit:'L', hint:`1分で ${net>=0?'+':''}${net}L 変わる\n${time}分で ${net}×${time}=${net*time}L 変わる\n最初の量 + 変化 = ？`,
            exp:`1分で ${net>=0?'+':''}${net}L 変化\n${time}分で ${net}×${time}=${net*time}L 変化\n${initial}+(${net*time})=${answer}L` };
    },
    3() {
        const full=ri(3,15)*10, type=Math.random()<.5?'full':'empty';
        if (type==='full') {
            const initial=ri(1,Math.floor(full/2/10))*10, net=ri(2,8), inflow=net+ri(1,4), outflow=inflow-net, remain=full-initial, time=Math.ceil(remain/net);
            return { text:`容量 ${full}L の水槽に、今 ${initial}L の水があります。\n毎分 ${inflow}L 入り、毎分 ${outflow}L 出ていきます。\n\n何分後に満水（${full}L）になりますか？`, inflow, outflow, initial,
                answer:time, unit:'分', hint:`1分で ${net}L 増える\n満水まであと ${remain}L\n${remain}÷${net}=？分`, exp:`1分で ${net}L 増える\n満水まであと ${remain}L\n${remain}÷${net}=${time}分` };
        } else {
            const initial=ri(3,8)*10, net=ri(2,6), outflow=net+ri(1,3), inflow=outflow-net, time=Math.ceil(initial/net);
            return { text:`水槽に ${initial}L の水があります。\n毎分 ${inflow}L 入り、毎分 ${outflow}L 出ていきます。\n\n何分後に空になりますか？`, inflow, outflow, initial,
                answer:time, unit:'分', hint:`1分で ${net}L 減る\n残り ${initial}L\n${initial}÷${net}=？分`, exp:`1分で ${net}L 減る\n残り ${initial}L\n${initial}÷${net}=${time}分` };
        }
    }
};

function setLevel(lv) {
    quiz.level=lv; quiz.correct=quiz.wrong=0;
    document.getElementById('score-ok').textContent='0';
    document.getElementById('score-ng').textContent='0';
    document.querySelectorAll('.level-btn').forEach((b,i)=>b.classList.toggle('active',i+1===lv));
    generateProblem();
}

function generateProblem() {
    const p=generators[quiz.level]();
    quiz.problem=p; quiz.hintVisible=false;
    document.getElementById('prob-badge').textContent='レベル'+quiz.level;
    document.getElementById('prob-text').textContent=p.text;
    document.getElementById('ans-unit').textContent=p.unit;
    document.getElementById('ans-input').value='';
    document.getElementById('ans-input').className='answer-input';
    document.getElementById('mini-in-label').textContent=`⬇️ 毎分${p.inflow}L`;
    document.getElementById('mini-out-label').textContent=`⬆️ 毎分${p.outflow}L`;
    document.getElementById('mini-chip-in').textContent=`入る: ${p.inflow}L/分`;
    document.getElementById('mini-chip-out').textContent=`出る: ${p.outflow}L/分`;
    document.getElementById('mini-water').style.height=Math.max(8,Math.min(90,(p.initial/100)*90))+'%';
    const rb=document.getElementById('result-box');
    rb.style.display='none'; rb.className='result-box';
    document.getElementById('next-btn').style.display='none';
    const hb=document.getElementById('hint-box');
    hb.style.display='none'; hb.textContent=p.hint;
    document.querySelector('.hint-btn').textContent='💡 ヒントを見る';
}

function checkAnswer() {
    const p=quiz.problem, val=parseFloat(document.getElementById('ans-input').value);
    if (isNaN(val)) return;
    const ok=Math.abs(val-p.answer)<0.01;
    document.getElementById('ans-input').className='answer-input '+(ok?'correct':'wrong');
    const rb=document.getElementById('result-box');
    if (ok) {
        quiz.correct++; document.getElementById('score-ok').textContent=quiz.correct;
        rb.className='result-box ok';
        document.getElementById('result-headline').textContent='⭕ 正解！';
        document.getElementById('result-msg').innerHTML='';
        recordAnswer('watertank', true);
        addStar();
        { const s = getStatsForKey('watertank'); if(s) showAccuracyCard('水そう練習', s.correct, s.total); }
    } else {
        quiz.wrong++; document.getElementById('score-ng').textContent=quiz.wrong;
        rb.className='result-box ng';
        document.getElementById('result-headline').textContent='❌ ' + getWrongMsg();
        document.getElementById('result-msg').innerHTML=`<button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.unit}" onclick="revealAnswer(this)">解答を確認する</button>`;
        recordAnswer('watertank', false);
        resetStreak();
    }
    document.getElementById('result-exp').textContent=p.exp;
    rb.style.display='block';
    document.getElementById('next-btn').style.display='block';
}
function nextQuestion() { generateProblem(); }
function toggleHint() {
    quiz.hintVisible=!quiz.hintVisible;
    document.getElementById('hint-box').style.display=quiz.hintVisible?'block':'none';
    document.querySelector('.hint-btn').textContent=quiz.hintVisible?'💡 ヒントを隠す':'💡 ヒントを見る';
}

/* ════════════════════════════════════════
   CHALLENGES
════════════════════════════════════════ */
function getCurrentChallengesFiltered() {
    let base = CHALLENGES.filter(c => c.grade === appState.grade);
    if (chState.mainCategory) {
        base = base.filter(c => c.mainCategory === chState.mainCategory);
    } else if (chState.unitCategories) {
        base = base.filter(c => chState.unitCategories.includes(c.category));
    }
    base = base.filter(c => c.difficulty >= chState.tierMin && c.difficulty <= chState.tierMax);
    return chState.filter === 'すべて' ? base : base.filter(c => c.category === chState.filter);
}

function chNextProblem() {
    const list = getCurrentChallengesFiltered();
    const idx = list.findIndex(c => c.id === chState.currentId);
    if (idx + 1 < list.length) openChallenge(list[idx + 1].id);
    else closeChallenge();
}

function renderChallengeList() {
    let base = CHALLENGES.filter(c => c.grade === appState.grade);
    if (chState.mainCategory) {
        base = base.filter(c => c.mainCategory === chState.mainCategory);
    } else if (chState.unitCategories) {
        base = base.filter(c => chState.unitCategories.includes(c.category));
    }
    base = base.filter(c => c.difficulty >= chState.tierMin && c.difficulty <= chState.tierMax);
    const availCats = ['すべて', ...new Set(base.map(c => c.category))];
    if (!availCats.includes(chState.filter)) chState.filter = 'すべて';
    document.getElementById('ch-filter-row').innerHTML = availCats.map(cat =>
        `<button class="ch-filter-btn${chState.filter===cat?' active':''}" onclick="chSetFilter('${cat}')">${cat}</button>`
    ).join('');
    let filtered = chState.filter === 'すべて' ? base : base.filter(c => c.category === chState.filter);
    document.getElementById('ch-cards-container').innerHTML = filtered.map(c => {
        const stars='★'.repeat(c.difficulty)+'☆'.repeat(5-c.difficulty);
        const raw = c.question.replace(/\n/g,' ');
        const preview = raw.length > 48 ? raw.slice(0,48)+'…' : raw;
        return `<div class="ch-card" style="border-left-color:${c.borderColor}" onclick="openChallenge('${c.id}')">
            <div class="ch-card-top"><span class="ch-cat-badge" style="background:${c.catBg};color:${c.catColor}">${c.category}</span><span class="ch-stars">${stars}</span></div>
            <div class="ch-card-title">${c.title}</div>
            <div class="ch-card-preview">${preview}</div>
            ${getAttemptDots(c.id)}
        </div>`;
    }).join('');
}

function chSetFilter(cat) { chState.filter=cat; renderChallengeList(); }

function openChallenge(id) {
    const ch=CHALLENGES.find(c=>c.id===id); if (!ch) return;
    chState.currentId=id; chState.hintVisible=false; chState.stepOpen={};
    document.getElementById('ch-list-view').style.display='none';
    document.getElementById('ch-detail-view').classList.add('active');
    document.getElementById('ch-detail-title-sm').textContent=ch.title;
    // 次の問題ボタンのカウンター更新
    const chList = getCurrentChallengesFiltered();
    const chIdx  = chList.findIndex(c => c.id === id);
    const nextBtn = document.getElementById('ch-next-prob-btn');
    if (nextBtn) {
        nextBtn.style.display = chList.length > 1 ? '' : 'none';
        nextBtn.textContent   = `次の問題 (${chIdx + 1}/${chList.length}) →`;
    }
    const stars='★'.repeat(ch.difficulty)+'☆'.repeat(5-ch.difficulty);
    const badge=document.getElementById('ch-prob-cat-badge');
    badge.textContent=ch.category; badge.style.cssText=`background:${ch.catBg};color:${ch.catColor}`;
    document.getElementById('ch-prob-stars').textContent=stars;
    document.getElementById('ch-prob-text').textContent=ch.question;
    document.getElementById('ch-ans-input').value='';
    document.getElementById('ch-ans-input').className='ch-ans-input';
    document.getElementById('ch-ans-unit').textContent=ch.answerUnit;
    document.getElementById('ch-hint-btn').textContent='💡 ヒントを見る';
    document.getElementById('ch-hint-box').style.display='none';
    document.getElementById('ch-hint-box').textContent=ch.hint;
    const rb=document.getElementById('ch-result-box');
    rb.style.display='none'; rb.className='ch-result-box';
    document.getElementById('ch-steps-container').innerHTML=ch.explanation.map((s,i)=>`
        <div class="ch-step">
            <div class="ch-step-hd" onclick="chToggleStep(${i})">
                <div class="ch-step-num">${i+1}</div>
                <div class="ch-step-name">${s.title}</div>
                <span class="ch-step-chevron" id="ch-chev-${i}">›</span>
            </div>
            <div class="ch-step-bd" id="ch-step-bd-${i}">
                <div class="ch-step-text">${s.text}</div>
                <div>${s.visual}</div>
            </div>
        </div>`).join('');
    const detailEl = document.getElementById('ch-detail-view');
    if (detailEl) detailEl.scrollTop = 0;
}

function closeChallenge() {
    document.getElementById('ch-list-view').style.display='block';
    document.getElementById('ch-detail-view').classList.remove('active');
}

function chSubmitAnswer() {
    const ch=CHALLENGES.find(c=>c.id===chState.currentId); if (!ch) return;
    const raw=document.getElementById('ch-ans-input').value
        .replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)).trim();
    const val=parseFloat(raw); if (isNaN(val)) return;
    const ok=Math.abs(val-ch.answer)<0.01;
    document.getElementById('ch-ans-input').className='ch-ans-input '+(ok?'correct':'wrong');
    const rb=document.getElementById('ch-result-box');
    rb.className='ch-result-box '+(ok?'ok':'ng');
    if (ok) {
        document.getElementById('ch-result-hl').textContent='⭕ 正解！';
        document.getElementById('ch-result-msg').innerHTML=`<div>ステップ解説で解法を確認せよ。</div><button class="retry-btn" onclick="chRetry()">もう一度解く</button>`;
        recordProblemAttempt(ch.id, true);
        recordAnswer(`g${appState.grade}_ch_${ch.category}`, true);
        addStar();
        { const _k=`g${appState.grade}_ch_${ch.category}`; const _s=getStatsForKey(_k); if(_s) showAccuracyCard(ch.category, _s.correct, _s.total); }
    } else {
        document.getElementById('ch-result-hl').textContent='❌ ' + getWrongMsg();
        document.getElementById('ch-result-msg').innerHTML=`<div>ヒントまたはステップ解説で確認せよ。</div><button class="reveal-ans-btn" data-answer="${ch.answer}" data-unit="${ch.answerUnit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="chRetry()">もう一度解く</button>`;
        recordProblemAttempt(ch.id, false);
        recordAnswer(`g${appState.grade}_ch_${ch.category}`, false);
        resetStreak();
    }
    rb.style.display='block';
    document.querySelector('.ch-steps-card').style.display='block';
}

function chToggleHint() {
    chState.hintVisible=!chState.hintVisible;
    document.getElementById('ch-hint-box').style.display=chState.hintVisible?'block':'none';
    document.getElementById('ch-hint-btn').textContent=chState.hintVisible?'💡 ヒントを隠す':'💡 ヒントを見る';
}

function chToggleStep(i) {
    chState.stepOpen[i]=!chState.stepOpen[i];
    document.getElementById('ch-step-bd-'+i).classList.toggle('open',!!chState.stepOpen[i]);
    document.getElementById('ch-chev-'+i).classList.toggle('open',!!chState.stepOpen[i]);
}

function chExpandAll() {
    const ch=CHALLENGES.find(c=>c.id===chState.currentId); if (!ch) return;
    ch.explanation.forEach((_,i)=>{ chState.stepOpen[i]=true; document.getElementById('ch-step-bd-'+i).classList.add('open'); document.getElementById('ch-chev-'+i).classList.add('open'); });
}

/* ════════════════════════════════════════
   PROGRESS TRACKING
════════════════════════════════════════ */
function recordAnswer(key, correct) {
    const stats = JSON.parse(lsGet('vista_stats', '{}'));
    if (!stats[key]) stats[key] = { correct: 0, total: 0 };
    stats[key].total++;
    if (correct) stats[key].correct++;
    lsSet('vista_stats', JSON.stringify(stats));
}

function getStatsForKey(key) {
    const stats = JSON.parse(lsGet('vista_stats', '{}'));
    return stats[key] || null;
}


function getAccuracyBadge(key) {
    const s = getStatsForKey(key);
    if (!s || s.total === 0) return `<span class="acc-badge none">未挑戦</span>`;
    const pct = Math.round(s.correct / s.total * 100);
    const cls = pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low';
    return `<span class="acc-badge ${cls}">${pct}% (${s.correct}/${s.total})</span>`;
}

function getGradeCourseStats(grade, ...prefixes) {
    const stats = JSON.parse(lsGet('vista_stats', '{}'));
    let total = 0, correct = 0;
    prefixes.forEach(pfx => {
        const key = `g${grade}_${pfx}_`;
        Object.entries(stats).forEach(([k, v]) => {
            if (k.startsWith(key)) { total += v.total; correct += v.correct; }
        });
    });
    return { total, correct };
}

function renderCourseAcc(elId, grade, ...prefixes) {
    const el = document.getElementById(elId);
    if (!el) return;
    const { total, correct } = getGradeCourseStats(grade, ...prefixes);
    if (total === 0) { el.innerHTML = ''; return; }
    const pct = Math.round(correct / total * 100);
    el.innerHTML = `
        <div class="cc-acc-bar-bg"><div class="cc-acc-bar-fill" style="width:${pct}%"></div></div>
        <span class="cc-acc-pct">${pct}%</span>
        <span class="cc-acc-sub">${correct}/${total}問</span>`;
}

function renderHomeProgress() {
    const g = appState.grade;
    renderCourseAcc('std-acc-info',  g, 'std');
    renderCourseAcc('exam-acc-info', g, 'exam', 'ch');
}

/* ════════════════════════════════════════
   GAMIFICATION
════════════════════════════════════════ */
const gameState = {
    stars: Math.max(0, parseInt(lsGet('math_stars', '0'), 10) || 0),
    streak: 0,
};

const WRONG_MSGS = [
    'もう一回チャレンジ！', '惜しい！あとちょっと！',
    'ヒントを見てみよう！', '次はきっと正解！', '負けないで！ファイト！'
];

function getWrongMsg() { return WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)]; }

/* ── Per-problem attempt history ── */
function recordProblemAttempt(probId, correct) {
    const h = JSON.parse(lsGet('vista_history', '{}'));
    if (!h[probId]) h[probId] = [];
    h[probId].push(correct);
    lsSet('vista_history', JSON.stringify(h));
    // 最終学習日のタイムスタンプを別キーで記録（既存の true/false 配列構造を維持するため）
    lsSet('vista_last_ts', String(Date.now()));
    // 初回解答日を記録（未設定の場合のみ）
    if (!lsGet('vista_first_ts', '')) {
        lsSet('vista_first_ts', String(Date.now()));
    }
}
function getProblemHistory(probId) {
    return (JSON.parse(lsGet('vista_history', '{}')))[probId] || [];
}
function getAttemptDots(probId) {
    const h = getProblemHistory(probId);
    if (!h.length) return '';
    const dots = h.map(ok => `<span class="att-dot ${ok?'ok':'ng'}">${ok?'✓':'✗'}</span>`).join('');
    return `<div class="att-dots">${dots}</div>`;
}

/* ── Retry (re-attempt same problem) ── */
function stdPracRetry() {
    const inp = document.getElementById('std-prac-ans-input');
    if (inp) { inp.value = ''; inp.className = 'prac-ans-input'; inp.focus(); }
    const rb = document.getElementById('std-prac-result-box');
    if (rb) rb.style.display = 'none';
}
function pracRetry() {
    const inp = document.getElementById('prac-ans-input');
    if (inp) { inp.value = ''; inp.className = 'prac-ans-input'; inp.focus(); }
    const rb = document.getElementById('prac-result-box');
    if (rb) rb.style.display = 'none';
}
function chRetry() {
    const inp = document.getElementById('ch-ans-input');
    if (inp) { inp.value = ''; inp.className = 'ch-ans-input'; inp.focus(); }
    const rb = document.getElementById('ch-result-box');
    if (rb) { rb.style.display = 'none'; rb.className = 'ch-result-box'; }
}

function revealAnswer(btn) {
    const ans = btn.dataset.answer, unit = btn.dataset.unit || '';
    btn.outerHTML = `<div class="revealed-ans">正解: <strong>${ans}${unit}</strong></div>`;
}

function addStar() {
    gameState.stars++;
    gameState.streak++;
    lsSet('math_stars', gameState.stars);
    updateStarBadge();
    triggerStarBump();
    showFloatStar();
    if (gameState.streak >= 3) showStreakPopup();
}

function showFloatStar() {
    const badge = document.getElementById('star-counter-badge');
    const rect = badge ? badge.getBoundingClientRect() : { left: window.innerWidth - 70, top: 20, width: 60 };
    const el = document.createElement('div');
    el.className = 'star-float';
    el.textContent = '+1 ★';
    el.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    el.style.top = (rect.top + 4) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function showAccuracyCard(label, correct, total) {
    const el = document.getElementById('accuracy-card');
    if (!el) return;
    const pct = Math.round(correct / total * 100);
    el.innerHTML = `<span class="ac-label">${label}</span><span class="ac-sep">|</span><span class="ac-pct">${pct}%</span><span class="ac-frac">${correct}/${total}</span>`;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function resetStreak() { gameState.streak = 0; }

function updateStarBadge() {
    const el = document.getElementById('star-count');
    if (el) el.textContent = gameState.stars;
}

function triggerStarBump() {
    const badge = document.getElementById('star-counter-badge');
    if (!badge) return;
    badge.classList.remove('bump');
    void badge.offsetWidth; // reflow
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 400);
}


function showStreakPopup() {
    const el = document.getElementById('streak-popup');
    if (!el) return;
    el.textContent = `🔥 ${gameState.streak}問連続正解！すごい！`;
    el.classList.remove('in');
    void el.offsetWidth;
    el.classList.add('in');
    setTimeout(() => el.classList.remove('in'), 2800);
}

/* ════════════════════════════════════════
   WEAK REVIEW SCREEN
════════════════════════════════════════ */

/**
 * PRACTICE_CATS の catId から catId を演習問題へのジャンプキーとして使う。
 * vista_stats のキー形式: g{grade}_exam_{catId}
 */
function renderWeakReview() {
    const g = appState.grade;
    const container = document.getElementById('wr-body');
    if (!container) return;

    const stats   = JSON.parse(lsGet('vista_stats',   '{}'));
    const history = JSON.parse(lsGet('vista_history', '{}'));

    // 全体の解答数を集計（演習問題のみ: g{grade}_exam_*）
    let totalAnswered = 0;
    PRACTICE_CATS.forEach(cat => {
        const key = `g${g}_exam_${cat.id}`;
        if (stats[key]) totalAnswered += stats[key].total;
    });
    // history の問題数も加算（recordProblemAttempt で記録されるもの）
    const historyProbs = Object.keys(history).length;

    // データ不足判定（5問未満）
    if (totalAnswered < 5 && historyProbs < 5) {
        container.innerHTML = `
            <div class="wr-no-data">
                <div class="wr-no-data-icon">📊</div>
                <div class="wr-no-data-title">まずは問題を解いてみよう！</div>
                <div class="wr-no-data-sub">5問以上解くと、苦手分析が表示されます。<br>演習問題や難問チャレンジに挑戦してみてください。</div>
            </div>`;
        return;
    }

    const sections = [];

    // ── セクション1: 苦手カテゴリ TOP3 ──
    const catStats = PRACTICE_CATS.map(cat => {
        const key = `g${g}_exam_${cat.id}`;
        const s = stats[key];
        if (!s || s.total === 0) return null;
        const pct = Math.round(s.correct / s.total * 100);
        return { cat, correct: s.correct, total: s.total, pct };
    }).filter(Boolean);

    catStats.sort((a, b) => a.pct - b.pct);
    const weakCats = catStats.slice(0, 3);

    if (weakCats.length > 0) {
        const rows = weakCats.map((item, i) => {
            const rankClass = ['rank1','rank2','rank3'][i] || '';
            const barClass  = item.pct >= 80 ? '' : item.pct >= 50 ? 'mid' : 'low';
            return `
                <div class="wr-item">
                    <div class="wr-item-rank ${rankClass}">${i+1}</div>
                    <div class="wr-item-body">
                        <div class="wr-item-title">${item.cat.icon} ${item.cat.title}</div>
                        <div class="wr-acc-bar-wrap">
                            <div class="wr-acc-bar-bg"><div class="wr-acc-bar-fill ${barClass}" style="width:${item.pct}%"></div></div>
                            <span class="wr-acc-pct">${item.pct}%</span>
                        </div>
                        <div class="wr-item-meta">${item.correct}/${item.total}問 正解</div>
                    </div>
                    <button class="wr-review-btn" onclick="wrGoToCat('${item.cat.id}')">この分野を復習する</button>
                </div>`;
        }).join('');
        sections.push(`
            <div class="wr-section">
                <div class="wr-section-title">苦手カテゴリ TOP3</div>
                ${rows}
            </div>`);
    }

    // ── セクション2: 苦手unit TOP3 ──
    // vista_history から lessonUnit 別に正答率を集計
    const unitAccMap = {}; // unitName -> { correct, total }
    Object.entries(history).forEach(([probId, attempts]) => {
        const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
        if (!prob || !prob.lessonUnit) return;
        const unit = prob.lessonUnit;
        if (!unitAccMap[unit]) unitAccMap[unit] = { correct: 0, total: 0, catId: prob.catId };
        attempts.forEach(ok => {
            unitAccMap[unit].total++;
            if (ok) unitAccMap[unit].correct++;
        });
    });

    const unitStats = Object.entries(unitAccMap)
        .filter(([, v]) => v.total >= 3)
        .map(([name, v]) => ({ name, pct: Math.round(v.correct / v.total * 100), correct: v.correct, total: v.total, catId: v.catId }))
        .sort((a, b) => a.pct - b.pct)
        .slice(0, 3);

    if (unitStats.length > 0) {
        const rows = unitStats.map((item, i) => {
            const rankClass = ['rank1','rank2','rank3'][i] || '';
            const barClass  = item.pct >= 80 ? '' : item.pct >= 50 ? 'mid' : 'low';
            return `
                <div class="wr-item">
                    <div class="wr-item-rank ${rankClass}">${i+1}</div>
                    <div class="wr-item-body">
                        <div class="wr-item-title">${item.name}</div>
                        <div class="wr-acc-bar-wrap">
                            <div class="wr-acc-bar-bg"><div class="wr-acc-bar-fill ${barClass}" style="width:${item.pct}%"></div></div>
                            <span class="wr-acc-pct">${item.pct}%</span>
                        </div>
                        <div class="wr-item-meta">${item.correct}/${item.total}問 正解（3回以上挑戦）</div>
                    </div>
                    ${item.catId ? `<button class="wr-review-btn" onclick="wrGoToCat('${item.catId}')">復習する</button>` : ''}
                </div>`;
        }).join('');
        sections.push(`
            <div class="wr-section">
                <div class="wr-section-title">苦手単元 TOP3</div>
                ${rows}
            </div>`);
    }

    // ── セクション3: 最近間違えた問題（最大5件）──
    // history で最後の試行が false の問題を収集
    const recentWrong = [];
    Object.entries(history).forEach(([probId, attempts]) => {
        if (!attempts.length) return;
        const last = attempts[attempts.length - 1];
        if (last === false) {
            const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
            if (prob) recentWrong.push(prob);
        }
    });
    // 最大5件
    const recentWrongSlice = recentWrong.slice(0, 5);

    if (recentWrongSlice.length > 0) {
        const rows = recentWrongSlice.map(prob => {
            const cat = PRACTICE_CATS.find(c => c.id === prob.catId);
            const catName = cat ? cat.title : prob.catId || '';
            return `
                <div class="wr-wrong-item">
                    <div class="wr-wrong-badge">まちがい</div>
                    <div class="wr-wrong-body">
                        <div class="wr-wrong-title">${prob.title}</div>
                        <div class="wr-wrong-cat">${catName}${prob.lessonUnit ? ' ／ ' + prob.lessonUnit : ''}</div>
                    </div>
                </div>`;
        }).join('');
        sections.push(`
            <div class="wr-section">
                <div class="wr-section-title">最近間違えた問題</div>
                ${rows}
            </div>`);
    }

    // ── セクション4&5: おすすめ復習単元 ──
    let recommendHtml = '';
    if (weakCats.length > 0) {
        // 苦手カテゴリ TOP1 の lessonUnit の中で正答率が最も低いunitを推薦
        const top1Cat = weakCats[0];
        // top1Catの中でunitStatsから一致するものを探す
        const recommendUnit = unitStats.find(u => u.catId === top1Cat.cat.id);

        const recTitle     = recommendUnit ? recommendUnit.name : top1Cat.cat.title;
        const recSub       = recommendUnit
            ? `${top1Cat.cat.title} の中で最も苦手な単元です（正答率 ${recommendUnit.pct}%）`
            : `正答率 ${top1Cat.pct}% — 集中的に取り組みましょう`;
        const recCatId     = top1Cat.cat.id;
        recommendHtml = `
            <div class="wr-recommend">
                <div class="wr-recommend-icon">🎯</div>
                <div class="wr-recommend-body">
                    <div class="wr-recommend-label">今すぐ復習すべき単元</div>
                    <div class="wr-recommend-title">${recTitle}</div>
                    <div class="wr-recommend-sub">${recSub}</div>
                </div>
                <button class="wr-recommend-btn" onclick="wrGoToCat('${recCatId}')">復習する →</button>
            </div>`;
    } else if (catStats.length === 0) {
        // 挑戦ゼロの場合: 未挑戦カテゴリを表示
        const untriedCat = PRACTICE_CATS.find(cat => {
            const probs = PRACTICE_PROBLEMS.filter(p => p.catId === cat.id && p.grade === g);
            return probs.length > 0;
        });
        if (untriedCat) {
            recommendHtml = `
                <div class="wr-recommend">
                    <div class="wr-recommend-icon">🌱</div>
                    <div class="wr-recommend-body">
                        <div class="wr-recommend-label">まずはこの分野に挑戦</div>
                        <div class="wr-recommend-title">${untriedCat.icon} ${untriedCat.title}</div>
                        <div class="wr-recommend-sub">まだ挑戦していない分野です。最初の一歩を踏み出しましょう！</div>
                    </div>
                    <button class="wr-recommend-btn" onclick="wrGoToCat('${untriedCat.id}')">挑戦する →</button>
                </div>`;
        }
    }

    if (recommendHtml) sections.push(recommendHtml);

    container.innerHTML = sections.join('');
}

/**
 * 弱点復習から演習問題カテゴリへ遷移する
 */
function wrGoToCat(catId) {
    // showScreen('practice') は renderPractice() → pracShowCats() の順で呼ぶ。
    // pracShowCats() の後に pracOpenCat() を呼ぶことで、カテゴリ一覧をスキップして
    // 直接問題リストへ遷移する。
    pracState.currentCatId = catId;
    showScreen('practice');
    // renderPractice が同期的に pracShowCats を呼んだ後で pracOpenCat を実行する。
    pracOpenCat(catId);
}

/* ════════════════════════════════════════
   RECOMMENDED REVIEW SCREEN
════════════════════════════════════════ */

/** 遷移元を記録してから recommended-review-screen へ移動 */
function openRecommendedReview(fromScreen) {
    appState.recommendedReviewFrom = fromScreen || 'home';
    showScreen('recommended-review');
}

/** 「もどる」ボタン: 遷移元へ戻る */
function goBackFromRecommendedReview() {
    showScreen(appState.recommendedReviewFrom || 'home');
}

/**
 * おすすめ復習画面を描画する。
 *
 * 苦手判定ロジック:
 *   - vista_history の probId → PRACTICE_PROBLEMS.lessonUnit 別に試行数・正解数を集計
 *   - 試行数 >= 2 AND 正答率 < 70% → 苦手単元
 *   - 正答率昇順、同率は試行数降順でソート → TOP3
 *
 * 全体正答率:
 *   - appState.grade に一致する g{grade}_exam_* の vista_stats を全集計
 */
function renderRecommendedReview() {
    const g = appState.grade;
    const container = document.getElementById('rr-body');
    if (!container) return;

    const stats   = JSON.parse(lsGet('vista_stats',   '{}'));
    const history = JSON.parse(lsGet('vista_history', '{}'));

    // ── 全体正答率（g{grade}_exam_* キーを集計）──
    let totalCorrect = 0, totalAll = 0;
    const examPrefix = `g${g}_exam_`;
    Object.entries(stats).forEach(([k, v]) => {
        if (k.startsWith(examPrefix)) {
            totalCorrect += v.correct;
            totalAll     += v.total;
        }
    });
    const overallPct = totalAll > 0 ? Math.round(totalCorrect / totalAll * 100) : null;
    const overallHtml = `
        <div class="rr-overall">
            <div class="rr-overall-label">全体正答率</div>
            <div class="rr-overall-value">${overallPct !== null ? overallPct + '%' : '---'}</div>
            <div class="rr-overall-sub">${totalAll > 0 ? totalCorrect + '/' + totalAll + '問 正解' : 'まだ問題を解いていません'}</div>
        </div>`;

    // ── 苦手unit 判定（vista_history → lessonUnit 別集計）──
    const unitAccMap = {}; // unitName -> { correct, total, catId }
    Object.entries(history).forEach(([probId, attempts]) => {
        const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
        if (!prob || !prob.lessonUnit) return;
        const unit = prob.lessonUnit;
        if (!unitAccMap[unit]) unitAccMap[unit] = { correct: 0, total: 0, catId: prob.catId };
        attempts.forEach(ok => {
            unitAccMap[unit].total++;
            if (ok) unitAccMap[unit].correct++;
        });
    });

    // 試行数 >= 2 AND 正答率 < 70% の単元を苦手と判定
    const weakUnits = Object.entries(unitAccMap)
        .filter(([, v]) => v.total >= 2)
        .map(([name, v]) => ({
            name,
            pct:     Math.round(v.correct / v.total * 100),
            correct: v.correct,
            total:   v.total,
            catId:   v.catId,
        }))
        .filter(u => u.pct < 70)
        // 正答率昇順、同率は試行数降順
        .sort((a, b) => a.pct !== b.pct ? a.pct - b.pct : b.total - a.total)
        .slice(0, 3);

    // ── 苦手unit ごとに topicScreen を解決する ──
    //   lessonUnit → catId → PRACTICE_CATS → EXAM_UNITS_G{grade} → topicScreen
    const examUnits = g === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;

    function resolveTopicScreen(catId) {
        if (!catId) return null;
        const cat = PRACTICE_CATS.find(c => c.id === catId);
        if (!cat) return null;
        // PRACTICE_CATS の unitId{grade} プロパティで EXAM_UNITS を特定
        const unitId = g === 5 ? cat.unitId5 : cat.unitId6;
        if (!unitId) return null;
        const unit = examUnits.find(u => u.id === unitId);
        return unit && unit.topicScreen ? unit.topicScreen : null;
    }

    const sections = [overallHtml];

    // ── セクション: 苦手unit TOP3 ──
    if (weakUnits.length > 0) {
        const rows = weakUnits.map((item, i) => {
            const rankClass = ['rank1','rank2','rank3'][i] || '';
            const barClass  = item.pct >= 80 ? '' : item.pct >= 50 ? 'mid' : 'low';
            const topicScreen = resolveTopicScreen(item.catId);
            const topicBtn = topicScreen
                ? `<button class="rr-action-btn rr-topic-btn" onclick="showScreen('${topicScreen}')">トピック学習へ</button>`
                : '';
            const pracBtn = item.catId
                ? `<button class="rr-action-btn rr-prac-btn" onclick="wrGoToCat('${item.catId}')">演習問題へ</button>`
                : '';
            return `
                <div class="wr-item">
                    <div class="wr-item-rank ${rankClass}">${i + 1}</div>
                    <div class="wr-item-body">
                        <div class="wr-item-title">${item.name}</div>
                        <div class="wr-acc-bar-wrap">
                            <div class="wr-acc-bar-bg"><div class="wr-acc-bar-fill ${barClass}" style="width:${item.pct}%"></div></div>
                            <span class="wr-acc-pct">${item.pct}%</span>
                        </div>
                        <div class="wr-item-meta">${item.correct}/${item.total}問 正解</div>
                    </div>
                    <div class="rr-action-btns">
                        ${topicBtn}
                        ${pracBtn}
                    </div>
                </div>`;
        }).join('');
        sections.push(`
            <div class="wr-section">
                <div class="wr-section-title">苦手単元 TOP3</div>
                ${rows}
            </div>`);
    } else {
        // 苦手unit が 0 件: ガイダンス表示
        sections.push(`
            <div class="wr-no-data">
                <div class="wr-no-data-icon">📊</div>
                <div class="wr-no-data-title">もう少し問題を解くとおすすめ復習が表示されます</div>
                <div class="wr-no-data-sub">演習問題やトピック学習の練習問題を2問以上解くと、<br>苦手な単元を自動で見つけます。</div>
            </div>`);
    }

    // ── セクション: 最近間違えた問題（最大5件）──
    const recentWrong = [];
    Object.entries(history).forEach(([probId, attempts]) => {
        if (!attempts.length) return;
        const last = attempts[attempts.length - 1];
        if (last === false) {
            const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
            if (prob) recentWrong.push(prob);
        }
    });
    const recentWrongSlice = recentWrong.slice(0, 5);

    if (recentWrongSlice.length > 0) {
        const rows = recentWrongSlice.map(prob => {
            const cat = PRACTICE_CATS.find(c => c.id === prob.catId);
            const catName = cat ? cat.title : (prob.catId || '');
            return `
                <div class="wr-wrong-item">
                    <div class="wr-wrong-badge">まちがい</div>
                    <div class="wr-wrong-body">
                        <div class="wr-wrong-title">${prob.title}</div>
                        <div class="wr-wrong-cat">${catName}${prob.lessonUnit ? ' ／ ' + prob.lessonUnit : ''}</div>
                    </div>
                </div>`;
        }).join('');
        sections.push(`
            <div class="wr-section">
                <div class="wr-section-title">最近間違えた問題</div>
                ${rows}
            </div>`);
    }

    container.innerHTML = sections.join('');
}

/* ════════════════════════════════════════
   REPORT SCREEN
════════════════════════════════════════ */

/**
 * 保護者・塾向け簡易レポートを描画する。
 * データソース:
 *   - vista_stats  : { "g{grade}_exam_{catId}": { correct, total } }
 *   - vista_history: { probId: [true/false, ...] }
 *   - vista_last_ts: タイムスタンプ文字列（recordProblemAttempt が記録）
 */
function renderReport() {
    const g = appState.grade;
    const container = document.getElementById('rpt-body');
    if (!container) return;

    const stats    = JSON.parse(lsGet('vista_stats',   '{}'));
    const history  = JSON.parse(lsGet('vista_history', '{}'));
    const lastTs   = lsGet('vista_last_ts', '');
    const firstTs  = lsGet('vista_first_ts', '');

    // ── 全体集計 ──
    let totalCorrect = 0, totalAll = 0;
    PRACTICE_CATS.forEach(cat => {
        const key = `g${g}_exam_${cat.id}`;
        if (stats[key]) {
            totalCorrect += stats[key].correct;
            totalAll     += stats[key].total;
        }
    });
    const historyProbs = Object.keys(history).length;

    // データ不足判定（5問未満）
    const isInsufficient = totalAll < 5 && historyProbs < 5;

    // ── セクション1: 全体サマリー ──
    const overallPct = totalAll > 0 ? Math.round(totalCorrect / totalAll * 100) : 0;
    const continueDays = firstTs
        ? Math.ceil((Date.now() - Number(firstTs)) / 86400000)
        : null;
    const continueDaysStr = continueDays !== null ? `${continueDays}日` : '—';

    const summaryHtml = `
        <div class="rpt-summary">
            <div class="rpt-summary-title">学習レポート（${g}年生）</div>
            <div class="rpt-summary-grid">
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${totalAll}</div>
                    <div class="rpt-summary-label">解いた問題数</div>
                </div>
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${totalAll > 0 ? overallPct + '%' : '—'}</div>
                    <div class="rpt-summary-label">全体正答率</div>
                </div>
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${continueDaysStr}</div>
                    <div class="rpt-summary-label">学習継続日数</div>
                </div>
            </div>
        </div>`;

    if (isInsufficient) {
        container.innerHTML = summaryHtml + `
            <div class="rpt-no-data">
                <div class="rpt-no-data-icon">📊</div>
                <div class="rpt-no-data-title">まだ学習が始まったばかりです</div>
                <div class="rpt-no-data-sub">5問以上解くと、詳細なレポートが表示されます。<br>まずは気軽に問題を解いてみましょう。</div>
            </div>`;
        return;
    }

    const sections = [summaryHtml];

    // ── セクション2: カテゴリ別正答率（バーグラフ）──
    const catRows = PRACTICE_CATS.map(cat => {
        const key = `g${g}_exam_${cat.id}`;
        const s = stats[key];
        if (!s || s.total === 0) {
            return `
                <div class="rpt-cat-row">
                    <div class="rpt-cat-name">${cat.icon} ${cat.title}</div>
                    <div class="rpt-cat-bar-wrap">
                        <div class="rpt-cat-bar-bg"><div class="rpt-cat-bar-fill" style="width:0%"></div></div>
                        <span class="rpt-cat-pct rpt-cat-untried">未挑戦</span>
                    </div>
                </div>`;
        }
        const pct = Math.round(s.correct / s.total * 100);
        const barClass = pct >= 80 ? '' : pct >= 50 ? 'mid' : 'low';
        return `
            <div class="rpt-cat-row">
                <div class="rpt-cat-name">${cat.icon} ${cat.title}</div>
                <div class="rpt-cat-bar-wrap">
                    <div class="rpt-cat-bar-bg"><div class="rpt-cat-bar-fill ${barClass}" style="width:${pct}%"></div></div>
                    <span class="rpt-cat-pct">${pct}%</span>
                </div>
            </div>`;
    }).join('');

    sections.push(`
        <div class="rpt-section">
            <div class="rpt-section-title">カテゴリ別正答率</div>
            ${catRows}
        </div>`);

    // ── セクション3: 苦手単元 TOP3 (lessonUnit別) ──
    const unitAccMap = {};
    Object.entries(history).forEach(([probId, attempts]) => {
        const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
        if (!prob || !prob.lessonUnit) return;
        const unit = prob.lessonUnit;
        if (!unitAccMap[unit]) unitAccMap[unit] = { correct: 0, total: 0, catId: prob.catId };
        attempts.forEach(ok => {
            unitAccMap[unit].total++;
            if (ok) unitAccMap[unit].correct++;
        });
    });

    const weakUnits = Object.entries(unitAccMap)
        .filter(([, v]) => v.total >= 3)
        .map(([name, v]) => ({
            name,
            pct: Math.round(v.correct / v.total * 100),
            correct: v.correct,
            total: v.total,
            catId: v.catId
        }))
        .sort((a, b) => a.pct - b.pct)
        .slice(0, 3);

    let topWeakUnit = null;
    if (weakUnits.length > 0) {
        topWeakUnit = weakUnits[0];
        const weakUnitRows = weakUnits.map((item, i) => {
            const rankClass = ['rank1','rank2','rank3'][i] || '';
            return `
                <div class="rpt-weak-item">
                    <div class="rpt-weak-rank ${rankClass}">${i+1}</div>
                    <div class="rpt-weak-body">
                        <div class="rpt-weak-name">${item.name}</div>
                        <div class="rpt-weak-meta">正答率 ${item.pct}%（${item.correct}/${item.total}問 正解）</div>
                    </div>
                </div>`;
        }).join('');
        sections.push(`
            <div class="rpt-section">
                <div class="rpt-section-title">苦手単元 TOP3</div>
                ${weakUnitRows}
            </div>`);
    }

    // ── セクション4: 最近間違えた問題（最大3件）──
    const recentWrong = [];
    Object.entries(history).forEach(([probId, attempts]) => {
        if (!attempts.length) return;
        if (attempts[attempts.length - 1] === false) {
            const prob = PRACTICE_PROBLEMS.find(p => p.id === probId);
            if (prob) recentWrong.push(prob);
        }
    });
    const recentWrongSlice = recentWrong.slice(0, 5);
    if (recentWrongSlice.length > 0) {
        const wrongRows = recentWrongSlice.map(prob => {
            const cat = PRACTICE_CATS.find(c => c.id === prob.catId);
            const catName = cat ? cat.title : (prob.catId || '');
            return `
                <div class="rpt-wrong-item">
                    <div class="rpt-wrong-badge">まちがい</div>
                    <div>
                        <div class="rpt-wrong-title">${prob.title}</div>
                        <div class="rpt-wrong-cat">${catName}${prob.lessonUnit ? ' ／ ' + prob.lessonUnit : ''}</div>
                    </div>
                </div>`;
        }).join('');
        sections.push(`
            <div class="rpt-section">
                <div class="rpt-section-title">最近間違えた問題</div>
                ${wrongRows}
            </div>`);
    }

    // ── セクション5: 次に復習すべき単元（最大2件）──
    // 苦手カテゴリを正答率昇順で算出
    const catStatsArr = PRACTICE_CATS.map(cat => {
        const key = `g${g}_exam_${cat.id}`;
        const s = stats[key];
        if (!s || s.total === 0) return null;
        return { cat, pct: Math.round(s.correct / s.total * 100) };
    }).filter(Boolean).sort((a, b) => a.pct - b.pct);

    const topWeakCat = catStatsArr.length > 0 ? catStatsArr[0] : null;

    // 苦手 lessonUnit TOP2（試行数 >= 2, 正答率 < 70%）を優先
    const qualifiedWeakUnits = Object.entries(unitAccMap)
        .filter(([, v]) => v.total >= 2)
        .map(([name, v]) => ({
            name,
            pct: Math.round(v.correct / v.total * 100),
            correct: v.correct,
            total: v.total,
            catId: v.catId
        }))
        .filter(item => item.pct < 70)
        .sort((a, b) => a.pct - b.pct)
        .slice(0, 2);

    // 候補リストを作成（lessonUnit 優先、不足分をカテゴリで補完）
    const nextCandidates = [];
    qualifiedWeakUnits.forEach(u => {
        nextCandidates.push({
            title: u.name,
            sub: `${u.correct}/${u.total}問 正解（正答率 ${u.pct}%）`,
            catId: u.catId
        });
    });
    // lessonUnit が 2件に満たない場合、苦手カテゴリで補完（重複除外）
    catStatsArr.forEach(cs => {
        if (nextCandidates.length >= 2) return;
        const alreadyIncluded = nextCandidates.some(nc => nc.catId === cs.cat.id);
        if (!alreadyIncluded) {
            nextCandidates.push({
                title: `${cs.cat.icon} ${cs.cat.title}`,
                sub: `正答率 ${cs.pct}%`,
                catId: cs.cat.id
            });
        }
    });

    if (nextCandidates.length > 0) {
        const nextCards = nextCandidates.slice(0, 2).map((nc, i) => `
            <div class="rpt-next">
                <div class="rpt-next-icon">${i === 0 ? '📌' : '📎'}</div>
                <div class="rpt-next-body">
                    <div class="rpt-next-label">次に復習すべき単元</div>
                    <div class="rpt-next-title">${nc.title}</div>
                    <div class="rpt-next-sub">${nc.sub}</div>
                </div>
                ${nc.catId ? `<button class="wr-recommend-btn" onclick="wrGoToCat('${nc.catId}')">復習する →</button>` : ''}
            </div>`).join('');
        sections.push(nextCards);
    }

    // ── セクション6: 保護者向け一言コメント（ルールベース）──
    const weakCatName = topWeakCat ? topWeakCat.cat.title : (topWeakUnit ? topWeakUnit.name : '苦手分野');
    let commentText = '';
    if (overallPct >= 80) {
        commentText = `全体的によく解けています。苦手な「${weakCatName}」をさらに強化しましょう。`;
    } else if (overallPct >= 50) {
        commentText = `着実に力がついています。「${weakCatName}」の復習を集中的にやってみましょう。`;
    } else {
        commentText = `「${weakCatName}」を中心に、基本問題から丁寧に取り組みましょう。`;
    }

    sections.push(`
        <div class="rpt-comment">
            <div class="rpt-comment-label">保護者・指導者へのコメント</div>
            <div class="rpt-comment-text">${commentText}</div>
        </div>`);

    container.innerHTML = sections.join('');
}

/* ════════════════════════════════════════
   TOPIC TRIAL (体験問題)
════════════════════════════════════════ */

// トピックごとの状態管理
const trialState = {};

/**
 * 体験問題を初期化して描画する
 * @param {string} topicUnitId - 'u6-ratio' | 'u6-speed' | 'u6-special'
 */
function initTopicTrial(topicUnitId) {
    const container = document.getElementById('trial-' + topicUnitId);
    const navCard   = document.getElementById(topicUnitId + '-nav');
    if (!container) return;

    // 対象問題を difficulty 1〜2 で最大3件取得
    const problems = (typeof PRACTICE_PROBLEMS !== 'undefined' ? PRACTICE_PROBLEMS : [])
        .filter(p => p.topicUnitId === topicUnitId && p.difficulty <= 2)
        .slice(0, 3);

    if (problems.length === 0) {
        // 問題なし → セクション非表示、既存導線を表示
        container.innerHTML = '';
        if (navCard) navCard.style.display = '';
        return;
    }

    // 問題あり → 既存導線を非表示
    if (navCard) navCard.style.display = 'none';

    // 状態リセット
    trialState[topicUnitId] = {
        problems,
        current: 0,
        answered: false,
    };

    renderTrialQuestion(topicUnitId);
}

/**
 * 現在の問題を描画する
 */
function renderTrialQuestion(topicUnitId) {
    const state     = trialState[topicUnitId];
    const container = document.getElementById('trial-' + topicUnitId);
    if (!state || !container) return;

    const { problems, current } = state;
    const prob = problems[current];
    const total = problems.length;

    // 選択肢を生成（4択）
    const choices = generateChoices(prob);

    const choicesHtml = choices.map((c, i) =>
        `<button class="topic-trial-choice" data-is-correct="${c.isCorrect}" onclick="checkTrialAnswer('${topicUnitId}', ${i}, ${JSON.stringify(c.value)}, ${c.isCorrect})">${escapeHtml(c.label)}</button>`
    ).join('');

    container.innerHTML = `
        <div class="topic-trial-card">
            <div class="topic-trial-header">
                <span class="topic-trial-label">体験問題</span>
                <span class="topic-trial-counter">${current + 1} / ${total}</span>
            </div>
            <div class="topic-trial-q">${escapeHtml(prob.text)}</div>
            <div class="topic-trial-choices" id="trial-choices-${topicUnitId}">
                ${choicesHtml}
            </div>
            <div id="trial-feedback-${topicUnitId}" style="display:none"></div>
            <div id="trial-next-${topicUnitId}" style="display:none"></div>
        </div>`;
}

/**
 * 4択の選択肢を生成する
 * answer が数値の場合は前後の差分値でダミーを作成
 * answer が文字列の場合は同じ topicUnitId 内の他問題の answer からダミーを拝借
 */
function generateChoices(prob) {
    const answer = prob.answer;
    const unit   = prob.unit || '';

    let choices = [];

    if (typeof answer === 'number') {
        // 数値の場合: 正解値の 10〜30% をランダムな差分幅として使いダミーを生成
        const base = answer;
        const candidates = [];
        // 異なるランダム差分を使って候補を生成（最大10回試行）
        for (let attempt = 0; attempt < 10 && candidates.length < 6; attempt++) {
            const pct = 0.1 + Math.random() * 0.2; // 10〜30%
            const diff = Math.max(1, Math.round(Math.abs(base) * pct));
            candidates.push(base + diff);
            candidates.push(base - diff);
        }

        // 重複排除して3つ選ぶ（負値・正解値と同じ値を除外）
        const dummies = [...new Set(candidates)].filter(v => v !== base && v > 0).slice(0, 3);

        choices = [
            { value: base, label: String(base) + (unit ? unit : ''), isCorrect: true },
            ...dummies.map(d => ({ value: d, label: String(d) + (unit ? unit : ''), isCorrect: false })),
        ];
    } else {
        // 文字列・その他: 全問題から同 topicUnitId 内の answer を流用してダミーを作成
        const otherAnswers = (typeof PRACTICE_PROBLEMS !== 'undefined' ? PRACTICE_PROBLEMS : [])
            .filter(p => p.topicUnitId === prob.topicUnitId && p.answer !== answer)
            .map(p => p.answer);
        const dummies = [...new Set(otherAnswers)].slice(0, 3);
        choices = [
            { value: answer, label: String(answer) + (unit ? unit : ''), isCorrect: true },
            ...dummies.map(d => ({ value: d, label: String(d) + (unit ? unit : ''), isCorrect: false })),
        ];
    }

    // シャッフル
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices;
}

/**
 * 選択肢クリック時の正誤判定
 */
function checkTrialAnswer(topicUnitId, choiceIdx, value, isCorrect) {
    const state = trialState[topicUnitId];
    if (!state || state.answered) return;
    state.answered = true;
    state.revealedAnswer = false;

    const prob    = state.problems[state.current];
    const total   = state.problems.length;
    const isLast  = state.current >= total - 1;

    // ボタンを全て無効化し、選択したボタンをマーク
    const choicesContainer = document.getElementById('trial-choices-' + topicUnitId);
    if (choicesContainer) {
        const btns = choicesContainer.querySelectorAll('.topic-trial-choice');
        btns.forEach((btn, i) => {
            btn.disabled = true;
            if (i === choiceIdx) {
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
            }
            // 正解の場合は正解ボタンをハイライト（不正解の場合は「答えを確認する」押下後まで待つ）
            if (isCorrect && btn.dataset.isCorrect === 'true' && i !== choiceIdx) {
                btn.classList.add('correct');
            }
        });
    }

    // フィードバック表示
    const feedbackEl = document.getElementById('trial-feedback-' + topicUnitId);
    if (feedbackEl) {
        const rawSolution = prob.solution || prob.hint || '';
        const solutionHtml = escapeHtml(rawSolution).replace(/\n/g, '<br>');
        if (isCorrect) {
            feedbackEl.className = 'topic-trial-feedback ok';
            feedbackEl.innerHTML = `<b>正解！</b><br>${solutionHtml}`;
            feedbackEl.style.display = 'block';
        } else {
            // 不正解時は「もう一度考えてみよう」のみ表示。正解・解説は非表示
            feedbackEl.className = 'topic-trial-feedback ng';
            feedbackEl.innerHTML = `<b>惜しい！もう一度考えてみよう</b>`;
            feedbackEl.style.display = 'block';
        }
    }

    // 次へボタン / 演習問題へ進むボタン
    const nextEl = document.getElementById('trial-next-' + topicUnitId);
    if (nextEl) {
        const nextBtnHtml = isLast
            ? `<button class="topic-trial-next-btn" onclick="openUnitPractice('${topicUnitId}')">演習問題へ進む →</button>`
            : `<button class="topic-trial-next-btn" onclick="nextTrialQuestion('${topicUnitId}')">次の問題へ →</button>`;

        if (!isCorrect) {
            // 不正解時: 「答えを確認する」ボタンと「次の問題へ」ボタンを両方表示
            nextEl.innerHTML = `<button class="topic-trial-reveal-btn" onclick="revealTrialAnswer('${topicUnitId}')">答えを確認する</button>${nextBtnHtml}`;
        } else {
            nextEl.innerHTML = nextBtnHtml;
        }
        nextEl.style.display = 'block';
    }
}

/**
 * 不正解後に「答えを確認する」を押したときに正解・解説を表示する
 */
function revealTrialAnswer(topicUnitId) {
    const state = trialState[topicUnitId];
    if (!state || state.revealedAnswer) return;
    state.revealedAnswer = true;

    const prob = state.problems[state.current];
    const total = state.problems.length;
    const isLast = state.current >= total - 1;

    // 正解ボタンをハイライト
    const choicesContainer = document.getElementById('trial-choices-' + topicUnitId);
    if (choicesContainer) {
        choicesContainer.querySelectorAll('.topic-trial-choice').forEach(btn => {
            if (btn.dataset.isCorrect === 'true') {
                btn.classList.add('correct');
            }
        });
    }

    // 正解値・解説を表示
    const feedbackEl = document.getElementById('trial-feedback-' + topicUnitId);
    if (feedbackEl) {
        const rawSolution = prob.solution || prob.hint || '';
        const solutionHtml = escapeHtml(rawSolution).replace(/\n/g, '<br>');
        feedbackEl.innerHTML = `<b>正解は ${escapeHtml(String(prob.answer))}${escapeHtml(prob.unit || '')} です。</b><br>${solutionHtml}`;
    }

    // 「答えを確認する」ボタンを非表示にして「次の問題へ」のみ残す
    const nextEl = document.getElementById('trial-next-' + topicUnitId);
    if (nextEl) {
        if (isLast) {
            nextEl.innerHTML = `<button class="topic-trial-next-btn" onclick="openUnitPractice('${topicUnitId}')">演習問題へ進む →</button>`;
        } else {
            nextEl.innerHTML = `<button class="topic-trial-next-btn" onclick="nextTrialQuestion('${topicUnitId}')">次の問題へ →</button>`;
        }
    }
}

/**
 * 次の問題に進む
 */
function nextTrialQuestion(topicUnitId) {
    const state = trialState[topicUnitId];
    if (!state) return;
    state.current++;
    state.answered = false;
    state.revealedAnswer = false;
    renderTrialQuestion(topicUnitId);
}

/**
 * HTML エスケープ（既存に同名関数があれば不要だが安全のため定義）
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const ansInput = document.getElementById('ans-input');
    if (ansInput) ansInput.addEventListener('keydown', e => { if(e.key==='Enter') checkAnswer(); });
    const chAnsInput = document.getElementById('ch-ans-input');
    if (chAnsInput) chAnsInput.addEventListener('keydown', e => { if(e.key==='Enter') chSubmitAnswer(); });
    updateStarBadge();
});
