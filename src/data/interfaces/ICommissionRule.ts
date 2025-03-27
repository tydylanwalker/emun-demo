export interface ICommissionRule {
  guid: string;
  description: string;
  startDate: string;
  endDate: string;
  vendor: string;
  orderSource: string;
  salesRep: string;
  commissionGroupName: string;
  accountType: string;
  writingRepPercentage: string;
  salesRepPercentage: string;
  housePercentage: string;
}
