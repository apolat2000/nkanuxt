export default {
  GET_JWT (state) {
    return state.jwt
  },
  GET_LOG_IN_LOADING (state) {
    return state.logInLoading
  },
  GET_AUTH (state) {
    return state.isAuthenticated
  },
  GET_FIRST_NAME (state) {
    return state.firstName
  },
  GET_IMG_PATH (state) {
    return state.imgPath
  },
  GET_USER_ID (state) {
    return state.userId
  }
}
