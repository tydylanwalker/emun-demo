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
        {invoices.length > 0 && (
          <>
            <Typography fontSize={30} fontWeight={200} color='text.secondary'>
              Commissions
            </Typography>
            <Divider></Divider>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction='row'
              sx={{
                display: 'flex', // Enable Flexbox
                width: '100%', // Make sure the container spans full width
              }}
            >
              <MonthlyInvoiceOverview monthsAgoItr={0} invoices={invoices}></MonthlyInvoiceOverview>
              <MonthlyInvoiceOverview monthsAgoItr={1} invoices={invoices}></MonthlyInvoiceOverview>
            </Stack>
          </>
        )}

        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction='row'
          sx={{
            display: 'flex', // Enable Flexbox
            width: '100%', // Make sure the container spans full width
          }}
        >
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              width: '50%',
              display: 'flex', // Enable Flexbox
            }}
          >
            <Typography fontSize={30} fontWeight={200} color='text.secondary'>
              Top Reps
            </Typography>
            <Divider></Divider>
            <SalesByRepChart orders={orders}></SalesByRepChart>
          </Stack>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              width: '50%',
              display: 'flex', // Enable Flexbox
            }}
          >
            <Typography fontSize={30} fontWeight={200} color='text.secondary'>
              Orders
            </Typography>
            <Divider></Divider>
            <SalesByMonthChart orders={orders}></SalesByMonthChart>
          </Stack>

          {/* <Stack
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              width: '30%',
              display: 'flex', // Enable Flexbox
            }}
          >
            <Typography fontSize={30} fontWeight={200} color='text.secondary'>
              Orders
            </Typography>
            <Divider></Divider>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              sx={{
                display: 'flex', // Enable Flexbox
              }}
            >
              <MonthlyOrdersOverview monthsAgoItr={0} orders={orders}></MonthlyOrdersOverview>
              <MonthlyOrdersOverview monthsAgoItr={1} orders={orders}></MonthlyOrdersOverview>
              <MonthlyOrdersOverview monthsAgoItr={12} orders={orders} yearly={true}></MonthlyOrdersOverview>
            </Stack> 
          </Stack>*/}
        </Stack>
      </Stack>
    </>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
