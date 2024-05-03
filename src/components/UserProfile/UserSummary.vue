<script setup lang="ts">
	import {useUsersStore} from "@/stores/users";
	const usersStore = useUsersStore();
</script>

<template>
	<div>
		<p>{{usersStore.user.summary}}</p>
	</div>
</template>
