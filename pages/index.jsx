import VisuallyHidden from 'components/VisuallyHidden/VisuallyHidden';
import InlineSvg from 'components/InlineSvg/InlineSvg';
import { fetchJson, imageKitUrl } from 'helpers';

function Home({ specimens }) {
  return (
    <>
      <section className="ts-c-hero">
        <VisuallyHidden as="h1">Type Specimens</VisuallyHidden>

        <div className="ts-c-hero__logo">
          <InlineSvg
            className="ts-c-hero__media"
            height={174}
            src={'/logo-type-specimens.svg'}
            width={593}
          />

          <p className="ts-c-hero__text">
            Curated from around the web by&nbsp;
            <a className="ts-c-link" href="https://johndjameson.com/">
              John&nbsp;D.&nbsp;Jameson
            </a>
          </p>
        </div>
      </section>

      <section>
        <VisuallyHidden as="h2">Specimens</VisuallyHidden>

        <div className="ts-c-gallery">
          {specimens.map(({ id, name, url, slug }) => (
            <div className="ts-c-specimen" key={id}>
              <a className="ts-c-specimen__thumb" href={url} tabIndex="-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={name}
                  className="ts-c-specimen__img"
                  height={225}
                  loading="lazy"
                  src={imageKitUrl({
                    path: `${slug}.jpg`,
                    transformations: { f: 'auto' },
                  })}
                  width={300}
                />
              </a>

              <a className="ts-c-specimen__link" href={url}>
                {name}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchJson(`${process.env.VERCEL_URL}/api/specimens`);

  return {
    props: {
      specimens: data,
    },
  };
};

export default Home;
