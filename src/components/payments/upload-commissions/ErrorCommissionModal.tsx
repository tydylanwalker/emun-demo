import { Alert, Paper, Stack, Typography } from '@mui/material';
import { OrdersTable } from '../../orders/OrdersTable';
import { CustomModal } from '../../shared/CustomModal';
import { IUploadCommissionsTableRowError } from './upload-commissions-table/UploadCommissionsTableRow';
import { IHeaderMeta, IUploadCommissionsRow } from './UploadCommissions';
import { IOrder } from '../../../data/ordersMock';
import { useState } from 'react';
import { formatCellData } from '../../../functions/formatCellData';

export function ErrorCommissionModal(props: IErrorCommissionModalProps) {
  const [searchText, setSearchText] = useState(props.errorValues?.searchText);

  const handleClick = (newSearchText: string) => {
    setSearchText(newSearchText);
    console.log(newSearchText);
  };

  return (
    <CustomModal
      open={props.open}
      closeModal={props.handleModalClose}
      header='Find Matching Order For Invoice Error'
      width='90vw'
      height='90vh'
      nonScrollable
    >
      <Alert color='error'>Error: {props.errorValues?.reason}</Alert>
      <Paper sx={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)', borderRadius: '1rem', overflow: 'hidden', my: 2 }}>
        <Stack mb={2} direction='row' flexGrow={1}>
          {props.headers.map((header, index) => {
            const value = props.row[header.id].value;

            return (
              <Stack key={index} onClick={() => handleClick(value.toString())} sx={{ cursor: 'pointer' }}>
                <Typography
                  fontSize='1.2rem'
                  fontWeight='bold'
                  whiteSpace='nowrap'
                  bgcolor='background.default'
                  padding='0.75rem 1.25rem'
                >
                  {header.label}
                </Typography>
                <Typography padding='0.5rem 1.25rem' paddingBottom='1rem' alignSelf='center' whiteSpace='nowrap'>
                  {formatCellData(header.type, value)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>
      <OrdersTable initialSearchText={searchText} clickable onConfirmMatch={props.onConfirmMatch} />
    </CustomModal>
  );
}

interface IErrorCommissionModalProps {
  open: boolean;
  handleModalClose: () => void;
  row: IUploadCommissionsRow;
  headers: IHeaderMeta[];
  errorValues?: IUploadCommissionsTableRowError;
  onConfirmMatch: (order: IOrder) => void;
}
