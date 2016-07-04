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
//   Base
// -------------------------------------

class App extends React.Component {

  render() {
    return (
      <main>
        <Hero/>
        <section className='row'>
          <Collection/>
        </section>
      </main>
    )
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
        { data.map( item => {
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
        <div className='thumbnail mb05'>
          <a href={this.props.url}>
            <img className='thumbnail-media' src={this.props.imageSrc} alt={this.props.title} />
          </a>
        </div>
        {/*<p className='tac fss fw5'>{this.props.title}</p>*/}
      </div>
    )
  }

}

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
  </Router>
)

var request = new XMLHttpRequest();
var data;
request.open('GET', 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=keyNzlXjAWOzfVKzD&sortField=Title', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    data = JSON.parse(this.response).records;
    ReactDOM.render( routes, document.querySelector( '#js-app' ) )
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

