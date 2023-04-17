const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });


const { MongoClient } = require('mongodb');
const countries = require('./countries.json');

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const MONGODB_DB = process.env.MONGODB_DB ?? "";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

async function seedDatabase() {
  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);
  const countriesCollection = db.collection('countries');

  // Clear the collection before seeding
  await countriesCollection.deleteMany({});

  // Insert the country data
  await countriesCollection.insertMany(countries);

  console.log('Database seeded successfully');
  await client.close();
}

seedDatabase();
