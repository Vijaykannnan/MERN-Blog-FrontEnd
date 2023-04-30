import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from "../src/component/reducer/reducer"



const storeData = configureStore({ reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), })
// const storeData =configureStore({ reducer})
// mela ulla ithu mattum than na potathu methi fullam err varthunu net refer panni potathu
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ storeData }>
    <App />
  </Provider>
);

