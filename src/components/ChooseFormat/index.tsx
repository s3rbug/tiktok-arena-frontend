import {
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Flex,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { getTournament } from "../../redux/middleware/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import { Loading } from "../Loading"
import { FormatButton } from "./FormatButton"

type PropsType = {
	setFormat: (format: TournamentFormat) => void
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
		<Box display={"flex"} justifyContent={"center"}>
			<Card p={8}>
				<CardBody>
					<Image
						src="https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png"
						alt="Tournament"
						borderRadius="lg"
						maxH="md"
					/>
					<Stack mt={6} mb={3}>
						<Heading textAlign={"center"} size="md">
							{tournament ? tournament.Name : ""}
						</Heading>
					</Stack>
				</CardBody>
				<Flex justifyContent={"space-around"}>
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
