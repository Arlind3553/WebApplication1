// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table,TableBody,TableCell,TableHead,TableRow,MenuItem,FormControl,Select,InputLabel} from '@mui/material';

// import Title from './Title';


const storedIds = localStorage.getItem('accountIds');
const parsedIds = storedIds ? JSON.parse(storedIds) : [];
const Orders = () => {
  const [transactions1, setTransactions1] = useState([]);
  const [transactions2, setTransactions2] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(parsedIds[0] || '');
  

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
  try {
    console.log("ketu-------", parsedIds[0]);
    const response1 = await axios.get(`http://localhost:5050/api/Transactions/GetTransactionsByAccountId/${parsedIds[0]}`);
    const response2 = await axios.get(`http://localhost:5050/api/Transactions/GetTransactionsByAccountId/${parsedIds[1]}`);
    
    console.log('Response data for Account 1:', response1.data);
    setTransactions1([...response1.data]);
    
    console.log('Response data for Account 2:', response2.data);
    setTransactions2([...response2.data]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleChange = (event) => {
    const selectedAccountId = event.target.value;
    setSelectedAccountId(selectedAccountId);
    fetchData(selectedAccountId);
  };


return (
    <>
      <FormControl fullWidth>
        <InputLabel id="account-select-label">Select Account</InputLabel>
        <br></br>
        <Select
          labelId="account-select-label"
          id="account-select"
          value={selectedAccountId}
          onChange={handleChange}
        >
          <MenuItem value={parsedIds[0]}>Account 1</MenuItem>
          <MenuItem value={parsedIds[1]}>Account 2</MenuItem>
        </Select>
      </FormControl>
      <br></br>

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
          {selectedAccountId === parsedIds[0]
            ? transactions1.map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.dateAndTime}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.amount}$</TableCell>
                  <TableCell align="right">{transaction.accountID}</TableCell>
                </TableRow>
              ))
            : selectedAccountId === parsedIds[1] &&
              transactions2.map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.dateAndTime}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell align="right">{transaction.accountID}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;