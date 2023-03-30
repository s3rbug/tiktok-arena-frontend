import { Box, Card, CardBody, Heading, Image, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { getTournament } from "../../redux/middleware/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { Loading } from "../Loading"
import { FormatButton } from "./FormatButton"
import LogoSvg from "../../assets/logo.svg"

type PropsType = {
	setFormat: (format: TournamentFormat | null) => void
	tournamentId: string | undefined
}

export function ChooseFormat({ setFormat, tournamentId }: PropsType) {
	const dispatch = useTypedDispatch()
	const tournament = useTypedSelector((state) => state.arena.tournament)

	useEffect(() => {
		if (tournamentId !== tournament?.ID && tournamentId) {
			dispatch(getTournament({ tournamentId }))
		}
	}, [dispatch, tournament?.ID, tournamentId])

	if (!tournament) {
		return <Loading />
	}

	return (
		<Box display={"flex"} justifyContent={"center"} w={"100%"} mt={16}>
			<Card w={"50%"} variant="unstyled">
				<CardBody display={"flex"} flexDirection="column" alignItems={"center"}>
					<Image
						src={tournament?.PhotoURL || LogoSvg}
						alt="Tournament"
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
						format={TournamentFormat.SINGLE_ELIMINATION}
						setFormat={setFormat}
					>
						Standart
					</FormatButton>
					<FormatButton
						format={TournamentFormat.KING_OF_THE_HILL}
						setFormat={setFormat}
					>
						King of the hill
					</FormatButton>
				</Flex>
			</Card>
		</Box>
	)
}
