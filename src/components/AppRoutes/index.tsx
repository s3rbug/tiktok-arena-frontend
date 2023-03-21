import { Navigate, Route, Routes } from "react-router-dom"
import {
	TournamentsListPage,
	EditPage,
	TournamentPage,
	AboutPage,
	LoginPage,
	RegisterPage,
	CreateTournamentPage,
	NotFoundPage,
	ProfilePage,
} from "../../pages"

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/tournaments" />} />
			<Route path="/tournaments" element={<TournamentsListPage />} />
			<Route path="/tournaments/:tournamentId/edit" element={<EditPage />} />
			<Route path="/tournaments/:tournamentId" element={<TournamentPage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/user" element={<ProfilePage />} />
			<Route path="/user/create" element={<CreateTournamentPage />} />
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}
