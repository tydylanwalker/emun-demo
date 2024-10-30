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
        sx={{
          bgcolor: Object.values(props.row).some((field) => field.error) ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.2)',
        }}
      >
        {props.headers.map((header, index) => {
          const error = determineErrorHandling(props.row[header.id].error, props.row);

          return (
            <TableCell
              key={index}
              align={header.align || 'center'}
              onClick={() => error && handleModalOpen(error)}
              // onClick={() => error && error.function()}
              sx={{ cursor: error ? 'pointer' : 'default', whiteSpace: 'nowrap'}}
            >
              <Typography
                p={1}
                sx={{
                  border: error ? '1px solid red' : 'none',
                  borderRadius: 2,
                }}
              >
                {formatCellData(header.type, props.row[header.id].value)}
              </Typography>
              <Stack height='0.8rem'>
                {error && (
                  <Typography color='error' sx={{ fontSize: '0.7rem', mt: 0.5 }}>
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
        header='Match Order Modal'
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
        reason: 'No matching order found',
        searchText: row.customerName.value,
      };
    case ErrorEnum.multiplePo:
      return {
        reason: 'Multiple orders found',
        searchText: row.poNumber.value,
      };
    case ErrorEnum.multipleCustomer:
      return {
        reason: 'Multiple customers found',
        searchText: row.poNumber.value,
      };
    case ErrorEnum.noCustomer:
      return {
        reason: 'No matching customer found',
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
