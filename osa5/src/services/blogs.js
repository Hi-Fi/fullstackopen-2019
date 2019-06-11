
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
  console.log(content)
  let response = await axios.post(baseUrl, content)
  return response.data

}

export default { getAll, submitNew, setToken, clearToken }