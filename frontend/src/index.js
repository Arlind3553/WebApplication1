import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Account from './Account/Account'
// import Login from './login';
import Login from './Account/Login'
import {QueryClient,QueryClientProvider,MutationCache} from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient({mutationCache: new MutationCache({onSuccess: data => {queryClient.invalidateQueries();},})})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Account />} />
          </Routes>
      </Router>

  </QueryClientProvider>
  
  
  
);
reportWebVitals();
