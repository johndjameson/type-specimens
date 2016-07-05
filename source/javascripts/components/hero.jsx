// *************************************
//
//   Hero
//   -> Page banner
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'

// ----- Components ----- //

import InlineSvg from './inline-svg.jsx'

// -------------------------------------
//   Component
// -------------------------------------

export default class extends React.Component {
  render() {
    return (
      <header className='hero'>
        <div className='row'>
          <InlineSvg src='/images/logo.svg' width={593}/>
        </div>
      </header>
    )
  }
}
