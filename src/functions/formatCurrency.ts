/**
 * Removes any non number digits and then injects commas
 *
 * @param value number or string value
 * @returns value in currency format ex. 20,000
 */
export function formatCurrency(value: string | number) {
  return value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
