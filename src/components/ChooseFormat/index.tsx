import {
	Box,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import {
	TournamentFormat,
	TournamentType,
} from "../../redux/slices/tournament.types"
import { useTypedSelector } from "../../redux/store"

type PropsType = {
	setFormat: (format: TournamentFormat) => void
	tournamentId: string | undefined
}

export function ChooseFormat({ setFormat, tournamentId }: PropsType) {
	const tournaments = useTypedSelector(state => state.arena.tournaments)
	const [tournament, setTournament] = useState<undefined | TournamentType>(
		undefined
	)
	useEffect(() => {
		const newTournament = tournaments.find(t => t.ID === tournamentId)
		if (!tournament || tournament.ID !== newTournament?.ID) {
			setTournament(newTournament)
		}
	}, [tournaments])

	return (
		<Box display={"flex"} justifyContent={"center"}>
			<Card>
				<CardBody>
					<Image
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Green double couch with wooden legs"
						borderRadius="lg"
						maxH="md"
					/>
					<Stack mt={3}>
						<Heading textAlign={"center"} size="md">
							{tournament ? tournament.Name : ""}
						</Heading>
					</Stack>
				</CardBody>
				<CardFooter display={"flex"} justifyContent={"space-around"}>
					<Button
						onClick={() => {
							setFormat(TournamentFormat.SINGLE_ELIMINATION)
						}}
						colorScheme={"whatsapp"}
					>
						Класичний
					</Button>
					<Button
						onClick={() => {
							setFormat(TournamentFormat.SINGLE_ELIMINATION)
						}}
						colorScheme={"whatsapp"}
					>
						Король гори
					</Button>
				</CardFooter>
			</Card>
		</Box>
	)
}
