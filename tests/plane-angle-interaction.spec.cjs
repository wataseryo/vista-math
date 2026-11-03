const { test, expect } = require('@playwright/test');

async function openPlane(page) {
    await page.goto('/');
    await page.evaluate(() => { selectGrade(6); showScreen('exam'); openUnit('u6-plane'); });
}
const records = page => page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);

test('angle discovery, reset and keyboard controls leave learning records unchanged', async ({ page }) => {
    await openPlane(page);
    const before = await records(page);
    const play = page.locator('#plane-angle-play');
    await expect(page.locator('#plane-angle-guide')).toBeHidden();
    await expect(page.locator('#plane-angle-svg')).toContainText('50°');
    await expect(page.locator('#plane-angle-svg')).toContainText('35°');
    await play.click();
    await expect(page.locator('#plane-angle-guide')).toBeVisible();
    await expect(page.locator('#plane-angle-discovery')).toBeVisible();
    await expect(page.locator('#plane-angle-split')).toBeVisible();
    await expect(page.locator('#plane-angle-reveal')).toContainText('x＝50＋35＝85°');
    await expect(page.locator('#plane-angle-reveal .topic-step')).toHaveCount(4);
    await expect(page.locator('#plane-angle-comparison-after')).toBeVisible();
    await page.locator('#plane-angle-reset').click();
    await expect(play).toBeFocused();
    await expect(page.locator('#plane-angle-guide')).toBeHidden();
    await expect(page.locator('#plane-angle-reveal')).toBeHidden();
    await play.press('Enter');
    await expect(page.locator('#plane-angle-discovery')).toBeVisible();
    await page.locator('#plane-angle-reset').focus();
    await page.keyboard.press('Space');
    await expect(play).toBeFocused();
    await page.keyboard.press('Space');
    await expect(page.locator('#plane-angle-discovery')).toBeVisible();
    expect(await records(page)).toEqual(before);
});

test('reset and navigation cancel pending stages and returning starts a fresh example', async ({ page }) => {
    await openPlane(page);
    await page.locator('#plane-angle-play').click();
    await page.locator('#plane-angle-reset').click();
    await page.waitForTimeout(1100);
    await expect(page.locator('#plane-angle-split')).toBeHidden();
    await expect(page.locator('#plane-angle-reveal')).toBeHidden();
    await page.locator('#plane-angle-play').click();
    await page.evaluate(() => showScreen('exam'));
    await page.waitForTimeout(1100);
    await page.evaluate(() => openUnit('u6-plane'));
    await expect(page.locator('#plane-angle-guide')).toBeHidden();
    await expect(page.locator('#plane-angle-reveal')).toBeHidden();
    await expect(page.locator('#plane-angle-play')).toBeEnabled();
    await page.locator('#plane-angle-play').click();
    await expect(page.locator('#plane-angle-discovery')).toBeVisible();
});

test('reduced motion reveals every stage synchronously and layout fits viewport', async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openPlane(page);
    await page.locator('#plane-angle-example').scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath('plane-angle-before.png') });
    const immediate = await page.evaluate(() => {
        document.getElementById('plane-angle-play').click();
        return ['plane-angle-guide', 'plane-angle-split', 'plane-angle-discovery', 'plane-angle-reveal', 'plane-angle-comparison-after'].every(id => !document.getElementById(id).hasAttribute('hidden'));
    });
    expect(immediate).toBe(true);
    await expect(page.locator('#plane-angle-guide')).toBeVisible();
    await expect(page.locator('#plane-angle-split')).toBeVisible();
    await page.locator('#plane-angle-reveal').scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath('plane-angle-after.png') });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2)).toBe(true);
    const bounds = await page.locator('#plane-angle-svg').boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
});

test('all existing plane problems retain rendering and grading, including angle answer 85', async ({ page }) => {
    await openPlane(page);
    await page.locator('#plane-angle-play').click();
    await expect(page.locator('#plane-angle-discovery')).toBeVisible();
    const problems = await page.evaluate(() => PRACTICE_PROBLEMS.filter(p => p.catId === 'pc-plane' && p.grade === 6).map(p => ({ id: p.id, answer: p.answer, title: p.title })));
    const requiredIds = [
        ...Array.from({ length: 16 }, (_, i) => `g6_plane_${String(i + 1).padStart(3, '0')}`),
        ...Array.from({ length: 4 }, (_, i) => `u6_plane_trial_${String(i + 1).padStart(3, '0')}`),
    ];
    expect(new Set(problems.map(problem => problem.id)).size).toBe(problems.length);
    expect(problems.map(problem => problem.id)).toEqual(expect.arrayContaining(requiredIds));
    await page.evaluate(() => { showScreen('practice'); pracOpenCat('pc-plane'); });
    for (const problem of problems) {
        await page.evaluate(id => pracOpenProb(id), problem.id);
        await expect(page.locator('#prac-screen-title')).toHaveText(problem.title);
        await expect(page.locator('#prac-detail-body .prac-detail-q')).not.toBeEmpty();
        await page.locator('#prac-ans-input').fill(String(problem.answer));
        await page.locator('.prac-check-btn').click();
        await expect(page.locator('#prac-result-box')).toContainText('正解');
    }
    await page.evaluate(() => pracOpenProb('g6_plane_016'));
    await expect(page.locator('#prac-detail-body svg')).toBeVisible();
    await page.locator('#prac-ans-input').fill('84');
    await page.locator('.prac-check-btn').click();
    await expect(page.locator('#prac-ans-input')).toHaveClass(/wrong/);
    await page.locator('#prac-result-box .reveal-ans-btn').click();
    await expect(page.locator('#prac-result-box')).toContainText('85');
});

test('four existing plane trials keep the practice route', async ({ page }) => {
    await openPlane(page);
    await expect(page.locator('#u6-plane-nav')).toBeHidden();
    for (let i = 0; i < 4; i++) {
        await page.locator('#trial-u6-plane .topic-trial-choice[data-is-correct="true"]').click();
        await page.locator('#trial-next-u6-plane .topic-trial-next-btn').click();
    }
    await expect(page.locator('#prac-prob-list-body')).toBeVisible();
});
