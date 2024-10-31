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
    main: '#9c27b0',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#90caf9'
  },
  secondary: {
    main: '#f48fb1',
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
};

// Function to get the theme based on the mode
export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components: componentOverrides
  });

  