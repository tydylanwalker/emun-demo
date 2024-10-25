import Head from "next/head";
import { Stack, Typography, Box } from "@mui/material";
import * as React from "react";
import { NextPage } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BarChartSet from "../../components/home/BarChartSet";
import BasicCard from "../../components/home/Card";
import { BaseLayout } from "../../components/layout/BaseLayout";
import { orders } from "../../data/orders";

interface CurrencyProps {
  amount: number;
}

const CurrencyFormatter: React.FC<CurrencyProps> = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

function getMonthsAgo(months: number): Date {
  const today = new Date();
  const lastMonth = new Date(today);

  // Subtract one month
  lastMonth.setMonth(today.getMonth() - months);

  return lastMonth;
}

const HomePage: NextPage = () => {
  const [vendor, setVendor] = React.useState("All");

  const vendorSelected = (value: string) => {
    console.log(value);
    setVendor(value);
  };
  console.log(getMonthsAgo(0));
  let lastMonthsOrders = orders.results.filter(
    (order) => new Date(order.orderedOn ?? "") > new Date(getMonthsAgo(0))
  );
  let lastYearsOrders = orders.results.filter(
    (order) => new Date(order.orderedOn ?? "") > new Date(getMonthsAgo(12))
  );
  let lastYearsTotal = orders.results
    .filter(
      (order) => new Date(order.orderedOn ?? "") > new Date(getMonthsAgo(12))
    )
    .reduce((sum, order) => sum + (order.grandTotal ?? 0.0), 0);

  return (
    <>
      <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="column"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <BasicCard
            title="Total Orders"
            value={lastMonthsOrders.length.toString()}
            notes="Last Month"
          ></BasicCard>
          <BasicCard
            title="Total Orders"
            value={lastYearsOrders.length.toString()}
            notes="Last 12 Months"
          ></BasicCard>
          <BasicCard
            title="Order Total"
            value={"$" + lastYearsTotal.toFixed(2).toString()}
            notes="Last 12 Months"
          ></BasicCard>
          <BasicCard
            title="No Data"
            value="No Data"
            notes="No Data"
          ></BasicCard>
        </Stack>
        <Card>
          <CardContent>
            <BarChartSet></BarChartSet>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
