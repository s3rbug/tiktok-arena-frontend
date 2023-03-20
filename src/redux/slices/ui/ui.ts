import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ErrorType, ValueOf, SuccessType } from "./ui.types"

const initialState = {
	errors: {
		login: null,
		register: null,
		createTournament: null,
		editTournament: null,
	} as ErrorType,
	success: {
		createTournament: null,
		editTournament: null,
	} as SuccessType,
}

const objectMap = <T>(
	obj: Object,
	fn: (value: ValueOf<T>, key: keyof T, index: number) => ValueOf<T>
) =>
	Object.fromEntries(
		Object.entries(obj).map(([key, value], index) => [
			key,
			fn(value, key as keyof T, index),
		])
	)

const ui = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<{ errors: ErrorType }>) => {
			const { errors } = action.payload
			state.errors = objectMap<ErrorType>(state.errors, (value, key) => {
				if (errors[key] !== undefined) {
					return errors[key]
				}
				return value
			})
		},
		setSuccess: (state, action: PayloadAction<{ success: SuccessType }>) => {
			const { success } = action.payload
			state.success = objectMap<SuccessType>(state.success, (value, key) => {
				if (success[key] !== undefined) {
					return success[key]
				}
				return value
			})
		},
	},
})

export const uiActions = ui.actions

export const uiReducer = ui.reducer
