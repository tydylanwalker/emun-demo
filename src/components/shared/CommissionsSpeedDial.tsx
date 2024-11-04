import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Backdrop, Stack } from '@mui/material';
import { useState } from 'react';
import { NoteAddRounded, ExposureRounded, CreditCardRounded, GroupRounded } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import {
  setAddAdjustmentOpen,
  setAddCreditOpen,
  setAddCustomersOpen,
  setAddDirectOrderOpen,
} from '../../store/slices/enterCommissionsSlice';

export function CommissionsSpeedDial() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <NoteAddRounded fontSize='small' />,
      name: 'Create Direct Order',
      action: () => dispatch(setAddDirectOrderOpen(true)),
    },
    {
      icon: <ExposureRounded fontSize='small' />,
      name: 'Adjustment',
      action: () => dispatch(setAddAdjustmentOpen(true)),
    },
    { icon: <CreditCardRounded fontSize='small' />, name: 'Credit', action: () => dispatch(setAddCreditOpen(true)) },
    { icon: <GroupRounded fontSize='small' />, name: 'Customers', action: () => dispatch(setAddCustomersOpen(true)) },
  ];

  return (
    <Stack height='3rem' justifyContent='center'>
      <>
        <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 1000 }} />
        <SpeedDial
          ariaLabel='speed-dial'
          icon={<SpeedDialIcon />}
          direction='right'
          sx={{
            zIndex: 1001,
            position: 'absolute',
            '& .MuiFab-root': {
              width: '2.5rem',
              height: '2.5rem',
            },
          }}
          onOpen={handleOpen}
          onClose={handleClose}
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={action.action}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: '1rem',
                  },
                },
              }}
              sx={{
                bgcolor: 'secondary.main',
                boxShadow: '-2px 2px 16px rgba(50, 50, 50, 1)',
              }}
            />
          ))}
        </SpeedDial>
      </>
    </Stack>
  );
}
