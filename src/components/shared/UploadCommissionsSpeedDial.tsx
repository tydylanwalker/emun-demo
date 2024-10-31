import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Backdrop, Stack } from '@mui/material';
import { useState } from 'react';

interface ISpeedDialAction {
  icon: JSX.Element;
  name: string;
  action: () => void;
}

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
            {props.actions.map((action) => (
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
  actions: ISpeedDialAction[];
}
