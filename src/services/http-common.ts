import axios from 'axios'

let baseURL = ''

if (import.meta.env.MODE === 'development') {
  baseURL = import.meta.env.VITE_API_URL || ''
} else if (import.meta.env.MODE === 'production') {
  baseURL = process.env.API_URL || ''
}

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
