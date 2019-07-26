import React from 'react'
import Hidden from 'common/components/Hidden'
import logo from './logo-type-specimens.svg'
import * as Styled from './styled'

function Hero({ specimens }) {
  return (
    <Hero.Base>
      <Hero.Logo>
        <Hidden as='h1'>Type Specimens</Hidden>
        <Hero.Image height={174} src={logo} width={593} />

        <Hero.Text>
          Curated from around the web by&nbsp;
          <Hero.Link href='https://johndjameson.com/'>
            John&nbsp;D.&nbsp;Jameson
          </Hero.Link>
        </Hero.Text>
      </Hero.Logo>
    </Hero.Base>
  )
}

Hero.Base = Styled.Base
Hero.Image = Styled.Image
Hero.Link = Styled.Link
Hero.Logo = Styled.Logo
Hero.Text = Styled.Text

export default Hero
