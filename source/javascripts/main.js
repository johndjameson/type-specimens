// *************************************
//
//   Application
//   -> Manifest
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

// ----- Components ----- //

import App from './components/app'

// -------------------------------------
//   Router
// -------------------------------------

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#js-app'))
