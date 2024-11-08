import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { CommissionsDraftTable } from '../../../components/commissions/commissions-draft/CommissionsDraftTable';

const CommissionsDraftPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Commissions Draft</title>
      </Head>
      <CommissionsDraftTable />
    </>
  );
};

CommissionsDraftPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CommissionsDraftPage;
