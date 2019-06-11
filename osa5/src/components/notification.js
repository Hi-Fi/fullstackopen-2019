import React from 'react'

const Notification = (message, level) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={level}>
        {message}
      </div>
    )
  }

  export default Notification