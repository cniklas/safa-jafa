import { ref, reactive, readonly } from 'vue'
import { supabase } from '@/supabase'
import type { Word } from '@/types/Word.type'
// import { useToast } from './toast'

// const { addToast } = useToast()

export const stem = readonly(
	new Map([
		[1, 'Pa’al'],
		[2, 'Nif’al'],
		[3, 'Pi’el'],
		[4, 'Pu’al'],
		[5, 'Hif’il'],
		[6, 'Huf’al'],
		[7, 'Hitpa’el'],
	]),
)

export const classification = readonly(
	new Map([
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
	]),
)

const state = reactive<{
	words: Word[]
	hasLoaded: boolean
	isAuthenticated: boolean
}>({
	words: [],
	hasLoaded: false,
	// hasHistory: false,
	isAuthenticated: false,
})

// const search = ref('')
// const sorting = reactive<{
// 	key: 'name' | 'category_id' | 'complexity' | 'duration'
// 	order: { name: number; category_id: number; complexity: number; duration: number }
// }>({
// 	key: 'name',
// 	order: { name: 1, category_id: 1, complexity: 1, duration: 1 },
// })

const fetchEntries = async (limit = 0) => {
	if (state.hasLoaded) return

	try {
		const { data, error, status } =
			limit > 0
				? await supabase
						.from('words')
						.select()
						.range(0, limit - 1)
						.order('hebrew', { ascending: true })
				: await supabase.from('words').select().order('hebrew', { ascending: true })
		if (error) throw error
		if (data === null) throw new Error('Verbindung zur Datenbank fehlgeschlagen.')

		if (!limit) state.hasLoaded = true
		state.words = data
	} catch (error: any) {
		// const message = error.message ?? 'Verbindung zum Server fehlgeschlagen.'
		// addToast(message) // ¯\\_(ツ)_/¯
	}
}

const setAuthState = (isAuthenticated = false) => {
	state.isAuthenticated = isAuthenticated
}

// Singleton State Pattern, see https://markus.oberlehner.net/blog/vue-composition-api-composables/#the-singleton-state-pattern
export const useStore = () => ({
	state: readonly(state),
	// search, // mutable
	// sorting, // mutable
	fetchEntries,
	setAuthState,
})
