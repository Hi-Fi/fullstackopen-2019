import React, { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Contacts from './components/contacts'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      let person = {...persons.filter( person => person.name === newName)[0], name: newName, number: newNumber}
      let id = person.id
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .updatePerson(person)
          .then( response => {
            setPersons(persons.map(person => person.id === id ? response.data : person))
            setNewName('')
            setNewNumber('')
            setInfoMessage(
              `Päivitettiin henkilön ${person.name} puhelinnumero`
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 3000)
          })
          .catch ( error => {
            setPersons(persons.filter( person => person.id !== id))
            setErrorMessage(
              `Henkilö ${person.name} oli jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then (response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setInfoMessage(
            `Lisättiin ${response.data.name}`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
    }
  }

  const deletePerson = (id) => {
    let person = persons.filter( person => person.id === id)[0]
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then( response => {
          setPersons(persons.filter( person => person.id !== id))
          setInfoMessage(
            `Poistettiin henkilö ${person.name}`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={infoMessage} className="info"/>
      <Notification message={errorMessage} className="error"/>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h2>Lisää uusi</h2>
      <PersonForm name={newName} number={newNumber} nameOnChange={(event) => setNewName(event.target.value)} numberOnChange={(event) => setNewNumber(event.target.value)} onClick={addPerson}/>
      <h2>Numerot</h2>
      <Contacts persons={persons} filter={filter} deleteCall={deletePerson}/>
    </div>
  )

}

export default App