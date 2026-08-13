import { createStore } from "vuex";

  const generateStandardString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars.charAt(randomIndex)
  }
  randomString.value = result
}

const authUser ={
  namespaced: true,
  state(){
    return{
      authToken: localStorage.getItem('authToken') || null,
      allUsers: [{
        id: 1,
        username: 'admin1',
        password: '@admin1',
        full_name: 'ADMIN ONE',
        account_type: 'admin',
        token: '6rOGcxcxKLPcoIxRRZx2Du3FpH1aATyhJShJSfpyktP80Zd8jZLOsliEXR7s4qlS'
      }],
    }
  },

 getters: {
    users: (state) => state.allUsers,
    currentUser: (state) => {
      return state.allUsers.find((user) => user.token === state.authToken) || null;
    },
    isAuthenticated: (state) => !!state.authToken
  },
  mutations: {
    TOKEN_TO_SET(state, token) {
      state.authToken = token;
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  },
  actions: {
    login({ state, commit }, { username, password }) {
      const user = state.allUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        commit('TOKEN_TO_SET', user.token);
        return {success: true, user};
      } else {
        return { success: false, error: 'Invalid username or password.' };
      }
    },
    logout({ commit }) {
      commit('TOKEN_TO_SET', null);
    }
  }
};

const store = createStore({
  modules: {
    authUser
  }
});

export default store;