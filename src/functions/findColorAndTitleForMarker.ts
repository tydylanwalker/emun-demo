import { IDivision } from '../data/interfaces/IDivision';

export function findColorAndTitleForMarker(divisions: IDivision[], zipCode: string) {
  const foundDivisions = divisions.filter((item) => item.zip === zipCode && item.territory !== '');
  const uniqueTerritories = foundDivisions.filter(
    (value, index, self) => index === self.findIndex((division) => division.territory === value.territory)
  );

  if (uniqueTerritories.length === 0) {
    return {
      color: 'grey',
      title: [],
    };
  } else if (uniqueTerritories.length === 1) {
    return {
      color: '#90caf9',
      title: uniqueTerritories,
    };
  }
  return {
    color: 'cyan',
    title: uniqueTerritories,
  };
}
