import { UserType } from "../auth/auth.types"

export type TournamentType = {
	ID: string
	Name: string
	Size: number
	UserId: string
	TimesPlayed: number
	checked?: boolean
	isPrivate: boolean
	PhotoURL?: string | null
}

export type TournamentsDataType = {
	Tournaments: TournamentType[]
	User: UserType
	TotalTournamentCount: number
}

export type TournamentDataType = {
	Tournament: TournamentType
	User: UserType
}

export type UserTournamentDataType = TournamentDataType & {
	TournamentCount: number
}

export type TournamentWithUserType = TournamentType & {
	User: UserType
}

export enum TournamentFormat {
	SINGLE_ELIMINATION = "single_elimination",
	KING_OF_THE_HILL = "king_of_the_hill",
}

export type TournamentFormType = {
	name: string
	photoURL: string | null
	// isPrivate: boolean
	tiktoks: {
		url: string
		name: string
	}[]
}

export type TikTok = {
	TournamentID: string
	URL: string
	Wins: number
	Name: string
	thumbnailUrl: string | null
}
