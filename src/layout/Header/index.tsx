import { Box, Flex, Button, Image, HStack } from "@chakra-ui/react"
import { Search } from "../../components"
import LogoSvg from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { useTypedSelector } from "../../redux/store"
import { useAuth } from "../../hooks/useAuth"
import UserSvg from "../../assets/userIcon.svg"
import { ContestDetails } from "./ContestDetails.tsx"
import { ProfileMenu } from "./ProfileMenu"
import { LanguageMenu } from "../../components/LanguageMenu"
import { useTranslation } from "react-i18next"

export function Header() {
	const { isContestInProgress } = useTypedSelector(
		(state) => state.contest.contestProgress
	)

	const user = useAuth()
	const { t } = useTranslation()

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
				{isContestInProgress ? <ContestDetails /> : <Search />}
				<HStack>
					<LanguageMenu />
					{user ? (
						<ProfileMenu photoURL={user?.photoURL || UserSvg} />
					) : (
						<Link to="/login" replace>
							<Button variant={"solid"} colorScheme="blue">
								{t("auth.login")}
							</Button>
						</Link>
					)}
				</HStack>
			</Flex>
		</Box>
	)
}
