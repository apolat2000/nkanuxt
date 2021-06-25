import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1d107374 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0886fe30 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _c2e5f8b2 = () => interopDefault(import('../pages/someother.vue' /* webpackChunkName: "pages/someother" */))
const _5368d05d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _1d107374,
    name: "login"
  }, {
    path: "/register",
    component: _0886fe30,
    name: "register"
  }, {
    path: "/someother",
    component: _c2e5f8b2,
    name: "someother"
  }, {
    path: "/",
    component: _5368d05d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
