import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { IHeaderMeta, IUploadCommissionsRow } from '../UploadCommissions';
import { UploadCommissionsTableTaskBar } from './UploadCommissionsTableTaskBar';
import { useEffect, useState } from 'react';
import { UploadCommissionsTableRow } from './UploadCommissionsTableRow';
import { IOrder } from '../../../../data/ordersMock';

export function UploadCommissionsTable(props: IUploadCommissionsTableProps) {
  const [rowsWithErrors, setRowsWithErrors] = useState<IUploadCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const renderedRows = onlyShowErrors ? rowsWithErrors : props.rows;

  useEffect(() => {
    const errors = props.rows.filter((row) => Object.values(row).some((field) => field.error));
    if (errors.length === 0) setOnlyShowErrors(false);
    setRowsWithErrors(errors);
  }, [props.rows]);

  return (
    <TableContainer component={Paper}>
      <UploadCommissionsTableTaskBar
        totalRows={props.rows.length}
        rowsWithErrors={rowsWithErrors.length}
        onlyShowErrors={onlyShowErrors}
        setOnlyShowErrors={setOnlyShowErrors}
        submitRows={props.submitRows}
      />
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'secondary.main' }}>
            {props.headers.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedRows.map((row, index) => (
            <UploadCommissionsTableRow
              key={index}
              row={row}
              headers={props.headers}
              onConfirmMatch={props.onConfirmMatch}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface IUploadCommissionsTableProps {
  headers: IHeaderMeta[];
  rows: IUploadCommissionsRow[];
  onConfirmMatch?: (order: IOrder, row: IUploadCommissionsRow) => void;
  submitRows: () => void;
}
