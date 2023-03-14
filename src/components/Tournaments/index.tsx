import { Grid, GridItem } from "@chakra-ui/react"
import { useTypedSelector } from "../../redux/store"
import { TournamentCard } from "./TournamentCard"

export function Tournaments() {
	const tournaments = useTypedSelector((state) => state.arena.tournaments)

	return (
		<Grid templateColumns="repeat(4, 1fr)" gap={6} p={6}>
			{tournaments.map((tournament) => {
				return (
					<GridItem key={tournament.ID}>
						<TournamentCard id={tournament.ID} title={tournament.Name} />
					</GridItem>
				)
			})}
		</Grid>
	)
}
