<script setup lang="ts">
	import {useErrorStore} from "@/stores/error";
	const errorStore = useErrorStore();
</script>

<template>
	<div>
		<h3>{{errorStore.error.message}}</h3>
		<p>{{errorStore.error.stack}}</p>
	</div>
</template>

<style scoped>
	div {
		background-color: #151535;
	}
</style>