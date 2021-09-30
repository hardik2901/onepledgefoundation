import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import App from './App.js';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
