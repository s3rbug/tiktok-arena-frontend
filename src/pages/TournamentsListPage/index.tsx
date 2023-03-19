import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Tournaments } from "../../components"
import { getAllTournaments } from "../../redux/middleware/tournament"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"

export function TournamentsListPage() {
	const tournaments = useTypedSelector((state) => state.arena.tournaments)
	const dispatch = useTypedDispatch()

	useEffect(() => {
		dispatch(getAllTournaments())
	}, [dispatch])

	return (
		<>
			{/* <Filters /> */}
			<Box p={8}>
				<Tournaments tournaments={tournaments} />
			</Box>
		</>
	)
}
