import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { EnterCommissions } from '../../../components/commissions/enter-commissions/EnterCommissions';
import { useEffect } from 'react';
import { SplashScreen } from '../../../components/shared/SplashScreen';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getCommissionDataInitialized } from '../../../store/slices/dataSlice';
import { initializeCommissionData } from '../../../store/thunks/data-initialization/initializeCommissionData';

const EnterCommissionsPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const dataInitialized = useAppSelector(getCommissionDataInitialized);

  useEffect(() => {
    if (!dataInitialized) dispatch(initializeCommissionData());
  }, [dispatch, dataInitialized]);

  if (!dataInitialized) {
    return <SplashScreen />;
  }

  return (
    <>
      <Head>
        <title>Upload File</title>
      </Head>
      <EnterCommissions />
    </>
  );
};

EnterCommissionsPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default EnterCommissionsPage;
