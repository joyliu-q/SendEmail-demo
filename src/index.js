import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';

//import awsconfig from './aws-exports';
Amplify.configure({
  "aws_cognito_identity_pool_id": "us-west-2:99a9df90-8411-4dcc-95aa-c50ff5f4055c",
  "aws_cognito_region": "us-west-2",
  "aws_user_pools_id": "us-west-2_GEH7eSHgh",
  "aws_user_pools_web_client_id": "19bbj3vrs019qm0pgdm45l1kco",
})

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
