import React from 'react'

function createMarkup(markup) {
  return { __html: markup }
}

function parseSvg(svg) {
  let parser = new DOMParser()

  let element = parser.parseFromString(svg, 'image/svg+xml')

  let markup = element.children[0].innerHTML
  let viewBox = element.children[0].getAttribute('viewBox')

  return { markup, viewBox }
}

export default class InlineSvg extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      markup: null,
      viewBox: null,
    }
  }

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
