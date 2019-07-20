import React, { useEffect, useState } from 'react'
import { fetchJson } from 'common/helpers'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'common/styles/global.css'

const recordsUrl =
  'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=key3GGb7zxleGAfHl&sortField=Slug&filterByFormula=AND(Status=%27Published%27)'

function App() {
  const [specimens, setSpecimens] = useState([])

  useEffect(() => {
    const handleResponse = json => {
      setSpecimens(s => [...s, ...json.records])

      if ('offset' in json) {
        fetchJson(`${recordsUrl}&offset=${json.offset}`).then(handleResponse)
      }
    }

    fetchJson(recordsUrl).then(handleResponse)
  }, [])

  return (
    <header>
      {specimens.length > 0 &&
        specimens.map(specimen => (
          <div key={specimen.id}>
            <img
              alt={specimen.fields.Name}
              src={specimen.fields.Screenshots[0].url}
            />
          </div>
        ))}
    </header>
  )
}

export default App
