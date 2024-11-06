// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Box, Typography } from '@mui/material';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function SalesByRepChart() {
//   // Sample data for sales by rep over time
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May'], // Time periods (months)
//     datasets: [
//       {
//         label: 'John Doe',
//         data: [150, 200, 250, 300, 350], // Sales data for John
//         backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color for John
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Jane Smith',
//         data: [180, 230, 270, 320, 400], // Sales data for Jane
//         backgroundColor: 'rgba(153, 102, 255, 0.5)', // Bar color for Jane
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Bob Johnson',
//         data: [120, 170, 220, 280, 330], // Sales data for Bob
//         backgroundColor: 'rgba(255, 159, 64, 0.5)', // Bar color for Bob
//         borderColor: 'rgba(255, 159, 64, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: (context: any) => `${context.dataset.label}: $${context.raw}`, // Show sales value with dollar sign
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time (Months)', // Label for x-axis
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Sales ($)', // Label for y-axis
//         },
//         beginAtZero: true, // Ensure y-axis starts from 0
//       },
//     },
//   };

//   return (
//     <Box>
//       <Typography variant='h6' gutterBottom>
//         Sales by Rep Over Time
//       </Typography>
//       <Bar data={data} options={options} />
//     </Box>
//   );
// }
