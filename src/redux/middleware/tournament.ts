import { paginationActions } from "./../slices/pagination/pagination"
import { uiActions } from "./../slices/ui/ui"
import {
	GetTournamentPayloadType,
	CreateTournamentPayloadType,
	DeleteTournamentsPayload,
	GetTikToksPayloadType,
	GetTournamentsPayload,
	EndTournamentPayloadType,
} from "./../../api/tournament"
import { GetContestPayloadType, tournamentApi } from "../../api/tournament"
import { tournamentActions } from "../slices/tournament/tournament"
import { AppThunkType } from "../store"
import { getErrorMessage, getToken, RequestError } from "../../api/jsonFetch"

export const getTournaments =
	({ page, pageSize, search }: GetTournamentsPayload): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTournaments({ page, pageSize, search })
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
							key: "globalTournaments",
						})
					)
				}
			})
			.catch((error: RequestError) => {
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
				dispatch(tournamentActions.setTournaments({ newTournaments: null }))
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
	({ page, pageSize, search }: GetTournamentsPayload): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		if (!token) {
			return
		}
		return tournamentApi
			.getUserTournaments({ token, page, pageSize, search })
			.then((response) => {
				if (response?.Tournaments) {
					dispatch(
						tournamentActions.setUserTournaments({
							tournaments: response.Tournaments,
						})
					)

					dispatch(
						paginationActions.setLastPage({
							lastPage: Math.ceil(response.TournamentCount / pageSize),
							key: "userTournaments",
						})
					)

					dispatch(
						paginationActions.setTotal({
							total: response.TournamentCount,
							key: "userTournaments",
						})
					)
				}
			})
			.catch((error: RequestError) => {
				console.log(error)
			})
	}

export const deleteTournaments =
	({ data }: { data: DeleteTournamentsPayload }): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		const { currentPage, pageSize } = getState().pagination.userTournaments
		if (!token || !currentPage) {
			return
		}
		return tournamentApi
			.deleteTournaments({ data, token })
			.then(() => {
				dispatch(getUserTournaments({ page: currentPage, pageSize }))
			})
			.catch((error: RequestError) => {
				console.log(error)
			})
	}

export const getTikToks =
	({ data }: { data: GetTikToksPayloadType }): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTikToks({ data })
			.then((tiktoks) => {
				if (!tiktoks) {
					return
				}

				dispatch(tournamentActions.setTiktoks({ newTiktoks: tiktoks }))
			})
			.catch((error) => {
				console.log(error)
			})
	}

export const editTournament =
	({
		tournamentId,
		data,
	}: {
		tournamentId: string
		data: CreateTournamentPayloadType
	}): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		if (!token) {
			return
		}
		return tournamentApi
			.editTournament({ data, token, tournamentId })
			.then(() => {
				dispatch(uiActions.setSuccess({ success: { editTournament: true } }))
			})
			.catch((error: RequestError) => {
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

export const endTournament =
	({ tournamentId, winnerURL }: EndTournamentPayloadType): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		if (!token) {
			return
		}

		return tournamentApi
			.endTournament({ token, tournamentId, winnerURL })
			.then(() => {
				dispatch(uiActions.setSuccess({ success: { endTournament: true } }))
				dispatch(getTikToks({ data: { tournamentId } }))
				dispatch(getTournament({ tournamentId }))
			})
			.catch((error: RequestError) => {
				console.log(error)
			})
	}
