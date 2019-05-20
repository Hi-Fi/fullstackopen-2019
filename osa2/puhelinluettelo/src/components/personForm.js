import React from 'react'

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

export default PersonForm