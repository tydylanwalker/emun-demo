import { IVendor } from '../interfaces/IVendor';

export function mapVendor(rows: Array<{ [key: string]: any }>): IVendor[] {
  return rows.map((row) => {
    const vendor: IVendor = {
      Id: row.Id || '',
      VendorName: row.VendorName || '',
      CommissionPercentage: Number(row.CommissionPercentage) || 15,
    };
    return vendor;
  });
}
