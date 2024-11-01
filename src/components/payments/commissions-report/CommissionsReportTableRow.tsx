import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { ICommissionReport } from '../../../data/commissions';
import { ICommissionReportHeader } from './CommissionsReportTable';
import { SafetyDividerRounded } from '@mui/icons-material';

export function CommissionsReportTableRow(props: ICommissionsReportTableRowProps) {
  return (
    <TableRow sx={{ bgcolor: props.color, whiteSpace: 'nowrap' }}>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
          <Stack direction='row' gap={1} alignItems='center' justifyContent='space-around'>
            <Typography alignItems='center'>
              {formatCellData(header.type, props.row[header.id as keyof ICommissionReport])}{' '}
            </Typography>
            {header.id === 'repCommissionRate' ? (
              <SafetyDividerRounded onClick={() => alert('Open Split Commissions Modal')} sx={{ cursor: 'pointer' }} />
            ) : null}
          </Stack>
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
