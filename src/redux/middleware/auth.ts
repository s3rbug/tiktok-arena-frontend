import { uiActions } from "./../slices/ui/ui"
import { AppThunkType } from "./../store"
import { authApi } from "../../api/auth/auth"
import { AuthPayloadType, AuthTokenType } from "../../api/auth/auth.types"
import { authActions } from "../slices/auth/auth"
import { localToken } from "../../localStorage/token"
import { getErrorMessage, RequestError } from "../../api/jsonFetch"
import { StatusCodes } from "http-status-codes"

export const login =
	({ name, password }: AuthPayloadType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.login({ name, password })
			.then((user) => {
				if (user && user.Token) {
					dispatch(
						authActions.setUser({
							user,
						})
					)
					localToken.setToken(user.Token)
				}
			})
			.catch((error: RequestError) => {
				const message = getErrorMessage(error)

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
			.then((user) => {
				if (user && user.Token) {
					dispatch(
						authActions.setUser({
							user,
						})
					)
					localToken.setToken(user.Token)
				}
			})
			.catch((error: RequestError) => {
				const message = getErrorMessage(error)

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
			.then((user) => {
				if (user) {
					dispatch(authActions.setUser({ user }))
				}
			})
			.catch((error: RequestError) => {
				if (error.status === StatusCodes.UNAUTHORIZED) {
					localToken.clearToken()
				}
			})
	}
