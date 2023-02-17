/** @type {import('next-sitemap').IConfig} */

// eslint-disable-next-line no-undef
module.exports = {
    siteUrl: 'https://mixaluch-shop-dev.ru/',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/cart', '/register', '/login', '/activate', '/orders', '/catalog', '/user-account'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: ['/contacts', '/about', '/delivery', '/kebab'],
            },
            {
                userAgent: 'black-listed-bot',
                disallow: ['/cart', '/register', '/login', '/activate', '/orders', '/catalog', '/user-account'],
            },
        ],
    },
};
