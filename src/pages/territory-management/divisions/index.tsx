import { Stack } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { OrdersTable } from '../../../components/orders/OrdersTable';
import dynamic from 'next/dynamic';
const ViewDivisionsPage: NextPage = () => {
  // const DynamicMap = dynamic(() => import('../../../components/territory-management/divisions/DivisionsMap'), {
  //   ssr: false,
  // });

  return (
    <>
      <Head>
        <title>Divisions</title>
      </Head>

      {/* <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5' gap={2}>
              View Orders
            </Typography>
            <BasicSelect vendor={vendor} vendorSelected={vendorSelected}></BasicSelect>
          </Stack> */}
      <Stack height={1}>{/* <DynamicMap></DynamicMap> */}</Stack>
    </>
  );
};

ViewDivisionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewDivisionsPage;
