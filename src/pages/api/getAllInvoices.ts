import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapToInterface } from '../../data/mappers/mapToInterface';
import { IInvoice } from '../../data/interfaces/IInvoice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allInvoices = await googleSheetsService.setSheet(ESheets.Invoices).getAll();
    const mappedInvoices = mapToInterface<IInvoice>(allInvoices);
    res.status(200).json(mappedInvoices);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
