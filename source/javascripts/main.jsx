// *************************************
//
//   Application
//   -> Manifest
//
// *************************************

// -------------------------------------
//   Requires
// -------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'

// -------------------------------------
//   Base
// -------------------------------------

class App extends React.Component {

  render() {
    return (
      <main>
        <Header/>
        <Collection/>
      </main>
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

class Collection extends React.Component {

  render() {
    return (
      <div>
        <CollectionItem/>
        <CollectionItem/>
        <CollectionItem/>
        <CollectionItem/>
        <CollectionItem/>
      </div>
    )
  }

}

class CollectionItem extends React.Component {

  render() {
    return (
      <div>Collection item</div>
    )
  }

}

ReactDOM.render((
    <App />
  ),
  document.querySelector( '#js-app' )
)
