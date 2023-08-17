import {
	TikTok,
	TournamentFormType,
} from "../../redux/slices/tournament/tournament.types"

export type GetTournamentPayloadType = {
	tournamentId: string
}

export type CreateTournamentPayloadType = {
	size: number
	PhotoURL?: string | null
} & TournamentFormType

export type DeleteTournamentsPayload = {
	TournamentIds: string[]
}

export type GetTikToksPayloadType = {
	tournamentId: string
}

export type GetTournamentsPayload = {
	page: number
	pageSize: number
	search?: string | null
}
export type GetTiktoksType = {
	TiktoksStats: TikTok[]
}
