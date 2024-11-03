import { IOrder } from '../../interfaces/IOrder';

export async function postOrder(OrderData: IOrder): Promise<boolean> {
  const response = await fetch('/api/postOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(OrderData),
  });

  return response.ok;
}
