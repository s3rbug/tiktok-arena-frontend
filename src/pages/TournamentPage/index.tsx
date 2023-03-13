import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChooseFormat, Arena } from "../../components"
import { TournamentFormat } from "../../redux/slices/tournament.types"
import { useTypedSelector } from "../../redux/store"

export function TournamentPage() {
	const { tournamentId } = useParams()
	const [format, setFormat] = useState<null | TournamentFormat>(null)

	if (!format) {
		return <ChooseFormat tournamentId={tournamentId} setFormat={setFormat} />
	}

	return <Arena tournamentId={tournamentId} format={format} />
}
