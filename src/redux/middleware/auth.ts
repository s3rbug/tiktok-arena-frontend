import { uiActions } from "./../slices/ui/ui"
import { AppThunkType } from "./../store"
import { UserType } from "../slices/auth/auth.types"
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
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
								token: userDetails.Token,
							} as UserType,
						})
					)
					localToken.setToken(userDetails.Token)
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
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
								token: userDetails.Token,
							} as UserType,
						})
					)
					localToken.setToken(userDetails.Token)
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
			.then((userDetails) => {
				if (userDetails) {
					dispatch(
						authActions.setUser({
							user: {
								id: userDetails.ID,
								name: userDetails.Username,
								token: userDetails.Token,
								photoURL: userDetails?.PhotoURL || null,
							} as UserType,
						})
					)
				}
			})
			.catch((error: RequestError) => {
				if (error.status === StatusCodes.UNAUTHORIZED) {
					localToken.clearToken()
				}
			})
	}
