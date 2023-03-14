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
