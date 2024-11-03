import { IInvoice } from '../../interfaces/IInvoice';

export async function postInvoice(InvoiceData: IInvoice): Promise<boolean> {
  const response = await fetch('/api/postInvoice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(InvoiceData),
  });

  return response.ok;
}
