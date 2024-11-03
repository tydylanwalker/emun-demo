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

export function CommissionsSpeedDial(props: IEnterCommissionsSpeedDialProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack height='3rem' justifyContent='center'>
      {props.show && (
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
                  bgcolor: 'secondary.main',
                  boxShadow: '-2px 2px 16px rgba(50, 50, 50, 1)',
                }}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </Stack>
  );
}

interface IEnterCommissionsSpeedDialProps {
  show?: boolean;
  actions: ISpeedDialAction[];
}
