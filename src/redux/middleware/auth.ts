import { uiActions } from "./../slices/ui/ui"
import { AppThunkType } from "./../store"
import { AuthPayloadType } from "./../../api/auth"
import { UserType } from "../slices/auth/auth.types"
import { authApi, LoginPayloadType } from "../../api/auth"
import { authActions } from "../slices/auth/auth"
import { localToken } from "../../localStorage/token"

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
					localToken.setToken(userDetails.Token)
				}
			})
			.catch((error: Error) => {
				const message: string | undefined = JSON.parse(error.message)?.message

				if (message) {
					dispatch(uiActions.setError({ errors: { login: message } }))
				} else {
					dispatch(
						uiActions.setError({ errors: { login: "Server connection error" } })
					)
				}
			})
	}

export const whoami =
	({ token }: AuthPayloadType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.whoami({ token })
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
			.catch((error) => {
				localToken.clearToken()
			})
	}
