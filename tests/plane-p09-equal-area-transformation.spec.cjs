const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

async function open(page, id, category = '平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const cat = page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: category });
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
  if (message.type() === 'error' && !message.location().url.includes('favicon.ico')) errors.push(message.text());
 });
 return errors;
}
test('vertex slide: question 39, grading, stages, fixed base, reset and cancellation', async ({ page }) => {
 const errors = monitor(page);
 await page.emulateMedia({ reducedMotion: 'no-preference' });
 await open(page, 'g6_plane_029');
 await expect(page.locator('#prac-screen-title')).toContainText('問39 ');
 const svg = page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('role', 'img');
 await expect(svg).toHaveAttribute('aria-label', /高さ6cm.*ABは10cm/);
 await expect(svg).toContainText('AB 10cm');
 await expect(svg).toContainText('高さ6cm');
 await expect(svg.locator('polygon')).toHaveAttribute('points', '110,124 250,124 140,40');
 await withinViewport(page, svg);
 await grade(page, 30);
 const records = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
 expect(JSON.parse(records.vista_history).g6_plane_029).toBeDefined();
 await page.evaluate(() => pracCheckAnswer());
 expect(await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records)).toEqual(records);
 const tri = page.locator('#pe-sl-tri');
 const points = () => tri.evaluate(el => Array.from(el.points).map(p => { const q = new DOMPoint(p.x, p.y).matrixTransform(el.getCTM()); return { x:q.x, y:q.y }; }));
 const initial = await points();
 const fixedBase = async () => {
  const current = await points();
  for (let i=0; i<2; i++) { expect(current[i].x).toBeCloseTo(initial[i].x, 4); expect(current[i].y).toBeCloseTo(initial[i].y, 4); }
  expect(current[2].y).toBeCloseTo(initial[2].y, 4);
  return current;
 };
 const resetState = async () => {
  expect(await tri.evaluate(el => el.style.transform)).toBe('');
  await expect(page.locator('#pe-sl-target-p2')).toHaveAttribute('hidden', '');
  await expect(page.locator('#pe-sl-target-p3')).toHaveAttribute('hidden', '');
  await expect(page.locator('#pe-sl-result')).not.toHaveClass(/visible/);
  await expect(page.locator('#pe-sl-steps .plane-expand-step')).toHaveCount(0);
  await expect(page.locator('#pe-sl-play')).toBeEnabled();
 };
 await resetState();
 await withinViewport(page, page.locator('#pe-sl-play'));
 await page.locator('#pe-sl-play').click();
 await expect(tri).toHaveAttribute('style', /skewX\(-38.66deg\)/);
 await expect(page.locator('#pe-sl-target-p2')).not.toHaveAttribute('hidden');
 await expect(page.locator('#pe-sl-target-p3')).toHaveAttribute('hidden', '');
 await expect(page.locator('#pe-sl-p-label')).toHaveAttribute('x', '230');
 await page.waitForTimeout(400);
 await fixedBase();
 await expect(page.locator('#pe-sl-steps .plane-expand-step')).toHaveCount(2, { timeout: 2000 });
 await expect(tri).toHaveAttribute('style', /skewX\(-57.99deg\)/);
 await expect(page.locator('#pe-sl-target-p3')).not.toHaveAttribute('hidden');
 await expect(page.locator('#pe-sl-p-label')).toHaveAttribute('x', '310');
 await expect(page.locator('#pe-sl-result')).toHaveClass(/visible/, { timeout: 2000 });
 await expect(page.locator('#pe-sl-result')).toContainText('30cm²');
 expect((await fixedBase())[2].x).toBeGreaterThan(initial[2].x);
 await page.locator('#pe-sl-reset').click();
 await resetState();
 await page.locator('#pe-sl-play').click();
 await page.locator('#pe-sl-reset').click();
 await page.waitForTimeout(2000);
 await resetState();
 expect(errors).toEqual([]);
});

test('different shapes: question 40, diagram, grading and text-only expansion', async ({ page }) => {
 const errors = monitor(page);
 await open(page, 'g6_plane_030');
 await expect(page.locator('#prac-screen-title')).toContainText('問40 ');
 const svg = page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('role', 'img');
 await expect(svg).toHaveAttribute('aria-label', /底辺9cm、高さ8cm/);
 for (const label of ['BC 9cm', 'EF 9cm', '高さ8cm']) await expect(svg).toContainText(label);
 await expect(svg.locator('polygon')).toHaveCount(2);
 await withinViewport(page, svg);
 await grade(page, 36);
 await expect(page.locator('#prac-detail-body')).toContainText('底辺の長さ');
 await expect(page.locator('#prac-detail-body .plane-anim-btn, #prac-detail-body .plane-expand-chip')).toHaveCount(0);
 const records = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
 expect(JSON.parse(records.vista_history).g6_plane_030).toBeDefined();
 expect(errors).toEqual([]);
});

test('reduced motion completes every step immediately with no transition', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await open(page, 'g6_plane_029');
 await grade(page, 30);
 await page.locator('#pe-sl-play').click();
 const state = await page.locator('#pe-sl-tri').evaluate(el => ({ transform:el.style.transform, duration:getComputedStyle(el).transitionDuration, steps:document.querySelectorAll('#pe-sl-steps .plane-expand-step').length, result:document.querySelector('#pe-sl-result').classList.contains('visible') }));
 expect(state).toEqual({ transform:'skewX(-57.99deg)', duration:'0s', steps:3, result:true });
 await expect(page.locator('#pe-sl-target-p2')).not.toHaveAttribute('hidden');
 await expect(page.locator('#pe-sl-target-p3')).not.toHaveAttribute('hidden');
});

test('inverse-proportion and other visuals, variants and another category remain intact', async ({ page }) => {
 const errors = monitor(page);
 await open(page, 'g6_plane_012');
 await grade(page, 3);
 await page.locator('#pe-ip-play').click();
 await expect(page.locator('#pe-ip-para')).toHaveClass(/squeezed/);
 await expect(page.locator('#pe-ip-result')).toHaveClass(/visible/);
 await expect(page.locator('#pe-ip-result')).toContainText('3cm');
 await expect(page.locator('#pe-ip-result')).toContainText('24cm²');
 await page.locator('#pe-ip-reset').click();
 await expect(page.locator('#pe-ip-para')).not.toHaveClass(/squeezed/);
 await expect(page.locator('#pe-ip-result')).not.toHaveClass(/visible/);
 for (const key of ['triangle-rotate', 'triangle-base-scale', 'merge-triangles']) {
  const p = await page.evaluate(key => PRACTICE_PROBLEMS.find(p => p.expandVisual === key), key);
  await open(page, p.id);
  await grade(page, p.answer);
  const play = page.locator('.plane-expand-stage .plane-anim-btn.play');
  await play.click();
  await expect(page.locator('.plane-expand-stage .formula-reveal')).toHaveClass(/visible/);
  await page.locator('.plane-expand-stage .plane-anim-btn.reset').click();
  await expect(page.locator('.plane-expand-stage .formula-reveal')).not.toHaveClass(/visible/);
 }
 await open(page, 'g6_plane_002');
 await grade(page, 40);
 await expect(page.locator('#prac-variant-nav button')).toHaveAttribute('onclick', "pracOpenNextVariant('g6_plane_002_v01')");
 const ratio = await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.grade === 6 && p.course === 'exam' && p.catId === 'pc-ratio'));
 await open(page, ratio.id, '割合・比');
 await grade(page, ratio.answer);
 expect(errors).toEqual([]);
});

test('content validation reports 242 problems with zero errors', () => {
 const output = execFileSync(process.execPath, ['scripts/validate-content.cjs'], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
 expect(output).toContain('242 problems; 0 errors');
});
