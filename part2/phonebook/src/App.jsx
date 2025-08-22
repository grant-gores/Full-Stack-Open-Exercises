import { useState } from 'react'

const Title = (props) => {
  return (<h2>{props.text}</h2>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

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
  );

  return (
    <div>
      <Title text={"Phonebook"}/>
      <div> filter show with: <input value={searchTerm} onChange={handleSearchTerm} required/> </div>
      <Title text={"add a new"}/>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange} pattern="[a-zA-Z\s]+" required/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} pattern="[0-9\-]+" required/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <Title text={"Numbers"}/>
        <ul>
          {filteredPersons.map((person, index) =>
          <li key={index}>{person.name} {person.number}</li>
          )}
        </ul>
    </div>
  )
}

export default App