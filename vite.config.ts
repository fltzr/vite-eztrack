/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsConfigPaths(), splitVendorChunkPlugin()],

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
		hmr: {
			overlay: false,
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
