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
import { Router, Route, Link, browserHistory } from 'react-router'

// -------------------------------------
//   Components
// -------------------------------------

class App extends React.Component {

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

    request.open('GET', 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=keyNzlXjAWOzfVKzD&sortField=Title', true)

    request.onload = function(something) {
      self.setState({ records: JSON.parse(this.response).records })
    }

    request.send()
  }
}

class Hero extends React.Component {
  render() {
    return (
      <header className='hero'>
        <div className='row'>
          <img src='https://placehold.it/480x200'/>
        </div>
      </header>
    )
  }
}

class Collection extends React.Component {
  render() {
    return (
      <div className='collection'>
        { this.props.records.map( item => {
          return (
            <CollectionItem
              imageSrc={item.fields['Screenshots'][0]['url']}
              key={item.id}
              title={item.fields['Title']}
              url={item.fields['URL']}
            />
          )
        } ) }
      </div>
    )
  }
}

class CollectionItem extends React.Component {
  render() {
    return (
      <div className='collection-item'>
        <div className='thumbnail'>
          <a href={this.props.url}>
            <img className='thumbnail-media' src={this.props.imageSrc} alt={this.props.title} />
          </a>
        </div>
        {/*<p className='tac fss fw5'>{this.props.title}</p>*/}
      </div>
    )
  }
}

// -------------------------------------
//   Router
// -------------------------------------

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
  </Router>
)

// -------------------------------------
//   Main
// -------------------------------------

ReactDOM.render(routes, document.querySelector('#js-app'))
