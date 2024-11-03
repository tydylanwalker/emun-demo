import { IInvoice } from '../../interfaces/IInvoice';

export async function getAllInvoices(): Promise<IInvoice[]> {
  const response = await fetch('/api/getAllInvoices');

  if (response.ok) {
    return (await response.json()) as IInvoice[];
  } else {
    return [];
  }
}
