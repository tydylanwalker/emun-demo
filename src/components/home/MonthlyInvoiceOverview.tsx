/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import { Stack, Typography, Box, LinearProgress, Divider } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { formatCurrency } from '../../functions/formatCurrency';
import { IInvoice } from '../../data/interfaces/IInvoice';
import { getMonthsAgo } from './MonthlyOrdersOverview';

export default function MonthlyInvoiceOverview(props: MonthlyInvoiceOverviewProps) {
  let currentMonth = new Date(getMonthsAgo(props.monthsAgoItr));
  let toMonth = new Date(getMonthsAgo(props.monthsAgoItr - 1));

  const thisMonthInvoices = props.invoices.filter(
    (invoice) => new Date(invoice.orderDate ?? '') >= currentMonth && new Date(invoice.orderDate ?? '') < toMonth
  );
  const thisMonthClosedInvoices = thisMonthInvoices.filter((invoice) => invoice.status === 'Closed');

  const totalCommAmount = thisMonthInvoices.reduce((sum, invoice) => sum + (invoice.commissionAmount ?? 0.0), 0);
  const totalCommAmountPaid = thisMonthClosedInvoices.reduce(
    (sum, invoice) => sum + (invoice.commissionAmount ?? 0.0),
    0
  );

  return (
    <Card sx={{ borderRadius: 3, bgcolor: 'secondary.main', flex: 1 }}>
      <CardContent>
        <Stack spacing={{ xs: 1, sm: 2 }} direction='column' useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Typography fontSize={22} fontWeight={800}>
            {currentMonth.toLocaleString('default', { month: 'long' })}
          </Typography>

          <Stack spacing={{ sm: 1 }} direction='row' alignItems={'center'} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Stack spacing={{ sm: 1 }} flex={1} alignItems={'center'}>
              <Typography fontSize={30} fontWeight={800}>
                {thisMonthClosedInvoices.length + '/' + thisMonthInvoices.length}
              </Typography>
              <Typography fontSize={18} fontWeight={200} color='text.secondary'>
                CLOSED
              </Typography>
            </Stack>
            <Stack spacing={{ sm: 1 }} flex={1} alignItems={'center'}>
              <Typography fontSize={30} fontWeight={800}>
                {'$' + formatCurrency(totalCommAmount)}
              </Typography>
              <Typography fontSize={18} fontWeight={200} color='text.secondary'>
                OWED
              </Typography>
            </Stack>
            <Stack spacing={{ sm: 1 }} flex={1} alignItems={'center'}>
              <Typography fontSize={30} fontWeight={800}>
                {'$' + formatCurrency(totalCommAmountPaid)}
              </Typography>
              <Typography fontSize={18} fontWeight={200} color='text.secondary'>
                PAID
              </Typography>
            </Stack>
          </Stack>
          <Divider></Divider>
          <Typography fontSize={17} fontWeight={600} color='text.secondary'>
            Statements
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant='determinate'
                value={(totalCommAmountPaid / totalCommAmount) * 100}
                sx={{ height: 15, borderRadius: 1 }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                sx={{ color: 'text.secondary' }}
              >{`${Math.round((totalCommAmountPaid / totalCommAmount) * 100)}%`}</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

interface MonthlyInvoiceOverviewProps {
  monthsAgoItr: number;
  invoices: IInvoice[];
}
