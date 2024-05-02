<template>
	<header>
		<nav>
			<RouterLink class="button" to="/">Home</RouterLink>
			<RouterLink class="button" to="/users">Users</RouterLink>
			<RouterLink class="button" to="/settings">Settings</RouterLink>
		</nav>
	</header>
</template>

<style scoped>
	header {
		padding-bottom: 0.5rem;
		border-bottom: #151515DF solid 1px;
	}
</style>