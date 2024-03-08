

<script setup lang="ts">
	import { Color } from './types';
	import { ColorsStyles } from './interfaces';

	const colorsStyles: ColorsStyles = {
		coral: {
			background: '#D43A72',
			text: "#FFF",
		},
		yellow: {
			background: '#F0B166',
			text: '#000',
		},
		gray: {
			background: '#DCD4D7',
			text: '#000',
		},
	}

	const props = defineProps<{
		nameColor: Color
	}>();
</script>

<template>
	<button :style="{backgroundColor: colorsStyles[props.nameColor].background, color: colorsStyles[props.nameColor].text}" class="py-2 px-4 rounded-3xl disabled:opacity-80 disabled:cursor-progress"><slot /></button>
</template>

<style scoped>
</style>