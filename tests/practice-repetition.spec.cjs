const { test, expect } = require('@playwright/test');
async function open(page, id='g6_plane_002', category='平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 await page.locator('#prac-cat-grid .prac-cat-card').filter({hasText:category}).click();
 if(category==='平面図形') await expect(page.locator('#prac-prob-list-body .prac-prob-card')).toHaveCount(36);
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

const inverseSets = [
 {id:'g6_plane_004', answer:8, noun:'三角形', firstNumber:27, variants:[
  {id:'g6_plane_004_v01',answer:12,base:7,area:42,viewBox:'0 0 228 258',points:'40,208 138,208 89,40'},
  {id:'g6_plane_004_v02',answer:9,base:16,area:72,viewBox:'0 0 354 208',points:'40,56 264,56 152,182'}]},
 {id:'g6_plane_005', answer:5, noun:'平行四辺形', firstNumber:29, variants:[
  {id:'g6_plane_005_v01',answer:6,base:15,area:90,viewBox:'0 0 368 174',points:'68,40 278,40 250,124 40,124'},
  {id:'g6_plane_005_v02',answer:12,base:8,area:96,viewBox:'0 0 270 258',points:'40,40 152,40 180,208 68,208'}]},
];
async function expectCurrent(page,id) {
 expect(await page.evaluate(()=>pracState.currentProbId)).toBe(id);
}
async function expectNext(page,set,index) {
 const nav=page.locator('#prac-variant-nav');
 const v=set.variants[index];
 await expect(nav).toBeVisible();
 await expect(nav).toContainText('同じ考え方でもう1問');
 await expect(nav).toContainText(`問${set.firstNumber+index} ${set.noun}の高さを求める（類題${index+1}${index ? '・向きを変えた問題' : ''}）〈数値を変えた問題〉`);
 const next=await nav.getByRole('button').getAttribute('onclick');
 expect(next).toBe(`pracOpenNextVariant('${v.id}')`);
 await expect(nav).not.toContainText(set.noun==='三角形' ? '平行四辺形' : '三角形');
 await expect(nav).not.toContainText('三角形の面積');
}
for (const set of inverseSets) {
 test(`${set.id}: both variants have scaled diagrams, isolated navigation and final guidance`,async({page})=>{
  await open(page,set.id);
  const baseSvg=page.locator('#prac-detail-body svg').first();
  const original={viewBox:await baseSvg.getAttribute('viewBox'),points:await baseSvg.locator('polygon').getAttribute('points')};
  await grade(page,set.answer);await expectNext(page,set,0);
  for (const [i,v] of set.variants.entries()) {
   const nav=page.locator('#prac-variant-nav');await withinViewport(page,nav);
   const historyBefore=await page.evaluate(()=>history.length);
   await nav.getByRole('button',{name:'この問題へ →'}).click();
   expect(await page.evaluate(()=>history.length)).toBe(historyBefore+1);
   await expectCurrent(page,v.id);expect(await page.evaluate(()=>pracState.answered)).toBe(false);
   await expect(nav).toBeHidden();await expect(page.locator('#prac-result-box')).toBeHidden();
   const q=page.locator('.prac-detail-q');await expect(q).toContainText(`${v.area}cm²`);await expect(q).toContainText(`${v.base}cm`);
   if(i===1) await expect(q).toContainText(set.noun==='三角形' ? '頂点が下' : '傾きの向きが逆');
   await expect(page.locator('#prac-screen-title')).toContainText(`問${set.firstNumber+i}`);
   const svg=page.locator('#prac-detail-body svg').first();
   await expect(svg).toHaveAttribute('viewBox',v.viewBox);await expect(svg.locator('polygon')).toHaveAttribute('points',v.points);
   expect(v.viewBox).not.toBe(original.viewBox);expect(v.points).not.toBe(original.points);
   await expect(svg).toHaveAttribute('role','img');await expect(svg).toHaveAttribute('aria-label',/高さは未知/);
   await expect(svg).toContainText(`面積${v.area}cm²`);await expect(svg).toContainText(`底辺 ${v.base}cm`);
   await expect(svg).toContainText('高さ ？');await expect(svg).not.toContainText(`高さ ${v.answer}cm`);
   await withinViewport(page,svg);
   await grade(page,v.answer);const saved=await records(page);
   await page.evaluate(()=>pracCheckAnswer());expect(await records(page)).toEqual(saved);
   if(i===0) await expectNext(page,set,1);
   else {await expect(nav).toContainText('このセットの最後の問題です。');await expect(nav.getByRole('button')).toHaveCount(0);}
   await withinViewport(page,nav);
  }
 });
 test(`${set.id}: incorrect and correct answers show identical guidance`,async({page})=>{
  await open(page,set.id);await grade(page,0);await expectNext(page,set,0);
  const nav=page.locator('#prac-variant-nav');const wrong=await nav.textContent();
  await page.locator('#prac-result-box .reveal-ans-btn').click();await expect(nav).toBeVisible();
  await page.locator('#prac-result-box .retry-btn').click();await expect(nav).toBeHidden();
  await grade(page,set.answer);expect(await nav.textContent()).toBe(wrong);
 });
 test(`${set.id}: back forward reload restore both variants without duplicate records`,async({page})=>{
  await open(page,set.id);await grade(page,set.answer);
  const nav=page.locator('#prac-variant-nav');const baseRecords=await records(page);
  await nav.getByRole('button').click();await expectCurrent(page,set.variants[0].id);
  await page.goBack();await expectCurrent(page,set.id);await expectNext(page,set,0);
  await expect(page.locator('#prac-result-box')).toContainText('正解');expect(await records(page)).toEqual(baseRecords);
  await page.goForward();await expectCurrent(page,set.variants[0].id);await expect(nav).toBeHidden();
  await grade(page,set.variants[0].answer);const both=await records(page);
  await page.reload();await expect(page.locator('#prac-result-box')).toContainText('正解');await expectNext(page,set,1);expect(await records(page)).toEqual(both);
  await nav.getByRole('button').click();await grade(page,set.variants[1].answer);const all=await records(page);
  await page.goBack();await expectCurrent(page,set.variants[0].id);await expectNext(page,set,1);
  await page.evaluate(()=>pracCheckAnswer());expect(await records(page)).toEqual(all);
  await page.goForward();await expectCurrent(page,set.variants[1].id);await expect(nav).toContainText('このセットの最後の問題です。');
  await page.reload();await expect(page.locator('#prac-result-box')).toContainText('正解');await expect(nav).toContainText('このセットの最後の問題です。');
  await page.evaluate(()=>pracCheckAnswer());expect(await records(page)).toEqual(all);
 });
}
test('three sets stay isolated through list switches, history and grading',async({page})=>{
 const sets=[{id:'g6_plane_002',answer:40,next:'g6_plane_002_v01',title:'三角形の面積（類題1）'},
  ...inverseSets.map(s=>({...s,next:s.variants[0].id,title:`${s.noun}の高さを求める（類題1）`}))];
 await open(page);
 for (const [i,set] of sets.entries()) {
  if(i) {
   await page.locator('#prac-detail-view .prac-prob-back').click();
   await page.locator(`#prac-prob-list-body .prac-prob-card[onclick="pracOpenProb('${set.id}')"]`).click();
  }
  await expectCurrent(page,set.id);expect(await page.evaluate(()=>pracState.answered)).toBe(false);
  await expect(page.locator('#prac-result-box')).toBeHidden();await expect(page.locator('#prac-variant-nav')).toBeHidden();
  await grade(page,set.answer);const nav=page.locator('#prac-variant-nav');await expect(nav).toContainText(set.title);
  expect(await nav.getByRole('button').getAttribute('onclick')).toBe(`pracOpenNextVariant('${set.next}')`);
  for(const other of sets.filter(s=>s.id!==set.id)) await expect(nav).not.toContainText(other.title);
  const saved=await records(page);const histories=JSON.parse(saved.vista_history);
  expect(Object.keys(histories).sort()).toEqual(sets.slice(0,i+1).map(s=>s.id).sort());
  for(const prior of sets.slice(0,i+1)) expect(histories[prior.id]).toEqual([true]);
  await page.evaluate(()=>pracCheckAnswer());expect(await records(page)).toEqual(saved);
 }
 const all=await records(page);
 await page.goBack();await expect(page.locator('#prac-prob-view')).toBeVisible();
 await page.goBack();await expectCurrent(page,'g6_plane_004');await expectNext(page,inverseSets[0],0);
 await expect(page.locator('#prac-result-box')).toContainText('正解');expect(await records(page)).toEqual(all);
 await page.goForward();await page.goForward();await expectCurrent(page,'g6_plane_005');await expectNext(page,inverseSets[1],0);expect(await records(page)).toEqual(all);
});
test('all four additions retain flat list order and numbering; unrelated inverse-free problem has no guidance',async({page})=>{
 await page.goto('/');await page.locator('#grade-screen .grade-card.g6').click();await page.locator('#home-screen .course-card.exam').click();await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const category=page.locator('#prac-cat-grid .prac-cat-card').filter({hasText:'平面図形'});await expect(category).toContainText('36問');await category.click();
 const cards=page.locator('#prac-prob-list-body .prac-prob-card');await expect(cards).toHaveCount(36);
 for(const [i,v] of inverseSets.flatMap(s=>s.variants).entries()) {
  const card=cards.nth(26+i);await expect(card.locator('.prac-prob-num')).toHaveText(`問${27+i}`);
  await expect(card).toHaveAttribute('onclick',`pracOpenProb('${v.id}')`);
 }
 await page.locator("#prac-prob-list-body .prac-prob-card[onclick=\"pracOpenProb('g6_plane_006')\"]").click();await grade(page,70);
 await expect(page.locator('#prac-variant-nav')).toBeHidden();await expect(page.locator('#prac-variant-nav')).toBeEmpty();
});
