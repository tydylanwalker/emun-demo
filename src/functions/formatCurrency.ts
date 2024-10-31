/**
 * Removes any non number digits and then injects commas
 *
 * @param value number or string value
 * @returns value in currency format ex. 20,000
 */
export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
}
