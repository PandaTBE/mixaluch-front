// Запуск через Playwright MCP browser_run_code_unsafe, файл: tests/page-loading.browser.js.
// Нужны фронтенд на порту 3000 и локальный бэкенд. Формы и заказы не отправляются.
async (page) => {
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
    };
    const widths = [
        320, 390, 439, 575, 576, 599, 600, 650, 651, 760, 761, 767, 768, 800, 801, 900, 901, 991, 992, 1150, 1151, 1440,
    ];
    const ready = async () => {
        await page.waitForSelector('main h1');
        await page.waitForFunction(
            () => window.next?.router && document.querySelector('main')?.getAttribute('aria-busy') !== 'true',
        );
        await page.evaluate(() => document.fonts.ready);
    };
    const start = async (url) => {
        await page.evaluate((url) => window.next.router.events.emit('routeChangeStart', url, { shallow: false }), url);
        await page.waitForSelector('main[aria-busy="true"]');
    };
    const finish = async (url) => {
        await page.evaluate(
            (url) => window.next.router.events.emit('routeChangeComplete', url, { shallow: false }),
            url,
        );
        await page.waitForSelector('main[aria-busy="false"]');
    };
    const geometry = async (selector) =>
        page.locator(selector).evaluateAll((elements) => {
            const main = document.querySelector('main').getBoundingClientRect();
            return elements
                .filter((el) => el.getBoundingClientRect().width > 0)
                .map((el) => {
                    const r = el.getBoundingClientRect();
                    return { x: r.x, y: r.y - main.y, width: r.width, height: r.height };
                });
        });
    const compare = (live, skeleton, label, dimensions = ['x', 'y', 'width', 'height']) => {
        assert(live.length === skeleton.length, `${label}: block count ${live.length} / ${skeleton.length}`);
        live.forEach((rect, index) =>
            dimensions.forEach((key) => {
                assert(
                    Math.abs(rect[key] - skeleton[index][key]) < 2,
                    `${label}: block ${index} ${key}: ${rect[key]} / ${skeleton[index][key]}`,
                );
            }),
        );
    };
    const noOverflow = async (label) =>
        assert(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            `${label}: horizontal overflow`,
        );
    const report = [];

    // Используем реальные данные маршрута с управляемой задержкой, а не только тестовые события.
    await page.setViewportSize({ width: 439, height: 1266 });
    await page.goto('http://localhost:3000/about');
    await ready();
    let release;
    const gate = new Promise((resolve) => {
        release = resolve;
    });
    const delay = async (route) => {
        await gate;
        await route.continue();
    };
    await page.route('**/_next/data/**/catalog.json*', delay);
    try {
        await page.evaluate(() => {
            void window.next.router.push('/catalog');
        });
        await page.waitForSelector('main[aria-busy="true"] [data-product-image]');
        assert((await page.getByRole('status').count()) > 0, 'No route loading announcement');
    } finally {
        release();
        await page.unroute('**/_next/data/**/catalog.json*', delay);
    }
    await page.waitForURL('**/catalog');
    await ready();

    const productHref = await page.locator('main a[href^="/catalog/"]').first().getAttribute('href');
    const catalog = [];
    for (const width of widths) {
        await page.setViewportSize({ width, height: 1266 });
        catalog.push({
            width,
            image: await geometry('main [class*="styles__CatalogGrid"] > div:first-child > :first-child'),
        });
    }
    await page.evaluate(() => {
        void window.next.router.push('/about');
    });
    await page.waitForURL('**/about');
    await ready();
    await start('/catalog');
    for (const item of catalog) {
        await page.setViewportSize({ width: item.width, height: 1266 });
        compare(
            item.image,
            await geometry('main [class*="styles__CatalogGrid"] > div:first-child > [data-product-image]'),
            `catalog ${item.width}`,
        );
        await noOverflow(`catalog ${item.width}`);
    }
    await finish('/catalog');
    report.push('catalog: shared grid/card sizes at all 22 widths');

    // Адрес перехода берём из настоящей ссылки на товар вместе с параметрами запроса.
    await page.goto(`http://localhost:3000${productHref}`);
    await ready();
    const gallery = [];
    for (const width of widths) {
        await page.setViewportSize({ width, height: 1266 });
        gallery.push({ width, blocks: await geometry('main .swiper') });
    }
    await page.evaluate(() => {
        void window.next.router.push('/about');
    });
    await page.waitForURL('**/about');
    await ready();
    await start(productHref);
    for (const item of gallery) {
        await page.setViewportSize({ width: item.width, height: 1266 });
        compare(item.blocks, await geometry('main .swiper'), `product ${item.width}`);
        await noOverflow(`product ${item.width}`);
    }
    await finish(productHref);
    report.push('product: thumbnail/main gallery dimensions and breakpoints');

    for (const path of ['/login', '/register', '/reset-password']) {
        await page.goto(`http://localhost:3000${path}`);
        await ready();
        const forms = [];
        for (const width of widths) {
            await page.setViewportSize({ width, height: 1266 });
            forms.push({ width, blocks: await geometry('main .MuiTextField-root') });
        }
        await page.evaluate(() => {
            void window.next.router.push('/about');
        });
        await page.waitForURL('**/about');
        await ready();
        await start(path);
        for (const item of forms) {
            await page.setViewportSize({ width: item.width, height: 1266 });
            compare(item.blocks, await geometry('main [class*="StyledInput"]'), `${path} ${item.width}`);
            await noOverflow(`${path} ${item.width}`);
        }
        await finish(path);
    }
    report.push('auth: field positions, heights and widths match real forms');

    for (const [path, selector] of [
        ['/', 'main section'],
        ['/ordering', 'main h2'],
        ['/cart', 'main [class*="styles__ProductImageWrapper"], main [class*="styles__TotalValueWrapper"]'],
    ]) {
        await page.goto(`http://localhost:3000${path}`);
        await ready();
        const layouts = [];
        for (const width of widths) {
            await page.setViewportSize({ width, height: 1266 });
            layouts.push({ width, blocks: await geometry(selector) });
        }
        await page.evaluate(() => {
            void window.next.router.push('/about');
        });
        await page.waitForURL('**/about');
        await ready();
        await start(path);
        for (const item of layouts) {
            await page.setViewportSize({ width: item.width, height: 1266 });
            compare(item.blocks, await geometry(selector), `${path} ${item.width}`);
        }
        await finish(path);
    }
    report.push('home, checkout and cart: section positions and dimensions match at all 22 widths');

    // Все публичные скелетоны работают на узких и широких экранах; заглушки не получают фокус.
    for (const path of [
        '/',
        '/cart',
        '/ordering',
        '/user-account',
        '/orders',
        '/orders/1',
        '/activate/test/test',
        '/reset-password-confirm/test/test',
    ]) {
        await start(path);
        for (const width of [320, 439, 768, 1440]) {
            await page.setViewportSize({ width, height: 1266 });
            await noOverflow(`${path} ${width}`);
            assert(
                (await page.locator('main a[href], main input, main button:not([disabled])').count()) === 0,
                `${path}: focusable placeholder`,
            );
        }
        await finish(path);
    }
    report.push('all skeleton routes: no horizontal overflow or active placeholder controls');
    await page.goto('http://localhost:3000/catalog');
    await ready();
    const original = await page.locator('main h1').textContent();
    await start('/catalog?category=4');
    assert((await page.locator('main h1').textContent()) === original, 'Query update discarded content');
    assert((await page.locator('main [data-product-image]').count()) === 0, 'Query update showed page skeleton');
    await finish('/catalog?category=4');
    await start(productHref);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert(
        (await page
            .locator('main .react-loading-skeleton')
            .first()
            .evaluate((el) => getComputedStyle(el, '::after').animationName)) === 'none',
        'Skeleton ignores reduced motion',
    );
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await start('/orders/1');
    await page.evaluate(
        (url) => window.next.router.events.emit('routeChangeError', new Error('cancelled'), url),
        productHref,
    );
    assert(
        (await page.locator('main').getAttribute('aria-busy')) === 'true',
        'Stale cancellation cleared current loader',
    );
    await page.evaluate(() => window.next.router.events.emit('routeChangeError', new Error('cancelled'), '/orders/1'));
    await ready();
    assert((await page.locator('main h1').textContent()) === original, 'Cancellation did not restore outgoing content');
    report.push('query updates, superseded navigation, error recovery');
    await page.setViewportSize({ width: 439, height: 1266 });
    return report;
};
