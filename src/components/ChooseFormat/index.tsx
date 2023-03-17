import {
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	CircularProgress,
	Flex,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { getTournament } from "../../redux/middleware/tournament"
import { TournamentFormat } from "../../redux/slices/tournament/tournament.types"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
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
		return (
			<Flex justifyContent={"center"} mt={8}>
				<CircularProgress isIndeterminate color="blue.300" />
			</Flex>
		)
	}

	return (
		<Box display={"flex"} justifyContent={"center"}>
			<Card p={8}>
				<CardBody>
					<Image
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Tournament"
						borderRadius="lg"
						maxH="md"
					/>
					<Stack mt={3}>
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
