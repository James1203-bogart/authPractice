import { createStore } from 'vuex'
const authUser =  {
    namespaced: true,
    state() {
        return{
            authToken: localStorage.getItem('authToken') ||  null,
            users: [
                        {
                username: 'admin1',
                password: '@admin1',
                full_name: 'ADMIN ONE',
                token: '6rOGcxcxKLPcoIxRRZx2Du3FpH1aATyhJShJSfpyktP80Zd8jZLOsliEXR7s4qlS'
                },
                {
                username: 'user1',
                password: '@user1',
                full_name: 'USER ONE',
                token: 'fEKh5m8AuRJcWCRffsjFdZdWD45AHaS6zU9F5SA4WiCRYgbs5OV2VjXCPItOWddJ'
                },
                {
                username: 'user2',
                password: '@user2',
                full_name: 'USER TWO',
                token: 'GZFi1O1DFMPBKEJxc42dCUk5MU7xyOcBS3QZKBc8lJq972KlYvRUXY7yV51QbJVX'
                }
            ]
        }
    }, 

    getters: {
        users: (state) => state.users,
        currentUser: (state) => {
            return state.users.find((user) => user.token === state.authToken) || null;
        },
        ifUserAuthenticated: (state) => !!state.authToken
    }, 

    mutations: {
        TOKEN_TO_SET(state, token) { 
            if (token) { 
                state.authToken = token;
                localStorage.setItem('authToken', token);
            } 
            else {
                localStorage.removeItem('authToken')
            }
        }
    }, 

    actions: {
        login({state, commit}, {password, username}){ 
            const user = state.users.find( (user) => user.username === username && user.password === password);

            if(user){
                commit(TOKEN_TO_SET, user.token);
                return {success: true};
            }
            else{
                return { success: false, error: 'Mali credentials mo ya'};
            }
        },

        logout({commit}){
            commit(TOKEN_TO_SET, null);
        }
    }
}
const store = createStore({
    modules: {
        authStore
    }
});

export default store;