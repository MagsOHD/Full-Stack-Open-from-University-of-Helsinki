const NumberLine = ({ person }) => {
    return (
        <li>
            <span className="number">{person.name} {person.number}</span>
        </li>
    );
}

export default NumberLine;