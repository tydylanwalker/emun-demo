import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
  Paper,
  Stack,
} from '@mui/material';
import { IHeaderMeta, IUploadCommissionsRow } from '../UploadCommissions';
import dayjs from 'dayjs';
import { UploadCommissionsTableTaskBar } from './UploadCommissionsTableTaskBar';
import { useEffect, useState } from 'react';

function formatCellData(type: string, value: string) {
  switch (type) {
    case 'currency':
      return '$' + (!!value ? Number(value).toFixed(2) : '0.00');
    case 'date':
      return dayjs(value).format('MM/DD/YYYY');
    default:
      return value;
  }
}

export function UploadCommissionsTable(props: IUploadCommissionsTableProps) {
  const [rowsWithErrors, setRowsWithErrors] = useState<IUploadCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const renderedRows = onlyShowErrors ? rowsWithErrors : props.rows;

  useEffect(() => {
    setRowsWithErrors(props.rows.filter((row) => Object.values(row).some((field) => field.error)));
  }, [props.rows]);

  return (
    <TableContainer component={Paper}>
      <UploadCommissionsTableTaskBar
        totalRows={props.rows.length}
        rowsWithErrors={rowsWithErrors.length}
        onlyShowErrors={onlyShowErrors}
        setOnlyShowErrors={setOnlyShowErrors}
      />
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'lightgrey' }}>
            {props.headers.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedRows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                bgcolor: Object.values(row).some((field) => field.error) ? 'rgba(255,0,0,0.2)' : 'inherit',
              }}
            >
              {props.headers.map((header, index) => {
                const error = row[header.id].error;
                return (
                  <TableCell
                    key={index}
                    align={header.align || 'left'}
                    onClick={() => error && error.function()}
                    sx={{ cursor: error ? 'pointer' : 'default' }}
                  >
                    <Typography
                      p={1}
                      sx={{
                        border: error ? '1px solid red' : 'none',
                        borderRadius: 2,
                      }}
                    >
                      {formatCellData(header.type, row[header.id].value)}
                    </Typography>
                    <Stack height='0.8rem'>
                      {error && (
                        <Typography color='error' sx={{ fontSize: '0.7rem', mt: 0.5 }}>
                          {error.errorText}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface IUploadCommissionsTableProps {
  headers: IHeaderMeta[];
  rows: IUploadCommissionsRow[];
}
