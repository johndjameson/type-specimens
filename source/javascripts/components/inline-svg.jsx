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
      <svg viewBox={this.state.viewBox} dangerouslySetInnerHTML={this._createMarkup()}/>
    )
  }

  // ----- Create Markup ----- //

  _createMarkup() {
    return { __html: this.state.markup }
  }

  // ----- Parse SVG ----- //

  _parseSvg(svg) {
    let parser = new DOMParser()

    let element = parser.parseFromString(svg, 'image/svg+xml')

    let markup = element.children[0].innerHTML
    let viewBox = element.children[0].getAttribute('viewBox')

    return { markup, viewBox }
  }

  // ----- Load Asset ----- //

  _loadAsset() {
    let request = new XMLHttpRequest()
    let self = this

    request.open('GET', this.props.src, true)

    request.onload = function() {
      self.setState(self._parseSvg(this.response))
    }

    request.send()
  }
}
