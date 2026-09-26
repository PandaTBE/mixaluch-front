// Запуск при установленном Playwright: node tests/catalog-mobile.cjs
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    try {
        const page = await browser.newPage({ viewport: { width: 543, height: 1266 } });
        await page.goto('http://localhost:3000/catalog');
        const aside = page.getByRole('complementary');
        const toggle = aside.getByRole('button', { name: /Категории/ });
        const nav = aside.getByRole('navigation', { name: 'Категории товаров', includeHidden: true });
        await toggle.waitFor({ timeout: 5000 });
        assert.equal(await toggle.getAttribute('aria-controls'), await nav.getAttribute('id'));
        for (const width of [543, 390, 320, 760]) {
            await page.setViewportSize({ width, height: 1266 });
            assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
            assert(!(await nav.isVisible()));
            assert((await aside.boundingBox()).height < 90);
            await toggle.focus();
            await page.keyboard.press('Enter');
            assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
            assert(await nav.isVisible());
            assert(
                await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
                `Overflow at ${width}px`,
            );
            await page.keyboard.press('Space');
            assert(!(await nav.isVisible()));
        }
        await toggle.click();
        await nav.getByRole('button', { name: 'Развернуть подкатегории: Рыба', exact: true }).click();
        const child = nav.locator('ul ul a').first();
        const childName = await child.textContent();
        const childHref = await child.getAttribute('href');
        await child.click();
        await page.waitForURL(`**${childHref}`);
        assert((await toggle.textContent()).includes(childName));
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await toggle.click();
        assert(await nav.getByRole('link', { name: childName, exact: true }).isVisible());
        assert.equal(
            await nav.getByRole('link', { name: childName, exact: true }).getAttribute('aria-current'),
            'page',
        );
        await nav.getByRole('link', { name: childName, exact: true }).click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert(await toggle.evaluate((element) => element === document.activeElement));
        await toggle.click();
        await nav.getByRole('link', { name: 'Все товары', exact: true }).click();
        await page.waitForURL('**/catalog');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await page.setViewportSize({ width: 761, height: 900 });
        assert(!(await toggle.isVisible()));
        assert(await nav.isVisible());
        await page.setViewportSize({ width: 543, height: 1266 });
        assert(!(await nav.isVisible()));
        await page.screenshot({ path: '/tmp/catalog-mobile-543.png', fullPage: false });
        await page.goto('http://localhost:3000/catalog?category=4&search=рыба');
        await toggle.click();
        assert.equal(
            new URL(
                await nav.getByRole('link', { name: 'Все товары', exact: true }).getAttribute('href'),
                page.url(),
            ).searchParams.get('search'),
            'рыба',
        );
        await page.setViewportSize({ width: 1280, height: 900 });
        assert(!(await toggle.isVisible()));
        assert(await nav.isVisible());
        await page.setViewportSize({ width: 390, height: 844 });
        await page.screenshot({ path: '/tmp/catalog-mobile-expanded.png', fullPage: false });
        await toggle.click();
        await page.goto('http://localhost:3000/catalog');
        await page.screenshot({ path: '/tmp/catalog-mobile-collapsed.png', fullPage: false });
        console.log(
            'PASS: mobile sizes, keyboard disclosure, subcategories, selection collapse, search preservation, desktop navigation.',
        );
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
