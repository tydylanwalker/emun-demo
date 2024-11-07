import { Stack } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { OrdersTable } from '../../../components/orders/OrdersTable';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { getDivisions } from '../../../store/slices/dataSlice';
import { DivisionsTable } from '../../../components/territory-management/divisions/DivisionsTable';
import { CustomInput } from '../../../components/shared/CustomInput';

const ViewDivisionsPage: NextPage = () => {
  const divisions = useAppSelector(getDivisions);
  const [divisionSelected, setDivisionSelected] = useState<string>('All');

  const uniqueDivisions = divisions.filter(
    (value, index, self) => index === self.findIndex((division) => division.division === value.division)
  );

  let options = ['All', ...uniqueDivisions.map((division) => division.division)];

  const DynamicMap = dynamic(() => import('../../../components/territory-management/divisions/DivisionsMap'), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Divisions</title>
      </Head>
      <Stack spacing={{ xs: 1, sm: 2 }} overflow={'auto'}>
        <CustomInput
          select
          value={divisionSelected}
          label='Select Division'
          options={options}
          onChange={(event) => setDivisionSelected(event.target.value as string)}
          sx={{ maxWidth: '40%' }}
        />
        <DivisionsTable
          divisions={
            divisionSelected === 'All'
              ? divisions
              : divisions.filter((division) => division.division === divisionSelected)
          }
        ></DivisionsTable>
      </Stack>
    </>
  );
};

ViewDivisionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewDivisionsPage;
