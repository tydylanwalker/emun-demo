import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'PATCH') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { rows, sheet }: { rows: any; sheet: ESheets } = req.body;

    // Validate required fields
    if (!rows || !sheet) {
      return res.status(400).json({ error: 'Missing rows or sheet in request body' });
    }

    const sheetsService = new SheetsService();
    sheetsService.setSheet(sheet);

    // If rows is a single object, convert it into an array
    const rowsToUpdate = Array.isArray(rows) ? rows : [rows];

    await sheetsService.patch(rowsToUpdate);

    res.status(200).json({ message: 'PATCH successful!' });
  } catch (error) {
    console.error('ERROR PATCHING DATA:', error);
    res.status(500).json({ error: 'ERROR in updating the rows in Google Sheets' });
  }
}
