/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['18.133.139.168']
  }
}

module.exports = nextConfig
