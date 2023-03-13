import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../layout"
import {
	TournamentsListPage,
	AboutPage,
	NotFoundPage,
	TournamentPage,
} from "../../pages"
import { getAllTournaments } from "../../redux/middleware/tournament"
import { useTypedDispatch } from "../../redux/store"

export function App() {
	const dispatch = useTypedDispatch()
	useEffect(() => {
		dispatch(getAllTournaments())
	}, [])
	return (
		<>
			<Header />
			<Box p={4}>
				<Routes>
					<Route path="/tournaments" element={<TournamentsListPage />} />
					<Route
						path="/tournaments/:tournamentId"
						element={<TournamentPage />}
					/>
					<Route path="/about" element={<AboutPage />} />
					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
			</Box>
		</>
	)
}
