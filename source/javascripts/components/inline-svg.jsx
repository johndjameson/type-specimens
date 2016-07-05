// *************************************
//
//   Inline SVG
//   -> Request and display SVG
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'

// ----- Helpers ----- //

import { createMarkup, parseSvg } from '../helpers.jsx'

// -------------------------------------
//   Component
// -------------------------------------

export default class extends React.Component {

  // ----- Constructor ----- //

  constructor(props) {
    super(props)

    this.state = {
      markup: null,
      viewBox: null
    }
  }

  // ----- Lifecycle ----- //

  componentWillMount() {
    this._loadAsset()
  }

  render() {
    return (
      <svg
        dangerouslySetInnerHTML={createMarkup(this.state.markup)}
        viewBox={this.state.viewBox}
        {...this.props}
      />
    )
  }

  // ----- Load Asset ----- //

  _loadAsset() {
    let request = new XMLHttpRequest()
    let self = this

    request.open('GET', this.props.src, true)

    request.onload = function() {
      self.setState(parseSvg(this.response))
    }

    request.send()
  }
}
