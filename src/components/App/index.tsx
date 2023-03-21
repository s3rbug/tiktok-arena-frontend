import { useEffect } from "react"
import { Header } from "../../layout"
import { localToken } from "../../localStorage/token"
import { whoami } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"
import { AppRoutes } from "../"

export function App() {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		const token = localToken.getToken()
		if (token) {
			dispatch(whoami({ token }))
		}
	}, [dispatch])

	return (
		<>
			<Header />
			<AppRoutes />
		</>
	)
}
