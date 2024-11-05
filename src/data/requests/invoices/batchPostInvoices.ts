import { IInvoice } from '../../interfaces/IInvoice';

export async function batchPostInvoices(InvoiceData: IInvoice[]): Promise<boolean> {
  const response = await fetch('/api/batchPostInvoices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(InvoiceData),
  });

  return response.ok;
}
