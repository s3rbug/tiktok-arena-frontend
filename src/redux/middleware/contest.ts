import { RequestError } from "../../api/jsonFetch"
import {
	EndContestPayloadType,
	GetContestPayloadType,
} from "../../api/contest/contest.types"
import { contestActions } from "../slices/contest/contest"
import { uiActions } from "../slices/ui/ui"
import { AppThunkType } from "../store"
import { getTikToks, getTournament } from "./tournament"
import { contestApi } from "../../api/contest/contest"

export const getContest =
	({ tournamentId, tournamentFormat }: GetContestPayloadType): AppThunkType =>
	async (dispatch) => {
		return contestApi
			.getContest({ tournamentId, tournamentFormat })
			.then((newContest) => {
				if (newContest) {
					dispatch(contestActions.setContest({ newContest }))
				}
			})
	}

export const endContest =
	({ tournamentId, winnerURL }: EndContestPayloadType): AppThunkType =>
	async (dispatch) => {
		return contestApi
			.endContest({ tournamentId, winnerURL })
			.then(() => {
				dispatch(
					contestActions.setIsContestInProgress({
						isContestInProgress: false,
					})
				)
				dispatch(uiActions.setSuccess({ success: { endTournament: true } }))
				dispatch(getTikToks({ data: { tournamentId } }))
				dispatch(getTournament({ tournamentId }))
			})
			.catch((error: RequestError) => {
				console.log(error)
				return Promise.reject(error)
			})
	}
