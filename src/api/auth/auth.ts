import { UserType } from "../../redux/slices/auth/auth.types"
import { jsonFetch } from "../jsonFetch"
import { AuthPayloadType, AuthTokenType } from "./auth.types"

export const authApi = {
	login: async ({ name, password }: AuthPayloadType) => {
		return jsonFetch.post<UserType>("/auth/login", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
	register: async ({ name, password }: AuthPayloadType) => {
		return jsonFetch.post<UserType>("/auth/register", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
	whoami: async ({ token }: AuthTokenType) => {
		return jsonFetch.get<UserType>("/auth/whoami", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
