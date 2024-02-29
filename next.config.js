/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    compiler: {
        styledComponents: true,
    },

    images: {
        // eslint-disable-next-line no-undef
        domains: process.env['NEXT_CONFIG_IMAGE_DOMAINS']?.split(' ') || [],
        loader: 'default',
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
