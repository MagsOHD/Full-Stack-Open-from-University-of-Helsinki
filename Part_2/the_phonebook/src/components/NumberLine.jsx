const NumberLine = ({ person, deletePerson }) => {
    return (
        <li>
            <span className="number">{person.name} {person.number}</span>
            <button onClick={deletePerson}>delete</button>
        </li>
    );
}

export default NumberLine;