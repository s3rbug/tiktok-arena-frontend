import {
	TournamentType,
	ContestType,
	TournamentFormat,
} from "../redux/slices/tournament/tournament.types"
import { jsonFetch } from "./jsonFetch"

export type GetContestPayloadType = {
	tournamentId: string
	tounamentFormat: TournamentFormat
}

export type GetTournamentPayloadType = {
	tournamentId: string
}

export type CreateTournamentPayloadType = {
	name: string
	size: number
	tiktoks: {
		url: string
	}[]
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
	createTournament: async function (
		data: CreateTournamentPayloadType,
		token: string | null
	) {
		return jsonFetch.post("/tournament", {
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
