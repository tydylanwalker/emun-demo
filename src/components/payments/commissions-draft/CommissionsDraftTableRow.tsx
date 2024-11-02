import { Stack, TableCell, TableRow, Typography, Button } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { ICommissionDraft } from '../../../data/commissions';
import { ICommissionDraftHeader } from './CommissionsDraftTable';
import { SafetyDividerRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ConfirmDeleteModal } from '../../shared/ConfirmDeleteModal';

export function CommissionsDraftTableRow(props: ICommissionsDraftTableRowProps) {
  const [totalCommissionAmount, setTotalCommissionAmount] = useState(0);
  const [repCommissionAmount, setRepCommissionAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let commissionId = props.headers.find((header) => header.id === 'commissionAmount')?.id;
  let commissionTotal = commissionId ? parseFloat(props.row[commissionId].toString()) : 0.0;

  let repCommissionRateId = props.headers.find((header) => header.id === 'repCommissionRate')?.id;
  let repCommissionRate = repCommissionRateId ? parseFloat(props.row[repCommissionRateId].toString()) : 0.0;

  let invoiceAmountId = props.headers.find((header) => header.id === 'invoiceAmount')?.id;
  let invoiceAmount = invoiceAmountId ? parseFloat(props.row[invoiceAmountId].toString()) : 0.0;

  let vendorCommissionId = props.headers.find((header) => header.id === 'vendorCommission')?.id;
  let vendorCommission = vendorCommissionId ? parseFloat(props.row[vendorCommissionId].toString()) : 0.0;

  useEffect(() => {
    setRepCommissionAmount((commissionTotal * repCommissionRate) / 100);
    setTotalCommissionAmount((invoiceAmount * vendorCommission) / 100);
  }, [props.row]);

  const handleDelete = (row: ICommissionDraft) => {
    props.handleDeleteRow(row);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <TableRow sx={{ bgcolor: props.color, whiteSpace: 'nowrap', alignItems: 'center' }}>
      <TableCell align={'center'}>
        <Stack direction='row' gap={1} alignItems='center' justifyContent='space-around'>
          <Button variant='contained' color='error' onClick={() => setIsModalOpen(true)}>
            Delete Item
          </Button>
        </Stack>
      </TableCell>
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
          <Stack direction='row' gap={1} alignItems='center' justifyContent='space-around'>
            <Typography alignItems='center'>
              {header.id === 'repCommissionAmount'
                ? formatCellData(header.type, repCommissionAmount)
                : header.id === 'commissionAmount'
                  ? formatCellData(header.type, totalCommissionAmount)
                  : formatCellData(header.type, props.row[header.id as keyof ICommissionDraft])}
            </Typography>
            {header.id === 'repCommissionRate' ? (
              <SafetyDividerRounded onClick={() => alert('Open Split Commissions Modal')} sx={{ cursor: 'pointer' }} />
            ) : null}
          </Stack>
        </TableCell>
      ))}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(props.row)}
      />
    </TableRow>
  );
}

interface ICommissionsDraftTableRowProps {
  color?: string;
  row: ICommissionDraft;
  headers: ICommissionDraftHeader[];
  handleDeleteRow: (row: ICommissionDraft) => void;
}
