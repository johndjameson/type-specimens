import React from 'react'
import ExternalLink from 'common/components/ExternalLink'
import InlineSvg from 'common/components/InlineSvg'
import logo from './logo-type-specimens.svg'

function Hero({ specimens }) {
  return (
    <header>
      <div>
        <div>
          <h1>Type Specimens</h1>
          <InlineSvg height={174} src={logo} width={593} />
          <p>
            Curated from around the web by&nbsp;
            <ExternalLink href='https://johndjameson.com/'>
              John&nbsp;D.&nbsp;Jameson
            </ExternalLink>
          </p>
        </div>
      </div>
    </header>
  )
}

export default Hero
