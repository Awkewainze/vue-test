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

    return fakeUsers.default.find(x => x.id === userId);
}

export interface Post {
    id: string;
    postedOn: string;
    title: string;
    content: string;
}

export async function getPostsByUserId(userId: string): Promise<Post[]> {
    await addFakeLatency();
    const fakeUsers = await import("../assets/fakeUsers.json");
    const postIds = new Set(fakeUsers.default.find(x => x.id === userId).posts);
    const fakePosts = await import("../assets/fakePosts.json");
    return fakePosts.default.filter(x => postIds.has(x.id));
}

export async function getPost(postId: string): Promise<Post> {
    await addFakeLatency();
    const fakePosts = await import("../assets/fakePosts.json");
    return fakePosts.default.find(x => x.id === postId);
}