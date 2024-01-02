/// <reference types="vitest" />
/// <reference types="vite/client" />

import { type Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [react(), tsConfigPaths(), splitVendorChunkPlugin(), visualizer() as Plugin],

	resolve: {
		alias: {
			'@cloudscape-design/components': resolve(__dirname, './src-theme/components'),
			'@cloudscape-design/design-tokens': resolve(
				__dirname,
				'./src-theme/design-tokens',
			),
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
