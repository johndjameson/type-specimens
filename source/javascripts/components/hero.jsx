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

export default class Hero extends React.Component {
  render() {
    return (
      <header className='hero'>
        <div className='row'>
          <div className='logo'>
            <h1 className='srt'>Type Specimens</h1>
            <InlineSvg className='logo-svg' src='/images/logo.svg' width={593} height={174}/>
            <p className='logo-tagline'>
              Curated from around the web by&nbsp;
              <a className='link link--underlined' href='https://johndjameson.com/'>John&nbsp;D.&nbsp;Jameson</a>
            </p>
          </div>
        </div>
      </header>
    )
  }
}
