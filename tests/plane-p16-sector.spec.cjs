const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

async function open(page, id, category = '平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const cat = page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: category });
 if (category === '平面図形') await expect(cat).toContainText('44問');
 await cat.click();
 if (category === '平面図形') await expect(page.locator('#prac-prob-list-body .prac-prob-card')).toHaveCount(44);
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
async function resetState(page) {
 await expect(page.locator('#pe-sf-target')).toHaveText('？');
 for (const name of ['fraction-label','whole-label']) await expect(page.locator('#pe-sf-' + name)).toHaveAttribute('hidden','');
 await expect(page.locator('#pe-sf-steps .plane-expand-step')).toHaveCount(0);
 await expect(page.locator('#pe-sf-result')).not.toHaveClass(/visible/);
 await expect(page.locator('#pe-sf-play')).toBeEnabled();
}
for (const p of [
 { id:'g6_plane_033', number:43, title:'中心角からおうぎ形の弧の長さを求める', radius:9, angle:120, fraction:'1/3', answer:18.84, unit:'cm', target:'弧の長さ', whole:'円周', value:56.52, end:'160.6,135.0' },
 { id:'g6_plane_034', number:44, title:'中心角からおうぎ形の面積を求める', radius:10, angle:90, fraction:'1/4', answer:78.5, unit:'cm²', target:'おうぎ形の面積', whole:'面積', value:314, end:'170,100' },
]) {
 test(`P-16 question ${p.number}: grading, four stages, reset and cancellation`, async ({ page }) => {
  const errors = monitor(page);
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await open(page,p.id);
  await expect(page.locator('#prac-screen-title')).toContainText(`問${p.number} ${p.title}`);
  for (const text of [`半径${p.radius}cm`,`中心角${p.angle}°`]) await expect(page.locator('#prac-detail-body')).toContainText(text);
  const svg = page.locator('#prac-detail-body svg').first();
  await expect(svg).toHaveAttribute('role','img');
  await expect(svg).toHaveAttribute('aria-label',new RegExp(`半径${p.radius}cm、中心角${p.angle}°`));
  await expect(svg.locator('path')).toHaveAttribute('d',`M100,100 L100,30 A70,70 0 0 1 ${p.end} Z`);
  await withinViewport(page,svg);
  await grade(page,p.answer);
  await resetState(page);
  await expect(page.locator('#pe-sf-play')).toHaveText(p.target+'を求める');
  await withinViewport(page,page.locator('#pe-sf-play'));
  await page.locator('#pe-sf-play').click();
  await expect(page.locator('#pe-sf-fraction-label')).not.toHaveAttribute('hidden');
  await expect(page.locator('#pe-sf-whole-label')).not.toHaveAttribute('hidden',{timeout:2000});
  const steps = page.locator('#pe-sf-steps .plane-expand-step');
  await expect(steps).toHaveCount(4,{timeout:5000});
  await expect(steps).toHaveText([
   `① 中心角${p.angle}°は、360°の${p.fraction}。`,
   `② 円全体の${p.whole}は${p.value}${p.unit}。`,
   `③ ${p.target}＝円全体の${p.whole}×${p.fraction}。\n${p.value}×${p.fraction}＝${p.answer}${p.unit}。`,
   `④ 中心角の割合をかけるだけで、${p.target}が求まった。`,
  ]);
  await expect(page.locator('#pe-sf-target')).toHaveText(p.answer+p.unit);
  await expect(page.locator('#pe-sf-result')).toHaveClass(/visible/);
  await expect(page.locator('#pe-sf-result')).toHaveText(`中心角${p.angle}°／360°＝${p.fraction}\n${p.whole}${p.value}${p.unit}×${p.fraction}＝${p.target}${p.answer}${p.unit}`);
  await page.locator('#pe-sf-reset').click(); await resetState(page);
  await page.locator('#pe-sf-play').click(); await page.locator('#pe-sf-reset').click();
  await page.waitForTimeout(2800); await resetState(page);
  const records = await page.evaluate(()=>JSON.parse(VistaStorage.exportData()).records);
  expect(JSON.parse(records.vista_history)[p.id]).toBeDefined();
  expect(errors).toEqual([]);
 });
}

test('existing circle-radius, base-height, same-height, variant and other category regressions', async ({ page }) => {
 const errors = monitor(page);
 await page.emulateMedia({ reducedMotion:'no-preference' });
 await open(page,'g6_plane_019'); await grade(page,10);
 await page.locator('#pe-cr-play').click();
 await expect(page.locator('#pe-cr-count')).toHaveText('7 / 7',{timeout:7000});
 await expect(page.locator('#pe-cr-result')).toHaveClass(/visible/);
 for (const [id,answer,prefix] of [['g6_plane_031',36,'pe-br'],['g6_plane_010',36,'pe-hr']]) {
  await open(page,id); await grade(page,answer);
  await page.locator('#'+prefix+'-play').click();
  await expect(page.locator('#'+prefix+'-steps .plane-expand-step')).toHaveCount(4,{timeout:5000});
  await expect(page.locator('#'+prefix+'-result')).toHaveClass(/visible/);
  await page.locator('#'+prefix+'-reset').click();
  await expect(page.locator('#'+prefix+'-steps .plane-expand-step')).toHaveCount(0);
 }
 await open(page,'g6_plane_002'); await grade(page,40);
 await expect(page.locator('#prac-variant-nav button')).toHaveAttribute('onclick',"pracOpenNextVariant('g6_plane_002_v01')");
 const ratio = await page.evaluate(()=>PRACTICE_PROBLEMS.find(p=>p.grade===6&&p.course==='exam'&&p.catId==='pc-ratio'));
 await open(page,ratio.id,'割合・比'); await grade(page,ratio.answer);
 expect(errors).toEqual([]);
});

test('reduced motion completes the sector immediately', async ({ page }) => {
 const errors = monitor(page);
 await page.emulateMedia({ reducedMotion:'reduce' });
 await open(page,'g6_plane_033'); await grade(page,18.84);
 await page.locator('#pe-sf-play').click();
 const state = await page.evaluate(()=>({target:document.querySelector('#pe-sf-target').textContent, steps:document.querySelectorAll('#pe-sf-steps .plane-expand-step').length, result:document.querySelector('#pe-sf-result').classList.contains('visible'), hidden:['fraction-label','whole-label'].some(name=>document.querySelector('#pe-sf-'+name).hasAttribute('hidden'))}));
 expect(state).toEqual({target:'18.84cm',steps:4,result:true,hidden:false});
 expect(errors).toEqual([]);
});

test('content validation reports 244 problems with zero errors', () => {
 const output = execFileSync(process.execPath,['scripts/validate-content.cjs'],{cwd:path.resolve(__dirname,'..'),encoding:'utf8'});
 expect(output).toContain('244 problems; 0 errors');
});
