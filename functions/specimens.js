const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const { AIRTABLE_KEY } = process.env

  try {
    const params = new URLSearchParams()
    const url = 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens'

    params.set('api_key', AIRTABLE_KEY)
    params.set('sortField', 'Slug')
    params.set('filterByFormula', `AND(Status='Published')`)

    if (event.queryStringParameters.offset) {
      params.set('offset', event.queryStringParameters.offset)
    }

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }

    const data = await response.json()

    return {
      body: JSON.stringify(data),
      statusCode: 200,
    }
  } catch (err) {
    console.log(err)

    return {
      body: JSON.stringify({ msg: err.message }),
      statusCode: 500,
    }
  }
}
