import { Box, CircularProgress, Fade } from '@mui/material';
import EmunLogo from './EmunLogo';

export function SplashScreen() {
  return (
    <Fade in timeout={1000} unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightslategray',
          color: 'white',
          zIndex: 9999,
        }}
      >
        <EmunLogo />
        <CircularProgress color='inherit' />
      </Box>
    </Fade>
  );
}
