<script setup lang="ts">
import ListWords from '@/views/ListWords.vue'
import { useStore } from '@/use/store'

const { state, fetchEntries } = useStore()
fetchEntries(100)
</script>

<template>
	<main class="grid place-content-center py-5">
		<div class="max-w-5xl px-4">
			<div v-show="!state.words.length">Lade Daten …</div>
			<ListWords v-show="state.words.length" />
		</div>
	</main>
</template>
