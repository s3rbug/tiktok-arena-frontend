import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType } from "./auth.types"

const initialState = {
	user: null as UserType,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: UserType }>) => {
			const { user } = action.payload
			state.user = user
		},
		changeUserPicture: (
			state,
			action: PayloadAction<{ photoURL: string | null }>
		) => {
			const { photoURL } = action.payload
			if (state.user) {
				state.user.photoURL = photoURL
			}
		},
		logout: (state) => {
			state.user = null
		},
	},
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
