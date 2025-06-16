const NumberLine = ({ person }) => {
    console.log('Rendering NumberLine component with person:', person);
    return (
        <li>
            <span className="number">{person.name} {person.number}</span>
        </li>
    );
}

export default NumberLine;