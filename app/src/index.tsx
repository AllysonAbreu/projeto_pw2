import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './ui/app';
import { UserProvider } from './contexts/user/user.context';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();