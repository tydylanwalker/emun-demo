import { IOrder } from '../interfaces/IOrder';

export function mapOrder(row: any): IOrder {
  const mappedOrder: Partial<IOrder> = {};

  (Object.keys(mappedOrder) as Array<keyof IOrder>).forEach((key) => {
    mappedOrder[key] = row[key] || '';
  });

  return mappedOrder as IOrder;
}
