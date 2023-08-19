import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
	TikTok,
	TournamentDataType,
	TournamentsDataType,
} from "./tournament.types"

const initialState = {
	tournamentsData: null as TournamentsDataType | null,
	tiktoks: null as TikTok[] | null,
	tournamentData: null as TournamentDataType | null,
	userTournaments: null as TournamentsDataType | null,
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
			action: PayloadAction<{ newTournaments: TournamentsDataType | null }>
		) {
			const { newTournaments: newTounaments } = action.payload
			state.tournamentsData = newTounaments
		},
		setUserTournaments(
			state,
			action: PayloadAction<{ tournamentsData: TournamentsDataType | null }>
		) {
			const { tournamentsData } = action.payload

			if (!tournamentsData) {
				state.userTournaments = null
				return
			}

			state.userTournaments = {
				...tournamentsData,
				Tournaments: tournamentsData.Tournaments.map((tournament) => ({
					...tournament,
					checked: false,
				})),
			}
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
				state.userTournaments.Tournaments.forEach((tournament) => {
					if (tournament.ID === tournamentId) {
						tournament.checked = checked
					}
				})
			}
		},
		setTournament: (
			state,
			action: PayloadAction<{ tournament: TournamentDataType | null }>
		) => {
			const { tournament } = action.payload
			state.tournamentData = tournament
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
