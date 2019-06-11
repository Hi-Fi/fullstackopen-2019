import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const makeLogin = async (event) => {
    event.preventDefault()
    try {
      let user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch(exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const makeLogout = (event) => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <input onClick={makeLogout} type="button" value="logout" />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      {errorMessage && <div className="error">
        {errorMessage}
      </div>}
      <form onSubmit={makeLogin}>
        <div>
        käyttäjätunnus: <input value={username} 
                              onChange={({ target }) => setUsername(target.value)}
                              name="Username"/>
        </div>
        <div>
        salasana: <input type="passord" 
                        value={password} 
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  return (
    <div>
      {user === null ? 
        loginView() :
        blogView() }
    </div>
  )
}

export default App