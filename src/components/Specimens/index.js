import React from 'react'
import PropTypes from 'prop-types'
import Specimen from './Specimen'
import { Base } from './styled'

function Specimens({ specimens }) {
  return specimens.length > 0 ? (
    <Base>
      {specimens.map(({ fields, id }) => (
        <Specimen
          href={fields.URL}
          id={id}
          imageSrc={fields.Screenshots[0].url}
          key={id}
          name={fields.Name}
        />
      ))}
    </Base>
  ) : null
}

Specimens.propTypes = {
  specimens: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Screenshots: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired
        ).isRequired,
        URL: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default Specimens
