<script setup lang="ts">
	import {useUsersStore} from "@/stores/users";
	import Loading from "@/components/Loading.vue";
	import {useLoadingStore} from "@/stores/loading";
	import {computed} from "vue";

	const usersStore = useUsersStore();
	const loadingStore = useLoadingStore();
	const links = computed(() => {
		return { summary: `/users/${usersStore.user.id}`, posts: `/users/${usersStore.user.id}/posts` };
	})

</script>

<template>
	<div>
		<img :src="usersStore.user.avatar" />
		<h2>{{usersStore.user.name}}</h2>
		<header>
			<nav>
				<RouterLink class="button" :to="links.summary">Summary</RouterLink>
				<RouterLink class="button" :to="links.posts">Posts</RouterLink>
			</nav>
		</header>
		<RouterView v-slot="{Component, route}" class="content">
			<transition name="fade" mode="out-in">
				<Loading v-if="loadingStore.isLoadingSecondary" />
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