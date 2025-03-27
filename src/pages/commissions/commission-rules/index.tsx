import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { useEffect } from 'react';
import { SplashScreen } from '../../../components/shared/SplashScreen';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getCommissionDataInitialized } from '../../../store/slices/dataSlice';
import { initializeCommissionData } from '../../../store/thunks/data-initialization/initializeCommissionData';
import { CommissionRulesTable } from '../../../components/commissions/commission-rules/CommissionRulesTable';
import { Stack, Typography } from '@mui/material';

const CommissionRulesPage: NextPage = () => {
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
      <Stack p={1} gap={2}>
        <Typography variant='h5' fontWeight='bold'>
          Commission Rules
        </Typography>
        <CommissionRulesTable />
      </Stack>
    </>
  );
};

CommissionRulesPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CommissionRulesPage;
