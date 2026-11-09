// Run with the local app on port 3000: node tests/personal-data-consent.cjs
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
const errorText = 'Необходимо согласие на обработку персональных данных';

async function checkPolicyDialog(page, scope, requestCount) {
    const consent = scope.locator('input[name="personalDataConsent"]');
    const policy = scope.getByRole('button', { name: 'политикой обработки персональных данных', exact: true });
    assert.equal(await consent.isChecked(), false);
    const before = requestCount();
    await policy.click();
    const dialog = page.getByRole('dialog', { name: 'Политика обработки персональных данных', exact: true });
    await dialog.waitFor();
    assert.match(await dialog.innerText(), /У Михалыча/);
    assert.match(await dialog.innerText(), /mixaluch-shop\.ru/);
    assert.match(await dialog.innerText(), /mixaluch-shop@yandex\.ru/);
    assert.equal(await consent.isChecked(), false, 'Opening policy must not accept consent');
    assert.equal(requestCount(), before, 'Opening policy must not submit the form');
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert(await policy.evaluate((element) => document.activeElement === element), 'Dialog restores focus');
    await policy.click();
    await dialog.getByRole('button', { name: 'Закрыть', exact: true }).click();
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await consent.isChecked(), false);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No mobile overflow');
    return consent;
}

async function checkRegistration(browser) {
    const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
    let requests = 0;
    let payload;
    await page.route('**/auth/users/', async (route) => {
        requests += 1;
        payload = route.request().postDataJSON();
        await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ email: ['Test response'] }) });
    });
    await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle' });
    const form = page.locator('form').filter({ has: page.locator('input[name="re_password"]') });
    const consent = await checkPolicyDialog(page, form, () => requests);
    await form.locator('input[name="name"]').fill('Тест');
    await form.locator('input[name="second_name"]').fill('Пользователь');
    await form.locator('input[name="phone_number"]').fill('+79250001660');
    await form.locator('input[name="email"]').fill('consent-test@example.com');
    await form.locator('input[name="password"]').fill('Test-password-123');
    await form.locator('input[name="re_password"]').fill('Test-password-123');
    const submit = form.getByRole('button', { name: 'Зарегистрироваться', exact: true });
    await submit.click();
    await form.getByText(errorText).waitFor();
    assert.equal(requests, 0, 'Registration must not submit without consent');
    await consent.check();
    const response = page.waitForResponse((res) => res.url().endsWith('/auth/users/'));
    await submit.click();
    await response;
    assert.equal(requests, 1);
    assert.equal(payload.email, 'consent-test@example.com');
    assert.equal(Object.hasOwn(payload, 'personalDataConsent'), false, 'Consent is not an API field');
    assert.equal(await consent.isChecked(), true, 'Registration failure preserves consent');
    await consent.uncheck();
    await submit.click();
    await form.getByText(errorText).waitFor();
    assert.equal(requests, 1, 'Revoking consent prevents another request');
    await page.close();
}

async function checkFeedback(browser) {
    const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
    let requests = 0;
    let responseBody = { ok: false };
    let payload;
    await page.route('**/sendMessage', async (route) => {
        requests += 1;
        payload = route.request().postDataJSON();
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(responseBody) });
    });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const form = page.getByRole('region', { name: 'Напишите Михалычу', includeHidden: true });
    const consent = await checkPolicyDialog(page, form, () => requests);
    await form.getByLabel('Ваше имя').fill('Тест');
    await form.getByLabel('Электронная почта').fill('consent-test@example.com');
    await form.getByLabel('Сообщение', { exact: false }).fill('Тест согласия');
    const submit = form.getByRole('button', { name: 'Отправить сообщение', exact: true });
    await submit.click();
    await form.getByText(errorText).waitFor();
    assert.equal(requests, 0, 'Feedback must not submit without consent');
    await consent.check();
    await submit.click();
    await form.getByText('Не удалось отправить сообщение. Попробуйте ещё раз.').waitFor();
    assert.equal(requests, 1);
    assert.equal(await consent.isChecked(), true, 'Failure preserves consent');
    assert.equal(JSON.stringify(payload).includes('personalDataConsent'), false);
    assert.equal(JSON.stringify(payload).includes('true'), false, 'Consent must not leak into the message');
    responseBody = { ok: true };
    await submit.click();
    await form.getByText('Спасибо! Ваше сообщение отправлено.').waitFor();
    assert.equal(requests, 2);
    assert.equal(await consent.isChecked(), false, 'Success clears consent');
    assert.equal(await form.getByLabel('Ваше имя').inputValue(), '');
    await page.close();
}

(async () => {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    try {
        await checkRegistration(browser);
        await checkFeedback(browser);
        console.log('PASS: registration and feedback consent validation, request payloads, reset, policy modal and mobile layout.');
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
