import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '../../../components/layout/BaseLayout';
import { EnterCommissions } from '../../../components/commissions/enter-commissions/EnterCommissions';

const EnterCommissionsPage: NextPage = () => {
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
