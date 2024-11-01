import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { CommissionsReportTable } from '../../../components/payments/commissions-report/CommissionsReportTable';
import { CustomInput } from '../../../components/shared/CustomInput';
import { useState } from 'react';
import { vendorsMock } from '../../../data/vendors';

const CommissionsReportPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Commission Reports</title>
      </Head>
      <CommissionsReportTable />
    </>
  );
};

CommissionsReportPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CommissionsReportPage;
