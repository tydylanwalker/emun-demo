// services/GoogleSheetsService.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { ESheets } from '../data/enums/ESheets';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];

class SheetsService {
  private doc: GoogleSpreadsheet;
  private currentSheetId?: number;

  constructor() {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID as string;
    const email = process.env.GOOGLE_CLIENT_EMAIL as string;
    const key = process.env.GOOGLE_SERVICE_PRIVATE_KEY as string;

    const jwt = new JWT({
      email,
      key,
      scopes: SCOPES,
    });

    this.doc = new GoogleSpreadsheet(spreadsheetId, jwt);
  }

  setSheet(sheetId: ESheets) {
    this.currentSheetId = sheetId;
    return this;
  }

  private validateSheetId() {
    if (this.currentSheetId === undefined) {
      throw new Error('Sheet ID must be set using setSheet() before calling this method.');
    }
  }

  async getAll() {
    this.validateSheetId();
    await this.doc.loadInfo();

    const sheet = this.doc.sheetsById[this.currentSheetId as number];
    await sheet.loadHeaderRow();
    const headerValues = sheet.headerValues;
    const rows = await sheet.getRows();

    return rows.map((row) => {
      const rowData: { [key: string]: any } = {};
      headerValues.forEach((header) => {
        rowData[header] = row.get(header);
      });
      return rowData;
    });
  }

  async post(data: { [key: string]: any }) {
    this.validateSheetId();
    await this.doc.loadInfo();

    const sheet = this.doc.sheetsById[this.currentSheetId as number];
    await sheet.addRow(data);
  }
}

export default SheetsService;
