import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { IVendor } from '../../data/interfaces/IVendor';

export default async function postVendor(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const VendorData: IVendor = req.body;
    await googleSheetsService.setSheet(ESheets.Vendors).post(VendorData);
    res.status(200).json({ message: 'Vendor posted successfully' });
  } catch (error) {
    console.error('Error posting to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to post data to Google Sheets' });
  }
}
