import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType, AuthErrorType } from "./auth.types"

const initialState = {
	token: null as null | string,
	user: null as UserType,
	error: {
		login: null,
		register: null,
	} as AuthErrorType,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<{ token: string }>) => {
			const { token } = action.payload
			state.token = token
		},
		setUser: (state, action: PayloadAction<{ user: UserType }>) => {
			const { user } = action.payload
			state.user = user
		},
		setLoginError: (state, action: PayloadAction<{ error: string | null }>) => {
			const { error } = action.payload
			state.error.login = error
		},
		setRegisterError: (
			state,
			action: PayloadAction<{ error: string | null }>
		) => {
			const { error } = action.payload
			state.error.register = error
		},
	},
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
