import Logo from "../components/Logo/Logo";
import { fetchJson, imageKitUrl } from "../helpers";

interface Specimen {
  id: string;
  name: string;
  slug: string;
  url: string;
}

const subsetFields = (record: any): Specimen => ({
  id: record.id,
  name: record.fields.Name,
  slug: record.fields.Slug,
  url: record.fields.URL,
});

const fetchOptions = {
  credentials: "include" as RequestCredentials,
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
  },
};

async function getSpecimens(): Promise<Specimen[]> {
  const specimens: Specimen[] = [];

  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_ID}/specimens`,
  );

  url.searchParams.set("filterByFormula", `AND(Status='Published')`);
  url.searchParams.set("sortField", "Slug");

  const data = await fetchJson(url.toString(), fetchOptions);

  specimens.push(...data.records.map(subsetFields));

  if (data.offset) {
    url.searchParams.set("offset", data.offset);

    const offsetData = await fetchJson(url.toString(), fetchOptions);

    specimens.push(...offsetData.records.map(subsetFields));
  }

  return specimens;
}

export default async function Home() {
  const specimens = await getSpecimens();

  return (
    <>
      <header className="ts-c-hero">
        <h1 className="sr-only">Type Specimens</h1>

        <div className="ts-c-hero__logo">
          <Logo />

          <p className="ts-c-hero__text">
            Curated from around the web by&nbsp;
            <a className="ts-c-link" href="https://johndjameson.com/">
              John&nbsp;D.&nbsp;Jameson
            </a>
          </p>
        </div>
      </header>

      <main>
        <h2 className="sr-only">Specimens</h2>

        <div className="ts-c-gallery">
          {specimens.map(({ id, name, url, slug }, index) => (
            <div className="ts-c-specimen" key={id}>
              <a className="ts-c-specimen__thumb" href={url} tabIndex={-1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={name}
                  className="ts-c-specimen__img"
                  height={225}
                  loading={index >= 4 ? "lazy" : "eager"} // Prioritize loading first 4 images
                  src={imageKitUrl({
                    path: `${slug}.jpg`,
                    transformations: { f: "auto" },
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
      </main>
    </>
  );
}
