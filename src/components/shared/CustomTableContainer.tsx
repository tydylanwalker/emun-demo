import { TableContainer, Paper, Stack, TableContainerProps } from '@mui/material';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { isModeDark } from '../../store/slices/themeSlice';

export function CustomTableContainer(props: ICustomTableContainerProps & TableContainerProps) {
  const headersShown = props.header || props.taskBar;

  return (
    <Paper
      sx={{
        height: props.height || '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: useAppSelector(isModeDark) ? '-2px 2px 16px rgba(50, 50, 50, 1)' : '0px 2px 16px rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      {headersShown && (
        <Stack position='sticky' top={0} left={0} width='100%' zIndex={1}>
          {props.header}
          {props.taskBar}
        </Stack>
      )}
      <TableContainer
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {props.children}
      </TableContainer>
    </Paper>
  );
}

interface ICustomTableContainerProps {
  children?: JSX.Element;
  taskBar?: JSX.Element;
  header?: JSX.Element;
  height?: string;
}
