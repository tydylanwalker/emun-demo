import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { states } from '../../../../data/constants';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { getDivisions, getZipCodes } from '../../../../store/slices/dataSlice';
import { CustomInput } from '../../../shared/CustomInput';
import { DivisionsTable } from '../table/DivisionsTable';
import { DivisionMap } from './DivisionsMap';

export function findNonEmptyDivisions(divisions: IDivision[]) {
  return divisions.filter((division) => division.division !== '' && division.territory !== '');
}

export function TerritoryMap() {
  const divisions = useAppSelector(getDivisions);
  const [divisionSelected, setDivisionSelected] = useState<string>('');
  const divisionOptions = Array.from(
    new Map(findNonEmptyDivisions(divisions).map((division) => [division.division, division])).values()
  );

  const [territorySelected, setTerritorySelected] = useState<string>('');
  const territoryOptions = Array.from(
    new Map(findNonEmptyDivisions(divisions).map((division) => [division.territory, division])).values()
  );
  const allZipCodes = useAppSelector(getZipCodes);
  const [stateSelected, setStateSelected] = useState<string>('');

  const [rows, setRows] = useState<IDivision[]>(divisions);

  useEffect(() => {
    let filteredRows = divisions;
    if (divisionSelected) filteredRows = filteredRows.filter((row) => row.division === divisionSelected);
    if (territorySelected) filteredRows = filteredRows.filter((row) => row.territory === territorySelected);
    if (stateSelected) {
      const statesZipCodes = allZipCodes
        .filter((zipCode) => zipCode.State === stateSelected)
        .map((option) => option.Id);
      filteredRows = filteredRows.filter((row) => statesZipCodes.includes(row.zip));
    }

    setRows(filteredRows);
  }, [allZipCodes, divisionSelected, divisions, stateSelected, territorySelected]);

  return (
    <Stack gap={1} direction='row' height={1} flexWrap='wrap'>
      <Stack gap={0.5} flexGrow={1} minWidth='40%' minHeight='50%' mx={2}>
        <Stack direction='row' gap={1} justifyContent='right'>
          <Typography fontSize='0.75rem'>Exists in Territories: </Typography>
          <Stack alignItems='center' direction='row' gap={1}>
            <Typography fontSize='0.675rem'>None</Typography>
            <Stack bgcolor='grey' height='0.5rem' width='0.5rem' />
          </Stack>
          <Stack alignItems='center' direction='row' gap={1}>
            <Typography fontSize='0.675rem'>Single</Typography>
            <Stack bgcolor='#90caf9' height='0.5rem' width='0.5rem' />
          </Stack>
          <Stack alignItems='center' direction='row' gap={1}>
            <Typography fontSize='0.675rem'>Multiple</Typography>
            <Stack bgcolor='cyan' height='0.5rem' width='0.5rem' />
          </Stack>
        </Stack>
        <DivisionMap data={rows} />
      </Stack>
      <Stack gap={2} height={1} flexGrow={1} mx={2}>
        <Stack height={1}>
          <DivisionsTable
            divisions={findNonEmptyDivisions(rows)}
            filters={
              <Stack direction='row' gap={2}>
                <CustomInput
                  size='small'
                  select
                  value={divisionSelected}
                  label='Select Division'
                  options={divisionOptions.map((option) => option.division)}
                  onChange={(event) => setDivisionSelected(event.target.value as string)}
                />
                <CustomInput
                  size='small'
                  select
                  value={territorySelected}
                  label='Select Territory'
                  options={territoryOptions.map((option) => option.territory)}
                  onChange={(event) => setTerritorySelected(event.target.value as string)}
                />
                <CustomInput
                  size='small'
                  select
                  value={stateSelected}
                  label='Select State'
                  options={states}
                  onChange={(event) => setStateSelected(event.target.value as string)}
                />
              </Stack>
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
