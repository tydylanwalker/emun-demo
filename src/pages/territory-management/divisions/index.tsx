import { Stack } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getDivisions, getTerritoryDataInitialized } from '../../../store/slices/dataSlice';
import { DivisionsTable } from '../../../components/territory-management/divisions/DivisionsTable';
import { CustomInput } from '../../../components/shared/CustomInput';
import { MarkerData } from '../../../components/territory-management/divisions/DivisionsMap';
import { initializeTerritoryData } from '../../../store/thunks/data-initialization/initializeTerritoryData';
import { SplashScreen } from '../../../components/shared/SplashScreen';

const ViewDivisionsPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const dataInitialized = useAppSelector(getTerritoryDataInitialized);

  useEffect(() => {
    if (!dataInitialized) dispatch(initializeTerritoryData());
  }, [dispatch, dataInitialized]);

  const divisions = useAppSelector(getDivisions);
  const [divisionSelected, setDivisionSelected] = useState<string>('All');

  const handleMarkerClick = (marker: MarkerData) => {
    setDivisionSelected(marker.title);
  };

  const uniqueDivisions = divisions.filter(
    (value, index, self) => index === self.findIndex((division) => division.division === value.division)
  );

  const options = ['All', ...uniqueDivisions.map((division) => division.division)];

  const DynamicMap = dynamic(() => import('../../../components/territory-management/divisions/DivisionsMap'), {
    ssr: false,
  });

  if (!dataInitialized) {
    return <SplashScreen />;
  }

  return (
    <>
      <Head>
        <title>Divisions</title>
      </Head>
      <Stack spacing={{ xs: 1, sm: 2 }} direction={'row'} overflow={'auto'}>
        <DynamicMap onMarkerClick={handleMarkerClick} />
        <Stack spacing={{ xs: 1, sm: 2 }} overflow={'auto'} flex={1}>
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
      </Stack>
    </>
  );
};

ViewDivisionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewDivisionsPage;
