import { Box, Flex, HStack, Button } from "@chakra-ui/react"
import { Search } from "../../components"
import LogoSvg from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { authActions } from "../../redux/slices/auth"
import { localToken } from "../../localStorage/token"

export function Header() {
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	const user = useTypedSelector((state) => state.auth.user)

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

	return (
		<>
			<Box px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={8} alignItems={"center"}>
						<Box cursor={"pointer"}>
							<img src={LogoSvg} alt="logo" onClick={handleLogoClick} />
						</Box>
					</HStack>
					<HStack spacing={12} alignItems={"center"}>
						<Search />
						{user ? (
							<Flex alignItems={"center"} gap={8}>
								<Box>{user.name}</Box>
								<Button onClick={handleLogout} colorScheme={"blue"}>
									Logout
								</Button>
							</Flex>
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
