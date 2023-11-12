/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import tsConfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

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

    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
    },

    server: {
        strictPort: true,
        port: 3000,
        open: false,
    },

    preview: {
        port: 3000,
        open: true,
    },

    build: {
        outDir: 'dist',
        minify: 'terser',
        cssMinify: 'lightningcss',
        cssCodeSplit: true,
        terserOptions: {
            mangle: true,
            sourceMap: true,
            compress: {
                keep_infinity: true,
                drop_console: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules'))
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                },
            },
            treeshake: true,
        },
    },

    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['src/test/setup.ts'],
    },
});
