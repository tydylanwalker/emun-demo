import { IOrder } from '../../interfaces/IOrder';

export async function getAllOrders(): Promise<IOrder[]> {
  const response = await fetch('/api/getAllOrders');

  if (response.ok) {
    return (await response.json()) as IOrder[];
  } else {
    return [];
  }
}
