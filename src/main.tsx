// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { App as AntdProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { client } from './utils/apollo';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <AntdProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AntdProvider>
  </ApolloProvider>,
  // </React.StrictMode>,
);
