import {
	Card,
	CardBody,
	Heading,
	Image,
	Flex,
	Text,
	VStack,
	Link as ChakraLink,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { getTournament } from "../../redux/middleware/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { Loading } from "../Loading"
import { FormatButton } from "./FormatButton"
import LogoSvg from "../../assets/logo.svg"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { motion } from "framer-motion"
import { Link as ReactRouterLink } from "react-router-dom"

type PropsType = {
	setFormat: (format: TournamentFormat | null) => void
	tournamentId: string | undefined
}

export function ChooseFormat({ setFormat, tournamentId }: PropsType) {
	const dispatch = useTypedDispatch()
	const tournament = useTypedSelector(
		(state) => state.arena.tournamentData?.tournament
	)

	const ownerUser = useTypedSelector(
		(state) => state.arena.tournamentData?.user
	)

	useEffect(() => {
		return () => {
			dispatch(tournamentActions.setTournament({ tournament: null }))
		}
	}, [dispatch])

	useEffect(() => {
		if (tournamentId && tournamentId !== tournament?.id) {
			dispatch(getTournament({ tournamentId }))
		}
	}, [dispatch, tournamentId, tournament?.id])

	if (!tournament) {
		return <Loading />
	}

	return (
		<Flex justifyContent={"center"} w={"100%"} mt={{ lg: 16, sm: 4 }}>
			<Card
				w={{ lg: "50%", sm: "100%" }}
				p={{ lg: 0, sm: 5 }}
				variant="unstyled"
			>
				<CardBody
					display={"flex"}
					flexDirection="column"
					alignItems={"center"}
					gap={5}
				>
					<Image
						src={tournament?.photoURL || LogoSvg}
						alt="Tournament"
						as={motion.img}
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
						borderRadius="lg"
						width={"fit-content"}
						maxH={"400px"}
					/>
					<VStack>
						<Heading size="lg">{tournament?.name || ""}</Heading>
						<Text fontSize="md">
							{"Made by "}
							<ChakraLink
								as={ReactRouterLink}
								fontWeight="bold"
								color="teal.500"
								to={`/user/${ownerUser?.id}`}
							>
								{`${ownerUser?.name || ""}`}
							</ChakraLink>
						</Text>
					</VStack>
				</CardBody>
				<Flex
					justifyContent={"space-evenly"}
					flexDirection={{ lg: "row", sm: "column" }}
					gap={4}
					mt={8}
				>
					<FormatButton
						animationDirection="left"
						format={TournamentFormat.SINGLE_ELIMINATION}
						setFormat={setFormat}
					>
						Standart
					</FormatButton>
					<FormatButton
						animationDirection="right"
						format={TournamentFormat.KING_OF_THE_HILL}
						setFormat={setFormat}
					>
						King of the hill
					</FormatButton>
				</Flex>
			</Card>
		</Flex>
	)
}
