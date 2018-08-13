import axios from 'axios'
const http = axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:7001/api/v1'
})
export function getImages(page = 1, limit = 8) {
  return http.get('/image', {
    params: {
      page,
      split: limit
    }
  })
}

export function getImage(id) {
  return http
    .get('/image/' + id)
    .then(({ data }) => data)
    .catch(console.error)
}
