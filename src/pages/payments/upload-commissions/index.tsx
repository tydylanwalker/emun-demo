import { BaseLayout } from "@/components/layout/BaseLayout";
import { UploadCommissions } from "@/components/payments/upload-commissions/UploadCommissions";
import { NextPage } from "next";
import Head from "next/head";

const UploadCommissionsPage: NextPage = () => {
    return (
      <>
        <Head>
          <title>Upload File</title>
        </Head>
        <UploadCommissions />
      </>
    );
  }
  
  UploadCommissionsPage.getLayout = (page) => (<BaseLayout>{page}</BaseLayout>);
  
  export default UploadCommissionsPage;