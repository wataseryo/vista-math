/* ════════════════════════════════════════
   LOCAL STORAGE SAFE WRAPPER
   プライベートブラウジング等でのクラッシュを防ぐ
════════════════════════════════════════ */
const appState = { grade: 5, course: 'std', previousScreen: 'std-mode' };
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
    const p = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p || p.grade !== appState.grade || p.course !== 'std') return;
    stdPracState.currentCatId = p.chapterId;
    stdPracState.currentProbId = probId;
    stdPracState.answered = false;
    const g = appState.grade;
    const chapters = g === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    const ch = chapters.find(c => c.id === p.chapterId);
    const probs = PRACTICE_PROBLEMS.filter(q => q.chapterId === stdPracState.currentCatId && q.grade === g && q.course === 'std');
    const topicScreen = VistaCatalog.problemTopic(p, g);
    const currentIdx = probs.findIndex(q => q.id === probId);
    document.getElementById('std-prac-prob-view').style.display   = 'none';
    document.getElementById('std-prac-detail-view').style.display = 'flex';
    document.getElementById('std-prac-detail-cat-label').textContent = ch ? ch.title : '';
    document.getElementById('std-prac-screen-title').textContent  = p.title;
    document.getElementById('std-prac-detail-body').innerHTML = `
        <div class="prac-detail-q">${p.text}</div>
        <div class="prac-ans-row">
            <input class="prac-ans-input" id="std-prac-ans-input" type="number" placeholder="答えを入力" />
            <span class="prac-ans-unit">${p.answerUnit}</span>
            <button class="prac-check-btn" style="background:linear-gradient(135deg,#42A5F5,#1976D2)" onclick="stdPracCheckAnswer()">答え合わせ</button>
        </div>
        <div id="std-prac-result-box" style="display:none;background:#E8F5E9;border-radius:10px;padding:12px;margin-bottom:14px;font-weight:bold;font-size:.9rem"></div>
        <div class="prac-detail-actions">
            <button class="prac-detail-btn btn-prac-sol" onclick="stdPracToggleSolution()">💡 解説を見る</button>
        </div>
        <div id="std-prac-sol-box" class="prac-sol-box" style="display:none">${p.solution || '解説を準備中です。'}</div>
        ${topicScreen ? `<div class="prac-topic-link" style="border-color:var(--std-primary)" onclick="showScreen('${topicScreen}')">
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
    if (stdPracState.answered) return;
    const p = PRACTICE_PROBLEMS.find(x => x.id === stdPracState.currentProbId);
    if (!p || p.grade !== appState.grade || p.course !== 'std') return;
    const val = parseFloat(document.getElementById('std-prac-ans-input').value);
    if (!Number.isFinite(val)) return;
    stdPracState.answered = true;
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
        rb.innerHTML = `<div>❌ ${getWrongMsg()}</div><button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.answerUnit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="stdPracRetry()">もう一度解く</button>`;
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
let activeExpandVisualReset = null;

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
        const probs  = PRACTICE_PROBLEMS.filter(p => p.catId === cat.id && p.grade === g && p.course === 'exam');
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
    const probs = PRACTICE_PROBLEMS.filter(p => p.catId === catId && p.grade === appState.grade && p.course === 'exam');
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
    const p   = PRACTICE_PROBLEMS.find(x => x.id === probId);
    if (!p || p.grade !== appState.grade || p.course !== 'exam') return;
    pracState.currentCatId = p.catId;
    pracState.currentProbId = probId;
    pracState.answered = false;
    const cat = PRACTICE_CATS.find(c => c.id === p.catId);
    if (!cat) { console.warn('pracOpenProb: cat not found for', p.catId); return; }
    const unitId = appState.grade === 5 ? cat.unitId5 : cat.unitId6;
    const units  = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const unit   = units.find(u => u.id === unitId);
    const probs  = PRACTICE_PROBLEMS.filter(q => q.catId === pracState.currentCatId && q.grade === appState.grade && q.course === 'exam');
    const currentIdx = probs.findIndex(q => q.id === probId);

    document.getElementById('prac-prob-view').style.display   = 'none';
    document.getElementById('prac-detail-view').style.display = 'flex';
    document.getElementById('prac-detail-cat-label').textContent = cat ? cat.title : '';
    document.getElementById('prac-screen-title').textContent  = (currentIdx >= 0 ? `問${currentIdx + 1} ` : '') + p.title;

    const topicScreen = VistaCatalog.problemTopic(p, appState.grade);
    const body = document.getElementById('prac-detail-body');
    body.innerHTML = `
        <div class="prac-detail-q">${p.text}</div>
        ${renderProblemDiagram(p)}
        <div class="prac-ans-row">
            <input class="prac-ans-input" id="prac-ans-input" type="number" placeholder="答えを入力" />
            <span class="prac-ans-unit">${p.answerUnit}</span>
            <button class="prac-check-btn" onclick="pracCheckAnswer()">答え合わせ</button>
        </div>
        <div id="prac-result-box" style="display:none;background:#E8F5E9;border-radius:10px;padding:12px;margin-bottom:14px;font-weight:bold;font-size:.9rem"></div>
        <div id="prac-steps-card" class="prac-steps-card">
            <div class="prac-steps-hd">
                <div class="prac-steps-title">📝 ステップ解説</div>
            </div>
            ${renderSolutionSteps(p.solution)}
        </div>
        ${topicScreen ? `<div class="prac-topic-link" onclick="pracGoToTopic('${unitId}')">
            <div class="prac-topic-link-body">
                <div class="prac-topic-link-title">${unit.num} ${unit.title}</div>
                <div class="prac-topic-link-sub">ステップ解説でじっくり学ぼう →</div>
            </div>
        </div>` : ''}
    `;
    wirePlaneExpandVisual(p);
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
    const probs = PRACTICE_PROBLEMS.filter(p => p.catId === pracState.currentCatId && p.grade === appState.grade && p.course === 'exam');
    const idx = probs.findIndex(p => p.id === pracState.currentProbId);
    if (idx + 1 < probs.length) pracOpenProb(probs[idx + 1].id);
    else pracShowCats();
}

function pracCheckAnswer() {
    if (pracState.answered) return;
    const p = PRACTICE_PROBLEMS.find(x => x.id === pracState.currentProbId);
    if (!p || p.grade !== appState.grade || p.course !== 'exam') return;
    const val = parseFloat(document.getElementById('prac-ans-input').value);
    if (!Number.isFinite(val)) return;
    pracState.answered = true;
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
        rb.innerHTML = `<div>❌ ${getWrongMsg()}</div><button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.answerUnit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="pracRetry()">もう一度解く</button>`;
        recordProblemAttempt(pid, false);
        recordAnswer(`g${appState.grade}_exam_${pracState.currentCatId}`, false);
        resetStreak();
    }
    const stepsCard = document.getElementById('prac-steps-card');
    if (stepsCard) stepsCard.style.display = 'block';
}

function pracToggleSolution() {
    const card = document.getElementById('prac-steps-card');
    if (card) card.style.display = card.style.display === 'none' ? 'block' : 'none';
}

function parseSolutionToSteps(solution) {
    if (!solution) return [];
    const parts = solution.split(/(【[^】]+】)/);
    const steps = [];
    let pending = '';
    for (let i = 0; i < parts.length; i++) {
        if (/^【[^】]+】$/.test(parts[i])) {
            if (pending.trim()) steps.push({ title: null, body: pending.trim() });
            pending = '';
            const title = parts[i].replace(/[【】]/g, '').trim();
            const body = (parts[i + 1] || '').trim();
            if (title || body) steps.push({ title, body });
            i++;
        } else {
            pending += parts[i];
        }
    }
    if (pending.trim()) steps.push({ title: null, body: pending.trim() });
    return steps;
}

function renderSolutionSteps(solution) {
    const steps = parseSolutionToSteps(solution);
    if (steps.length === 0) return `<div style="color:#888;font-size:.85rem">解説を準備中です。</div>`;
    return steps.map((s, i) => `
        <div class="prac-step">
            ${s.title ? `<div class="prac-step-hd">
                <div class="prac-step-num">${i + 1}</div>
                <div class="prac-step-name">${escapeHtml(s.title)}</div>
            </div>` : ''}
            <div class="prac-step-bd">
                <div class="prac-step-text">${escapeHtml(s.body).replace(/\n/g, '<br>')}</div>
            </div>
        </div>`).join('');
}

// 【広げてみよう】に添える切り貼り/回転デモ。問題の answer・解説文には触れない。
function wireCutVisual(prefix) {
    const seqCut = createTopicSequence();
    const piece = document.getElementById(prefix + '-piece');
    const cutline = document.getElementById(prefix + '-cutline');
    const rect = document.getElementById(prefix + '-rect');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqCut.cancel();
        piece.classList.remove('cut', 'moved');
        cutline.toggleAttribute('hidden', true);
        rect.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const cut = () => { cutline.toggleAttribute('hidden', false); piece.classList.add('cut'); status.textContent = '① 切り取る線に沿って、はみ出した三角形を切り出す。'; };
        const move = () => { piece.classList.add('moved'); status.textContent = '② 切った三角形を反対側へ動かす。'; };
        const done = () => { rect.toggleAttribute('hidden', false); result.classList.add('visible'); status.textContent = '③ ぴったりはまって長方形になった。'; };
        if (topicReducedMotion()) { cut(); move(); done(); return; }
        cut();
        seqCut.after(700, move);
        seqCut.after(1500, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireRotateVisual(prefix) {
    const seqRot = createTopicSequence();
    const dup = document.getElementById(prefix + '-dup');
    const pivot = document.getElementById(prefix + '-pivot');
    const para = document.getElementById(prefix + '-para');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqRot.cancel();
        dup.classList.remove('rotated');
        dup.toggleAttribute('hidden', true);
        pivot.toggleAttribute('hidden', true);
        para.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const show = () => { dup.toggleAttribute('hidden', false); pivot.toggleAttribute('hidden', false); status.textContent = '① 同じ形をもう1つ重ねて用意する。'; };
        const rotate = () => { dup.classList.add('rotated'); status.textContent = '② 印をつけた点を中心に180°回転させる。'; };
        const done = () => { para.toggleAttribute('hidden', false); result.classList.add('visible'); status.textContent = '③ ぴったりはまって平行四辺形になった。'; };
        if (topicReducedMotion()) { show(); rotate(); done(); return; }
        show();
        seqRot.after(500, rotate);
        seqRot.after(1400, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireSubtractVisual(prefix) {
    const seqSub = createTopicSequence();
    const part = document.getElementById(prefix + '-part');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqSub.cancel();
        part.classList.remove('highlight', 'removed');
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const highlight = () => { part.classList.add('highlight'); status.textContent = '① 欠けている部分を見つける。'; };
        const remove = () => { part.classList.add('removed'); status.textContent = '② 全体から、その部分を引く。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ 残りの面積が求まった。'; };
        if (topicReducedMotion()) { highlight(); remove(); done(); return; }
        highlight();
        seqSub.after(700, remove);
        seqSub.after(1400, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireDiagonalVisual(prefix) {
    const seqDi = createTopicSequence();
    const dup = document.getElementById(prefix + '-dup');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqDi.cancel();
        dup.classList.remove('rotated');
        dup.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const show = () => { dup.toggleAttribute('hidden', false); status.textContent = '① 片方の三角形を重ねて用意する。'; };
        const rotate = () => { dup.classList.add('rotated'); status.textContent = '② 交点を中心に180°回転させる。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ ぴったり重なった → 面積が等しい。'; };
        if (topicReducedMotion()) { show(); rotate(); done(); return; }
        show();
        seqDi.after(600, rotate);
        seqDi.after(1500, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireHeightRatioVisual(prefix) {
    const seqHr = createTopicSequence();
    const guide = document.getElementById(prefix + '-guide');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqHr.cancel();
        guide.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const show = () => { guide.toggleAttribute('hidden', false); status.textContent = '① 2つの三角形は、同じ高さを共有している。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '② 底辺の比がそのまま面積の比になる。'; };
        if (topicReducedMotion()) { show(); done(); return; }
        show();
        seqHr.after(900, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireComposeVisual(prefix, labelA, labelB) {
    const seqCo = createTopicSequence();
    const partA = document.getElementById(prefix + '-a');
    const partB = document.getElementById(prefix + '-b');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqCo.cancel();
        partA.classList.remove('on');
        partB.classList.remove('on');
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const a = () => { partA.classList.add('on'); status.textContent = `① まず${labelA || '1つめ'}の部分。`; };
        const b = () => { partB.classList.add('on'); status.textContent = `② 次に${labelB || '2つめ'}の部分。`; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ 2つを足して全体の面積。'; };
        if (topicReducedMotion()) { a(); b(); done(); return; }
        a();
        seqCo.after(700, b);
        seqCo.after(1400, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireMergeVisual(prefix) {
    const seqMg = createTopicSequence();
    const partA = document.getElementById(prefix + '-a');
    const partB = document.getElementById(prefix + '-b');
    const divider = document.getElementById(prefix + '-divider');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqMg.cancel();
        partA.classList.remove('merged');
        partB.classList.remove('merged');
        divider.classList.remove('fade-out');
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const show = () => { status.textContent = '① 内側の線が、2つの三角形の境目。'; };
        const merge = () => { partA.classList.add('merged'); partB.classList.add('merged'); divider.classList.add('fade-out'); status.textContent = '② 境目を消すと、頂点を共有する1つの三角形に見える。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ 底辺を合わせて1回で計算できる。'; };
        if (topicReducedMotion()) { show(); merge(); done(); return; }
        show();
        seqMg.after(700, merge);
        seqMg.after(1500, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireSqueezeVisual(prefix) {
    const seqSq = createTopicSequence();
    const shape = document.getElementById(prefix + '-para');
    const labelBefore = document.getElementById(prefix + '-label-before');
    const labelAfter = document.getElementById(prefix + '-label-after');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqSq.cancel();
        shape.classList.remove('squeezed');
        labelBefore.toggleAttribute('hidden', false);
        labelAfter.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const squeeze = () => { shape.classList.add('squeezed'); labelBefore.toggleAttribute('hidden', true); labelAfter.toggleAttribute('hidden', false); status.textContent = '① 底辺を変えずに、高さだけを低くする。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '② 三角形と同じ面積になった。'; };
        if (topicReducedMotion()) { squeeze(); done(); return; }
        squeeze();
        seqSq.after(900, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireSplitVisual(prefix) {
    const seqSp = createTopicSequence();
    const line = document.getElementById(prefix + '-cevian');
    const half1 = document.getElementById(prefix + '-half1');
    const half2 = document.getElementById(prefix + '-half2');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqSp.cancel();
        line.toggleAttribute('hidden', true);
        half1.classList.remove('on');
        half2.classList.remove('on');
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const split = () => { line.toggleAttribute('hidden', false); status.textContent = '① 底辺の真ん中から頂点へ線を引いて2つに分ける。'; };
        const highlight = () => { half1.classList.add('on'); half2.classList.add('on'); status.textContent = '② どちらもBと同じ底辺・同じ高さ。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ 2つ分で面積も2倍。'; };
        if (topicReducedMotion()) { split(); highlight(); done(); return; }
        split();
        seqSp.after(700, highlight);
        seqSp.after(1400, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireSequentialReveal(prefix, total, doneStatus) {
    const seqRv = createTopicSequence();
    const cells = Array.from({ length: total }, (_, i) => document.getElementById(prefix + '-cell-' + i));
    const counter = document.getElementById(prefix + '-count');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqRv.cancel();
        cells.forEach(c => c.classList.remove('shown'));
        counter.textContent = '0 / ' + total;
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        if (topicReducedMotion()) {
            cells.forEach(c => c.classList.add('shown'));
            counter.textContent = total + ' / ' + total;
            result.classList.add('visible');
            status.textContent = doneStatus;
            return;
        }
        cells.forEach((c, i) => {
            seqRv.after(150 * (i + 1), () => { c.classList.add('shown'); counter.textContent = (i + 1) + ' / ' + total; });
        });
        seqRv.after(150 * total + 500, () => { result.classList.add('visible'); status.textContent = doneStatus; });
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
function wireAngleRevealVisual(prefix) {
    const seqAn = createTopicSequence();
    const guide = document.getElementById(prefix + '-guide');
    const labels = document.getElementById(prefix + '-labels');
    const status = document.getElementById(prefix + '-status');
    const result = document.getElementById(prefix + '-result');
    const play = document.getElementById(prefix + '-play');
    const resetBtn = document.getElementById(prefix + '-reset');
    const initialStatus = status.textContent;
    function reset() {
        seqAn.cancel();
        guide.toggleAttribute('hidden', true);
        labels.toggleAttribute('hidden', true);
        result.classList.remove('visible');
        status.textContent = initialStatus;
        play.disabled = false;
    }
    function playFn() {
        reset();
        play.disabled = true;
        const show = () => { guide.toggleAttribute('hidden', false); status.textContent = '① 曲がり角を通る平行な補助線を引く。'; };
        const split = () => { labels.toggleAttribute('hidden', false); status.textContent = '② 錯角で50°と35°に分かれる。'; };
        const done = () => { result.classList.add('visible'); status.textContent = '③ 50＋35＝85°。'; };
        if (topicReducedMotion()) { show(); split(); done(); return; }
        show();
        seqAn.after(600, split);
        seqAn.after(1300, done);
    }
    play.addEventListener('click', playFn);
    resetBtn.addEventListener('click', reset);
    return reset;
}
const PLANE_EXPAND_VISUALS = {
    'parallelogram-cut': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 360 210" style="width:100%;max-width:320px;display:block" role="img" aria-labelledby="pe-pc-title pe-pc-desc">
                <title id="pe-pc-title">平行四辺形を切り貼りして長方形にする図</title>
                <desc id="pe-pc-desc">左端の三角形を切り取り右へ動かすと、底辺×高さの長方形になる。</desc>
                <polygon points="100,160 260,160 300,40 100,40" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
                <g id="pe-pc-piece" class="plane-expand-piece" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"><polygon points="60,160 100,40 100,160"/></g>
                <g id="pe-pc-cutline" hidden><line x1="100" y1="40" x2="100" y2="160" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"/></g>
                <g id="pe-pc-rect" hidden fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"><polygon points="100,160 300,160 300,40 100,40"/></g>
                <g font-size="13" fill="#666">
                    <text x="180" y="186" text-anchor="middle">底辺${d.base}cm</text>
                    <text x="318" y="104" text-anchor="middle" transform="rotate(-90 318 104)">高さ${d.height}cm</text>
                </g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-pc-play">切ってみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-pc-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-pc-status" role="status" aria-live="polite">まだ切っていない。両端が斜めのままだと、公式がそのまま使えるか分かりにくい。</div>
            <div class="formula-reveal" id="pe-pc-result">長方形になった → ${d.base}×${d.height}＝${d.area}cm²</div>
        </div>`,
        wire: () => wireCutVisual('pe-pc'),
    }),
    'triangle-rotate': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 340 210" style="width:100%;max-width:320px;display:block" role="img" aria-labelledby="pe-tr-title pe-tr-desc">
                <title id="pe-tr-title">三角形をもう1つ回転させて平行四辺形にする図</title>
                <desc id="pe-tr-desc">同じ三角形を180度回転させて組み合わせると、底辺と高さが同じ平行四辺形になる。</desc>
                <polygon points="120,160 280,160 200,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <g id="pe-tr-dup" class="plane-expand-dup" hidden style="transform-origin:160px 100px" fill="#FFE0B2" stroke="#E65100" stroke-width="2" stroke-dasharray="5 4"><polygon points="120,160 280,160 200,40"/></g>
                <circle id="pe-tr-pivot" cx="160" cy="100" r="3" fill="#7c3aed" hidden/>
                <g id="pe-tr-para" hidden fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"><polygon points="280,160 200,40 40,40 120,160"/></g>
                <g font-size="13" fill="#666">
                    <text x="200" y="186" text-anchor="middle">底辺${d.base}cm</text>
                    <text x="300" y="100" text-anchor="middle" transform="rotate(-90 300 100)">高さ${d.height}cm</text>
                </g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-tr-play">回転してみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-tr-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-tr-status" role="status" aria-live="polite">三角形1つだけだと、なぜ÷2なのか見えにくい。</div>
            <div class="formula-reveal" id="pe-tr-result">平行四辺形になった → ${d.base}×${d.height}＝${d.base * d.height}cm²（半分で${d.area}cm²）</div>
        </div>`,
        wire: () => wireRotateVisual('pe-tr'),
    }),
    'trapezoid-rotate': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 400 210" style="width:100%;max-width:320px;display:block" role="img" aria-labelledby="pe-zr-title pe-zr-desc">
                <title id="pe-zr-title">台形をもう1つ回転させて平行四辺形にする図</title>
                <desc id="pe-zr-desc">同じ台形を180度回転させて組み合わせると、底辺が上底と下底の和、高さが同じ平行四辺形になる。</desc>
                <polygon points="170,160 350,160 310,40 210,40" fill="#FFB74D" stroke="#E65100" stroke-width="2"/>
                <g id="pe-zr-dup" class="plane-expand-dup" hidden style="transform-origin:190px 100px" fill="#90CAF9" stroke="#1565C0" stroke-width="2" stroke-dasharray="5 4"><polygon points="170,160 350,160 310,40 210,40"/></g>
                <circle id="pe-zr-pivot" cx="190" cy="100" r="3" fill="#7c3aed" hidden/>
                <g id="pe-zr-para" hidden fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"><polygon points="350,160 310,40 30,40 70,160"/></g>
                <g font-size="12" fill="#666">
                    <text x="260" y="34" text-anchor="middle">上底${d.upper}cm</text>
                    <text x="260" y="186" text-anchor="middle">下底${d.lower}cm</text>
                    <text x="372" y="100" text-anchor="middle" transform="rotate(-90 372 100)">高さ${d.height}cm</text>
                </g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-zr-play">回転してみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-zr-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-zr-status" role="status" aria-live="polite">台形1つだけだと、三角形の公式とのつながりが見えにくい。</div>
            <div class="formula-reveal" id="pe-zr-result">平行四辺形になった → (${d.upper}＋${d.lower})×${d.height}＝${(d.upper + d.lower) * d.height}cm²（半分で${d.area}cm²）</div>
        </div>`,
        wire: () => wireRotateVisual('pe-zr'),
    }),
    'subtract-triangle': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 300 235" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-s6-title pe-s6-desc">
                <title id="pe-s6-title">長方形から三角形の部分を取り除く図</title>
                <desc id="pe-s6-desc">長方形全体から、角の三角形を取り除くと残りの面積になる。</desc>
                <polygon points="80,115 80,35 208,35 208,195 144,195" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
                <polygon id="pe-s6-part" class="plane-expand-part" points="80,195 144,195 80,115" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-s6-play">取り除いてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-s6-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-s6-status" role="status" aria-live="polite">今は長方形全体に見える。どこが三角形の部分か分かりにくい。</div>
            <div class="formula-reveal" id="pe-s6-result">${d.resultText}</div>
        </div>`,
        wire: () => wireSubtractVisual('pe-s6'),
    }),
    'subtract-rect': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 300 220" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-s7-title pe-s7-desc">
                <title id="pe-s7-title">長方形から角の長方形を取り除くL字型の図</title>
                <desc id="pe-s7-desc">大きい長方形から、角の小さい長方形を取り除くとL字型になる。</desc>
                <polygon points="60,40 156,40 156,88 220,88 220,168 60,168" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
                <rect id="pe-s7-part" class="plane-expand-part" x="156" y="40" width="64" height="48" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-s7-play">取り除いてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-s7-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-s7-status" role="status" aria-live="polite">今は大きい長方形に見える。どこが切り取られた部分か分かりにくい。</div>
            <div class="formula-reveal" id="pe-s7-result">${d.resultText}</div>
        </div>`,
        wire: () => wireSubtractVisual('pe-s7'),
    }),
    'diagonal-rotate': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 320 210" style="width:100%;max-width:300px;display:block" role="img" aria-labelledby="pe-dg-title pe-dg-desc">
                <title id="pe-dg-title">対角線で分けた三角形を回転して重ねる図</title>
                <desc id="pe-dg-desc">三角形ABDを対角線の中点を軸に180度回転させると、三角形CBDにぴったり重なる。</desc>
                <polygon points="100,72 60,168 220,168 260,72" fill="none" stroke="#555" stroke-width="1.5"/>
                <polygon points="220,168 260,72 60,168" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <polygon points="100,72 60,168 260,72" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <g id="pe-dg-dup" class="plane-expand-dup" hidden style="transform-origin:160px 120px" fill="#FFE082" stroke="#F57F17" stroke-width="2" stroke-dasharray="5 4"><polygon points="100,72 60,168 260,72"/></g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-dg-play">回転してみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-dg-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-dg-status" role="status" aria-live="polite">三角形ABDと三角形CBDの面積が等しいかは、見ただけでは分かりにくい。</div>
            <div class="formula-reveal" id="pe-dg-result">ぴったり重なった → 三角形ABD＝三角形CBD＝${d.halfArea}cm²</div>
        </div>`,
        wire: () => wireDiagonalVisual('pe-dg'),
    }),
    'diagonal-quarter': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 320 220" style="width:100%;max-width:300px;display:block" role="img" aria-labelledby="pe-dq-title pe-dq-desc">
                <title id="pe-dq-title">対角線2本で分けた三角形を回転して重ねる図</title>
                <desc id="pe-dq-desc">三角形OABを交点Oを軸に180度回転させると、三角形OCDにぴったり重なる。</desc>
                <polygon points="160,104 60,168 100,40" fill="#E0E0E0" stroke="#9E9E9E" stroke-width="1.5"/>
                <polygon points="160,104 260,40 220,168" fill="#E0E0E0" stroke="#9E9E9E" stroke-width="1.5"/>
                <polygon points="160,104 220,168 60,168" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <polygon points="160,104 100,40 260,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <g id="pe-dq-dup" class="plane-expand-dup" hidden style="transform-origin:160px 104px" fill="#FFE082" stroke="#F57F17" stroke-width="2" stroke-dasharray="5 4"><polygon points="160,104 100,40 260,40"/></g>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-dq-play">回転してみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-dq-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-dq-status" role="status" aria-live="polite">4つの三角形の面積が等しいかは、見ただけでは分かりにくい。</div>
            <div class="formula-reveal" id="pe-dq-result">ぴったり重なった → OAB＝OCD、2つで全体の${d.pairPercent}%</div>
        </div>`,
        wire: () => wireDiagonalVisual('pe-dq'),
    }),
    'same-height-ratio': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 290 225" style="width:100%;max-width:280px;display:block" role="img" aria-labelledby="pe-hr-title pe-hr-desc">
                <title id="pe-hr-title">補助線で分けた2つの三角形が高さを共有する図</title>
                <desc id="pe-hr-desc">底辺を3:1に分けた2つの三角形は、同じ高さを共有している。</desc>
                <polygon points="40,168 184,168 184,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <polygon points="184,168 232,168 184,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <line id="pe-hr-guide" hidden x1="184" y1="40" x2="184" y2="168" stroke="#7c3aed" stroke-width="3"/>
                <text x="112" y="186" font-size="13" fill="#F57F17" text-anchor="middle" font-weight="bold">3</text>
                <text x="208" y="186" font-size="13" fill="#1565C0" text-anchor="middle" font-weight="bold">1</text>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-hr-play">確かめてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-hr-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-hr-status" role="status" aria-live="polite">底辺の比は3:1。でも面積の比が同じかどうかは、見ただけでは分かりにくい。</div>
            <div class="formula-reveal" id="pe-hr-result">高さが共通 → 面積の比も3:1 → 大きい方は${d.bigArea}cm²</div>
        </div>`,
        wire: () => wireHeightRatioVisual('pe-hr'),
    }),
    'compose-add': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 400 225" style="width:100%;max-width:320px;display:block" role="img" aria-labelledby="pe-co-title pe-co-desc">
                <title id="pe-co-title">三角形と台形に分けて面積を足す図</title>
                <desc id="pe-co-desc">複合図形を三角形と台形に分けて、それぞれの面積を足す。</desc>
                <polygon id="pe-co-a" class="plane-expand-emphasis" points="40,180 236,180 236,54" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
                <polygon id="pe-co-b" class="plane-expand-emphasis" points="236,54 278,54 334,180 236,180" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-co-play">分けてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-co-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-co-status" role="status" aria-live="polite">三角形と台形、それぞれの面積は分かるけど、どう組み合わさっているか見えにくい。</div>
            <div class="formula-reveal" id="pe-co-result">${d.resultText}</div>
        </div>`,
        wire: () => wireComposeVisual('pe-co', '三角形', '台形'),
    }),
    'merge-triangles': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 280 200" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-mt-title pe-mt-desc">
                <title id="pe-mt-title">2つの三角形が1つの三角形になる図</title>
                <desc id="pe-mt-desc">同じ頂点を共有し底辺が一直線に並ぶ2つの三角形は、底辺を合わせた1つの三角形として見られる。</desc>
                <polygon id="pe-mt-a" class="plane-expand-merge" points="40,150 160,150 160,78" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
                <polygon id="pe-mt-b" class="plane-expand-merge" points="160,150 208,150 160,78" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <line id="pe-mt-divider" class="plane-expand-divider" x1="160" y1="150" x2="160" y2="78" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="6 5"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-mt-play">境目を消してみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-mt-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-mt-status" role="status" aria-live="polite">2つの三角形に分けて見えるが、本当に分ける必要があるかは分かりにくい。</div>
            <div class="formula-reveal" id="pe-mt-result">1つの三角形として → ${d.base1}＋${d.base2}＝${d.base1 + d.base2}cm、${d.base1 + d.base2}×${d.height}÷2＝${d.area}cm²</div>
        </div>`,
        wire: () => wireMergeVisual('pe-mt'),
    }),
    'inverse-proportion': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 400 220" style="width:100%;max-width:340px;display:block" role="img" aria-labelledby="pe-ip-title pe-ip-desc">
                <title id="pe-ip-title">平行四辺形の高さを縮めて三角形と同じ面積にする図</title>
                <desc id="pe-ip-desc">底辺を変えずに平行四辺形の高さを半分にすると、三角形と同じ面積になる。</desc>
                <polygon points="40,160 160,160 100,70" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <text x="100" y="135" font-size="13" fill="#1a1a2e" text-anchor="middle" font-weight="bold">${d.target}cm²</text>
                <polygon id="pe-ip-para" class="plane-expand-squeeze" style="transform-origin:280px 160px" points="220,160 340,160 360,70 240,70" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <text id="pe-ip-label-before" x="280" y="200" font-size="13" fill="#555" text-anchor="middle">8×6＝${d.highlightBase * 6}cm²</text>
                <text id="pe-ip-label-after" x="280" y="200" font-size="13" fill="#1B5E20" text-anchor="middle" font-weight="bold" hidden>${d.highlightBase}×${d.highlightHeight}＝${d.target}cm²</text>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-ip-play">高さを縮めてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-ip-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-ip-status" role="status" aria-live="polite">平行四辺形の高さがいくつなら、三角形と同じ面積になるか見えにくい。</div>
            <div class="formula-reveal" id="pe-ip-result">高さ${d.highlightHeight}cmにすると${d.target}cm²になる → 三角形と同じ</div>
        </div>`,
        wire: () => wireSqueezeVisual('pe-ip'),
    }),
    'base-ratio-split': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 300 170" style="width:100%;max-width:280px;display:block" role="img" aria-labelledby="pe-bs-title pe-bs-desc">
                <title id="pe-bs-title">三角形Aを2つに分けて三角形Bと見比べる図</title>
                <desc id="pe-bs-desc">底辺が2倍の三角形Aは、底辺の真ん中から頂点に線を引くと、三角形Bと同じ三角形2つに分かれる。</desc>
                <polygon points="40,130 100,130 70,40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                <polygon id="pe-bs-half1" class="plane-expand-emphasis" points="140,130 200,130 200,40" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <polygon id="pe-bs-half2" class="plane-expand-emphasis" points="200,130 260,130 200,40" fill="#FFCCBC" stroke="#D84315" stroke-width="2"/>
                <line id="pe-bs-cevian" hidden x1="200" y1="40" x2="200" y2="130" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="6 5"/>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-bs-play">分けてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-bs-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-bs-status" role="status" aria-live="polite">三角形Aと三角形Bの面積が、本当に2倍の関係か見えにくい。</div>
            <div class="formula-reveal" id="pe-bs-result">Aの半分＝Bと同じ → ${d.areaB}×2＝${d.areaA}cm²</div>
        </div>`,
        wire: () => wireSplitVisual('pe-bs'),
    }),
    'similarity-tiles': d => {
        const cells = Array.from({ length: 9 }, (_, i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const x = 120 + col * 40, y = 20 + row * 40;
            return `<rect id="pe-st-cell-${i}" class="plane-expand-tile" x="${x + 2}" y="${y + 2}" width="36" height="36" fill="#90CAF9" stroke="#1565C0" stroke-width="1.5"/>`;
        }).join('');
        return {
            html: `<div class="plane-expand-stage">
                <svg viewBox="0 0 280 170" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-st-title pe-st-desc">
                    <title id="pe-st-title">小さい正方形を並べて大きい正方形を作る図</title>
                    <desc id="pe-st-desc">小さい正方形を縦3個横3個、合計9個並べると大きい正方形になる。</desc>
                    <rect x="40" y="100" width="40" height="40" fill="#90CAF9" stroke="#1565C0" stroke-width="2"/>
                    <text x="60" y="124" font-size="11" fill="#1a1a2e" text-anchor="middle" font-weight="bold">${d.smallArea}cm²</text>
                    <rect x="120" y="20" width="120" height="120" fill="none" stroke="#F57F17" stroke-width="2" stroke-dasharray="5 4"/>
                    ${cells}
                    <text id="pe-st-count" x="180" y="156" font-size="13" fill="#555" text-anchor="middle" font-weight="bold">0 / 9</text>
                </svg>
                <div class="plane-expand-actions">
                    <button type="button" class="plane-anim-btn play" id="pe-st-play">並べてみる</button>
                    <button type="button" class="plane-anim-btn reset" id="pe-st-reset">もう一度</button>
                </div>
                <div class="plane-expand-status" id="pe-st-status" role="status" aria-live="polite">大きい正方形が、小さい正方形の何個分かは見ただけでは分かりにくい。</div>
                <div class="formula-reveal" id="pe-st-result">9個分 → ${d.smallArea}×9＝${d.bigArea}cm²</div>
            </div>`,
            wire: () => wireSequentialReveal('pe-st', 9, '9個分で大きい正方形になった。'),
        };
    },
    'angle-reveal': d => ({
        html: `<div class="plane-expand-stage">
            <svg viewBox="0 0 220 170" style="width:100%;max-width:260px;display:block" role="img" aria-labelledby="pe-an-title pe-an-desc">
                <title id="pe-an-title">平行線にはさまれた折れ角に補助線を引く図</title>
                <desc id="pe-an-desc">曲がり角を通る平行な補助線を引くと、角は錯角の50度と35度に分かれる。</desc>
                <line x1="10" y1="30" x2="210" y2="30" stroke="#1a1a2e" stroke-width="2"/>
                <line x1="10" y1="140" x2="210" y2="140" stroke="#1a1a2e" stroke-width="2"/>
                <polyline points="60,30 130,85 70,140" fill="none" stroke="#1565C0" stroke-width="3"/>
                <line id="pe-an-guide" hidden x1="70" y1="85" x2="190" y2="85" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"/>
                <g id="pe-an-labels" hidden font-size="13" font-weight="bold">
                    <text x="150" y="80" fill="#1565C0">50°</text>
                    <text x="150" y="100" fill="#E65100">35°</text>
                </g>
                <text x="30" y="46" font-size="12" fill="#555">${d.angle1}°</text>
                <text x="32" y="132" font-size="12" fill="#555">${d.angle2}°</text>
                <text x="134" y="82" font-size="14" fill="#E53935" font-weight="bold">x</text>
            </svg>
            <div class="plane-expand-actions">
                <button type="button" class="plane-anim-btn play" id="pe-an-play">補助線を引いてみる</button>
                <button type="button" class="plane-anim-btn reset" id="pe-an-reset">もう一度</button>
            </div>
            <div class="plane-expand-status" id="pe-an-status" role="status" aria-live="polite">補助線がないと、角xに使える角が見つからない。</div>
            <div class="formula-reveal" id="pe-an-result">補助線で分かれた ${d.angle1}°＋${d.angle2}°＝${d.total}°</div>
        </div>`,
        wire: () => wireAngleRevealVisual('pe-an'),
    }),
    'exterior-angle-circle': d => {
        const pts = [[100,30],[149.5,50.5],[170,100],[149.5,149.5],[100,170],[50.5,149.5],[30,100],[50.5,50.5],[100,30]];
        const wedges = pts.slice(0, -1).map((p, i) => {
            const next = pts[i + 1];
            const colors = i % 2 === 0 ? ['#90CAF9', '#1565C0'] : ['#FFE0B2', '#E65100'];
            return `<path id="pe-we-cell-${i}" class="plane-expand-tile" d="M100,100 L${p[0]},${p[1]} A70,70 0 0 1 ${next[0]},${next[1]} Z" fill="${colors[0]}" stroke="${colors[1]}" stroke-width="1"/>`;
        }).join('');
        return {
            html: `<div class="plane-expand-stage">
                <svg viewBox="0 0 200 200" style="width:100%;max-width:240px;display:block" role="img" aria-labelledby="pe-we-title pe-we-desc">
                    <title id="pe-we-title">正八角形の外角8個で1周する図</title>
                    <desc id="pe-we-desc">45度の外角を8個並べると、ちょうど360度の1周になる。</desc>
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#ccc" stroke-dasharray="3 4"/>
                    ${wedges}
                    <text id="pe-we-count" x="100" y="105" font-size="15" fill="#1a1a2e" text-anchor="middle" font-weight="bold">0 / ${d.sides}</text>
                </svg>
                <div class="plane-expand-actions">
                    <button type="button" class="plane-anim-btn play" id="pe-we-play">並べてみる</button>
                    <button type="button" class="plane-anim-btn reset" id="pe-we-reset">もう一度</button>
                </div>
                <div class="plane-expand-status" id="pe-we-status" role="status" aria-live="polite">外角1つが${d.exterior}°なのは分かるけど、${d.sides}個でちょうど1周するかは見えにくい。</div>
                <div class="formula-reveal" id="pe-we-result">${d.sides}個分 → ${d.sides}×${d.exterior}＝360°（内角は180－${d.exterior}＝${d.interior}°）</div>
            </div>`,
            wire: () => wireSequentialReveal('pe-we', d.sides, 'ぐるっと1周した。'),
        };
    },
};
function wirePlaneExpandVisual(p) {
    if (activeExpandVisualReset) { activeExpandVisualReset(); activeExpandVisualReset = null; }
    const factory = PLANE_EXPAND_VISUALS[p.expandVisual];
    if (!factory) return;
    const visual = factory(p.expandVisualData || {});
    let target = null;
    document.querySelectorAll('#prac-steps-card .prac-step').forEach(stepEl => {
        const nameEl = stepEl.querySelector('.prac-step-name');
        if (nameEl && nameEl.textContent.trim() === '広げてみよう') target = stepEl.querySelector('.prac-step-bd');
    });
    if (!target) return;
    target.insertAdjacentHTML('beforeend', visual.html);
    activeExpandVisualReset = visual.wire();
}

function pracGoToTopic(unitId) {
    const problem = PRACTICE_PROBLEMS.find(p => p.id === pracState.currentProbId);
    const screen = VistaCatalog.problemTopic(problem, appState.grade);
    if (!screen) return;
    appState.pracReturnCatId = pracState.currentCatId;
    showScreen(screen);
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
    const next = document.getElementById(id + '-screen');
    if (!next) { console.warn('showScreen: unknown screen id:', id); return; }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'slide-in'));
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
    if (id === 'salt') { saltConfirmState.answered = false; document.getElementById('salt-quiz-result').style.display = 'none'; }
    if (id === 'u6-calc')    { initTopicTrial('u6-calc'); initCalcExample(); resetCalcComparison(); }
    if (id === 'u6-ratio')   { initTopicTrial('u6-ratio'); }
    if (id === 'u6-speed')   { initTopicTrial('u6-speed'); }
    if (id === 'u6-plane')   { initTopicTrial('u6-plane'); switchPlaneTab('parallelogram'); resetPlaneAngleExample(); }
    if (id === 'u6-special') { initTopicTrial('u6-special'); }
    if (id === 'challenges') {
        if (opts.unitTitle) document.getElementById('ch-screen-title').textContent = opts.unitTitle;
        else document.getElementById('ch-screen-title').textContent = '難問チャレンジ';
        chState.unitCategories = opts.categories || null;
        chState.mainCategory   = opts.mainCategory || null;
        chState.tierMin = opts.tierMin !== undefined ? opts.tierMin : 1;
        chState.tierMax = opts.tierMax !== undefined ? opts.tierMax : 5;
        chState.fromScreen = opts.fromScreen || 'exam';
        chState.fromHcMode = opts.fromHcMode || null;
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

/* 難問チャレンジへボタン: 入ってきたタブ(総合/単元別)へ、他はfromScreenそのまま */
function chGoToCategoryPicker() {
    const fromHardChallenge = chState.fromScreen === 'hard-challenge';
    const hcMode = chState.fromHcMode;
    showScreen(chState.fromScreen || 'exam');
    if (fromHardChallenge && hcMode) hcSwitchMode(hcMode);
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
        const topicScreen = VistaCatalog.standardTopic(appState.grade, ch.id);
        if (topicScreen) {
            return `<div class="chapter-card available" onclick="showScreen('${topicScreen}')">
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
                    <button class="chapter-action-btn btn-learn" onclick="event.stopPropagation();showScreen('${topicScreen}')${topicScreen === 'watertank' ? ";switchTab('learn')" : ''}">📖 学ぶ</button>
                    <button class="chapter-action-btn btn-practice" onclick="event.stopPropagation();showScreen('${topicScreen}')${topicScreen === 'watertank' ? ";switchTab('quiz')" : ''}">✏️ 練習</button>
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
                            <span class="unit-count">チャレンジ ${VistaCatalog.unitCount(appState.grade, u.id)}問</span>
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
    const total = CHALLENGES.filter(p => p.grade === appState.grade).length;
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
        fromHcMode: 'all',
    });
}

function hcOpenCat(mainCatId, title) {
    showScreen('challenges', {
        mainCategory: mainCatId,
        unitTitle: title + ' 難問チャレンジ',
        tierMin: 4, tierMax: 5,
        fromScreen: 'hard-challenge',
        fromHcMode: 'cat',
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
    const cat = PRACTICE_CATS.find(c =>
        (appState.grade === 5 ? c.unitId5 : c.unitId6) === unitId
    );
    if (!cat) return;
    showScreen('practice');
    pracOpenCat(cat.id);
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

const saltConfirmState = { answered: false };
function saltConfirmRetry() {
    saltConfirmState.answered = false;
    document.getElementById('salt-quiz-input').value = '';
    document.getElementById('salt-quiz-result').style.display = 'none';
}
function checkSaltConfirm() {
    if (saltConfirmState.answered) return;
    const raw = document.getElementById('salt-quiz-input').value
        .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)).trim();
    const val = parseFloat(raw);
    const el = document.getElementById('salt-quiz-result');
    if (!Number.isFinite(val)) return;
    saltConfirmState.answered = true;
    const ok = Math.abs(val - 20) < 0.01;
    el.style.display = 'block';
    if (ok) {
        el.innerHTML = `<div class="ch-result-box ok"><div class="ch-result-hl">⭕ 正解！</div><div class="ch-result-msg">250 × 0.08 ＝ 20g　よくできました！<br><button class="topic-nav-btn prac" style="margin-top:10px" onclick="openSaltPractice()">演習問題に進む →</button></div></div>`;
        recordAnswer('g' + appState.grade + '_exam_salt_topic', true);
        addStar();
    } else {
        el.innerHTML = `<div class="ch-result-box ng"><div class="ch-result-hl">❌ もう一度考えよう</div><div class="ch-result-msg">塩の重さ ＝ 食塩水の重さ × 濃度<br>＝ 250 × 0.08 で計算してみよう。</div></div>`;
        recordAnswer('g' + appState.grade + '_exam_salt_topic', false);
    }
    el.innerHTML += `<button class="retry-btn" onclick="saltConfirmRetry()">もう一度解く</button>`;
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
            const initial=ri(1,Math.floor(full/2/10))*10, remain=full-initial;
            // Choose an exact divisor: this level asks for an integer time, not rounding.
            const rates = [2,3,4,5,6,7,8].filter(rate => remain % rate === 0);
            const net=rates[ri(0,rates.length-1)], inflow=net+ri(1,4), outflow=inflow-net, time=remain/net;
            return { text:`容量 ${full}L の水槽に、今 ${initial}L の水があります。\n毎分 ${inflow}L 入り、毎分 ${outflow}L 出ていきます。\n\n何分後に満水（${full}L）になりますか？`, inflow, outflow, initial,
                answer:time, unit:'分', hint:`1分で ${net}L 増える\n満水まであと ${remain}L\n${remain}÷${net}=？分`, exp:`1分で ${net}L 増える\n満水まであと ${remain}L\n${remain}÷${net}=${time}分` };
        } else {
            const initial=ri(3,8)*10;
            const rates = [2,3,4,5,6].filter(rate => initial % rate === 0);
            const net=rates[ri(0,rates.length-1)], outflow=net+ri(1,3), inflow=outflow-net, time=initial/net;
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
    quiz.answered = false;
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
    if (quiz.answered) return;
    const p=quiz.problem, val=parseFloat(document.getElementById('ans-input').value);
    if (!Number.isFinite(val)) return;
    quiz.answered = true;
    const ok=Math.abs(val-p.answer)<0.01;
    document.getElementById('ans-input').className='answer-input '+(ok?'correct':'wrong');
    const rb=document.getElementById('result-box');
    if (ok) {
        quiz.correct++; document.getElementById('score-ok').textContent=quiz.correct;
        rb.className='result-box ok';
        document.getElementById('result-headline').textContent='⭕ 正解！';
        document.getElementById('result-msg').innerHTML='';
        recordAnswer(`g${appState.grade}_std_watertank`, true);
        addStar();
        { const s = getStatsForKey(`g${appState.grade}_std_watertank`); if(s) showAccuracyCard('水そう練習', s.correct, s.total); }
    } else {
        quiz.wrong++; document.getElementById('score-ng').textContent=quiz.wrong;
        rb.className='result-box ng';
        document.getElementById('result-headline').textContent='❌ ' + getWrongMsg();
        document.getElementById('result-msg').innerHTML=`<button class="reveal-ans-btn" data-answer="${p.answer}" data-unit="${p.unit}" onclick="revealAnswer(this)">解答を確認する</button>`;
        recordAnswer(`g${appState.grade}_std_watertank`, false);
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
        base = base.filter(c => chState.unitCategories.includes(c.categoryLabel));
    }
    base = base.filter(c => c.difficulty >= chState.tierMin && c.difficulty <= chState.tierMax);
    return chState.filter === 'すべて' ? base : base.filter(c => c.categoryLabel === chState.filter);
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
        base = base.filter(c => chState.unitCategories.includes(c.categoryLabel));
    }
    base = base.filter(c => c.difficulty >= chState.tierMin && c.difficulty <= chState.tierMax);
    const availCats = ['すべて', ...new Set(base.map(c => c.categoryLabel))];
    if (!availCats.includes(chState.filter)) chState.filter = 'すべて';
    document.getElementById('ch-filter-row').innerHTML = availCats.map(cat =>
        `<button class="ch-filter-btn${chState.filter===cat?' active':''}" onclick="chSetFilter('${cat}')">${cat}</button>`
    ).join('');
    let filtered = chState.filter === 'すべて' ? base : base.filter(c => c.categoryLabel === chState.filter);
    if (filtered.length === 0) {
        document.getElementById('ch-cards-container').innerHTML = `<div class="prac-empty-msg">この条件のチャレンジ問題は準備中です。<br>別の単元を選んでください。<br><button class="retry-btn" onclick="goBackFromChallenges()">単元選択へ戻る</button></div>`;
        return;
    }
    document.getElementById('ch-cards-container').innerHTML = filtered.map(c => {
        const stars='★'.repeat(c.difficulty)+'☆'.repeat(5-c.difficulty);
        const raw = c.text.replace(/\n/g,' ');
        const preview = raw.length > 48 ? raw.slice(0,48)+'…' : raw;
        return `<div class="ch-card" style="border-left-color:${c.borderColor}" onclick="openChallenge('${c.id}')">
            <div class="ch-card-top"><span class="ch-cat-badge" style="background:${c.catBg};color:${c.catColor}">${c.categoryLabel}</span><span class="ch-stars">${stars}</span></div>
            <div class="ch-card-title">${c.title}</div>
            <div class="ch-card-preview">${preview}</div>
            ${getAttemptDots(c.id)}
        </div>`;
    }).join('');
}

function chSetFilter(cat) { chState.filter=cat; renderChallengeList(); }

function openChallenge(id) {
    const ch=CHALLENGES.find(c=>c.id===id); if (!ch || ch.grade !== appState.grade) return;
    chState.answered = false;
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
    badge.textContent=ch.categoryLabel; badge.style.cssText=`background:${ch.catBg};color:${ch.catColor}`;
    document.getElementById('ch-prob-stars').textContent=stars;
    document.getElementById('ch-prob-text').textContent=ch.text;
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
    if (chState.answered) return;
    const ch=CHALLENGES.find(c=>c.id===chState.currentId); if (!ch || ch.grade !== appState.grade) return;
    const raw=document.getElementById('ch-ans-input').value
        .replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)).trim();
    const val=parseFloat(raw); if (!Number.isFinite(val)) return;
    chState.answered = true;
    const ok=Math.abs(val-ch.answer)<0.01;
    document.getElementById('ch-ans-input').className='ch-ans-input '+(ok?'correct':'wrong');
    const rb=document.getElementById('ch-result-box');
    rb.className='ch-result-box '+(ok?'ok':'ng');
    if (ok) {
        document.getElementById('ch-result-hl').textContent='⭕ 正解！';
        document.getElementById('ch-result-msg').innerHTML=`<div>ステップ解説で解法を確認せよ。</div><button class="retry-btn" onclick="chRetry()">もう一度解く</button>`;
        recordProblemAttempt(ch.id, true);
        recordAnswer(`g${appState.grade}_ch_${ch.categoryLabel}`, true);
        addStar();
        { const _k=`g${appState.grade}_ch_${ch.categoryLabel}`; const _s=getStatsForKey(_k); if(_s) showAccuracyCard(ch.categoryLabel, _s.correct, _s.total); }
    } else {
        document.getElementById('ch-result-hl').textContent='❌ ' + getWrongMsg();
        document.getElementById('ch-result-msg').innerHTML=`<div>ヒントまたはステップ解説で確認せよ。</div><button class="reveal-ans-btn" data-answer="${ch.answer}" data-unit="${ch.answerUnit}" onclick="revealAnswer(this)">解答を確認する</button><button class="retry-btn" onclick="chRetry()">もう一度解く</button>`;
        recordProblemAttempt(ch.id, false);
        recordAnswer(`g${appState.grade}_ch_${ch.categoryLabel}`, false);
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
    const ch=CHALLENGES.find(c=>c.id===chState.currentId); if (!ch || ch.grade !== appState.grade) return;
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
    lsSet('vista_last_ts', String(Date.now()));
    if (!lsGet('vista_first_ts', '')) lsSet('vista_first_ts', String(Date.now()));
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
    recordAttemptTimestamp(probId);
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
    const dots = h.slice(-10).map(ok => `<span class="att-dot ${ok?'ok':'ng'}">${ok?'✓':'✗'}</span>`).join('');
    return `<div class="att-dots">${dots}</div>`;
}

/* ── Retry (re-attempt same problem) ── */
function stdPracRetry() {
    stdPracState.answered = false;
    const inp = document.getElementById('std-prac-ans-input');
    if (inp) { inp.value = ''; inp.className = 'prac-ans-input'; inp.focus(); }
    const rb = document.getElementById('std-prac-result-box');
    if (rb) rb.style.display = 'none';
}
function pracRetry() {
    pracState.answered = false;
    const inp = document.getElementById('prac-ans-input');
    if (inp) { inp.value = ''; inp.className = 'prac-ans-input'; inp.focus(); }
    const rb = document.getElementById('prac-result-box');
    if (rb) rb.style.display = 'none';
}
function chRetry() {
    chState.answered = false;
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
function selectedExamHistory(grade) {
    const history = JSON.parse(lsGet('vista_history', '{}'));
    const ids = new Set(PRACTICE_PROBLEMS.filter(p => p.grade === grade && p.course === 'exam').map(p => p.id));
    return Object.fromEntries(Object.entries(history).filter(([id]) => ids.has(id)));
}
function challengeSummary(grade) {
    return getGradeCourseStats(grade, 'ch');
}
function challengeSummaryHtml(grade) {
    const summary = challengeSummary(grade);
    return `<div class="wr-section"><div class="wr-section-title">難問チャレンジの学習記録（${grade}年生）</div><p>${summary.total}回解答・${summary.correct}回正解${summary.total ? `・正答率${Math.round(summary.correct / summary.total * 100)}%` : ''}</p><p>以下の単元別分析・最近の誤答は受験コースの演習問題が対象です。</p></div>`;
}
function sortRecentProblems(problems) {
    const times = JSON.parse(lsGet('vista_attempt_ts', '{}'));
    return problems.sort((a, b) => (times[b.id] || 0) - (times[a.id] || 0));
}

function renderWeakReview() {
    const g = appState.grade;
    const container = document.getElementById('wr-body');
    if (!container) return;

    const stats   = JSON.parse(lsGet('vista_stats',   '{}'));
    const history = selectedExamHistory(g);

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
        container.innerHTML = challengeSummaryHtml(g) + `
            <div class="wr-no-data">
                <div class="wr-no-data-icon">📊</div>
                <div class="wr-no-data-title">まずは問題を解いてみよう！</div>
                <div class="wr-no-data-sub">5問以上解くと、苦手分析が表示されます。<br>演習問題や難問チャレンジに挑戦してみてください。</div>
            </div>`;
        return;
    }

    const sections = [challengeSummaryHtml(g)];

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
    const recentWrongSlice = sortRecentProblems(recentWrong).slice(0, 5);

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
                <div class="wr-section-title">直近の解答が不正解の問題</div><p>新しい解答順で表示します。更新前の記録は解答日時がないため順序不明です。</p>
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
            const probs = PRACTICE_PROBLEMS.filter(p => p.catId === cat.id && p.grade === g && p.course === 'exam');
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
    const history = selectedExamHistory(g);

    // ── 演習・確認問題の正答率（g{grade}_exam_* キーを集計）──
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
            <div class="rr-overall-label">演習・確認問題の正答率</div>
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

    const sections = [overallHtml, challengeSummaryHtml(g)];

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
    const recentWrongSlice = sortRecentProblems(recentWrong).slice(0, 5);

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
                <div class="wr-section-title">直近の解答が不正解の問題</div><p>新しい解答順で表示します。更新前の記録は解答日時がないため順序不明です。</p>
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
    const history = selectedExamHistory(g);
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
        ? Math.max(1, Math.floor((Date.now() - Number(firstTs)) / 86400000) + 1)
        : null;
    const continueDaysStr = continueDays !== null ? `${continueDays}日` : '—';

    const summaryHtml = `
        <div class="rpt-summary">
            <div class="rpt-summary-title">学習レポート（${g}年生・受験コース）</div>
            <div class="rpt-summary-grid">
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${totalAll}</div>
                    <div class="rpt-summary-label">演習の解答回数</div>
                </div>
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${totalAll > 0 ? overallPct + '%' : '—'}</div>
                    <div class="rpt-summary-label">演習の正答率</div>
                </div>
                <div class="rpt-summary-item">
                    <div class="rpt-summary-val">${continueDaysStr}</div>
                    <div class="rpt-summary-label">学習開始からの日数（全学年共通）</div>
                </div>
            </div>
        </div>`;

    if (isInsufficient) {
        container.innerHTML = summaryHtml + challengeSummaryHtml(g) + `
            <div class="rpt-no-data">
                <div class="rpt-no-data-icon">📊</div>
                <div class="rpt-no-data-title">まだ学習が始まったばかりです</div>
                <div class="rpt-no-data-sub">5問以上解くと、詳細なレポートが表示されます。<br>まずは気軽に問題を解いてみましょう。</div>
            </div>`;
        return;
    }

    const sections = [summaryHtml, challengeSummaryHtml(g)];

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
    const recentWrongSlice = sortRecentProblems(recentWrong).slice(0, 5);
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
                <div class="rpt-section-title">直近の解答が不正解の問題</div><p>新しい解答順で表示します。更新前の記録は解答日時がないため順序不明です。</p>
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

    // 対象問題を difficulty 1〜2 で取得(通常は最大3件、u6-planeのみ4件)
    const problems = (typeof PRACTICE_PROBLEMS !== 'undefined' ? PRACTICE_PROBLEMS : [])
        .filter(p => p.topicUnitId === topicUnitId && p.grade === appState.grade && p.course === 'exam' && p.difficulty <= 2)
        .slice(0, topicUnitId === 'u6-plane' ? 4 : 3);

    if (problems.length === 0) {
        // 問題なし → セクション非表示、既存導線を表示
        container.innerHTML = '';
        if (navCard) navCard.style.display = '';
        return;
    }

    // 問題あり → 既存導線を非表示
    if (navCard) navCard.style.display = 'none';

    // Keep an in-progress trial when visiting another screen and returning.
    if (trialState[topicUnitId] && trialState[topicUnitId].problems.map(p => p.id).join() === problems.map(p => p.id).join()) {
        renderTrialQuestion(topicUnitId);
        return;
    }
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
    if (state.choicesFor !== prob.id || !Array.isArray(state.choices)) {
        state.choices = generateChoices(prob);
        state.choicesFor = prob.id;
    }
    const choices = state.choices;

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
            ${renderProblemDiagram(prob)}
            <div class="topic-trial-choices" id="trial-choices-${topicUnitId}">
                ${choicesHtml}
            </div>
            <div id="trial-feedback-${topicUnitId}" style="display:none"></div>
            <div id="trial-next-${topicUnitId}" style="display:none"></div>
        </div>`;
    if (state.answered) {
        renderTrialFeedback(topicUnitId, state.choiceIdx, state.isCorrect);
        if (state.revealedAnswer) { state.revealedAnswer = false; revealTrialAnswer(topicUnitId); }
    }
}

/**
 * 4択の選択肢を生成する
 * answer が数値の場合は前後の差分値でダミーを作成
 * answer が文字列の場合は同じ topicUnitId 内の他問題の answer からダミーを拝借
 */
function generateChoices(prob) {
    const answer = prob.answer;
    const unit   = prob.answerUnit || '';

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
    const prob = state.problems[state.current];
    if (!prob || prob.grade !== appState.grade || prob.course !== 'exam') return;
    recordProblemAttempt(prob.id, !!isCorrect);
    recordAnswer(`g${appState.grade}_exam_${prob.catId}`, !!isCorrect);
    if (isCorrect) addStar(); else resetStreak();
    state.answered = true;
    state.revealedAnswer = false;
    state.choiceIdx = choiceIdx;
    state.isCorrect = isCorrect;
    renderTrialFeedback(topicUnitId, choiceIdx, isCorrect);
}

// Rendering is separate from grading: restoring a route never records an answer.
function renderTrialFeedback(topicUnitId, choiceIdx, isCorrect) {
    const state = trialState[topicUnitId];
    if (!state) return;
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
        feedbackEl.innerHTML = `<b>正解は ${escapeHtml(String(prob.answer))}${escapeHtml(prob.answerUnit || '')} です。</b><br>${solutionHtml}`;
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
 * 問題データの diagram フィールドから図の HTML を生成する。
 * diagram が無ければ空文字を返す（既存表示は変化しない）。
 */
function renderProblemDiagram(problem) {
    if (!problem || !problem.diagram || !problem.diagram.markup) return '';
    return `<div class="problem-diagram">${problem.diagram.markup}</div>`;
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
   平面図形アニメーション制御
════════════════════════════════════════ */
function switchPlaneTab(tabName) {
    ['parallelogram', 'triangle', 'trapezoid'].forEach(t => {
        const el  = document.getElementById('plane-tab-' + t);
        const btn = document.getElementById('plane-tabbt-' + t);
        if (el)  el.style.display = (t === tabName) ? 'block' : 'none';
        if (btn) btn.classList.toggle('active', t === tabName);
    });
    resetPlaneAnim(tabName);
}

const planeAnimTimers = {};

function playPlaneAnim(shape) {
    clearTimeout(planeAnimTimers[shape]);
    if (shape === 'parallelogram') {
        const tri  = document.getElementById('pg-tri-left');
        const lbl  = document.getElementById('pg-base-label');
        const form = document.getElementById('formula-parallelogram');
        if (!tri) return;
        tri.style.transform = 'translateX(160px)';
        if (lbl) lbl.style.opacity = '1';
        planeAnimTimers[shape] = setTimeout(() => { if (form) form.classList.add('visible'); }, 1500);
    } else if (shape === 'triangle') {
        const tri2 = document.getElementById('tri-2');
        const lbl  = document.getElementById('tri-base-label');
        const form = document.getElementById('formula-triangle');
        if (!tri2) return;
        // tri-2を右外から滑り込ませる（tri-1と合わさって長方形になる）
        tri2.style.transition = 'none';
        tri2.style.transform  = 'translateX(250px)';
        tri2.style.opacity    = '0';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                tri2.style.transition = 'opacity 0.3s, transform 1.2s ease-in-out';
                tri2.style.transform  = 'translateX(0)';
                tri2.style.opacity    = '1';
                if (lbl) { lbl.style.transition = 'opacity 0.5s 1.2s'; lbl.style.opacity = '1'; }
                planeAnimTimers[shape] = setTimeout(() => { if (form) form.classList.add('visible'); }, 1500);
            });
        });
    } else if (shape === 'trapezoid') {
        const trap2      = document.getElementById('trap-2');
        const lblCombined = document.getElementById('trap-combined-label');
        const form       = document.getElementById('formula-trapezoid');
        if (!trap2) return;
        // trap-2を右外から滑り込ませる（trap-1と合わさって長方形になる）
        trap2.style.transition = 'none';
        trap2.style.transform  = 'translateX(160px)';
        trap2.style.opacity    = '0';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                trap2.style.transition = 'opacity 0.3s, transform 1.2s ease-in-out';
                trap2.style.transform  = 'translateX(0)';
                trap2.style.opacity    = '1';
                if (lblCombined) { lblCombined.style.transition = 'opacity 0.5s 1.2s'; lblCombined.style.opacity = '1'; }
                planeAnimTimers[shape] = setTimeout(() => { if (form) form.classList.add('visible'); }, 1600);
            });
        });
    }
}

function resetPlaneAnim(shape) {
    clearTimeout(planeAnimTimers[shape]);
    planeAnimTimers[shape] = null;
    if (shape === 'parallelogram') {
        const tri  = document.getElementById('pg-tri-left');
        const lbl  = document.getElementById('pg-base-label');
        const form = document.getElementById('formula-parallelogram');
        if (tri)  { tri.style.transition = 'none'; tri.style.transform = 'translateX(0)'; }
        if (lbl)  { lbl.style.transition = 'none'; lbl.style.opacity   = '0'; }
        if (form) form.classList.remove('visible');
        // トランジションを再有効化
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (tri) tri.style.transition = 'transform 1.2s ease-in-out';
                if (lbl) lbl.style.transition = 'opacity 0.5s 1.2s';
            });
        });
    } else if (shape === 'triangle') {
        const tri2 = document.getElementById('tri-2');
        const lbl  = document.getElementById('tri-base-label');
        const form = document.getElementById('formula-triangle');
        if (tri2) { tri2.style.transition = 'none'; tri2.style.transform = 'translateX(250px)'; tri2.style.opacity = '0'; }
        if (lbl)  { lbl.style.transition  = 'none'; lbl.style.opacity   = '0'; }
        if (form) form.classList.remove('visible');
    } else if (shape === 'trapezoid') {
        const trap2       = document.getElementById('trap-2');
        const lblCombined = document.getElementById('trap-combined-label');
        const form        = document.getElementById('formula-trapezoid');
        if (trap2)        { trap2.style.transition = 'none'; trap2.style.transform = 'translateX(160px)'; trap2.style.opacity = '0'; }
        if (lblCombined)  { lblCombined.style.transition = 'none'; lblCombined.style.opacity = '0'; }
        if (form)         form.classList.remove('visible');
    }
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

// 再利用できる段階表示。再実行時には古いコールバックを必ず取り消す。
function createTopicSequence() {
    let timers = [];
    return {
        cancel() { timers.forEach(clearTimeout); timers = []; },
        after(delay, action) { timers.push(setTimeout(action, delay)); }
    };
}
const calcPairSequence = createTopicSequence();
const calcComparisonSequence = createTopicSequence();
const calcExampleState = { selected: [] };
const topicReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initCalcExample(focusFirst = false) {
    calcPairSequence.cancel();
    calcExampleState.selected = [];
    document.querySelectorAll('[data-calc-number]').forEach(button => {
        button.setAttribute('aria-pressed', 'false');
        button.classList.remove('topic-pair-merge');
    });
    document.getElementById('calc-product-preview').textContent = '数字を2つ選ぼう';
    document.getElementById('calc-prediction-feedback').textContent = 'どの組み合わせが、きりのよい数になるかな？';
    document.getElementById('calc-discovery').hidden = true;
    document.getElementById('calc-example-reveal').hidden = true;
    if (focusFirst) document.querySelector('[data-calc-number]').focus();
}

function selectCalcNumber(number) {
    calcPairSequence.cancel();
    const selected = calcExampleState.selected;
    const index = selected.indexOf(number);
    if (index >= 0) selected.splice(index, 1);
    else {
        // 2つ選択済みなら、新しくタップした数字から次のペアを探せる。
        if (selected.length === 2) selected.length = 0;
        selected.push(number);
    }
    document.querySelectorAll('[data-calc-number]').forEach(button => {
        button.setAttribute('aria-pressed', String(selected.includes(Number(button.dataset.calcNumber))));
        button.classList.remove('topic-pair-merge');
    });
    document.getElementById('calc-discovery').hidden = true;
    document.getElementById('calc-example-reveal').hidden = true;
    const preview = document.getElementById('calc-product-preview');
    const feedback = document.getElementById('calc-prediction-feedback');
    if (selected.length < 2) {
        preview.textContent = selected.length ? selected[0] + ' × …' : '数字を2つ選ぼう';
        feedback.textContent = selected.length ? 'あと1つ選んでみよう。' : 'どの組み合わせが、きりのよい数になるかな？';
        return;
    }
    const product = selected[0] * selected[1];
    preview.textContent = selected.join(' × ') + ' ＝ ' + product;
    if (product !== 100) {
        feedback.textContent = product + '。間違いではないけれど、きりのよい数じゃないね。他の組み合わせも試してみよう。数字をタップして選び直せるよ。';
        return;
    }
    feedback.textContent = '25と4で、きりのよい100ができた！';
    if (!topicReducedMotion()) document.querySelectorAll('[data-calc-number][aria-pressed="true"]').forEach(button => button.classList.add('topic-pair-merge'));
    const reveal = () => {
        document.querySelectorAll('[data-calc-number]').forEach(button => button.classList.remove('topic-pair-merge'));
        document.getElementById('calc-discovery').hidden = false;
        document.getElementById('calc-example-reveal').hidden = false;
    };
    if (topicReducedMotion()) reveal();
    else calcPairSequence.after(480, reveal);
}

function resetCalcComparison() {
    calcComparisonSequence.cancel();
    document.querySelectorAll('#calc-comparison [data-comparison-stage]').forEach(stage => { stage.hidden = true; });
    document.getElementById('calc-comparison-play').textContent = '順番に見てみよう';
}

function playCalcComparison() {
    resetCalcComparison();
    document.getElementById('calc-comparison-play').textContent = 'もう一度見る';
    const stages = [...document.querySelectorAll('#calc-comparison [data-comparison-stage]')];
    // 通常の手順はゆっくり、くふうの手順は軽やかに。同じ2段階を順に見せる。
    const delays = [0, 650, 1600, 2600, 2780, 2960, 3450];
    stages.forEach((stage, index) => {
        if (topicReducedMotion() || index === 0) stage.hidden = false;
        else calcComparisonSequence.after(delays[index], () => { stage.hidden = false; });
    });
}

// 移動後に画面外の演出を進めない。復帰時はopenUnitの初期化から再開する。
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('u6-calc-screen');
    new MutationObserver(() => {
        if (!screen.classList.contains('active')) {
            calcPairSequence.cancel();
            calcComparisonSequence.cancel();
        }
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
});

// 折れ角は、補助線を引く段階と錯角を確認する段階に分ける。
const planeAngleSequence = createTopicSequence();
function resetPlaneAngleExample(focusFirst = false) {
    planeAngleSequence.cancel();
    ['plane-angle-guide', 'plane-angle-split', 'plane-angle-discovery', 'plane-angle-reveal', 'plane-angle-comparison-after'].forEach(id => {
        document.getElementById(id).toggleAttribute('hidden', true);
    });
    document.getElementById('plane-angle-comparison-pending').toggleAttribute('hidden', false);
    document.getElementById('plane-angle-svg').classList.remove('plane-angle-drawing');
    document.getElementById('plane-angle-svg-desc').textContent = '上の直線ℓとの角は50度、下の直線mとの角は35度。折れ線の曲がり角xを求める。';
    document.getElementById('plane-angle-status').textContent = 'ふつうに求めようとすると… 角xの手がかりがない。';
    const play = document.getElementById('plane-angle-play');
    play.disabled = false;
    play.setAttribute('aria-expanded', 'false');
    if (focusFirst) play.focus();
}
function playPlaneAngleExample() {
    resetPlaneAngleExample();
    const play = document.getElementById('plane-angle-play');
    play.disabled = true;
    document.getElementById('plane-angle-guide').toggleAttribute('hidden', false);
    document.getElementById('plane-angle-status').textContent = '① 曲がり角を通る、ℓ、mに平行な補助線。';
    const split = () => {
        document.getElementById('plane-angle-split').toggleAttribute('hidden', false);
        document.getElementById('plane-angle-status').textContent = '②・③ 錯角で、上側は50°、下側は35°。';
    };
    const reveal = () => {
        ['plane-angle-discovery', 'plane-angle-reveal', 'plane-angle-comparison-after'].forEach(id => { document.getElementById(id).toggleAttribute('hidden', false); });
        document.getElementById('plane-angle-comparison-pending').toggleAttribute('hidden', true);
        document.getElementById('plane-angle-svg-desc').textContent = '曲がり角を通る平行な補助線で、角xは錯角の50度と35度に分かれる。xは85度。';
        document.getElementById('plane-angle-status').textContent = '④ x＝50＋35＝85°。';
        play.setAttribute('aria-expanded', 'true');
        document.getElementById('plane-angle-svg').classList.remove('plane-angle-drawing');
    };
    if (topicReducedMotion()) { split(); reveal(); }
    else {
        document.getElementById('plane-angle-svg').classList.add('plane-angle-drawing');
        planeAngleSequence.after(600, split);
        planeAngleSequence.after(1000, reveal);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('u6-plane-screen');
    new MutationObserver(() => {
        if (!screen.classList.contains('active')) resetPlaneAngleExample();
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
});
