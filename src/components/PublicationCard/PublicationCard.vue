<script setup lang="ts">
import { useRouter } from 'vue-router';

	const router = useRouter();

	const props = defineProps<{
		id: string,
		postImg: string,
		description: string,
		userImg: string,
		username: string,
		likes: number,
		seconds: number,
	}>();

	const openPostDetails = () => {
		router.push( {name: 'Post', params: { id: props.id } } );
	}

</script>

<template>

	<figure class="border border-gray-100 shadow rounded-lg max-w-lg w-full mx-auto overflow-hidden">
		<div @click="openPostDetails" class="w-full min-h-40 flex space-x-4 overflow-hidden cursor-pointer">
			<img class="hover:scale-110 transition-all w-full" :src="props.postImg"  />
		</div>
		<figcaption class="flex flex-col p-4 gap-4">
			<div class="grid items-center gap-5 space-x- grid-cols-4">
				<div class="flex flex-row gap-3 col-span-2 items-center">
					<img class="w-12 rounded-full aspect-square object-cover" :src="props.userImg"  />
					<span class="">{{ props.username }}</span>
				</div>
				<span class="rounded-lg col-span-1 col-start-4 flex justify-end items-center gap-2 cursor-pointer"><i class="bi bi-heart"></i> {{ props.likes }}</span>
			</div>
			<hr />
			<div class="flex flex-col gap-2">
				<span>{{ props.description }}</span>
				<p class="text-gray-500 text-sm font-semibold">{{ new Date(props.seconds * 1000).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '/') }}</p>
			</div>
		</figcaption>
	</figure>

</template>

<style scoped>
</style>