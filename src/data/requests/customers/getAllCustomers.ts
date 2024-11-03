import { ICustomer } from '../../interfaces/ICustomer';

export async function getAllCustomers(): Promise<ICustomer[]> {
  const response = await fetch('/api/getAllCustomers');

  if (response.ok) {
    return (await response.json()) as ICustomer[];
  } else {
    return [];
  }
}
