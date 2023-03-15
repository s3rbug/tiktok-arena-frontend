import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../layout"
import { localToken } from "../../localStorage/token"
import {
	TournamentsListPage,
	AboutPage,
	NotFoundPage,
	TournamentPage,
	LoginPage,
	RegisterPage,
} from "../../pages"
import { whoami } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"

export function App() {
	const dispatch = useTypedDispatch()
	useEffect(() => {
		const token = localToken.getToken()
		if (token) {
			dispatch(whoami({ token }))
		}
	}, [])
	return (
		<>
			<Header />
			<Box>
				<Routes>
					<Route path="/tournaments" element={<TournamentsListPage />} />
					<Route
						path="/tournaments/:tournamentId"
						element={<TournamentPage />}
					/>
					<Route path="/about" element={<AboutPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
			</Box>
		</>
	)
}
