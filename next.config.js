/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    images: {
        domains: ['127.0.0.1', 'www.mixaluch-shop-dev.ru'],
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
