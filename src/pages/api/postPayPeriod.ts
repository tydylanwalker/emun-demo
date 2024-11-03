import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { IPayPeriod } from '../../data/interfaces/IPayPeriod';

export default async function postPayPeriod(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const PayPeriodData: IPayPeriod = req.body;
    await googleSheetsService.setSheet(ESheets.PayPeriods).post(PayPeriodData);
    res.status(200).json({ message: 'PayPeriod posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
