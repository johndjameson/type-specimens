import type { NextApiRequest, NextApiResponse } from 'next';

type Record = {
  fields: {
    Name: string;
    Slug: string;
    URL: string;
  };
  id: string;
};

// Reduce response size to 20% of original
const subsetFields = (record: Record) => ({
  id: record.id,
  name: record.fields.Name,
  slug: record.fields.Slug,
  url: record.fields.URL,
});

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const records = [];

  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_ID}/specimens`
  );

  url.searchParams.set('api_key', process.env.AIRTABLE_KEY ?? '');
  url.searchParams.set('filterByFormula', `AND(Status='Published')`);
  url.searchParams.set('sortField', 'Slug');

  const response = await fetch(url.toString());

  const data = await response.json();

  records.push(...data.records.map(subsetFields));

  if (data.offset) {
    url.searchParams.set('offset', data.offset);

    const offsetResponse = await fetch(url.toString());

    const offsetData = await offsetResponse.json();

    records.push(...offsetData.records.map(subsetFields));
  }

  res.status(200).json(records);
}
