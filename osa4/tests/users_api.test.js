const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('new user gets created correctly', async () => {
    let user = helper.generateUser()
    let usersAtBeginning = await helper.usersInDb()
    let response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtBeginning.length + 1)
  })

  test('User without password is not created', async () => {
    let user = helper.generateUser()
    delete user.password
    let response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('User without username is not created', async () => {
    let user = helper.generateUser()
    delete user.username
    let response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('User with too short password is not created', async () => {
    let user = helper.generateUser()
    user.password = "12"
    let response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('User with too short username is not created', async () => {
    let user = helper.generateUser()
    user.username = "12"
    let response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
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