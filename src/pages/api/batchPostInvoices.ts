import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { IInvoice } from '../../data/interfaces/IInvoice';

export default async function postInvoice(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheetsService = new SheetsService();
    sheetsService.setSheet(ESheets.Invoices);

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Expecting an array of invoices in the request body
    const invoices: IInvoice[] = req.body;

    if (!Array.isArray(invoices) || invoices.length === 0) {
      return res.status(400).json({ error: 'Invalid data format, expected an array of invoices.' });
    }

    await sheetsService.batchPost(invoices);

    res.status(200).json({ message: 'Invoices posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
