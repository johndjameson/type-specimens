import Hidden from 'components/Hidden/Hidden';
import InlineSvg from 'components/InlineSvg/InlineSvg';
import { fetchJson } from 'helpers';

function Home({ specimens }) {
  return (
    <>
      <section className="ts-c-hero">
        <Hidden as="h1">Type Specimens</Hidden>

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
        <Hidden as="h2">Specimens</Hidden>

        {specimens.map((specimen) => (
          <div key={specimen.id} style={{ marginBottom: '40px' }}>
            <p>{specimen.name}</p>
            <p>{specimen.slug}</p>
            <p>{specimen.url}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchJson(
    `${process.env.TYPE_SPECIMENS_URL_ORIGIN}/api/specimens`
  );

  return {
    props: {
      specimens: data,
    },
  };
};

export default Home;
