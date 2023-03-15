import { localStorageWrapper, LOCAL_STORAGE_KEY } from "./localStorageWrapper"

export const localToken = {
	setToken: (token: string) => {
		localStorageWrapper.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token)
	},

	getToken: () => {
		return localStorageWrapper.get<string | null>(
			LOCAL_STORAGE_KEY.ACCESS_TOKEN
		)
	},

	clearToken: () => {
		localStorageWrapper.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, null)
	},
}
