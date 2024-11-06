// services/GoogleSheetsService.ts
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { ESheets } from '../data/enums/ESheets';
import { v4 as uuidv4 } from 'uuid';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];

class SheetsService {
  private doc: GoogleSpreadsheet;
  private sheetsApi: sheets_v4.Sheets;
  private spreadsheetId: string;
  private currentSheetId?: number;
  private sheetCache?: GoogleSpreadsheetWorksheet;

  // * CONSTRUCTOR
  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID as string;
    const email = process.env.GOOGLE_CLIENT_EMAIL as string;
    const key = process.env.GOOGLE_SERVICE_PRIVATE_KEY as string;

    const jwt = new JWT({
      email,
      key,
      scopes: SCOPES,
    });

    this.doc = new GoogleSpreadsheet(this.spreadsheetId, jwt);
    this.sheetsApi = google.sheets({ version: 'v4', auth: jwt });
  }

  // * SETTERS
  setSheet(sheetId: ESheets) {
    if (this.currentSheetId !== sheetId) {
      this.currentSheetId = sheetId;
      this.sheetCache = undefined;
    }
    return this;
  }

  // * GETTERS
  private async getSheet() {
    if (!this.currentSheetId) {
      throw new Error('Sheet ID must be set using setSheet() before calling this method.');
    }
    if (!this.sheetCache) {
      await this.doc.loadInfo();
      this.sheetCache = this.doc.sheetsById[this.currentSheetId];
    }
    return this.sheetCache;
  }

  // * REQUESTS
  async get() {
    const sheet = await this.getSheet();
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

  async post(rows: any[]) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    // Add a guid for each row we are going to post (sheets api cannot handle this so we have to do it here)
    const values = rows.map((row) => {
      row.guid = row.guid || uuidv4();
      return headers.map((header) => row[header] ?? '');
    });

    const resource = {
      values: values,
    };

    try {
      await this.sheetsApi.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: sheet.title,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: resource,
      });
    } catch (error) {
      console.error('Error in batchPost:', error);
      throw error;
    }
  }

  async patch(rows: { [key: string]: any }[]) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headerValues = sheet.headerValues;
    const sheetTitle = sheet.title;

    const existingRows = await this.get();

    const body: { index: number; row: { [key: string]: any } }[] = [];
    const errors: { [key: string]: any }[] = [];

    rows.forEach((row) => {
      const index = existingRows.findIndex((existingRow) => existingRow.guid === row.guid);

      if (index === -1) {
        errors.push(row);
      } else {
        body.push({
          index,
          row: {
            ...existingRows[index],
            ...row,
          },
        });
      }
    });

    // This should always be empty, if not something is wrong
    if (errors.length > 0) console.error('ERROR ROWS: ', errors);

    const data = body.map(({ index, row }) => {
      const values = headerValues.map((header) => row[header] ?? '');
      const range = `${sheetTitle}!A${index + 2}`;
      return { range, values: [values] };
    });

    const resource = {
      data,
      valueInputOption: 'RAW',
    };

    try {
      await this.sheetsApi.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: resource,
      });
    } catch (error) {
      console.error('Error in batchUpdateRows:', error);
      throw error;
    }
  }

  async delete(rows: Array<{ [key: string]: any }>) {
    const sheet = await this.getSheet();
    const existingRows = await this.get();

    const deleteRequests = rows.map((row) => {
      const index = existingRows.findIndex((existingRow) => existingRow.guid === row.guid);

      if (index === -1) {
        throw new Error(`Row with guid ${row.guid} not found`);
      }

      return {
        deleteDimension: {
          range: {
            sheetId: sheet.sheetId,
            dimension: 'ROWS',
            startIndex: index + 1,
            endIndex: index + 2,
          },
        },
      };
    });

    try {
      await this.sheetsApi.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: deleteRequests,
        },
      });
    } catch (error) {
      console.error('Error in deleteRows:', error);
      throw error;
    }
  }
}

export default SheetsService;
