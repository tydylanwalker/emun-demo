import { IDivision } from '../interfaces/IDivision';

export function mapDivision(rows: Array<{ [key: string]: any }>): IDivision[] {
  return rows.map((row) => {
    const check: IDivision = {
      guid: row.guid || '',
      repGroup: row.repGroup || '',
      division: row.division || '',
      rep: row.rep || '',
      vendor: row.vendor || '',
      territory: row.territory || '',
      zip: row.zip || '',
    };
    return check;
  });
}
