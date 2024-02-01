import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), UnoCSS()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	// https://vitejs.dev/config/build-options.html#build-target
	build: {
		target: 'esnext',
	},
	define: {
		// https://stackoverflow.com/a/68093777/3870081
		__BUILD_TIME__: JSON.stringify(new Date().getTime()),
	},
})
