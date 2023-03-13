import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
	ContestType,
	TournamentType,
	ContestProgressType,
} from "./tournament.types"

const contest = {
	ContestSize: 9,
	Rounds: [
		{
			Round: 1,
			Matches: [
				{
					MatchID: "07b49013-1dae-4b6f-8493-0d91b4b87f12",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7209080074715385106",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
			],
		},
		{
			Round: 2,
			Matches: [
				{
					MatchID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "3d0ebb07-922f-4e25-8636-f15328996682",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						OptionID: "07b49013-1dae-4b6f-8493-0d91b4b87f12",
					},
				},
			],
		},
		{
			Round: 3,
			Matches: [
				{
					MatchID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "3d0ebb07-922f-4e25-8636-f15328996682",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						OptionID: "07b49013-1dae-4b6f-8493-0d91b4b87f12",
					},
				},
				{
					MatchID: "7ef92b61-abf2-4dfe-be1f-69138a03889a",
					FirstOption: {
						OptionID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					},
					SecondOption: {
						OptionID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					},
				},
				{
					MatchID: "b8a0cee7-2a8b-41bd-a88a-74625e8250d5",
					FirstOption: {
						OptionID: "3d0ebb07-922f-4e25-8636-f15328996682",
					},
					SecondOption: {
						OptionID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					},
				},
			],
		},
		{
			Round: 4,
			Matches: [
				{
					MatchID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "3d0ebb07-922f-4e25-8636-f15328996682",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
				},
				{
					MatchID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					FirstOption: {
						TikTokURL: "https://www.tiktok.com/embed/v2/7201108451286633733",
					},
					SecondOption: {
						OptionID: "07b49013-1dae-4b6f-8493-0d91b4b87f12",
					},
				},
				{
					MatchID: "7ef92b61-abf2-4dfe-be1f-69138a03889a",
					FirstOption: {
						OptionID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					},
					SecondOption: {
						OptionID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					},
				},
				{
					MatchID: "b8a0cee7-2a8b-41bd-a88a-74625e8250d5",
					FirstOption: {
						OptionID: "3d0ebb07-922f-4e25-8636-f15328996682",
					},
					SecondOption: {
						OptionID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					},
				},
				{
					MatchID: "2b49ebf2-73c3-4779-8d69-68aaedcae43d",
					FirstOption: {
						OptionID: "0eca0b95-0529-4e8a-a834-d0f0b8949939",
					},
					SecondOption: {
						OptionID: "0df2f494-f52a-4c6c-9d54-b4fb2d62699d",
					},
				},
				{
					MatchID: "2844ad72-ff33-43f1-9456-6fb6beff5a80",
					FirstOption: {
						OptionID: "3d0ebb07-922f-4e25-8636-f15328996682",
					},
					SecondOption: {
						OptionID: "d4a02fbb-cd26-4d25-9cb0-6ffbdbc48c4d",
					},
				},
				{
					MatchID: "696ac8b4-d14f-48fd-a9b9-e81a38a60e08",
					FirstOption: {
						OptionID: "7ef92b61-abf2-4dfe-be1f-69138a03889a",
					},
					SecondOption: {
						OptionID: "b8a0cee7-2a8b-41bd-a88a-74625e8250d5",
					},
				},
			],
		},
	],
} as ContestType

const initialState = {
	tournaments: [] as TournamentType[],
	contest: { ...contest } as ContestType,
	contestProgress: {
		matchIndex: 0,
		roundIndex: 0,
		isContestOver: false,
	} as ContestProgressType,
}

const tournamentSlice = createSlice({
	name: "tournament",
	initialState,
	reducers: {
		setTournaments(
			state,
			action: PayloadAction<{ newTounaments: TournamentType[] }>
		) {
			const { newTounaments } = action.payload
			state.tournaments = newTounaments
		},
		contestChoiceMade(state, action: PayloadAction<{ winnerURL: string }>) {
			const { winnerURL } = action.payload

			if (
				state.contestProgress.matchIndex === undefined ||
				state.contestProgress.roundIndex === undefined
			) {
				state.contestProgress.matchIndex = state.contestProgress.roundIndex = 0
			}

			const [roundIndex, matchIndex] = [
				state.contestProgress.roundIndex,
				state.contestProgress.matchIndex,
			]

			state.contest.Rounds[roundIndex].Matches[matchIndex].firstOptionChosen =
				state.contest.Rounds[roundIndex].Matches[matchIndex].FirstOption
					.TikTokURL === winnerURL

			const roundLength = state.contest.Rounds.length
			const matchLength = state.contest.Rounds[roundIndex].Matches.length

			const currentMatchID =
				state.contest.Rounds[roundIndex].Matches[matchIndex].MatchID

			state.contest.Rounds = state.contest.Rounds.map((round) => ({
				...round,
				Matches: [
					...round.Matches.map((round) => {
						if (round.FirstOption?.OptionID === currentMatchID) {
							return {
								...round,
								FirstOption: {
									...round.FirstOption,
									TikTokURL: winnerURL,
								},
							}
						}
						if (round.SecondOption?.OptionID === currentMatchID) {
							return {
								...round,
								SecondOption: {
									...round.SecondOption,
									TikTokURL: winnerURL,
								},
							}
						}
						return round
					}),
				],
			}))

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
	},
})

export const tournamentActions = tournamentSlice.actions

export const tournamentReducer = tournamentSlice.reducer
