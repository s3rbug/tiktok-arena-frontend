import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType } from "./auth.types"

const initialState = {
	token: null as null | string,
	user: null as UserType,
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
		logout: (state) => {
			state.token = state.user = null
		},
	},
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
