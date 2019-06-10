const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1})
     response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    let token = getTokenFrom(request)
    try {
      let decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
    } catch(exception) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    let users = await User.findById(decodedToken.id)
    let user = users[0]
    const blog = new Blog(request.body)
    blog.user = user._id
    try {
      let savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
      response.status(400).json(exception.message)
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      
    } catch(exception) {
      //delete can always fake that things were done
    }
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    let newBlog = new Blog(request.body)
    try {
      let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
      if (updatedBlog) {
        response.json(updatedBlog.toJSON())
      } else {
        response.status(404).json({"message": "No update done"})
      }
    } catch(exception) {
      response.status(404).json({ "message": exception.message })
    }
  })

  module.exports = blogsRouter