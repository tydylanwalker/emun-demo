import { TableContainer, Paper, Stack, TableContainerProps, TablePagination } from '@mui/material';

export function CustomTableContainer(props: ICustomTableContainerProps & TableContainerProps) {
  const headersShown = props.header || props.taskBar;

  return (
    <Paper
      sx={{
        height: props.height || '100%',
        width: props.width || 'inherit',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: (theme) => theme.shadows[5],
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
      <Stack>
        {props.pagination && (
          <TablePagination
            rowsPerPageOptions={props.pagination.rowsPerPageOptions || [5, 25, 50, 100]}
            component='div'
            count={props.pagination.count}
            rowsPerPage={props.pagination.rowsPerPage}
            page={props.pagination.page}
            onPageChange={props.pagination.onPageChange}
            onRowsPerPageChange={props.pagination.onRowsPerPageChange}
          />
        )}
      </Stack>
    </Paper>
  );
}

interface ICustomTableContainerProps {
  children?: JSX.Element;
  taskBar?: JSX.Element;
  header?: JSX.Element;
  height?: string;
  width?: string;
  pagination?: {
    rowsPerPageOptions?: number[];
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  };
}
