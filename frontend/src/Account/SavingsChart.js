// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { LineChart, axisClasses } from '@mui/x-charts';
// import axios from 'axios'
// import chartData from '../utils/transactiondata';
// import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount: amount ?? null };
// }

// let initialAmount = 0;



// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00'),
// ];

// export default function Chart() {
//   const theme = useTheme();
// const storedIds = localStorage.getItem('accountIds');
// const parsedIds = storedIds ? JSON.parse(storedIds) : [];

// const [Transactions, setTransactions] = React.useState([]);

// const fetchData = async (accountId) => {
//     try {
//       const response = await axios.get(`http://localhost:5050/api/Transactions/GetTransactionsByAccountId/${parsedIds[0]}`);
//       console.log(`Response data for Account ${parsedIds[0]}:`, response.data);
//       setTransactions([...response.data]);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
  
//   const readyForChart = chartData(Transactions);
//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
//         <LineChart
//           dataset={readyForChart}
//           margin={{
//             top: 16,
//             right: 20,
//             left: 70,
//             bottom: 30,
//           }}
//           xAxis={[
//             {
//               scaleType: 'point',
//               dataKey: 'time',
//               tickNumber: 2,
//               tickLabelStyle: theme.typography.body2,
//             },
//           ]}
//           yAxis={[
//             {
//               label: 'Sales ($)',
//               labelStyle: {
//                 ...theme.typography.body1,
//                 fill: theme.palette.text.primary,
//               },
//               tickLabelStyle: theme.typography.body2,
//               max: 2500,
//               tickNumber: 3,
//             },
//           ]}
//           series={[
//             {
//               dataKey: 'amount',
//               showMark: false,
//               color: theme.palette.primary.light,
//             },
//           ]}
//           sx={{
//             [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
//             [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
//             [`& .${axisClasses.left} .${axisClasses.label}`]: {
//               transform: 'translateX(-25px)',
//             },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   );
// }