import React from 'react'

const Filter = (props) => (
    <div>
      Rajaa näytettäviä: <input value={props.value} onChange={props.onChange}/>
    </div>
  )

export default Filter