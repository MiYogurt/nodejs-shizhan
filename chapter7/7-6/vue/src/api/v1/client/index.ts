import * as common from '../common'
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:7001/api/v1'
})

const info = {
  name: 'client',
  ...common,
  signUp(user) {
    return http.post('/signup', user)
  }
  // signUp : R.curry(http.post)('/signup')
  // signUp : R.partial(http.post, ['/signup])
}
export default info
