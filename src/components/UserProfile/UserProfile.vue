<script setup lang="ts">
	import {useUsersStore} from "@/stores/users";
	import Loading from "@/components/Loading.vue";
	import {useLoadingStore} from "@/stores/loading";

	const usersStore = useUsersStore();
	const loadingStore = useLoadingStore();

	const links = {
		summary: `/users/${usersStore.getUser.id}`,
		posts: `/users/${usersStore.getUser.id}/posts`,
	}

</script>

<template>
	<div>
		<img :src="usersStore.getUser.avatar" />
		<h2>{{usersStore.getUser.name}}</h2>
		<header>
			<nav>
				<RouterLink class="button" :to="links.summary">Summary</RouterLink>
				<RouterLink class="button" :to="links.posts">Posts</RouterLink>
			</nav>
		</header>
		<RouterView v-slot="{Component, route}" class="content">
			<transition name="fade" mode="out-in">
				<Loading v-if="loadingStore.getIsLoadingSecondary" />
				<Component :is="Component" v-else></Component>
			</transition>
		</RouterView>
	</div>
</template>

<style scoped>
.content {
	padding: 0.5rem;
	margin: 0.5rem;
}
</style>