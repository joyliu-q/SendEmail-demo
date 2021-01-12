import React, { useState } from "react";
import { Auth } from 'aws-amplify';

//TODO: Fancier login using Amplify API

import { Colors, Typography, Form } from '@/styles'
import { Newsletter } from "./styles"

const CustomSignIn = (props) => {
  const {authState, onStateChange} = props;
  const [formData, setFormData] = useState({
        username: '',
        password: '',
        code: ''
});

const handleInputChange = e => {
  const {value, dataset} = e.target;
  const {prop} = dataset;
  setFormData({
     ...formData,
    [prop]: value
 });
};

const signInClick = async () => {
  try{
     await Auth.signIn(formData.username, formData.password);
     onStateChange(authState);
  }
 catch(error){
    console.log(error);
 }
}

return (
  <div> 
    <form>
       <div>
         <Typography.Header>Admin Sign-In</Typography.Header>
         <Typography.Header2 htmlFor="username">Admin Username</Typography.Header2>
         <Form.Input data-prop={'username'} onChange={handleInputChange} type="text" placeholder="Username"/>
        <Typography.Header2 htmlFor="password">Password</Typography.Header2>
        <Form.Input data-prop={'password'} onChange={handleInputChange} type="password" placeholder="******************"/>
        <Form.Button type="button" onClick={() => signInClick()}>Login</Form.Button>
      </div>
    </form>
  </div>
);
}

export default CustomSignIn;