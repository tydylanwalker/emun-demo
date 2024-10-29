import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard(props: DashboardCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
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
