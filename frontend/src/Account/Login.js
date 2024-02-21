import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define your theme
const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const [accountIds, setAccountIds] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/api/user/login', {
        cardNumber,
        pin,
      });

      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      // Fetch account data
      axios.get(`http://localhost:5050/api/Account/account/${user.userID}`)
        .then(response => {
          const responseData = response.data;
          localStorage.setItem('response1', JSON.stringify(responseData));

          // Extract accountIds
          const ids = responseData.map(account => account.accountId);
          setAccountIds(ids);
          console.log(accountIds)
          localStorage.setItem('accountIds', JSON.stringify(ids));


          // Redirect to the dashboard
          navigate('/dashboard');

          console.log('Account data:', responseData);
          console.log('Account IDs:', ids);
        })
        .catch(error => {
          console.error('Error fetching account data:', error);
        });
        console.log(user);
      console.log('Good job! Login successful');
    } catch (error) {
      setError('Invalid card number or PIN.');
    }
    
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cardNumber"
              label="Card Number"
              name="cardNumber"
              autoComplete="cardNumber"
              autoFocus
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pin"
              label="PIN"
              type="password"
              id="pin"
              autoComplete="current-pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
