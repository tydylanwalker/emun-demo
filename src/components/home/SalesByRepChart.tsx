import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getMonthsAgo } from './MonthlyOrdersOverview';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { getOrders } from '../../store/slices/dataSlice';
import { IOrder } from '../../data/interfaces/IOrder';
import { isModeDark } from '../../store/slices/themeSlice';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function generateGraphData(orders: IOrder[]): { labels: string[]; datasets: any } {
  let monthItrs = [0, 1, 2].reverse();
  let labels = monthItrs.map((itr) => getMonthsAgo(itr).toLocaleString('default', { month: 'long' }));

  const valueCount = orders.reduce(
    (acc, value) => {
      acc[value.rep] = (acc[value.rep] || 0) + value.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedRepsByTotalSales = Object.entries(valueCount)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  const topThreeRepsInSales = sortedRepsByTotalSales.slice(0, 3);

  let repOrders = orders.filter((order) => topThreeRepsInSales.includes(order.rep));

  var datasets = [];

  for (let i = 0; i < topThreeRepsInSales.length; i++) {
    var orderData = [];

    for (let j = 0; j < monthItrs.length; j++) {
      let itr = monthItrs[j];
      let fromMonth = new Date(getMonthsAgo(itr));
      let toMonth = new Date(getMonthsAgo(itr - 1));

      let thisMonthsOrdersAmount = repOrders
        .filter(
          (order) =>
            new Date(order.orderDate ?? '') >= fromMonth &&
            new Date(order.orderDate ?? '') < toMonth &&
            order.rep === topThreeRepsInSales[i]
        )
        .reduce((sum, order) => sum + (order.amount ?? 0.0), 0);

      orderData.push(thisMonthsOrdersAmount);
    }

    let chartData = {
      label: topThreeRepsInSales[i],
      data: orderData,
      backgroundColor: `rgba(${133 / (i + 1)}, ${195 / (i + 1)}, ${248}, 0.5)`,
      borderColor: `rgba(${133 / (i + 1)}, ${195 / (i + 1)}, ${248}, 1.0)`,
      borderWidth: 1,
    };

    datasets.push(chartData);
  }

  return { labels, datasets };
}

export default function SalesByRepChart(props: SalesByRepChartProps) {
  let fromMonth = new Date(getMonthsAgo(2));

  let last3MonthsOrders = props.orders.filter(
    (order) => new Date(order.orderDate ?? '') >= fromMonth && new Date(order.orderDate ?? '')
  );
  const data = generateGraphData(last3MonthsOrders);

  return (
    <Box
      sx={{
        borderRadius: 3,
        padding: '1rem',
        boxShadow: useAppSelector(isModeDark) ? '-2px 2px 16px rgba(50, 50, 50, 0)' : '0px 2px 16px rgba(0, 0, 0, 0.4)',
        bgcolor: 'secondary.main',
      }}
    >
      <Typography fontSize={'1.6vw'} fontWeight={800}>
        Sales by Month
      </Typography>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context: any) => `${context.dataset.label}: $${context.raw}`, // Show sales value with dollar sign
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time (Months)', // Label for x-axis
              },
            },
            y: {
              title: {
                display: true,
                text: 'Sales ($)', // Label for y-axis
              },
              beginAtZero: true, // Ensure y-axis starts from 0
            },
          },
        }}
      />
    </Box>
  );
}

interface SalesByRepChartProps {
  orders: IOrder[];
}
