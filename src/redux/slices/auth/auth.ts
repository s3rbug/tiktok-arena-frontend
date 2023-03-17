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
		setUser: (
			state,
			action: PayloadAction<{ user: UserType; token: string }>
		) => {
			const { user, token } = action.payload
			state.user = user
			state.token = token
		},
		logout: (state) => {
			state.token = state.user = null
		},
	},
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
