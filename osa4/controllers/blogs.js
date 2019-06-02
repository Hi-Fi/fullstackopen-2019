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

  module.exports = blogsRouter