import { TikTok } from "../../redux/slices/tournament/tournament.types"
import {
	TournamentType,
	ContestType,
} from "../../redux/slices/tournament/tournament.types"
import { jsonFetch } from "../jsonFetch"
import { AuthTokenType } from "../auth/auth.types"
import {
	CreateTournamentPayloadType,
	DeleteTournamentsPayload,
	EndTournamentPayloadType,
	GetContestPayloadType,
	GetTikToksPayloadType,
	GetTournamentPayloadType,
	GetTournamentsPayload,
} from "./tournament.types"

export const tournamentApi = {
	getTournaments: async function ({
		page,
		pageSize,
		search,
	}: GetTournamentsPayload) {
		return jsonFetch.get<{
			TournamentCount: number
			Tournaments: TournamentType[]
		}>(`/tournament?page=${page}&count=${pageSize}&search=${search || ""}`)
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
		search,
	}: GetTournamentsPayload & AuthTokenType) {
		return jsonFetch.get<{
			TournamentCount: number
			Tournaments: TournamentType[]
		}>(
			`/user/tournaments?page=${page}&count=${pageSize}&search=${search || ""}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
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
		return jsonFetch.put(`/tournament/edit/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},

	endTournament: async function ({
		tournamentId,
		winnerURL,
	}: EndTournamentPayloadType) {
		return jsonFetch.put(`/tournament/${tournamentId}`, {
			body: JSON.stringify({ TiktokURL: winnerURL }),
		})
	},
}
