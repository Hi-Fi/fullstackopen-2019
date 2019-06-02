const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: { type: String, required: true},
    likes: { type: Number, default: 0 }
  })
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  blogSchema.set('toObject', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const mongoUrl = config.MONGODB_URI
  mongoose.connect(mongoUrl, { useNewUrlParser: true })

  module.exports = mongoose.model('Blog', blogSchema)