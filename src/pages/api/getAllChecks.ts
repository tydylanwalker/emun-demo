import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapCheck } from '../../data/mappers/mapCheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allChecks = await googleSheetsService.setSheet(ESheets.Checks).getAll();
    const mappedChecks = mapCheck(allChecks);
    res.status(200).json(mappedChecks);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
