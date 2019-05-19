import React, { useState } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Contacts from './components/contacts'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


const addPerson = (event) => {
  event.preventDefault()
  if (persons.some(e => e.name === newName)) {
    alert(`${newName} on jo luettelossa`)
  } else {
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }
}


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h2>Lisää uusi</h2>
      <PersonForm name={newName} number={newNumber} nameOnChange={(event) => setNewName(event.target.value)} numberOnChange={(event) => setNewNumber(event.target.value)} onClick={addPerson}/>
      <h2>Numerot</h2>
      <Contacts persons={persons} filter={filter}/>
    </div>
  )

}

export default App