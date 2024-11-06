import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { isModeDark } from '../../store/slices/themeSlice';

export default function BasicCard(props: DashboardCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        minWidth: 275,
        padding: '1rem',
        boxShadow: useAppSelector(isModeDark) ? '-2px 2px 16px rgba(50, 50, 50, 0)' : '0px 2px 16px rgba(0, 0, 0, 0.4)',
        bgcolor: 'secondary.main',
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {props.title}
        </Typography>
        <Typography variant='h5' component='div'>
          {props.value}
        </Typography>
        {props.notes && <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{props.notes}</Typography>}
      </CardContent>
    </Card>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  notes: string | undefined;
}
