<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import { useStore, stem, classification } from '@/use/store'

const { state, fetchEntries } = useStore()

const isLoading = ref(false)
const fetchWords = () => {
	if (!isLoading.value) {
		isLoading.value = true
		fetchEntries()
	}
}

const loaderEl = ref(null)
let observer: IntersectionObserver | null = null
const _startObserver = () => {
	if (!loaderEl.value) return

	observer = new IntersectionObserver(
		([entry], self) => {
			if (entry.isIntersecting) {
				fetchWords()
				self.unobserve(entry.target)
			}
		},
		{ rootMargin: '0px 0px 120px 0px', threshold: 0 },
	)
	observer.observe(loaderEl.value)
}
const _stopObserver = () => {
	observer?.disconnect()
}

onMounted(() => {
	if (!state.hasLoaded) _startObserver()
})
onBeforeUnmount(() => {
	_stopObserver()
})
</script>

<template>
	<div>
		<table class="sj__table w-full">
			<thead>
				<tr>
					<th>Hebräisch</th>
					<th>Deutsch</th>
					<th class="<sm:hidden">Aussprache</th>
					<th class="<md:hidden">Wortart</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="{ id, german, hebrew, pronunciation, classification_id } in state.words" :key="id">
					<td lang="he">{{ hebrew }}</td>
					<td lang="de">{{ german }}</td>
					<td class="<sm:hidden">{{ pronunciation }}</td>
					<td class="<md:hidden">{{ classification.get(classification_id) }}</td>
				</tr>
			</tbody>
		</table>

		<div ref="loaderEl" class="mx-auto mt-4 w-7" :class="{ invisible: !isLoading, hidden: state.hasLoaded }">
			<AppLoader class="aspect-1 w-7" width="28" height="28" />
		</div>
	</div>
</template>
