import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb' 

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const MONGODB_DB = process.env.MONGODB_DB ?? "";

async function connect() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  return { client, db };
}

async function fetchCountryData(countryName:string) {
  const { client, db } = await connect();
  const countriesCollection = db.collection('countries');

  const countryData = await countriesCollection.findOne<CountryData>({ name: countryName });

  await client.close();

  return countryData;
}

type Data = {
  countryData?: CountryData;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const countryData = await fetchCountryData(req.query.countryName as string);
  if(countryData) {
  res.status(200).json({countryData: countryData})
  } else {
    res.status(404).json({error: 'Country not found'})
  }
}
