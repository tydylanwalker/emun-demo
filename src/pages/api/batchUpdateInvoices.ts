import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';

export default async function batchUpdateInvoices(req: NextApiRequest, res: NextApiResponse) {
  const sheetsService = new SheetsService().setSheet(ESheets.Invoices);
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await sheetsService.batchUpdate(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating rows:', error);
    res.status(500).json({ error: 'Failed to update rows' });
  }
}
