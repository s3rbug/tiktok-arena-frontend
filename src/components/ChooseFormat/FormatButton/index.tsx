import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Box, Button, Tooltip } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { TournamentFormat } from "../../../redux/slices/tournament/tournament.types"

type PropsType = {
	format: TournamentFormat
	setFormat: (format: TournamentFormat) => void
	animationDirection: "right" | "left"
	children: ReactNode
}

const FORMAT_EXPLANATION = {
	[TournamentFormat.SINGLE_ELIMINATION]:
		"Each match-up is immediately eliminated from the tournament. Each winner will play another in the next round, until the final match-up, whose winner becomes the tournament champion",
	[TournamentFormat.KING_OF_THE_HILL]:
		"Winner plays in the next match against a new opponent. The loser is out of the tournament.",
}

export function FormatButton({
	setFormat,
	format,
	animationDirection,
	children,
}: PropsType) {
	return (
		<Button
			as={motion.button}
			initial={{
				opacity: 0,
				transform: `translateX(${
					animationDirection === "left" ? "-" : ""
				}100px)`,
			}}
			animate={{
				opacity: 1,
				transform: "translateX(0)",
				transition: { duration: 0.5 },
			}}
			onClick={() => {
				setFormat(format)
			}}
			colorScheme={"blue"}
		>
			<Box mr={2}>{children}</Box>
			<Tooltip
				label={FORMAT_EXPLANATION[format]}
				ml={2}
				hasArrow
				placement="right-end"
			>
				<QuestionOutlineIcon boxSize={5} />
			</Tooltip>
		</Button>
	)
}
