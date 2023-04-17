import styles from '../../styles/CountryCard.module.css';

interface CountryCardProps {
  data?: CountryData;
}

const camelCaseToNormalCase = (text: string) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const CountryCard: React.FC<CountryCardProps> = ({ data }) => {
  if (!data) {
    return <div className={styles.card}>Loading...</div>;
  }

  const { name, ...categories } = data;

  return (
    <div className={styles.card}>
      <h2 className={styles.headerTwo}>{name}</h2>
      {Object.entries(categories).map(([key, value]) => (
        <div className={styles.category} key={key}>
          <h3 className={styles.headerThree}>{camelCaseToNormalCase(key)}</h3>
          <p className={styles.paragraph}>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryCard;