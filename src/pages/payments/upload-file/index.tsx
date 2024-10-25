import { BaseLayout } from "@/components/layout/BaseLayout";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const UploadFilePage: NextPage = () => {
    return (
      <>
        <Head>
          <title>Upload File</title>
        </Head>
        <Typography>Upload File Page</Typography>
      </>
    );
  }
  
  UploadFilePage.getLayout = (page) => (<BaseLayout>{page}</BaseLayout>);
  
  export default UploadFilePage;