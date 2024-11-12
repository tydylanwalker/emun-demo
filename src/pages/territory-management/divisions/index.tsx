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
import { states } from '../../../data/constants';
import { IDivision } from '../../../data/interfaces/IDivision';

const ViewDivisionsPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const dataInitialized = useAppSelector(getTerritoryDataInitialized);

  useEffect(() => {
    if (!dataInitialized) dispatch(initializeTerritoryData());
  }, [dispatch, dataInitialized]);

  const divisions = useAppSelector(getDivisions);
  const [divisionSelected, setDivisionSelected] = useState<string>('');
  const divisionOptions = Array.from(new Map(divisions.map((division) => [division.division, division])).values());

  const [territorySelected, setTerritorySelected] = useState<string>('');
  const territoryOptions = Array.from(new Map(divisions.map((division) => [division.territory, division])).values());
  const [stateSelected, setStateSelected] = useState<string>('');

  const [rows, setRows] = useState<IDivision[]>(divisions);

  useEffect(() => {
    let filteredRows = divisions;
    if (divisionSelected) filteredRows = filteredRows.filter((division) => division.division === divisionSelected);
    if (territorySelected) filteredRows = filteredRows.filter((division) => division.territory === territorySelected);
    // if (stateSelected)

    setRows(filteredRows);
  }, [divisionSelected, divisions, territorySelected]);

  const handleMarkerClick = (marker: MarkerData) => {
    setDivisionSelected(marker.title);
  };

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
      <Stack spacing={{ xs: 1, sm: 2 }} direction={'row'} overflow={'none'}>
        <DynamicMap onMarkerClick={handleMarkerClick} />
        <Stack spacing={{ xs: 1, sm: 2 }} overflow={'auto'} flex={1}>
          <Stack direction='row' gap={2}>
            <CustomInput
              select
              value={divisionSelected}
              label='Select Division'
              options={divisionOptions.map((option) => option.division)}
              onChange={(event) => setDivisionSelected(event.target.value as string)}
            />
            <CustomInput
              select
              value={territorySelected}
              label='Select Territory'
              options={territoryOptions.map((option) => option.territory)}
              onChange={(event) => setTerritorySelected(event.target.value as string)}
            />
            <CustomInput
              select
              value={stateSelected}
              label='Select State'
              options={states}
              onChange={(event) => setStateSelected(event.target.value as string)}
            />
          </Stack>
          <DivisionsTable divisions={rows}></DivisionsTable>
        </Stack>
      </Stack>
    </>
  );
};

ViewDivisionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ViewDivisionsPage;
