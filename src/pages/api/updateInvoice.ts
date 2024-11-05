// pages/api/updateInvoice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { IInvoice } from '../../data/interfaces/IInvoice';

export default async function updateInvoice(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheetsService = new SheetsService();
    sheetsService.setSheet(ESheets.Invoices);

    if (req.method !== 'PATCH') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { rowIndex, invoice }: { rowIndex: number; invoice: IInvoice } = req.body;

    if (typeof rowIndex !== 'number' || !invoice) {
      return res.status(400).json({ error: 'Invalid request data. Expected rowIndex and invoice data.' });
    }

    await sheetsService.update(rowIndex, invoice);

    res.status(200).json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice in Google Sheets' });
  }
}
