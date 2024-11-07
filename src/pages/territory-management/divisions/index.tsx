import { Stack } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { OrdersTable } from '../../../components/orders/OrdersTable';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { getDivisions } from '../../../store/slices/dataSlice';
import { DivisionsTable } from '../../../components/territory-management/divisions/DivisionsTable';

const ViewDivisionsPage: NextPage = () => {
  const divisions = useAppSelector(getDivisions);

  const DynamicMap = dynamic(() => import('../../../components/territory-management/divisions/DivisionsMap'), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Divisions</title>
      </Head>

      <DivisionsTable divisions={divisions}></DivisionsTable>
    </>
  );
};

ViewDivisionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewDivisionsPage;