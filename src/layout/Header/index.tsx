import {
	Box,
	Flex,
	HStack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
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
		<>
			<Box px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={8} alignItems={"center"}>
						<Box cursor={"pointer"}>
							<Link replace to="/tournaments">
								<img src={LogoSvg} alt="logo" onClick={handleLogoClick} />
							</Link>
						</Box>
					</HStack>
					<HStack spacing={12} alignItems={"center"}>
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
					</HStack>
				</Flex>
			</Box>
		</>
	)
}
