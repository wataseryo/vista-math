const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

async function open(page, id, category = '平面図形') {
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 const cat = page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: category });
 if (category === '平面図形') await expect(cat).toContainText('40問');
 await cat.click();
 const cards = page.locator('#prac-prob-list-body .prac-prob-card');
 if (category === '平面図形') await expect(cards).toHaveCount(40);
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
async function derivation(page, prefix, key, lines) {
 await page.locator(`#${prefix}-eq .plane-expand-chip[data-key="${key}"]`).click();
 const steps = page.locator(`#${prefix}-steps .plane-expand-step`);
 await expect(steps).toHaveText(lines);
 await expect(steps.last()).toHaveClass(/shown/);
 for (const chip of await page.locator(`#${prefix}-eq .plane-expand-chip`).all()) await withinViewport(page, chip);
 await withinViewport(page, page.locator(`#${prefix}-eq`));
}
const cases = [
 { id: 'g6_plane_021', number: 31, title: '正方形の面積（基本）', answer: 81, prefix: 'pe-fs-square',
   text: '1辺が9cmの正方形があります。面積を求めなさい。', viewBox: '0 0 220 210', points: '47,40 173,40 173,166 47,166', fill: '#CE93D8', stroke: '#6A1B9A', labels: ['1辺 9cm'],
   directions: { area: ['面積 ＝ 1辺 × 1辺', '面積 ＝ 9 × 9', '面積 ＝ 81'] } },
 { id: 'g6_plane_022', number: 32, title: '長方形の面積（基本）', answer: 66, prefix: 'pe-fs-rect',
   text: 'たて6cm、よこ11cmの長方形があります。面積を求めなさい。', viewBox: '0 0 280 170', points: '50,40 204,40 204,124 50,124', fill: '#FFF59D', stroke: '#F9A825', labels: ['よこ 11cm', 'たて 6cm'],
   directions: {
    vertical: ['たて × よこ ＝ 面積', 'たて ＝ 面積 ÷ よこ', 'たて ＝ 66 ÷ 11', 'たて ＝ 66 ÷ 11 ＝ 6'],
    horizontal: ['たて × よこ ＝ 面積', 'よこ ＝ 面積 ÷ たて', 'よこ ＝ 66 ÷ 6', 'よこ ＝ 66 ÷ 6 ＝ 11'],
    area: ['面積 ＝ たて × よこ', '面積 ＝ 6 × 11', '面積 ＝ 6 × 11 ＝ 66'] } },
 { id: 'g6_plane_023', number: 33, title: 'ひし形の面積（基本）', answer: 70, prefix: 'pe-fs-rhombus',
   text: '対角線の長さが14cmと10cmのひし形があります。面積を求めなさい。', viewBox: '0 0 320 220', points: '160,40 258,110 160,180 62,110', fill: '#80CBC4', stroke: '#00695C', labels: ['対角線 14cm', '対角線 10cm'],
   directions: {
    diag1: ['対角線1 × 対角線2 ÷ 2 ＝ 面積', '対角線1 × 対角線2 ＝ 面積 × 2', '対角線1 ＝ 面積 × 2 ÷ 対角線2', '対角線1 ＝ 70 × 2 ÷ 10', '対角線1 ＝ 140 ÷ 10 ＝ 14'],
    diag2: ['対角線1 × 対角線2 ÷ 2 ＝ 面積', '対角線1 × 対角線2 ＝ 面積 × 2', '対角線2 ＝ 面積 × 2 ÷ 対角線1', '対角線2 ＝ 70 × 2 ÷ 14', '対角線2 ＝ 140 ÷ 14 ＝ 10'],
    area: ['面積 ＝ 対角線1 × 対角線2 ÷ 2', '面積 ＝ 14 × 10 ÷ 2', '面積 ＝ 140 ÷ 2 ＝ 70'] } },
];
for (const c of cases) test(`${c.id}: scaled SVG, grading, formula directions and viewport`, async ({ page }) => {
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 page.on('console', message => { if (message.type() === 'error' && !message.location().url.includes('favicon.ico')) errors.push(message.text()); });
 await open(page, c.id);
 await expect(page.locator('#prac-screen-title')).toContainText(`問${c.number} ${c.title}`);
 await expect(page.locator('.prac-detail-q')).toHaveText(c.text);
 const svg = page.locator('#prac-detail-body svg').first();
 await expect(svg).toHaveAttribute('viewBox', c.viewBox);
 await expect(svg).toHaveAttribute('role', 'img');
 await expect(svg).toHaveAttribute('aria-label', /cm/);
 await expect(svg.locator('polygon')).toHaveAttribute('points', c.points);
 await expect(svg.locator('polygon')).toHaveAttribute('fill', c.fill);
 await expect(svg.locator('polygon')).toHaveAttribute('stroke', c.stroke);
 for (const label of c.labels) await expect(svg).toContainText(label);
 await withinViewport(page, svg);
 await grade(page, c.answer);
 await expect(page.locator('#prac-variant-nav')).toBeHidden();
 await expect(page.locator(`#${c.prefix}-eq`)).toBeVisible();
 if (c.number === 31) {
  await expect(page.locator(`#${c.prefix}-eq .plane-expand-chip`)).toHaveCount(1);
  const labels = page.locator(`#${c.prefix}-eq .plane-expand-chip-static`);
  await expect(labels).toHaveText(['1辺', '1辺']);
  for (const label of await labels.all()) {
   await expect(label).toHaveCSS('cursor', 'default');
   await label.click();
   await expect(page.locator(`#${c.prefix}-steps`)).toBeEmpty();
  }
 }
 for (const [key, lines] of Object.entries(c.directions)) await derivation(page, c.prefix, key, lines);
 if (c.number === 31) {
  const steps = page.locator(`#${c.prefix}-steps`);
  const before = await steps.innerHTML();
  for (const label of await page.locator(`#${c.prefix}-eq .plane-expand-chip-static`).all()) await label.click();
  expect(await steps.innerHTML()).toBe(before);
 }
 const records = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
 await page.evaluate(() => pracCheckAnswer());
 expect(await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records)).toEqual(records);
 expect(errors).toEqual([]);
});

test('existing triangle formula, ratio grading and variant guidance remain intact', async ({ page }) => {
 await open(page, 'g6_plane_004'); await grade(page, 8);
 await derivation(page, 'pe-fs-tri', 'height', ['底辺 × 高さ ÷ 2 ＝ 面積', '底辺 × 高さ ＝ 面積 × 2', '高さ ＝ 面積 × 2 ÷ 底辺', '高さ ＝ 36 × 2 ÷ 9', '高さ ＝ 72 ÷ 9 ＝ 8']);
 await open(page, 'g6_plane_002'); await grade(page, 40);
 const nav = page.locator('#prac-variant-nav');
 await expect(nav).toContainText('同じ考え方でもう1問');
 await expect(nav.getByRole('button')).toHaveAttribute('onclick', "pracOpenNextVariant('g6_plane_002_v01')");
 await page.goto('/');
 await page.locator('#grade-screen .grade-card.g6').click();
 await page.locator('#home-screen .course-card.exam').click();
 await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
 await page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: '割合・比' }).click();
 await page.locator('#prac-prob-list-body .prac-prob-card').first().click();
 await grade(page, await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.id === pracState.currentProbId).answer));
 await expect(nav).toBeHidden();
});

test('content validation reports 240 problems with zero errors', () => {
 const output = execFileSync(process.execPath, ['scripts/validate-content.cjs'], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
 expect(output).toContain('240 problems; 0 errors');
});
