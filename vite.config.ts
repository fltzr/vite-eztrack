/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsConfigPaths()],

	build: {
		outDir: 'dist',
		minify: 'terser',
		cssMinify: 'lightningcss',
		sourcemap: true,
		terserOptions: {
			compress: {
				keep_infinity: true,
				drop_console: true,
			},
		},

		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router-dom'],
					vendor: ['lodash', '@cloudscape-design'],
				},
			},
		},
	},

	server: {
		port: 3000,
		open: true,
	},

	preview: {
		port: 3000,
		open: true,
	},

	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['src/test/setup.ts'],
	},

	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%')),
		},
	},
});
