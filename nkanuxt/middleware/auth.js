// export default function ({ store, redirect, route }) {
//   if (process.server) {
//   // Paths forbidden to authorized users
//     if (route.name === 'login' || route.name === 'register') {
//       if (store.getters['auth/GET_AUTH']) {
//         return redirect({ name: 'index' })
//       }
//       store.dispatch('auth/refreshToken')
//     }
//     // Paths forbidden to UNauthorized users
//     if (route.name !== 'login' || route.name !== 'register' || route.name !== 'index') {
//       store.dispatch('auth/refreshToken').then(() => {
//       // If the user is not authenticated
//         if (!store.getters['auth/GET_AUTH']) {
//           window.console.log('auth.js')
//           store.dispatch('auth/logout')
//           return redirect({ name: 'login' })
//         }
//       })
//     }
//   }
// }

export default function ({ app }) {
  // if (process.client) {
  app.router.beforeResolve((to, from, next) => {
    const isAuthenticated = app.store.getters['auth/GET_AUTH']

    if (isAuthenticated) {
      if (to.name === 'login' || to.name === 'register') {
        next(false)
      } else {
        app.store.dispatch('auth/refreshToken').then(() => next())
      }
    } else if (to.name === 'login' || to.name === 'register' || to.name === 'index') {
      // If the user is not authenticated
      next()
    } else {
      app.store.dispatch('auth/logout')
      next({ name: 'login' })
    }
    // if (to.name === 'login' || to.name === 'register') {
    //   if (store.getters['auth/GET_AUTH']) {
    //     next(false)
    //   }
    //   store.dispatch('auth/refreshToken')
    // }
    // // Paths forbidden to UNauthorized users
    // if (to.name !== 'login' || to.name !== 'register' || to.name !== 'index') {
    //   store.dispatch('auth/refreshToken').then(() => {
    //   // If the user is not authenticated
    //     if (!store.getters['auth/GET_AUTH']) {
    //       window.console.log('auth.js')
    //       store.dispatch('auth/logout')
    //       next(false)
    //     }
    //   })
    // }
  })
  // }
}
