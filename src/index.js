import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import BookingState from './modules/homepage.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

  
root.render(
  <React.StrictMode>
    <BookingState/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
