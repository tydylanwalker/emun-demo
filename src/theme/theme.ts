// theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define palettes for light and dark mode
const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#1976d2',
  },
  secondary: {
    main: '#F7F7F7',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#90caf9'
  },
  secondary: {
    main: '#1f1f1f',
  },
};

// Component overrides
const componentOverrides: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: ' 0px 8px 30px rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem',
      },
    },
  },
};

// Function to get the theme based on the mode
export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components: componentOverrides
  });

  