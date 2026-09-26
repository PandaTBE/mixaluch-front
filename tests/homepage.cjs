// Запуск при установленном Playwright: node tests/homepage.cjs
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    try {
        const page = await browser.newPage();
        let requests = 0;
        let reply = { status: 200, body: { ok: false } };
        let release;
        // Все отправки сообщений перехватываются; магазин ничего не получает.
        await page.route('**/sendMessage', async (route) => {
            requests += 1;
            await new Promise((resolve) => {
                release = resolve;
            });
            await route.fulfill({
                status: reply.status,
                contentType: 'application/json',
                body: JSON.stringify(reply.body),
            });
        });
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
        assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Мясо, рыба и другие продукты');
        for (const width of [1638, 1001, 1000, 944, 815, 768, 601, 600, 390, 320]) {
            await page.setViewportSize({ width, height: 1266 });
            const columns = await page
                .locator('section[aria-label="Категории продуктов"]')
                .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
            assert.equal(columns, width > 1000 ? 6 : width > 600 ? 3 : 2, `Category columns at ${width}px`);
            assert(
                await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
                `Overflow at ${width}px`,
            );
            const links = page.getByRole('main').getByRole('link', { name: 'Весь каталог', exact: true });
            assert.equal(await links.count(), 2);
            const styles = await links.evaluateAll((elements) =>
                elements.map((el) => {
                    const style = getComputedStyle(el);
                    return [style.fontSize, style.fontWeight, style.color, style.gap, style.minHeight];
                }),
            );
            assert.deepEqual(styles[0], styles[1]);
            for (const link of await links.all()) {
                assert.equal(await link.getAttribute('href'), '/catalog');
                assert.equal(await link.locator('svg[aria-hidden="true"]').count(), 1);
            }
        }
        const form = page.getByRole('region', { name: 'Напишите Михалычу' });
        const submit = form.getByRole('button', { name: 'Отправить сообщение' });
        await submit.click();
        await form.locator('#feedback-name[aria-invalid="true"]').waitFor();
        assert.equal(requests, 0);
        await form.getByLabel('Ваше имя').fill('Тест');
        await form.getByLabel('Электронная почта').fill('invalid');
        await form.getByLabel('Сообщение', { exact: false }).fill('Проверка формы');
        await submit.click();
        await form.getByText('Введите корректный email').waitFor();
        assert.equal(requests, 0);
        await form.getByLabel('Электронная почта').fill('test@example.com');
        for (const response of [
            { status: 200, body: { ok: false } },
            { status: 503, body: { ok: false } },
            { status: 200, body: { ok: true } },
        ]) {
            reply = response;
            const request = page.waitForRequest((req) => req.url().endsWith('/sendMessage'));
            await submit.click();
            await request;
            const loading = form.getByRole('button', { name: 'Отправляем…' });
            await loading.waitFor();
            assert(await loading.isDisabled());
            release();
            await submit.waitFor();
            if (response.body.ok) {
                await form.getByText('Спасибо! Ваше сообщение отправлено.').waitFor();
                assert.equal(await form.getByLabel('Ваше имя').inputValue(), '');
            } else {
                await form.getByText('Не удалось отправить сообщение. Попробуйте ещё раз.').waitFor();
                assert.equal(await form.getByLabel('Сообщение', { exact: false }).inputValue(), 'Проверка формы');
            }
        }
        assert.equal(requests, 3);
        console.log(
            'PASS: ten viewport sizes, homepage heading, matching catalog links, form validation, loading, error retention and success reset.',
        );
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
