import React from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Image,
  Link,
  Placeholder,
  SpecimenBase,
  Thumbnail,
} from './styled'

function Specimen({ href, id, imageSrc, name }) {
  return (
    <SpecimenBase key={id}>
      <Thumbnail href={href} tabindex='-1'>
        <Placeholder />
        <Image alt={name} src={imageSrc} />
      </Thumbnail>

      <Heading>
        <Link href={href}>{name}</Link>
      </Heading>
    </SpecimenBase>
  )
}

Specimen.propTypes = {
  id: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Specimen
