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

  try {
    const data = await fetchJson(url.toString(), fetchOptions);

    specimens.push(...data.records.map(subsetFields));

    if (data.offset) {
      url.searchParams.set("offset", data.offset);

      const offsetData = await fetchJson(url.toString(), fetchOptions);

      specimens.push(...offsetData.records.map(subsetFields));
    }

    return specimens;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const specimens = await getSpecimens();

  return (
    <>
      <header className="px-container flex justify-center py-16">
        <h1 className="sr-only">Type Specimens</h1>

        <div className="inline-flex flex-col">
          <Logo className="mb-[-5%] max-w-full" />

          <p className="ml-[21%] text-lg leading-5 tracking-[.015em]">
            Curated from around the web by&nbsp;
            <a className="underline" href="https://johndjameson.com/">
              John&nbsp;D.&nbsp;Jameson
            </a>
          </p>
        </div>
      </header>

      <main className="px-container">
        <h2 className="sr-only">Specimens</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-6">
          {specimens.map(({ id, name, url, slug }, index) => (
            <div className="flex flex-col items-center" key={id}>
              <a
                className="mb-2 block bg-slate-50 p-0.5 shadow shadow-slate-950"
                href={url}
                tabIndex={-1}
              >
                <img
                  alt={name}
                  className="w-full"
                  height={225}
                  loading={index >= 4 ? "lazy" : "eager"} // Prioritize loading first 4 images
                  src={imageKitUrl({
                    path: `${slug}.jpg`,
                    transformations: { f: "auto" },
                  })}
                  width={300}
                />
              </a>

              <a className="block text-xs" href={url}>
                {name}
              </a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
