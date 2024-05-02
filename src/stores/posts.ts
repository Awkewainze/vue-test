import {defineStore} from "pinia";
import {Post} from "../services/userService";

export const usePostsStore = defineStore("posts", {
    state: () => ({
        userId: null as string,
        posts: null as Post[],
        post: null as Post,
    }),
    getters: {
        getUserId() {
            return this.userId;
        },
        getPosts() {
            return this.posts;
        },
        getPost() {
            return this.post;
        }
    },
    actions: {
        setUserId(userId: string) {
            this.userId = userId;
        },
        setPosts(posts: Posts[]) {
            this.posts = posts;
        },
        setPost(post: Post) {
            this.post = post;
        },
    }
});