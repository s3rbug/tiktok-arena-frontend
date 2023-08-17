import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TournamentType, TikTok } from "./tournament.types"

const initialState = {
	tournaments: null as TournamentType[] | null,
	tiktoks: null as TikTok[] | null,
	tournament: null as TournamentType | null,
	userTournaments: null as TournamentType[] | null,
	tournamentSearch: {
		global: null as string | null,
		user: null as string | null,
	},
}

const tournamentSlice = createSlice({
	name: "tournament",
	initialState,
	reducers: {
		setTournaments(
			state,
			action: PayloadAction<{ newTournaments: TournamentType[] | null }>
		) {
			const { newTournaments: newTounaments } = action.payload
			state.tournaments = newTounaments
		},
		setUserTournaments(
			state,
			action: PayloadAction<{ tournaments: TournamentType[] | null }>
		) {
			const { tournaments } = action.payload

			if (!tournaments) {
				state.userTournaments = null
				return
			}

			state.userTournaments = tournaments.map((tournament) => ({
				...tournament,
				checked: false,
			}))
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
		setTournament: (
			state,
			action: PayloadAction<{ tournament: TournamentType | null }>
		) => {
			const { tournament } = action.payload
			state.tournament = tournament
		},
		setSearchField: (
			state,
			action: PayloadAction<{
				searchField: string | null
				key: keyof typeof state.tournamentSearch
			}>
		) => {
			const { searchField, key } = action.payload
			state.tournamentSearch[key] = searchField
		},
	},
})

export const tournamentActions = tournamentSlice.actions

export const tournamentReducer = tournamentSlice.reducer
