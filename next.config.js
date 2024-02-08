/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  i18n: {
    locales: ['en', 'ar', 'da', 'de', 'es', 'fr', 'ja', 'ru', 'ur', 'zh'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tripty.app',
        port: '',
        pathname: '/storage/**',
      },
    ],
    // domains: [

    //   // '18.133.139.168',
    //   'https://tripty.app',
    //   'tripty.app'
    // ]
  }
}

module.exports = nextConfig
