const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog identified field is id', async () => {
    let response = await api.get('/api/blogs')
    
    response.body.map ( blog => {
      expect(blog.id).toBeDefined()
    })    
  })
})

describe("adding new blogs", () => {

  test('add new blog', async() => {
    let newBlog = helper.generateBlog(0)
    let originalBlogs = await helper.blogsInDb()

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let newBlogs = await helper.blogsInDb()

    expect(newBlogs.length).toBe(originalBlogs.length + 1)

    let postedBlog = response.body
    delete postedBlog.id
    expect(postedBlog).toEqual(newBlog)
  })
})

afterAll( async() => {
  await mongoose.connection.close()
})