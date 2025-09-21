import { createStore } from 'vuex';

const authStore = createStore({
  state: {
    userRole: "",
    isLoggedIn: ""
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
    setIsLoggedIn(state, status) {
      state.isLoggedIn = status;
    }
  },
  getters: {
    getUserRole: (state) => state.userRole,
    getIsLoggedIn: (state) => state.isLoggedIn
  }
});

export default authStore;
