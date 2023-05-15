import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      localStorage.getItem('token') != null ? `Token ${localStorage.getItem('token')}` : ''
  }
})
