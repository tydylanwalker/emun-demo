import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { ICustomer } from '../../data/interfaces/ICustomer';

export default async function postCustomer(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const CustomerData: ICustomer = req.body;
    await googleSheetsService.setSheet(ESheets.Customers).post(CustomerData);
    res.status(200).json({ message: 'Customer posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
