import { TournamentType } from "./../redux/slices/tournament.types"
import { jsonFetch } from "./jsonFetch"

export const tournamentApi = {
	getAllTournaments: async function () {
		return jsonFetch.get<TournamentType[] | undefined>("/tournament")
	},
}
