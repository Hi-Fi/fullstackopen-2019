import React from 'react'

const Contact = (props) => (
  <p>
      {props.name} - {props.number} - <button onClick={() => {props.deleteCall(props.id)}}>Poista</button>
  </p>
) 

export default Contact