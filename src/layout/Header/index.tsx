import {
	Box,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
	Image,
} from "@chakra-ui/react"
import { Search } from "../../components"
import LogoSvg from "../../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { useTypedDispatch } from "../../redux/store"
import { authActions } from "../../redux/slices/auth/auth"
import { localToken } from "../../localStorage/token"
import { useAuth } from "../../hooks/useAuth"

export function Header() {
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	const user = useAuth()

	function handleLogoClick() {
		navigate("/tournaments")
	}

	function handleLoginButton() {
		navigate("/login")
	}

	function handleLogout() {
		localToken.clearToken()
		dispatch(authActions.logout())
	}

	function handleCreateTournament() {
		navigate("/user/create")
	}

	function handleProfile() {
		navigate("/user")
	}

	return (
		<Box
			px={4}
			py={2}
			position="sticky"
			zIndex={"sticky"}
			top={0}
			bg="white"
			borderBottomColor={"blackAlpha.300"}
			boxShadow="md"
			borderBottomWidth={2}
		>
			<Flex
				h={"100%"}
				alignItems={"center"}
				justifyContent={"space-between"}
				gap={4}
			>
				<Link replace to="/tournaments?page=1">
					<Image src={LogoSvg} alt="logo" onClick={handleLogoClick} />
				</Link>

				<Search />

				{user ? (
					<Box>
						<Menu>
							{() => (
								<>
									<MenuButton>
										<Avatar src="https://bit.ly/kent-c-dodds" />
									</MenuButton>
									<MenuList>
										<MenuItem onClick={handleProfile}>My profile</MenuItem>
										<MenuItem onClick={handleCreateTournament}>
											Create tournament
										</MenuItem>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
									</MenuList>
								</>
							)}
						</Menu>
					</Box>
				) : (
					<Button
						onClick={handleLoginButton}
						variant={"solid"}
						colorScheme="blue"
					>
						Login
					</Button>
				)}
			</Flex>
		</Box>
	)
}
