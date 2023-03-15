import { AppThunkType } from "./../store"
import { WhoamiPayloadType } from "./../../api/auth"
import { UserType } from "./../slices/auth.types"
import { authApi, LoginPayloadType } from "../../api/auth"
import { authActions } from "../slices/auth"
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
					dispatch(authActions.setLoginError({ error: message }))
				} else {
					dispatch(
						authActions.setLoginError({ error: "Server connection error" })
					)
				}
			})
	}

export const whoami =
	({ token }: WhoamiPayloadType): AppThunkType =>
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
				console.log(error)
			})
	}
