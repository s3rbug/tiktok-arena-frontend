import {
	TikTok,
	TournamentFormType,
} from "../../redux/slices/tournament/tournament.types"

export type GetTournamentPayloadType = {
	tournamentId: string
}

export type CreateTournamentPayloadType = {
	size: number
	photoURL?: string | null
} & TournamentFormType

export type DeleteTournamentsPayload = {
	tournamentIds: string[]
}

export type GetTikToksPayloadType = {
	tournamentId: string
}

export type GetTournamentsPayload = {
	page: number
	pageSize: number
	search?: string | null
}

export type GetUserTournamentsPayload = GetTournamentsPayload & {
	userId: string
}

export type GetTiktoksType = {
	tiktoksStats: TikTok[]
}
