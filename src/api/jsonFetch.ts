import { AppStateType } from "../redux/store"

export function getErrorMessage(error: Error): string | undefined {
	try {
		return JSON.parse(error.message)?.message
	} catch {
		return undefined
	}
}

export function getToken(
	getState: () => AppStateType,
	callbackFn?: () => void
): string | undefined | null {
	const token = getState().auth?.user?.token
	if (!token && callbackFn) {
		callbackFn()
	}

	return token
}

export function authHeader(token: string): { Authorization: string } {
	return {
		Authorization: `Bearer ${token}`,
	}
}

function urlWithPrefix(baseUrl: string, url: string) {
	if (url.startsWith("/")) {
		return baseUrl + url
	}
	return url
}

function isProduction() {
	return import.meta.env.MODE === "production"
}

const defaultConfig = {
	baseUrl: isProduction()
		? "https://tiktok-arena.onrender.com/api"
		: "http://127.0.0.1:8000/api",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
}

export class RequestError extends Error {
	status: number
	constructor(message: string, status: number) {
		super(message)
		this.name = "RequestError"
		this.status = status
	}
}

const requestTemplate = (method: "GET" | "POST" | "PUT" | "DELETE") =>
	async function <T>(
		url: string,
		config?: RequestInit,
		overrideConfig?: boolean
	): Promise<T | undefined> {
		const response = await fetch(urlWithPrefix(defaultConfig.baseUrl, url), {
			...config,
			headers: overrideConfig
				? {
						...config?.headers,
				  }
				: {
						...config?.headers,
						...defaultConfig.headers,
				  },
			method,
		})

		if (!response.ok) {
			return response.text().then((text) => {
				throw new RequestError(text, response.status)
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
