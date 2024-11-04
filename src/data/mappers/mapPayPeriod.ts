import { IPayPeriod } from '../interfaces/IPayPeriod';

export function mapPayPeriod(rows: Array<{ [key: string]: any }>): IPayPeriod[] {
  return rows.map((row) => {
    const payPeriod: IPayPeriod = {
      payPeriod: row.payPeriod || '',
      status: row.status || '',
      startDate: row.startDate || '',
      endDate: row.endDate || '',
    };
    return payPeriod;
  });
}
