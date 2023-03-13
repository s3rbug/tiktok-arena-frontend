function urlWithPrefix(baseUrl: string, url: string) {
	if (url.startsWith("/")) {
		return baseUrl + url
	}
	return url
}

const fetchConfig = {
	baseUrl: "http://127.0.0.1:8000/api",
}

export const jsonFetch = {
	get: async function <T>(url: string, config?: RequestInit): Promise<T> {
		const response = await fetch(urlWithPrefix(fetchConfig.baseUrl, url), {
			...config,
			method: "GET",
		})
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return await response.json()
	},
	post: async function <T>(url: string, config?: RequestInit): Promise<T> {
		const response = await fetch(urlWithPrefix(fetchConfig.baseUrl, url), {
			...config,
			method: "POST",
		})
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return await response.json()
	},
	put: async function <T>(url: string, config?: RequestInit): Promise<T> {
		const response = await fetch(urlWithPrefix(fetchConfig.baseUrl, url), {
			...config,
			method: "PUT",
		})
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return await response.json()
	},
	delete: async function <T>(url: string, config?: RequestInit): Promise<T> {
		const response = await fetch(urlWithPrefix(fetchConfig.baseUrl, url), {
			...config,
			method: "DELETE",
		})
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return await response.json()
	},
}
