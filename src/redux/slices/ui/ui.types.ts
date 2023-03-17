export type ErrorType = {
	login?: null | string
	register?: null | string
	createTournament?: null | string
}

export type SuccessType = {
	createTournament?: null | boolean
}

export type ValueOf<T> = T[keyof T]
