import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { useState } from 'react';
import { AddNewDivision } from '../forms/AddNewDivision';
import { AddNewTerritory } from '../forms/AddNewTerritory';
import { DivisionsTableRow } from './DivisionsTableRow';

export interface IDivisionHeader {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const divisionHeaders: IDivisionHeader[] = [
  { label: 'Division', align: 'left', id: 'division' },
  { label: 'Zip Code', align: 'left', id: 'zip' },
  { label: 'Territory', align: 'left', id: 'territory' },
  { label: 'Rep', align: 'left', id: 'rep' },
  { label: 'Rep Group', align: 'left', id: 'repGroup' },
  { label: 'Vendor', align: 'left', id: 'vendor' },
];

export function DivisionsTable(props: IDivisionsTableProps) {
  const [addNewTerritoryOpen, setAddNewTerritoryOpen] = useState(false);
  const [addNewDivisionOpen, setAddNewDivisionOpen] = useState(false);
  return (
    <CustomTableContainer
      header={
        <Stack gap={3} px={2} pb={2}>
          {props.filters}
          <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
            <Typography variant='h5' fontWeight='bold'>
              Territory Management
            </Typography>
            <Stack direction='row' gap={1}>
              <Button variant='outlined' onClick={() => setAddNewDivisionOpen(true)}>
                New Division
              </Button>
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
              {divisionHeaders.map((header, index) => (
                <TableCell key={index} align={header.align || 'left'}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.divisions.map((row, index) => (
              <DivisionsTableRow key={index} row={row} headers={divisionHeaders}></DivisionsTableRow>
            ))}
          </TableBody>
        </Table>
        <AddNewDivision open={addNewDivisionOpen} closeModal={() => setAddNewDivisionOpen(false)} />
        <AddNewTerritory open={addNewTerritoryOpen} closeModal={() => setAddNewTerritoryOpen(false)} />
      </>
    </CustomTableContainer>
  );
}

interface IDivisionsTableProps {
  divisions: IDivision[];
  filters?: JSX.Element;
}
