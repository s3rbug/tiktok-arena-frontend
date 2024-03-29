export type ErrorType = {
	login?: null | string
	register?: null | string
	createTournament?: null | string
	editTournament?: null | string
}

export type SuccessType = {
	createTournament?: null | boolean
	editTournament?: null | boolean
	endTournament?: null | boolean
}

export enum LOCALS {
	EN = "en",
	UA = "uk-UA",
}

export type ValueOf<T> = T[keyof T]
