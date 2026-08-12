import { createStore } from 'vuex';

const authUser = {
  namespaced: true,
  state() {
    return {
      authToken: localStorage.getItem('authToken') || null,
      users: [
        {
          username: 'admin1',
          password: '@admin1',
          account_type: 'admin',
          full_name: 'ADMIN ONE',
          token: '6rOGcxcxKLPcoIxRRZx2Du3FpH1aATyhJShJSfpyktP80Zd8jZLOsliEXR7s4qlS'
        }
      ],
      notAdminUser: JSON.parse(localStorage.getItem('notAdminUser')) || []
    };
  }, 

  getters: {
    users: (state) => state.users,
    currentUser: (state) => {
      const allAccounts = [...state.users, ...state.notAdminUser];
      return allAccounts.find((accountType) => accountType.token === state.authToken) || null;
    }
  }, 

  mutations: {
    TOKEN_TO_SET(state, token) { 
      if (token) { 
        state.authToken = token;
        localStorage.setItem('authToken', token);
      } else {
        state.authToken = null;
        localStorage.removeItem('authToken');
      }
    }
  }, 

  actions: {
    login({ state, commit }, { username, password }) { 
      const allAccounts = [...state.users, ...state.notAdminUser];
      const matchedAccount = allAccounts.find(
        (accountType) => accountType.username === username && accountType.password === password
      );

      if (matchedAccount) {
        commit('TOKEN_TO_SET', matchedAccount.token);
        return { success: true, user: matchedAccount };
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