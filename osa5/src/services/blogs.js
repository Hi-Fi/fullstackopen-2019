
import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}

const clearToken = () => {
  axios.defaults.headers.common['Authorization'] = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const submitNew = async (content) => {
  let response = await axios.post(baseUrl, content)
  return response.data
}

const updateBlog = async (blog_id, blog) => {
  let response = await axios.put(baseUrl+`/${blog_id}`, blog)
  return response.data
}

const deleteBlog = async (blog_id) => {
  let response = await axios.delete(baseUrl+`/${blog_id}`)
  return response.data
}

export default { getAll, submitNew, setToken, clearToken, updateBlog, deleteBlog }