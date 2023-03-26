export type PaginationItemType = {
	currentPage: number | null
	lastPage: number | null
	maxLength: number
	pageSize: number
	total: number | null
}

export type PaginationStateType = {
	globalTournaments: PaginationItemType
	userTournaments: PaginationItemType
}

export type PaginationKeys = keyof PaginationStateType
