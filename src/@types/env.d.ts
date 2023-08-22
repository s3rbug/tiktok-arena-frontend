/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly ENV_IMAGE_CLOUD_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
