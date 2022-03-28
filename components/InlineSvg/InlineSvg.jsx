import React, { useEffect, useRef, useState } from 'react';
import { fetchText, parseSvg } from 'helpers';

function InlineSvg({ alt, height, src, width, ...moreProps }) {
  const [svgData, setSvgData] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    fetchText(src).then((text) => {
      setSvgData(parseSvg(text));
    });
  }, [src]);

  return svgData ? (
    <svg
      {...svgData.attributes}
      dangerouslySetInnerHTML={{ __html: svgData.content }}
      height={height}
      title={alt}
      width={width}
      {...moreProps}
    />
  ) : (
    // Use <img> to start loading during HTML parse, then replace with <svg>
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} height={height} ref={imgRef} src={src} width={width} />
  );
}

InlineSvg.defaultProps = {
  alt: '',
};

export default InlineSvg;
