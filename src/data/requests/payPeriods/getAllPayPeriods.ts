import { IPayPeriod } from '../../interfaces/IPayPeriod';

export async function getAllPayPeriods(): Promise<IPayPeriod[]> {
  const response = await fetch('/api/getAllPayPeriods');

  if (response.ok) {
    return (await response.json()) as IPayPeriod[];
  } else {
    return [];
  }
}
