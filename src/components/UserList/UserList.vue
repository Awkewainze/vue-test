<script setup lang="ts">
import UserListItem from "@/components/UserList/UserListItem.vue";
import {useUsersStore} from "@/stores/users";

const usersStore = useUsersStore();
</script>

<template>
	<ul>
		<UserListItem v-for="user in usersStore.users" :user="user" :key="user.id" />
	</ul>
</template>

<style scoped>

</style>