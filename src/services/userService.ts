import {useSettingsStore} from "../stores/settings";

export interface User {
    id: string;
    name: string;
    avatar: string;
    summary: string;
    posts: string[];
}

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addFakeLatency(): Promise<void> {
    const settings= useSettingsStore();
    if (settings.getLatencyEnabled) {
        await sleep(settings.getLatencyAmountMillis);
    }
}

export async function getUsers(): Promise<User[]> {
    await addFakeLatency();
    const fakeUsers = await import("../assets/fakeUsers.json");

    return fakeUsers.default;
}

export async function getUser(userId: string): Promise<User> {
    await addFakeLatency();
    const fakeUsers = await import("../assets/fakeUsers.json");
    const user = fakeUsers.default.find(x => x.id === userId);
    if (user == null) {
        throw new Error("User not found");
    }
    return user;
}

export interface Post {
    id: string;
    postedOn: string;
    title: string;
    content: string;
}

export async function getPostsByUserId(userId: string): Promise<Post[]> {
    await addFakeLatency();
    const postIds = new Set((await getUser(userId)).posts);
    const fakePosts = await import("../assets/fakePosts.json");
    return fakePosts.default.filter(x => postIds.has(x.id));
}

export async function getUserPost(userId: string, postId: string): Promise<Post> {
    await addFakeLatency();

    const [fakePosts, userPosts] = await Promise.all([import("../assets/fakePosts.json"), getPostsByUserId(userId)]);
    // Ensure post exists and is user's
    const post = fakePosts.default.find(x => x.id === postId) && userPosts.find(x => x.id === postId);
    if (post == null) {
        throw new Error("Post not found");
    }
    return post;
}