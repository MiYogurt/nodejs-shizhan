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
      .catch(err => {
        console.log('remove user_token')
        localforage.removeItem('user_token')
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
  createImage(token, data) {
    return http.post('/image', data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  getTeam(token, id) {
    return http.get('/team/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  search(token, key) {
    return http.get('/search_user?k=' + key, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  addMember(token, user_id, team_id) {
    return http.post(
      '/team/member',
      {
        user_id,
        team_id
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
  },
  checkCanCreatTeam(token) {
    return http.get('/check/team', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  createTeam(token, data) {
    return http.post('/team/create', data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  // signUp : R.curry(http.post)('/signup')
  // signUp : R.partial(http.post, ['/signup])
}
export default info
