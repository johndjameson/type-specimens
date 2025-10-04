import { Hono } from "hono";
import Logo from "./components/Logo/Logo";
import { fetchJson, imageKitUrl } from "./helpers";

type Bindings = {
  AIRTABLE_ID: string;
  AIRTABLE_KEY: string;
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

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

async function getSpecimens(
  airtableId: string,
  airtableKey: string,
): Promise<Specimen[]> {
  const specimens: Specimen[] = [];

  const fetchOptions = {
    credentials: "include" as RequestCredentials,
    headers: {
      Authorization: `Bearer ${airtableKey}`,
    },
  };

  const url = new URL(`https://api.airtable.com/v0/${airtableId}/specimens`);

  url.searchParams.set("filterByFormula", `AND(Status='Published')`);
  url.searchParams.set("sortField", "Slug");

  try {
    const data = await fetchJson(url.toString(), fetchOptions);

    if (data && data.records) {
      specimens.push(...data.records.map(subsetFields));

      if (data.offset) {
        url.searchParams.set("offset", data.offset);

        const offsetData = await fetchJson(url.toString(), fetchOptions);

        if (offsetData && offsetData.records) {
          specimens.push(...offsetData.records.map(subsetFields));
        }
      }
    }

    return specimens;
  } catch (error) {
    console.log(error);
    return [];
  }
}

app.get("/", async (context) => {
  const specimens = await getSpecimens(
    context.env.AIRTABLE_ID,
    context.env.AIRTABLE_KEY,
  );

  return context.html(
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2e5094" />
        <title>Type Specimens</title>
        <meta
          name="description"
          content="A collection of the web's best typeface specimens. Curated by John D. Jameson"
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-blue-900 pb-14 text-blue-100 underline-offset-4 md:pb-24">
        <header class="px-container flex justify-center py-16">
          <h1 class="sr-only">Type Specimens</h1>

          <div class="inline-flex flex-col">
            <Logo className="mb-[-5%] max-w-full" />

            <p class="ml-[21%] text-lg leading-5 tracking-[.015em]">
              Curated from around the web by&nbsp;
              <a class="underline" href="https://johndjameson.com/">
                John&nbsp;D.&nbsp;Jameson
              </a>
            </p>
          </div>
        </header>

        <main class="px-container">
          <h2 class="sr-only">Specimens</h2>

          <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-6">
            {specimens.map(({ id, name, url, slug }, index) => (
              <div class="flex flex-col items-center" key={id}>
                <a
                  class="mb-2 block bg-slate-50 p-0.5 shadow shadow-slate-950"
                  href={url}
                  tabIndex={-1}
                >
                  <img
                    alt={name}
                    class="w-full"
                    height={225}
                    loading={index >= 4 ? "lazy" : "eager"}
                    src={imageKitUrl({
                      path: `${slug}.jpg`,
                      transformations: { f: "auto" },
                    })}
                    width={300}
                  />
                </a>

                <a class="block text-xs" href={url}>
                  {name}
                </a>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>,
  );
});

export default app;
