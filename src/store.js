import { createStore } from "vuex";
const authUser ={
  namespaced: true,
  state(){
    return{
      authToken: localStorage.getItem('authToken') || null,
      allUsers: JSON.parse(localStorage.getItem('allUsers')) || [{
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
    users: (state) => state.allUsers.filter(user => user.account_type !== 'admin'),
    currentUser: (state) => 
    {
      return state.allUsers.find((user) => user.token === state.authToken) || null;
    },
    isAuthenticated: (state) => !!state.authToken
  },
  mutations: {
    TOKEN_TO_SET(state, token) 
    {
      state.authToken = token;
      if (token) 
      {
        localStorage.setItem('authToken', token);
      } 
      else 
      {
        localStorage.removeItem('authToken');
      }
    },

    ADD_ACCOUNT(state, newUser) 
    {
      state.allUsers.push(newUser);
      localStorage.setItem('allUsers', JSON.stringify(state.allUsers))
    },

    SET_USERS(state, updatedList) 
    {
      const admins = state.allUsers.filter(user => user.account_type === 'admin');
      state.allUsers = [...admins, ...updatedList];
      localStorage.setItem('allUsers', JSON.stringify(state.allUsers));
    }
  },

  actions: {
    login({ state, commit }, { username, password })
    {
      const user = state.allUsers.find((user) => user.username === username && user.password === password);

      if (user) 
      {
        commit('TOKEN_TO_SET', user.token);
        return {success: true, user};
      } 
      else 
      {
        return { success: false, error: 'Invalid username or password.' };
      }
    },

    logout({ commit }) 
    {
      commit('TOKEN_TO_SET', null);
    }, 
    addAccount({commit}, newUser)
    {
      commit('ADD_ACCOUNT', newUser)
    },
    updateUsers({commit}, updatedList)
    {
      commit('SET_USERS', updatedList)
    },
  }
};

const store = createStore({
  modules: {
    authUser
  }
});

export default store;