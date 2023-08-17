import { Grid, GridItem } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { TournamentType } from "../../redux/slices/tournament/tournament.types"
import { TournamentCard } from "./TournamentCard"

type PropsType = {
	tournaments: TournamentType[] | null
	isEditable?: boolean
}

const gridVariants = {
	initial: {
		opacity: 0,
		transform: `translateY(-100px)`,
	},
	popup: (index: number) => ({
		transition: {
			delay: index * 0.15,
			duration: 0.6,
		},
		transform: "translateY(0)",
		opacity: 1,
	}),
}

export function Tournaments({ tournaments, isEditable }: PropsType) {
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
								isEditable={isEditable}
								checked={tournament?.checked}
								photoURL={tournament.PhotoURL}
								borderWidth={2}
								borderColor="gray.300"
							/>
						</GridItem>
					)
				})}
		</Grid>
	)
}
