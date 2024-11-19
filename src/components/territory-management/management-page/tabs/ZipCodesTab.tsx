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
import { AddNewDivision } from '../../map-page/forms/AddNewDivision';
import { IZipCodes } from '../../../../data/interfaces/IZipCodes';

interface IZipCodesHeader {
  label: string;
  id: keyof IZipCodes;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const divisionHeaders: IZipCodesHeader[] = [
  { label: 'Zip', align: 'left', id: 'Id' },
  { label: 'State', align: 'left', id: 'State' },
  { label: 'City', align: 'left', id: 'City' },
  { label: 'Country', align: 'left', id: 'Country' },
];

function formatCellData(data: string, header: string) {
  switch (header) {
    default:
      return data;
  }
}

function ZipCodesTableRow(props: IZipCodesTableRowProps & TableRowProps) {
  return (
    <TableRow sx={{ cursor: 'pointer' }} onClick={props.onClick}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'left'}>
          <Typography>{formatCellData(props.row[header.id].toString(), header.id)}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IZipCodesTableRowProps {
  row: IZipCodes;
  headers: IZipCodesHeader[];
}

export function ZipCodesTab(props: IZipCodesTableProps) {
  const [addNewZipCodeOpen, setAddNewZipCodeOpen] = useState(false);
  const rows = props.zipCodes;

  return (
    <Stack height={1}>
      <CustomTableContainer
        header={
          <Stack gap={3} p={2}>
            <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold'>
                ZipCodes
              </Typography>
              <Stack direction='row' gap={1}>
                <Button variant='outlined' onClick={() => setAddNewZipCodeOpen(true)}>
                  New Zip Code
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
                <ZipCodesTableRow
                  key={index}
                  row={row}
                  headers={divisionHeaders}
                  onClick={() => alert('Open ZipCode Row Stats')}
                ></ZipCodesTableRow>
              ))}
            </TableBody>
          </Table>
          <AddNewDivision open={addNewZipCodeOpen} closeModal={() => setAddNewZipCodeOpen(false)} />
        </>
      </CustomTableContainer>
    </Stack>
  );
}

interface IZipCodesTableProps {
  zipCodes: IZipCodes[];
}
