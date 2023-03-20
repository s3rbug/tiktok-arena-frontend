import { TikTok } from "./../redux/slices/tournament/tournament.types"
import {
	TournamentType,
	ContestType,
	TournamentFormat,
} from "../redux/slices/tournament/tournament.types"
import { jsonFetch } from "./jsonFetch"

export type GetContestPayloadType = {
	tournamentId: string
	tournamentFormat: TournamentFormat
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

export type DeleteTournamentsPayload = {
	TournamentIds: string[]
}

export type GetTikToksPayloadType = {
	tournamentId: string
}

export const tournamentApi = {
	getAllTournaments: async function () {
		return jsonFetch.get<TournamentType[]>("/tournament")
	},

	getContest: async function ({
		tournamentId,
		tournamentFormat,
	}: GetContestPayloadType) {
		return jsonFetch.get<ContestType>(
			`/tournament/contest/${tournamentId}?type=${tournamentFormat}`
		)
	},

	getTournament: async function ({ tournamentId }: GetTournamentPayloadType) {
		return jsonFetch.get<TournamentType>(`/tournament/${tournamentId}`)
	},

	createTournament: async function (
		data: CreateTournamentPayloadType,
		token: string
	) {
		return jsonFetch.post("/tournament/create", {
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	getUserTournaments: async function (token: string) {
		return jsonFetch.get<TournamentType[]>("/user/tournaments", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	deleteTournaments: async function (
		data: DeleteTournamentsPayload,
		token: string
	) {
		return jsonFetch.delete("/tournament/delete", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},

	getTikToks: async function (
		{ tournamentId }: GetTikToksPayloadType,
		token: string
	) {
		return jsonFetch.get<TikTok[]>(`/tournament/tiktoks/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	editTournament: async function ({
		data,
		token,
		tournamentId,
	}: {
		data: CreateTournamentPayloadType
		token: string
		tournamentId: string
	}) {
		return jsonFetch.post(`/tournament/edit/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},
}
