<script setup lang="ts">
import {useRoute} from "vue-router";
import {Post} from "@/services/userService";
import {computed} from "vue";

const props = defineProps<{
	post: Post
}>();
const route = useRoute();

const newRoute = computed(() => `/users/${route.params.userId}/posts/${props.post.id}`);
</script>

<template>
	<RouterLink class="list-item" :to="newRoute">
		<h3>{{post.title}}</h3>
		<p>{{post.postedOn}}</p>
	</RouterLink>
</template>

<style scoped>
.list-item {
	color: ghostwhite;
	display: flex;
	align-items: center;
	margin: 0.25rem 0.25rem 0.25rem 0;
	padding: 0.5rem;
	column-gap: 0.75rem;
	cursor: pointer;
	border: 0.25rem solid #151515;
	box-shadow: #15151560 3px 3px;
}
</style>