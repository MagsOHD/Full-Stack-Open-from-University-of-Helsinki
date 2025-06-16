const NumberLine = ({ person }) => {
    console.log('Rendering NumberLine component with person:', person);
    return (
        <li>
            <span className="number">{person}</span>
        </li>
    );
}

export default NumberLine;