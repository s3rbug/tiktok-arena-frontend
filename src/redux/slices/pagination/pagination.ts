import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PaginationKeys, PaginationStateType } from "./pagination.types"

const MAX_LENGTH = 7
const PAGE_SIZE = 8

const initialState = {
	globalTournaments: {
		currentPage: 1,
		lastPage: null,
		maxLength: MAX_LENGTH,
		pageSize: PAGE_SIZE,
		total: null,
	},
	userTournaments: {
		currentPage: 1,
		lastPage: null,
		maxLength: MAX_LENGTH,
		pageSize: PAGE_SIZE,
		total: null,
	},
} as PaginationStateType

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setCurrentPage: (
			state,
			action: PayloadAction<{ page: number; key: PaginationKeys }>
		) => {
			const { page, key } = action.payload
			state[key].currentPage = page
		},
		setLastPage: (
			state,
			action: PayloadAction<{ lastPage: number; key: PaginationKeys }>
		) => {
			const { lastPage, key } = action.payload
			state[key].lastPage = lastPage
		},
		setTotal: (
			state,
			action: PayloadAction<{ total: number; key: PaginationKeys }>
		) => {
			const { total, key } = action.payload
			state[key].total = total
		},
	},
})

export const paginationReducer = paginationSlice.reducer

export const paginationActions = paginationSlice.actions
