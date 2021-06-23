export default {
  SET_JWT (state, jwt) {
    state.jwt = jwt
  },
  SET_LOG_IN_LOADING (state, logInLoading) {
    state.logInLoading = logInLoading
  },
  SET_AUTH (state, auth) {
    state.isAuthenticated = auth
  },
  SET_FIRST_NAME (state, firstName) {
    state.firstName = firstName
  },
  SET_IMG_PATH (state, imgPath) {
    state.imgPath = imgPath
  },
  SET_USER_ID (state, userId) {
    state.userId = userId
  }
}
