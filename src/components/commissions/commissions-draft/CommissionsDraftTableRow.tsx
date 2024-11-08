import { Stack, TableCell, TableRow, Typography, Button, IconButton } from '@mui/material';
import { formatCellData } from '../../../functions/formatCellData';
import { DeleteOutlineRounded, EditRounded, SafetyDividerRounded } from '@mui/icons-material';
import { useState } from 'react';
import { CustomModal } from '../../shared/CustomModal';
import { EditCommissionDraft } from './forms/EditCommissionDraft';
import { IInvoice } from '../../../data/interfaces/IInvoice';
import { ICommissionDraftHeader } from './headers';
import { SplitCommissionsModal } from './forms/SplitCommissionsModal';

export function CommissionsDraftTableRow(props: ICommissionsDraftTableRowProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [splitCommissionModalOpen, setSplitCommissionModalOpen] = useState(false);

  const saveCommission = (commission: IInvoice) => {
    setEditModalOpen(false);
    props.saveCommission(commission);
  };

  const handleDelete = (row: IInvoice) => {
    props.handleDeleteRow(row);
    setDeleteModalOpen(false);
  };

  return (
    <TableRow
      sx={{ bgcolor: props.color, outline: editModalOpen || deleteModalOpen ? '0.2rem solid lightblue' : 'inherit' }}
    >
      <TableCell>
        <Stack direction='row' gap={2}>
          <IconButton color='error' onClick={() => setDeleteModalOpen(true)}>
            <DeleteOutlineRounded />
          </IconButton>
          <IconButton color='inherit' onClick={() => setEditModalOpen(true)}>
            <EditRounded />
          </IconButton>
        </Stack>
      </TableCell>
      {props.headers.map((header, index) => (
        <TableCell key={index}>
          <Stack justifyContent={header.align} direction='row' gap={2}>
            <Typography>{formatCellData(header.type, props.row[header.id])}</Typography>
            {header.id === 'repCommissionPercentage' ? (
              <SafetyDividerRounded onClick={() => setSplitCommissionModalOpen(true)} sx={{ cursor: 'pointer' }} />
            ) : null}
          </Stack>
        </TableCell>
      ))}
      <CustomModal open={deleteModalOpen} closeModal={() => setDeleteModalOpen(false)} header='Confirm Delete'>
        <Stack gap={3}>
          <Typography>Are you sure you want to delete this invoice from the commission draft?</Typography>
          <Stack justifyContent='flex-end' direction='row' gap={2}>
            <Button variant='outlined' onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color='error' variant='outlined' onClick={() => handleDelete(props.row)}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
      <EditCommissionDraft
        open={editModalOpen}
        closeModal={(open: boolean) => setEditModalOpen(open)}
        commission={props.row}
        saveCommission={saveCommission}
        repOptions={props.repOptions}
      />
      <SplitCommissionsModal
        open={splitCommissionModalOpen}
        closeModal={() => setSplitCommissionModalOpen(false)}
        commission={props.row}
        saveCommission={saveCommission}
        repOptions={props.repOptions}
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
  repOptions: string[];
}
