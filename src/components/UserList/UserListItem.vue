<script setup lang="ts">
	import {User} from "@/services/userService";
	import {useRouter} from "vue-router";
	const props = defineProps<{
		user: User
	}>();
	const router = useRouter();
	function selectUser() {
		router.push(`/users/${props.user.id}`);
	}
</script>

<template>
	<li @click="selectUser()">
		<img :src="user.avatar" />
		<span>
			{{user.name}}
		</span>
	</li>
</template>

<style scoped>
li {
	display: flex;
	align-items: center;
	margin: 0.25rem 0.25rem 0.25rem 0;
	padding: 0.5rem;
	column-gap: 0.75rem;
	cursor: pointer;
	border: 0.25rem solid #151515;
	box-shadow: #15151560 3px 3px;
}

img {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
}
</style>