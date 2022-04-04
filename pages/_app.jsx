import Head from 'next/head';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'styles/base.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link rel="preconnect" href="https://ik.imagekit.io" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#2e5094" />
        <meta
          content="A collection of the web’s best typeface specimens. Curated by John D. Jameson"
          name="description"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default App;
