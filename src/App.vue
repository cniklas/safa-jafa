<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Word } from '@/types/Word.type'

import { supabase } from './supabase'

const stem = new Map([
	[1, 'Pa’al'],
	[2, 'Nif’al'],
	[3, 'Pi’el'],
	[4, 'Pu’al'],
	[5, 'Hif’il'],
	[6, 'Huf’al'],
	[7, 'Hitpa’el'],
])

const classification = new Map([
	[1, 'Substantiv'],
	[2, 'Verb'],
	[3, 'Adjektiv'],
	[4, 'Adverb'],
	[5, 'Pronomen'],
	[6, 'Präposition'],
	[7, 'Konjunktion'],
	[8, 'Numerale'],
	[9, 'Artikel'],
	[10, 'Formulierung'],
	[11, 'Slang'],
	[12, 'Tanachzitat'],
])

const words = ref<Word[] | null>([])
const fetchWords = async () => {
	try {
		const { data, error, status } = await supabase
			.from('words')
			.select()
			.range(0, 99)
			.order('hebrew', { ascending: true })
		if (error) throw error

		words.value = data
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	fetchWords()
})
</script>

<template>
	<main class="grid place-content-center py-5">
		<div class="max-w-5xl px-4">
			<div v-if="!words?.length">Lade Daten …</div>
			<table v-else class="sf__table w-full">
				<thead>
					<tr>
						<th>Hebräisch</th>
						<th>Deutsch</th>
						<th class="<sm:hidden">Aussprache</th>
						<th class="<md:hidden">Wortart</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="{ id, german, hebrew, pronunciation, classification_id } in words" :key="id">
						<td lang="he">{{ hebrew }}</td>
						<td lang="de">{{ german }}</td>
						<td class="<sm:hidden">{{ pronunciation }}</td>
						<td class="<md:hidden">{{ classification.get(classification_id) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</main>
</template>
