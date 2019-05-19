import React, { useState } from 'react'

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

  const Contacts = (props) => {
    let i = 0
    return props.persons.filter ( person => person.name.toLowerCase().includes(filter.toLowerCase())).map ( person => 
        <Contact name={person.name} number={person.number} key={i++}/>
    )
  }

const Contact = (props) => (
    <p>
        {props.name} - {props.number}
    </p>
)

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
      <div>
          Rajaa näytettäviä: <input value={filter} onChange={(event) => setFilter(event.target.value)}/>
        </div>
      <h2>Lisää uusi</h2>
      <form>
        <div>
          nimi: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>numero: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <Contacts persons={persons} />
    </div>
  )

}

export default App