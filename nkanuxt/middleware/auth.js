export default function ({ store, redirect, route }) {
  // Paths which are forbidden to authorized users and
  if (route.path === '/login' || route.path === '/register') {
    store.dispatch('auth/refreshToken').then(() => {
      // If the user is authenticated
      if (store.state.isAuthenticated) {
        return redirect('/')
      }
    })
  }
  if (route.path !== '/login' || route.path !== '/register' || route.path !== '/') {
    store.dispatch('auth/refreshToken').then(() => {
      // If the user is not authenticated
      if (!store.state.isAuthenticated) {
        store.dispatch('auth/logout')
        return redirect('/login')
      }
    })
  }
}
