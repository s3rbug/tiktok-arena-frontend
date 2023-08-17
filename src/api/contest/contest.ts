import { ContestType } from "../../redux/slices/contest/contest.types"
import { jsonFetch } from "../jsonFetch"
import { EndContestPayloadType, GetContestPayloadType } from "./contest.types"

export const contestApi = {
	getContest: async function ({
		tournamentId,
		tournamentFormat,
	}: GetContestPayloadType) {
		return jsonFetch.get<ContestType>(
			`/tournament/contest/${tournamentId}?type=${tournamentFormat}`
		)
	},
	endContest: async function ({
		tournamentId,
		winnerURL,
	}: EndContestPayloadType) {
		return jsonFetch.put(`/tournament/winner/${tournamentId}`, {
			body: JSON.stringify({ TiktokURL: winnerURL }),
		})
	},
}
