export default {
  async login ({ commit }, credentials) {
    commit('SET_LOG_IN_LOADING', true)
    const res = await this.$axios.$post('login', credentials)
    if (res.status === 200) {
      commit('SET_JWT', res.data.jwt_token)
      commit('SET_AUTH', true)
      commit('SET_FIRST_NAME', res.data.first_name)
      commit('SET_IMG_PATH', res.data.img_path)
      commit('SET_USER_ID', res.data.userID)
    } else {
      window.console.log(res.status)
    }
    commit('SET_LOG_IN_LOADING', false)
  },
  logout ({ commit }) {
    commit('SET_JWT', null)
    commit('SET_AUTH', false)
    commit('SET_FIRST_NAME', null)
    commit('SET_IMG_PATH', null)
    commit('SET_USER_ID', null)
  },
  refreshToken ({ commit, getters, dispatch }) {
    const jwt = getters.GET_JWT

    // try {
    //   const res = await this.$axios.$post('http://localhost:5000/verifyRefreshToken', {},
    //     {
    //       validateStatus (status) {
    //         return status < 500 // Resolve only if the status code is less than 500
    //       },
    //       headers: {
    //         Authorization: `Bearer ${jwt}`
    //       }
    //     })

    //   if (res.status === 200) {
    //     commit('SET_JWT', res.data.jwt_token)
    //     commit('SET_USER_ID', res.data.userID)
    //     commit('SET_AUTH', true)
    //   }
    // } catch (err) {
    //   if (err.status === 401) {
    //     commit('SET_AUTH', false)
    //     dispatch('logout')
    //   }
    // }

    this.$axios.$post('verifyRefreshToken', {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((res) => {
      window.console.log(res.status)
      if (res.status === 200) {
        commit('SET_JWT', res.data.jwt_token)
        commit('SET_USER_ID', res.data.userID)
        commit('SET_AUTH', true)
      }
    }).catch((err) => {
      if (err.status === 401) {
        dispatch('logout')
      }
    })
  }
}
