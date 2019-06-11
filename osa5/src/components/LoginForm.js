import React from 'react'

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

   export default LoginForm