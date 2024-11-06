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

  // * PRIVATE HELPER FUNCTIONS

  // * REQUESTS

  async getAll() {
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

  async post(data: { [key: string]: any }) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    data.guid = data.guid || uuidv4();
    const rowData = headers.map((header) => data[header] ?? '');

    await sheet.addRow(rowData);
  }

  // In the batchPost function
  async batchPost(rows: any[]) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    const sheetTitle = sheet.title;

    const existingRows = await sheet.getRows();
    const startRow = existingRows.length + 2;

    const data = rows.map((row, index) => {
      row.guid = row.guid || uuidv4();
      const orderedRow = headers.map((header) => row[header] ?? '');

      return {
        range: `${sheetTitle}!A${startRow + index}`,
        values: [orderedRow],
      };
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
      console.error('Error in batchPost:', error);
      throw error;
    }
  }

  async update(row: { [key: string]: any }) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    const sheetTitle = sheet.title;

    const existingRows = await this.getAll();

    // Find index and update row values
    const index = existingRows.findIndex((existingRow) => existingRow.guid === row.guid);
    const updatedRow = { ...existingRows[index], ...row };

    const values = headers.map((header) => updatedRow[header] ?? '');

    const range = `${sheetTitle}!A${index + 2}`;

    const resource = {
      range,
      values: [values],
    };

    try {
      await this.sheetsApi.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: resource.range,
        valueInputOption: 'RAW',
        requestBody: { values: resource.values },
      });
    } catch (error) {
      console.error('Error in updateRow:', error);
      throw error;
    }
  }

  async batchUpdate(updateRows: { [key: string]: any }[]) {
    const sheet = await this.getSheet();
    await sheet.loadHeaderRow();
    const headerValues = sheet.headerValues;
    const sheetTitle = sheet.title;

    const existingRows = await this.getAll();

    const body: { index: number; row: { [key: string]: any } }[] = [];
    const notFound: { [key: string]: any }[] = [];

    updateRows.forEach((row) => {
      const index = existingRows.findIndex((existingRow) => existingRow.guid === row.guid);

      if (index === -1) {
        notFound.push(row);
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

    console.log('Not found: ', notFound);

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

  async delete(row: { [key: string]: any }) {
    const sheet = await this.getSheet();

    const existingRows = await this.getAll();

    // Find index of row to delete
    const index = existingRows.findIndex((existingRow) => existingRow.guid === row.guid);
    const startIndex = index + 1;
    const endIndex = startIndex + 1;

    try {
      // Use batchUpdate to delete the row entirely
      await this.sheetsApi.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheet.sheetId,
                  dimension: 'ROWS',
                  startIndex: startIndex,
                  endIndex: endIndex,
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Error in deleteRow:', error);
      throw error;
    }
  }
}

export default SheetsService;
