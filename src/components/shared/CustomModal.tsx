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
  bgcolor: '#171717',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export function CustomModal(props: ICustomModalProps) {
  return (
    <Modal open={props.open} onClose={props.closeModal}>
      <Stack sx={{ ...modalStyles, width: props.width || 'inherit', height: props.height || 'inherit', overflowY: 'auto' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          p={1.5}
          px={5}
          position='absolute'
          top={0}
          left={0}
          width={1}
        >
          <Typography fontSize='1.25rem' textTransform='uppercase' fontWeight='bold'>
            {props.header}
          </Typography>
          <CloseRounded onClick={props.closeModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack mt={3} flexGrow={1}>
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
}
