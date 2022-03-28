import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta name="theme-color" content="#2e5094" />
        <meta
          content="A collection of the web’s best typeface specimens. Curated by John D. Jameson."
          name="description"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
