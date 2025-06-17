import NumberLine from './NumberLine';

const Numbers = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <NumberLine key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
      ))}
    </ul>
  );
}

export default Numbers;