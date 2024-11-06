import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the sheet from the query parameters
    const { sheet } = req.query;

    if (!sheet) {
      return res.status(400).json({ error: 'Missing sheet parameter' });
    }

    const sheetsService = new SheetsService();
    sheetsService.setSheet(sheet as unknown as ESheets);

    const data = await sheetsService.get();

    res.status(200).json(data); // Return the fetched data
  } catch (error) {
    console.error('ERROR GETTING DATA:', error);
    res.status(500).json({ error: 'ERROR getting rows in Google Sheets' });
  }
}
