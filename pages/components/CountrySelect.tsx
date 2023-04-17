import React, { useState } from 'react';
import styles from '../../styles/CountrySelect.module.css';

interface CountrySelectorProps {
  countries: string[];
  onSubmit: (selectedCountries: [string, string]) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, onSubmit }) => {
  const [selectedCountries, setSelectedCountries] = useState<[string, string]>(['', '']);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newSelectedCountries = [...selectedCountries];
    newSelectedCountries[index] = event.target.value;
    setSelectedCountries(newSelectedCountries as [string, string]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedCountries);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.selectorContainer}>
        {selectedCountries.map((selectedCountry, index) => (
          <div key={index} className={styles.countrySelect}>
            <select value={selectedCountry} onChange={(e) => handleChange(e, index)} className={styles.select}>
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country} disabled={selectedCountries.includes(country) && selectedCountry !== country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button type="submit" className={styles.submitButton} disabled={selectedCountries.includes('')}>
        Submit
      </button>
    </form>
  );
};

export default CountrySelector;