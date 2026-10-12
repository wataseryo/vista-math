const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
 testDir: './tests', testMatch: '*.spec.cjs', timeout: 30000, workers: 1,
 reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
 use: { baseURL: 'http://127.0.0.1:8765', headless: true, channel: 'chrome', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
 projects: [ { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } }, { name: 'mobile', use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } } ]
});
