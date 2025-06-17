import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

    setFilteredPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredPersons(filteredPersons)
  }

  const hook = () => {
    axios.get('http://localhost:3001/persons')
         .then(response => {
           setPersons(response.data)
           setFilteredPersons(response.data)
         })
  }

  useEffect(hook, []);

  return (
    <div>
      <PersonFilter value={newFilter} handler={handleFilterChange} />
      <h2>Phonebook</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App