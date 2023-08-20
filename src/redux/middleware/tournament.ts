import { paginationActions } from "./../slices/pagination/pagination"
import { uiActions } from "./../slices/ui/ui"
import {
	GetTournamentPayloadType,
	CreateTournamentPayloadType,
	DeleteTournamentsPayload,
	GetTikToksPayloadType,
	GetTournamentsPayload,
	GetUserTournamentsPayload,
} from "../../api/tournament/tournament.types"
import { tournamentApi } from "../../api/tournament/tournament"
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
							newTournaments: {
								tournaments: response.tournaments,
								user: response.user,
								totalTournamentCount: response.tournamentCount,
							},
						})
					)
					dispatch(
						paginationActions.setLastPage({
							lastPage: Math.ceil(response.tournamentCount / pageSize),
							key: "globalTournaments",
						})
					)
				}
			})
			.catch((error: RequestError) => {
				console.log(error)
				return Promise.reject(error)
			})
	}

export const getTournament =
	({ tournamentId }: GetTournamentPayloadType): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTournament({ tournamentId })
			.then((tournament) => {
				if (tournament) {
					const { user, ...tournamentWithoutUser } = tournament
					dispatch(
						tournamentActions.setTournament({
							tournament: {
								tournament: tournamentWithoutUser,
								user,
							},
						})
					)
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
	({
		page,
		pageSize,
		search,
		userId,
	}: GetUserTournamentsPayload): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		if (!token) {
			return
		}
		return tournamentApi
			.getUserTournaments({ token, page, pageSize, search, userId })
			.then((response) => {
				if (response?.tournaments) {
					dispatch(
						tournamentActions.setUserTournaments({
							tournamentsData: {
								tournaments: response.tournaments,
								user: response.user,
								totalTournamentCount: response.tournamentCount,
							},
						})
					)

					dispatch(
						paginationActions.setLastPage({
							lastPage: Math.ceil(response.tournamentCount / pageSize),
							key: "userTournaments",
						})
					)

					dispatch(
						paginationActions.setTotal({
							total: response.tournamentCount,
							key: "userTournaments",
						})
					)
				}
			})
			.catch((error: RequestError) => {
				console.log(error)
				return Promise.reject(error)
			})
	}

export const deleteTournaments =
	({ data }: { data: DeleteTournamentsPayload }): AppThunkType =>
	async (dispatch, getState) => {
		const token = getToken(getState)
		const { currentPage, pageSize } = getState().pagination.userTournaments
		const userId = getState().auth.user?.id

		if (!token || !currentPage || !userId) {
			return
		}

		return tournamentApi
			.deleteTournaments({ data, token })
			.then(() => {
				dispatch(getUserTournaments({ page: currentPage, pageSize, userId }))
			})
			.catch((error: RequestError) => {
				console.log(error)
				return Promise.reject(error)
			})
	}

export const getTikToks =
	({ data }: { data: GetTikToksPayloadType }): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getTikToks({ data })
			.then((tiktokData) => {
				if (!tiktokData) {
					return
				}

				dispatch(
					tournamentActions.setTiktoks({ newTiktoks: tiktokData.tiktoksStats })
				)
			})
			.catch((error) => {
				console.log(error)
				return Promise.reject(error)
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
