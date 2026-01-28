import Languages from "./Languages";
import Weather from "./Weather";

const DetailedCountry = ({ country }) => {
    if (!country) {
        return <p>No country data available</p>;
    }
    console.log('Rendering detailed view for country:', country);
    const { name, capital, area, languages, flags } = country;

    return (
        <div className="detailed-country">
            <h2>{name.common}</h2>
            <img src={flags.png} alt={`Flag of ${name.common}`} />
            <p>Capital: {capital ? capital[0] : 'N/A'}</p>
            <p>Area: {area} km²</p>
            <Languages list={Object.values(languages)} />
            <Weather country={country} />
        </div>
    );
}

export default DetailedCountry;