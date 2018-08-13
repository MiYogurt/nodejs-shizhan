import createApp from './app'
import { findAsyncDataFunction } from './utils'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      const asyncDataHooks = matchedComponents
        .map((component: any) => {
          // console.log(component)
          const asyncData = findAsyncDataFunction(component)
          // console.log(asyncData)
          if (asyncData) {
            return asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      Promise.all(asyncDataHooks)
        .then(() => {
          // isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
