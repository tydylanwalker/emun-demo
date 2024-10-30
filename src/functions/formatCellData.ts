import dayjs from 'dayjs';
import { formatCurrency } from './formatCurrency';

export function formatCellData(type: string | undefined, value: string | number | boolean) {
  if (value === undefined) return value;
  value = value.toString();
  switch (type) {
    case 'currency':
      return '$' + formatCurrency(value);
    case 'date':
      return value ? dayjs(value).format('MM/DD/YYYY') : '';
    default:
      return value;
  }
}
