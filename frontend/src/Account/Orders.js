import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // MenuItem,
  // FormControl,
  // Select,
  // InputLabel,
} from '@mui/material';

const storedIds = localStorage.getItem('accountIds');
const parsedIds = storedIds ? JSON.parse(storedIds) : [];
const storedId = localStorage.getItem('user');
const parsedId = storedIds ? JSON.parse(storedId) : [];
const Orders = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedAccountId] = useState(parsedIds[0] || '');

  useEffect(() => {
    fetchData(selectedAccountId);
  }, [selectedAccountId]);

  const fetchData = async (accountId) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/Transactions/GetTransactionsByUserId/${parsedId.userID}`);
      console.log(`Response data for Account ${accountId}:`, response.data);
      setTransactions([...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(transactions)
  const sortedTransactions = transactions.sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
  console.log(sortedTransactions)
  // const handleChange = (event) => {
  //   const selectedAccountId = event.target.value;
  //   setSelectedAccountId(selectedAccountId);
  // };

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Account ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.transactionId}>
              <TableCell>{new Date(transaction.dateAndTime).toLocaleString()}</TableCell>
              <TableCell>{transaction.transactionType}</TableCell>
              <TableCell>{transaction.amount}$</TableCell>
              <TableCell align="right">{transaction.accountID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;
