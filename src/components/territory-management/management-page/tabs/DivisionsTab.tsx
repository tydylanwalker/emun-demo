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
  { label: 'Name', align: 'left', id: 'division' },
  { label: 'Rep Group', align: 'left', id: 'repGroup' },
  { label: 'Rep', align: 'left', id: 'rep' },
];

function DivisionsTableRow(props: IDivisionTableRowProps & TableRowProps) {
  return (
    <TableRow sx={{ cursor: 'pointer' }} onClick={props.onClick}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'left'}>
          <Typography>{props.row[header.id]}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IDivisionTableRowProps {
  row: IDivision;
  headers: IDivisionHeader[];
}

export function DivisionsTab(props: IDivisionsTableProps) {
  const [addNewDivisionOpen, setAddNewDivisionOpen] = useState(false);
  const rows = Array.from(new Map(props.divisions.map((division) => [division.division, division])).values());

  return (
    <Stack>
      <CustomTableContainer
        header={
          <Stack gap={3} p={2}>
            <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold'>
                Divisions
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
                <DivisionsTableRow
                  key={index}
                  row={row}
                  headers={divisionHeaders}
                  onClick={() => alert('Open Division Row Stats')}
                ></DivisionsTableRow>
              ))}
            </TableBody>
          </Table>
          <AddNewDivision open={addNewDivisionOpen} closeModal={() => setAddNewDivisionOpen(false)} />
        </>
      </CustomTableContainer>
    </Stack>
  );
}

interface IDivisionsTableProps {
  divisions: IDivision[];
}
