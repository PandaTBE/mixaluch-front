/* eslint-env node */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: (process.env.NEXT_PUBLIC_FRONT_HOST || 'https://mixaluch-shop.ru').replace(/\/+$/, ''),
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: [
        '/admin',
        '/admin/*',
        '/cart',
        '/ordering',
        '/orders',
        '/orders/*',
        '/user-account',
        '/user-account/*',
        '/login',
        '/register',
        '/activate/*',
        '/reset-password',
        '/reset-password-confirm/*',
        '/404',
        '/500',
    ],
    robotsTxtOptions: {
        policies:
            process.env.NEXT_PUBLIC_ENV === 'dev'
                ? [{ userAgent: '*', disallow: '/' }]
                : [
                      {
                          userAgent: '*',
                          allow: '/',
                          disallow: [
                              '/admin',
                              '/cart',
                              '/ordering',
                              '/orders',
                              '/user-account',
                              '/login',
                              '/register',
                              '/activate',
                              '/reset-password',
                              '/reset-password-confirm',
                          ],
                      },
                  ],
    },
    additionalPaths: async (config) => {
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '');
        if (!backend) return [];

        try {
            const getJSON = async (url) => {
                const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
                if (!response.ok) throw new Error(`${response.status} ${url}`);
                return response.json();
            };
            const categories = await getJSON(`${backend}/categories/`);
            const categoryById = new Map(categories.map((category) => [category.id, category]));
            const categoryIds = new Set();
            const paths = new Set(['/catalog']);
            let next = `${backend}/v2/products/`;

            while (next) {
                const page = await getJSON(next);
                for (const product of page.results) {
                    paths.add(`/catalog/${product.id}`);
                    let category = categoryById.get(product.category);
                    while (category && !categoryIds.has(category.id)) {
                        categoryIds.add(category.id);
                        category = categoryById.get(category.parent);
                    }
                }
                next = page.next;
            }

            for (const id of categoryIds) paths.add(`/catalog?category=${id}`);
            return Promise.all([...paths].map((path) => config.transform(config, path)));
        } catch (error) {
            console.warn('Could not include live catalog URLs in sitemap:', error);
            return [await config.transform(config, '/catalog')];
        }
    },
};
