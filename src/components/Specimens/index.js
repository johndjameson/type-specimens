import React from 'react'
import PropTypes from 'prop-types'
import { imageKitUrl } from 'common/helpers'
import Specimen from './Specimen'
import * as Styled from './styled'

function Specimens({ specimens }) {
  return specimens.length > 0 ? (
    <Specimens.Base>
      {specimens.map(({ fields, id }) => (
        <Specimen
          href={fields.URL}
          id={id}
          imageSrc={imageKitUrl({
            path: `${fields.Slug}.jpg`,
            transformations: { f: 'auto' },
          })}
          key={id}
          name={fields.Name}
        />
      ))}
    </Specimens.Base>
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

Specimens.Base = Styled.Base

export default Specimens
