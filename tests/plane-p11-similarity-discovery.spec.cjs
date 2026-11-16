const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

async function open(page, id, category = '平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const cat = page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: category });
 if (category === '平面図形') await expect(cat).toContainText('38問');
 await cat.click();
 if (category === '平面図形') await expect(page.locator('#prac-prob-list-body .prac-prob-card')).toHaveCount(38);
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
const cases = [
 { id: 'g6_plane_027', number: 37, answer: 12, prefix: 'pe-as', labels: ['AH 9cm', 'BH 16cm', '？'], triangles: ['tri-ach', 'tri-cbh'], arcs: ['arc-a', 'arc-bch', 'arc-b', 'arc-ach'], result: 'CH＝12cm' },
 { id: 'g6_plane_028', number: 38, answer: 2, prefix: 'pe-ps', labels: ['AP 6cm', 'BP 3cm', '9cm', '？'], triangles: ['tri-apd', 'tri-bqp'], arcs: ['arc-adp', 'arc-bpq', 'arc-apd', 'arc-bqp'], result: 'BQ＝6×3÷9＝2cm' },
];
for (const c of cases) test(`${c.id}: diagram, grading, four stages, cancellation and replay`, async ({ page }) => {
 const errors = monitor(page);
 await page.emulateMedia({ reducedMotion: 'no-preference' });
 await open(page, c.id);
 await expect(page.locator('#prac-screen-title')).toContainText(`問${c.number} `);
 const svg = page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('role', 'img');
 await expect(svg).toHaveAttribute('aria-label', /.+/);
 for (const label of c.labels) await expect(svg).toContainText(label);
 await withinViewport(page, svg);
 await grade(page, c.answer);
 const records = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
 expect(JSON.parse(records.vista_history)[c.id]).toBeDefined();
 await page.evaluate(() => pracCheckAnswer());
 expect(await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records)).toEqual(records);
 const at = suffix => page.locator(`#${c.prefix}-${suffix}`);
 await withinViewport(page, at('play'));
 await at('play').scrollIntoViewIfNeeded();
 const resetState = async () => {
  await expect(at('result')).not.toHaveClass(/visible/);
  await expect(at('steps').locator('.plane-expand-step')).toHaveCount(0);
  await expect(at('play')).toBeEnabled();
  for (const tri of c.triangles) await expect(at(tri)).toHaveAttribute('style', /opacity:\s*0/);
  for (const arc of c.arcs) await expect(at(arc)).toHaveAttribute('hidden', '');
 };
 await resetState();
 await at('play').click();
 await page.waitForTimeout(400);
 await expect(at('steps').locator('.plane-expand-step')).toHaveCount(1);
 for (const tri of c.triangles) await expect(at(tri)).toHaveAttribute('style', /opacity:\s*1/);
 expect(await at(c.triangles[0]).getAttribute('fill')).not.toEqual(await at(c.triangles[1]).getAttribute('fill'));
 await expect(at('steps').locator('.plane-expand-step')).toHaveCount(2, { timeout: 2000 });
 for (const arc of c.arcs.slice(0, 2)) {
  await expect(at(arc)).not.toHaveAttribute('hidden');
  await expect(at(arc).locator('path')).toHaveAttribute('stroke', '#F57F17');
 }
 for (const arc of c.arcs.slice(2)) await expect(at(arc)).toHaveAttribute('hidden', '');
 await expect(at('steps').locator('.plane-expand-step')).toHaveCount(3, { timeout: 2000 });
 for (const arc of c.arcs.slice(2)) {
  await expect(at(arc)).not.toHaveAttribute('hidden');
  await expect(at(arc).locator('path')).toHaveAttribute('stroke', '#7c3aed');
 }
 await expect(at('steps').locator('.plane-expand-step')).toHaveCount(4, { timeout: 2000 });
 await expect(at('result')).toHaveClass(/visible/);
 await expect(at('result')).toContainText(c.result);
 await at('reset').click();
 await resetState();
 // Reset during playback must cancel all pending callbacks.
 await at('play').click();
 await at('reset').click();
 await page.waitForTimeout(3000);
 await resetState();
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await at('play').click();
 await expect(at('steps').locator('.plane-expand-step')).toHaveCount(4);
 await expect(at('result')).toHaveClass(/visible/);
 expect(errors).toEqual([]);
});

test('existing visuals, variants and another category remain independent', async ({ page }) => {
 const errors = monitor(page);
 for (const [id, prefix] of [['g6_plane_014', 'pe-st'], ['g6_plane_016', 'pe-an'], ['g6_plane_026', 'pe-dq']]) {
  await open(page, id);
  await grade(page, await page.evaluate(id => PRACTICE_PROBLEMS.find(p => p.id === id).answer, id));
  await page.locator(`#${prefix}-play`).click();
  await expect(page.locator(`#${prefix}-result`)).toHaveClass(/visible/);
  await page.locator(`#${prefix}-reset`).click();
  await expect(page.locator(`#${prefix}-result`)).not.toHaveClass(/visible/);
 }
 await open(page, 'g6_plane_002');
 await grade(page, 40);
 await expect(page.locator('#prac-variant-nav button')).toHaveAttribute('onclick', "pracOpenNextVariant('g6_plane_002_v01')");
 const ratio = await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.grade === 6 && p.course === 'exam' && p.catId === 'pc-ratio'));
 await open(page, ratio.id, '割合・比');
 await grade(page, ratio.answer);
 expect(errors).toEqual([]);
});

test('content validation reports 238 problems with zero errors', () => {
 const output = execFileSync(process.execPath, ['scripts/validate-content.cjs'], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
 expect(output).toContain('238 problems; 0 errors');
});
