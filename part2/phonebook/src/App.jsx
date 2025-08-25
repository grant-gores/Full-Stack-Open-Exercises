import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Title from './components/Title'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const nameObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )

      if (confirmReplace) {
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id === existingPerson.id ? response.data : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been moved from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setAddedMessage(`Added ${newName}`)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
    }
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteRecord = id => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (!confirmed) return alert(`${person.name} not deleted`)

    personService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      setErrorMessage(
        `Information of '${person.name}' has already been moved from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      <Title text={"Phonebook"}/>
      <Notification message={addedMessage} type="success"/>
      <Notification message={errorMessage}type="error"/>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <Title text={"add a new"}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Title text={"Numbers"}/>
      <Persons persons={filteredPersons} deleteRecord={deleteRecord}/>
    </div>
  )
}

export default App