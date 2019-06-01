const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
    
  const mongoUrl = process.env.MONGODB_URI
  mongoose.connect(mongoUrl, { useNewUrlParser: true })

  module.exports = mongoose.model('Blog', blogSchema)