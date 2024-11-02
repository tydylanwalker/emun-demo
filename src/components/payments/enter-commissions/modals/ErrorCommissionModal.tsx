import { Alert, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { OrdersTable } from '../../../orders/OrdersTable';
import { CustomModal } from '../../../shared/CustomModal';
import { IEnterCommissionsTableRowError } from '../table/EnterCommissionsTableRow';
import { IHeaderMeta, IEnterCommissionsRow } from '../EnterCommissions';
import { IOrder } from '../../../../data/ordersMock';
import { useEffect, useState } from 'react';
import { formatCellData } from '../../../../functions/formatCellData';
import { CustomTableContainer } from '../../../shared/CustomTableContainer';

export function ErrorCommissionModal(props: IErrorCommissionModalProps) {
  const [searchText, setSearchText] = useState(props.errorValues?.searchText);

  useEffect(() => {
    setSearchText(props.errorValues?.searchText);
    console.log(props.errorValues?.searchText);
  }, [props.errorValues?.searchText]);

  const handleClick = (newSearchText: string) => {
    setSearchText(newSearchText);
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
      <Stack mb={2} gap={1}>
        <CustomTableContainer header={<Alert color='error'>Error: {props.errorValues?.reason}</Alert>}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: 'secondary.main' }}>
              {props.headers.map((header, index) => (
                <TableCell
                  key={index}
                  align={header.align || 'left'}
                  sx={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              <TableRow>
                {props.headers.map((header, index) => {
                  const value = props.row[header.id].value;

                  return (
                    <TableCell
                      key={index}
                      align={header.align || 'left'}
                      onClick={() => handleClick(value.toString())}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography>{formatCellData(header.type, value)}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CustomTableContainer>
        <Typography variant='caption'>Note: Click on values to populate search bar</Typography>
      </Stack>
      <OrdersTable initialSearchText={searchText} clickable onConfirmMatch={props.onConfirmMatch} />
    </CustomModal>
  );
}

interface IErrorCommissionModalProps {
  open: boolean;
  handleModalClose: () => void;
  row: IEnterCommissionsRow;
  headers: IHeaderMeta[];
  errorValues?: IEnterCommissionsTableRowError;
  onConfirmMatch: (order: IOrder) => void;
}
