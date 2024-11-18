import { IZipCodes } from '../interfaces/IZipCodes';

export function mapZipCodes(rows: Array<{ [key: string]: any }>): IZipCodes[] {
  return rows.map((row) => {
    const vendor: IZipCodes = {
      Id: row.Id || '',
      City: row.City || '',
      State: row.State || '',
      Country: row.Country || '',
      Latitude: Number(row.Latitude),
      Longitude: Number(row.Longitude),
    };
    return vendor;
  });
}
