import { IInvoice } from '../../interfaces/IInvoice';

export async function updateInvoice(rowIndex: number, invoiceData: IInvoice): Promise<boolean> {
  console.log(rowIndex, invoiceData);
  const response = await fetch('/api/updateInvoice', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rowIndex, invoice: invoiceData }),
  });

  return response.ok;
}
