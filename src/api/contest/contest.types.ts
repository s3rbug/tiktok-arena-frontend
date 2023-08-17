import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"

export type GetContestPayloadType = {
	tournamentId: string
	tournamentFormat: TournamentFormat
}

export type EndContestPayloadType = {
	tournamentId: string
	winnerURL: string
}
