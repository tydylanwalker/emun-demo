import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { formatCurrency } from '../../functions/formatCurrency';

export default function HeaderAndValueLabel(props: HeaderAndValueLabelProps) {
  return (
    <Stack spacing={{ sm: 0 }} flex={1} alignItems={'center'}>
      <Typography fontSize={'2vw'} fontWeight={800}>
        {props.value}
      </Typography>
      <Typography fontSize={'1.2vw'} fontWeight={200} color='text.secondary'>
        {props.label}
      </Typography>
    </Stack>
  );
}

interface HeaderAndValueLabelProps {
  value: string;
  label: string;
}
