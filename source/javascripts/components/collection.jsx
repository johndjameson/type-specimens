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

export default class Collection extends React.Component {
  render() {
    return (
      <div className='collection'>
        { this.props.records.map( item => {
          return (
            <CollectionItem
              imageSrc={item.fields['Screenshots'][0]['url']}
              key={item.id}
              name={item.fields['Name']}
              url={item.fields['URL']}
            />
          )
        } ) }
      </div>
    )
  }
}

Collection.propTypes = {
  records: React.PropTypes.array.isRequired
}
