/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Typography, Box, LinearProgress, Divider } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { formatCurrency } from '../../functions/formatCurrency';
import { IOrder } from '../../data/interfaces/IOrder';
import HeaderAndValueLabel from './HeaderAndValueLabel';

export function getMonthsAgo(months: number): Date {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setDate(1);
  lastMonth.setHours(0, 0, 0, 0);
  lastMonth.setMonth(today.getMonth() - months);

  return lastMonth;
}

export default function MonthlyOrdersOverview(props: MonthlyOrdersOverviewProps) {
  const fromMonth = new Date(getMonthsAgo(props.monthsAgoItr));
  const toMonthIndex = props.yearly ? -1 : props.monthsAgoItr - 1;
  const toMonth = new Date(getMonthsAgo(toMonthIndex));

  const thisMonthsOrders = props.orders.filter(
    (order) => new Date(order.orderDate ?? '') >= fromMonth && new Date(order.orderDate ?? '') < toMonth
  );

  const totalSales = thisMonthsOrders.reduce((sum, order) => sum + (order.amount ?? 0.0), 0);

  return (
    <Box sx={{ padding: '1em', borderRadius: 3, bgcolor: 'secondary.main', flex: props.yearly ? 1.5 : 1 }}>
      <Stack spacing={{ xs: 10, sm: 0 }} direction='column' useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Typography fontSize={'1.6vw'} fontWeight={800}>
          {props.yearly ? 'Past Year' : fromMonth.toLocaleString('default', { month: 'long' })}
        </Typography>
        <Stack spacing={{ sm: 1 }} direction='row' alignItems={'center'} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <HeaderAndValueLabel value={thisMonthsOrders.length.toString()} label={'ORDERS'}></HeaderAndValueLabel>
          <HeaderAndValueLabel value={'$' + formatCurrency(totalSales)} label={'SALES'}></HeaderAndValueLabel>
        </Stack>
      </Stack>
    </Box>
  );
}

interface MonthlyOrdersOverviewProps {
  monthsAgoItr: number;
  orders: IOrder[];
  yearly?: boolean;
}
