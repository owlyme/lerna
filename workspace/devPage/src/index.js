import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// function view(path) {
//   return (resolve) => require([`./components/rollup/${path}.js`], resolve)
// }
const A1 = () => import(/* webpackChunkName: "A1" */ './components/rollup/A1.js')

console.log(A1)