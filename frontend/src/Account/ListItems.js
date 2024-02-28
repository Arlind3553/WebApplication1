import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
//import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BankAccountIcon = () => (
  <AccountBalanceIcon />
);

const storedId = localStorage.getItem('accountIds');
const Ids = storedId ? JSON.parse(storedId) : [];
const storedIds = localStorage.getItem('user');
const parsedIds = storedIds ? JSON.parse(storedIds) : [];

const MainListItems = () => {
  const [withdrawMenuAnchor, setWithdrawMenuAnchor] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const [depositMenuAnchor, setDepositMenuAnchor] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  const [transferMenuAnchor, setTransferMenuAnchor] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [toAccountId, setToAccountId] = useState('');

  const navigate = useNavigate();

  const handleWithdrawMenuClick = (event) => {
    setWithdrawMenuAnchor(event.currentTarget);
  };

  const handleWithdrawMenuClose = () => {
    setWithdrawMenuAnchor(null);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleWithdrawSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/Transactions/withdraw',
        {
          AccountID: selectedAccountId,
          Amount: withdrawAmount,
          UserID: parsedIds.userID
        }
      );

      console.log('Withdraw successful:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error withdrawing:', error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  const handleDepositMenuClick = (event) => {
    setDepositMenuAnchor(event.currentTarget);
  };

  const handleDepositMenuClose = () => {
    setDepositMenuAnchor(null);
  };

  const handleDepositSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/Transactions/deposit',
        {
          AccountID: selectedAccountId,
          Amount: depositAmount,
          UserID: parsedIds.userID
        }
      );

      console.log('Deposit successful:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error depositing:', error.response.data);
    }
  };

  const handleTransferMenuClick = (event) => {
    setTransferMenuAnchor(event.currentTarget);
  };

  const handleTransferMenuClose = () => {
    setTransferMenuAnchor(null);
  };

  const handleTransferSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/Transactions/Transfer',
        {
          Amount: transferAmount,
          FromAccountID: selectedAccountId,
          ToAccountID: toAccountId,
          UserID: parsedIds.userID
        }
      );

      console.log('Transfer successful:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error transferring:', error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('response1');
    localStorage.removeItem('accountIds');
    navigate('/');
  };

  return (
    <>
      <ListItemButton onClick={() => window.location.reload()}>
        <ListItemIcon>
          <BankAccountIcon/>
        </ListItemIcon>
        <ListItemText primary={`${parsedIds.firstName} ${parsedIds.lastName}`}/>
      </ListItemButton>
      <ListItemButton onClick={handleDepositMenuClick} >
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Deposit"/>
      </ListItemButton>
      <ListItemButton onClick={handleWithdrawMenuClick} >
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Withdraw"/>
      </ListItemButton>
      <ListItemButton onClick={handleTransferMenuClick} >
        <ListItemIcon>
          <CompareArrowsIcon />
        </ListItemIcon>
        <ListItemText primary="Transfer"/>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Change PIN" />
      </ListItemButton>

      <Menu
        anchorEl={withdrawMenuAnchor}
        open={Boolean(withdrawMenuAnchor)}
        onClose={handleWithdrawMenuClose}
      >
        <MenuItem style={{ width: '100%' }}>
          <FormControl style={{ width: '100%' }}>
            <Select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              input={<Input id="account-select" />}
              displayEmpty
              style={{ width: '100%' }}
            >
              <MenuItem value="" disabled>
                Select Account
              </MenuItem>
              <MenuItem value={Ids[0]}>Savings Account</MenuItem>
              <MenuItem value={Ids[1]}>Personal Account</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl>
            <InputLabel htmlFor="amount-input">Amount</InputLabel>
            <Input
              id="amount-input"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Button onClick={handleWithdrawSubmit} variant="contained" color="primary">
            Submit
          </Button>          
        </MenuItem>
        {errorMessage && <MenuItem style={{ background: '#ff6c6c', color: 'white', borderRadius: '8px' , margin: '5px'}}>{errorMessage}</MenuItem>}
      </Menu>

      <Menu
        anchorEl={depositMenuAnchor}
        open={Boolean(depositMenuAnchor)}
        onClose={handleDepositMenuClose}
      >
        <MenuItem style={{ width: '100%' }}>
          <FormControl style={{ width: '100%' }}>
            <Select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              input={<Input id="account-select" />}
              displayEmpty
              style={{ width: '100%' }}
            >
              <MenuItem value="" disabled>
                Select Account
              </MenuItem>
              <MenuItem value={Ids[0]}>Savings Account</MenuItem>
              <MenuItem value={Ids[1]}>Personal Account</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem style={{ width: '100%' }}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="amount-input">Amount</InputLabel>
            <Input
              id="amount-input"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              style={{ width: '100%' }}
            />
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Button onClick={handleDepositSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={transferMenuAnchor}
        open={Boolean(transferMenuAnchor)}
        onClose={handleTransferMenuClose}
      >
        <MenuItem style={{ width: '100%' }}>
          <FormControl style={{ width: '100%' }}>
            {/* first select------- */}
            <Select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              input={<Input id="from-account-select" />}
              displayEmpty
              style={{ width: '100%' }}
            >
              <MenuItem value="" disabled>
                From Account
              </MenuItem>
              <MenuItem name="first-save" value={Ids[0]} label="Savings Account">
                Savings Account
              </MenuItem>
              <MenuItem name="first-personal" value={Ids[1]} label="Personal Account">
                Personal Account
              </MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem style={{ width: '100%' }}>
          <FormControl style={{ width: '100%' }}>
            {/* second select------- */}
            <Select
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              input={<Input id="to-account-select" />}
              displayEmpty
              style={{ width: '100%' }}
            >
              <MenuItem value="" disabled>
                To Account
              </MenuItem>
              <MenuItem name="second-save" value={Ids[0]} disabled={selectedAccountId === Ids[0]}>
                Savings Account
              </MenuItem>
              <MenuItem name="second-personal" value={Ids[1]} disabled={selectedAccountId === Ids[1]}>
                Personal Account
              </MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="amount-input">Amount</InputLabel>
            <Input
              id="amount-input"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Button onClick={handleTransferSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </MenuItem>
        {errorMessage && <MenuItem style={{ background: '#ff6c6c', color: 'white', borderRadius: '8px' , margin: '5px'}}>{errorMessage}</MenuItem>}
      </Menu>
    </>
  );
};

export default MainListItems;