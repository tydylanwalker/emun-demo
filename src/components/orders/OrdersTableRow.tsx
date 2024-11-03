import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material';
import { IOrderHeader } from './OrdersTable';
import { formatCellData } from '../../functions/formatCellData';
import { IOrder } from '../../data/interfaces/IOrder';

export function OrdersTableRow(props: IOrdersTableRowProps & TableRowProps) {
  return (
    <TableRow
      onKeyDown={props.onKeyDown}
      tabIndex={-1}
      sx={{
        bgcolor: props.color,
        border: props.selected ? 2 : 0,
        borderColor: 'primary.main',
        cursor: props.onClick ? 'pointer' : 'default',
      }}
      onClick={props.onClick}
    >
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'left'}>
          <Typography>{formatCellData(header.type, props.row[header.id])}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IOrdersTableRowProps {
  color?: string;
  row: IOrder;
  headers: IOrderHeader[];
  selected: boolean;
  onClick?: () => void;
}
