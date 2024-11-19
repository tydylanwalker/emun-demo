import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableRowProps,
  Typography,
} from '@mui/material';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';
import { useState } from 'react';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { AddNewDivision } from '../../map-page/forms/AddNewDivision';
import { CustomInput } from '../../../shared/CustomInput';
import { DivisionsTableRow } from '../../map-page/table/DivisionsTableRow';

interface ITerritory {
  name: string;
  divisions: number;
  divisionsArray: IDivision[];
  zipCodes: number;
  zipCodesArray: IDivision[];
  customers: number;
}

interface ITerritoryHeader {
  label: string;
  id: keyof ITerritory;
  align: 'left' | 'right' | 'center';
}

const territoryHeaders: ITerritoryHeader[] = [
  { label: 'Name', align: 'left', id: 'name' },
  { label: 'Zip Codes', align: 'right', id: 'zipCodes' },
  { label: 'Customers', align: 'right', id: 'customers' },
];

interface IDivisionHeader {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const divisionHeaders: IDivisionHeader[] = [{ label: 'Name', align: 'left', id: 'division' }];
interface IZipCodeHeader {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const zipCodeHeaders: IZipCodeHeader[] = [{ label: 'Zip Code', align: 'left', id: 'zip' }];

function TerritoriesTableRow(props: ITerritoriesTableRowProps & TableRowProps) {
  const sx = props.onClick
    ? {
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }
    : {};
  return (
    <TableRow sx={sx} onClick={props.onClick}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'left'}>
          <Typography>{props.row[header.id] as string}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface ITerritoriesTableRowProps {
  row: ITerritory;
  headers: ITerritoryHeader[];
}

export function TerritoriesTab(props: ITerritoriesTableProps) {
  const [addNewTerritoryOpen, setAddNewTerritoryOpen] = useState(false);
  const rows: ITerritory[] = Array.from(
    new Map(props.divisions.map((division) => [division.territory, division])).values()
  ).map((row) => {
    const zipCodes = Array.from(
      new Map(
        props.divisions
          .filter((division) => division.territory === row.territory)
          .map((division) => [division.zip, division])
      ).values()
    );

    const divisions = Array.from(
      new Map(
        props.divisions
          .filter((division) => division.territory === row.territory)
          .map((division) => [division.division, division])
      ).values()
    );

    return {
      name: row.territory,
      divisions: divisions.length,
      divisionsArray: divisions,
      zipCodes: zipCodes.length,
      zipCodesArray: zipCodes,
      customers: Math.floor(zipCodes.length * (10 * Math.random())), // just fake data, we do not have customers
    };
  });

  const [viewingTerritory, setViewingTerritory] = useState(false);
  const [rowSelected, setRowSelected] = useState<ITerritory | undefined>();

  function handleRowClick(row: ITerritory) {
    setViewingTerritory(true);
    setRowSelected(row);
  }

  function handleDropdownChange(event: any) {
    const { value } = event.target;

    const foundRow = rows.find((row) => row.name === value);
    setRowSelected(foundRow);
  }

  return (
    <>
      {!viewingTerritory ? (
        <CustomTableContainer
          header={
            <Stack gap={3} p={2}>
              <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
                <Typography variant='h5' fontWeight='bold'>
                  Territories
                </Typography>
                <Stack direction='row' gap={1}>
                  <Button variant='outlined' onClick={() => setAddNewTerritoryOpen(true)}>
                    New Territory
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          }
        >
          <>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {territoryHeaders.map((header, index) => (
                    <TableCell key={index} align={header.align || 'left'}>
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TerritoriesTableRow
                    key={index}
                    row={row}
                    headers={territoryHeaders}
                    onClick={() => handleRowClick(row)}
                  ></TerritoriesTableRow>
                ))}
              </TableBody>
            </Table>
            <AddNewDivision open={addNewTerritoryOpen} closeModal={() => setAddNewTerritoryOpen(false)} />
          </>
        </CustomTableContainer>
      ) : (
        <Stack height={1} gap={2}>
          <Stack direction='row' gap={2} flexGrow={1} alignItems='center'>
            <Button
              variant='contained'
              sx={{ whiteSpace: 'nowrap', p: 1, mt: 3 }}
              onClick={() => setViewingTerritory(false)}
            >
              {'< Back'}
            </Button>
            <CustomInput
              select
              label='Territory Selected'
              value={rowSelected?.name}
              options={rows.map((option) => option.name)}
              onChange={handleDropdownChange}
            />
            <CustomInput label='Total Zip Codes' value={rowSelected?.zipCodes} disabled />
            <CustomInput label='Total Customers' value={rowSelected?.customers} disabled />
          </Stack>
          <Stack flexGrow={1} height={1} direction='row' gap={3}>
            <Stack height={0.9} width='50%'>
              <CustomTableContainer
                width='100%'
                header={
                  <Stack gap={3} p={2}>
                    <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
                      <Typography variant='h5' fontWeight='bold'>
                        Divisions
                      </Typography>
                      <Stack direction='row' gap={1}>
                        <Button variant='outlined' onClick={() => alert('add division')}>
                          Add Division
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                }
              >
                <>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {divisionHeaders.map((header, index) => (
                          <TableCell key={index} align={header.align || 'left'}>
                            {header.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowSelected?.divisionsArray.map((row, index) => (
                        <DivisionsTableRow key={index} row={row} headers={divisionHeaders}></DivisionsTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              </CustomTableContainer>
            </Stack>
            <Stack height={0.9} width='50%'>
              <CustomTableContainer
                width='100%'
                header={
                  <Stack gap={3} p={2}>
                    <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
                      <Typography variant='h5' fontWeight='bold'>
                        Zip Code
                      </Typography>
                      <Stack direction='row' gap={1}>
                        <Button variant='outlined' onClick={() => alert('add zip code')}>
                          Add Zip Code
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                }
              >
                <>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {zipCodeHeaders.map((header, index) => (
                          <TableCell key={index} align={header.align || 'left'}>
                            {header.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowSelected?.zipCodesArray.map((row, index) => (
                        <DivisionsTableRow key={index} row={row} headers={zipCodeHeaders}></DivisionsTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              </CustomTableContainer>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

interface ITerritoriesTableProps {
  divisions: IDivision[];
}
