// *************************************
//
//   Collection
//   -> Specimen gallery
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

import React from 'react'

// ----- Components ----- //

import CollectionItem from './collection-item.jsx'

// -------------------------------------
//   Component
// -------------------------------------

export default class extends React.Component {
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
