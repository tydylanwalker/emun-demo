import { Stack, Typography } from '@mui/material';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  return (
    <Stack borderRadius={5} width={props.width} bgcolor={props.color} border={1}>
      <Typography fontSize='1.2rem' p={1} borderBottom={1}>
        {props.header}
      </Typography>
      <Typography fontSize='1rem' fontWeight='bold' p={1}>
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
