const lodash = require('lodash')

const dummy = (blogs) => (1)

  const totalLikes = (blogs) => (
    blogs.reduce( (sum, blog) => (
        sum+blog.likes
     ), 0)
  )
  const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce (( biggest, current) => (
            biggest.likes > current.likes ? biggest : current
        ))
    } else {
        return null
    }
}

const mostBlogs = (blogs) => {
    let bloggerCounts = lodash.map(lodash.countBy(blogs.map( blog => blog.author)), (count, author) => {
        return {
            "author": author,
            "blogs": count
        }
    })
    if (bloggerCounts.length > 0) {
        return bloggerCounts.reduce (( biggest, current) => (
            biggest.blogs > current.blogs ? biggest : current
        ))
    } else {
        return null
    }
}

const mostLikes = (blogs) => {
    let likeCounts = lodash.map(lodash.groupBy(blogs, "author"), (array, author) => {
        return {
            "author": author,
            "likes": array.reduce( (sum, blog) => ( sum+blog.likes), 0)
        }
    })

    if (likeCounts.length > 0) {
        return likeCounts.reduce (( biggest, current) => (
            biggest.likes > current.likes ? biggest : current
        ))
    } else {
        return null
    }
}
  
  module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
  }