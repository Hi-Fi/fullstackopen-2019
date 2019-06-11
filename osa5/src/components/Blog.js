import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false)

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

  let basicBlog = () => (
    <div>
      <span onClick={toggleShowDetails}>{blog.title}</span> {blog.author}
  </div>
  )

  let fullBlog = () => (  
    <div>
      <span onClick={toggleShowDetails}>{blog.title}</span><br />
      {blog.url}<br />
      {blog.likes} likes <button value="like">like</button><br />
      added by: {blog.author}
    </div>
  )

  return (
  <div style={blogStyle}>
    {!showDetails && basicBlog()}
    {showDetails && fullBlog()}
  </div>
    
  
  )
}

export default Blog