import Head from "next/head";
import * as React from "react";
import { NextPage } from "next";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { Typography } from "@mui/material";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
        
      <Typography>Index</Typography>
   
    </>
  );
}

IndexPage.getLayout = (page) => (<BaseLayout>{page}</BaseLayout>);

export default IndexPage;