import { UserType } from "./../slices/auth.types"
import { authApi, LoginPayloadType } from "../../api/auth"
import { authActions } from "../slices/auth"
import { AppThunkType } from "../store"

export const login =
	({ name, password }: LoginPayloadType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.login({ name, password })
			.then((userDetails) => {
				if (userDetails) {
					dispatch(authActions.setToken({ token: userDetails.Token }))
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
							} as UserType,
						})
					)
				}
			})
			.catch((error: Error) => {
				const message: string | undefined = JSON.parse(error.message)?.message

				if (message) {
					dispatch(authActions.setLoginError({ error: message }))
				} else {
					dispatch(
						authActions.setLoginError({ error: "Server connection error" })
					)
				}
			})
	}
