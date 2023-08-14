import { Grid, GridItem } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { TournamentType } from "../../redux/slices/tournament/tournament.types"
import { TournamentCard } from "./TournamentCard"

type PropsType = {
	tournaments: TournamentType[] | null
	editable?: boolean
}

const gridVariants = {
	initial: (index: number) => ({
		opacity: 0,
		transform: `translateY(${index % 2 === 0 ? "-" : ""}100px)`,
	}),
	popup: (index: number) => ({
		transition: {
			delay: index * 0.25,
			duration: 0.6,
		},
		transform: "translateY(0)",
		opacity: 1,
	}),
}

export function Tournaments({ tournaments, editable }: PropsType) {
	return (
		<Grid
			gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
			justifyItems="center"
			gap={6}
		>
			{tournaments &&
				tournaments.map((tournament, index) => {
					return (
						<GridItem
							as={motion.div}
							key={tournament.ID}
							w="100%"
							variants={gridVariants}
							initial={"initial"}
							animate={"popup"}
							custom={index}
							justifySelf="center"
						>
							<TournamentCard
								id={tournament.ID}
								title={tournament.Name}
								editable={editable}
								checked={tournament?.checked}
								photoURL={tournament.PhotoURL}
							/>
						</GridItem>
					)
				})}
		</Grid>
	)
}
