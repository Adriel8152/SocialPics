<script setup lang="ts">
import { Header } from '../../components';

</script>

<template>
	<Header />
	<div class="flex items-center flex-col bg-[#fdfdfd] min-w-[100vw] min-h-[100vh] pt-[var(--header-height)]">
		<router-view />
	</div>
</template>

<style scoped>
</style>
