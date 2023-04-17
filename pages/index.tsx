import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import CountrySelector from './components/CountrySelect';
import CountryCard from './cards/CountryCard';
import { useState } from 'react';

const countries = [
  'Serbia',
  'Crna Gora',
  'Greece',
  'Romania',
  'Slovenia',
  'Bosnia',
  'Bulgaria',
  "Hungary",
  'Macedonia',
  "Turkey",
  'Croatia',
  'Albania',
];

export default function Home() {
  const [countryData, setCountryData] = useState<{ [key: string]: CountryData }>({});

  const handleCountrySelection = async (selectedCountries: [string, string]) => {
    const fetchedData: { [key: string]: CountryData } = {};
  
    for (const country of selectedCountries) {
      const response = await fetch(`/api/country?countryName=${country}`);
      if (response.status === 200) {
        const data = await response.json();
        // Remove the _id field before adding the data to fetchedData object
        const { _id, ...rest } = data.countryData;
        fetchedData[country] = rest;
      } else {
        console.error(`Failed to fetch data for country: ${country}`);
      }
    }
  
    setCountryData(fetchedData);
  };

  return (
    <div>
      <Head>
        <title>RUSI</title>
        <meta name="description" content="Compare states" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>RUSI Country Comparison</h1>
          <p className={styles.description}>
            Compare security-related information on selected countries to gain insights into their strengths and challenges. Choose two countries and see their data side-by-side.
          </p>
          <CountrySelector countries={countries} onSubmit={handleCountrySelection} />
          <div className={styles.cardsContainer}>
            {Object.entries(countryData).map(([name, data]) => (
              <CountryCard key={name} data={data} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}