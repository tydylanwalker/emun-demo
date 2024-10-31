import { Stack, Typography } from '@mui/material';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  return (
    <Stack
      borderRadius={5}
      width={props.width}
      sx={{
        padding: '1.25rem',
        boxShadow: ' 0px 8px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography fontSize='1.2rem' fontWeight='bold' p={1}>
        {props.header}
      </Typography>
      <Typography fontSize='2rem' fontWeight='bold' p={1}>
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
