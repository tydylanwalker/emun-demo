import { IVendor } from '../../interfaces/IVendor';

export async function getAllVendors(): Promise<IVendor[]> {
  const response = await fetch('/api/getAllVendors');

  if (response.ok) {
    return (await response.json()) as IVendor[];
  } else {
    return [];
  }
}
