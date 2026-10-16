const { test, expect } = require('@playwright/test');

async function openCalc(page) {
    await page.goto('/');
    await page.evaluate(() => { selectGrade(6); showScreen('exam'); openUnit('u6-calc'); });
}

test('pair discovery permits retry, reset, keyboard input and ephemeral feedback', async ({ page }) => {
    await openCalc(page);
    const before = await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records);
    const tile = number => page.locator(`[data-calc-number="${number}"]`);
    await tile(25).click();
    await expect(page.locator('#calc-product-preview')).toHaveText('25 × …');
    await tile(13).click();
    await expect(page.locator('#calc-product-preview')).toHaveText('25 × 13 ＝ 325');
    await expect(page.locator('#calc-prediction-feedback')).toContainText('他の組み合わせも試してみよう');
    await tile(25).click();
    await tile(4).click();
    await expect(page.locator('#calc-product-preview')).toHaveText('13 × 4 ＝ 52');
    await tile(13).click();
    await tile(25).click();
    await expect(page.locator('#calc-product-preview')).toHaveText('4 × 25 ＝ 100');
    await expect(page.locator('#calc-discovery')).toBeVisible();
    await expect(page.locator('#calc-example-reveal')).toContainText('100 × 13 ＝ 1300');
    await page.locator('.calc-predict-card button').filter({ hasText: 'もう一度見る' }).click();
    await expect(tile(25)).toBeFocused();
    await expect(page.locator('#calc-example-reveal')).toBeHidden();
    await expect(page.locator('[data-calc-number][aria-pressed="true"]')).toHaveCount(0);
    await tile(25).press('Enter');
    await tile(4).focus();
    await tile(4).press('Space');
    await expect(page.locator('#calc-discovery')).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(VistaStorage.exportData()).records)).toEqual(before);
});

test('comparison appears normal then clever, supports replay and retains exercise route', async ({ page }) => {
    await openCalc(page);
    const stages = page.locator('#calc-comparison [data-comparison-stage]');
    await page.locator('#calc-comparison-play').click();
    await expect(stages.nth(0)).toBeVisible();
    await expect(stages.nth(3)).toBeHidden();
    await expect(stages.nth(1)).toBeVisible();
    await expect(stages.nth(3)).toBeHidden();
    await expect(stages.nth(6)).toBeVisible();
    await expect(stages.nth(5)).toContainText('100 × 13 ＝ 1300');
    await page.locator('#calc-comparison-play').click();
    await expect(stages.nth(6)).toBeHidden();
    await expect(stages.nth(3)).toBeHidden();
    await expect(page.locator('#trial-u6-calc')).toContainText('体験');
    await page.locator('#u6-calc-nav button').click();
    await expect(page.locator('#prac-prob-list-body')).toBeVisible();
});

test('reduced motion shows complete discovery and comparison immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openCalc(page);
    await page.locator('[data-calc-number="25"]').click();
    await page.locator('[data-calc-number="4"]').click();
    await expect(page.locator('#calc-example-reveal')).toBeVisible();
    await page.locator('#calc-comparison-play').click();
    await expect(page.locator('#calc-comparison [data-comparison-stage]:visible')).toHaveCount(7);
});
