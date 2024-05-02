import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";

import Home from "./components/Home.vue";
import UserList from "./components/UserList/UserList.vue";
import UserProfile from "./components/UserProfile/UserProfile.vue";
import UserSummary from "./components/UserProfile/UserSummary.vue";
import UserPostList from "./components/UserProfile/UserPosts/UserPostList.vue";
import Settings from "./components/Settings.vue";
import UserPost from "./components/UserProfile/UserPosts/UserPost.vue";

import {createPinia} from "pinia";
import {getPost, getPostsByUserId, getUser, getUsers} from "./services/userService";
import {useUsersStore} from "./stores/users";
import {useLoadingStore} from "./stores/loading";
import {usePostsStore} from "./stores/posts";

const pinia = createPinia();
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/users",
        beforeEnter: async (to, from, next) => {
            const usersStore = useUsersStore();
            if (usersStore.getUsers.length === 0) {
                const loadingStore = useLoadingStore();
                await loadingStore.handlePrimaryLoading(async () => {
                    const users = await getUsers();
                    usersStore.setUsers(users);
                });
            }
            next();
        },
        children: [
            {
                path: "",
                component: UserList,
            },
            {
                path: ":userId",
                component: UserProfile,
                beforeEnter: async (to, from, next) => {
                    const userId = to.params.userId;
                    const usersStore = useUsersStore();
                    if (usersStore.getUser?.id === userId) {
                        // No change
                        next();
                        return;
                    }

                    const postsStore = usePostsStore();
                    postsStore.$reset();
                    const loadingStore = useLoadingStore();
                    await loadingStore.handlePrimaryLoading(async () => {
                        const user = await getUser(userId);
                        usersStore.setUser(user);
                    });

                    next();
                },
                children: [
                    {
                        path: "",
                        component: UserSummary
                    },
                    {
                        path: "posts",
                        beforeEnter: async (to, from, next) => {
                            const userId = to.params.userId;
                            const postsStore = usePostsStore();
                            if (postsStore.getUserId === userId) {
                                // No change
                                next();
                                return;
                            }
                            const loadingStore = useLoadingStore();

                            await loadingStore.handleSecondaryLoading(async () => {
                                const posts = await getPostsByUserId(userId);
                                postsStore.setPosts(posts);
                                postsStore.setUserId(userId);
                            });

                            next();
                        },
                        children: [
                            {
                                path: "",
                                component: UserPostList,
                                beforeEnter: async (to, from, next) => {
                                    const postsStore = usePostsStore();
                                    // TODO There is probably a much safer way to do this
                                    if (!to.params.postId && postsStore.getPost?.id) {
                                        next(to.path + "/" + postsStore.getPost.id);
                                        return;
                                    }
                                    next();
                                },
                                children: [
                                    {
                                        path: ":postId",
                                        component: UserPost,
                                        beforeEnter: async (to, from, next) => {
                                            const postId = to.params.postId;
                                            const postsStore = usePostsStore();

                                            if (postsStore.getPost?.id === postId) {
                                                // No change
                                                console.log("No change");
                                                next();
                                                return;
                                            }
                                            const loadingStore = useLoadingStore();
                                            await loadingStore.handleTerminalLoading(async () => {
                                                const post = await getPost(postId);
                                                postsStore.setPost(post);
                                            });

                                            next();
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/settings",
        component: Settings
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


const app = createApp(App)
    .use(pinia)
    .use(router);

router.isReady().then(() => {
    app.mount('#app');
});
