import React, { useState, useEffect } from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

const storedIds = localStorage.getItem('user');
const parsedIds = storedIds ? JSON.parse(storedIds) : [];

export default function Deposits2() {
  const [accountInfo, setAccountInfo] = useState({ Balance: 0, AccountID: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("KETU-", parsedIds.userID);
        const response = await axios.get(`http://localhost:5050/api/Account/account/${parsedIds.userID}`);
        if (response.data && response.data.length > 0) {
          const { balance, accountId } = response.data[1]; // Take the first item in the array
          setAccountInfo({ Balance: balance, AccountID: accountId });
        } else {
          console.error('API response is undefined, empty, or does not contain the expected structure.');
        }
      } catch (error) {
        console.error('Error fetching account information:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <React.Fragment>
      <Title>Personal Account</Title>
      <br />
      <Typography component="p" variant="h3" textAlign={'center'}>
        {`$${accountInfo.Balance}`}<br />
      </Typography>
      <div>
        <br />
        <Typography component="p" textAlign={'center'}>
          {`Account ID: ${accountInfo.AccountID}`}
        </Typography>
      </div>
    </React.Fragment>
  );
  }