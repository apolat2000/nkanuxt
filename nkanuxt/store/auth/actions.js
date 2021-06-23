import axios from 'axios'

export default {
  async login (context, credentials) {
    context.commit('SET_LOG_IN_LOADING', true)
    const res = await axios.post('http://localhost:5000/login', credentials)
    if (res.status === 200) {
      context.commit('SET_JWT', res.data.jwt_token)
      context.commit('SET_AUTH', true)
      context.commit('SET_FIRST_NAME', res.data.first_name)
      context.commit('SET_IMG_PATH', res.data.img_path)
      context.commit('SET_USER_ID', res.data.userID)
    }
    context.commit('SET_LOG_IN_LOADING', false)
  },
  logout (context) {
    context.commit('SET_JWT', null)
    context.commit('SET_AUTH', false)
    context.commit('SET_FIRST_NAME', null)
    context.commit('SET_IMG_PATH', null)
    context.commit('SET_USER_ID', null)
  },
  async refreshToken (context) {
    const jwt = context.getters.GET_JWT

    if (jwt != null) {
      context.commit('SET_AUTH', false)

      const res = await axios.post('http://localhost:5000/verifyRefreshToken', {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      if (res.status === 200) {
        context.commit('SET_JWT', res.data.jwt_token)
        context.commit('SET_AUTH', true)
        window.console.log('heey')
      }
    }
  }
}
