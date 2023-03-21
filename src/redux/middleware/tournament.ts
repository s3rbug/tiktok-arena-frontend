import { paginationActions } from "./../slices/pagination/pagination"
import { uiActions } from "./../slices/ui/ui"
import {
	GetTournamentPayloadType,
	CreateTournamentPayloadType,
	DeleteTournamentsPayload,
	GetTikToksPayloadType,
	GetTournamentsPayload,
} from "./../../api/tournament"
import { GetContestPayloadType, tournamentApi } from "../../api/tournament"
import { tournamentActions } from "../slices/tournament/tournament"
import { AppThunkType } from "../store"
import { getErrorMessage, getToken } from "../../api/jsonFetch"

export const getTournaments =
	({ page, pageSize }: GetTournamentsPayload): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTournaments({ page, pageSize })
			.then((response) => {
				if (response) {
					dispatch(
						tournamentActions.setTournaments({
							newTournaments: response.Tournaments,
						})
					)
					dispatch(
						paginationActions.setLastPage({
							lastPage: Math.ceil(response.TournamentCount / pageSize),
						})
					)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

export const getContest =
	({ tournamentId, tournamentFormat }: GetContestPayloadType): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getContest({ tournamentId, tournamentFormat })
			.then((newContest) => {
				if (newContest) {
					dispatch(tournamentActions.setContest({ newContest }))
				}
			})
	}

export const getTournament =
	({ tournamentId }: GetTournamentPayloadType): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTournament({ tournamentId })
			.then((tournament) => {
				if (tournament) {
					dispatch(tournamentActions.setTournament({ tournament }))
				}
			})
			.catch(() => {
				dispatch(tournamentActions.setTournament({ tournament: null }))
			})
	}

export const createTournament =
	({ data }: { data: CreateTournamentPayloadType }): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState, () => {
			dispatch(
				uiActions.setError({
					errors: { createTournament: "Auth error" },
				})
			)
		})
		if (!token) {
			return
		}

		return tournamentApi
			.createTournament({ data, token })
			.then(() => {
				dispatch(uiActions.setSuccess({ success: { createTournament: true } }))
			})
			.catch((error: Error) => {
				const message = getErrorMessage(error)

				if (message) {
					dispatch(
						uiActions.setError({ errors: { createTournament: message } })
					)
				} else {
					dispatch(
						uiActions.setError({
							errors: { createTournament: "Server connection error" },
						})
					)
				}
			})
	}

export const getUserTournaments =
	({ token }: { token: string }): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getUserTournaments({ token })
			.then((tournaments) => {
				if (tournaments) {
					dispatch(tournamentActions.setUserTournaments({ tournaments }))
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

export const deleteTournaments =
	({
		data,
		token,
	}: {
		data: DeleteTournamentsPayload
		token: string
	}): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.deleteTournaments({ data, token })
			.then(() => {
				dispatch(getUserTournaments({ token }))
			})
			.catch((error) => {
				console.log(error)
			})
	}

export const getTikToks =
	({
		data,
		token,
	}: {
		data: GetTikToksPayloadType
		token: string
	}): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTikToks({ data, token })
			.then((tiktoks) => {
				if (tiktoks) {
					dispatch(tournamentActions.setTiktoks({ newTiktoks: tiktoks }))
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

export const editTournament =
	({
		data,
		token,
		tournamentId,
	}: {
		data: CreateTournamentPayloadType
		token: string
		tournamentId: string
	}): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.editTournament({ data, token, tournamentId })
			.then(() => {
				dispatch(uiActions.setSuccess({ success: { editTournament: true } }))
			})
			.catch((error: Error) => {
				const message = getErrorMessage(error)

				if (message) {
					dispatch(uiActions.setError({ errors: { editTournament: message } }))
				} else {
					dispatch(
						uiActions.setError({
							errors: { editTournament: "Server connection error" },
						})
					)
				}
			})
	}
