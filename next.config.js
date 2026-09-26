/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    compiler: {
        styledComponents: true,
    },

    webpack(config, { isServer }) {
        // Адаптер страниц nuqs использует только useRouter; в Next 12 ещё нет совместимого экспорта.
        // Переопределение зависимости Next в package.json применяется только к этому адаптеру.
        config.resolve.alias = { 'next/compat/router.js$': require.resolve('next/router'), ...config.resolve.alias };
        // При серверном рендеринге используем тот же псевдоним и включаем nuqs в сборку.
        if (isServer) {
            config.externals = config.externals.map((external) =>
                typeof external === 'function'
                    ? async (data, ...args) =>
                          /^nuqs(?:\/|$)/.test(data.request || '') ? undefined : external(data, ...args)
                    : external,
            );
        }
        return config;
    },

    images: {
        domains: [
            ...new Set(
                [
                    ...(process.env['NEXT_CONFIG_IMAGE_DOMAINS']?.split(' ') || []),
                    ...(process.env['NEXT_PUBLIC_BACKEND_URL']
                        ? [new URL(process.env['NEXT_PUBLIC_BACKEND_URL']).hostname]
                        : []),
                ].filter(Boolean),
            ),
        ],
        loader: 'default',
    },
};

module.exports = nextConfig;
