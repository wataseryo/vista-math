const { test, expect } = require('@playwright/test');
async function open(page, id='g6_plane_002', category='平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 await page.locator('#prac-cat-grid .prac-cat-card').filter({hasText:category}).click();
 if(category==='平面図形') await expect(page.locator('#prac-prob-list-body .prac-prob-card')).toHaveCount(26);
 await page.evaluate(id=>window.pracOpenProb(id),id);
 await expect(page.locator('#prac-detail-view')).toBeVisible();
 await expect(page.locator('#prac-variant-nav')).toBeHidden();
}
async function grade(page, answer) {
 await page.locator('#prac-ans-input').fill(String(answer));
 await page.locator('#prac-detail-body .prac-check-btn').click();
 await expect(page.locator('#prac-result-box')).toBeVisible();
}
async function records(page) {return page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records);}
async function withinViewport(page, locator) {
 const box=await locator.boundingBox(); expect(box).not.toBeNull();
 expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(page.viewportSize().width);
}
test('base to both variants, dynamic numbering, diagrams and final guidance', async({page})=>{
 await open(page); await grade(page,40);
 const nav=page.locator('#prac-variant-nav'); await expect(nav).toBeVisible();
 await expect(nav).toContainText('同じ考え方でもう1問');
 await expect(nav).toContainText('問25 三角形の面積（類題1）〈数値を変えた問題〉');
 await withinViewport(page,nav);
 const historyBefore=await page.evaluate(()=>history.length);
 await nav.getByRole('button',{name:'この問題へ →'}).click();
 expect(await page.evaluate(()=>history.length)).toBe(historyBefore+1);
 await expect(page.locator('.prac-detail-q')).toHaveText('底辺14cm、高さ9cmの三角形の面積を求めなさい。');
 await expect(page.locator('#prac-screen-title')).toContainText('問25');
 await expect(nav).toBeHidden();
 const svg1=page.locator('#prac-detail-body svg').first();
 await expect(svg1).toHaveAttribute('viewBox','0 0 326 216');
 await expect(svg1.locator('polygon')).toHaveAttribute('points','40,166 236,166 138,40');
 await withinViewport(page,svg1);
 await grade(page,63);await expect(nav).toContainText('問26');await withinViewport(page,nav);
 await nav.getByRole('button',{name:'この問題へ →'}).click();
 await expect(page.locator('.prac-detail-q')).toContainText('頂点が下を向いている、底辺11cm、高さ8cm');
 const svg2=page.locator('#prac-detail-body svg').first();
 await expect(svg2).toHaveAttribute('viewBox','0 0 284 194');
 await expect(svg2.locator('polygon')).toHaveAttribute('points','40,56 194,56 117,168');
 await withinViewport(page,svg2);
 await grade(page,44);await expect(nav).toContainText('このセットの最後の問題です。');
 await expect(nav.getByRole('button')).toHaveCount(0);await withinViewport(page,nav);
});
test('wrong answer and reveal share guidance; retry hides it until next grading',async({page})=>{
 await open(page); await grade(page,0);
 const nav=page.locator('#prac-variant-nav');await expect(nav).toBeVisible(); const text=await nav.textContent();
 await page.locator('#prac-result-box .reveal-ans-btn').click();await expect(nav).toBeVisible();
 await page.locator('#prac-result-box .retry-btn').click();await expect(nav).toBeHidden();await expect(page.locator('#prac-result-box')).toBeHidden();
 await grade(page,40);expect(await nav.textContent()).toBe(text);
 await page.locator('#prac-result-box .retry-btn').click();await expect(nav).toBeHidden();
});
test('back forward and refresh restore results and guidance without duplicate records',async({page})=>{
 await open(page);await grade(page,40);const nav=page.locator('#prac-variant-nav');const baseRecords=await records(page);
 await page.reload();await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(nav).toBeVisible();
 expect(await records(page)).toEqual(baseRecords);
 await nav.getByRole('button',{name:'この問題へ →'}).click();await grade(page,63);const bothRecords=await records(page);
 await page.goBack();await expect(page.locator('#prac-screen-title')).toContainText('三角形の面積（基本）');
 await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(nav).toContainText('問25');await expect(nav).toBeVisible();
 await page.locator('#prac-detail-body .prac-check-btn').click();expect(await records(page)).toEqual(bothRecords);
 await page.goForward();await expect(page.locator('#prac-screen-title')).toContainText('問25');
 await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(nav).toBeVisible();await expect(nav).toContainText('問26');
 await page.reload();await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(nav).toBeVisible();expect(await records(page)).toEqual(bothRecords);
});
test('unrelated plane problem keeps guidance hidden and list-order next button unchanged',async({page})=>{
 await open(page,'g6_plane_001');await grade(page,await page.evaluate(()=>PRACTICE_PROBLEMS.find(p=>p.id===pracState.currentProbId).answer));
 await expect(page.locator('#prac-variant-nav')).toBeHidden();await expect(page.locator('#prac-variant-nav')).toBeEmpty();
 await page.locator('#prac-next-prob-btn').click();expect(await page.evaluate(()=>pracState.currentProbId)).toBe('g6_plane_002');
});
test('unrelated ratio category retains grading without variant guidance',async({page})=>{
 await page.goto('/');await page.locator('#grade-screen .grade-card.g6').click();await page.locator('#home-screen .course-card.exam').click();await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 await page.locator('#prac-cat-grid .prac-cat-card').filter({hasText:'割合・比'}).click();await page.locator('#prac-prob-list-body .prac-prob-card').first().click();
 await grade(page,await page.evaluate(()=>PRACTICE_PROBLEMS.find(p=>p.id===pracState.currentProbId).answer));await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(page.locator('#prac-variant-nav')).toBeHidden();
});
