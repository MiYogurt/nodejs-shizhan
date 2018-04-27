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
    require.ensure(['../views/ImageDetail.vue'], require => {
      resolve(require('../views/ImageDetail.vue'))
    })
  })

const signup = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/signup.vue'], require => {
      resolve(require('../views/signup.vue'))
    })
  })

const signin = () =>
  new Promise((resolve, reject) => {
    require.ensure(['../views/signin.vue'], require => {
      resolve(require('../views/signin.vue'))
    })
  })

export default function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0, x: 0 }),
    routes: [
      { path: '/', component: Index },
      { path: '/image/:id', component: ImageDetail },
      { path: '/signup', component: signup },
      { path: '/signin', component: signin }
    ]
  })
}
