import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import Container from 'react-bootstrap/Container';

import './index.css';
import LoginOrApp from './main/LoginOrApp';
import rootReducer from './main/Reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)});

root.render(
  <Provider store={store}>
    <Container fluid>
      <LoginOrApp />
    </Container>
    <ToastContainer />
  </Provider>
);