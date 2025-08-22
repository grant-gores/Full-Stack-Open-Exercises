const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} pattern="[a-zA-Z\s]+" required />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} pattern="[0-9\-]+" required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm