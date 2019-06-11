import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      storedUser = JSON.parse(storedUser)
      setUser(storedUser)
      blogService.setToken(storedUser.token)
    }
  }, [])

  const nofifyUser = (message, level) => {
      setNotification({ message, level })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      let blog = await blogService.submitNew({title, author, url})
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      let errorMessage = exception.response ? exception.response.data : exception.message
      nofifyUser(errorMessage, "error")
  }
}

  const makeLogin = async (event) => {
    event.preventDefault()
    try {
      let user = await loginService.login({username, password})
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch(exception) {
      nofifyUser('käyttäjätunnus tai salasana virheellinen', "error")
    }
  }

  const makeLogout = (event) => {
    window.localStorage.removeItem('user')
    blogService.clearToken()
    setUser(null)
    nofifyUser("user logged out", "info")
  }

  const createBlogView = () => (
    <div>
      <form onSubmit={submitBlog}>
        <div>
          title: <input value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        name="Title" 
                        />
        </div>
        <div>
          author: <input value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        name="Author" 
                        />
        </div>
        <div>
          url: <input value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        name="URL" 
                        />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <input onClick={makeLogout} type="button" value="logout" />

      <h2>create new</h2>
      {createBlogView()}

      <h2>existing blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={makeLogin}>
        <div>
        käyttäjätunnus: <input value={username} 
                              onChange={({ target }) => setUsername(target.value)}
                              name="Username"/>
        </div>
        <div>
        salasana: <input type="password" 
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
      {notification && Notification(notification.message, notification.level)}
      {user === null ? 
        loginView() :
        blogView() }
    </div>
  )
}

export default App