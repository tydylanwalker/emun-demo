import { ICheck } from '../data/interfaces/ICheck';
import { formatCurrency } from './formatCurrency';

/**
 * Takes a check object and displays it as {id} - {amount}
 *
 * @param check ICheck
 * @returns check in desired format
 */
export function checkDisplayValue(check: ICheck) {
  return `${check.number} - $${formatCurrency(Number(check.checkAmount))}`;
}
