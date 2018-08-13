import Vue, { AsyncComponent } from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const I = (id = '') =>
//   new Promise((resolve, reject) => {
//     require.ensure([id], require => {
//       resolve(require(id))
//     })
//   })

// const cache: any = {}
// function importAll(r) {
//   r
//     .keys()
//     .forEach(
//       key => (cache[key.replace('./', '').replace('.vue', '')] = r(key).default)
//     )
// }
// importAll(require.context('../views/', true, /\.vue$/))
// console.log(cache)

const Index = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/index.vue'], require => {
      resolve(require('../views/index.vue'))
    })
  })

const ImageDetail = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/image-detail.vue'], require => {
      resolve(require('../views/image-detail.vue'))
    })
  })

const Signup = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/signup.vue'], require => {
      resolve(require('../views/signup.vue'))
    })
  })

const Signin = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/signin.vue'], require => {
      resolve(require('../views/signin.vue'))
    })
  })

import Me from '../views/me.vue'

const MeIndex = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/me/index.vue'], require => {
      resolve(require('../views/me/index.vue'))
    })
  })

const MeInvitation = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/me/invitation.vue'], require => {
      resolve(require('../views/me/invitation.vue'))
    })
  })

const MeImageUpload = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/me/image-upload.vue'], require => {
      resolve(require('../views/me/image-upload.vue'))
    })
  })
export default function createRouter() {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0, x: 0 }),
    routes: [
      { path: '/', component: Index },
      { path: '/image/:id', component: ImageDetail },
      { path: '/signup', component: Signup },
      { path: '/signin', component: Signin },
      {
        path: '/me',
        component: Me,
        children: [
          {
            path: '/',
            component: MeIndex
          },
          {
            path: 'invitation',
            component: MeInvitation
          },
          {
            path: 'new-image',
            component: MeImageUpload
          }
        ]
      }
    ]
  })

  return router
}
