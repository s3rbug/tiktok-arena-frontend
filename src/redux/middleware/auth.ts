import { uiActions } from "./../slices/ui/ui"
import { AppThunkType } from "./../store"
import { AuthTokenType } from "./../../api/auth"
import { UserType } from "../slices/auth/auth.types"
import { authApi, AuthPayloadType } from "../../api/auth"
import { authActions } from "../slices/auth/auth"
import { localToken } from "../../localStorage/token"

export const login =
	({ name, password }: AuthPayloadType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.login({ name, password })
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
							} as UserType,
							token: userDetails.Token,
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

export const register =
	({ name, password }: AuthPayloadType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.register({ name, password })
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
							} as UserType,
							token: userDetails.Token,
						})
					)
					localToken.setToken(userDetails.Token)
				}
			})
			.catch((error: Error) => {
				const message: string | undefined = JSON.parse(error.message)?.message

				if (message) {
					dispatch(uiActions.setError({ errors: { register: message } }))
				} else {
					dispatch(
						uiActions.setError({
							errors: { register: "Server connection error" },
						})
					)
				}
			})
	}

export const whoami =
	({ token }: AuthTokenType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.whoami({ token })
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
							} as UserType,
							token: userDetails.Token,
						})
					)
				}
			})
			.catch(() => {
				localToken.clearToken()
			})
	}
