import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import About from './pages/About'
import EmailManual from './pages/EmailManual'
import EmailAuto from './pages/EmailAuto'
import CustomSignIn from './pages/Login'
import Logout from './pages/Logout'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
//import { Authenticator } from "aws-amplify-react";
//import config from "./aws-exports";

import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';

function App () {
  return (
    <>
    <div id="auth">
      <AmplifyAuthenticator>
        <AmplifySignIn
          theme="bootstrap"
          headerText="Admin UI Panel"
          slot="sign-in"
          hideSignUp
        />
        <div id="container">
          <Router>
            <div>
              <Switch>
                <Route path="/email/manual">
                  <EmailManual />
                </Route>
                <Route path="/email/auto">
                  <EmailAuto />
                </Route>
                <Route path="/logout">
                  <Logout />
                </Route>
                <Route path="/">
                  <About />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </AmplifyAuthenticator>
    </div>
    </>
  )
}

export default App