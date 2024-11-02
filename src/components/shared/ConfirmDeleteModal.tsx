import { CloseRounded } from '@mui/icons-material';
import { Modal, Stack, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '30vw',
  maxHeight: '90vh',
  bgcolor: 'secondary.main',
  borderRadius: 5,
  boxShadow: 24,
};

export function ConfirmDeleteModal(props: IConfirmDeleteModalProps) {
  return (
    <Dialog open={props.isOpen} onClose={props.onRequestClose}>
      <Typography
        fontSize='1.25rem'
        textTransform='uppercase'
        fontWeight='bold'
        sx={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}
      >
        Confirm Delete
      </Typography>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this commissions draft?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onRequestClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IConfirmDeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}
