import { TableRowProps, TableRow, TableCell, Typography } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { ICommissionRuleHeader } from './CommissionRulesTable';
import { ICommissionRule } from '../../../data/interfaces/ICommissionRule';

export function CommissionRulesTableRow(props: ICommissionRulesTableRowProps & TableRowProps) {
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
        <TableCell
          key={index}
          align={header.align || 'left'}
          sx={{
            whiteSpace: 'nowrap', // Prevent text from wrapping to next line
            overflow: 'hidden', // Hide any overflow text
            textOverflow: 'ellipsis', // Show ellipsis (...) for overflow text
          }}
        >
          <Typography
            noWrap
            sx={
              props.shrinkText
                ? {
                    fontSize: '0.75rem', // Conditionally shrink the text size
                  }
                : {}
            }
          >
            {formatCellData(header.type, props.row[header.id])}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface ICommissionRulesTableRowProps {
  color?: string;
  row: ICommissionRule;
  headers: ICommissionRuleHeader[];
  selected: boolean;
  onClick?: () => void;
  shrinkText?: boolean; // Optional boolean to shrink the text size
}
