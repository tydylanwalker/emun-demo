import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { IDivisionHeader } from './DivisionsTable';

export function DivisionsTableRow(props: IDivisionTableRowProps & TableRowProps) {
  return (
    <TableRow>
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
