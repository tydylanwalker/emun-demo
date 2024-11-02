import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { IHeaderMeta, IUploadCommissionsRow } from '../UploadCommissions';
import { UploadCommissionsTableTaskBar } from './UploadCommissionsTableTaskBar';
import { useEffect, useState } from 'react';
import { UploadCommissionsTableRow } from './UploadCommissionsTableRow';
import { IOrder } from '../../../../data/ordersMock';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';

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
    <CustomTableContainer
      taskBar={
        <UploadCommissionsTableTaskBar
          totalRows={props.rows.length}
          rowsWithErrors={rowsWithErrors.length}
          onlyShowErrors={onlyShowErrors}
          setOnlyShowErrors={setOnlyShowErrors}
          submitRows={props.submitRows}
        />
      }
    >
      <Table stickyHeader>
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
    </CustomTableContainer>
  );
}

interface IUploadCommissionsTableProps {
  headers: IHeaderMeta[];
  rows: IUploadCommissionsRow[];
  onConfirmMatch?: (order: IOrder, row: IUploadCommissionsRow) => void;
  submitRows: () => void;
}
