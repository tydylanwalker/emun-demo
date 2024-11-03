import { ICheck } from '../../interfaces/ICheck';

export async function postCheck(CheckData: ICheck): Promise<boolean> {
  const response = await fetch('/api/postCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(CheckData),
  });

  return response.ok;
}
