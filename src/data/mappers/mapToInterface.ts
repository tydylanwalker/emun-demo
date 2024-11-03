/**
 * All our sheets should be 1 to 1 to our interfaces for simplicity so this will just type them
 * @param row row data
 * @param defaultValue optional default value
 * @returns T[]
 */
export function mapToInterface<T>(rows: Array<{ [key: string]: any }>): T[] {
  return rows.map((row) => {
    const mapped: Partial<T> = {};
    Object.keys(mapped).forEach((key) => {
      mapped[key as keyof T] = row[key] || '';
    });
    return mapped as T;
  });
}
