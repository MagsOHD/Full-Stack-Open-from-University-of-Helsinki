import NumberLine from './NumberLine';

const Numbers = ({ persons }) => {
    console.log('Rendering Numbers component with persons:', persons);
  return (
    <ul>
      {persons.map((person, index) => (
        <NumberLine key={person.name} person={person.name} />
      ))}
    </ul>
  );
}

export default Numbers;