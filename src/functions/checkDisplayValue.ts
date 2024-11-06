import { ICheck } from '../data/interfaces/ICheck';
import { formatCurrency } from './formatCurrency';

/**
 * Takes a check object and displays it as {id} - {amount}
 *
 * @param check ICheck
 * @returns check in desired format
 */
export function checkDisplayValue(check: ICheck | undefined) {
  if (check === undefined) return '';
  return `${check.number} - $${formatCurrency(Number(check.checkAmount))}`;
}
