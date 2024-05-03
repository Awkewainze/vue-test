<script setup lang="ts">
import {useUsersStore} from "@/stores/users";
import {useSettingsStore} from "@/stores/settings";
import {usePostsStore} from "@/stores/posts";

const settingsStore = useSettingsStore();
const usersStore = useUsersStore();
const postsStore = usePostsStore();
function clearStores() {
	usersStore.$reset();
	postsStore.$reset();
}
</script>

<template>
	<span>
		<div>
			<input v-model="settingsStore.latencyEnabled" type="checkbox" id="latency-toggle">
			<label for="latency-toggle">Enable Fake Latency</label><br>
		</div>
		<div>
			<input v-model="settingsStore.latencyAmountMillis" type="number" id="latency-ms">
			<label for="latency-ms">Fake Latency Amount (ms)</label><br>
		</div>
		<span class="button" @click="clearStores()">Clear Stores</span>
	</span>
</template>

<style scoped>
span > * {
	padding-bottom: 0.5rem;
	margin: 0.5rem;
}
</style>