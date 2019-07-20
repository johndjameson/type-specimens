import React, { useState, useEffect } from 'react'
import { fetchText, parseSvg } from 'common/helpers'

function InlineSvg(props) {
  const [markup, setMarkup] = useState(null)
  const [viewBox, setViewBox] = useState(null)

  useEffect(() => {
    fetchText(props.src).then(text => {
      const { markup, viewBox } = parseSvg(text)

      setMarkup(markup)
      setViewBox(viewBox)
    })
  }, [props.src])

  return (
    <svg
      dangerouslySetInnerHTML={{ __html: markup }}
      viewBox={viewBox}
      {...props}
    />
  )
}

export default InlineSvg
