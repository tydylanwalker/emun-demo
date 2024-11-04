import { TableRow, TableCell, Typography, Stack, Checkbox } from '@mui/material';
import { ErrorEnum } from '../../../../data/enums/ErrorEnum';
import { IEnterCommissionsRow } from '../EnterCommissions';
import { useState } from 'react';
import { formatCellData } from '../../../../functions/formatCellData';
import { IOrder } from '../../../../data/interfaces/IOrder';
import { ErrorCommissionModal } from '../modals/ErrorCommissionModal';
import { enterCommissionHeaders } from '../../../../data/interfaces/IEnterCommissionsHeader';

export function EnterCommissionsTableRow(props: IEnterCommissionsTableRowProps) {
  const [orderGridOpen, setOrderGridOpen] = useState(false);
  const [errorValues, setErrorValues] = useState<IEnterCommissionsTableRowError | undefined>(undefined);

  const handleModalOpen = (error: IEnterCommissionsTableRowError) => {
    setOrderGridOpen(true);
    setErrorValues(error);
  };

  const handleModalClose = () => {
    setOrderGridOpen(false);
    setErrorValues(undefined);
  };

  const onConfirmMatch = (order: IOrder) => {
    setOrderGridOpen(false);
    props.onConfirmMatch?.(order, props.row);
  };

  return (
    <>
      <TableRow
        sx={Object.values(props.row).some((field) => field.error) ? { border: 2, borderColor: 'error.main' } : {}}
      >
        <TableCell align={'center'} sx={{ cursor: 'default' }}>
          <Checkbox checked={props.row.checked.value} onChange={() => props.toggleChecked?.(props.row)} />
        </TableCell>
        {enterCommissionHeaders.map((header, index) => {
          const error = determineErrorHandling(props.row[header.id].error, props.row);

          return (
            <TableCell
              key={index}
              align={header.align || 'center'}
              onClick={() => error && handleModalOpen(error)}
              sx={{ cursor: error ? 'pointer' : 'default' }}
            >
              <Typography color={error ? 'error' : 'inherit'}>
                {formatCellData(header.type, props.row[header.id].value)}
              </Typography>
              <Stack height='0.8rem'>
                {error && (
                  <Typography color='error' sx={{ fontSize: '0.8rem', mt: 0.5 }}>
                    {error.reason}
                  </Typography>
                )}
              </Stack>
            </TableCell>
          );
        })}
      </TableRow>
      <ErrorCommissionModal
        open={orderGridOpen}
        handleModalClose={handleModalClose}
        row={props.row}
        onConfirmMatch={onConfirmMatch}
        errorValues={errorValues}
      />
    </>
  );
}

interface IEnterCommissionsTableRowProps {
  row: IEnterCommissionsRow;
  onConfirmMatch?: (order: IOrder, row: IEnterCommissionsRow) => void;
  toggleChecked?: (row: IEnterCommissionsRow) => void;
}

export interface IEnterCommissionsTableRowError {
  reason: string;
  searchText: string;
}

function determineErrorHandling(
  error: ErrorEnum | undefined,
  row: IEnterCommissionsRow
): IEnterCommissionsTableRowError | undefined {
  if (error === undefined) return undefined;

  switch (error) {
    case ErrorEnum.noPo:
      return {
        reason: 'PO Number not found',
        searchText: row.customerName.value,
      };
    case ErrorEnum.multiplePo:
      return {
        reason: 'Duplicate PO Numbers',
        searchText: row.poNumber.value,
      };
    case ErrorEnum.multipleCustomer:
      return {
        reason: 'Duplicate Customers',
        searchText: row.poNumber.value,
      };
    case ErrorEnum.noCustomer:
      return {
        reason: 'Customer ID not found',
        searchText: row.poNumber.value,
      };
    case ErrorEnum.duplicateInvoice:
      return {
        reason: 'Duplicate invoice',
        searchText: row.poNumber.value,
      };
    default:
      return {
        reason: 'This field is empty',
        searchText: '',
      };
  }
}
