import { Stack, Typography } from '@mui/material';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  return (
    <Stack borderRadius={5} width={props.width} bgcolor={props.color} color={'white'} sx={{ background: 'linear-gradient(to top, #4B53D9, #6967CA, #B094AE)', padding: '20px', transition: 'transform 0.2s'}}>
      <Typography fontSize='1.2rem' fontWeight='bold' p={1}>
        {props.header}
      </Typography>
      <Typography fontSize='2rem' fontWeight='bold' p={1} color={'white'}>
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
