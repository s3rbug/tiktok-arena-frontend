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
import { Link } from "react-router-dom"
import { useTypedDispatch } from "../../redux/store"
import { authActions } from "../../redux/slices/auth/auth"
import { localToken } from "../../localStorage/token"
import { useAuth } from "../../hooks/useAuth"
import UserSvg from "../../assets/userIcon.svg"

export function Header() {
	const dispatch = useTypedDispatch()

	const user = useAuth()

	function handleLogout() {
		localToken.clearToken()
		dispatch(authActions.logout())
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
					<Image
						src={LogoSvg}
						alt="logo"
						h={"50px"}
						w={"50px"}
						_hover={{ filter: "invert(100%)" }}
						transitionDuration=".3s"
						transitionTimingFunction={"ease-in"}
						transitionProperty="filter"
					/>
				</Link>

				<Search />

				{user ? (
					<Box>
						<Menu>
							{() => (
								<>
									<MenuButton>
										<Avatar src={UserSvg} />
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
					</Box>
				) : (
					<Link to="/login" replace>
						<Button variant={"solid"} colorScheme="blue">
							Login
						</Button>
					</Link>
				)}
			</Flex>
		</Box>
	)
}
