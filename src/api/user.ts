import { authHeader, jsonFetch } from "./jsonFetch"

export const userApi = {
	changePicture: async ({
		photoURL,
		token,
	}: {
		photoURL: string
		token: string
	}) => {
		return jsonFetch.post("/user/photo", {
			body: JSON.stringify({ photoURL }),
			headers: {
				...authHeader(token),
			},
		})
	},
}
