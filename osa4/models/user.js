const mongoose = require('mongoose')
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, minlength: 3 },
    passwordHash: String,
    name: { type: String, required: true}
  })

  userSchema.plugin(uniqueValidator)
  
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

  userSchema.set('toObject', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

  const mongoUrl = config.MONGODB_URI
  mongoose.connect(mongoUrl, { useNewUrlParser: true })

  module.exports = mongoose.model('User', userSchema)