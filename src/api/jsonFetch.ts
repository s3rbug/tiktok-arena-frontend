function urlWithPrefix(baseUrl: string, url: string) {
	if (url.startsWith("/")) {
		return baseUrl + url
	}
	return url
}

const fetchConfig = {
	baseUrl: "http://127.0.0.1:8000/api",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
}

const requestTemplate = (method: "GET" | "POST" | "PUT" | "DELETE") =>
	async function <T>(
		url: string,
		config?: RequestInit
	): Promise<T | undefined> {
		const response = await fetch(urlWithPrefix(fetchConfig.baseUrl, url), {
			...config,
			headers: {
				...config?.headers,
				...fetchConfig.headers,
			},
			method,
		})
		if (!response.ok) {
			return response.text().then((text) => {
				throw new Error(text)
			})
		}
		return await response.json()
	}

export const jsonFetch = {
	get: requestTemplate("GET"),
	post: requestTemplate("POST"),
	put: requestTemplate("PUT"),
	delete: requestTemplate("DELETE"),
}
