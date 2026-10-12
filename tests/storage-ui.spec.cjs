const {test,expect}=require('@playwright/test');
async function seed(page, values){await page.addInitScript(values=>{if(!sessionStorage.getItem('seeded')){for(const [k,v] of Object.entries(values))localStorage.setItem(k,v);sessionStorage.setItem('seeded','1')}},values)}
test('corrupt records warn, preserve original, and leave valid records usable',async({page})=>{
 await seed(page,{vista_stats:'{broken',vista_history:'null'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.locator('#vista-storage-status')).toContainText('保護');
 const data=await page.evaluate(()=>JSON.parse(VistaStorage.exportData()));expect(data.preserved.vista_stats).toBe('{broken');expect(data.preserved.vista_history).toBe('null');
 await page.locator('#grade-screen .grade-card.g6').click();await page.locator('#home-screen .course-card.exam').click();await page.locator('#exam-mode-screen .exam-mode-card.prac').click();await expect(page.locator('#prac-cat-grid')).toBeVisible();expect(errors).toEqual([]);
});
test('blocked storage warns and keeps current session records',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('blocked','SecurityError')}});await page.goto('/');
 await page.evaluate(()=>recordAnswer('g6_exam_pc-ratio',true));await expect(page.locator('#vista-storage-status')).toContainText('保存できません');
 expect(await page.evaluate(()=>JSON.parse(lsGet('vista_stats'))['g6_exam_pc-ratio'].total)).toBe(1);
});
test('backup download contains records; cancellation and malformed import change nothing',async({page})=>{
 await page.goto('/');await page.evaluate(()=>recordAnswer('g6_exam_pc-ratio',true));await page.locator('#vista-record-tools summary').click();
 const pending=page.waitForEvent('download');await page.locator('#vista-export').click();const download=await pending;expect(download.suggestedFilename()).toMatch(/^vista-records-.*\.json$/);
 const fs=require('node:fs');const text=fs.readFileSync(await download.path(),'utf8');expect(JSON.parse(JSON.parse(text).records.vista_stats)['g6_exam_pc-ratio'].total).toBe(1);
 const before=await page.evaluate(()=>VistaStorage.exportData());page.once('dialog',d=>d.dismiss());await page.locator('#vista-import-file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(text)});await expect(page.locator('#vista-import-result')).toContainText('取り消し');
 expect(await page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records)).toEqual(JSON.parse(before).records);
 await page.locator('#vista-import-file').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{bad')});await expect(page.locator('#vista-import-result')).toContainText('復元できません');expect(await page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records)).toEqual(JSON.parse(before).records);
});
test('grade switch isolates recommendations and challenge-only report is truthful',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{const p=PRACTICE_PROBLEMS.find(p=>p.grade===6);recordProblemAttempt(p.id,false);recordProblemAttempt(p.id,false);selectGrade(5);showScreen('recommended-review')});
 await expect(page.locator('#recommended-review-screen')).toBeVisible();const text=await page.locator('#rr-body').textContent();expect(text).not.toContain('6年');
 await page.evaluate(()=>{selectGrade(6);const p=CHALLENGES.find(p=>p.grade===6);recordAnswer(`g6_ch_${p.categoryLabel}`,true);recordProblemAttempt(p.id,true);showScreen('report')});await expect(page.locator('#rpt-body')).toContainText('チャレンジ');
});
test('every enabled topic and available problem can be rendered without runtime errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 const result=await page.evaluate(()=>{const failures=[];for(const g of [5,6]){selectGrade(g);for(const unit of VistaCatalog.units(g).filter(u=>u.available)){try{openUnit(unit.id)}catch(e){failures.push(unit.id+':'+e.message)}}for(const p of PRACTICE_PROBLEMS.filter(p=>p.grade===g)){try{showScreen('practice');pracOpenCat(p.catId);pracOpenProb(p.id)}catch(e){failures.push(p.id+':'+e.message)}}showScreen('challenges');for(const p of CHALLENGES.filter(p=>p.grade===g)){try{openChallenge(p.id)}catch(e){failures.push(p.id+':'+e.message)}}}return failures});expect(result).toEqual([]);expect(errors).toEqual([]);
});
