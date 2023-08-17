import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { localToken } from "../../../localStorage/token"
import { authActions } from "../../../redux/slices/auth/auth"
import { useTypedDispatch } from "../../../redux/store"

type PropsType = {
	photoURL: string
}

export function ProfileMenu({ photoURL }: PropsType) {
	const dispatch = useTypedDispatch()

	function handleLogout() {
		localToken.clearToken()
		dispatch(authActions.logout())
	}

	return (
		<Menu>
			{() => (
				<>
					<MenuButton>
						<Avatar src={photoURL} />
					</MenuButton>
					<MenuList>
						<Link
							to="/user"
							replace
							style={{ display: "inline-block", width: "100%" }}
						>
							<MenuItem>My profile</MenuItem>
						</Link>

						<Link
							to="/user/create"
							replace
							style={{ display: "inline-block", width: "100%" }}
						>
							<MenuItem>Create tournament</MenuItem>
						</Link>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	)
}
