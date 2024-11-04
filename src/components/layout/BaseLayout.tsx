import * as React from 'react';
import Box from '@mui/material/Box';
import { TopBar } from './topbar/Topbar';
import { Sidebar } from './sidebar/Sidebar';
import { DrawerHeader } from './DrawerHeader';
import { useState } from 'react';
import { topbarHeight } from '../../data/constants';
import { Stack } from '@mui/material';

export function BaseLayout(props: IBaseLayoutProps): JSX.Element {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', maxWidth: '100%' }}>
      <TopBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open} />
      <Box component='main' sx={{ overflow: 'hidden', flexGrow: 1 }}>
        <DrawerHeader />
        <Stack
          sx={{
            p: 2,
            height: `calc(100vh - ${topbarHeight}px - 16px)`,
          }}
        >
          {props.children}
        </Stack>
      </Box>
    </Box>
  );
}

interface IBaseLayoutProps {
  children?: React.ReactNode;
}
