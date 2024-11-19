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
  { label: 'Name', align: 'left', id: 'repGroup' },
  { label: 'Zip', align: 'left', id: 'zip' },
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

function RepGroupsTableRow(props: IDivisionTableRowProps & TableRowProps) {
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

export function RepGroupsTab(props: IRepGroupsTableProps) {
  const [addNewRepGroupOpen, setAddNewRepGroupOpen] = useState(false);
  const rows = Array.from(new Map(props.divisions.map((division) => [division.repGroup, division])).values());

  return (
    <CustomTableContainer
      header={
        <Stack gap={3} p={2}>
          <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
            <Typography variant='h5' fontWeight='bold'>
              RepGroups
            </Typography>
            <Stack direction='row' gap={1}>
              <Button variant='outlined' onClick={() => setAddNewRepGroupOpen(true)}>
                New Rep Group
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
              <RepGroupsTableRow
                key={index}
                row={row}
                headers={divisionHeaders}
                onClick={() => alert('Open RepGroup Row Stats')}
              ></RepGroupsTableRow>
            ))}
          </TableBody>
        </Table>
        <AddNewDivision open={addNewRepGroupOpen} closeModal={() => setAddNewRepGroupOpen(false)} />
      </>
    </CustomTableContainer>
  );
}

interface IRepGroupsTableProps {
  divisions: IDivision[];
}
