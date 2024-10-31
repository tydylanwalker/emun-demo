import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { IHeaderMeta, IUploadCommissionsRow } from '../UploadCommissions';
import { UploadCommissionsTableTaskBar } from './UploadCommissionsTableTaskBar';
import { useEffect, useState } from 'react';
import { UploadCommissionsTableRow } from './UploadCommissionsTableRow';

export function UploadCommissionsTable(props: IUploadCommissionsTableProps) {
  const [rowsWithErrors, setRowsWithErrors] = useState<IUploadCommissionsRow[]>([]);
  const [onlyShowErrors, setOnlyShowErrors] = useState(false);
  const renderedRows = onlyShowErrors ? rowsWithErrors : props.rows;
  // const styles = {
  //   container: {
  //     backgroundColor: '#141414',
  //     borderRadius: '12px',
  //     boxShadow: 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)',
  //   }
  // };
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
            <UploadCommissionsTableRow key={index} row={row} headers={props.headers} />
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
