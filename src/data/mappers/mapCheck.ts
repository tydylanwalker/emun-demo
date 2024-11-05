import { ICheck } from '../interfaces/ICheck';

export function mapCheck(rows: Array<{ [key: string]: any }>): ICheck[] {
  return rows.map((row) => {
    const check: ICheck = {
      guid: row.guid || '',
      vendor: row.vendor || '',
      payPeriod: row.payPeriod || '',
      number: row.number || '',
      checkAmount: Number(row.checkAmount) || 0,
      status: row.status || 'Open',
      receivedDate: row.receivedDate || '',
      payDate: row.payDate || '',
      additionalDetails: row.additionalDetails || undefined,
    };
    return check;
  });
}
