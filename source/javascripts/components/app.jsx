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

    this.url = 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=key3GGb7zxleGAfHl&sortField=Slug&filterByFormula=AND(Status=%27Published%27)'
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

    request.open('GET', self.url)

    request.onload = function() {
      let json = JSON.parse(this.response)
      let records = json['records']

      self.setState({ records })

      if ('offset' in json) {
        self._loadSecondRequest(json['offset'])
      }
    }

    request.send()
  }

  _loadSecondRequest(offset) {
    let request = new XMLHttpRequest()
    let self = this

    request.open('GET', `${self.url}&offset=${offset}`)
    request.send()

    request.onload = function() {
      let json = JSON.parse(this.response)
      let records = json['records']

      self.setState({ records: self.state.records.concat(records) })
    }
  }
}
