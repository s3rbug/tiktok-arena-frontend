import { Grid, GridItem } from "@chakra-ui/react"
import { TournamentType } from "../../redux/slices/tournament/tournament.types"
import { TournamentCard } from "./TournamentCard"

type PropsType = {
	tournaments: TournamentType[] | null
	editable?: boolean
}

export function Tournaments({ tournaments, editable }: PropsType) {
	return (
		<Grid
			gridTemplateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
			justifyItems="center"
			gap={6}
		>
			{tournaments &&
				tournaments.map((tournament) => {
					return (
						<GridItem key={tournament.ID}>
							<TournamentCard
								id={tournament.ID}
								title={tournament.Name}
								editable={editable}
								checked={tournament?.checked}
							/>
						</GridItem>
					)
				})}
		</Grid>
	)
}
