import React, { useState } from 'react'

const Filter = (props) => (
  <div>
    Rajaa näytettäviä: <input value={props.value} onChange={props.onChange}/>
  </div>
)



const Contacts = (props) => {
  let i = 0
  return props.persons.filter ( person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map ( person => 
      <Contact name={person.name} number={person.number} key={i++}/>
  )
}

const Contact = (props) => (
  <p>
      {props.name} - {props.number}
  </p>
) 

const PersonForm = (props) => (
  <form>
        <div>
          nimi: <input value={props.name} onChange={props.nameOnChange}/>
        </div>
        <div>numero: <input value={props.number} onChange={props.numberOnChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.onClick}>lisää</button>
        </div>
      </form>
)

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