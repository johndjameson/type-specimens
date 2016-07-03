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
      <p>Hello</p>
    )
  }

}

ReactDOM.render((
    <App />
  ),
  document.querySelector( '#js-app' )
)
