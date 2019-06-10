const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

usersRouter.get('/', async (request, response) => {
    console.log(await User.find({}))
    let users = await User.find({}).populate('blogs', { id: 1, title: 1, author: 1, url: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    try {
      let body = request.body
      let minPasswordLength = 3
      if (!body.password || body.password.length < minPasswordLength) {
          throw({ message: `Password is not long enough. At least ${minPasswordLength} characters needed`})
      }
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)  

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })
  
      const savedUser = await user.save()
  
      response.status(201).json(savedUser.toJSON())
    } catch(exception) {
      response.status(400).json(exception.message)
    }
})

module.exports = usersRouter