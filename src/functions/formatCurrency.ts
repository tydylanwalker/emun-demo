/**
 * Formats a number as currency with commas for thousands separators
 *
 * @param value - The number to format
 * @returns The formatted currency string (e.g., "302,919.99")
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
