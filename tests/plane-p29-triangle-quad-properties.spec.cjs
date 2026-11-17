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
  if (message.type() === 'error' && !message.location().url.includes('favicon.ico')) errors.push(message.text());
 });
 return errors;
}
async function rotate(page, prefix, result) {
 const button = page.locator(`#${prefix}-play`);
 await withinViewport(page, button);
 await button.click();
 await expect(page.locator(`#${prefix}-dup`)).toBeVisible();
 await expect(page.locator(`#${prefix}-result`)).toHaveClass(/visible/);
 await expect(page.locator(`#${prefix}-result`)).toContainText(result);
}
const cases = [
 { id: 'g6_plane_024', number: 34, title: '二等辺三角形の角の性質', answer: 54, labels: ['63°', '？'], viewBox: '0 0 240 200', points: '120,30 40,170 200,170', fill: '#90CAF9', stroke: '#1565C0', expand: '二等辺三角形を、頂角Aから底辺BCへ垂直に引いた線で折ると' },
 { id: 'g6_plane_025', number: 35, title: '平行四辺形の対角線の交点', answer: 15, labels: ['対角線AC 18cm', '対角線BD 12cm', 'O'], viewBox: '0 0 320 210', points: '52,51 88,141 268,159 232,69', fill: '#A5D6A7', stroke: '#2E7D32', expand: '対角線が互いの中点で交わるという性質は' },
 { id: 'g6_plane_026', number: 36, title: '正方形の対角線と三角形の面積', answer: 32, labels: ['対角線 16cm', 'O', '？'], viewBox: '0 0 320 320', points: '160,40 280,160 160,280 40,160', fill: '#CE93D8', stroke: '#6A1B9A' },
];
for (const c of cases) test(`${c.id}: diagram, answer, expansion and viewport`, async ({ page }) => {
 const errors = monitor(page);
 await open(page, c.id);
 await expect(page.locator('#prac-screen-title')).toContainText(`問${c.number} ${c.title}`);
 const problemText = await page.evaluate(id => PRACTICE_PROBLEMS.find(p => p.id === id).text, c.id);
 await expect(page.locator('.prac-detail-q')).toHaveText(problemText);
 const svg = page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('role', 'img');
 await expect(svg).toHaveAttribute('aria-label', /.+/);
 await expect(svg).toHaveAttribute('viewBox', c.viewBox);
 await expect(svg.locator('polygon').first()).toHaveAttribute('points', c.points);
 await expect(svg.locator('polygon').first()).toHaveAttribute('fill', c.fill);
 await expect(svg.locator('polygon').first()).toHaveAttribute('stroke', c.stroke);
 for (const label of c.labels) await expect(svg).toContainText(label);
 await withinViewport(page, svg);
 await grade(page, c.answer);
 if (c.expand) {
  await expect(page.locator('#prac-detail-body')).toContainText(c.expand);
  await expect(page.locator('#prac-detail-body .plane-anim-btn, #prac-detail-body .plane-expand-chip')).toHaveCount(0);
  await expect(page.locator('#prac-detail-body .plane-expand-stage')).toHaveCount(0);
 } else {
  await rotate(page, 'pe-dq', 'OAB＝OCD、2つで全体の50%');
  await withinViewport(page, page.locator('#pe-dq-play'));
 }
 const records = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
 expect(JSON.parse(records.vista_history)[c.id]).toBeDefined();
 await page.evaluate(() => pracCheckAnswer());
 expect(await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records)).toEqual(records);
 expect(errors).toEqual([]);
});

test('shared diagonal-quarter remains independent across existing and new problems', async ({ page }) => {
 const errors = monitor(page);
 for (const id of ['g6_plane_015', 'g6_plane_026', 'g6_plane_015']) {
  await open(page, id);
  await grade(page, await page.evaluate(id => PRACTICE_PROBLEMS.find(p => p.id === id).answer, id));
  await expect(page.locator('#pe-dq-result')).not.toHaveClass(/visible/);
  await rotate(page, 'pe-dq', '50%');
  await page.locator('#pe-dq-reset').click();
  await expect(page.locator('#pe-dq-result')).not.toHaveClass(/visible/);
 }
 expect(errors).toEqual([]);
});

test('existing diagonal, formula slots, ratio and variant guidance remain usable', async ({ page }) => {
 const errors = monitor(page);
 await open(page, 'g6_plane_009');
 await grade(page, await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.id === 'g6_plane_009').answer));
 await rotate(page, 'pe-dg', '三角形ABD＝三角形CBD');
 for (const [id, prefix] of [['g6_plane_021', 'pe-fs-square'], ['g6_plane_022', 'pe-fs-rect'], ['g6_plane_023', 'pe-fs-rhombus']]) {
  await open(page, id);
  await grade(page, await page.evaluate(id => PRACTICE_PROBLEMS.find(p => p.id === id).answer, id));
  await page.locator(`#${prefix}-eq .plane-expand-chip[data-key="area"]`).click();
  await expect(page.locator(`#${prefix}-steps .plane-expand-step`).last()).toHaveClass(/shown/);
 }
 await open(page, 'g6_plane_002');
 await grade(page, 40);
 await expect(page.locator('#prac-variant-nav')).toContainText('同じ考え方でもう1問');
 await expect(page.locator('#prac-variant-nav button')).toHaveAttribute('onclick', "pracOpenNextVariant('g6_plane_002_v01')");
 const ratioId = await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.grade === 6 && p.course === 'exam' && p.catId === 'pc-ratio').id);
 await open(page, ratioId, '割合・比');
 await grade(page, await page.evaluate(id => PRACTICE_PROBLEMS.find(p => p.id === id).answer, ratioId));
 expect(errors).toEqual([]);
});

test('content validation reports 244 problems with zero errors', () => {
 const output = execFileSync(process.execPath, ['scripts/validate-content.cjs'], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
 expect(output).toContain('244 problems; 0 errors');
});
