const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
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

  test('default value for likes is 0', async() => {
    let newBlog = helper.generateBlog(1)
    delete newBlog.likes

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('status 400 without title', async() => {
    let newBlog = helper.generateBlog(1)
    delete newBlog.title

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('status 400 without url', async() => {
    let newBlog = helper.generateBlog(1)
    delete newBlog.url

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('status 400 without url and title', async() => {
    let newBlog = helper.generateBlog(1)
    delete newBlog.url
    delete newBlog.title

    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    })
})

describe('deleting of blogs', () => {

  beforeEach(async () => {
      await Blog.deleteMany({})
  })

  test('delete existing blog', async() => {
    let blog = await Blog(helper.generateBlog(1)).save()
    let blogsInBeginning = await helper.blogsInDb()


    let response = await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)
    let newBlogs = await helper.blogsInDb()

    expect(newBlogs.length).toBe(blogsInBeginning.length-1)
  })

  test('try to delete non-existing blog', async() => {
    let id = (new Date).getTime()
    let response = await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
  })

  test('try to delete existing blog twice', async() => {
    let blog = await Blog(helper.generateBlog(1)).save()

    await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)
    
    await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)
  })
})

describe('Modify blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('update blog', async() => {
    let blog = await (new Blog(helper.generateBlog(1))).save()
    let newBlog = { ...blog.toObject(), likes: 10 }
    let response = await api
    .put(`/api/blogs/${blog.id}`)
    .send(newBlog)
    .expect(200)

    let storedBlog = response.body
    expect(storedBlog).toEqual(newBlog)
  })

  test('try to update non-existing blog', async() => {
    var id = await mongoose.Types.ObjectId();

    let newBlog = Blog(helper.generateBlog(1))

    let response = await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(404)
  })

})

afterAll( async() => {
  await mongoose.connection.close()
})