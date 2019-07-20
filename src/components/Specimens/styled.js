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
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -40px;
  margin-left: -40px;
`

export const SpecimenBase = styled.div`
  padding-left: 40px;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 50%;
  }

  @media screen and (min-width: 900px) {
    width: calc(100% / 3);
  }

  @media screen and (min-width: 1300px) {
    width: 25%;
  }

  @media screen and (min-width: 1700px) {
    width: 20%;
  }
`

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
  line-height: 40px;
  text-align: center;
`

export const Link = styled(ExternalLink)`
  &:hover {
    text-decoration: underline;
  }
`
