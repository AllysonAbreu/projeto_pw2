import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './ui/app';

import './index.css';
import GlobalContext from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <GlobalContext>
          <App />
        </GlobalContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();