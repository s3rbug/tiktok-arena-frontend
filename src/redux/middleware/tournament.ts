import { GetTournamentPayloadType } from "./../../api/tournament"
import { GetContestPayloadType, tournamentApi } from "../../api/tournament"
import { tournamentActions } from "../slices/tournament"
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
