import {defineStore} from "pinia";
import {getUserPost, getPostsByUserId, Post} from "../services/userService";

export const usePostsStore = defineStore("posts", {
    state: () => ({
        postsUserId: null as string,
        posts: null as Post[],
        post: null as Post,
    }),
    actions: {
        async fetchPosts(userId: string): Promise<void> {
            this.postsUserId = userId;
            this.posts = await getPostsByUserId(userId);
        },
        async fetchUserPost(userId: string, postId: string) {
            this.post = await getUserPost(userId, postId);
        }
    }
});