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

interface IDivisionHeader {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const divisionHeaders: IDivisionHeader[] = [
  { label: 'Name', align: 'left', id: 'territory' },
  { label: 'Zip Codes', align: 'left', id: 'zip' },
  { label: 'Customers', align: 'left', id: 'vendor' },
];

function formatCellData(data: string, header: string) {
  switch (header) {
    case 'zip':
      return Math.round(200 * Math.random());
    case 'vendor':
      return Math.round(500 * Math.random());
    default:
      return data;
  }
}

function TerritoriesTableRow(props: IDivisionTableRowProps & TableRowProps) {
  return (
    <TableRow sx={{ cursor: 'pointer' }} onClick={props.onClick}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'left'}>
          <Typography>{formatCellData(props.row[header.id], header.id)}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IDivisionTableRowProps {
  row: IDivision;
  headers: IDivisionHeader[];
}

export function TerritoriesTab(props: ITerritoriesTableProps) {
  const [addNewDivisionOpen, setAddNewDivisionOpen] = useState(false);
  const rows = Array.from(new Map(props.divisions.map((division) => [division.territory, division])).values());

  return (
    <Stack>
      <CustomTableContainer
        header={
          <Stack gap={3} p={2}>
            <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold'>
                Territories
              </Typography>
              <Stack direction='row' gap={1}>
                <Button variant='outlined' onClick={() => setAddNewDivisionOpen(true)}>
                  New Division
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
              {rows.map((row, index) => (
                <TerritoriesTableRow
                  key={index}
                  row={row}
                  headers={divisionHeaders}
                  onClick={() => alert('Open Territory Row Stats')}
                ></TerritoriesTableRow>
              ))}
            </TableBody>
          </Table>
          <AddNewDivision open={addNewDivisionOpen} closeModal={() => setAddNewDivisionOpen(false)} />
        </>
      </CustomTableContainer>
    </Stack>
  );
}

interface ITerritoriesTableProps {
  divisions: IDivision[];
}
