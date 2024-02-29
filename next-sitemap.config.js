/** @type {import('next-sitemap').IConfig} */

// eslint-disable-next-line no-undef
module.exports = {
    siteUrl: 'https://mixaluch-shop.ru/',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/cart', '/register/*', '/login', '/activate/*', '/orders/*', '/catalog', '/user-account', '/ordering'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow:
                    // eslint-disable-next-line no-undef
                    process.env['NEXT_PUBLIC_ENV'] === 'dev' ? [] : ['/', '/contacts', '/about', '/delivery', '/kebab'],
                // eslint-disable-next-line no-undef
                disallow: process.env['NEXT_PUBLIC_ENV'] === 'dev' ? ['/'] : undefined,
            },
            {
                userAgent: 'black-listed-bot',
                disallow:
                    // eslint-disable-next-line no-undef
                    process.env['NEXT_PUBLIC_ENV'] === 'dev'
                        ? ['/']
                        : [
                              '/cart',
                              '/register',
                              '/login',
                              '/activate',
                              '/orders',
                              '/catalog',
                              '/user-account',
                              '/ordering',
                          ],
            },
        ],
    },
};
