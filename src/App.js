import React, { useEffect, useState } from 'react'
import { fetchJson } from 'common/helpers'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'common/styles/global.css'
import Specimens from 'components/Specimens'
import Row from 'common/components/Row'
import Hero from 'components/Hero'

const specimensUrl = '/.netlify/functions/specimens'

function App() {
  const [specimens, setSpecimens] = useState([])

  useEffect(() => {
    const handleResponse = json => {
      setSpecimens(s => [...s, ...json.records])

      if ('offset' in json) {
        fetchJson(`${specimensUrl}?offset=${json.offset}`).then(handleResponse)
      }
    }

    fetchJson(specimensUrl).then(handleResponse)
  }, [])

  return (
    <>
      <Row>
        <Hero />
      </Row>

      <Row as='main'>
        <Specimens specimens={specimens} />
      </Row>
    </>
  )
}

export default App
