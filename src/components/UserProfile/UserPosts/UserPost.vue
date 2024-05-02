<script setup lang="ts">
	import {usePostsStore} from "@/stores/posts";
	import {useLoadingStore} from "@/stores/loading";
	import {getPost} from "@/services/userService";
	import {onBeforeRouteUpdate} from "vue-router";

	const postsStore = usePostsStore();

	onBeforeRouteUpdate(async (to, from, next) => {
		const postId = to.params.postId;
		const postsStore = usePostsStore();

		if (postsStore.getPost?.id === postId) {
			// No change
			console.log("No change onBeforeRouteUpdate");
			next();
			return;
		}
		const loadingStore = useLoadingStore();
		await loadingStore.handleTerminalLoading(async () => {
			const post = await getPost(postId);
			postsStore.setPost(post);
		});

		next();
	});
</script>

<template>
	<div>
		<h2>{{postsStore.getPost.title}}</h2>
		<p>{{postsStore.getPost.postedOn}}</p>
		<p>{{postsStore.getPost.content}}</p>
	</div>
</template>

<style scoped>

</style>