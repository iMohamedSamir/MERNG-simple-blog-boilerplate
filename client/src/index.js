// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import ApolloProvider from './ApolloProvider';
import reportWebVitals from './reportWebVitals';

import { render } from 'react-dom';
const Root = document.getElementById('root');
render(ApolloProvider, Root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
