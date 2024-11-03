import { IVendor } from '../../interfaces/IVendor';

export async function postVendor(VendorData: IVendor): Promise<boolean> {
  const response = await fetch('/api/postVendor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(VendorData),
  });

  return response.ok;
}
