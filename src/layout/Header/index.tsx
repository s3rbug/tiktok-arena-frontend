import { Box, Flex, HStack, Button } from "@chakra-ui/react"
import { Search } from "../../components"
import LogoSvg from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../redux/store"

export function Header() {
	const navigate = useNavigate()

	const user = useTypedSelector((state) => state.auth.user)

	function handleLogoClick() {
		navigate("/tournaments")
	}

	function handleLoginButton() {
		navigate("/login")
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
							<Box>{user.name}</Box>
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
