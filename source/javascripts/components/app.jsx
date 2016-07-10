// *************************************
//
//   App
//   -> Page banner
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'

// ----- Components ----- //

import Collection from './collection.jsx'
import Hero from './hero.jsx'

// -------------------------------------
//   Component
// -------------------------------------

export default class App extends React.Component {

  // ----- Constructor ----- //

  constructor(props) {
    super(props)

    this.state = {
      records: []
    }
  }

  // ----- Lifecycle ----- //

  componentWillMount() {
    this._loadRecords()
  }

  render() {
    return (
      <main>
        <Hero/>
        <section className='row'>
          <Collection records={this.state.records}/>
        </section>
      </main>
    )
  }

  // ----- Load Records ----- //

  _loadRecords() {
    let request = new XMLHttpRequest()
    let self = this

    request.open('GET', 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=keyNzlXjAWOzfVKzD&sortField=Title&filterByFormula=AND(Published)', true)

    request.onload = function() {
      self.setState({ records: JSON.parse(this.response).records })
    }

    request.send()
  }
}
