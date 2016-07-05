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

export default class extends React.Component {
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
