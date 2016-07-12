// *************************************
//
//   Collection Item
//   -> Specimen thumbnail
//
// *************************************

import React from 'react'

export default class CollectionItem extends React.Component {

  // -------------------------------------
  //   Component Will Mount
  // -------------------------------------

  componentWillMount() {
    this.state = {
      isImageLoaded: false
    }

    this._loadImage()
  }

  // -------------------------------------
  //   Render
  // -------------------------------------

  render() {
    return (
      <div className='collection-item'>
        <a className='thumbnail' href={this.props.url}>
          <div className='thumbnail-placeholder' />
          { this.state.isImageLoaded ?
            <img className='thumbnail-media' src={this.props.imageSrc} alt={this.props.title} />
            : null
          }
        </a>
        <p className='fss lh30px tac'>
          <a className='link' href={this.props.url}>{this.props.title}</a>
        </p>
      </div>
    )
  }

  // -------------------------------------
  //   Load Image
  // -------------------------------------

  _loadImage() {
    let image = new Image()

    image.onload = () => {
      this.setState({ isImageLoaded: true })
    }

    image.src = this.props.imageSrc
  }
}

// -------------------------------------
//   Prop Validation
// -------------------------------------

CollectionItem.propTypes = {
  imageSrc: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}
