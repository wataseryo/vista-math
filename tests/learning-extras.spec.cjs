const {test,expect}=require('@playwright/test');
const records=page=>page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records);
test('water practice retains generated question, answer and grade-specific score on refresh',async({page})=>{
 await page.goto('/');await page.locator('#grade-screen .grade-card.g6').click();await page.locator('#home-screen .course-card.std').click();await page.locator('#std-mode-screen .exam-mode-card.topic').click();await page.locator('#std-chapter-list .btn-practice').first().click();
 const answer=await page.evaluate(()=>quiz.problem.answer),question=await page.locator('#prob-text').textContent();await page.locator('#ans-input').fill(String(answer));await page.locator('#tab-quiz .submit-btn').click();
 const before=await records(page);expect(JSON.parse(before.vista_stats).g6_std_watertank.total).toBe(1);await page.reload();await expect(page.locator('#prob-text')).toHaveText(question);await expect(page.locator('#result-headline')).toContainText('正解');await page.locator('#tab-quiz .submit-btn').click();expect(await records(page)).toEqual(before);
});
test('salt confirmation and challenge state survive browser roundtrip and refresh',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{selectGrade(6);showScreen('exam');openUnit('u6-salt')});await page.locator('#salt-tab-quiz-btn').click();await page.locator('#salt-quiz-input').fill('20');await page.locator('#salt-tab-quiz button').filter({hasText:'解答する'}).click();
 const before=await records(page);expect(JSON.parse(before.vista_stats).g6_exam_salt_topic.total).toBe(1);await page.reload();await expect(page.locator('#salt-quiz-result')).toContainText('正解');await page.locator('#salt-tab-quiz button').filter({hasText:'解答する'}).click();expect(await records(page)).toEqual(before);
 await page.locator('#salt-quiz-result button').filter({hasText:'演習問題に進む'}).click();await page.locator('#ch-cards-container .ch-card').first().click();await page.locator('#ch-ans-input').fill('999');await page.locator('#ch-hint-btn').click();const title=await page.locator('#ch-detail-title-sm').textContent();await page.goBack();await expect(page.locator('#ch-list-view')).toBeVisible();await page.goForward();await expect(page.locator('#ch-detail-title-sm')).toHaveText(title);await expect(page.locator('#ch-ans-input')).toHaveValue('999');await expect(page.locator('#ch-hint-box')).toBeVisible();
});
test('valid backup restores persistent records through file chooser and reload',async({page})=>{
 await page.goto('/');const backup=await page.evaluate(()=>{recordAnswer('g6_exam_pc-ratio',true);return VistaStorage.exportData()});await page.evaluate(()=>recordAnswer('g6_exam_pc-ratio',false));await page.locator('#vista-record-tools summary').click();page.once('dialog',d=>d.accept());const restored=page.waitForEvent('load');await page.locator('#vista-import-file').setInputFiles({name:'vista.json',mimeType:'application/json',buffer:Buffer.from(backup)});await restored;await expect.poll(async()=>JSON.parse((await records(page)).vista_stats)['g6_exam_pc-ratio'].total).toBe(1);await page.reload();expect(JSON.parse((await records(page)).vista_stats)['g6_exam_pc-ratio'].total).toBe(1);
});
test('problem scroll and layout remain usable after detour',async({page},testInfo)=>{
 await page.goto('/');await page.evaluate(()=>{selectGrade(6);showScreen('practice');pracOpenCat('pc-plane');pracOpenProb(PRACTICE_PROBLEMS.find(p=>p.catId==='pc-plane').id)});await page.locator('#prac-ans-input').fill('123');await page.evaluate(()=>window.scrollTo(0,250));await page.locator('.prac-topic-link').scrollIntoViewIfNeeded();const y=await page.evaluate(()=>window.scrollY);await page.locator('.prac-topic-link').click();await page.locator('#problem-return-button').click();await expect(page.locator('#prac-ans-input')).toHaveValue('123');await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeCloseTo(y,0);
 await page.screenshot({path:testInfo.outputPath('problem-restored.png'),fullPage:true});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);expect(overflow).toBe(false);
});

test('water slider labels match restored values',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{selectGrade(6);appState.course='std';showScreen('watertank')});
 await page.locator('#slider-inflow').fill('8');await page.locator('#slider-outflow').fill('4');await page.locator('#slider-initial').fill('70');await page.reload();
 await expect(page.locator('#slider-inflow')).toHaveValue('8');await expect(page.locator('#val-inflow')).toHaveText('8');await expect(page.locator('#val-outflow')).toHaveText('4');await expect(page.locator('#val-initial')).toHaveText('70');
});
