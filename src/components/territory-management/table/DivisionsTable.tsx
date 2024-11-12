import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { IDivision } from '../../../data/interfaces/IDivision';
import { DivisionsTableRow } from '../DivisionsTableRow';
import { useState } from 'react';
import { AddNewDivision } from '../forms/AddNewDivision';
import { AddNewTerritory } from '../forms/AddNewTerritory';

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
      tabIndex={0}
      header={
        <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
          <Typography variant='h5' fontWeight='bold' p={2}>
            Territory Management
          </Typography>
          <Stack direction='row' gap={1} px={2}>
            <Button variant='outlined' onClick={() => setAddNewDivisionOpen(true)}>
              New Division
            </Button>
            <Button variant='outlined' onClick={() => setAddNewTerritoryOpen(true)}>
              New Territory
            </Button>
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
}
