import { defineStore } from "pinia";

export const authStore = defineStore('authStore', {

    state: () => {
        return {
            userRole: "",
        }
    },

    actions: {
        setUserRole(role){
            this.userRole = role;
        }
    },

    getters: {
        getUserRole(state) {
            return state.userRole;
        },
    },
})