/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    compiler: {
        styledComponents: true,
    },

    images: {
        domains: ['mixaluch-back-dev.ru', 'mixaluch-back.ru'],
        loader: 'default',
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
