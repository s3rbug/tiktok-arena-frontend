import {
	TournamentType,
	ContestType,
	TournamentFormat,
} from "./../redux/slices/tournament.types"
import { jsonFetch } from "./jsonFetch"

export type GetContestPayloadType = {
	tournamentId: string
	tounamentFormat: TournamentFormat
}

export type GetTournamentPayloadType = {
	tournamentId: string
}

export const tournamentApi = {
	getAllTournaments: async function () {
		return jsonFetch.get<TournamentType[]>("/tournament")
	},
	getContest: async function ({
		tournamentId,
		tounamentFormat,
	}: GetContestPayloadType) {
		return jsonFetch.get<ContestType>(
			`/tournament/${tournamentId}/contest?type=${tounamentFormat}`
		)
	},
	getTournament: async function ({ tournamentId }: GetTournamentPayloadType) {
		return jsonFetch.get<TournamentType>(`/tournament/${tournamentId}`)
	},
}
