import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { ICheck } from '../../data/interfaces/ICheck';

export default async function postCheck(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const CheckData: ICheck = req.body;
    await googleSheetsService.setSheet(ESheets.Checks).post(CheckData);
    res.status(200).json({ message: 'Check posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
