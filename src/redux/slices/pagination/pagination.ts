import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	currentPage: null as number | null,
	lastPage: null as number | null,
	maxLength: 7 as number,
	pageSize: 8 as number,
}

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
			const { page } = action.payload
			state.currentPage = page
		},
		setLastPage: (state, action: PayloadAction<{ lastPage: number }>) => {
			const { lastPage } = action.payload
			state.lastPage = lastPage
		},
	},
})

export const paginationReducer = paginationSlice.reducer

export const paginationActions = paginationSlice.actions
