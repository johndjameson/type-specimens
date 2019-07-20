import styled from 'styled-components'
import ExternalLink from 'common/components/ExternalLink'
import InlineSvg from 'common/components/InlineSvg'

export const Base = styled.header`
  padding-bottom: 60px;
  padding-top: 60px;
  text-align: center;
`

export const Logo = styled.div`
  display: inline-block;
  max-width: 100%;
  position: relative;
  text-align: left;
`

export const Image = styled(InlineSvg)`
  margin-bottom: -5.5%;
`

export const Text = styled.p`
  color: #c1d3f5;
  font-size: 19px;
  letter-spacing: 0.02em;
  margin-left: 21%;
`

export const Link = styled(ExternalLink)`
  text-decoration: underline;
`
