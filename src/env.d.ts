/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_PB_URI: string;
	VITE_API_URI: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
