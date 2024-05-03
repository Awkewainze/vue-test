<script setup lang="ts">
import Header from "@/components/Header.vue";
import {useLoadingStore} from "@/stores/loading.ts";
import Loading from "@/components/Loading.vue";

const loadingStore = useLoadingStore();
</script>

<template>
	<span>
		<Header style="position: sticky; top: 0;" />
		<main>
		<RouterView v-slot="{Component, route}" class="content">
			<transition name="fade" mode="out-in">
				<Loading v-if="loadingStore.isLoadingPrimary" />
				<Component :is="Component" v-else></Component>
			</transition>
		</RouterView>
		</main>
	</span>
</template>

<style scoped>
.content {
	padding: 0.5rem;
	margin: 0.5rem;
}
</style>