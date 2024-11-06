/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Typography, Box, LinearProgress, Divider } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { formatCurrency } from '../../functions/formatCurrency';
import { IOrder } from '../../data/interfaces/IOrder';

export function getMonthsAgo(months: number): Date {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setDate(1);
  lastMonth.setHours(0, 0, 0, 0);
  lastMonth.setMonth(today.getMonth() - months);

  return lastMonth;
}

export default function MonthlyOrdersOverview(props: MonthlyOrdersOverviewProps) {
  let fromMonth = new Date(getMonthsAgo(props.monthsAgoItr));
  let toMonthIndex = props.yearly ? -1 : props.monthsAgoItr - 1;
  let toMonth = new Date(getMonthsAgo(toMonthIndex));

  const thisMonthsOrders = props.orders.filter(
    (order) => new Date(order.orderDate ?? '') >= fromMonth && new Date(order.orderDate ?? '') < toMonth
  );

  const totalSales = thisMonthsOrders.reduce((sum, order) => sum + (order.amount ?? 0.0), 0);

  return (
    <Card sx={{ borderRadius: 3, bgcolor: 'secondary.main', flex: props.yearly ? 1.5 : 1 }}>
      <CardContent>
        <Stack spacing={{ xs: 1, sm: 2 }} direction='column' useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Typography fontSize={22} fontWeight={800}>
            {props.yearly ? 'Past Year' : fromMonth.toLocaleString('default', { month: 'long' })}
          </Typography>

          <Stack spacing={{ sm: 1 }} direction='row' alignItems={'center'} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Stack spacing={{ sm: 1 }} flex={1} alignItems={'center'}>
              <Typography fontSize={30} fontWeight={800}>
                {thisMonthsOrders.length}
              </Typography>
              <Typography fontSize={18} fontWeight={200} color='text.secondary'>
                TOTAL ORDERS
              </Typography>
            </Stack>
            <Stack spacing={{ sm: 1 }} flex={1} alignItems={'center'}>
              <Typography fontSize={30} fontWeight={800}>
                {'$' + formatCurrency(totalSales)}
              </Typography>
              <Typography fontSize={18} fontWeight={200} color='text.secondary'>
                TOTAL SALES
              </Typography>
            </Stack>
          </Stack>
          <Divider></Divider>
          <Typography fontSize={17} fontWeight={600} color='text.secondary'>
            Statements
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

interface MonthlyOrdersOverviewProps {
  monthsAgoItr: number;
  orders: IOrder[];
  yearly?: boolean;
}
