import Head from "next/head";
import { Stack, Typography } from "@mui/material";
import { CustomizedTables } from "@/components/Table";
import { BasicSelect } from "../components/Select";
import * as React from "react";

export default function Home() {
  const [vendor, setVendor] = React.useState("All");

  const vendorSelected = (value: string) => {
    console.log(value)
    setVendor(value);
  };

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
        
      <Stack gap={5} p={5}>
        <Stack>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }} ><Typography variant="h5" gap={2}>View Orders</Typography><BasicSelect vendor={vendor} vendorSelected={vendorSelected}></BasicSelect></Stack>
          <CustomizedTables vendor={vendor}/>
        </Stack>
      </Stack>
   
    </>
  );
}
