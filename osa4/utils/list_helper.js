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
  
  module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog
  }