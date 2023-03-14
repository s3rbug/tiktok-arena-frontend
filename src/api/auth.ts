import { UserAuthDetailsType } from "../redux/slices/auth.types"
import { jsonFetch } from "./jsonFetch"

export type LoginPayloadType = {
	name: string
	password: string
}

export const authApi = {
	login: async ({ name, password }: LoginPayloadType) => {
		return jsonFetch.post<UserAuthDetailsType | undefined>("/auth/login", {
			body: JSON.stringify({
				name,
				password,
			}),
		})
	},
}
