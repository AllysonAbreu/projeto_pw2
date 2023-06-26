import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './ui/app';

import './index.css';
import GlobalContext from './contexts';
import { ToastifyProvider } from './contexts/toastify/toastify.context';

ReactDOM.render(
  <React.StrictMode>
    <ToastifyProvider>
      <BrowserRouter>
          <GlobalContext>
            <App />
          </GlobalContext>
      </BrowserRouter>
    </ToastifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();