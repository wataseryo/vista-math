const { test, expect } = require('@playwright/test');

async function start(page) {
    await page.goto('/');
    await page.locator('#grade-screen .grade-card.g6').click();
    await page.locator('#home-screen .course-card.exam').click();
}
async function openPractice(page) {
    await start(page);
    await page.locator('#exam-mode-screen .exam-mode-card.prac').click();
    await page.locator('#prac-cat-grid .prac-cat-card').filter({ hasText: '割合・比' }).click();
    await page.locator('#prac-prob-list-body .prac-prob-card').first().click();
    await expect(page.locator('#prac-detail-view')).toBeVisible();
}
async function records(page) {
    return page.evaluate(() => {
        const saved = JSON.parse(VistaStorage.exportData()).records;
        return Object.fromEntries(['vista_stats', 'vista_history', 'math_stars'].map(key => [key, saved[key]]));
    });
}

test.describe('learning routes', () => {

        test('problem input survives topic detour and explicit return without grading', async ({ page }) => {
            await openPractice(page);
            const title = await page.locator('#prac-screen-title').textContent();
            await page.locator('#prac-ans-input').fill('123');
            const before = await records(page);
            await page.locator('.prac-topic-link').click();
            const back = page.locator('#problem-return-button');
            await expect(back).toBeVisible();
            const box = await back.boundingBox();
            expect(box.x).toBeGreaterThanOrEqual(0); expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
            await back.click();
            await expect(page.locator('#prac-screen-title')).toHaveText(title);
            await expect(page.locator('#prac-ans-input')).toHaveValue('123');
            expect(await records(page)).toEqual(before);
        });

        test('graded result and opened solution survive detour and refresh without duplicate grading', async ({ page }) => {
            await openPractice(page);
            const answer = await page.evaluate(() => PRACTICE_PROBLEMS.find(p => p.id === pracState.currentProbId).answer);
            await page.locator('#prac-ans-input').fill(String(answer));
            await page.locator('#prac-detail-body .prac-check-btn').click();
            await expect(page.locator('#prac-result-box')).toContainText('正解');
            await expect(page.locator('#prac-steps-card')).toBeVisible();
            const before = await records(page);
            expect(Object.values(JSON.parse(before.vista_stats)).reduce((total, row) => total + row.total, 0)).toBe(1);
            expect(Object.values(JSON.parse(before.vista_history)).reduce((total, row) => total + row.length, 0)).toBe(1);
            await page.locator('.prac-topic-link').click();
            await page.locator('#problem-return-button').click();
            await expect(page.locator('#prac-result-box')).toBeVisible();
            await expect(page.locator('#prac-result-box')).toContainText('正解');
            await expect(page.locator('#prac-ans-input')).toHaveValue(String(answer));
            await expect(page.locator('#prac-steps-card')).toBeVisible();
            await page.reload();
            await expect(page.locator('#prac-detail-view')).toBeVisible();
            await expect(page.locator('#prac-result-box')).toContainText('正解');
            // A restored answered question remains answered, even if its check button is pressed.
            const check = page.locator('#prac-detail-body .prac-check-btn');
            if (await check.isEnabled()) await check.click();
            expect(await records(page)).toEqual(before);
        });

        test('browser back and forward restore category, detail and unsent answer', async ({ page }) => {
            await openPractice(page);
            const title = await page.locator('#prac-screen-title').textContent();
            await page.locator('#prac-ans-input').fill('321');
            await page.goBack();
            await expect(page.locator('#prac-prob-view')).toBeVisible();
            await expect(page.locator('#prac-prob-section-title')).toHaveText('割合・比');
            await page.goForward();
            await expect(page.locator('#prac-detail-view')).toBeVisible();
            await expect(page.locator('#prac-screen-title')).toHaveText(title);
            await expect(page.locator('#prac-ans-input')).toHaveValue('321');
            await page.reload();
            await expect(page.locator('#prac-ans-input')).toHaveValue('321');
            expect(await page.evaluate(() => appState.grade)).toBe(6);
        });

        test('report returns to recommended review rather than course selection', async ({ page }) => {
            await start(page);
            await page.locator('#exam-mode-screen').getByRole('button', { name: 'おすすめ復習を見る' }).click();
            await page.locator('#recommended-review-screen .report-link-btn').click();
            await expect(page.locator('#report-screen')).toBeVisible();
            await page.locator('#report-screen .back-btn').click();
            await expect(page.locator('#recommended-review-screen')).toBeVisible();
        });

        test('answered trial and next trial survive refresh with no duplicate attempts', async ({ page }) => {
            await start(page);
            await page.locator('#exam-mode-screen .exam-mode-card.topic').click();
            await page.locator('#exam-unit-list .unit-card').filter({ hasText: '割合・比の完成' }).click();
            const trial = page.locator('#trial-u6-ratio');
            await trial.locator('.topic-trial-choice[data-is-correct="true"]').click();
            await expect(trial.locator('#trial-feedback-u6-ratio')).toContainText('正解');
            const before = await records(page);
            expect(Object.values(JSON.parse(before.vista_stats)).reduce((total, row) => total + row.total, 0)).toBe(1);
            expect(Object.values(JSON.parse(before.vista_history)).reduce((total, row) => total + row.length, 0)).toBe(1);
            const choices = await trial.locator('.topic-trial-choice').allTextContents();
            await page.reload();
            await expect(page.locator('#u6-ratio-screen')).toBeVisible();
            await expect(trial.locator('#trial-feedback-u6-ratio')).toContainText('正解');
            expect(await trial.locator('.topic-trial-choice').allTextContents()).toEqual(choices);
            expect(await records(page)).toEqual(before);
            await trial.getByRole('button', { name: '次の問題へ →', exact: true }).click();
            await expect(trial.locator('.topic-trial-counter')).toHaveText('2 / 3');
            await page.reload();
            await expect(trial.locator('.topic-trial-counter')).toHaveText('2 / 3');
            expect(await records(page)).toEqual(before);
        });

        test('unknown stored screen and malformed session recover to safe selection', async ({ page }) => {
            await page.goto('/');
            await page.addInitScript(() => {
                sessionStorage.setItem('vista_navigation_v1', JSON.stringify({ entries: { bad: { previous: null, route: { screen: 'deleted', grade: 6, course: 'exam', ui: [] } } } }));
                history.replaceState({ vista: 'bad' }, '', '#vista=bad');
            });
            await page.reload();
            await expect(page.locator('#grade-screen')).toBeVisible();
            await expect(page.locator('#navigation-notice')).toBeVisible();
            await page.addInitScript(() => sessionStorage.setItem('vista_navigation_v1', '{broken'));
            await page.reload();
            await expect(page.locator('#grade-screen')).toBeVisible();
            await page.locator('#grade-screen .grade-card.g6').click();
            await expect(page.locator('#home-screen')).toBeVisible();
        });
    });
