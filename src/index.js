import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18/i18';

import { App } from './App';

import store from './redux/rootReducer';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>...loading</div>}>
          <App />
        </Suspense>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
