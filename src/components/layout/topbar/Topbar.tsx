import { Toolbar, IconButton, Typography, Box, styled, useMediaQuery } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { topbarHeight, sidebarWidth } from '../../../data/constants';
import EmunLogo from '../../EmunLogo';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  height: topbarHeight,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export function TopBar(props: ITopBarProps) {
  const { open, handleDrawerOpen } = props;
  return (
    <AppBar
      position='fixed'
      open={props.open}
      sx={
        useMediaQuery('(prefers-color-scheme: light)')
          ? {
              background: 'linear-gradient(to right, #4B53D9, #6967CA, #B094AE)',
            }
          : {}
      }
    >
      <Toolbar sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <EmunLogo />
        <Box flexGrow={1} />
        <Typography variant='body2' noWrap>
          ACCOUNT
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

interface ITopBarProps {
  open?: boolean;
  handleDrawerOpen: () => void;
}
