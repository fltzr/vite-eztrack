/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { type Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { visualizer } from 'rollup-plugin-visualizer';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

export default defineConfig({
	plugins: [
		million.vite({ auto: true }),
		react(),
		tsConfigPaths(),
		splitVendorChunkPlugin(),
		visualizer() as Plugin,
	],

	resolve: {
		alias: {
			'@cloudscape-design/components': resolve(__dirname, './src-theme/components'),
			'@cloudscape-design/design-tokens': resolve(
				__dirname,
				'./src-theme/design-tokens',
			),
		},
	},

	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>=0.25%')),
		},
	},

	server: {
		strictPort: true,
		port: 3000,
		open: false,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},

	preview: {
		port: 3000,
		open: false,
	},

	build: {
		outDir: 'dist',
		emptyOutDir: true,
		cssMinify: 'lightningcss',
		rollupOptions: {
			output: {
				experimentalMinChunkSize: 500,
				entryFileNames: 'assets/public/[name].[hash].js',
				chunkFileNames: 'assets/chunks/[name].[hash].js',
				assetFileNames: 'assets/vendor/[name].[hash].[ext]',
				manualChunks: (id) => {
					if (id.includes('components/spinner')) {
						return 'spinner';
					}
					if (id.includes('react-dom')) {
						return 'react-dom';
					}
				},
			},
		},
	},

	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['src/test/setup.ts'],
	},
});
