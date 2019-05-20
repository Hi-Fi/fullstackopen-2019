import React from 'react'

const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="info">
        {message}
      </div>
    )
  }

  export default Notification