import dayjs from 'dayjs';
import { formatCurrency } from './formatCurrency';

export function formatCellData(type: string | undefined, value: string | number | boolean) {
  if (value === undefined) return value;
  switch (type) {
    case 'currency':
      return '$' + formatCurrency(Number(value) || 0);
    case 'date':
      return value ? dayjs(value.toString()).format('MM/DD/YYYY') : '';
    default:
      return value;
  }
}