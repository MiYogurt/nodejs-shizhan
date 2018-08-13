import * as common from '../common'
import axios from 'axios'
import * as localforage from 'localforage'

const http = axios.create({
  baseURL: 'http://localhost:7001/api/v1'
})

const info = {
  name: 'client',
  ...common,
  signUp(user) {
    return http.post('/signup', user)
  },
  signIn(user) {
    return http.post('/signin', user)
  },
  getUser(token) {
    return http
      .get('/', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(data => {
        if (data.status != 200) {
          localforage.removeItem('user_token')
        }
        return data
      })
  },
  pushImageComment(token, content, image_id, parent_id) {
    return http.post(
      '/comment/img',
      {
        content,
        image_id,
        parent_id
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
  },
  getAllImageForMe(token) {
    return http.get('/user_image', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  getAllInvitationForMe(token) {
    return http.get('/invitation', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  getHeaderToken: user_token => (bucket, method, path) => {
    return axios
      .get('http://localhost:7001/api/v1/push_image_token', {
        headers: {
          Authorization: 'Bearer ' + user_token
        },
        params: {
          bucket: bucket.bucketName,
          method,
          path
        }
      })
      .then(function(response) {
        if (response.status !== 200) {
          console.error('gen header sign faild!')
          return
        }
        return response.data
      })
  },
  deleteFile(token, filePath) {
    return http.get('/delete_img_file?path=' + filePath, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  create_image(token, data) {
    return http.post('/image', data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  // signUp : R.curry(http.post)('/signup')
  // signUp : R.partial(http.post, ['/signup])
}
export default info
