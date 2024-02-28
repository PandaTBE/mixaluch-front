/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    compiler: {
        styledComponents: true,
    },

    images: {
        loader: 'default',
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
