const CountryLine = ({name, buttonClick}) => {
    return (
        <li className="country-line">
            {name}
            <button className="show-button" onClick={buttonClick}>show</button>
        </li>
    );
}

export default CountryLine;