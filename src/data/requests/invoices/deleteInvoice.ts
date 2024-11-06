import { IInvoice } from '../../interfaces/IInvoice';

export async function deleteInvoice(invoiceData: IInvoice): Promise<boolean> {
  const response = await fetch('/api/deleteInvoice', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });

  return response.ok;
}
