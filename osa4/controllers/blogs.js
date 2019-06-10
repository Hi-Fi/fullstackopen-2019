const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1})
     response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    try {
      let decodedToken = jwt.verify(request.token, process.env.SECRET)
      console.log(decodedToken)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      let user = await User.findById(decodedToken.id)
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
    } catch(exception) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      let blog = await Blog.findById(request.params.id)
      try {
        let decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
        }
        if (blog.user.toString() === decodedToken.id.toString()) {
          await Blog.findByIdAndRemove(request.params.id)
          let user = await User.findById(decodedToken.id)
          user.blogs = user.blogs.filter(blog => blog != request.params.id)
          await user.save()
        } else {
          return response.status(401).json({error: 'Only creator can remove the blog'})
        }
      } catch(exception) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    } catch(exception) {
      console.log(exception)
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