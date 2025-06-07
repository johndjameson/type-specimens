'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fetchText, parseSvg } from '../../helpers';

interface InlineSvgProps extends React.SVGProps<SVGSVGElement> {
  alt?: string;
  height?: string | number;
  src: string;
  width?: string | number;
}

function InlineSvg({ alt = '', height, src, width, ...moreProps }: InlineSvgProps) {
  const [svgData, setSvgData] = useState<{ attributes: { [key: string]: string }; content: string } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
    <img
      alt={alt}
      height={height}
      ref={imgRef}
      src={src}
      width={width}
      {...moreProps}
    />
  );
}

export default InlineSvg;