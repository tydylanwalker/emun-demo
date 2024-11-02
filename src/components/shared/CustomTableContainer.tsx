import { TableContainer, Paper, Stack, TableContainerProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export function CustomTableContainer(props: ICustomTableContainerProps & TableContainerProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [props.header, props.taskBar]);

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <Stack ref={headerRef} position='sticky' top={0} left={0} width='100%' zIndex={1} bgcolor='background.paper'>
        {props.header}
        {props.taskBar}
      </Stack>
      <TableContainer
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          maxHeight: `calc(100% - ${headerHeight}px)`,
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
}
