import { defineStore } from "pinia";

export const authStore = defineStore('authStore', {

    state: () => {
        return {
            userRole: "",
            isLoggedIn: ""
        }
    },

    actions: {
        setUserRole(role){
            this.userRole = role;
        },
        
        setIsLoggedIn(status){
            this.isLoggedIn = status;
        }
    },

    getters: {
        getUserRole(state) {
            return state.userRole;
        },
        getIsLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
})