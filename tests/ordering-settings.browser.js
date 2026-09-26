// Запуск через Playwright MCP browser_run_code_unsafe, файл: tests/ordering-settings.browser.js.
async (page) => {
    const context = await page.context().browser().newContext();
    const checkout = await context.newPage();
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
    };
    let status = 500;
    let settings = { notice: '', self_delivery_enabled: true, courier_delivery_enabled: true };
    let orders = 0;
    await context.route('**/api/orders/', async (route) => {
        orders++;
        await route.fulfill({ status: 400, body: '{}' });
    });
    await context.route('**/ordering-settings/', (route) =>
        route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(settings),
        }),
    );
    try {
        const products = await (await context.request.get('http://localhost:8000/api/products/')).json();
        assert(products.length > 0, 'Test requires one catalog product');
        await context.addInitScript((product) => {
            localStorage.setItem('cartItems', JSON.stringify([{ product, quantity: 1 }]));
        }, products[0]);
        await checkout.goto('http://localhost:3000/ordering');
        await checkout.getByRole('heading', { name: 'Оформление заказа', exact: true }).waitFor();
        await checkout
            .getByText('Не удалось загрузить настройки оформления заказа. Обновите страницу.')
            .waitFor({ timeout: 5000 });
        assert(
            await checkout.getByRole('button', { name: 'Подтвердить заказ' }).isDisabled(),
            'API failure must block checkout',
        );
        status = 200;
        for (const [self, courier] of [
            [false, false],
            [false, true],
            [true, false],
            [true, true],
        ]) {
            settings = { ...settings, self_delivery_enabled: self, courier_delivery_enabled: courier };
            await checkout.reload();
            await checkout.waitForFunction(
                ([self, courier]) =>
                    document.querySelector('input[name="selfDelivery"]')?.disabled === !self &&
                    document.querySelector('input[name="courierDelivery"]')?.disabled === !courier,
                [self, courier],
            );
            for (const [name, enabled] of [
                ['selfDelivery', self],
                ['courierDelivery', courier],
            ]) {
                const input = checkout.locator(`input[name="${name}"]`);
                assert(await input.isVisible(), `${name} must remain visible`);
                if (!enabled) {
                    await input.locator('xpath=ancestor::label').click({ force: true });
                    assert(!(await input.isChecked()), `${name} must not be selectable when disabled`);
                }
            }
            if (!self && !courier) {
                await checkout.getByText('Оформление заказов временно недоступно.').waitFor();
                assert(
                    await checkout.getByRole('button', { name: 'Подтвердить заказ' }).isDisabled(),
                    'Both disabled must block checkout',
                );
            } else {
                await checkout.waitForFunction(
                    () => document.querySelector('button[type="submit"]')?.disabled === false,
                );
            }
        }
        assert(orders === 0, 'No real orders should be submitted');
        return 'PASS: settings API failure and all four delivery combinations';
    } finally {
        await context.close();
    }
};
