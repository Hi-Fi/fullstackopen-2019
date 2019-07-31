import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {
    return (<div>
    <h2>log in to application</h2>
    <form onSubmit={handleSubmit}>
      <div>
      käyttäjätunnus: <input value={username} 
                            onChange={handleUsernameChange}
                            name="Username"/>
      </div>
      <div>
      salasana: <input type="password" 
                      value={password} 
                      name="Password"
                      onChange={handlePasswordChange}/>
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
    )
   }

   LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

   export default LoginForm