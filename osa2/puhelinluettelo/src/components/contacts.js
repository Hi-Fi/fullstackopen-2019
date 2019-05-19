import React from 'react'
import Contact from './contact'

const Contacts = (props) => {
  let i = 0
  return props.persons.filter ( person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map ( person => 
      <Contact name={person.name} number={person.number} key={i++}/>
  )
}

export default Contacts