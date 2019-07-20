import React from 'react'
import styled from 'styled-components'

const Element = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`

function Hidden(props) {
  return <Element {...props} />
}

export default Hidden
