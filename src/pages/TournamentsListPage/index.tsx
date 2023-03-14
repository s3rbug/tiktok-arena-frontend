import { useEffect } from "react"
import { Filters, Tournaments } from "../../components"
import { getAllTournaments } from "../../redux/middleware/tournament"
import { useTypedDispatch } from "../../redux/store"

export function TournamentsListPage() {
	const dispatch = useTypedDispatch()
	useEffect(() => {
		dispatch(getAllTournaments())
	}, [])
	return (
		<>
			{/* <Filters /> */}
			<Tournaments />
		</>
	)
}