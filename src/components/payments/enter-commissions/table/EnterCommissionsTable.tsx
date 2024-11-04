import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { IHeaderMeta, IEnterCommissionsRow } from '../EnterCommissions';
import { EnterCommissionsTableTaskBar } from './EnterCommissionsTableTaskBar';
import { useEffect, useState } from 'react';
import { EnterCommissionsTableRow } from './EnterCommissionsTableRow';
import { IOrder } from '../../../../data/interfaces/IOrder';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';

export function EnterCommissionsTable(props: IEnterCommissionsTableProps) {
  const [rowsWithErrors, setRowsWithErrors] = useState<IEnterCommissionsRow[]>([]);
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
        <EnterCommissionsTableTaskBar
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
          <TableRow>
            <TableCell align={'center'} sx={{ cursor: 'default' }}>
              <Checkbox checked={true} onChange={() => {}} />
            </TableCell>
            {props.headers.map((header, index) => (
              <TableCell key={index} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedRows.map((row, index) => (
            <EnterCommissionsTableRow
              key={index}
              row={row}
              headers={props.headers}
              onConfirmMatch={props.onConfirmMatch}
              toggleChecked={props.toggleChecked}
            />
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}

interface IEnterCommissionsTableProps {
  headers: IHeaderMeta[];
  rows: IEnterCommissionsRow[];
  onConfirmMatch?: (order: IOrder, row: IEnterCommissionsRow) => void;
  toggleChecked?: (row: IEnterCommissionsRow) => void;
  submitRows: () => void;
}
