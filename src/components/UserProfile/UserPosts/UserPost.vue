<script setup lang="ts">
	import {usePostsStore} from "@/stores/posts";
	import {useLoadingStore} from "@/stores/loading";
	import {onBeforeRouteUpdate} from "vue-router";

	const postsStore = usePostsStore();
	onBeforeRouteUpdate(async (to, from, next) => {
		const postId = to.params.postId;
		if (postsStore.post?.id === postId) {
			// No change
			next();
			return;
		}
		const loadingStore = useLoadingStore();
		await loadingStore.handleTerminalLoading(() => postsStore.fetchPost(postId));
		next();
	});
</script>

<template>
	<div>
		<h2>{{postsStore.post.title}}</h2>
		<p>{{postsStore.post.postedOn}}</p>
		<p>{{postsStore.post.content}}</p>
	</div>
</template>

<style scoped>

</style>