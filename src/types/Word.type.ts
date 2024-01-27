export type Word = {
	id: number
	german: string | null
	hebrew: string | null
	pronunciation: string | null
	example: string | null
	example_translation: string | null
	classification_id: number
	root: string | null
	gender: 'f' | 'm' | null
	irregular_plural: boolean
	stem_id: number
	conjugation_present: string | null
	pronunciation_present: string | null
	training_level: '1' | '2' | '3' | '4' | '5' | '6'
	no_training: boolean
	created: string // date
	modified: string // datetime
}
