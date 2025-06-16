import { useState } from 'react'
import Numbers from './components/Numbers'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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