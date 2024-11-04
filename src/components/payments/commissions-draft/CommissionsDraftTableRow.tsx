import { Stack, TableCell, TableRow, Typography, Button, IconButton } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { ICommissionDraftHeader } from './CommissionsDraftTable';
import { DeleteOutlineRounded, EditRounded, SafetyDividerRounded } from '@mui/icons-material';
import { useState } from 'react';
import { CustomModal } from '../../shared/CustomModal';
import { EditCommissionDraft } from './forms/EditCommissionDraft';
import { IInvoice } from '../../../data/interfaces/IInvoice';

export function CommissionsDraftTableRow(props: ICommissionsDraftTableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  const saveCommission = (commission: IInvoice) => {
    setEditDrawerOpen(false);
    props.saveCommission(commission);
    // setCommissions([...checkOptions, checkToSave.number]);
    // setCheck(checkToSave.number || '');
  };
  // ! LT Im confused what your doing here
  // const [totalCommissionAmount, setTotalCommissionAmount] = useState(0);
  // const [repCommissionAmount, setRepCommissionAmount] = useState(0);

  // const commissionTotal = parseFloat(props.row['commissionAmount'].toString()) || 0.0;
  // const repCommissionPercentage = parseFloat(props.row['repCommissionPercentage'].toString()) || 0.0;
  // const invoiceAmount = parseFloat(props.row['invoiceAmount'].toString()) || 0.0;
  // const vendorCommission = parseFloat(props.row['vendorCommission'].toString()) || 0.0;

  // useEffect(() => {
  //   setRepCommissionAmount((commissionTotal * repCommissionPercentage) / 100);
  //   setTotalCommissionAmount((invoiceAmount * vendorCommission) / 100);
  // }, [commissionTotal, invoiceAmount, props.row, repCommissionPercentage, vendorCommission]);

  const handleDelete = (row: IInvoice) => {
    props.handleDeleteRow(row);
    setIsModalOpen(false);
  };

  return (
    <TableRow sx={{ bgcolor: props.color }}>
      <TableCell>
        <Stack direction='row' gap={2}>
          <IconButton color='error' onClick={() => setIsModalOpen(true)}>
            <DeleteOutlineRounded />
          </IconButton>
          <IconButton color='inherit' onClick={() => setEditDrawerOpen(true)}>
            <EditRounded />
          </IconButton>
        </Stack>
      </TableCell>
      {props.headers.map((header, index) => (
        <TableCell key={index}>
          <Stack justifyContent={header.align} direction='row' gap={2}>
            <Typography>
              {formatCellData(header.type, props.row[header.id])}
              {/* LT im confused wut you doing here */}
              {/* {header.id === 'repCommissionAmount'
                ? formatCellData(header.type, repCommissionAmount)
                : header.id === 'commissionAmount'
                  ? formatCellData(header.type, totalCommissionAmount)
                  : formatCellData(header.type, props.row[header.id])} */}
            </Typography>
            {header.id === 'repCommissionPercentage' ? (
              <SafetyDividerRounded onClick={() => alert('Open Split Commissions Modal')} sx={{ cursor: 'pointer' }} />
            ) : null}
          </Stack>
        </TableCell>
      ))}
      <CustomModal open={isModalOpen} closeModal={() => setIsModalOpen(false)} header='Confirm Delete'>
        <Stack gap={3}>
          <Typography>Are you sure you want to delete this invoice from the commission draft?</Typography>
          <Stack justifyContent='flex-end' direction='row' gap={2}>
            <Button variant='outlined' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color='error' variant='outlined' onClick={() => handleDelete(props.row)}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
      <EditCommissionDraft
        open={editDrawerOpen}
        toggleDrawer={(open: boolean) => setEditDrawerOpen(open)}
        commission={props.row}
        saveCommission={saveCommission}
      />
    </TableRow>
  );
}

interface ICommissionsDraftTableRowProps {
  color?: string;
  row: IInvoice;
  headers: ICommissionDraftHeader[];
  handleDeleteRow: (row: IInvoice) => void;
  saveCommission: (row: IInvoice) => void;
}
