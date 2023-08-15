import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChooseFormat, Arena } from "../../components"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch } from "../../redux/store"

export function TournamentPage() {
	const dispatch = useTypedDispatch()
	const { tournamentId } = useParams()
	const [format, setFormat] = useState<null | TournamentFormat>(null)

	function setCustomFormat(format: null | TournamentFormat) {
		dispatch(
			tournamentActions.setIsContestInProgress({ isContestInProgress: true })
		)
		setFormat(format)
	}

	if (!format) {
		return (
			<ChooseFormat tournamentId={tournamentId} setFormat={setCustomFormat} />
		)
	}

	return <Arena tournamentId={tournamentId} format={format} />
}
