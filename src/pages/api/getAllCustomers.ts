import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapToInterface } from '../../data/mappers/mapToInterface';
import { ICustomer } from '../../data/interfaces/ICustomer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allCustomers = await googleSheetsService.setSheet(ESheets.Customers).getAll();
    const mappedCustomers = mapToInterface<ICustomer>(allCustomers);
    res.status(200).json(mappedCustomers);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
