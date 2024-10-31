import { CloseRounded } from '@mui/icons-material';
import { Modal, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

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

export function CustomModal(props: ICustomModalProps) {
  return (
    <Modal open={props.open} onClose={props.closeModal}>
      <Stack
        sx={{ ...modalStyles, width: props.width || 'inherit', height: props.height || 'inherit', overflow: 'hidden' }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          p={1.5}
          px={3}
          position='absolute'
          top={0}
          left={0}
          width={1}
          bgcolor='secondary.main'
          zIndex={10000}
        >
          <Typography fontSize='1.25rem' textTransform='uppercase' fontWeight='bold'>
            {props.header}
          </Typography>
          <CloseRounded onClick={props.closeModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack mt={3} p={4} flexGrow={1} height={1} sx={{ overflow: props.nonScrollable ? 'hidden' : 'auto' }}>
          {props.children}
        </Stack>
      </Stack>
    </Modal>
  );
}

interface ICustomModalProps {
  open: boolean;
  closeModal: () => void;
  children?: ReactNode;
  header?: string;
  width?: string;
  height?: string;
  nonScrollable?: boolean;
}
