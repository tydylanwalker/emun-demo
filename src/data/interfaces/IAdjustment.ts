import dayjs from 'dayjs';

export interface IAdjustment {
  vendor: string;
  adjustmentDate: dayjs.Dayjs | null;
  adjustmentAmount: string;
  salesRep: string;
  totalCommission: string;
  repCommission: string;
  agencyCommission: string;
  reasonCode: string;
}
