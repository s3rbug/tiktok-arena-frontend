import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
	ContestType,
	TournamentType,
	ContestProgressType,
	TikTok,
} from "./tournament.types"

const initialContestProgress: ContestProgressType = {
	matchIndex: 0,
	roundIndex: 0,
	isContestOver: false,
}

const initialState = {
	tournaments: [] as TournamentType[],
	tiktoks: null as TikTok[] | null,
	tournament: null as TournamentType | null,
	userTournaments: null as TournamentType[] | null,
	contest: {} as ContestType,
	contestProgress: { ...initialContestProgress } as ContestProgressType,
}

const tournamentSlice = createSlice({
	name: "tournament",
	initialState,
	reducers: {
		setTournaments(
			state,
			action: PayloadAction<{ newTournaments: TournamentType[] }>
		) {
			const { newTournaments: newTounaments } = action.payload
			state.tournaments = newTounaments
		},
		setUserTournaments(
			state,
			action: PayloadAction<{ tournaments: TournamentType[] }>
		) {
			const { tournaments } = action.payload
			state.userTournaments = tournaments.map((tournament) => ({
				...tournament,
				checked: false,
			}))
		},
		setContest(state, action: PayloadAction<{ newContest: ContestType }>) {
			const { newContest } = action.payload
			state.contestProgress = { ...initialContestProgress }

			state.contest = newContest
		},
		setTiktoks(state, action: PayloadAction<{ newTiktoks: TikTok[] | null }>) {
			const { newTiktoks } = action.payload

			state.tiktoks = newTiktoks
		},
		setChecked(
			state,
			action: PayloadAction<{ tournamentId: string; checked: boolean }>
		) {
			const { tournamentId, checked } = action.payload

			if (state.userTournaments) {
				state.userTournaments = state.userTournaments.map((tournament) => ({
					...tournament,
					checked:
						tournament.ID === tournamentId ? checked : tournament.checked,
				}))
			}
		},
		contestChoiceMade(state, action: PayloadAction<{ winnerURL: string }>) {
			const { winnerURL } = action.payload

			const [roundIndex, matchIndex] = [
				state.contestProgress.roundIndex,
				state.contestProgress.matchIndex,
			]

			state.contest.Rounds[roundIndex].Matches[matchIndex].firstOptionChosen =
				state.contest.Rounds[roundIndex].Matches[matchIndex].FirstOption
					.TiktokURL === winnerURL

			const roundLength = state.contest.Rounds.length
			const matchLength = state.contest.Rounds[roundIndex].Matches.length

			const currentMatchID =
				state.contest.Rounds[roundIndex].Matches[matchIndex].MatchID

			state.contest.Rounds = state.contest.Rounds.map((round) => ({
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
		setTournament: (
			state,
			action: PayloadAction<{ tournament: TournamentType | null }>
		) => {
			const { tournament } = action.payload
			state.tournament = tournament
		},
	},
})

export const tournamentActions = tournamentSlice.actions

export const tournamentReducer = tournamentSlice.reducer
