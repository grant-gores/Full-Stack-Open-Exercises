import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Title from './components/Title'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

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
    const isDuplicate = persons.some(person => person.name === newName)

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
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
    const changedPerson = { ...person}
    if (!person) return

    const confirmed = window.confirm(`Delete ${changedPerson.name}?`)
    if (!confirmed) return alert(`${changedPerson.name} not deleted`)

    personService
    .deletePerson(id, changedPerson)
    .then(response => {
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      alert(
        `the Person '${person.content}' was already deleted from the server`
      )
    })
  }

  return (
    <div>
      <Title text={"Phonebook"}/>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <Title text={"add a new"}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Title text={"Numbers"}/>
      <Persons persons={filteredPersons} deleteRecord={deleteRecord}/>
    </div>
  )
}

export default App