import dayjs from 'dayjs';
import { formatCurrency } from './formatCurrency';

export function formatCellData(type: string | undefined, value: string | number | boolean | undefined) {
  if (value === undefined) return value;
  switch (type) {
    case 'currency':
      return '$' + formatCurrency(Number(value) || 0);
    case 'date':
      return value ? dayjs(value.toString()).format('MM/DD/YYYY') : '';
    case 'percentage':
      return value.toString() + '%';
    default:
      return value;
  }
}
