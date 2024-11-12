import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material';
import { IDivisionHeader } from './table/DivisionsTable';
import { IDivision } from '../../data/interfaces/IDivision';

export function DivisionsTableRow(props: IDivisionTableRowProps & TableRowProps) {
  return (
    <TableRow
      onKeyDown={props.onKeyDown}
      tabIndex={-1}
      sx={{
        borderColor: 'primary.main',
      }}
    >
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
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
