import { useEffect, useState } from 'react';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { IDivision } from '../../../data/interfaces/IDivision';
import { DivisionsTableRow } from './DivisionsTableRow';

export interface IDivisionHeader {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const divisionHeaders: IDivisionHeader[] = [
  { label: 'Division', align: 'center', id: 'division' },
  { label: 'Rep', align: 'center', id: 'rep' },
  { label: 'Rep Group', align: 'center', id: 'repGroup' },
  { label: 'Vendor', align: 'center', id: 'vendor' },
  { label: 'Territory', align: 'center', id: 'territory' },
];

export function DivisionsTable(props: IDivisionsTableProps) {
  return (
    <CustomTableContainer
      tabIndex={0}
      header={
        <Stack direction='row' alignItems='center' gap={2}>
          <Typography variant='h5' fontWeight='bold' p={2}>
            View Divisions
          </Typography>
        </Stack>
      }
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {divisionHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header.align || 'center'}
                sx={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
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
    </CustomTableContainer>
  );
}

interface IDivisionsTableProps {
  divisions: IDivision[];
}
