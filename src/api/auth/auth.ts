import { UserAuthDetailsType } from "../../redux/slices/auth/auth.types"
import { jsonFetch } from "../jsonFetch"
import { AuthPayloadType, AuthTokenType } from "./auth.types"

export const authApi = {
	login: async ({ name, password }: AuthPayloadType) => {
		return jsonFetch.post<UserAuthDetailsType>("/auth/login", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
	register: async ({ name, password }: AuthPayloadType) => {
		return jsonFetch.post<UserAuthDetailsType>("/auth/register", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
	whoami: async ({ token }: AuthTokenType) => {
		return jsonFetch.get<UserAuthDetailsType>("/auth/whoami", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
