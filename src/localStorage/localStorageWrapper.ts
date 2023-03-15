export const LOCAL_STORAGE_KEY = {
	ACCESS_TOKEN: "token",
} as const

type LocalStorageKeyType = keyof typeof LOCAL_STORAGE_KEY
type LocalStorageValueType = typeof LOCAL_STORAGE_KEY[LocalStorageKeyType]

export const localStorageWrapper = {
	get<Type>(key: LocalStorageValueType): Type | undefined {
		const value = localStorage.getItem(key)
		if (value) {
			return JSON.parse(value)
		} else {
			return undefined
		}
	},
	set<Type>(
		key: LocalStorageValueType,
		value: Type | string | null | undefined
	) {
		localStorage.setItem(key, JSON.stringify(value))
	},
}
