const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
      let savedBlog = await blog.save()
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