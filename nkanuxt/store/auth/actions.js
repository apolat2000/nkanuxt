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
  }
}
