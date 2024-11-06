export enum ESheets {
  Orders = Number(process.env.ORDERS_ID),
  Vendors = Number(process.env.VENDORS_ID),
  Customers = Number(process.env.CUSTOMERS_ID),
  Checks = Number(process.env.CHECKS_ID),
  PayPeriods = Number(process.env.PAY_PERIODS_ID),
  Invoices = Number(process.env.INVOICES_ID),
}