import axios from 'axios'
const http = axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:7001/api/v1'
})
export function getImages(page = 1, limit = 8) {
  return http.get('/image', {
    params: {
      page,
      limit
    }
  })
}
