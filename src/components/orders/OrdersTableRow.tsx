import { TableCell, TableRow, Typography } from '@mui/material';
import { IOrderHeader } from './OrdersTable';
import { formatCellData } from '../../functions/formatCellData';
import { IOrder } from '../../data/ordersMock';

export function OrdersTableRow(props: IOrdersTableRowProps) {
  return (
    <TableRow sx={{ bgcolor: props.color, whiteSpace: 'nowrap' }}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
          <Typography>{formatCellData(header.type, props.row[header.id as keyof IOrder])}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IOrdersTableRowProps {
  color?: string;
  row: IOrder;
  headers: IOrderHeader[];
}
