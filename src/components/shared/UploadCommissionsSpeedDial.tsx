import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Backdrop, Stack } from '@mui/material';
import { CreditCardRounded, ExposureRounded, GroupRounded, NoteAddRounded } from '@mui/icons-material';
import { useState } from 'react';

const actions = [
  { icon: <NoteAddRounded fontSize='large' />, name: 'Create Direct Order' },
  { icon: <ExposureRounded fontSize='large' />, name: 'Adjustment' },
  { icon: <CreditCardRounded fontSize='large' />, name: 'Credit' },
  { icon: <GroupRounded fontSize='large' />, name: 'Customers' },
];

export function UploadCommissionsSpeedDial(props: IUploadCommissionsSpeedDialProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack py={2} height='2.5rem'>
      {props.show && (
        <>
          <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 1000 }} />
          <SpeedDial
            ariaLabel='speed-dial'
            icon={<SpeedDialIcon />}
            direction='right'
            sx={{ position: 'absolute', zIndex: 1001 }}
            onOpen={handleOpen}
            onClose={handleClose}
          >
            {actions.map((action) => (
              <SpeedDialAction
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
                  border: 1,
                  p: 3,
                }}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </Stack>
  );
}

interface IUploadCommissionsSpeedDialProps {
  show?: boolean;
}
