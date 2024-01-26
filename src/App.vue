<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const words = ref<any[] | null>([])
const fetchWords = async () => {
	try {
		const { data } = await supabase.from('words').select().range(0, 99).order('hebrew', { ascending: true })
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
	<div class="grid place-content-center">
		<div class="max-w-5xl p-4">
			<table>
				<thead>
					<tr>
						<th class="px-2 py-0.5 text-left font-semibold">Hebräisch</th>
						<th class="px-2 py-0.5 text-left font-semibold">Deutsch</th>
						<th class="px-2 py-0.5 text-left font-semibold">Aussprache</th>
						<!-- <th class="px-2 py-0.5 text-left font-semibold">example</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">example_translation</th> -->
						<th class="px-2 py-0.5 text-left font-semibold">Wortart</th>
						<!-- <th class="px-2 py-0.5 text-left font-semibold">root</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">gender</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">irregular_plural</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">stem_id</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">conjugation_present</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">pronunciation_present</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">training_level</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">no_training</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">created</th> -->
						<!-- <th class="px-2 py-0.5 text-left font-semibold">modified</th> -->
					</tr>
				</thead>

				<tbody>
					<tr v-for="{ id, german, hebrew, pronunciation, classification_id } in words" :key="id">
						<td class="px-2 py-0.5" lang="he">{{ hebrew }}</td>
						<td class="px-2 py-0.5" lang="de">{{ german }}</td>
						<td class="px-2 py-0.5">{{ pronunciation }}</td>
						<td class="px-2 py-0.5">{{ classification.get(classification_id) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
