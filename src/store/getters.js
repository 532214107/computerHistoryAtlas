const getters = {
  nickname: state => state.user.name,
  loginStatus: state => state.user.loginStatus
}

export default getters
