const state={
  //登录状态默认为未登录
  logined: false,

  //用户信息数据
  LoginedUser: {
    name: '',
    avatar: '',
    username: ''
  }
}

const getters={
  logined:state=> state.logined,
  LoginedUser:state=> state.LoginedUser
}

const mutations={
  LOGIN(state) {
    //先将登录状态变为登录
    state.logined = true
    //然后去sessionstorage取用户数据
    let user = JSON.parse(sessionStorage.getItem('user'))
    //把用户数据分发下去
    state.LoginedUser.name = user.name
    state.LoginedUser.avatar = user.avatar
    state.LoginedUser.username = user.username
  },
  LOGOUT(state) {
    //将登录状态变为未登录
    state.logined = false
    //将用户数据置空
    state.LoginedUser.name = ''
    state.LoginedUser.avatar = ''
    state.LoginedUser.username = ''
  }
}

const actions={
  login({ commit }) {
    commit('LOGIN')
  },
  logout({ commit }){
    commit('LOGOUT')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
