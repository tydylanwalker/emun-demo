import Head from 'next/head';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, CssBaseline, PaletteMode, useMediaQuery } from '@mui/material';
import { useMemo, useEffect } from 'react';
import { getTheme } from '../theme/theme';
import { GlobalStyles } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/ReduxHooks';
import { getMode, setMode } from '../store/slices/themeSlice';

dayjs.extend(customParseFormat);

const GlobalScrollbarStyles = () => (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'secondary.dark',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.5) transparent',
      },
    }}
  />
);

export function AppWrapper(props: IAppWrapper) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(getMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const preferredMode: PaletteMode = prefersDarkMode ? 'dark' : 'light';
    dispatch(setMode(preferredMode));
  }, [prefersDarkMode, dispatch]);

  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalScrollbarStyles />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>EMUN Commission Portal</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <CssBaseline />
        {props.children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

interface IAppWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
