import styled, { keyframes } from 'styled-components'
import ExternalLink from 'common/components/ExternalLink'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Base = styled.div`
  --specimens-gap: 40px;
  display: grid;
  grid-column-gap: var(--specimens-gap);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const SpecimenBase = styled.div``

export const Thumbnail = styled(ExternalLink)`
  --thumbnail-padding: 2px;
  background-color: #fcfdff;
  box-shadow: 2px 2px 0 #170940;
  display: block;
  padding: var(--thumbnail-padding);
  position: relative;
`

export const Image = styled.img`
  animation: 0.4s ease-in-out ${fadeIn};
  left: var(--thumbnail-padding);
  max-width: calc(100% - (var(--thumbnail-padding) * 2));
  position: absolute;
  top: var(--thumbnail-padding);
  transition: opacity 0.2s ease-in-out;
  width: 100%;

  ${Thumbnail}:hover & {
    opacity: 0.8;
  }
`

export const Placeholder = styled.div`
  background: #d6dae0;
  border-radius: 1px;
  padding-top: 75%;
`

export const Heading = styled.h2`
  font-size: 13px;
  line-height: var(--specimens-gap);
  text-align: center;
`

export const Link = styled(ExternalLink)`
  &:hover {
    text-decoration: underline;
  }
`
