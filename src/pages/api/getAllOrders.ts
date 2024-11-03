import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapToInterface } from '../../data/mappers/mapToInterface';
import { IOrder } from '../../data/interfaces/IOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allOrders = await googleSheetsService.setSheet(ESheets.Orders).getAll();
    const mappedOrders = mapToInterface<IOrder>(allOrders);
    res.status(200).json(mappedOrders);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
