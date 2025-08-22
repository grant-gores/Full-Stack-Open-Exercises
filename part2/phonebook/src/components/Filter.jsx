const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
    <div>
      filter shown with: <input value={searchTerm} onChange={handleSearchTerm} required />
    </div>
  )
}

export default Filter