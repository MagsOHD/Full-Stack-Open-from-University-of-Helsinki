import { useEffect, useState, StrictMode } from 'react'
import phonebookService from './services/phonebookService'
import Numbers from './components/Numbers'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import axios from 'axios';
import './style/index.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notifMessage, setNotifMessage] = useState([]);
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
          setPersons(prevPersons => prevPersons.map(person => person.name !== newName ? person : returnedPerson))
          setFilteredPersons(prevFiltered => prevFiltered.map(person => person.name !== newName ? person : returnedPerson))
          setNotifMessage({ txt: `Updated ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        }).catch(error => {
          setNotifMessage({ txt: `Information of ${newName} has already been removed from server`, type: 'error' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        })
    } else {
      phonebookService.create(personObject)
        .then(returnedPerson => {
          setPersons(prevPersons => prevPersons.concat(returnedPerson))
          setFilteredPersons(prevFiltered => prevFiltered.concat(returnedPerson))
          setNotifMessage({ txt: `Added ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        })
        .catch(error => {
          setNotifMessage({ txt: `Failed to add ${newName}. Please try again later.`, type: 'error' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        })
    }

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
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
          setFilteredPersons(prevFiltered => prevFiltered.filter(person => person.id !== id))
          setNotifMessage({ txt: 'Person deleted successfully', type: 'success' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        })
        .catch(error => {
          setNotifMessage({ txt: `Failed to delete person. Please try again later.`, type: 'error' });
          setTimeout(() => {
            setNotifMessage([]);
          }, 3000);
        });
    }
  }

  useEffect(() => {
    phonebookService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    }).catch(error => {
      setNotifMessage({ txt: 'Failed to fetch phonebook data. Please try again later.', type: 'error' });
      setTimeout(() => {
        setNotifMessage([]);
      }, 3000);

    })
  }, []);

  return (
      <div>
        <Notification message={notifMessage.txt} type={notifMessage.type} />
        <PersonFilter value={newFilter} handler={handleFilterChange} />
        <h2>Phonebook</h2>
        <PersonForm
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleSubmit} />
        <h2>Numbers</h2>
        <Numbers persons={filteredPersons} deletePerson={deletePerson} />
      </div>
  )
}

export default App