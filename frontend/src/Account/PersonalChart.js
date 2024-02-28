import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Title from './Title';

const storedId = localStorage.getItem('accountIds');
const Ids = storedId ? JSON.parse(storedId) : [];

const PersonalChart = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/Transactions/GetTransactionsByAccountId/${Ids[1]}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchData();
  }, []); 
  const theme = useTheme();


const transferTransactions = transactions.filter(transaction => transaction.transactionType === 'Transfer');

console.log(transferTransactions);
  // Initialize initialAmount
  let initialAmount = 0;

  // Generate Sales Data
  function createData(time, amount) {
    return { time, amount: amount ?? null };
  }
console.log(transactions);
const amounts = transactions.map(transaction => transaction.amount);

console.log(amounts);
const transactionTypes = transactions.map(transaction => transaction.transactionType);

console.log(transactionTypes);
const datesAndTimes = transactions.map(transaction => transaction.dateAndTime);

console.log(datesAndTimes);


  // const data = transactions
  // .sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime))
  // .map((transaction) => {
  //   let currentAmount = initialAmount;

  //   // If transaction type is 'transfer', use initialAmount for current transaction
  //   if (transaction.transactionType === 'transfer') {
  //     currentAmount = initialAmount;
  //   }

  //   // Update currentAmount based on transaction type
  //   if (transaction.transactionType === 'deposit') {
  //     currentAmount += transaction.amount;
  //   } else if (transaction.transactionType === 'withdraw') {
  //     currentAmount -= transaction.amount;
  //   }

  //   // Format the transaction time to hours and minutes
  //   const transactionTime = new Date(transaction.dateAndTime);
  //   const formattedTime = `${transactionTime.getHours()}:${transactionTime.getMinutes()}`;

  //   // Update initialAmount for next transaction
  //   initialAmount = currentAmount;

  //   return createData(formattedTime, currentAmount);
  // });
  function processData(datesAndTimes, transactionTypes, amounts) {
  let initialAmount = 0;
  let maxAmount = 0;
  const data = [];

  for (let i = 0; i < datesAndTimes.length; i++) {
    const dateAndTime = datesAndTimes[i];
    const transactionType = transactionTypes[i];
    const amount = amounts[i];

    if (transactionType === 'Deposit') {
      initialAmount += amount;
    } else if (transactionType === 'Withdraw') {
      initialAmount -= amount;
    }
    if (initialAmount > maxAmount) {
      maxAmount = initialAmount;
    }
    const result = createData(new Date(dateAndTime).toLocaleString(), initialAmount);
    data.push(result);
  }
  return data;
}
function test(datesAndTimes, transactionTypes, amounts) {
  let initialAmount = 0;
  let maxAmount = 0;
  const data = [];

  for (let i = 0; i < datesAndTimes.length; i++) {
    const dateAndTime = datesAndTimes[i];
    const transactionType = transactionTypes[i];
    const amount = amounts[i];

    if (transactionType === 'Deposit') {
      initialAmount += amount;
    } else if (transactionType === 'Withdraw') {
      initialAmount -= amount;
    }

    if (initialAmount > maxAmount) {
      maxAmount = initialAmount;
    }

    const result = createData(new Date(dateAndTime).toLocaleString(), initialAmount);
    data.push(result);
  }

  return  maxAmount;
}
const data = processData(datesAndTimes, transactionTypes, amounts);
console.log(data);
const maxAmount = test(datesAndTimes, transactionTypes, amounts);
console.log(maxAmount);

  return (
    <React.Fragment>
      <Title>Personal Account Chart</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Balance ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: `${maxAmount}`,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default PersonalChart;