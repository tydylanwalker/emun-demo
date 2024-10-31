import { TableRow, TableCell, Typography, Stack } from '@mui/material';
import { ErrorEnum } from '../../../../data/ErrorEnum';
import { IHeaderMeta, IUploadCommissionsRow } from '../UploadCommissions';
import { useState } from 'react';
import { formatCellData } from '../../../../functions/formatCellData';
import { OrdersTable } from '../../../orders/OrdersTable';
import { CustomModal } from '../../../shared/CustomModal';

export function UploadCommissionsTableRow(props: IUploadCommissionsTableRowProps) {
  const [orderGridOpen, setOrderGridOpen] = useState(false);
  const [errorValues, setErrorValues] = useState<IUploadCommissionsTableRowError | undefined>(undefined);

  const handleModalOpen = (error: IUploadCommissionsTableRowError) => {
    setOrderGridOpen(true);
    setErrorValues(error);
  };

  const handleModalClose = () => {
    setOrderGridOpen(false);
    setErrorValues(undefined);
  };

  return (
    <>
      <TableRow
        sx={Object.values(props.row).some((field) => field.error) ? { border: 2, borderColor: 'error.main' } : {}}
      >
        {props.headers.map((header, index) => {
          const error = determineErrorHandling(props.row[header.id].error, props.row);

          return (
            <TableCell
              key={index}
              align={header.align || 'center'}
              onClick={() => error && handleModalOpen(error)}
              sx={{ cursor: error ? 'pointer' : 'default', whiteSpace: 'nowrap' }}
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
      <CustomModal
        open={orderGridOpen}
        closeModal={handleModalClose}
        header='Find Matching Order For Invoice Error'
        width='90vw'
        height='90vh'
      >
        <>
          <Stack my={2}>
            <UploadCommissionsTableRow row={props.row} headers={props.headers} />
          </Stack>
          <OrdersTable initialSearchText={errorValues?.searchText} />
        </>
      </CustomModal>
    </>
  );
}

interface IUploadCommissionsTableRowProps {
  row: IUploadCommissionsRow;
  headers: IHeaderMeta[];
}

interface IUploadCommissionsTableRowError {
  reason: string;
  searchText: string;
}

function determineErrorHandling(
  error: ErrorEnum | undefined,
  row: IUploadCommissionsRow
): IUploadCommissionsTableRowError | undefined {
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
