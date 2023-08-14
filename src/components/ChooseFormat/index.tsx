import { Card, CardBody, Heading, Image, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { getTournament } from "../../redux/middleware/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { Loading } from "../Loading"
import { FormatButton } from "./FormatButton"
import LogoSvg from "../../assets/logo.svg"
import { tournamentActions } from "../../redux/slices/tournament/tournament"
import { motion } from "framer-motion"

type PropsType = {
	setFormat: (format: TournamentFormat | null) => void
	tournamentId: string | undefined
}

export function ChooseFormat({ setFormat, tournamentId }: PropsType) {
	const dispatch = useTypedDispatch()
	const tournament = useTypedSelector((state) => state.arena.tournament)

	useEffect(() => {
		return () => {
			dispatch(tournamentActions.setTournament({ tournament: null }))
		}
	}, [dispatch])

	useEffect(() => {
		if (tournamentId !== tournament?.ID && tournamentId) {
			dispatch(getTournament({ tournamentId }))
		}
	}, [dispatch, tournament?.ID, tournamentId])

	if (!tournament) {
		return <Loading />
	}

	return (
		<Flex justifyContent={"center"} w={"100%"} mt={16}>
			<Card w={"50%"} variant="unstyled">
				<CardBody display={"flex"} flexDirection="column" alignItems={"center"}>
					<Image
						src={tournament?.PhotoURL || LogoSvg}
						alt="Tournament"
						as={motion.img}
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
						borderRadius="lg"
						width={"fit-content"}
						h={"400px"}
					/>

					<Heading mt={4} mb={6} size="md">
						{tournament ? tournament.Name : ""}
					</Heading>
				</CardBody>
				<Flex justifyContent={"space-evenly"}>
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
