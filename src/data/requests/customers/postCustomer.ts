import { ICustomer } from '../../interfaces/ICustomer';

export async function postCustomer(CustomerData: ICustomer): Promise<boolean> {
  const response = await fetch('/api/postCustomer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(CustomerData),
  });

  return response.ok;
}
