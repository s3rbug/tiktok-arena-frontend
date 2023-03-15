import { UserAuthDetailsType } from "../redux/slices/auth.types"
import { jsonFetch } from "./jsonFetch"

export type LoginPayloadType = {
	name: string
	password: string
}

export type WhoamiPayloadType = {
	token: string
}

export const authApi = {
	login: async ({ name, password }: LoginPayloadType) => {
		return jsonFetch.post<UserAuthDetailsType>("/auth/login", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
	whoami: async ({ token }: WhoamiPayloadType) => {
		return jsonFetch.get<UserAuthDetailsType>("/auth/whoami", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
