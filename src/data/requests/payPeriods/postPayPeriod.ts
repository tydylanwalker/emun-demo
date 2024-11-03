import { IPayPeriod } from '../../interfaces/IPayPeriod';

export async function postPayPeriod(PayPeriodData: IPayPeriod): Promise<boolean> {
  const response = await fetch('/api/postPayPeriod', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(PayPeriodData),
  });

  return response.ok;
}
