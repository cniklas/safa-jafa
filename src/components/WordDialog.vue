<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { stem, classification } from '@/use/store'
import type { Word } from '@/types/Word.type'

defineProps<{ word?: Word }>()

const dialogEl = useTemplateRef<HTMLDialogElement | null>('dialogEl')
const open = () => {
	dialogEl.value?.showModal()
}

defineExpose({ open })
</script>

<template>
	<dialog ref="dialogEl" class="word-dialog w-md">
		<button type="button" @click="dialogEl?.close()">close</button>

		<template v-if="word">
			<div class="text-center text-3xl" lang="he">{{ word.hebrew }}</div>

			<dl class="word-dialog-list">
				<dt>Deutsch:</dt>
				<dd lang="de">{{ word.german }}</dd>
				<dt>Aussprache:</dt>
				<dd>{{ word.pronunciation }}</dd>

				<template v-if="word.root">
					<dt>Schoresch:</dt>
					<dd lang="he">{{ word.root }}</dd>
				</template>

				<template v-if="word.classification_id">
					<dt>Wortart:</dt>
					<dd>{{ classification.get(word.classification_id) }}</dd>
				</template>

				<template v-if="word.gender">
					<dt>Geschlecht:</dt>
					<dd :class="{ 'is-irregular': word.irregular_plural }">
						{{ word.gender }}
					</dd>
				</template>

				<template v-if="word.example">
					<dt>Beispiel:</dt>
					<dd lang="he">{{ word.example }}</dd>
					<dt>Übersetzung</dt>
					<dd>{{ word.example_translation }}</dd>
				</template>

				<template v-if="word.classification_id === 2">
					<dt>Binjan:</dt>
					<dd>{{ stem.get(word.stem_id) }}</dd>
					<dt>Präsens:</dt>
					<dd lang="he">{{ word.conjugation_present }}</dd>
					<dt>Aussprache:</dt>
					<dd>{{ word.pronunciation_present }}</dd>
				</template>

				<template v-if="!word.no_training">
					<dt>Trainingsstufe</dt>
					<dd>{{ word.training_level }}</dd>
				</template>
			</dl>
		</template>
	</dialog>
</template>

<style>
.word-dialog {
	padding: var(--size-4);
}

.word-dialog-list {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: var(--size-4);

	& > [lang='he'] {
		justify-self: start;
	}
}

.is-irregular {
	font-weight: 500;
	color: rgb(239 68 68); /* red-500 tbd */

	&::after {
		content: '!';
	}
}
</style>
