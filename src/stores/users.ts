import {defineStore} from "pinia";
import {User} from "../services/userService";

export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [] as User[],
        user: null as User
    }),
    getters: {
        getUsers() {
            return this.users;
        },
        getUser() {
            return this.user;
        }
    },
    actions: {
        setUsers(newValue: User[]) {
            this.users = newValue;
        },

        setUser(user: User) {
            this.user = user;
        },
    }
});