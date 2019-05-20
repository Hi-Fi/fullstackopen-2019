import React from 'react'
import Contact from './contact'

const Contacts = (props) => {
  return props.persons.filter ( person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map ( person => 
      <Contact name={person.name} number={person.number} key={person.id} id={person.id} deleteCall={props.deleteCall}/>
  )
}

export default Contacts