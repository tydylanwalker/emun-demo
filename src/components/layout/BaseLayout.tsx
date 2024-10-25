import * as React from 'react';
import Box from '@mui/material/Box';
import { TopBar } from './topbar/Topbar';
import { Sidebar } from './sidebar/Sidebar';
import { DrawerHeader } from './DrawerHeader';
import { useState } from 'react';

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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}

interface IBaseLayoutProps {
    children?: React.ReactNode;
}