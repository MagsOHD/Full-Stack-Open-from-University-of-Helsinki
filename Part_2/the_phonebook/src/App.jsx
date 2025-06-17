import { useEffect, useState } from 'react'
import phonebookService from './services/phonebookService'
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

    if (persons.find(person => person.name === newName)) {
      confirm(`${newName} is already added to phonebook replace the old number with a new one?`) &&
        phonebookService.update(persons.find(person => person.name === newName).id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setFilteredPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
        }).catch(error => {
          console.error('Error updating person:', error);
          alert('Failed to update person. Please try again later.');
        })
    } else {
      phonebookService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.error('Error adding person:', error);
          alert('Failed to add person. Please try again later.');
        })
    }
    setPersons(persons.concat(personObject))
    setFilteredPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
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

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      phonebookService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          alert('Failed to delete person. Please try again later.');
        })
    }
  }

  useEffect(() => {
    phonebookService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    }).catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data from the server. Please try again later.');
    })
  }, []);

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
      <Numbers persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App