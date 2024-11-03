import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    GOOGLE_SERVICE_PRIVATE_KEY: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY,
    GOOGLE_SPREADSHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID,
    ORDERS_ID: process.env.NEXT_PUBLIC_ORDERS_ID,
    VENDORS_ID: process.env.NEXT_PUBLIC_VENDORS_ID,
    CUSTOMERS_ID: process.env.NEXT_PUBLIC_CUSTOMERS_ID,
    CHECKS_ID: process.env.NEXT_PUBLIC_CHECKS_ID,
    PAY_PERIODS_ID: process.env.NEXT_PUBLIC_PAY_PERIODS_ID,
    INVOICES_ID: process.env.NEXT_PUBLIC_INVOICES_ID,
  },
};

export default nextConfig;
