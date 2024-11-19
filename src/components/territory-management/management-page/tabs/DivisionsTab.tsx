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

interface IVendorHeaders {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const vendorHeaders: IVendorHeaders[] = [{ label: 'Company', align: 'left', id: 'vendor' }];
interface ITerritoryHeaders {
  label: string;
  id: keyof IDivision;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const territoryHeaders: ITerritoryHeaders[] = [{ label: 'Name', align: 'left', id: 'territory' }];

function DivisionsTableRow(props: IDivisionTableRowProps & TableRowProps) {
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
  const [viewingDivision, setViewingDivision] = useState(false);
  const [rowSelected, setRowSelected] = useState<IDivision | undefined>();
  const rows = Array.from(new Map(props.divisions.map((division) => [division.division, division])).values());
  const vendorRows = Array.from(
    new Map(
      props.divisions
        .filter((division) => division.division === rowSelected?.division)
        .map((division) => [division.vendor, division])
    ).values()
  );
  const territoryRows = Array.from(
    new Map(
      props.divisions
        .filter((division) => division.division === rowSelected?.division)
        .map((division) => [division.territory, division])
    ).values()
  );

  function handleRowClick(row: IDivision) {
    setViewingDivision(true);
    setRowSelected(row);
  }

  function handleDropdownChange(event: any) {
    const { value } = event.target;

    const foundRow = rows.find((row) => row.division === value);
    setRowSelected(foundRow);
  }

  return (
    <>
      {!viewingDivision ? (
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
                    onClick={() => handleRowClick(row)}
                  ></DivisionsTableRow>
                ))}
              </TableBody>
            </Table>
            <AddNewDivision open={addNewDivisionOpen} closeModal={() => setAddNewDivisionOpen(false)} />
          </>
        </CustomTableContainer>
      ) : (
        <Stack flexGrow={1} gap={2}>
          <Stack direction='row' gap={2} flexGrow={1} alignItems='center'>
            <Button
              variant='contained'
              sx={{ whiteSpace: 'nowrap', p: 1, mt: 3 }}
              onClick={() => setViewingDivision(false)}
            >
              {'< Back'}
            </Button>
            <CustomInput
              select
              label='Division Selected'
              value={rowSelected?.division}
              options={rows.map((option) => option.division)}
              onChange={handleDropdownChange}
            />
            <CustomInput label='Rep Group' value={rowSelected?.repGroup} disabled />
            <CustomInput label='Rep' value={rowSelected?.rep} disabled />
          </Stack>
          <Stack flexGrow={1} direction='row' gap={3}>
            <CustomTableContainer
              width='50%'
              header={
                <Stack gap={3} p={2}>
                  <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
                    <Typography variant='h5' fontWeight='bold'>
                      Vendors
                    </Typography>
                    <Stack direction='row' gap={1}>
                      <Button variant='outlined' onClick={() => alert('add new vendor')}>
                        New Vendor
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
                      {vendorHeaders.map((header, index) => (
                        <TableCell key={index} align={header.align || 'left'}>
                          {header.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vendorRows.map((row, index) => (
                      <DivisionsTableRow key={index} row={row} headers={vendorHeaders}></DivisionsTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            </CustomTableContainer>
            <CustomTableContainer
              width='50%'
              header={
                <Stack gap={3} p={2}>
                  <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
                    <Typography variant='h5' fontWeight='bold'>
                      Territories
                    </Typography>
                    <Stack direction='row' gap={1}>
                      <Button variant='outlined' onClick={() => alert('add new territory')}>
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
                    {territoryRows.map((row, index) => (
                      <DivisionsTableRow key={index} row={row} headers={territoryHeaders}></DivisionsTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            </CustomTableContainer>
          </Stack>
        </Stack>
      )}
    </>
  );
}

interface IDivisionsTableProps {
  divisions: IDivision[];
}
