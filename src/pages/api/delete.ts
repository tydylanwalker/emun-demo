import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { rows, sheet }: { rows: any; sheet: ESheets } = req.body;

    if (!rows || !sheet) {
      return res.status(400).json({ error: 'Missing rows or sheet in request body' });
    }

    const sheetsService = new SheetsService();
    sheetsService.setSheet(sheet);

    // If rows is a single object, convert it into an array
    const data = Array.isArray(rows) ? rows : [rows];

    await sheetsService.delete(data);

    // Respond with a success message
    res.status(200).json({ message: 'DELETE was successful!' });
  } catch (error) {
    console.error('ERROR DELETING DATA:', error);
    res.status(500).json({ error: 'ERROR deleting new rows in Google Sheets' });
  }
}
