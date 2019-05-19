import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const Contacts = (props) => {
    let i = 0
    return props.persons.map ( person => 
        <Contact name={person.name} key={i++}/>
    )
    }

const Contact = (props) => (
    <p>
        {props.name}
    </p>
)

const addPerson = (event) => {
  event.preventDefault()
  setPersons(persons.concat({name: newName}))
  setNewName('')
}


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
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