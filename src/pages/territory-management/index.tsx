import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { SplashScreen } from '../../components/shared/SplashScreen';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { getTerritoryDataInitialized, getDivisions } from '../../store/slices/dataSlice';
import { initializeTerritoryData } from '../../store/thunks/data-initialization/initializeTerritoryData';
import { TerritoryManagement } from '../../components/territory-management/TerritoryManagement';

const TerritoryManagementPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const dataInitialized = useAppSelector(getTerritoryDataInitialized);

  useEffect(() => {
    if (!dataInitialized) dispatch(initializeTerritoryData());
  }, [dispatch, dataInitialized]);

  if (!dataInitialized) {
    return <SplashScreen />;
  }

  return (
    <>
      <Head>
        <title>Territory Management</title>
      </Head>
      <TerritoryManagement />
    </>
  );
};

TerritoryManagementPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default TerritoryManagementPage;
