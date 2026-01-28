import CountryLine from "./CountryLine"
import DetailedCountry from "./DetailedCountry"
const Countries = ({list, buttonClick}) => {
    if (!list || list.length === 0) {
        return <p>No countries found</p>
    }else if (list.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (list.length === 1) {
        const country = list[0];
        return (
            <div>
                <DetailedCountry country={country} />
            </div>
        );
    }
    return (
        <ul>
            {list.map((country) => (
                console.log('Rendering country:', country),
                <CountryLine key={country.name.common} name={country.name.common} buttonClick={() => buttonClick(country.name.common)}/>
            ))}
        </ul>
    )
}

export default Countries;