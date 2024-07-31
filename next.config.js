/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  transpilePackages: ['@mui/x-charts'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  async rewrites() {
    const isDevelopment = process.env.NODE_ENV === 'development'

    return [
      {
        source: '/auth/token',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/auth/token`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/auth/token`
      },
      {
        source: '/auth/refresh-token',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/auth/refresh-token`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/auth/refresh-token`
      },
      {
        source: '/call/vendor/user/auth/users',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/user/auth/users`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/user/auth/users`
      },
      {
        source: '/call/vendor/uploadInvoice/getDashboard',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/getDashboard`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/getDashboard`
      },
      {
        source: '/call/vendor/poSummary/getSummary',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/poSummary/getSummary`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/poSummary/getSummary`
      },
      {
        source: '/call/vendor/uploadInvoice/InboxData',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/InboxData`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/InboxData`
      },
      {
        source: '/call/vendor/uploadInvoice/getAllRoles',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/getAllRoles`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/getAllRoles`
      },
      {
        source: '/call/vendor/uploadInvoice/deliveryPlants',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/deliveryPlants`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/deliveryPlants`
      },
      {
        source: '/call/vendor/uploadInvoice/get',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/get`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/get`
      },
      {
        source: '/call/vendor/uploadInvoice/poSearch',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/uploadInvoice/poSearch`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/uploadInvoice/poSearch`
      },
      {
        source: '/user_service/api/version',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/user_service/api/version`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/user_service/api/version`
      },
      {
        source: '/call/vendor/Vendorportal/createPO',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/Vendorportal/createPO`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/Vendorportal/createPO`
      },
      {
        source: '/call/vendor/Vendorportal/uploadInvoice',
        destination: isDevelopment
          ? `${process.env.NEXT_PUBLIC_GATEWAY_DEV_URL}/call/vendor/Vendorportal/uploadInvoice`
          : `${process.env.NEXT_PUBLIC_GATEWAY_PROD_URL}/call/vendor/Vendorportal/uploadInvoice`
      }
    ]
  }
}
