import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
	ContestProgressType,
	ContestStateType,
	ContestType,
} from "./contest.types"

const initialContestProgress: ContestProgressType = {
	matchIndex: 0,
	roundIndex: 0,
	isContestOver: false,
	isContestInProgress: false,
}

const initialState: ContestStateType = {
	currentContest: {} as ContestType,
	contestProgress: { ...initialContestProgress } as ContestProgressType,
}

const contestSlice = createSlice({
	name: "contest",
	initialState,
	reducers: {
		setIsContestInProgress: (
			state,
			action: PayloadAction<{ isContestInProgress: boolean }>
		) => {
			const { isContestInProgress } = action.payload
			state.contestProgress.isContestInProgress = isContestInProgress
		},
		contestChoiceMade(state, action: PayloadAction<{ winnerURL: string }>) {
			const { winnerURL } = action.payload

			const { roundIndex, matchIndex } = state.contestProgress

			const currentRound = state.currentContest.rounds[roundIndex]

			const currentMatch = currentRound.matches[matchIndex]

			currentMatch.firstOptionChosen =
				currentMatch.firstOption.tiktokURL === winnerURL

			state.currentContest.rounds.forEach((round) => {
				round.matches.forEach((match) => {
					if (match.firstOption.matchID === currentMatch.matchID) {
						match.firstOption.tiktokURL = winnerURL
					}
					if (match.secondOption.matchID === currentMatch.matchID) {
						match.secondOption.tiktokURL = winnerURL
					}
				})
			})

			const roundLength = state.currentContest.rounds.length
			const matchLength = currentRound.matches.length

			if (roundIndex + 1 === roundLength && matchIndex + 1 === matchLength) {
				state.contestProgress.isContestOver = true
				return
			}

			if (matchIndex + 1 !== matchLength) {
				state.contestProgress.matchIndex++
				return
			}

			state.contestProgress.roundIndex++
			state.contestProgress.matchIndex = 0
		},
		resetContestProgress(state) {
			state.contestProgress = { ...initialContestProgress }
		},
		setContest(state, action: PayloadAction<{ newContest: ContestType }>) {
			const { newContest } = action.payload
			state.contestProgress = {
				...initialContestProgress,
				isContestInProgress: state.contestProgress.isContestInProgress,
			}

			state.currentContest = newContest
		},
	},
})

export const contestActions = contestSlice.actions

export const contestReducer = contestSlice.reducer
