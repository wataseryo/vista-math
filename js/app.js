const appState = { grade: 5 };
const learn = { inflow:3, outflow:1, initial:50, current:50, simRunning:false, simTimer:null, simTime:0, capacity:100 };
const quiz  = { level:1, correct:0, wrong:0, problem:null, hintVisible:false };
const chState = { filter:'すべて', currentId:null, hintVisible:false, stepOpen:{} };

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
            ${ch ? `<button class="prac-detail-btn" style="background:#E3F2FD;color:#1565C0" onclick="showScreen('standard')">📘 トピックで学ぶ</button>` : ''}
        </div>
        <div id="std-prac-sol-box" class="prac-sol-box" style="display:none">${p.solution || '解説を準備中です。'}</div>
        ${ch ? `<div class="prac-topic-link" style="border-color:var(--std-primary)" onclick="showScreen('standard')">
            <div class="prac-topic-link-icon">📘</div>
            <div class="prac-topic-link-body">
                <div class="prac-topic-link-title" style="color:var(--std-primary)">${ch.num} ${ch.title}</div>
                <div class="prac-topic-link-sub">ステップ解説でじっくり学ぼう →</div>
            </div>
        </div>` : ''}
    `;
    document.getElementById('std-prac-ans-input').addEventListener('keydown', e => { if(e.key==='Enter') stdPracCheckAnswer(); });
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
    const unitId = appState.grade === 5 ? cat.unitId5 : cat.unitId6;
    const units  = appState.grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const unit   = units.find(u => u.id === unitId);

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
            ${unit ? `<button class="prac-detail-btn btn-prac-topic" onclick="pracGoToTopic('${unitId}')">📚 トピックで学ぶ</button>` : ''}
        </div>
        <div id="prac-sol-box" class="prac-sol-box" style="display:none">${p.solution || '解説を準備中です。'}</div>
        ${unit ? `<div class="prac-topic-link" onclick="pracGoToTopic('${unitId}')">
            <div class="prac-topic-link-icon">📚</div>
            <div class="prac-topic-link-body">
                <div class="prac-topic-link-title">${unit.num} ${unit.title}</div>
                <div class="prac-topic-link-sub">ステップ解説でじっくり学ぼう →</div>
            </div>
        </div>` : ''}
    `;
    document.getElementById('prac-ans-input').addEventListener('keydown', e => { if(e.key==='Enter') pracCheckAnswer(); });
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
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'slide-in'));
    const next = document.getElementById(id + '-screen');
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
    if (id === 'challenges') {
        if (opts.unitTitle) document.getElementById('ch-screen-title').textContent = opts.unitTitle;
        else document.getElementById('ch-screen-title').textContent = '難問チャレンジ';
        chState.unitCategories = opts.categories || null;
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
    // challenges から exam-mode 経由で exam へ戻る
    showScreen('exam');
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
    showScreen('challenges', { categories: unit.categories, unitTitle: unit.num + ' ' + unit.title });
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
function renderChallengeList() {
    // unitのcategoriesでまず絞る、なければ学年全体
    let base = CHALLENGES.filter(c => c.grade === appState.grade);
    if (chState.unitCategories) base = base.filter(c => chState.unitCategories.includes(c.category));
    // フィルタボタンを動的生成
    const availCats = ['すべて', ...new Set(base.map(c => c.category))];
    if (!availCats.includes(chState.filter)) chState.filter = 'すべて';
    document.getElementById('ch-filter-row').innerHTML = availCats.map(cat =>
        `<button class="ch-filter-btn${chState.filter===cat?' active':''}" onclick="chSetFilter('${cat}')">${cat}</button>`
    ).join('');
    let filtered = chState.filter === 'すべて' ? base : base.filter(c => c.category === chState.filter);
    document.getElementById('ch-cards-container').innerHTML = filtered.map(c => {
        const stars='★'.repeat(c.difficulty)+'☆'.repeat(5-c.difficulty);
        const preview=c.question.replace(/\n/g,' ').slice(0,48)+'…';
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
    const stats = JSON.parse(localStorage.getItem('vista_stats') || '{}');
    if (!stats[key]) stats[key] = { correct: 0, total: 0 };
    stats[key].total++;
    if (correct) stats[key].correct++;
    localStorage.setItem('vista_stats', JSON.stringify(stats));
}

function getStatsForKey(key) {
    const stats = JSON.parse(localStorage.getItem('vista_stats') || '{}');
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
    const stats = JSON.parse(localStorage.getItem('vista_stats') || '{}');
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
    stars: parseInt(localStorage.getItem('math_stars') || '0'),
    streak: 0,
};

const WRONG_MSGS = [
    'もう一回チャレンジ！', '惜しい！あとちょっと！',
    'ヒントを見てみよう！', '次はきっと正解！', '負けないで！ファイト！'
];

function getWrongMsg() { return WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)]; }

/* ── Per-problem attempt history ── */
function recordProblemAttempt(probId, correct) {
    const h = JSON.parse(localStorage.getItem('vista_history') || '{}');
    if (!h[probId]) h[probId] = [];
    h[probId].push(correct);
    localStorage.setItem('vista_history', JSON.stringify(h));
}
function getProblemHistory(probId) {
    return (JSON.parse(localStorage.getItem('vista_history') || '{}'))[probId] || [];
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
    localStorage.setItem('math_stars', gameState.stars);
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
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ans-input').addEventListener('keydown', e => { if(e.key==='Enter') checkAnswer(); });
    document.getElementById('ch-ans-input').addEventListener('keydown', e => { if(e.key==='Enter') chSubmitAnswer(); });
    updateStarBadge();
    updateLearn();
    generateProblem();
});
