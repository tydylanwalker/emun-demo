import { Stack } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { OrdersTable } from '../../../components/orders/OrdersTable';

const ViewOrdersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>

      {/* <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5' gap={2}>
              View Orders
            </Typography>
            <BasicSelect vendor={vendor} vendorSelected={vendorSelected}></BasicSelect>
          </Stack> */}
      <Stack height={1}>
        <OrdersTable />
      </Stack>
    </>
  );
};

ViewOrdersPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewOrdersPage;
