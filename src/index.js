import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from '@reduxjs/toolkit';

import { App } from './App';

import store from './redux/rootReducer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
