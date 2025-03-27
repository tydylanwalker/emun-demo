import { ICommissionRule } from '../interfaces/ICommissionRule';

export function mapCommissionRules(rows: Array<{ [key: string]: any }>): ICommissionRule[] {
  return rows.map((row) => {
    const commissionRule: ICommissionRule = {
      guid: row.guid || '',
      description: row.description || '',
      startDate: row.startDate || '',
      endDate: row.endDate || '',
      vendor: row.vendor || '',
      orderSource: row.orderSource || '',
      salesRep: row.salesRep || '',
      commissionGroupName: row.commissionGroupName || '',
      accountType: row.accountType || '',
      writingRepPercentage: row.writingRepPercentage || '',
      salesRepPercentage: row.salesRepPercentage || '',
      housePercentage: row.housePercentage || '',
    };
    return commissionRule;
  });
}
