import { ICheck } from '../../interfaces/ICheck';

export async function getAllChecks(): Promise<ICheck[]> {
  const response = await fetch('/api/getAllChecks');

  if (response.ok) {
    return (await response.json()) as ICheck[];
  } else {
    return [];
  }
}
