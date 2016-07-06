// *************************************
//
//   Application
//   -> Manifest
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

// ----- Components ----- //

import App from './components/app.jsx'

// -------------------------------------
//   Router
// -------------------------------------

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#js-app'))
