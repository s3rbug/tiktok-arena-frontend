import { TournamentWithUserType } from "../../redux/slices/tournament/tournament.types"
import { jsonFetch } from "../jsonFetch"
import { AuthTokenType, MessageType } from "../auth/auth.types"
import {
	CreateTournamentPayloadType,
	DeleteTournamentsPayload,
	GetTikToksPayloadType,
	GetTiktoksType,
	GetTournamentPayloadType,
	GetTournamentsPayload,
	GetTournamentsType,
	GetUserTournamentsPayload,
	GetUserTournamentsType,
} from "./tournament.types"

export const tournamentApi = {
	getTournaments: async function ({
		page,
		pageSize,
		search,
	}: GetTournamentsPayload) {
		return jsonFetch.get<GetTournamentsType>(
			`/tournament/tournaments?page=${page}&count=${pageSize}&search=${
				search || ""
			}`
		)
	},

	getTournament: async function ({ tournamentId }: GetTournamentPayloadType) {
		return jsonFetch.get<TournamentWithUserType>(
			`/tournament/details/${tournamentId}`
		)
	},

	createTournament: async function ({
		data,
		token,
	}: { data: CreateTournamentPayloadType } & AuthTokenType) {
		return jsonFetch.post<MessageType>("/tournament/create", {
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
		userId,
	}: GetUserTournamentsPayload & AuthTokenType) {
		return jsonFetch.get<GetUserTournamentsType>(
			`/user/profile/${userId}?page=${page}&count=${pageSize}&search=${
				search || ""
			}`,
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
		return jsonFetch.delete<MessageType>("/tournament/delete", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},

	getTikToks: async function ({ data }: { data: GetTikToksPayloadType }) {
		return jsonFetch.get<GetTiktoksType>(
			`/tournament/tiktoks/${data.tournamentId}`
		)
	},

	editTournament: async function ({
		data,
		token,
		tournamentId,
	}: {
		tournamentId: string
		data: CreateTournamentPayloadType
	} & AuthTokenType) {
		return jsonFetch.put<MessageType>(`/tournament/edit/${tournamentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
	},
}
