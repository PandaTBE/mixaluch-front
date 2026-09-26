const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { EventEmitter } = require('node:events');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

// Проверяем настоящий хук через упрощённый синхронный жизненный цикл React без тестовой библиотеки.
function mount(asPath = '/catalog') {
    const events = new EventEmitter();
    let router = { asPath, events };
    const slots = [];
    let cursor = 0;
    let effects = [];
    const react = {
        useState(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
            return [
                slots[index],
                (value) => {
                    slots[index] = typeof value === 'function' ? value(slots[index]) : value;
                },
            ];
        },
        useRef(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = { current: initial };
            return slots[index];
        },
        useEffect(callback, dependencies) {
            const index = cursor++;
            const previous = slots[index];
            if (
                !previous ||
                !dependencies ||
                dependencies.some((value, i) => !Object.is(value, previous.dependencies[i]))
            ) {
                effects.push(() => {
                    previous?.cleanup?.();
                    slots[index] = { dependencies, cleanup: callback() };
                });
            }
        },
    };
    const source = readFileSync(path.join(__dirname, '../hooks/usePageLoading.ts'), 'utf8');
    const compiled = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const exported = {};
    vm.runInNewContext(compiled, {
        exports: exported,
        require(name) {
            if (name === 'react') return react;
            if (name === 'next/router') return { useRouter: () => router };
            throw new Error(`Unexpected hook dependency: ${name}`);
        },
        URL,
    });
    function render(nextPath = router.asPath) {
        router = { ...router, asPath: nextPath };
        cursor = 0;
        const result = exported.default();
        const pendingEffects = effects;
        effects = [];
        pendingEffects.forEach((effect) => effect());
        return { ...result };
    }
    render();
    return {
        render,
        events,
        start(url, shallow = false) {
            events.emit('routeChangeStart', url, { shallow });
            return render();
        },
        complete(url) {
            events.emit('routeChangeComplete', url, { shallow: false });
            return render(url);
        },
        error(url) {
            events.emit('routeChangeError', Object.assign(new Error('Cancelled'), { cancelled: true }), url);
            return render();
        },
        unmount() {
            slots.forEach((slot) => slot?.cleanup?.());
        },
    };
}

const idle = { loading: false, targetUrl: null };

test('initial content stays visible; product and back navigation expose the destination', () => {
    const hook = mount();
    assert.deepEqual(hook.render(), idle);
    assert.deepEqual(hook.start('/product/beef'), { loading: true, targetUrl: '/product/beef' });
    assert.deepEqual(hook.complete('/product/beef'), idle);
    assert.deepEqual(hook.start('/catalog'), { loading: true, targetUrl: '/catalog' });
    assert.deepEqual(hook.complete('/catalog'), idle);
    hook.unmount();
});

test('query refresh keeps content; same URL, shallow and hash navigation do not load', () => {
    const hook = mount('/catalog?sort=price');
    assert.deepEqual(hook.start('/catalog?sort=name'), { loading: true, targetUrl: null });
    assert.deepEqual(hook.complete('/catalog?sort=name'), idle);
    assert.deepEqual(hook.start('/catalog?sort=name'), idle);
    assert.deepEqual(hook.start('/catalog?sort=name#products'), idle);
    assert.deepEqual(hook.start('/catalog?sort=price', true), idle);
    hook.unmount();
});

test('failed destination clears the loader', () => {
    const hook = mount();
    hook.start('/product/beef');
    assert.deepEqual(hook.error('/product/beef'), idle);
    hook.unmount();
});

test('late cancellation or completion cannot clear a newer destination', () => {
    const hook = mount();
    hook.start('/product/beef');
    hook.start('/contacts');
    const pending = { loading: true, targetUrl: '/contacts' };
    assert.deepEqual(hook.error('/product/beef'), pending);
    hook.events.emit('routeChangeComplete', '/product/beef');
    assert.deepEqual(hook.render(), pending);
    assert.deepEqual(hook.complete('/contacts'), idle);
    hook.unmount();
});

test('path comparisons use the latest router render and listeners are cleaned up', () => {
    const hook = mount();
    hook.render('/contacts');
    assert.deepEqual(hook.start('/catalog'), { loading: true, targetUrl: '/catalog' });
    assert.deepEqual(hook.complete('/catalog'), idle);
    for (const name of ['routeChangeStart', 'routeChangeComplete', 'routeChangeError']) {
        assert.equal(hook.events.listenerCount(name), 1);
    }
    hook.unmount();
    assert.equal(hook.events.eventNames().length, 0);
});
