<script setup lang="ts">
	import { Footer } from '../../components';
</script>

<template>
	<div class="bg-blue-800">
		<router-view />
		<Footer />
	</div>
</template>

<style scoped>
	div {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		min-width: inherit;
		min-height: inherit;
		background: rgb(231,248,255);
		background: -moz-linear-gradient(135deg, rgba(231,248,255,1) 0%, rgba(239,250,238,1) 50%, rgba(255,243,255,1) 100%);
		background: -webkit-linear-gradient(135deg, rgba(231,248,255,1) 0%, rgba(239,250,238,1) 50%, rgba(255,243,255,1) 100%);
		background: linear-gradient(135deg, rgba(231,248,255,1) 0%, rgba(239,250,238,1) 50%, rgba(255,243,255,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e7f8ff",endColorstr="#fff3ff",GradientType=1);
	}
</style>
