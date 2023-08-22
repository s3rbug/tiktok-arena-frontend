import { UserType } from "../auth/auth.types"

export type TournamentType = {
	id: string
	name: string
	size: number
	userID: string
	timesPlayed: number
	isPrivate: boolean
	photoURL?: string | null
}

export type TournamentsDataType = {
	tournaments: TournamentType[]
	user: UserType
	totalTournamentCount: number
}

export type TournamentDataType = {
	tournament: TournamentType
	user: UserType
}

export type UserTournamentDataType = TournamentDataType & {
	tournamentCount: number
}

export type TournamentWithUserType = TournamentType & {
	user: UserType
}

export enum TournamentFormat {
	SINGLE_ELIMINATION = "single_elimination",
	KING_OF_THE_HILL = "king_of_the_hill",
}

export type TournamentFormType = {
	name: string
	photoURL: string | null
	isPrivate?: boolean
	tiktoks: {
		url: string
		name: string
	}[]
}

export type TikTok = {
	tournamentID: string
	url: string
	wins: number
	name: string
	thumbnailUrl: string | null
}
