// *************************************
//
//   Application
//   -> Manifest
//
// *************************************

// -------------------------------------
//   Requires
// -------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';

// -------------------------------------
//   Base
// -------------------------------------

class App extends React.Component {

  render() {
    return (
      <Header/>
    )
  }

}

class Header extends React.Component {

  render() {
    return (
      <header>
        <img src='https://placehold.it/480x200'/>
      </header>
    )
  }

}

ReactDOM.render((
    <App />
  ),
  document.querySelector( '#js-app' )
)
