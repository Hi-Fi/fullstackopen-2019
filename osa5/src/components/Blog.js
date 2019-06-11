import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogList, notifyUser}) => {

  const [showDetails, setShowDetails] = useState(false)
  const [refreshBlog, setRefreshBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowDetails = (event) => {
    setShowDetails(!showDetails)
  }

  const likeBlog = async (event) => {
    let newBlog = { 
                    author: blog.author,
                    url: blog.url,
                    user: blog.user,
                    title: blog.title,
                    likes: blog.likes+1
                  }
    try {
      await blogService.updateBlog(blog.id, newBlog)
      blog.likes = blog.likes+1
      setRefreshBlog(!refreshBlog)
      updateBlogList(blog)
    } catch(exception) {

    }
  }

  const removeBlog = async (event) => {
    let confirmation = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(confirmation) {
      try {
        await blogService.deleteBlog(blog.id)
        blog.deleted = true
        updateBlogList(blog)
      } catch(exception) {
        let errorMessage = exception.response ? exception.response.data : exception.message
        errorMessage = errorMessage.error ? errorMessage.error : errorMessage
        notifyUser(errorMessage, "error")
      }
    }
  }

  let basicBlog = () => (
    <div>
      <span onClick={toggleShowDetails}>{blog.title}</span> {blog.author}
  </div>
  )

  let fullBlog = () => (  
    <div>
      <span onClick={toggleShowDetails}>{blog.title}</span><br />
      {blog.url}<br />
      {blog.likes} likes <button value="like" onClick={likeBlog}>like</button><br />
      added by: {blog.author}
      <button value="remove" onClick={removeBlog}>remove</button>
    </div>
  )

  return (
  <div style={blogStyle} refresh={refreshBlog.toString()}>
    {!showDetails && basicBlog()}
    {showDetails && fullBlog()}
  </div>
    
  
  )
}

export default Blog