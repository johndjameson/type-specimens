import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchJson } from 'helpers';

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

  const data = await fetchJson(url.toString());

  records.push(...data.records.map(subsetFields));

  if (data.offset) {
    url.searchParams.set('offset', data.offset);

    const offsetData = await fetchJson(url.toString());

    records.push(...offsetData.records.map(subsetFields));
  }

  res.status(200).json(records);
}
