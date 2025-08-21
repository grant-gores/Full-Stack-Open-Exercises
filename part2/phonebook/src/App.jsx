import { useState } from 'react'
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number:'040-1234567'}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const addName = (event) => {
  event.preventDefault()

  const nameObject = { name: newName, number: newNumber }
  const isDuplicate = persons.some(person => person.name === newName)

  if (isDuplicate) {
    alert(`${newName} is already added to phonebook`)
  } else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange} pattern="[a-zA-Z\s]+" required/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} pattern="[0-9\-]+" required/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map((person, index) =>
          <li key={index}>{person.name} {person.number}</li>
          )}
        </ul>
    </div>
  )
}

export default App