import { Stack, Typography, useMediaQuery } from '@mui/material';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  // const styles = {
  //   container: {
  //     backgroundColor: '#141414',
  //     borderRadius: '12px',
  //     boxShadow: 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   }
  // };

  return (
    <Stack
      borderRadius={5}
      width={props.width}
      sx={{
        padding: '1.25rem',
        boxShadow: useMediaQuery('(prefers-color-scheme: dark)')
          ? '0px 2px 20px rgba(125, 125, 125, 0)'
          : '0px 2px 16px rgba(0, 0, 0, 0.4)',
        bgcolor: 'secondary.main',
      }}
    >
      <Typography fontSize='1.2rem' fontWeight='bold' p={1}>
        {props.header}
      </Typography>
      <Typography fontSize='2rem' fontWeight='bold' p={1} color={props.color}>
        {props.value}
      </Typography>
    </Stack>
  );
}

interface IHeaderAndValueCardProps {
  header: string;
  value: string;
  color?: string;
  width?: string;
}
