import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { localToken } from "../../../localStorage/token"
import { authActions } from "../../../redux/slices/auth/auth"
import { useTypedDispatch } from "../../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	photoURL: string
}

export function ProfileMenu({ photoURL }: PropsType) {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

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
							<MenuItem>{t("profile-menu.my-profile")}</MenuItem>
						</Link>

						<Link
							to="/user/create"
							replace
							style={{ display: "inline-block", width: "100%" }}
						>
							<MenuItem>{t("profile-menu.create-tournament")}</MenuItem>
						</Link>
						<MenuItem onClick={handleLogout}>
							{t("profile-menu.logout")}
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	)
}
