<script setup lang="ts">
	import {usePostsStore} from "@/stores/posts";
	import UserPostListItem from "@/components/UserProfile/UserPosts/UserPostListItem.vue";
	import {useLoadingStore} from "@/stores/loading";
	import Loading from "@/components/Loading.vue";
	import {useRoute} from "vue-router";

	const loadingStore = useLoadingStore();
	const postsStore = usePostsStore();
</script>

<template>
	<div class="root">
		<div class="list">
			<UserPostListItem v-for="post in postsStore.posts" :key="post.id" :post="post" />
		</div>
		<div class="post">
			<RouterView v-slot="{Component, route}" class="content">
				<transition name="fade" mode="out-in">
					<Loading v-if="loadingStore.isLoadingTerminal" />
					<div v-else-if="postsStore.getPost === null"></div>
					<Component :is="Component" :key="route.path" v-else></Component>
				</transition>
			</RouterView>
		</div>
	</div>
</template>

<style scoped>
.root {
	display: flex;
	flex-wrap: nowrap;
	column-gap: 0.75rem;
}
.list {
	flex: 1;
}
.post {
	flex: 3;
}
</style>