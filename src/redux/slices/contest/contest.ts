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

			const [roundIndex, matchIndex] = [
				state.contestProgress.roundIndex,
				state.contestProgress.matchIndex,
			]

			state.currentContest.Rounds[roundIndex].Matches[
				matchIndex
			].firstOptionChosen =
				state.currentContest.Rounds[roundIndex].Matches[matchIndex].FirstOption
					.TiktokURL === winnerURL

			const roundLength = state.currentContest.Rounds.length
			const matchLength = state.currentContest.Rounds[roundIndex].Matches.length

			const currentMatchID =
				state.currentContest.Rounds[roundIndex].Matches[matchIndex].MatchID

			state.currentContest.Rounds = state.currentContest.Rounds.map(
				(round) => ({
					...round,
					Matches: [
						...round.Matches.map((round) => {
							if (round.FirstOption?.MatchID === currentMatchID) {
								return {
									...round,
									FirstOption: {
										...round.FirstOption,
										TiktokURL: winnerURL,
									},
								}
							}
							if (round.SecondOption?.MatchID === currentMatchID) {
								return {
									...round,
									SecondOption: {
										...round.SecondOption,
										TiktokURL: winnerURL,
									},
								}
							}
							return round
						}),
					],
				})
			)

			if (roundIndex + 1 === roundLength && matchIndex + 1 === matchLength) {
				state.contestProgress.isContestOver = true
				return
			}

			if (matchIndex + 1 !== matchLength) {
				++state.contestProgress.matchIndex
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
