import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

import Home from "./components/Home.vue";
import UserList from "./components/UserList/UserList.vue";
import UserProfile from "./components/UserProfile/UserProfile.vue";
import UserSummary from "./components/UserProfile/UserSummary.vue";
import UserPostList from "./components/UserProfile/UserPosts/UserPostList.vue";
import Settings from "./components/Settings.vue";
import UserPost from "./components/UserProfile/UserPosts/UserPost.vue";

import {createPinia} from "pinia";
import {useLoadingStore} from "./stores/loading";
import {usePostsStore} from "./stores/posts";
import {useUsersStore} from "./stores/users";
import Error from "./components/Error.vue";
import {useErrorStore} from "./stores/error";
const pinia = createPinia();

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/error",
        component: Error,
        beforeEnter(to, from, next) {
            const errorStore = useErrorStore();
            if (errorStore.error == null) {
                next("/");
                return;
            }
            next();
        }
    },
    {
        path: "/users",
        beforeEnter: async (to, from, next) => {
            const usersStore = useUsersStore();
            if (usersStore.users.length === 0) {
                const loadingStore = useLoadingStore();
                await loadingStore.handlePrimaryLoading(() => usersStore.fetchUsers());
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
                    if (usersStore.user?.id === userId) {
                        // No change
                        next();
                        return;
                    }

                    const postsStore = usePostsStore();
                    postsStore.$reset();

                    const loadingStore = useLoadingStore();
                    try {
                        await loadingStore.handlePrimaryLoading(() => usersStore.fetchUserById(userId));
                    } catch (e) {
                        useErrorStore().error = e;
                        console.log(e);
                        next("/error");
                        return;
                    }
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
                            if (postsStore.postsUserId === userId) {
                                // No change
                                next();
                                return;
                            }
                            const loadingStore = useLoadingStore();
                            await loadingStore.handleSecondaryLoading(() => postsStore.fetchPosts(userId));
                            next();
                        },
                        children: [
                            {
                                path: "",
                                component: UserPostList,
                                beforeEnter: async (to, from, next) => {
                                    const postsStore = usePostsStore();
                                    // Default to the post previously being looked at
                                    // TODO There is probably a much safer way to do this
                                    if (!to.params.postId && postsStore.post?.id) {
                                        next(to.path + "/" + postsStore.post.id);
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

                                            if (postsStore.post?.id === postId) {
                                                // No change
                                                next();
                                                return;
                                            }
                                            const loadingStore = useLoadingStore();
                                            try {
                                                await loadingStore.handleTerminalLoading(() => postsStore.fetchUserPost(to.params.userId, postId));
                                            } catch (e) {
                                                useErrorStore().error = e;
                                                console.log(e);
                                                next("/error");
                                                return;
                                            }
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
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.onError(async (error: Error, _to: RouteLocationNormalized, _from: RouteLocationNormalizedLoaded) => {
    const errorStore = useErrorStore();
    errorStore.error = error;
    await router.push("/error");
});



const app = createApp(App)
    .use(pinia)
    .use(router);

router.isReady().then(() => {
    app.mount('#app');
});
