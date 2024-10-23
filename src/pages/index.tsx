import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Stack, Typography } from "@mui/material";
import { CustomizedTables } from "@/components/Table";

export default function Home() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
        
      <Stack gap={5} p={5}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Stack>
          <Typography variant="h5" gap={2}>View Orders</Typography>
          <CustomizedTables />
        </Stack>
      </Stack>
   
    </>
  );
}
