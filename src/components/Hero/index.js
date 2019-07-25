import React from 'react'
import Hidden from 'common/components/Hidden'
import { Base, Image, Link, Logo, Text } from './styled'
import logo from './logo-type-specimens.svg'

function Hero({ specimens }) {
  return (
    <Base>
      <Logo>
        <Hidden as='h1'>Type Specimens</Hidden>
        <Image height={174} src={logo} width={593} />

        <Text>
          Curated from around the web by&nbsp;
          <Link href='https://johndjameson.com/'>
            John&nbsp;D.&nbsp;Jameson
          </Link>
        </Text>
      </Logo>
    </Base>
  )
}

export default Hero
