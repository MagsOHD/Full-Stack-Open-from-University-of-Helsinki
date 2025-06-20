import NumberLine from './NumberLine';

const Numbers = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <NumberLine key={person.id+'abc'} person={person} deletePerson={() => deletePerson(person.id)}/>
      ))}
    </ul>
  );
}

export default Numbers;