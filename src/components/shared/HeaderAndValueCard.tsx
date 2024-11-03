import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { isModeDark } from '../../store/slices/themeSlice';

export function HeaderAndValueCard(props: IHeaderAndValueCardProps) {
  return (
    <Stack
      borderRadius={5}
      width={props.width || '12.5rem'}
      sx={{
        padding: '1rem',
        boxShadow: useAppSelector(isModeDark) ? '-2px 2px 16px rgba(50, 50, 50, 1)' : '0px 2px 16px rgba(0, 0, 0, 0.4)',
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
