import React, { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Contacts from './components/contacts'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then (response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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