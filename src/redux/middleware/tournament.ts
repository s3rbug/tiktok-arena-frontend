import { tournamentApi } from "../../api/tournament"
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
			//  TODO error handling
			console.log(error)
		})
}
