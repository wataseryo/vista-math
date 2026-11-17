const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const before010 = require('../sprints/plane-p31-base-height-ratio/evidence/g6-plane-010-before.json');

async function open(page, id, category = '平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const cat = page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText:category });
 if (category === '平面図形') await expect(cat).toContainText('42問');
 await cat.click();
 if (category === '平面図形') await expect(page.locator('#prac-prob-list-body .prac-prob-card')).toHaveCount(42);
 await page.locator(`#prac-prob-list-body .prac-prob-card[onclick="pracOpenProb('${id}')"]`).click();
 await expect(page.locator('#prac-detail-view')).toBeVisible();
}
async function grade(page, answer) {
 await page.locator('#prac-ans-input').fill(String(answer));
 await page.locator('#prac-detail-body .prac-check-btn').click();
 await expect(page.locator('#prac-result-box')).toContainText('正解');
}
async function withinViewport(page, locator) {
 const box = await locator.boundingBox();
 expect(box).not.toBeNull();
 expect(box.x).toBeGreaterThanOrEqual(0);
 expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
}
function monitor(page) {
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 page.on('console', message => {
  if (message.type() === 'error' && !message.location().url.includes('favicon.ico') && !message.text().includes('favicon.ico')) errors.push(message.text());
 });
 return errors;
}
async function resetHeightRatio(page) {
 await page.locator('#pe-hr-reset').click();
 await expect(page.locator('#pe-hr-guide')).toHaveAttribute('hidden','');
 await expect(page.locator('#pe-hr-guide-label')).toHaveAttribute('hidden','');
 await expect(page.locator('#pe-hr-steps .plane-expand-step')).toHaveCount(0);
 await expect(page.locator('#pe-hr-result')).not.toHaveClass(/visible/);
 await expect(page.locator('#pe-hr-play')).toBeEnabled();
}

test('P-31 question 41: ratios, grading, four stages, reset and cancellation', async ({ page }) => {
 const errors = monitor(page);
 await page.emulateMedia({ reducedMotion:'no-preference' });
 await open(page,'g6_plane_031');
 await expect(page.locator('#prac-screen-title')).toContainText('問41 底辺も高さもちがう三角形の面積比');
 const body=page.locator('#prac-detail-body');
 for(const text of ['底辺の比は3:2','高さの比は4:3','18cm²']) await expect(body).toContainText(text);
 const svg=body.locator('svg').first();
 await expect(svg).toHaveAttribute('role','img');
 await expect(svg).toContainText('底辺の比 3:2');
 await expect(svg).toContainText('高さの比 4:3');
 await withinViewport(page,svg);
 await grade(page,36);
 const initialStatus=await page.locator('#pe-br-status').textContent();
 const resetState=async()=>{
  await expect(page.locator('#pe-br-a-area')).toHaveText('？');
  for(const id of ['base-label','height-line','height-label']) await expect(page.locator('#pe-br-'+id)).toHaveAttribute('hidden','');
  await expect(page.locator('#pe-br-result')).not.toHaveClass(/visible/);
  await expect(page.locator('#pe-br-steps .plane-expand-step')).toHaveCount(0);
  await expect(page.locator('#pe-br-status')).toHaveText(initialStatus);
  await expect(page.locator('#pe-br-play')).toBeEnabled();
 };
 await resetState();
 await withinViewport(page,page.locator('#pe-br-play'));
 await page.locator('#pe-br-play').click();
 await expect(page.locator('#pe-br-base-label')).not.toHaveAttribute('hidden');
 await expect(page.locator('#pe-br-height-line')).not.toHaveAttribute('hidden',{timeout:2000});
 await expect(page.locator('#pe-br-height-label')).not.toHaveAttribute('hidden');
 await expect(page.locator('#pe-br-steps .plane-expand-step')).toHaveCount(4,{timeout:5000});
 await expect(page.locator('#pe-br-steps .plane-expand-step')).toHaveText([
  '① 三角形Aと三角形Bの底辺の比は3:2。',
  '② 三角形Aと三角形Bの高さの比は4:3。',
  '③ 面積の比は、底辺の比×高さの比で求める。\n(3×4):(2×3)＝12:6＝2:1。',
  '④ 三角形Bの面積18cm²を2:1の比にあてはめると、三角形Aの面積は36cm²。'
 ]);
 await expect(page.locator('#pe-br-a-area')).toHaveText('36cm²');
 await expect(page.locator('#pe-br-result')).toHaveClass(/visible/);
 await expect(page.locator('#pe-br-result')).toHaveText('底辺の比3:2×高さの比4:3＝面積の比2:1\n18×2÷1＝36cm²');
 await page.locator('#pe-br-reset').click();await resetState();
 await page.locator('#pe-br-play').click();await page.locator('#pe-br-reset').click();
 await page.waitForTimeout(2800);await resetState();
 const records=await page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records);
 expect(JSON.parse(records.vista_history).g6_plane_031).toBeDefined();
 expect(errors).toEqual([]);
});

test('P-10 question 42: 3:2 grading and correct dynamic ratios, reset', async ({ page }) => {
 const errors=monitor(page);
 await page.emulateMedia({ reducedMotion:'no-preference' });
 await open(page,'g6_plane_032');
 await expect(page.locator('#prac-screen-title')).toContainText('問42 補助線で分けた三角形の面積(その2)');
 for(const text of ['底辺25cm','高さ6cm','3:2']) await expect(page.locator('#prac-detail-body')).toContainText(text);
 const svg=page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('role','img');
 await expect(svg).toContainText('底辺 25cm');await expect(svg).toContainText('高さ 6cm');
 await expect(svg.locator('polygon').first()).toHaveAttribute('points','30,168 156,168 156,117.6');
 await expect(svg.locator('polygon').nth(1)).toHaveAttribute('points','156,168 240,168 156,117.6');
 await withinViewport(page,svg);
 await grade(page,30);
 await expect(page.locator('#pe-hr-desc')).toHaveText('底辺を3:2に分けた2つの三角形は、同じ高さを共有している。');
 await expect(page.locator('#pe-hr-status')).toContainText('底辺の比は3:2。');
 await page.locator('#pe-hr-play').click();
 const steps=page.locator('#pe-hr-steps .plane-expand-step');
 await expect(steps).toHaveCount(4,{timeout:5000});
 for(const n of [1,2]) { await expect(steps.nth(n)).toContainText('3:2');await expect(steps.nth(n)).not.toContainText('3:1'); }
 await expect(steps.nth(1)).toHaveText('② 底辺は、大きい方15cm・小さい方10cm。\n比は15:10＝3:2。');
 await expect(steps.nth(2)).toHaveText('③ 面積は、大きい方15×6÷2＝45cm²、\n小さい方10×6÷2＝30cm²。\n比は45:30＝3:2。');
 await expect(page.locator('#pe-hr-result')).toHaveClass(/visible/);
 await expect(page.locator('#pe-hr-result')).toHaveText('高さ6cmが同じ\n底辺の比15:10＝3:2\n面積の比45:30＝3:2');
 await resetHeightRatio(page);
 expect(errors).toEqual([]);
});

test('g6_plane_010: every displayed string exactly matches pre-implementation snapshot', async ({ page }) => {
 const errors=monitor(page);
 await page.emulateMedia({ reducedMotion:'no-preference' });
 await open(page,'g6_plane_010');await grade(page,36);
 expect(await page.locator('#pe-hr-desc').textContent()).toBe(before010.desc);
 expect(await page.locator('#pe-hr-status').textContent()).toBe(before010.initialStatus);
 expect(await page.locator('#pe-hr-result').textContent()).toBe(before010.result);
 await expect(page.locator('#pe-hr-result')).not.toHaveClass(/visible/);
 await page.locator('#pe-hr-play').click();
 const steps=page.locator('#pe-hr-steps .plane-expand-step');
 await expect(steps).toHaveCount(4,{timeout:5000});
 // Raw textContent equality intentionally preserves newlines and every character.
 expect(await steps.allTextContents()).toEqual(before010.steps);
 expect(await page.locator('#pe-hr-status').textContent()).toBe(before010.initialStatus);
 expect(await page.locator('#pe-hr-result').textContent()).toBe(before010.result);
 await expect(page.locator('#pe-hr-result')).toHaveClass(/visible/);
 await resetHeightRatio(page);
 expect(await page.locator('#pe-hr-status').textContent()).toBe(before010.initialStatus);
 await withinViewport(page,page.locator('#pe-hr-play'));
 expect(errors).toEqual([]);
});

test('g6_plane_013: unchanged scale visual stages and result', async ({ page }) => {
 const errors=monitor(page);
 await page.emulateMedia({ reducedMotion:'no-preference' });
 await open(page,'g6_plane_013');await grade(page,30);
 await page.locator('#pe-ts-play').click();
 const steps=page.locator('#pe-ts-steps .plane-expand-step');
 await expect(steps).toHaveCount(3,{timeout:4000});
 expect(await steps.allTextContents()).toEqual(['① 三角形Bの面積＝a×h÷2','② 三角形Aの面積＝2a×h÷2\n＝2×(a×h÷2)','③ だから、面積はBのちょうど2倍になる。']);
 await expect(page.locator('#pe-ts-result')).toHaveClass(/visible/);
 await expect(page.locator('#pe-ts-result')).toHaveText('底辺をm倍・高さをn倍にすると、面積はm×n倍\n同じ倍率(m＝n)なら、面積はその2乗倍になる');
 await withinViewport(page,page.locator('#pe-ts-play'));
 await page.locator('#pe-ts-reset').click();
 await expect(steps).toHaveCount(0);await expect(page.locator('#pe-ts-result')).not.toHaveClass(/visible/);
 expect(errors).toEqual([]);
});

test('other visuals, existing variant destination and another category remain intact', async ({ page }) => {
 const errors=monitor(page);
 for(const key of ['inverse-proportion','equal-height-slide','merge-triangles']) {
  await page.goto('/');
  const p=await page.evaluate(key=>PRACTICE_PROBLEMS.find(p=>p.expandVisual===key),key);
  expect(p).toBeDefined();await open(page,p.id);await grade(page,p.answer);
  await page.locator('.plane-expand-stage .plane-anim-btn.play').click();
  await expect(page.locator('.plane-expand-stage .formula-reveal')).toHaveClass(/visible/,{timeout:5000});
  await page.locator('.plane-expand-stage .plane-anim-btn.reset').click();
  await expect(page.locator('.plane-expand-stage .formula-reveal')).not.toHaveClass(/visible/);
 }
 await open(page,'g6_plane_002');await grade(page,40);
 await expect(page.locator('#prac-variant-nav button')).toHaveAttribute('onclick',"pracOpenNextVariant('g6_plane_002_v01')");
 const ratio=await page.evaluate(()=>PRACTICE_PROBLEMS.find(p=>p.grade===6&&p.course==='exam'&&p.catId==='pc-ratio'));
 await open(page,ratio.id,'割合・比');await grade(page,ratio.answer);
 expect(errors).toEqual([]);
});

test('reduced motion completes all four P-31 stages immediately', async ({ page }) => {
 const errors=monitor(page);
 await page.emulateMedia({ reducedMotion:'reduce' });
 await open(page,'g6_plane_031');await grade(page,36);
 await page.locator('#pe-br-play').click();
 const state=await page.evaluate(()=>({
  area:document.querySelector('#pe-br-a-area').textContent,
  steps:document.querySelectorAll('#pe-br-steps .plane-expand-step').length,
  result:document.querySelector('#pe-br-result').classList.contains('visible'),
  hidden:['base-label','height-line','height-label'].some(id=>document.querySelector('#pe-br-'+id).hasAttribute('hidden'))
 }));
 expect(state).toEqual({area:'36cm²',steps:4,result:true,hidden:false});
 expect(errors).toEqual([]);
});

test('content validation reports 242 problems with zero errors',()=>{
 const output=execFileSync(process.execPath,['scripts/validate-content.cjs'],{cwd:path.resolve(__dirname,'..'),encoding:'utf8'});
 expect(output).toContain('242 problems; 0 errors');
});
