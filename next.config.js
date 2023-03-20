/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    images: {
        domains: ['127.0.0.1', 'mixaluch-back.ru', 'www.mixaluch-back.ru', 'localhost', 'mixaluch-shop-dev.ru'],
        loader: 'default',
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
