import NumberLine from './NumberLine';

const Numbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <NumberLine key={person.name} person={person} />
      ))}
    </ul>
  );
}

export default Numbers;