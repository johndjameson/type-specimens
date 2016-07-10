// *************************************
//
//   Collection Item
//   -> Specimen thumbnail
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'

// -------------------------------------
//   Component
// -------------------------------------

export default class CollectionItem extends React.Component {
  render() {
    return (
      <div className='collection-item'>
        <div className='thumbnail'>
          <a href={this.props.url}>
            <img className='thumbnail-media' src={this.props.imageSrc} alt={this.props.title} />
          </a>
        </div>
        <p className='fss lh30px tac'>
          <a className='link' href={this.props.url}>{this.props.title}</a>
        </p>
      </div>
    )
  }
}

CollectionItem.propTypes = {
  imageSrc: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}
