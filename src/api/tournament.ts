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

export const tournamentApi = {
	getAllTournaments: async function () {
		return jsonFetch.get<TournamentType[] | undefined>("/tournament")
	},
	getContest: async function ({
		tournamentId,
		tounamentFormat,
	}: GetContestPayloadType) {
		return jsonFetch.get<ContestType | undefined>(
			`/tournament/${tournamentId}/contest?type=${tounamentFormat}`
		)
	},
}
