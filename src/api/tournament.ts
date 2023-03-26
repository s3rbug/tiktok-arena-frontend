import {
	TikTok,
	TournamentFormType,
} from "./../redux/slices/tournament/tournament.types"
import {
	TournamentType,
	ContestType,
	TournamentFormat,
} from "../redux/slices/tournament/tournament.types"
import { jsonFetch } from "./jsonFetch"
import { AuthTokenType } from "./auth"

export type GetContestPayloadType = {
	tournamentId: string
	tournamentFormat: TournamentFormat
}

export type GetTournamentPayloadType = {
	tournamentId: string
}

export type CreateTournamentPayloadType = {
	size: number
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
}

export type EndTournamentPayloadType = {
	tournamentId: string
	winnerURL: string
}

export const tournamentApi = {
	getTournaments: async function ({ page, pageSize }: GetTournamentsPayload) {
		return jsonFetch.get<{
			TournamentCount: number
			Tournaments: TournamentType[]
		}>(`/tournament?page=${page}&count=${pageSize}`)
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

	createTournament: async function ({
		data,
		token,
	}: { data: CreateTournamentPayloadType } & AuthTokenType) {
		return jsonFetch.post("/tournament/create", {
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	getUserTournaments: async function ({
		page,
		pageSize,
		token,
	}: GetTournamentsPayload & AuthTokenType) {
		return jsonFetch.get<{
			TournamentCount: number
			Tournaments: TournamentType[]
		}>(`/user/tournaments?page=${page}&count=${pageSize}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	deleteTournaments: async function ({
		data,
		token,
	}: { data: DeleteTournamentsPayload } & AuthTokenType) {
		return jsonFetch.delete("/tournament/delete", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},

	getTikToks: async function ({ data }: { data: GetTikToksPayloadType }) {
		return jsonFetch.get<TikTok[]>(`/tournament/tiktoks/${data.tournamentId}`)
	},

	editTournament: async function ({
		data,
		token,
		tournamentId,
	}: {
		tournamentId: string
		data: CreateTournamentPayloadType
	} & AuthTokenType) {
		return jsonFetch.post(`/tournament/edit/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},

	endTournament: async function ({
		tournamentId,
		winnerURL,
		token,
	}: EndTournamentPayloadType & AuthTokenType) {
		return jsonFetch.post(`/tournament/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ TiktokURL: winnerURL }),
		})
	},
}
