const Persons = ({ persons, deleteRecord}) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <li className='person' key={index}>
          {person.name} {person.number} <button onClick={() => deleteRecord(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons