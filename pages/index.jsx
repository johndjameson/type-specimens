import Head from 'next/head';
import InlineSvg from 'components/InlineSvg/InlineSvg';
import VisuallyHidden from 'components/VisuallyHidden/VisuallyHidden';
import { fetchJson, imageKitUrl } from 'helpers';

function Home({ specimens }) {
  return (
    <>
      <Head>
        <title>Type Specimens</title>
      </Head>

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

const subsetFields = (record) => ({
  id: record.id,
  name: record.fields.Name,
  slug: record.fields.Slug,
  url: record.fields.URL,
});

export const getStaticProps = async () => {
  const specimens = [];

  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_ID}/specimens`
  );

  url.searchParams.set('api_key', process.env.AIRTABLE_KEY ?? '');
  url.searchParams.set('filterByFormula', `AND(Status='Published')`);
  url.searchParams.set('sortField', 'Slug');

  const data = await fetchJson(url.toString());

  specimens.push(...data.records.map(subsetFields));

  if (data.offset) {
    url.searchParams.set('offset', data.offset);

    const offsetData = await fetchJson(url.toString());

    specimens.push(...offsetData.records.map(subsetFields));
  }

  return {
    props: {
      specimens,
    },
  };
};

export default Home;
