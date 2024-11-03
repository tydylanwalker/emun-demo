import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { IInvoice } from '../../data/interfaces/IInvoice';

export default async function postInvoice(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const InvoiceData: IInvoice = req.body;
    await googleSheetsService.setSheet(ESheets.Invoices).post(InvoiceData);
    res.status(200).json({ message: 'Invoice posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
