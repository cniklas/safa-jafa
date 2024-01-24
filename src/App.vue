<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { supabase } from './supabase'

const words = ref<any[] | null>([])

const fetchWords = async () => {
	try {
		const { data } = await supabase.from('words').select().range(0, 9)
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
	<table>
		<thead>
			<tr>
				<th class="text-left font-semibold">id</th>
				<th class="text-left font-semibold">german</th>
				<th class="text-left font-semibold">hebrew</th>
				<th class="text-left font-semibold">pronunciation</th>
				<th class="text-left font-semibold">example</th>
				<th class="text-left font-semibold">example_translation</th>
				<th class="text-left font-semibold">classification_id</th>
				<th class="text-left font-semibold">root</th>
				<th class="text-left font-semibold">gender</th>
				<th class="text-left font-semibold">irregular_plural</th>
				<th class="text-left font-semibold">stem_id</th>
				<th class="text-left font-semibold">conjugation_present</th>
				<th class="text-left font-semibold">pronunciation_present</th>
				<th class="text-left font-semibold">training_level</th>
				<th class="text-left font-semibold">no_training</th>
				<th class="text-left font-semibold">created</th>
				<th class="text-left font-semibold">modified</th>
			</tr>
		</thead>

		<tbody>
			<tr
				v-for="{
					id,
					german,
					hebrew,
					pronunciation,
					example,
					example_translation,
					classification_id,
					root,
					gender,
					irregular_plural,
					stem_id,
					conjugation_present,
					pronunciation_present,
					training_level,
					no_training,
					created,
					modified,
				} in words"
				:key="id"
			>
				<td>{{ id }}</td>
				<td>{{ german }}</td>
				<td>{{ hebrew }}</td>
				<td>{{ pronunciation }}</td>
				<td>{{ example }}</td>
				<td>{{ example_translation }}</td>
				<td>{{ classification_id }}</td>
				<td>{{ root }}</td>
				<td>{{ gender }}</td>
				<td>{{ irregular_plural }}</td>
				<td>{{ stem_id }}</td>
				<td>{{ conjugation_present }}</td>
				<td>{{ pronunciation_present }}</td>
				<td>{{ training_level }}</td>
				<td>{{ no_training }}</td>
				<td>{{ created }}</td>
				<td>{{ modified }}</td>
			</tr>
		</tbody>
	</table>
</template>
