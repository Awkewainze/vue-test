import {defineStore} from "pinia";
import {getUser, getUsers, User} from "../services/userService";

export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [] as User[],
        user: null as User
    }),
    actions: {
        async fetchUsers(): Promise<void> {
            this.users = await getUsers();
        },
        async fetchUserById(userId: string): Promise<void> {
            this.user = await getUser(userId);
        }
    }
});