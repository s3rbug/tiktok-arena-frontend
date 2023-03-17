import { uiActions } from "./../slices/ui/ui"
import {
	GetTournamentPayloadType,
	CreateTournamentPayloadType,
} from "./../../api/tournament"
import { GetContestPayloadType, tournamentApi } from "../../api/tournament"
import { tournamentActions } from "../slices/tournament/tournament"
import { AppThunkType } from "../store"

export const getAllTournaments = (): AppThunkType => async (dispatch) => {
	return tournamentApi
		.getAllTournaments()
		.then((newTounaments) => {
			if (newTounaments) {
				dispatch(tournamentActions.setTournaments({ newTounaments }))
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export const getContest =
	({ tournamentId, tounamentFormat }: GetContestPayloadType): AppThunkType =>
	async (dispatch) => {
		return tournamentApi
			.getContest({ tournamentId, tounamentFormat })
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
	(data: CreateTournamentPayloadType): AppThunkType =>
	async (dispatch, getState) => {
		return tournamentApi
			.createTournament(data, getState().auth.token)
			.then(() => {
				dispatch(getAllTournaments())
				dispatch(uiActions.setSuccess({ success: { createTournament: true } }))
			})
			.catch((error) => {
				const message: string | undefined = JSON.parse(error.message)?.message

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
