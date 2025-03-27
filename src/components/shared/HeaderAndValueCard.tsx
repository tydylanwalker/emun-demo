import { Stack, Typography } from '@mui/material';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  return (
    <Stack
      borderRadius={5}
      width={props.width || '12.5rem'}
      sx={{
        padding: '1rem',
        boxShadow: (theme) => theme.shadows[5],
        bgcolor: 'secondary.main',
      }}
    >
      <Typography fontSize='1rem' fontWeight='bold' p={1}>
        {props.header}
      </Typography>
      <Typography fontSize='1.25' fontWeight='bold' p={1} color={props.color}>
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
