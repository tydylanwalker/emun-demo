import { TableCell, TableRow, Typography } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { ICommissionReport } from '../../../data/commissions';
import { ICommissionReportHeader } from './CommissionsReportTable';

export function CommissionsReportTableRow(props: ICommissionsReportTableRowProps) {
  return (
    <TableRow sx={{ bgcolor: props.color, whiteSpace: 'nowrap' }}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
          <Typography>{formatCellData(header.type, props.row[header.id as keyof ICommissionReport])}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface ICommissionsReportTableRowProps {
  color?: string;
  row: ICommissionReport;
  headers: ICommissionReportHeader[];
}
