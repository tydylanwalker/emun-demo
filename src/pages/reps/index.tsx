/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import { Stack, Typography, Box, LinearProgress, Divider, CardContent, Card } from '@mui/material';
import * as React from 'react';
import { NextPage } from 'next';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { getInvoices, getOrders } from '../../store/slices/dataSlice';
import 'chart.js/auto';
import MonthlyInvoiceOverview from '../../components/home/MonthlyInvoiceOverview';
import SalesByRepChart from '../../components/home/SalesByRepChart';
import SalesByMonthChart from '../../components/home/SalesByMonthChart';

const HomePage: NextPage = () => {
  const orders = useAppSelector(getOrders);
  const invoices = useAppSelector(getInvoices);

  return (
    <>
      <Stack spacing={{ xs: 1, sm: 2 }} overflow={'auto'}>
        <Typography fontSize={30} fontWeight={200} color='text.secondary'>
          Reps
        </Typography>
      </Stack>
    </>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
