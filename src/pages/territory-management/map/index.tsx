import { NextPage } from 'next';
import { useEffect } from 'react';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { SplashScreen } from '../../../components/shared/SplashScreen';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getTerritoryDataInitialized } from '../../../store/slices/dataSlice';
import { initializeTerritoryData } from '../../../store/thunks/data-initialization/initializeTerritoryData';
import Head from 'next/head';
import { TerritoryMap } from '../../../components/territory-management/map-page/map/TerritoryMap';
import { TestMap } from '../../../components/territory-management/map-page/map/TestMap';

const MapPage: NextPage = () => {
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
        <title>Territory Map</title>
      </Head>
      <TerritoryMap />
      {/* <TestMap></TestMap> */}
    </>
  );
};

MapPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default MapPage;
